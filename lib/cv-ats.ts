import type { GeneratedCv } from "./cv-types";

/**
 * ATS readiness scoring.
 *
 * An applicant tracking system reads a CV before a human ever does, and it is
 * unforgiving in dull, specific ways: a role with no dates, a header it cannot
 * find a phone number in, three hundred words of prose where the skills should
 * be. This grades the finished CV against those mechanics and says which ones
 * it fails.
 *
 * Deliberately deterministic and local — no model call, no network, no cost —
 * so the panel updates the instant a CV is generated. It is also a different
 * question from `cv-match`: that one asks "does this CV answer this advert?",
 * this one asks "can a machine read this CV at all?". A CV can score well on
 * one and badly on the other.
 */

/** Fixed order — the panel renders the list exactly as it comes back. */
export const ATS_CHECK_IDS = [
  "contact",
  "profileLinks",
  "headline",
  "summary",
  "experienceDepth",
  "dates",
  "metrics",
  "bulletLength",
  "skills",
  "firstPerson",
  "length",
] as const;

export type AtsCheckId = (typeof ATS_CHECK_IDS)[number];

/** `warn` is worth half a `pass`, so a near-miss reads as a near-miss. */
export type AtsStatus = "pass" | "warn" | "fail";

export type AtsCheck = { id: AtsCheckId; status: AtsStatus; weight: number };

export type AtsReport = {
  /** Weighted percentage of the checks below, 0-100. */
  score: number;
  tier: "strong" | "good" | "weak";
  checks: AtsCheck[];
  /** Cleared outright — `warn`s are not counted here, only in the score. */
  passed: number;
  total: number;
};

/**
 * How much each mechanic is worth. Weighted by what actually costs a candidate
 * an interview: a role a parser cannot date, or bullets with nothing measurable
 * in them, sink a CV far harder than a missing headline.
 */
const WEIGHTS: Record<AtsCheckId, number> = {
  contact: 12,
  profileLinks: 8,
  headline: 6,
  summary: 10,
  experienceDepth: 14,
  dates: 12,
  metrics: 14,
  bulletLength: 10,
  skills: 12,
  firstPerson: 6,
  length: 8,
};

/** Shared with the advert match panel so one score never reads greener than the other. */
export const ATS_STRONG = 75;
export const ATS_DECENT = 50;

/** A bullet below this is a fragment; above it, a paragraph a scanner skims past. */
const BULLET_MIN_WORDS = 6;
const BULLET_MAX_WORDS = 32;

/**
 * Digits in every numeral system the output languages are written with.
 * `\d` alone is ASCII, which quietly marks "৫০% কমিয়েছেন" as an unmeasured
 * achievement — the CV carries the number, the grader simply cannot see it.
 */
const ANY_DIGIT = /[0-9\u0660-\u0669\u06F0-\u06F9\u09E6-\u09EF]/;

/**
 * Word counts, relative to English, for scripts that say the same thing in a
 * different number of words. Bengali compounds heavily and drops articles: the
 * same CV comes out about a fifth shorter, measured on matched pairs. Grading
 * that against the English bands marks a complete CV as thin.
 *
 * A script absent here is graded on the English bands, which is the honest
 * default until someone measures it.
 */
const WORD_COUNT_FACTORS: { letters: RegExp; factor: number }[] = [
  { letters: /[\u0980-\u09FF]/g, factor: 0.8 },
];

/** Picks the factor for whichever script the CV is actually written in. */
function lengthFactor(prose: string): number {
  const latin = (prose.match(/[A-Za-z]/g) ?? []).length;
  for (const { letters, factor } of WORD_COUNT_FACTORS) {
    if ((prose.match(letters) ?? []).length > latin) return factor;
  }
  return 1;
}

/**
 * First-person pronouns across the five output languages. A CV is written in
 * the implied first person — "Rebuilt the checkout", not "I rebuilt the
 * checkout" — and parsers weight the opening word of a bullet heavily.
 */
const FIRST_PERSON = new Set([
  "i", "me", "my", "mine", "myself",
  "je", "j", "moi", "mon", "ma", "mes",
  "ich", "mich", "mir", "mein", "meine", "meinen", "meinem", "meiner",
  "yo", "mi", "mis",
  "ana",
  "আমি", "আমার", "আমায়", "আমাকে", "আমরা", "আমাদের",
]);

const words = (value: string): string[] =>
  String(value ?? "").trim().split(/\s+/).filter(Boolean);

/** Every piece of prose in the CV, for the whole-document checks. */
function proseOf(cv: GeneratedCv): string[] {
  return [
    cv.headline,
    cv.summary,
    ...(cv.experience ?? []).flatMap((job) => [job.role, job.company, ...(job.bullets ?? [])]),
    ...(cv.education ?? []).flatMap((item) => [item.degree, item.institution, item.details]),
    ...(cv.skills ?? []).flatMap((group) => [group.category, ...(group.items ?? [])]),
    ...(cv.projects ?? []).flatMap((project) => [project.name, project.description]),
    ...(cv.certifications ?? []),
    ...(cv.languages ?? []),
  ].filter(Boolean);
}

