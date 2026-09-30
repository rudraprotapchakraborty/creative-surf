import { defineMessages } from "../types";

/**
 * WhatsApp CTAs on the property pages. The `prefill.*` strings become the
 * buyer's opening message, so they read as the buyer speaking to us.
 */
export const realEstateWhatsAppMessages = defineMessages({
  en: {
    floating: "Chat on WhatsApp",
    prefill: {
      general: "Hi Creative Surf, I'd like to know more about your real estate projects.",
      project: "Hi Creative Surf, I'm interested in {name}. Could you share more details? {url}",
    },
  },
  fr: {
    floating: "Discuter sur WhatsApp",
    prefill: {
      general: "Bonjour Creative Surf, j'aimerais en savoir plus sur vos projets immobiliers.",
      project: "Bonjour Creative Surf, le projet {name} m'intéresse. Pourriez-vous m'en dire plus ? {url}",
    },
  },
  de: {
    floating: "Auf WhatsApp chatten",
    prefill: {
      general: "Hallo Creative Surf, ich möchte mehr über Ihre Immobilienprojekte erfahren.",
      project: "Hallo Creative Surf, ich interessiere mich für {name}. Könnten Sie mir mehr Details schicken? {url}",
    },
  },
  ar: {
    floating: "Dardish ala WhatsApp",
    prefill: {
      general: "Marhaban Creative Surf, awadd maarifat al-mazid an mashariakum al-aqariyya.",
      project: "Marhaban Creative Surf, ana muhtam bi {name}. Hal yumkinukum irsal tafasil akthar? {url}",
    },
  },
  bn: {
    floating: "হোয়াটসঅ্যাপে চ্যাট করুন",
    prefill: {
      general: "হ্যালো Creative Surf, আপনাদের রিয়েল এস্টেট প্রজেক্ট সম্পর্কে আরও জানতে চাই।",
      project: "হ্যালো Creative Surf, আমি {name} প্রজেক্টটিতে আগ্রহী। আরও বিস্তারিত জানাতে পারবেন? {url}",
    },
  },
});
