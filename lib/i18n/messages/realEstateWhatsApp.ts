import { defineMessages } from "../types";

/**
 * WhatsApp CTAs on the property pages. The `prefill.*` strings become the
 * buyer's opening message, so they read as the buyer speaking to us.
 */
export const realEstateWhatsAppMessages = defineMessages("realEstateWhatsApp", {
  en: {
    floating: "Chat on WhatsApp",
    prefill: {
      general: "Hi Creative Surf, I'd like to know more about your real estate projects.",
      project: "Hi Creative Surf, I'm interested in {name}. Could you share more details? {url}",
    },
  },
});
