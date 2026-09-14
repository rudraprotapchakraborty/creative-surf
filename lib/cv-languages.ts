import { CV_LANGUAGE_LEVELS, type CvInput, type CvLanguageLevel } from "./cv-types";

/**
 * Writes the CV's language section from what the candidate selected.
 *
 * Built here rather than by the model for the same reason the links are: a
 * level is a claim a candidate has to stand behind in an interview, and a
 * model asked to tailor a CV to an advert will quietly promote "basic" to
 * "conversational" when the advert wants it.
 *
 * The level is written in the CV's own language, since that is what the reader
 * reads — a German CV saying "Muttersprache" and an English one saying
 * "Native" are the same claim.
 */

const LEVELS: Record<string, Record<CvLanguageLevel, string>> = {
  English: {
    native: "Native",
    fluent: "Fluent",
    professional: "Professional",
    intermediate: "Intermediate",
    basic: "Basic",
  },
  French: {
    native: "Langue maternelle",
    fluent: "Courant",
    professional: "Professionnel",
    intermediate: "Intermédiaire",
    basic: "Notions",
  },
  German: {
    native: "Muttersprache",
    fluent: "Fließend",
    professional: "Verhandlungssicher",
    intermediate: "Mittelstufe",
    basic: "Grundkenntnisse",
  },
  Spanish: {
    native: "Lengua materna",
    fluent: "Fluido",
    professional: "Profesional",
    intermediate: "Intermedio",
    basic: "Básico",
  },
  Arabic: {
    native: "لغة أم",
    fluent: "طلاقة",
    professional: "مهني",
    intermediate: "متوسط",
    basic: "مبتدئ",
  },
  Bengali: {
    native: "মাতৃভাষা",
    fluent: "সাবলীল",
    professional: "পেশাগত",
    intermediate: "মাধ্যমিক",
    basic: "প্রাথমিক",
  },
};

/** An unknown output language reads better in English than not at all. */
const labelFor = (language: string, level: CvLanguageLevel): string =>
  (LEVELS[language] ?? LEVELS.English)[level];

/**
 * The finished "Languages" section: one entry per row the candidate filled in,
 * in their order, with the level spelled out beside the language.
 */
export function buildLanguageList(input: Partial<CvInput>): string[] {
  const language = String(input.language ?? "English");
  const seen = new Set<string>();
  const entries: string[] = [];

  for (const row of input.languages ?? []) {
    const name = String(row?.name ?? "").trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    const level = (CV_LANGUAGE_LEVELS as readonly string[]).includes(row?.level)
      ? (row.level as CvLanguageLevel)
      : "fluent";
    entries.push(`${name} — ${labelFor(language, level)}`);
  }

  return entries;
}
