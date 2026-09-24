import { defineMessages } from "../types";

/**
 * Copy for the sitemap page itself. Its links are labelled from each page's
 * own translations (see app/sitemap/page.tsx), so there is no label table here.
 */
export const sitemapMessages = defineMessages({
  en: {
    metaTitle: "Sitemap",
    metaDescription: "Browse all pages on the Creative Surf website.",
    breadcrumbCurrent: "Sitemap",
    title: "Sitemap",
    mainPages: "Main Pages",
  },

  de: {
    metaTitle: "Sitemap",
    metaDescription: "Alle Seiten der Creative-Surf-Website im Überblick.",
    breadcrumbCurrent: "Sitemap",
    title: "Sitemap",
    mainPages: "Hauptseiten",
  },
  ar: {
    metaTitle: "Kharitat Al-Mawqi",
    metaDescription: "Tasaffah jami safahat mawqi Creative Surf.",
    breadcrumbCurrent: "Kharitat Al-Mawqi",
    title: "Kharitat Al-Mawqi",
    mainPages: "Al-Safahat Al-Raisiyya",
  },

  bn: {
    metaTitle: "সাইটম্যাপ",
    metaDescription: "Creative Surf ওয়েবসাইটের সব পেজ দেখুন।",
    breadcrumbCurrent: "সাইটম্যাপ",
    title: "সাইটম্যাপ",
    mainPages: "প্রধান পেজসমূহ",
  },
});
