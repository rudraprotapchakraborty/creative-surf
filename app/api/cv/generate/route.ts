import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { GoogleGenAI } from "@google/genai";
import { getAuth } from "@/lib/auth";
import { saveCv } from "@/lib/cv-db";
import { CV_JSON_SCHEMA, cvInputSchema, type CvInput, type GeneratedCv } from "@/lib/cv-types";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Best-effort throttle. This is per-instance memory, so it does not survive a
 * cold start and does not coordinate across serverless instances — it exists to
 * blunt casual hammering of a paid endpoint, not as a security control.
 */
const RATE_LIMIT = { windowMs: 60 * 60 * 1000, max: 8 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < RATE_LIMIT.windowMs);
  if (recent.length >= RATE_LIMIT.max) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Opportunistic sweep so the map can't grow without bound.
  if (hits.size > 5000) {
    for (const [key, stamps] of hits) {
      if (!stamps.some((at) => now - at < RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }
  return false;
}

/**
 * Groq retires models on a rolling basis, and the id is the thing that breaks
 * when they do. Kept here so a swap is one line — check the current list at
 * https://console.groq.com/docs/models when generation starts 404ing.
 */
const GROQ_MODEL = "openai/gpt-oss-120b";

const TONE_GUIDANCE: Record<CvInput["tone"], string> = {
  professional:
    "Polished and formal. Full, well-formed sentences in the summary; measured, confident bullets.",
  concise:
    "Tight and scannable. Short bullets of at most 18 words, no filler adjectives, no throat-clearing.",
  impact:
    "Achievement-led. Open every bullet with a strong action verb and lead with the outcome or metric before the method.",
};

const SYSTEM_PROMPT = `You are a professional CV writer who has spent years placing candidates with recruiters and applicant tracking systems.

Turn the candidate's rough notes into a polished, recruiter-ready CV.

Rules:
- Use only facts the candidate supplied. Never invent employers, dates, degrees, certifications, or metrics. If they gave a metric, use it; if they did not, write a strong achievement bullet without one.
- Where the notes are vague ("worked on the website"), sharpen the wording into professional phrasing without adding facts that were not there.
- Write bullets as achievements, not duties: what changed because this person did the work.
- Order experience and education in reverse-chronological order.
- Leave a field as an empty string, and a section as an empty array, when the candidate supplied nothing for it. An empty section is better than a padded one.
- When a target job description is supplied, mirror its vocabulary and prioritise the candidate's genuinely relevant experience — reordering and emphasis only, never fabrication.
- Write the entire CV in the requested output language, including section-level wording. Keep proper nouns (names, employers, schools, technologies) in their original form.`;

function buildUserPrompt(input: CvInput): string {
  const field = (label: string, value: string) =>
    value?.trim() ? `${label}:\n${value.trim()}\n` : `${label}: (not supplied)\n`;

  return `Write a CV from the following candidate notes.

Output language: ${input.language}
Tone: ${TONE_GUIDANCE[input.tone]}

${field("Full name", input.fullName)}
${field("Target role / current title", input.jobTitle)}
${field("Email", input.email)}
${field("Phone", input.phone)}
${field("Location", input.location)}
${field("Links (LinkedIn, portfolio, GitHub…)", input.links)}
${field("Years of experience", input.yearsExperience)}
${field("Work history", input.workHistory)}
${field("Education", input.education)}
${field("Skills", input.skills)}
${field("Target job description to tailor towards", input.targetJob)}`;
}

export async function POST(request: NextRequest) {
  const auth = getAuth(request);
  if (!auth) {
    return NextResponse.json(
      { error: "You must be signed in to create and save a CV." },
      { status: 401 }
    );
  }

  const groqKey = process.env.GROQ_API_KEY?.trim();
  const geminiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY)?.trim();

  if (!groqKey && !geminiKey) {
    console.error("CV generation attempted without GROQ_API_KEY or GEMINI_API_KEY set.");
    return NextResponse.json(
      { error: "The CV generator is not configured yet. Please set GROQ_API_KEY or GEMINI_API_KEY in .env.local." },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "You have generated a lot of CVs in the past hour. Please try again later." },
      { status: 429 }
    );
  }

  let input: CvInput;
  try {
    const parsed = cvInputSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form — some details are missing or too long." },
        { status: 400 }
      );
    }
    input = parsed.data;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  /** Saves the CV and returns it. A failed save must not lose the candidate's work. */
  const respond = async (cv: GeneratedCv) => {
    let cvId = "";
    try {
      cvId = await saveCv(auth.sub, auth.email || "", input, cv);
    } catch (saveErr) {
      console.error("Failed to auto-save CV to MongoDB:", saveErr);
    }
    return NextResponse.json({ cv, cvId });
  };

  // Provider 1: Groq Cloud
  if (groqKey) {
    try {
      const groq = new Groq({ apiKey: groqKey });
      const completion = await groq.chat.completions.create({
        model: GROQ_MODEL,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `${SYSTEM_PROMPT}
Return strictly a JSON object matching this schema:
${JSON.stringify(CV_JSON_SCHEMA)}`,
          },
          { role: "user", content: buildUserPrompt(input) },
        ],
        temperature: 0.2,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) throw new Error("Groq returned no content");

      return await respond(JSON.parse(content) as GeneratedCv);
    } catch (err) {
      // Deliberately not returned: a dead model or an expired key on one
      // provider should hand over to the other, not take the tool down.
      console.error("CV generation with Groq failed, falling back:", err);
    }
  }

  // Provider 2: Google Gemini API
  if (geminiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: buildUserPrompt(input),
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: "application/json",
          responseSchema: CV_JSON_SCHEMA as any,
        },
      });

      const text = response.text;
      if (!text) throw new Error("Model returned no text output");

      return await respond(JSON.parse(text) as GeneratedCv);
    } catch (err) {
      console.error("CV generation with Gemini failed:", err);
    }
  }

  /**
   * Both providers are out. The candidate is told to try again and nothing
   * more: the underlying messages carry model ids, key names and provider
   * status codes, which mean nothing to them and everything to an attacker.
   * The detail is in the server log above.
   */
  return NextResponse.json(
    { error: "We couldn't write your CV just now. Please try again in a moment." },
    { status: 502 }
  );
}
