import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import Groq from "groq-sdk";
import { getAuth } from "@/lib/auth";
import { ANONYMOUS_USER_ID, saveCv } from "@/lib/cv-db";
import { CV_JSON_SCHEMA, cvInputSchema, type CvInput, type GeneratedCv } from "@/lib/cv-types";
import { buildContactLinks } from "@/lib/cv-links";
import { buildLanguageList } from "@/lib/cv-languages";
import { isUploadableImage, uploadToImgbb } from "@/lib/imgbb";
import { gradeCoverage } from "@/lib/cv-coverage";

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
 * Sonnet is the tier this job wants: a CV is a long, structured rewrite of
 * someone's notes rather than a reasoning problem, and the schema does the
 * work a larger model would otherwise be paid to do. Kept here so a swap is
 * one line — https://docs.anthropic.com/en/docs/models-overview.
 */
const CLAUDE_MODEL = "claude-sonnet-5";

/**
 * The low-effort writer. Groq retires models on a rolling basis and the id is
 * the thing that breaks when they do — check https://console.groq.com/docs/models
 * when a low-effort generation starts 404ing.
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
- Write the entire CV in the requested output language, including section-level wording. Keep proper nouns (names, employers, schools, technologies) in their original form.
- Leave contact.links and languages as empty arrays. The candidate's own URLs and spoken languages are attached after you finish, exactly as they gave them.`;

/**
 * The candidate's links as one readable list. The model never writes these out
 * — `buildContactLinks` does — but it should know they exist, so it does not
 * try to fill the gap with a line of its own.
 */
