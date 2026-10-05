import { defineMessages } from "../types";

/**
 * The services as an index — the line under the heading, the link to the
 * full page, and each service's name, pitch and disciplines. Shared by the
 * homepage and /services, so the two can't advertise different things, and
 * kept apart from the rest of the services copy so the homepage ships only
 * this.
 */
export const servicesIndexMessages = defineMessages("servicesIndex", {
  en: {
    offerSubtitle: "Pick a single service or combine them — every engagement is shaped around the result you need.",
    viewAll: "View all services",
    items: [
      {
        "title": "Brand Strategy",
        "description": "We develop comprehensive brand strategies that define your unique position in the market and connect with your target audience.",
        "tags": [
          "Positioning",
          "Identity",
          "Messaging"
        ]
      },
      {
        "title": "Web Design & Development",
        "description": "Custom websites that combine stunning visuals with seamless functionality to create memorable digital experiences.",
        "tags": [
          "UX / UI",
          "Next.js",
          "E-commerce"
        ]
      },
      {
        "title": "Digital Marketing",
        "description": "Data-driven marketing campaigns across multiple channels to increase your visibility and drive conversions.",
        "tags": [
          "Paid media",
          "Email",
          "Analytics"
        ]
      },
      {
        "title": "Content Creation",
        "description": "Engaging content that tells your story and resonates with your audience across all platforms.",
        "tags": [
          "Copywriting",
          "Video",
          "Photography"
        ]
      },
      {
        "title": "Social Media Management",
        "description": "Strategic social media presence that builds community and strengthens your brand voice.",
        "tags": [
          "Community",
          "Calendars",
          "Creators"
        ]
      },
      {
        "title": "SEO Optimization",
        "description": "Technical and content optimization to improve your search rankings and drive organic traffic.",
        "tags": [
          "Technical",
          "On-page",
          "Local"
        ]
      }
    ],
  },
});
