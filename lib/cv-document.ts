import type { GeneratedCv } from "./cv-types";

/**
 * Renders a generated CV as a standalone, self-contained HTML document.
 *
 * The same string feeds the on-screen preview (via an iframe `srcdoc`) and the
 * PDF export (via a hidden iframe's print dialog), so the preview and the
 * printed page can never drift apart. Keeping it out of React also means the
 * document is immune to the site's global stylesheet, dark mode, and fonts —
 * a CV must look identical on every visitor's machine.
 */

export type CvDocumentLabels = {
  summary: string;
  experience: string;
  education: string;
  skills: string;
  projects: string;
  certifications: string;
  languages: string;
};

const esc = (value: string): string =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Only http(s) and mailto links survive — anything else is rendered as plain text. */
const safeHref = (url: string): string | null => {
  const trimmed = String(url ?? "").trim();
  if (!trimmed) return null;
  if (/^(https?:|mailto:)/i.test(trimmed)) return trimmed;
  if (/^www\./i.test(trimmed) || /^[\w-]+\.[\w.-]+\//.test(trimmed)) return `https://${trimmed}`;
  return null;
};

const linkOrText = (url: string, label: string): string => {
  const href = safeHref(url);
  return href ? `<a href="${esc(href)}">${esc(label)}</a>` : esc(label);
};

/** Strips the scheme so long URLs stay readable on paper. */
const prettyUrl = (url: string): string => String(url ?? "").replace(/^https?:\/\//i, "").replace(/\/$/, "");

const section = (title: string, body: string): string =>
  body.trim() ? `<section class="block"><h2>${esc(title)}</h2>${body}</section>` : "";

export function buildCvHtml(cv: GeneratedCv, labels: CvDocumentLabels): string {
  const contactBits = [
    cv.contact.location ? esc(cv.contact.location) : "",
    cv.contact.email ? linkOrText(`mailto:${cv.contact.email}`, cv.contact.email) : "",
    cv.contact.phone ? esc(cv.contact.phone) : "",
    ...(cv.contact.links ?? []).map((link) => linkOrText(link.url, link.label || prettyUrl(link.url))),
  ].filter(Boolean);

  const experience = (cv.experience ?? [])
    .map(
      (job) => `
      <article class="entry">
        <div class="entry-head">
          <h3>${esc(job.role)}${job.company ? ` <span class="at">·</span> <span class="org">${esc(job.company)}</span>` : ""}</h3>
          ${job.period ? `<span class="period">${esc(job.period)}</span>` : ""}
        </div>
        ${job.location ? `<p class="meta">${esc(job.location)}</p>` : ""}
        ${
          (job.bullets ?? []).length
            ? `<ul>${job.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join("")}</ul>`
            : ""
        }
      </article>`
    )
    .join("");

  const education = (cv.education ?? [])
    .map(
      (item) => `
      <article class="entry">
        <div class="entry-head">
          <h3>${esc(item.degree)}${item.institution ? ` <span class="at">·</span> <span class="org">${esc(item.institution)}</span>` : ""}</h3>
          ${item.period ? `<span class="period">${esc(item.period)}</span>` : ""}
        </div>
        ${item.details ? `<p class="meta">${esc(item.details)}</p>` : ""}
      </article>`
    )
    .join("");

  const skills = (cv.skills ?? [])
    .filter((group) => (group.items ?? []).length)
    .map(
      (group) => `
      <div class="skill-row">
        <span class="skill-label">${esc(group.category)}</span>
        <span class="skill-items">${group.items.map(esc).join(" · ")}</span>
      </div>`
    )
    .join("");

  const projects = (cv.projects ?? [])
    .map(
      (project) => `
      <article class="entry compact">
        <h3>${esc(project.name)}</h3>
        ${project.description ? `<p class="meta">${esc(project.description)}</p>` : ""}
      </article>`
    )
    .join("");

  const certifications = (cv.certifications ?? []).length
    ? `<ul class="plain">${cv.certifications.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`
    : "";

  const languages = (cv.languages ?? []).length
    ? `<p class="inline-list">${cv.languages.map(esc).join(" · ")}</p>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(cv.fullName || "Curriculum Vitae")}</title>
<style>
  @page { size: A4; margin: 14mm 15mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #ffffff; }
  body {
    font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
    color: #1c2430;
    font-size: 10.5pt;
    line-height: 1.5;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .sheet { max-width: 180mm; margin: 0 auto; padding: 14mm 15mm; }
  @media print { .sheet { max-width: none; margin: 0; padding: 0; } }

  header { border-bottom: 2px solid #0066a2; padding-bottom: 10px; margin-bottom: 18px; }
  h1 { font-size: 24pt; line-height: 1.15; margin: 0; letter-spacing: -0.02em; color: #0f1723; }
  .headline { margin: 4px 0 0; font-size: 11pt; font-weight: 600; color: #0066a2; }
  .contact { margin: 8px 0 0; font-size: 9pt; color: #4a5666; }
  .contact span + span::before { content: "•"; margin: 0 7px; color: #a8b2bf; }
  a { color: #0066a2; text-decoration: none; }

  .block { margin-bottom: 16px; }
  h2 {
    font-size: 9pt; text-transform: uppercase; letter-spacing: 0.11em;
    color: #0066a2; margin: 0 0 8px; padding-bottom: 3px;
    border-bottom: 1px solid #dde3ea; font-weight: 700;
  }
  h3 { font-size: 11pt; margin: 0; font-weight: 650; color: #0f1723; }
  .org { font-weight: 550; color: #33404f; }
  .at { color: #a8b2bf; font-weight: 400; }

  /* Keep a role and its bullets together when the page breaks. */
  .entry { margin-bottom: 12px; break-inside: avoid; page-break-inside: avoid; }
  .entry:last-child { margin-bottom: 0; }
  .entry.compact { margin-bottom: 8px; }
  .entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  .period { font-size: 9pt; color: #64707f; white-space: nowrap; }
  .meta { margin: 2px 0 0; font-size: 9.5pt; color: #5a6675; }

  ul { margin: 6px 0 0; padding-left: 16px; }
  li { margin-bottom: 3px; }
  ul.plain { list-style: none; padding-left: 0; margin-top: 0; }
  ul.plain li { padding-left: 14px; position: relative; }
  ul.plain li::before { content: "▸"; position: absolute; left: 0; color: #0066a2; }
  p { margin: 0; }
  .inline-list { font-size: 10pt; }

  .skill-row { display: flex; gap: 10px; margin-bottom: 5px; break-inside: avoid; }
  .skill-label { flex: 0 0 30%; font-weight: 650; color: #0f1723; font-size: 10pt; }
  .skill-items { flex: 1; color: #33404f; }
</style>
</head>
<body>
  <div class="sheet">
    <header>
      <h1>${esc(cv.fullName)}</h1>
      ${cv.headline ? `<p class="headline">${esc(cv.headline)}</p>` : ""}
      ${contactBits.length ? `<p class="contact">${contactBits.map((bit) => `<span>${bit}</span>`).join("")}</p>` : ""}
    </header>
    ${cv.summary ? section(labels.summary, `<p>${esc(cv.summary)}</p>`) : ""}
    ${section(labels.experience, experience)}
    ${section(labels.skills, skills)}
    ${section(labels.projects, projects)}
    ${section(labels.education, education)}
    ${section(labels.certifications, certifications)}
    ${section(labels.languages, languages)}
  </div>
</body>
</html>`;
}