function describeLinks(input: CvInput): string {
  return buildContactLinks(input)
    .map((link) => `${link.label}: ${link.url}`)
    .join("\n");
}

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
${field("Profile links", describeLinks(input))}
${field("Years of experience", input.yearsExperience)}
${field("Work history", input.workHistory)}
${field("Education", input.education)}
${field("Skills", input.skills)}
${field("Spoken languages", buildLanguageList(input).join("\n"))}
${field("Target job description to tailor towards", input.targetJob)}`;
}

export async function POST(request: NextRequest) {
  /*
   * Signing in is optional here. A visitor who is signed in gets the CV filed
   * under their account, to reopen and delete at will; a signed-out one gets
   * exactly the same CV, saved under `ANONYMOUS_USER_ID`, which no account can
   * later claim. The throttle below is what stands between this endpoint and
   * its bill, since there is no longer an account to hold anyone to.
   */
  const auth = getAuth(request);

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

  /*
   * The effort picked in the form chooses the writer outright. There is no
   * falling back from one to the other: a visitor who asked for the cheap
   * draft should not be handed a Claude bill because Groq was down, and one
   * who asked for the good one should not be given a draft without being told.
   */
  const lowEffort = input.effort === "low";
  const anthropicKey = process.env.ANTHROPIC_API_KEY?.trim();
  const groqKey = process.env.GROQ_API_KEY?.trim();
  const key = lowEffort ? groqKey : anthropicKey;

  if (!key) {
    const needed = lowEffort ? "GROQ_API_KEY" : "ANTHROPIC_API_KEY";
    console.error(`CV generation attempted without ${needed} set.`);
    return NextResponse.json(
      { error: `The CV generator is not configured yet. Please set ${needed} in .env.local.` },
      { status: 503 }
    );
  }

  /**
   * Hosts the chosen photo, once there is a CV to put it on.
   *
   * Deliberately late: a picture uploaded the moment it was picked would
   * outlive every candidate who changed their mind, sitting on the image host
   * with nothing pointing at it. Best-effort — a CV without its photo is worth
   * far more than no CV at all, so a failure here is logged and moved past.
   */
  const hostPhoto = async (): Promise<string> => {
    if (isUploadableImage(input.photoData)) {
      try {
        const { url } = await uploadToImgbb(input.photoData, `${input.fullName} photo`);
        return url;
      } catch (photoErr) {
        console.error("Failed to host the CV photo:", photoErr);
        return "";
      }
    }
    // A CV opened from the account and regenerated already has a hosted photo.
    return /^https:\/\//i.test(input.photo ?? "") ? input.photo : "";
  };

  /** Saves the CV and returns it. A failed save must not lose the candidate's work. */
  const respond = async (raw: GeneratedCv) => {
    const photoUrl = await hostPhoto();
    /*
     * The candidate's own URLs, not the model's recollection of them. A profile
     * link is the one field where a plausible-looking edit is a broken link, so
     * whatever came back is overwritten rather than trusted.
     */
    const cv: GeneratedCv = {
      ...raw,
      // The photo is a URL too, and the model has no business restating it.
      photoUrl,
      // A proficiency is a claim to defend in an interview, not a thing to tailor.
      languages: buildLanguageList(input),
      contact: {
        email: raw.contact?.email ?? "",
        phone: raw.contact?.phone ?? "",
        location: raw.contact?.location ?? "",
        links: buildContactLinks(input),
      },
    };

    /*
     * Graded here rather than in the browser because the CV and the advert are
     * often in different languages, and only a model can tell whether Bengali
     * prose satisfies an English requirement. Best-effort: a null grade shows
     * as "not graded" in the panel, which beats a keyword score that reads a
     * good CV as 17% purely because the two are in different alphabets.
     */
    const coverage = await gradeCoverage(cv, input.targetJob, input.effort);

    let cvId = "";
    try {
      // The photo is stored as the URL it now lives at; the base64 the browser
      // sent was a carrier for one request and has no business in a document.
      const saved: CvInput = { ...input, photo: photoUrl, photoData: "" };
      cvId = await saveCv(auth?.sub ?? ANONYMOUS_USER_ID, auth?.email || "", saved, cv, coverage);
    } catch (saveErr) {
      console.error("Failed to auto-save CV to MongoDB:", saveErr);
    }
    return NextResponse.json({ cv, coverage, cvId });
  };

  if (lowEffort) {
    try {
      const groq = new Groq({ apiKey: key });
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
      console.error("CV generation with Groq failed:", err);
      return NextResponse.json(
        { error: "We couldn't write your CV just now. Please try again in a moment." },
        { status: 502 }
      );
    }
  }

  try {
    const anthropic = new Anthropic({ apiKey: key });
    /*
     * The schema is enforced by the API rather than by us: a structured output
     * can only come back in the shape CV_JSON_SCHEMA describes, so the parse
     * below has no malformed-JSON case to defend against and the renderer has
     * no missing field to defend against.
     */
    const message = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 16000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserPrompt(input) }],
      thinking: { type: "adaptive" },
      // Medium, not the default high: the CV has to come back inside this
      // route's 60s ceiling, and the thinking this job needs is modest.
      output_config: {
        effort: "medium",
        format: { type: "json_schema", schema: CV_JSON_SCHEMA },
      },
    });

    if (message.stop_reason === "refusal") {
      throw new Error("Claude declined to write this CV");
    }

    // Adaptive thinking puts a thinking block ahead of the answer, so the text
    // block is found by type rather than taken from the front of the list.
    const text = message.content.find(
      (block): block is Anthropic.TextBlock => block.type === "text"
    )?.text;
    if (!text) throw new Error("Claude returned no text output");

    return await respond(JSON.parse(text) as GeneratedCv);
  } catch (err) {
    // Deliberately not returned: the message below is what the candidate sees.
    console.error("CV generation with Claude failed:", err);
  }

  /**
   * Generation is out. The candidate is told to try again and nothing more:
   * the underlying messages carry model ids, key names and provider status
   * codes, which mean nothing to them and everything to an attacker. The
   * detail is in the server log above.
   */
  return NextResponse.json(
    { error: "We couldn't write your CV just now. Please try again in a moment." },
    { status: 502 }
  );
}