/**
 * Lowercased, accent-folded words — so "Ich" and "ich" are one token.
 *
 * Matches Bengali and Arabic letters alongside Latin ones. A Latin-only pattern
 * finds no words at all in a Bengali CV, which reads as "no first-person
 * pronouns" and hands out a pass the CV never earned. The combining-mark strip
 * is scoped to Latin diacritics, so Bengali vowel signs survive intact.
 */
function tokens(text: string): string[] {
  return (
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .match(/[a-z]+|[\u0980-\u09FF]+|[\u0600-\u06FF]+/g) ?? []
  );
}

/** Grades a ratio against two thresholds. Empty populations always fail. */
function byRatio(good: number, total: number, passAt: number, warnAt: number): AtsStatus {
  if (!total) return "fail";
  const ratio = good / total;
  if (ratio >= passAt) return "pass";
  if (ratio >= warnAt) return "warn";
  return "fail";
}

function grade(cv: GeneratedCv): Record<AtsCheckId, AtsStatus> {
  const roles = (cv.experience ?? []).filter((job) => job.role?.trim() || job.company?.trim());
  const bullets = roles.flatMap((job) => (job.bullets ?? []).filter((b) => b?.trim()));
  const skillGroups = (cv.skills ?? []).filter((group) => (group.items ?? []).length);
  const skillItems = skillGroups.flatMap((group) => group.items);

  const contact = cv.contact ?? { email: "", phone: "", location: "", links: [] };
  const prose = proseOf(cv);
  const summaryWords = words(cv.summary).length;
  const totalWords = prose.reduce((sum, text) => sum + words(text).length, 0);

  /** Every word-count threshold below, scaled to the script this CV is written in. */
  const factor = lengthFactor(prose.join(" "));
  const band = (count: number) => Math.round(count * factor);

  const firstPersonHits = tokens(prose.join(" ")).filter((token) =>
    FIRST_PERSON.has(token)
  ).length;

  const datedRoles = roles.filter((job) => job.period?.trim()).length;
  // A digit is the cheapest reliable proxy for a measurable outcome: a percentage,
  // a headcount, a budget, a timeframe.
  const quantified = bullets.filter((bullet) => ANY_DIGIT.test(bullet)).length;
  const wellSized = bullets.filter((bullet) => {
    const length = words(bullet).length;
    return length >= band(BULLET_MIN_WORDS) && length <= band(BULLET_MAX_WORDS);
  }).length;
  const deepRoles = roles.filter((job) => (job.bullets ?? []).length >= 3).length;

  return {
    contact: !contact.email?.trim()
      ? "fail"
      : contact.phone?.trim() && contact.location?.trim()
        ? "pass"
        : "warn",

    profileLinks: (contact.links ?? []).length >= 1 ? "pass" : "fail",

    headline: !cv.headline?.trim() ? "fail" : cv.headline.trim().length <= 100 ? "pass" : "warn",

    summary:
      summaryWords === 0
        ? "fail"
        : summaryWords >= band(25) && summaryWords <= band(130)
          ? "pass"
          : "warn",

    experienceDepth: !roles.length ? "fail" : byRatio(deepRoles, roles.length, 1, 0.5),

    dates: !roles.length ? "fail" : byRatio(datedRoles, roles.length, 1, 0.5),

    metrics: byRatio(quantified, bullets.length, 0.3, 0.1),

    bulletLength: byRatio(wellSized, bullets.length, 0.85, 0.6),

    skills:
      skillItems.length >= 8 && skillGroups.length >= 2
        ? "pass"
        : skillItems.length >= 4
          ? "warn"
          : "fail",

    firstPerson: firstPersonHits === 0 ? "pass" : firstPersonHits <= 2 ? "warn" : "fail",

    length:
      totalWords >= band(300) && totalWords <= band(850)
        ? "pass"
        : totalWords >= band(200) && totalWords <= band(1100)
          ? "warn"
          : "fail",
  };
}

export function scoreCvForAts(cv: GeneratedCv): AtsReport {
  const statuses = grade(cv);
  const checks = ATS_CHECK_IDS.map((id) => ({ id, status: statuses[id], weight: WEIGHTS[id] }));

  const earned = checks.reduce(
    (sum, check) => sum + check.weight * (check.status === "pass" ? 1 : check.status === "warn" ? 0.5 : 0),
    0
  );
  const available = checks.reduce((sum, check) => sum + check.weight, 0);
  const score = Math.round((earned / available) * 100);

  return {
    score,
    tier: score >= ATS_STRONG ? "strong" : score >= ATS_DECENT ? "good" : "weak",
    checks,
    passed: checks.filter((check) => check.status === "pass").length,
    total: checks.length,
  };
}
