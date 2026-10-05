import { defineMessages } from "../types";

/**
 * Copy for /team. Names and cities are fixed in the page component (they are
 * proper nouns and never translate); only roles and surrounding copy live here.
 */
export const teamMessages = defineMessages("team", {
  en: {
    metaTitle: "Our Team | Creative Surf",
    metaDescription:
      "Meet the people behind Creative Surf — the team building our strategy, products and stories.",
    hero: {
      eyebrow: "Who we are",
      title: "Meet the team",
      subtitle:
        "A small crew with a wide reach — strategy, engineering, visuals and storytelling under one roof.",
    },
    roles: {
      marketingLead: "Digital Marketing Lead",
      webDeveloper: "Web Developer",
      contentStrategist: "Content Strategist",
      visualiser: "Senior Visualiser | Editor",
    },
    bios: {
      marketingLead:
        "Leads our campaigns and growth work, and looks after our clients and partnerships.",
      webDeveloper:
        "Builds and maintains the Creative Surf platform, from interface to infrastructure.",
      contentStrategist:
        "Plans the words behind our campaigns, blogs and brand voice.",
      visualiser:
        "Turns ideas into visuals — design, motion and the edit that ties it together.",
      editor:
        "Shapes our video and visual output, from first storyboard to final cut.",
    },
    meta: {
      section: "Team",
      roster: "The roster",
      where: "Where we work",
      count: "{people} people · {cities} cities · {countries} countries",
      people: "{count} people",
      person: "1 person",
      localTime: "Local time",
      contactLabel: "Contact",
    },
    cta: {
      title: "Want to work with us?",
      body: "We are always happy to hear about new projects and ideas.",
      button: "Get in touch",
    },
  },
});
