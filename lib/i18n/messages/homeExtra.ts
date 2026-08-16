import { defineMessages } from "../types";

/**
 * Copy for the newer homepage sections (process, closing CTA).
 * English-only for now — the translator falls back to `en` per-key, so
 * fr/de/ar visitors see this in English until it's translated.
 */
export const homeExtraMessages = defineMessages({
  en: {
    webDev: {
      badge: "Web Development",
      headingLine1: "Sites we've",
      headingAccent: "brought to life.",
      intro: "Real projects, live in production — designed and engineered end-to-end by our team.",
      ctaLabel: "Visit live site",
      projects: [
        {
          category: "Film & Entertainment",
          description: "A cinematic studio site with a live press wall pulling coverage from national outlets.",
        },
        {
          category: "Marketing Agency",
          description: "A performance-led brand site built around bold serif type and a confident dark palette.",
        },
        {
          category: "Fine Dining",
          description: "A moody, editorial reservation site for a Pan-Asian restaurant in the heart of Dhaka.",
        },
        {
          category: "Real Estate",
          description: "A premium developer showcase for browsing projects and scheduling site visits.",
        },
      ],
    },

    process: {
      badge: "How We Work",
      headingLine1: "A process built for",
      headingAccent: "momentum.",
      intro: "No guesswork, no black boxes — just a clear path from brief to breakthrough.",
      steps: [
        {
          title: "Discover",
          description: "We dig into your brand, audience, and goals to find the opportunity hiding in plain sight.",
        },
        {
          title: "Design",
          description: "Strategy becomes story — identity, UX, and creative direction take shape around what matters.",
        },
        {
          title: "Build",
          description: "Websites, campaigns, and content go into production with obsessive, senior-level craft.",
        },
        {
          title: "Grow",
          description: "We launch, measure, and iterate — turning real data into compounding, long-term results.",
        },
      ],
    },

    cta: {
      badge: "Let's Talk",
      headingLine1: "Got an idea worth",
      headingAccent: "building?",
      subtitle: "Tell us where you want to go — we'll handle the strategy, the craft, and the growth to get you there.",
      ctaPrimary: "Start a Project",
      ctaSecondary: "creativesurfcs@gmail.com",
    },
  },
});
