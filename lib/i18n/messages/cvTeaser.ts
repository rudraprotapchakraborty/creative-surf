import { defineMessages } from "../types";

/**
 * The homepage's CV-builder teaser: the builder's own headline, lede, claims
 * and call to action, copied here so the homepage doesn't ship the whole
 * builder's copy (every label, in five languages) just to show these lines.
 * Kept word for word in step with the hero of messages/cvBuilder.ts.
 */
export const cvTeaserMessages = defineMessages({
  en: {
    hero: {
      title: "Make your CV",
      titleHighlight: "in 60 seconds",
      subtitle: "Paste your rough notes and the job advert. Get a recruiter-ready CV built only from what you actually did — scored against that advert, and yours as a free PDF.",
      ctaPrimary: "Build my CV",
      trust: ["Nothing invented","Free PDF, no export fee","ATS-safe single column"],
    },
  },
  fr: {
    hero: {
      title: "Créez votre CV",
      titleHighlight: "en 60 secondes",
      subtitle: "Collez vos notes en vrac et l'annonce visée. Vous obtenez un CV prêt pour les recruteurs, bâti uniquement sur ce que vous avez réellement fait — noté face à cette annonce, et à vous en PDF gratuit.",
      ctaPrimary: "Créer mon CV",
      trust: ["Rien d'inventé","PDF gratuit, sans frais d'export","Colonne unique, compatible ATS"],
    },
  },
  de: {
    hero: {
      title: "Ihr Lebenslauf",
      titleHighlight: "in 60 Sekunden",
      subtitle: "Fügen Sie Ihre groben Notizen und die Stellenanzeige ein. Sie bekommen einen Lebenslauf, der nur auf Ihren echten Erfahrungen beruht — bewertet gegen diese Anzeige, und als kostenloses PDF für Sie.",
      ctaPrimary: "Lebenslauf erstellen",
      trust: ["Nichts erfunden","Kostenloses PDF, keine Exportgebühr","ATS-sichere Einspaltigkeit"],
    },
  },
  ar: {
    hero: {
      title: "Usnaʿ Siratak Al-Thatiya",
      titleHighlight: "fi 60 thaniya",
      subtitle: "Alsiq mulahazatik Al-Aridha wa-Ilan Al-Wazifa. Satahsul ala Sira Dhatiyya jahiza lil-Muwazzifin mabniyya faqat ala ma faaltahu haqqan — bi-darajat mutabaqa ma dhalika Al-Ilan, wa laka ka-PDF majjani.",
      ctaPrimary: "Anshi Siratee",
      trust: ["La shay makhtalaq","PDF majjani, bidun rusum tasdir","Amud wahid mutawafiq ma Al-Farz"],
    },
  },
  bn: {
    hero: {
      title: "আপনার সিভি তৈরি করুন",
      titleHighlight: "৬০ সেকেন্ডে",
      subtitle: "আপনার এলোমেলো নোট আর চাকরির বিজ্ঞপ্তিটি পেস্ট করুন। পাবেন কেবল আপনার সত্যিকারের কাজ দিয়ে গড়া রিক্রুটার-উপযোগী সিভি — সেই বিজ্ঞপ্তির সাথে মিলের স্কোরসহ, আর আপনার নিজের বিনামূল্যের পিডিএফ।",
      ctaPrimary: "আমার সিভি বানান",
      trust: ["কিছুই বানানো নয়","বিনামূল্যে পিডিএফ, কোনো এক্সপোর্ট ফি নেই","ATS-উপযোগী এক কলাম"],
    },
  },
});
