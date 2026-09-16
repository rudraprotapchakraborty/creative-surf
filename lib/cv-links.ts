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

/**
 * Where a bare handle lives, for the typed rows a CV may still carry from when
 * the form asked what kind of link each row was. Rows typed today are plain
 * URLs, so nothing here is guessed at on their behalf.
 */
const HANDLE_BASES: Partial<Record<CvLinkType, string>> = {
  linkedin: "https://www.linkedin.com/in/",
  github: "https://github.com/",
  orcid: "https://orcid.org/",
  behance: "https://www.behance.net/",
  researchgate: "https://www.researchgate.net/profile/",
  kaggle: "https://www.kaggle.com/",
  leetcode: "https://leetcode.com/u/",
  medium: "https://medium.com/@",
};

/**
 * How an old typed row is named in the finished CV header. `other` has no
 * fixed name — it borrows one from its host, which is what every row does now.
 */
const TYPE_LABELS: Record<CvLinkType, string | null> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  portfolio: "Portfolio",
  scholar: "Google Scholar",
  orcid: "ORCID",
  behance: "Behance",
  researchgate: "ResearchGate",
  kaggle: "Kaggle",
  leetcode: "LeetCode",
  medium: "Medium",
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
  "leetcode.com": "LeetCode",
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
 * The fixed name a link kind prints under, or "" for a kind that has none.
 * The form uses it to keep the name of a row saved under one of the kinds the
 * dropdown no longer offers.
 */
export function nameForLinkType(type: CvLinkType): string {
  return TYPE_LABELS[type] ?? "";
}

/**
 * What a row will be called if its name is left empty, for whatever the
 * candidate has typed into the URL field so far. The form shows this as the
 * name field's placeholder, so the name the CV would use is visible while
 * filling the form in rather than a surprise on the finished page.
 *
 * Empty whenever the URL isn't one yet — there is nothing honest to show for
 * half a domain.
 */
export function autoLinkLabel(value: string): string {
  const url = toUrl(value);
  return url ? labelFor(url) : "";
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
 * One link row, whichever of the shapes it was saved in.
 *
 * Today a row is a URL and the kind picked beside it. A bare string is a row
 * from before either field existed; an object with `value` is one from the
 * first dropdown; an object with `url` and no `type` is one from the spell in
 * between, when the row was named by hand — and that name is still read.
 */
function readRow(row: NonNullable<CvInput["profileLinks"]>[number]): {
  value: string;
  label: string;
  type: CvLinkType | null;
} {
  if (typeof row === "string") return { value: row, label: "", type: null };
  if ("value" in row) {
    return { value: row.value ?? "", label: "", type: (row.type ?? "linkedin") as CvLinkType };
  }
  return {
    value: row.url ?? "",
    label: (row.label ?? "").trim(),
    type: (row.type as CvLinkType | undefined) ?? null,
  };
}

/**
 * The contact links for a generated CV, in the order the candidate added them.
 *
 * The rows come first; the fixed fields below them are what the form used to
 * offer, and are still read so a CV saved before the change keeps its links.
 * A row that isn't recognisably a URL is dropped rather than guessed at — a
 * link a recruiter can't click is worse than one that isn't there.
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
    const { value, label, type } = readRow(row);
    if (!value.trim()) continue;
    const url = toUrl(value, type ? HANDLE_BASES[type] : undefined);
    if (!url) continue;
    /*
     * The kind picked in the form names the row. "other" has no name of its
     * own, so it falls through to whatever the candidate typed back when the
     * name was a free-text field, and failing that to the site's own name —
     * which is why an "other" row never needs naming to read well.
     */
    add((type && TYPE_LABELS[type]) || label || labelFor(url), url);
  }

  const legacy: { label: string; value: string; base?: string }[] = [
    { label: "LinkedIn", value: input.linkedin ?? "", base: HANDLE_BASES.linkedin },
    { label: "Personal website", value: input.portfolio ?? "" },
    { label: "GitHub", value: input.github ?? "", base: HANDLE_BASES.github },
  ];
  for (const entry of legacy) add(entry.label, toUrl(entry.value, entry.base));
  for (const entry of splitLoose(input.links ?? "")) {
    const url = toUrl(entry);
    if (url) add(labelFor(url), url);
  }

  return links;
}
