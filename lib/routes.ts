/**
 * Every page that actually exists on the marketing site. Copy across the older
 * sections links to dozens of pages that were planned but never built; pages
 * pass their links through `liveHref` so a card only becomes a link when
 * there is somewhere real to go.
 *
 * Add a route here when you add its page.
 */
const LIVE_ROUTES = new Set([
  "/",
  "/about",
  "/about/approach",
  "/about/awards",
  "/about/careers",
  "/about/history",
  "/about/pricing/website-cost",
  "/about/reviews",
  "/about/values",
  "/blogs",
  "/contact",
  "/cv-builder",
  "/privacy-policy",
  "/privacy-terms",
  "/real-estate",
  "/real-estate/blogs",
  "/real-estate/projects",
  "/services",
  "/sitemap",
  "/team",
  "/terms",
]);

/** The live routes as a list, for app/sitemap.ts. */
export const LIVE_PATHS: readonly string[] = [...LIVE_ROUTES];

/** Sections whose children are generated from data (posts, projects). */
const LIVE_PREFIXES = ["/blogs/", "/real-estate/blogs/", "/real-estate/projects/"];

export function isLiveRoute(href: string): boolean {
  if (!href.startsWith("/")) return true; // external, mailto:, tel:
  const path = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  return LIVE_ROUTES.has(path) || LIVE_PREFIXES.some((prefix) => path.startsWith(prefix));
}

/** The href when it leads somewhere real, otherwise undefined. */
export function liveHref(href: string | undefined): string | undefined {
  return href && isLiveRoute(href) ? href : undefined;
}
