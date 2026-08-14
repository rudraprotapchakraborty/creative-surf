import { defineMessages } from "../types";

export const cvBuilderMessages = defineMessages({
  en: {
    metaTitle: "AI CV Builder — Free Professional CV Generator",
    metaDescription:
      "Turn a few rough notes into a polished, recruiter-ready CV. Answer a short form, let AI write it, and download it as a PDF — free, no sign-up.",
    hero: {
      badge: "Free AI tool",
      title: "AI CV Builder",
      subtitle:
        "Give us the rough details of your career. We'll turn them into a polished, recruiter-ready CV you can download as a PDF in seconds.",
    },
    authRequired: {
      title: "Sign in to build & save your CV",
      subtitle: "Please log in or create an account to generate professional CVs with AI and save them to your profile.",
      login: "Log in",
      register: "Create free account",
    },
    sections: {
      basics: "About you",
      background: "Your background",
      tailoring: "Polish & tailoring",
    },
    fields: {
      fullName: { label: "Full name", placeholder: "Alex Morgan" },
      jobTitle: { label: "Target role or current title", placeholder: "Senior Frontend Engineer" },
      email: { label: "Email", placeholder: "alex@example.com" },
      phone: { label: "Phone", placeholder: "+44 7700 900123" },
      location: { label: "Location", placeholder: "London, UK" },
      links: { label: "Links", placeholder: "linkedin.com/in/alexmorgan, alexmorgan.dev" },
      yearsExperience: { label: "Years of experience", placeholder: "6" },
      workHistory: {
        label: "Work history",
        placeholder:
          "Frontend Engineer at Northwind, 2021–now. Rebuilt the checkout, cut load time roughly in half, mentored two juniors.\n\nJunior Developer at Belltower, 2019–2021. Built internal dashboards in React.",
        hint: "Rough notes are fine — one role per paragraph, with dates if you have them.",
      },
      education: {
        label: "Education",
        placeholder: "BSc Computer Science, University of Leeds, 2015–2019",
      },
      skills: {
        label: "Skills",
        placeholder: "React, TypeScript, Node.js, Figma, team leadership, stakeholder comms",
      },
      targetJob: {
        label: "Target job description",
        placeholder: "Paste the job advert you're applying for…",
        hint: "Optional. Paste an advert and we'll emphasise the experience it asks for.",
      },
      tone: { label: "Tone" },
      language: { label: "CV language" },
    },
    tones: {
      professional: "Professional",
      concise: "Concise",
      impact: "Impact-driven",
    },
    actions: {
      generate: "Generate my CV",
      generating: "Writing your CV…",
      regenerate: "Regenerate",
      download: "Download PDF",
      startOver: "Clear form",
    },
    preview: {
      title: "Preview",
      placeholderTitle: "Your CV will appear here",
      placeholderSubtitle: "Fill in your details on the left and click 'Generate my CV' to see your live preview.",
      loading: "Drafting your CV. This usually takes 5–15 seconds.",
      downloadHint: "Choose “Save as PDF” in the print dialog to keep a copy.",
    },
    errors: {
      required: "Please add your name, target role, and email.",
      email: "Please enter a valid email address.",
      background: "Please add at least your work history, education, or skills.",
      generic: "Something went wrong. Please try again.",
    },
    cv: {
      summary: "Profile",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      projects: "Projects",
      certifications: "Certifications",
      languages: "Languages",
    },
    tips: {
      title: "Getting a better result",
      items: [
        "Include numbers where you have them — team sizes, budgets, percentages, timeframes.",
        "Write one paragraph per role, and include the dates so the timeline is right.",
        "Paste the advert you're applying for so the CV leads with what that employer asks for.",
        "We never invent employers, dates, or results — the more you give us, the stronger the CV.",
      ],
    },
  },

  fr: {
    metaTitle: "Générateur de CV par IA — CV professionnel gratuit",
    metaDescription:
      "Transformez quelques notes en un CV professionnel prêt pour les recruteurs. Remplissez un formulaire court, laissez l'IA le rédiger et téléchargez-le en PDF — gratuit, sans inscription.",
    hero: {
      badge: "Outil IA gratuit",
      title: "Générateur de CV par IA",
      subtitle:
        "Donnez-nous les grandes lignes de votre parcours. Nous en ferons un CV professionnel, prêt pour les recruteurs, téléchargeable en PDF en quelques secondes.",
    },
    authRequired: {
      title: "Connectez-vous pour créer et enregistrer votre CV",
      subtitle: "Veuillez vous connecter ou créer un compte pour générer votre CV avec l'IA et l'enregistrer dans votre profil.",
      login: "Se connecter",
      register: "Créer un compte gratuit",
    },
    sections: {
      basics: "À propos de vous",
      background: "Votre parcours",
      tailoring: "Finition et personnalisation",
    },
    fields: {
      fullName: { label: "Nom complet", placeholder: "Alex Morgan" },
      jobTitle: { label: "Poste visé ou titre actuel", placeholder: "Ingénieur frontend senior" },
      email: { label: "E-mail", placeholder: "alex@example.com" },
      phone: { label: "Téléphone", placeholder: "+33 6 12 34 56 78" },
      location: { label: "Localisation", placeholder: "Paris, France" },
      links: { label: "Liens", placeholder: "linkedin.com/in/alexmorgan, alexmorgan.dev" },
      yearsExperience: { label: "Années d'expérience", placeholder: "6" },
      workHistory: {
        label: "Expérience professionnelle",
        placeholder:
          "Ingénieur frontend chez Northwind, 2021–aujourd'hui. Refonte du tunnel d'achat, temps de chargement divisé par deux, encadrement de deux juniors.\n\nDéveloppeur junior chez Belltower, 2019–2021. Tableaux de bord internes en React.",
        hint: "Des notes brutes suffisent — un poste par paragraphe, avec les dates si vous les avez.",
      },
      education: {
        label: "Formation",
        placeholder: "Licence en informatique, Université de Lyon, 2015–2019",
      },
      skills: {
        label: "Compétences",
        placeholder: "React, TypeScript, Node.js, Figma, management d'équipe, relation client",
      },
      targetJob: {
        label: "Offre d'emploi visée",
        placeholder: "Collez l'annonce à laquelle vous postulez…",
        hint: "Facultatif. Collez une annonce et nous mettrons en avant l'expérience demandée.",
      },
      tone: { label: "Ton" },
      language: { label: "Langue du CV" },
    },
    tones: {
      professional: "Professionnel",
      concise: "Concis",
      impact: "Axé résultats",
    },
    actions: {
      generate: "Générer mon CV",
      generating: "Rédaction en cours…",
      regenerate: "Régénérer",
      download: "Télécharger en PDF",
      startOver: "Effacer le formulaire",
    },
    preview: {
      title: "Aperçu",
      placeholderTitle: "Votre CV apparaîtra ici",
      placeholderSubtitle: "Remplissez vos informations à gauche et cliquez sur Générer mon CV.",
      loading: "Rédaction de votre CV. Cela prend généralement 5 à 15 secondes.",
      downloadHint: "Choisissez « Enregistrer au format PDF » dans la fenêtre d'impression.",
    },
    errors: {
      required: "Veuillez indiquer votre nom, le poste visé et votre e-mail.",
      email: "Veuillez saisir une adresse e-mail valide.",
      background: "Ajoutez au moins votre expérience, votre formation ou vos compétences.",
      generic: "Une erreur est survenue. Veuillez réessayer.",
    },
    cv: {
      summary: "Profil",
      experience: "Expérience",
      education: "Formation",
      skills: "Compétences",
      projects: "Projets",
      certifications: "Certifications",
      languages: "Langues",
    },
    tips: {
      title: "Pour un meilleur résultat",
      items: [
        "Ajoutez des chiffres quand vous en avez : taille d'équipe, budget, pourcentages, délais.",
        "Écrivez un paragraphe par poste et indiquez les dates pour une chronologie juste.",
        "Collez l'annonce visée : le CV mettra en avant ce que cet employeur recherche.",
        "Nous n'inventons jamais d'employeur, de date ni de résultat — plus vous en dites, meilleur est le CV.",
      ],
    },
  },

  de: {
    metaTitle: "KI-Lebenslauf-Generator — kostenloser professioneller Lebenslauf",
    metaDescription:
      "Aus ein paar Stichpunkten wird ein professioneller Lebenslauf. Kurzes Formular ausfüllen, von der KI schreiben lassen und als PDF herunterladen — kostenlos, ohne Anmeldung.",
    hero: {
      badge: "Kostenloses KI-Tool",
      title: "KI-Lebenslauf-Generator",
      subtitle:
        "Nennen Sie uns die Eckdaten Ihres Werdegangs. Wir machen daraus einen ausgefeilten Lebenslauf, den Sie in Sekunden als PDF herunterladen.",
    },
    authRequired: {
      title: "Melden Sie sich an, um Ihren Lebenslauf zu erstellen und zu speichern",
      subtitle: "Bitte melden Sie sich an oder erstellen Sie ein Konto, um Ihren Lebenslauf mit KI zu erstellen.",
      login: "Anmelden",
      register: "Kostenloses Konto erstellen",
    },
    sections: {
      basics: "Über Sie",
      background: "Ihr Werdegang",
      tailoring: "Feinschliff & Ausrichtung",
    },
    fields: {
      fullName: { label: "Vollständiger Name", placeholder: "Alex Morgan" },
      jobTitle: { label: "Zielposition oder aktueller Titel", placeholder: "Senior Frontend-Entwickler" },
      email: { label: "E-Mail", placeholder: "alex@example.com" },
      phone: { label: "Telefon", placeholder: "+49 151 23456789" },
      location: { label: "Standort", placeholder: "Berlin, Deutschland" },
      links: { label: "Links", placeholder: "linkedin.com/in/alexmorgan, alexmorgan.dev" },
      yearsExperience: { label: "Berufsjahre", placeholder: "6" },
      workHistory: {
        label: "Berufserfahrung",
        placeholder:
          "Frontend-Entwickler bei Northwind, 2021–heute. Checkout neu gebaut, Ladezeit etwa halbiert, zwei Junioren betreut.\n\nJunior-Entwickler bei Belltower, 2019–2021. Interne Dashboards mit React.",
        hint: "Stichpunkte genügen — eine Position pro Absatz, mit Zeitraum, falls vorhanden.",
      },
      education: {
        label: "Ausbildung",
        placeholder: "B.Sc. Informatik, Universität Hamburg, 2015–2019",
      },
      skills: {
        label: "Kenntnisse",
        placeholder: "React, TypeScript, Node.js, Figma, Teamführung, Stakeholder-Kommunikation",
      },
      targetJob: {
        label: "Stellenanzeige",
        placeholder: "Fügen Sie die Stellenanzeige ein, auf die Sie sich bewerben…",
        hint: "Optional. Mit Stellenanzeige betonen wir die geforderte Erfahrung.",
      },
      tone: { label: "Tonalität" },
      language: { label: "Sprache des Lebenslaufs" },
    },
    tones: {
      professional: "Professionell",
      concise: "Prägnant",
      impact: "Ergebnisorientiert",
    },
    actions: {
      generate: "Lebenslauf erstellen",
      generating: "Lebenslauf wird geschrieben…",
      regenerate: "Neu erstellen",
      download: "PDF herunterladen",
      startOver: "Formular leeren",
    },
    preview: {
      title: "Vorschau",
      placeholderTitle: "Ihr Lebenslauf erscheint hier",
      placeholderSubtitle: "Füllen Sie Ihre Angaben links aus und klicken Sie auf Lebenslauf erstellen.",
      loading: "Ihr Lebenslauf entsteht. Das dauert meist 5–15 Sekunden.",
      downloadHint: "Wählen Sie im Druckdialog „Als PDF speichern“.",
    },
    errors: {
      required: "Bitte geben Sie Name, Zielposition und E-Mail an.",
      email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      background: "Bitte ergänzen Sie mindestens Berufserfahrung, Ausbildung oder Kenntnisse.",
      generic: "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
    },
    cv: {
      summary: "Profil",
      experience: "Berufserfahrung",
      education: "Ausbildung",
      skills: "Kenntnisse",
      projects: "Projekte",
      certifications: "Zertifikate",
      languages: "Sprachen",
    },
    tips: {
      title: "So wird das Ergebnis besser",
      items: [
        "Nennen Sie Zahlen, wo Sie welche haben: Teamgrößen, Budgets, Prozente, Zeiträume.",
        "Ein Absatz pro Position, mit Zeitraum — so stimmt die Chronologie.",
        "Fügen Sie die Stellenanzeige ein, dann beginnt der Lebenslauf mit dem Geforderten.",
        "Wir erfinden keine Arbeitgeber, Daten oder Ergebnisse — je mehr Sie angeben, desto stärker der Lebenslauf.",
      ],
    },
  },

  ar: {
    metaTitle: "Munshi Al-Sira Al-Dhatiyya bil-Zaka Al-Istinai — Majjanan",
    metaDescription:
      "Hawwil bad Al-Mulahazat ila Sira Dhatiyya ihtirafiyya jahiza lil-Muwazzifin. Imla namudhajan qasiran, da Al-Zaka Al-Istinai yaktubuha, wa hammilha ka-PDF — majjanan, bidun tasjil.",
    hero: {
      badge: "Adat Zaka Istinai Majjaniyya",
      title: "Munshi Al-Sira Al-Dhatiyya bil-Zaka Al-Istinai",
      subtitle:
        "Atina Al-Khutut Al-Aridha li-Masirak Al-Mihani, wa sanuhawwiluha ila Sira Dhatiyya ihtirafiyya yumkinuka tahmiluha ka-PDF fi thawani.",
    },
    authRequired: {
      title: "Sajjil dukhulak li-insha wa hifz Siratik Al-Dhatiyya",
      subtitle: "Al-Raja al-dukhul aw insha hisab li-tahmil Siratik wal-wusul ilaiha fi ayy waqt.",
      login: "Tasjil Al-Dukhul",
      register: "Insha hisab majjani",
    },
    sections: {
      basics: "Manlumat Anka",
      background: "Khalfiyyatuka",
      tailoring: "Al-Lamsat Al-Akhira wal-Takhsis",
    },
    fields: {
      fullName: { label: "Al-Ism Al-Kamil", placeholder: "Alex Morgan" },
      jobTitle: { label: "Al-Wazifa Al-Mustahdafa aw Al-Musamma Al-Hali", placeholder: "Muhandis Frontend Awwal" },
      email: { label: "Al-Barid Al-Iliktruni", placeholder: "alex@example.com" },
      phone: { label: "Raqm Al-Hatif", placeholder: "+971 50 123 4567" },
      location: { label: "Al-Mawqi", placeholder: "Dubai, Al-Imarat" },
      links: { label: "Al-Rawabit", placeholder: "linkedin.com/in/alexmorgan, alexmorgan.dev" },
      yearsExperience: { label: "Sanawat Al-Khibra", placeholder: "6" },
      workHistory: {
        label: "Al-Khibra Al-Amaliyya",
        placeholder:
          "Muhandis Frontend fi Northwind, 2021–Al-An. Aadtu bina safhat Al-Dafi, wa qallaltu waqt Al-Tahmil bil-nisf, wa darrabtu muhandisayn.\n\nMutawwir Mubtadi fi Belltower, 2019–2021. Bina lawhat tahakkum dakhiliyya bi-React.",
        hint: "Al-Mulahazat Al-Basita takfi — wazifa wahida li-kull faqra, ma Al-Tawarikh in wujidat.",
      },
      education: {
        label: "Al-Talim",
        placeholder: "Bakalurius Ulum Al-Hasib, Jamiat Al-Qahira, 2015–2019",
      },
      skills: {
        label: "Al-Maharat",
        placeholder: "React, TypeScript, Node.js, Figma, qiyadat Al-Fariq, Al-Tawasul",
      },
      targetJob: {
        label: "Wasf Al-Wazifa Al-Mustahdafa",
        placeholder: "Alsiq ilan Al-Wazifa Al-Ladhi tuqaddim laha…",
        hint: "Ikhtiyari. Alsiq Al-Ilan wa sanurakkiz ala Al-Khibra Al-Matluba.",
      },
      tone: { label: "Al-Uslub" },
      language: { label: "Lughat Al-Sira Al-Dhatiyya" },
    },
    tones: {
      professional: "Ihtirafi",
      concise: "Mukhtasar",
      impact: "Murakkiz ala Al-Nataij",
    },
    actions: {
      generate: "Anshi Siratee Al-Dhatiyya",
      generating: "Jari kitabat Siratik…",
      regenerate: "Iadat Al-Insha",
      download: "Tahmil PDF",
      startOver: "Masah Al-Namudhaj",
    },
    preview: {
      title: "Muaayana",
      placeholderTitle: "Satakharu Siratuka Al-Dhatiyya huna",
      placeholderSubtitle: "Imla bayanatik ala Al-Yasar wa iqnad ala Anshi Siratee.",
      loading: "Jari isdad Siratik. Yastaghriq adatan 5–15 thaniya.",
      downloadHint: "Ikhtar « Hifz bi-sighat PDF » fi nafidhat Al-Tiba.",
    },
    errors: {
      required: "Al-Raja idkhal Al-Ism wal-Wazifa Al-Mustahdafa wal-Barid Al-Iliktruni.",
      email: "Al-Raja idkhal barid iliktruni sahih.",
      background: "Al-Raja idafat Al-Khibra aw Al-Talim aw Al-Maharat ala Al-Aqall.",
      generic: "Hadatha khata ma. Al-Raja Al-Muhawala marra ukhra.",
    },
    cv: {
      summary: "Al-Milaff Al-Shakhsi",
      experience: "Al-Khibra",
      education: "Al-Talim",
      skills: "Al-Maharat",
      projects: "Al-Mashari",
      certifications: "Al-Shahadat",
      languages: "Al-Lughat",
    },
    tips: {
      title: "Li-natija afdal",
      items: [
        "Adif Al-Arqam matta amkan: hajm Al-Fariq, Al-Mizaniyyat, Al-Nisab Al-Miawiyya, Al-Muddat.",
        "Uktub faqra li-kull wazifa ma Al-Tawarikh li-takun Al-Jadwala sahiha.",
        "Alsiq ilan Al-Wazifa li-tabda Al-Sira bima yatlubuhu sahib Al-Amal.",
        "La nakhtali arbab amal aw tawarikh aw nataij — kullama zadat manlumatuka, qawiyat Al-Sira.",
      ],
    },
  },
});
