import { defineMessages } from "../types";

/**
 * Copy for the newer homepage sections (web projects, testimonial
 * controls, closing CTA).
 * English-only for now — the translator falls back to `en` per-key, so
 * fr/de/ar visitors see this in English until it's translated.
 */
export const homeExtraMessages = defineMessages({
  en: {
    hero: {
      agency: "Digital agency",
      location: "Dhaka, Bangladesh",
      coords: "23.81° N · 90.41° E",
      disciplines: ["Digital Marketing", "Branding", "Content", "Web", "Real Estate Listings", "Film"],
      disciplinesLabel: "What we do",
      ctaPrimary: "Start a project",
      ctaSecondary: "See the work",
    },

    swell: {
      title: "Swell report — client outcomes",
      tabsLabel: "Client outcomes",
      footnote: "Curves are illustrative. Headline figures are as reported by our clients and campaigns.",
      series: [
        {
          tab: "Conversions",
          value: "+45%",
          label: "Conversion rate",
          context: "In three months",
          source: "TechVision Inc.",
          axis: ["Week 0", "Week 4", "Week 8", "Week 12"],
        },
        {
          tab: "Online sales",
          value: "+78%",
          label: "Online sales",
          context: "Since we started working together",
          source: "StyleHouse Boutique",
          axis: ["Kick-off", "", "", "Today"],
        },
        {
          tab: "Verified leads",
          value: "2,400+",
          label: "Verified buyer leads",
          context: "Across 50+ projects marketed",
          source: "Real estate campaigns",
          axis: ["First listing", "", "", "Today"],
        },
      ],
    },

    clients: {
      label: "Trusted by",
      count: "{count} brands and counting",
    },

    sections: {
      capabilities: "Capabilities",
      work: "Selected work",
      realEstate: "Real estate",
      tool: "Free tool",
      voices: "Clients",
      contact: "Contact",
    },

    capabilities: {
      explore: "Explore {name}",
    },

    tool: {
      example: "Example",
      score: "ATS score",
      scoreOf: "out of 100",
      covered: "Advert requirements covered",
      met: ["Stakeholder management", "SQL and reporting", "Agile delivery"],
      missing: ["Figma prototyping"],
      missingHint: "Add it if you have it",
      cvName: "Nadia Rahman",
      cvRole: "Product Analyst",
    },

    closing: {
      whatsapp: "Chat on WhatsApp",
      or: "or write to",
    },

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

    reviews: {
      prev: "Previous testimonial",
      next: "Next testimonial",
      showFrom: "Show testimonial from {name}",
    },

    cta: {
      badge: "Let's Talk",
      headingLine1: "Got an idea worth",
      headingAccent: "building?",
      subtitle: "Tell us where you want to go — we'll handle the strategy, the craft, and the growth to get you there.",
      ctaPrimary: "Start a project",
      ctaSecondary: "creativesurfcs@gmail.com",
    },
  },
});
