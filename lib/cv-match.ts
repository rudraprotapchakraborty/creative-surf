import type { GeneratedCv } from "./cv-types";

/**
 * Job-advert coverage scoring.
 *
 * Once a CV has been written against a pasted advert, this answers the question
 * the candidate actually has: "does this thing say what they asked for?" It
 * compares the advert's own vocabulary against the finished CV and reports what
 * landed and what is still missing.
 *
 * Deliberately deterministic and local — no model call, no network, no cost —
 * so the panel updates the instant a CV is generated and can be re-run freely.
 */

export type CvMatch = {
  /** Percentage of the advert's key terms that appear in the CV, 0-100. */
  score: number;
  matched: string[];
  missing: string[];
  total: number;
};

/** How many advert terms we grade against. Enough to be meaningful, few enough to act on. */
const TERM_BUDGET = 24;

/** Below this an advert is too thin to score honestly. */
const MIN_ADVERT_WORDS = 30;

/**
 * Two-letter and punctuated terms that are real skills rather than noise. Every
 * other short token is dropped, which is what keeps "of", "et", "im" out.
 */
const SHORT_TERM_ALLOWLIST = new Set([
  "ux", "ui", "qa", "ai", "ml", "bi", "hr", "pr", "3d", "c#", "c++", "go", "r",
]);

/**
 * Stop words across the four locales the site runs in, plus the filler that
 * every job advert is built from ("responsibilities", "candidate", "ideally").
 * Terms here are never graded, because nobody is missing the word "the".
 */
const STOP_WORDS = new Set(
  `a about above after again against all also am an and any are around as at be because been before
   being below between both but by can cannot could did do does doing down during each few for from
   further had has have having he her here hers herself him himself his how i if in into is it its
   itself just me more most must my myself no nor not now of off on once only or other others ought
   our ours ourselves out over own same she should so some such than that the their theirs them
   themselves then there these they this those through to too under until up very was we were what
   when where which while who whom why will with within would you your yours yourself yourselves
   able across along already although always among another anyone anything become becomes best
   better ensure ensuring etc every everything get getting give given goes going great help helping
   include includes including keep like look looking made make makes making many may might much
   need needs new non often part per plan please provide providing really right see seek seeking set
   sure take taking use used uses using want ways well what whether within work working works
   applicant applicants apply applying candidate candidates ideally job offer opportunity plus
   preferred qualification qualifications requirement requirements responsibility responsibilities
   role roles salary successful benefits company position posting vacancy years year month months
   day days week weeks time full part time based bonus package holiday pension
   le la les un une des du de et ou en dans pour par sur avec sans sous chez est sont etre avoir
   nous vous ils elles ce cette ces qui que quoi dont ou tres plus moins bien tout tous toute toutes
   poste candidat candidature entreprise mission missions profil recherche recherchons competences
   der die das ein eine einen einem eines und oder aber auch nicht mit ohne fur von zu im am bei
   den dem des ist sind sein haben wir sie ihr uns unser diese dieser dieses als dass wenn wie
   sehr mehr alle allen jede jeden stelle bewerber unternehmen aufgaben kenntnisse erfahrung
   ability across advantage advantageous background collaborate collaborating collaboration
   comfortable committed competitive contribute culture deliver delivering desirable drive driven
   environment essential excellent experience experienced exposure familiar familiarity focus
   growing hands high highly ideal impact join journey knowledge lead leading level looking mindset
   mission passion passionate people proven quality reporting responsible skill skills solid strong
   support supporting talented thrive together understanding value values world
   wa fi min ala ila an la ma hatha hadhihi allathi allati kull ba bad qabl ind`
    .split(/\s+/)
    .filter(Boolean)
);

/** Lowercase and fold accents so "Développeur" and "developpeur" grade the same. */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Splits text into comparable terms. Keeps `+`, `#` and `.` inside a token so
 * "c++", "c#" and "node.js" survive, then trims them from the edges so a term
 * never ends up as "react." because of a full stop.
 */
function tokenize(value: string): string[] {
  const matches = normalize(value).match(/[a-z0-9][a-z0-9+#.\-']*/g) ?? [];
  return matches
    .map((token) => token.replace(/[.\-']+$/g, ""))
    .filter((token) => {
      if (!token) return false;
      if (/^\d+$/.test(token)) return false;
      if (token.length >= 3) return true;
      return SHORT_TERM_ALLOWLIST.has(token);
    });
}

/** Crude de-pluralisation — enough to match "dashboards" against "dashboard". */
function singular(term: string): string {
  if (term.length <= 3) return term;
  if (/(ss|us|is|s')$/.test(term)) return term;
  if (term.endsWith("ies")) return `${term.slice(0, -3)}y`;
  if (term.endsWith("es") && /(ch|sh|x|z)es$/.test(term)) return term.slice(0, -2);
  if (term.endsWith("s")) return term.slice(0, -1);
  return term;
}

/** Flattens every piece of written content in the CV into one comparable string. */
function cvText(cv: GeneratedCv): string {
  return [
    cv.headline,
    cv.summary,
    ...(cv.experience ?? []).flatMap((job) => [job.role, job.company, job.location, ...(job.bullets ?? [])]),
    ...(cv.education ?? []).flatMap((item) => [item.degree, item.institution, item.details]),
    ...(cv.skills ?? []).flatMap((group) => [group.category, ...(group.items ?? [])]),
    ...(cv.projects ?? []).flatMap((project) => [project.name, project.description]),
    ...(cv.certifications ?? []),
    ...(cv.languages ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Ranks the advert's own vocabulary. Frequency first — a word an advert repeats
 * is a word it cares about — with longer terms breaking ties, since "kubernetes"
 * is a more useful thing to be missing than "lead".
 */
function advertTerms(jobDescription: string): string[] {
  const counts = new Map<string, { display: string; count: number }>();

  for (const token of tokenize(jobDescription)) {
    if (STOP_WORDS.has(token) || STOP_WORDS.has(singular(token))) continue;
    const key = singular(token);
    const existing = counts.get(key);
    if (existing) existing.count += 1;
    else counts.set(key, { display: token, count: 1 });
  }

  return [...counts.entries()]
    .sort((a, b) => b[1].count - a[1].count || b[0].length - a[0].length)
    .slice(0, TERM_BUDGET)
    .map(([, value]) => value.display);
}

export function scoreCvAgainstJob(cv: GeneratedCv, jobDescription: string): CvMatch | null {
  const advert = (jobDescription ?? "").trim();
  if (advert.split(/\s+/).filter(Boolean).length < MIN_ADVERT_WORDS) return null;

  const terms = advertTerms(advert);
  if (!terms.length) return null;

  const haystack = cvText(cv);
  const present = new Set(tokenize(haystack).flatMap((token) => [token, singular(token)]));
  const normalizedHaystack = normalize(haystack);

  const matched: string[] = [];
  const missing: string[] = [];

  for (const term of terms) {
    const hit =
      present.has(term) ||
      present.has(singular(term)) ||
      // Catches compounds the tokenizer splits differently, e.g. "node" vs "node.js".
      (term.length >= 5 && normalizedHaystack.includes(singular(term)));
    (hit ? matched : missing).push(term);
  }

  return {
    score: Math.round((matched.length / terms.length) * 100),
    matched,
    missing: missing.sort((a, b) => b.length - a.length),
    total: terms.length,
  };
}
