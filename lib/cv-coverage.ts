import Groq from "groq-sdk";
import { GoogleGenAI } from "@google/genai";
import { cvPlainText } from "./cv-match";
import { CV_COVERAGE_JSON_SCHEMA, type CvCoverage, type GeneratedCv } from "./cv-types";

/**
 * Model-graded advert coverage.
 *
 * The deterministic grader in `cv-match` compares strings, which only works
 * while the CV and the advert are in one language. This pass asks a model
 * instead, so a Bengali CV can be graded honestly against an English advert.
 *
 * Server-only: it holds provider keys. It is also strictly best-effort — every
 * failure path returns null so that a CV is never lost to a grading problem.
 */

/** Below this an advert is too thin to grade, matching the local grader. */
const MIN_ADVERT_WORDS = 30;

/** How many requirements to grade against. Enough to be useful, few enough to act on. */
const MAX_TERMS = 24;

/** A grading pass is a nicety; it must never eat the request's whole budget. */
const TIMEOUT_MS = 20_000;

const GROQ_MODEL = "openai/gpt-oss-120b";
const GEMINI_MODEL = "gemini-3.6-flash";

const SYSTEM_PROMPT = `You grade a finished CV against the job advert it was written for.

The CV and the advert are frequently written in different languages. Judge by meaning and never by matching words: a CV written in Bengali, Arabic or French can fully satisfy a requirement written in English, and the same skill is often named differently in each language.

Rules:
- Take at most ${MAX_TERMS} concrete requirements from the advert: skills, tools, years of experience, qualifications, responsibilities. Ignore boilerplate about the company, its benefits, or how to apply.
- Write each requirement in the advert's own language, as a short phrase of one to four words, so the candidate can find it in the text they pasted.
- Put a requirement in "matched" only where the CV gives real evidence of it. An adjacent or related skill is not evidence. When it is genuinely unclear, treat it as missing.
- Never invent a requirement the advert did not make, and never list the same requirement twice or in both lists.`;

function buildPrompt(cv: GeneratedCv, advert: string): string {
  return `JOB ADVERT:
${advert}

FINISHED CV:
${cvPlainText(cv)}

Grade the CV against the advert.`;
}

/** Rejects rather than hangs, and never holds the process open on its own. */
function withTimeout<T>(work: Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Coverage grading timed out")), TIMEOUT_MS);
    if (typeof timer === "object" && "unref" in timer) timer.unref();
    work.then(resolve, reject).finally(() => clearTimeout(timer));
  });
}

/**
 * Trusts the model for judgement, not for shape. Anything malformed is dropped
 * rather than rendered, and a requirement claimed as both matched and missing
 * is kept as missing — the cautious reading is the useful one for a candidate.
 */
function sanitize(raw: unknown): CvCoverage | null {
  if (!raw || typeof raw !== "object") return null;
  const data = raw as { matched?: unknown; missing?: unknown };

  const clean = (value: unknown): string[] =>
    Array.isArray(value)
      ? value
          .filter((entry): entry is string => typeof entry === "string")
          .map((entry) => entry.trim())
          .filter(Boolean)
      : [];

  const seen = new Set<string>();
  const dedupe = (terms: string[]) =>
    terms.filter((term) => {
      const key = term.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  const missing = dedupe(clean(data.missing));
  const matched = dedupe(clean(data.matched));

  if (!matched.length && !missing.length) return null;
  return {
    matched: matched.slice(0, MAX_TERMS),
    missing: missing.slice(0, MAX_TERMS),
  };
}

export async function gradeCoverage(cv: GeneratedCv, advert: string): Promise<CvCoverage | null> {
  const text = (advert ?? "").trim();
  if (text.split(/\s+/).filter(Boolean).length < MIN_ADVERT_WORDS) return null;

  const groqKey = process.env.GROQ_API_KEY?.trim();
  const geminiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY)?.trim();
  const prompt = buildPrompt(cv, text);

  if (groqKey) {
    try {
      const groq = new Groq({ apiKey: groqKey });
      const completion = await withTimeout(
        groq.chat.completions.create({
          model: GROQ_MODEL,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: `${SYSTEM_PROMPT}
Return strictly a JSON object matching this schema:
${JSON.stringify(CV_COVERAGE_JSON_SCHEMA)}`,
            },
            { role: "user", content: prompt },
          ],
          temperature: 0,
        })
      );

      const content = completion.choices[0]?.message?.content;
      if (content) {
        const graded = sanitize(JSON.parse(content));
        if (graded) return graded;
      }
    } catch (err) {
      // One dead provider hands over to the other, exactly as generation does.
      console.error("Coverage grading with Groq failed, falling back:", err);
    }
  }

  if (geminiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const response = await withTimeout(
        ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: prompt,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            responseMimeType: "application/json",
            responseSchema: CV_COVERAGE_JSON_SCHEMA as any,
            temperature: 0,
          },
        })
      );

      if (response.text) return sanitize(JSON.parse(response.text));
    } catch (err) {
      console.error("Coverage grading with Gemini failed:", err);
    }
  }

  // No grade is a supported outcome: the panel says so rather than guessing.
  return null;
}
