import { z } from "zod";

/**
 * Shared contract between the CV Builder form, the generation route, and the
 * document renderer. The JSON schema below is handed to Claude as a structured
 * output format, so the model can only ever return this exact shape — the
 * renderer never has to defend against missing fields.
 */

export const CV_TONES = ["professional", "concise", "impact"] as const;
export type CvTone = (typeof CV_TONES)[number];

/** Output languages for the generated CV, independent of the site's UI locale. */
export const CV_LANGUAGES = ["English", "French", "German", "Arabic", "Spanish", "Bengali"] as const;

export const cvInputSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  jobTitle: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(60).optional().default(""),
  location: z.string().trim().max(160).optional().default(""),
  /**
   * The three profiles a recruiter actually looks for, each with its own field
   * so the candidate never has to guess a separator — and so the URL that
   * reaches the finished CV is the one they typed. All optional.
   */
  linkedin: z.string().trim().max(300).optional().default(""),
  portfolio: z.string().trim().max(300).optional().default(""),
  github: z.string().trim().max(300).optional().default(""),
  /** Anything else worth linking: Behance, a GitLab mirror, a write-up. */
  links: z.string().trim().max(600).optional().default(""),
  yearsExperience: z.string().trim().max(40).optional().default(""),
  workHistory: z.string().trim().max(6000).optional().default(""),
  education: z.string().trim().max(3000).optional().default(""),
  skills: z.string().trim().max(2000).optional().default(""),
  targetJob: z.string().trim().max(6000).optional().default(""),
  tone: z.enum(CV_TONES).default("professional"),
  language: z.string().trim().max(40).default("English"),
});

export type CvInput = z.infer<typeof cvInputSchema>;

export type CvLink = { label: string; url: string };

export type GeneratedCv = {
  fullName: string;
  headline: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    links: CvLink[];
  };
  summary: string;
  experience: {
    role: string;
    company: string;
    location: string;
    period: string;
    bullets: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    period: string;
    details: string;
  }[];
  skills: { category: string; items: string[] }[];
  projects: { name: string; description: string }[];
  certifications: string[];
  languages: string[];
};

/**
 * How the finished CV covers the advert it was written for.
 *
 * Graded by a model rather than by keyword overlap, because the CV and the
 * advert are routinely in different languages — a Bengali CV genuinely
 * evidencing "যোগাযোগ" shares no characters with an advert asking for
 * "communication", and a string comparison scores that as a miss.
 *
 * Both lists hold the advert's own wording, so the candidate can find each one
 * in the text they pasted.
 */
export type CvCoverage = {
  matched: string[];
  missing: string[];
};

/** Structured-output schema for the coverage pass. Strict mode, as above. */
export const CV_COVERAGE_JSON_SCHEMA: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  required: ["matched", "missing"],
  properties: {
    matched: {
      type: "array",
      description:
        "Requirements from the advert that the CV genuinely evidences. Copy each one from the advert in the advert's own language, as a short phrase of one to four words.",
      items: { type: "string" },
    },
    missing: {
      type: "array",
      description:
        "Requirements from the advert the CV does not evidence yet, in the same short form.",
      items: { type: "string" },
    },
  },
};

export interface SavedCvDoc {
  _id?: string;
  userId: string;
  userEmail: string;
  title: string;
  inputData: CvInput;
  cvData: GeneratedCv;
  /** Absent on CVs saved before coverage grading existed, and on those written without an advert. */
  coverage?: CvCoverage | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Structured-output schema. Every field is `required` with
 * `additionalProperties: false` — that is what the API's strict JSON mode
 * demands, so "optional" sections are expressed as empty strings/arrays
 * rather than absent keys.
 */
export const CV_JSON_SCHEMA: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  required: [
    "fullName",
    "headline",
    "contact",
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "languages",
  ],
  properties: {
    fullName: { type: "string", description: "The candidate's name, exactly as supplied." },
    headline: {
      type: "string",
      description: "One-line professional headline, e.g. 'Senior Frontend Engineer · React & TypeScript'.",
    },
    contact: {
      type: "object",
      additionalProperties: false,
      required: ["email", "phone", "location", "links"],
      properties: {
        email: { type: "string" },
        phone: { type: "string", description: "Empty string when the candidate gave no phone number." },
        location: { type: "string", description: "Empty string when unknown." },
        links: {
          type: "array",
          description:
            "Profile or portfolio links. These are replaced with the candidate's own URLs after generation, so never invent, reformat or drop one.",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["label", "url"],
            properties: {
              label: { type: "string", description: "e.g. 'LinkedIn', 'Portfolio', 'GitHub'." },
              url: { type: "string" },
            },
          },
        },
      },
    },
    summary: {
      type: "string",
      description: "2-4 sentence professional summary written in the first person implied voice (no 'I').",
    },
    experience: {
      type: "array",
      description: "Reverse-chronological roles. Empty array when the candidate supplied no work history.",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["role", "company", "location", "period", "bullets"],
        properties: {
          role: { type: "string" },
          company: { type: "string" },
          location: { type: "string", description: "Empty string when unknown." },
          period: { type: "string", description: "e.g. '2021 — Present'. Empty string when unknown." },
          bullets: {
            type: "array",
            description: "3-5 achievement bullets, each starting with a strong action verb.",
            items: { type: "string" },
          },
        },
      },
    },
    education: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["degree", "institution", "period", "details"],
        properties: {
          degree: { type: "string" },
          institution: { type: "string" },
          period: { type: "string", description: "Empty string when unknown." },
          details: { type: "string", description: "Honours, thesis, or coursework. Empty string when none." },
        },
      },
    },
    skills: {
      type: "array",
      description: "Skills grouped into 2-5 named categories.",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["category", "items"],
        properties: {
          category: { type: "string", description: "e.g. 'Languages', 'Tools', 'Leadership'." },
          items: { type: "array", items: { type: "string" } },
        },
      },
    },
    projects: {
      type: "array",
      description: "Notable projects. Empty array when none can be inferred from the input.",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "description"],
        properties: {
          name: { type: "string" },
          description: { type: "string", description: "One sentence, outcome-focused." },
        },
      },
    },
    certifications: { type: "array", items: { type: "string" } },
    languages: { type: "array", items: { type: "string" }, description: "Spoken languages with proficiency." },
  },
};
