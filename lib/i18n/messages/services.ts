import { defineMessages } from "../types";
import { servicesIndexMessages } from "./servicesIndex";

export const servicesMessages = defineMessages("services", {
  en: {
    ...servicesIndexMessages.en,
    metaTitle: "Our Services | Creative Surf",
    metaDescription:
      "Explore our comprehensive range of creative and digital marketing services designed to elevate your brand.",
    hero: {
      kicker: "Our Services",
      title: "Everything your brand needs",
      titleAccent: "to grow, in one team.",
      subtitle:
        "Comprehensive creative solutions tailored to elevate your brand and achieve your business goals",
      ctaPrimary: "Start a project",
      ctaSecondary: "Explore services",
    },
    offerKicker: "What We Offer",
    offerTitle: "Six disciplines,",
    offerAccent: "one integrated team.",
    explore: "Explore",
    processKicker: "How We Work",
    processTitle: "A clear process,",
    processAccent: "from first call to growth.",
    processSubtitle: "Five stages and one accountable team — so you always know what happens next.",
    process: [
      {
        step: "Discovery",
        description:
          "We begin by understanding your business, goals, and target audience to create a strategic foundation.",
      },
      {
        step: "Strategy",
        description:
          "Based on our findings, we develop a tailored strategy that aligns with your objectives and market position.",
      },
      {
        step: "Creation",
        description: "Our creative team brings the strategy to life through compelling design and content.",
      },
      {
        step: "Implementation",
        description: "We execute the plan across all relevant channels and platforms with precision.",
      },
      {
        step: "Optimization",
        description: "Through continuous monitoring and analysis, we refine our approach to maximize results.",
      },
    ],
    whyKicker: "Why Creative Surf",
    whyTitle: "Built for results,",
    whyAccent: "not just deliverables.",
    why: [
      {
        title: "Strategy first",
        description: "Every piece of work traces back to a business goal, agreed before anything is made.",
      },
      {
        title: "Measured by data",
        description: "Clear reporting on what's working, so decisions rest on numbers rather than opinions.",
      },
      {
        title: "One team, end to end",
        description:
          "Strategists, designers, developers and marketers under one roof — nothing lost in handoffs between agencies.",
      },
      {
        title: "Transparent partnership",
        description: "Straightforward timelines, honest recommendations and a team you can actually reach.",
      },
    ],
    faqKicker: "FAQ",
    faqTitle: "Questions,",
    faqAccent: "answered.",
    faq: [
      {
        q: "Do I need to sign up for every service?",
        a: "No. You can start with a single service and add more as you grow. Many clients begin with one project and expand once they see results.",
      },
      {
        q: "How long does a typical project take?",
        a: "It depends on scope. A focused campaign or brand refresh can take a few weeks; a full website or ongoing marketing programme is planned in phases with clear milestones.",
      },
      {
        q: "How do you measure success?",
        a: "We agree the metrics that matter to you at the start — leads, sales, rankings, engagement — and report against them regularly.",
      },
      {
        q: "Can you work alongside our in-house team?",
        a: "Absolutely. We can own a project end to end, or plug into your existing team to fill specific gaps.",
      },
    ],
    cta: {
      kicker: "Let's Talk",
      title: "Ready to transform",
      titleAccent: "your brand?",
      body: "Let's collaborate to create something extraordinary that drives real results for your business.",
      button: "Get in Touch",
    },
  },
});
