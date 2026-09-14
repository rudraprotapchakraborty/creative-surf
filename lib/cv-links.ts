import { MAX_CV_LINKS, type CvInput, type CvLink, type CvLinkType } from "./cv-types";

/**
 * Builds the CV's contact links from what the candidate typed, not from what
 * the model wrote back.
 *
 * A URL is the one part of a CV that has to survive verbatim: a recruiter
 * clicks it or types it out, and a single mangled character makes it dead.
 * Models are perfectly capable of "tidying" a profile URL into one that 404s,
 * so the links are assembled here — deterministically, no network, no model —
 * and the generated version is discarded.
 */

/** Bare handles are common ("alexmorgan"), so the typed rows know their home. */
const HANDLE_BASES: Partial<Record<CvLinkType, string>> = {
  linkedin: "https://www.linkedin.com/in/",
  github: "https://github.com/",
};

/**
 * How each row type is named in the finished CV header. `other` has no fixed
 * name — it borrows one from its host, so a Behance link reads "Behance"
 * without the dropdown having to offer Behance.
 */
const TYPE_LABELS: Record<CvLinkType, string | null> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  portfolio: "Portfolio",
  other: null,
};

/**
 * Hosts worth naming in the header. Anything not listed falls back to its own
 * domain, which reads perfectly well ("alexmorgan.dev") and never guesses wrong.
 */
const KNOWN_HOSTS: Record<string, string> = {
  "linkedin.com": "LinkedIn",
  "github.com": "GitHub",
  "gitlab.com": "GitLab",
  "bitbucket.org": "Bitbucket",
  "behance.net": "Behance",
  "dribbble.com": "Dribbble",
  "medium.com": "Medium",
  "dev.to": "DEV",
  "stackoverflow.com": "Stack Overflow",
  "kaggle.com": "Kaggle",
  "figma.com": "Figma",
  "notion.so": "Notion",
  "youtube.com": "YouTube",
  "x.com": "X",
  "twitter.com": "X",
  "scholar.google.com": "Google Scholar",
  "orcid.org": "ORCID",
  "researchgate.net": "ResearchGate",
  "substack.com": "Substack",
  "artstation.com": "ArtStation",
  "credly.com": "Credly",
};

/**
 * Turns whatever the candidate typed into an absolute URL.
 *
 * `base` is supplied for the two row types where a bare word is unambiguous —
 * a LinkedIn row containing "alexmorgan" means one thing and one thing only.
 * Without a base, a value that isn't recognisably a URL is dropped rather than
 * guessed at.
 */
function toUrl(value: string, base?: string): string | null {
  const raw = String(value ?? "").trim().replace(/[),.;]+$/, "");
  if (!raw) return null;

  if (/^https?:\/\//i.test(raw)) return raw;
  // Protocol-relative and www-prefixed values are URLs missing only a scheme.
  if (raw.startsWith("//")) return `https:${raw}`;
  if (/^www\./i.test(raw)) return `https://${raw}`;
  // A dot before the first slash means a domain: "linkedin.com/in/alex".
  if (/^[\w-]+(\.[\w-]+)+([/?#]|$)/.test(raw)) return `https://${raw}`;

  if (!base) return null;
  const handle = raw.replace(/^[@/]+/, "").replace(/\/+$/, "");
  return handle ? `${base}${handle}` : null;
}

/** Host without `www.`, lowercased — the key both labelling and de-duping use. */
function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return "";
  }
}

/** Ignores scheme, `www.`, case and a trailing slash, so one profile lands once. */
function dedupeKey(url: string): string {
  return url
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/+$/, "")
    .toLowerCase();
}

/** Names a loose link by its host, falling back to the domain itself. */
function labelFor(url: string): string {
  const host = hostOf(url);
  if (KNOWN_HOSTS[host]) return KNOWN_HOSTS[host];
  // Some of these hand out a subdomain per person ("alex.substack.com"), so
  // one level up is worth checking. Only listed hosts match, so nothing here
  // is a guess — an unrecognised domain still prints as itself.
  const parent = host.split(".").slice(1).join(".");
  return KNOWN_HOSTS[parent] || host || url;
}

/**
 * Splits the free-text "other links" box. Commas, semicolons, newlines and
 * bare spaces all read as separators to someone filling in a form, so all four
 * are honoured rather than documented.
 */
function splitLoose(value: string): string[] {
  return String(value ?? "")
    .split(/[\s,;]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

/**
 * The contact links for a generated CV, in the order the candidate added them.
 *
 * The rows come first; the fixed fields below them are what the form used to
 * offer, and are still read so a CV saved before the change keeps its links.
 */
export function buildContactLinks(input: Partial<CvInput>): CvLink[] {
  const links: CvLink[] = [];
  const seen = new Set<string>();

  const add = (label: string, url: string | null) => {
    if (!url || links.length >= MAX_CV_LINKS) return;
    const key = dedupeKey(url);
    if (seen.has(key)) return;
    seen.add(key);
    links.push({ label, url });
  };

  for (const row of input.profileLinks ?? []) {
    if (!row?.value?.trim()) continue;
    const type = (row.type ?? "linkedin") as CvLinkType;
    const url = toUrl(row.value, HANDLE_BASES[type]);
    if (url) add(TYPE_LABELS[type] ?? labelFor(url), url);
  }

  const legacy: { label: string; value: string; base?: string }[] = [
    { label: "LinkedIn", value: input.linkedin ?? "", base: HANDLE_BASES.linkedin },
    { label: "Portfolio", value: input.portfolio ?? "" },
    { label: "GitHub", value: input.github ?? "", base: HANDLE_BASES.github },
  ];
  for (const entry of legacy) add(entry.label, toUrl(entry.value, entry.base));
  for (const entry of splitLoose(input.links ?? "")) {
    const url = toUrl(entry);
    if (url) add(labelFor(url), url);
  }

  return links;
}
