import type { MetadataRoute } from "next"

const BASE_URL = "https://www.creativesurf.agency"

/**
 * Keeps crawlers out of the API, the account pages and the admin editors.
 * Sign-in and registration stay crawlable: they are ordinary ways in.
 * The `$` pins the `new` editors to their exact path, so a post whose slug
 * starts with "new" is still crawlable.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/account",
        "/blogs/new$",
        "/blogs/edit/",
        "/real-estate/blogs/new$",
        "/real-estate/blogs/edit/",
        "/real-estate/projects/new$",
        "/real-estate/projects/edit/",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
