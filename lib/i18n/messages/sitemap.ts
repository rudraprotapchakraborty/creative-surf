import { defineMessages } from "../types";

/**
 * Copy for the sitemap page itself. Its links are labelled from each page's
 * own translations (see app/sitemap/page.tsx), so there is no label table here.
 */
export const sitemapMessages = defineMessages("sitemap", {
  en: {
    metaTitle: "Sitemap",
    metaDescription: "Browse all pages on the Creative Surf website.",
    breadcrumbCurrent: "Sitemap",
    title: "Sitemap",
    mainPages: "Main Pages",
  },
});
