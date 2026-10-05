import { defineMessages } from "../types";

/**
 * The homepage's CV-builder teaser: the builder's own headline, lede, claims
 * and call to action, copied here so the homepage doesn't ship the whole
 * builder's copy (every label, in five languages) just to show these lines.
 * Kept word for word in step with the hero of messages/cvBuilder.ts.
 */
export const cvTeaserMessages = defineMessages("cvTeaser", {
  en: {
    hero: {
      title: "Make your CV",
      titleHighlight: "in 60 seconds",
      subtitle: "Paste your rough notes and the job advert. Get a recruiter-ready CV built only from what you actually did — scored against that advert, and yours as a free PDF.",
      ctaPrimary: "Build my CV",
      trust: ["Nothing invented","Free PDF, no export fee","ATS-safe single column"],
    },
  },
});
