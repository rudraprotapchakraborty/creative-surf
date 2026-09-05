import { defineMessages } from "../types";

export const cvBuilderMessages = defineMessages({
  en: {
    metaTitle: "AI CV Builder — Free, ATS-Safe, Never Invents Facts",
    metaDescription:
      "Turn rough notes into a recruiter-ready CV. Paste the job advert, see which requirements you have covered, and download a free ATS-safe PDF. We never invent employers, dates or numbers.",
    hero: {
      badge: "Free AI tool",
      title: "AI CV Builder",
      titleHighlight: "that never makes things up",
      subtitle:
        "Give us the rough notes of your career and the advert you are chasing. You get a recruiter-ready CV built only from what you actually did, a score against that advert, and a free PDF.",
      ctaPrimary: "Build my CV",
      ctaSecondary: "See how we compare",
      trust: [
        "Free PDF — no export fee",
        "Nothing invented",
        "ATS-safe single column",
        "5 CV languages",
      ],
    },
    stats: [
      { value: "~60s", label: "From rough notes to a finished PDF" },
      { value: "0", label: "Paywalls between you and your download" },
      { value: "5", label: "Languages your CV can be written in" },
    ],
    authRequired: {
      title: "Sign in to build & save your CV",
      subtitle: "Please log in or create an account to generate professional CVs with AI and save them to your profile.",
      login: "Log in",
      register: "Create free account",
    },
    builder: {
      eyebrow: "The builder",
      title: "Three passes,",
      highlight: "one finished CV",
      description:
        "Fill in what you can remember. Rough notes are the point — turning them into proper CV language is our job, not yours.",
    },
    sections: {
      basics: "About you",
      basicsHint: "Your name, the role you are aiming at, and how a recruiter reaches you.",
      background: "Your background",
      backgroundHint: "Half-sentences and typos are fine. Detail matters far more than polish.",
      tailoring: "Target & tone",
      tailoringHint: "Paste the advert here to unlock the match score.",
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
          "Frontend Engineer at Northwind, 2021-now. Rebuilt the checkout, cut load time roughly in half, mentored two juniors.\n\nJunior Developer at Belltower, 2019-2021. Built internal dashboards in React.",
        hint: "Rough notes are fine — one role per paragraph, with dates if you have them.",
      },
      education: {
        label: "Education",
        placeholder: "BSc Computer Science, University of Leeds, 2015-2019",
      },
      skills: {
        label: "Skills",
        placeholder: "React, TypeScript, Node.js, Figma, team leadership, stakeholder comms",
      },
      targetJob: {
        label: "Target job description",
        placeholder: "Paste the job advert you're applying for…",
        hint: "Optional, but this is where the tool earns its keep — paste an advert and we score your CV against it.",
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
    progress: {
      label: "Detail so far",
      hint: "The more you give us, the less we have to leave out.",
    },
    saved: {
      title: "Your saved CVs",
      subtitle: "Every CV you generate is kept here, so you can hold one version per application.",
      empty: "Nothing saved yet — your first CV will appear here.",
      load: "Open",
      remove: "Delete",
      confirm: "Delete this saved CV? This cannot be undone.",
    },
    preview: {
      title: "Preview",
      placeholderTitle: "Your CV will appear here",
      placeholderSubtitle: "Fill in your details on the left and click 'Generate my CV' to see your live preview.",
      loading: "Drafting your CV. This usually takes 5-15 seconds.",
      downloadHint: "Choose “Save as PDF” in the print dialog to keep a copy. It prints as real, selectable text.",
    },
    match: {
      title: "Advert match",
      lockedTitle: "Match score locked",
      lockedBody:
        "Paste the job advert into “Target & tone” and we'll score this CV against what that employer actually asked for.",
      caption: "{matched} of {total} key terms from the advert appear in your CV",
      tiers: {
        strong: "Strong match",
        good: "Decent match",
        weak: "Needs work",
      },
      tierHints: {
        strong: "This CV is speaking the advert's language. Download it and send it.",
        good: "Close. If anything below is genuinely yours, add it to your notes and regenerate.",
        weak: "The advert is asking for things your notes never mention. Add whatever you have genuinely done, then regenerate.",
      },
      matchedLabel: "Covered",
      missingLabel: "Not covered yet",
      honestNote:
        "We will not add these for you. If it isn't in your notes, it doesn't go in your CV — that is the whole point.",
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
    why: {
      eyebrow: "Why this one",
      title: "Plenty of tools will write you a CV.",
      highlight: "Very few will keep it true.",
      description:
        "We built this for the moment after you hit download — when a recruiter asks you to talk through the CV you sent them.",
      cards: [
        {
          title: "It won't invent your career",
          body:
            "Most AI will happily hand you a 47% uplift you never achieved. Ours is instructed to use only what you typed: no invented employers, dates, degrees or metrics. Every line is one you can defend in the room.",
        },
        {
          title: "It writes the document, not just the sentences",
          body:
            "Grammar assistants improve text you have already written. You still have to structure a CV, choose the sections and decide what belongs. That is the part we do — rough notes in, an ordered, finished CV out.",
        },
        {
          title: "It answers the advert in front of you",
          body:
            "Paste the job description and the CV is reordered and reworded around it. Then we score the result and name the requirements you haven't covered yet, so you know before the recruiter does.",
        },
        {
          title: "The PDF is free, and it's real text",
          body:
            "No export fee, no watermark, no 'upgrade to download'. It prints as selectable vector text in a single-column layout with no tables or text boxes — the things that usually break an applicant tracking system.",
        },
        {
          title: "Five languages, one career",
          body:
            "Write the same CV in English, French, German, Spanish or Arabic, independently of the language you are browsing in. Useful when you are applying across Europe and the Gulf rather than in one market.",
        },
        {
          title: "There are real people behind it",
          body:
            "We are a working agency, not an anonymous subscription. Your CVs stay in your account so you can hold one version per application, and there is a real team on the other end of the contact form.",
        },
      ],
    },
    honesty: {
      eyebrow: "The difference in one example",
      title: "Rough note in.",
      highlight: "Honest CV out.",
      description:
        "The same handful of words, handled three ways. This is the entire argument for using this instead of a general chatbot.",
      typedLabel: "What you actually typed",
      typedBody: "Worked on the checkout at Northwind, made it faster, helped two juniors.",
      genericLabel: "What a general AI tends to write",
      genericBody:
        "Drove a 47% increase in checkout conversion and led a team of 8 engineers, delivering $2M in incremental annual revenue.",
      genericNote: "Numbers you never gave it. You will be asked about them.",
      oursLabel: "What we write",
      oursBody:
        "Rebuilt the Northwind checkout, cutting load time and smoothing the path to purchase. Mentored two junior developers through their first production releases.",
      oursNote: "Sharper wording, identical facts. Nothing here can catch you out.",
    },
    compare: {
      eyebrow: "An honest comparison",
      title: "Where we fit —",
      highlight: "and where we don't",
      description:
        "Writing assistants and general chatbots are good tools. They are just not CV builders. Here is the difference, plainly.",
      feature: "What you need",
      columns: {
        us: "Creative Surf",
        assistant: "Writing assistants",
        chatbot: "General AI chat",
        sites: "Typical CV sites",
      },
      rows: [
        {
          label: "Turns rough notes into a finished CV",
          us: "Yes",
          assistant: "No — it edits text you wrote",
          chatbot: "If you prompt it well",
          sites: "You still write every line",
        },
        {
          label: "Gives you a laid-out, print-ready document",
          us: "Yes",
          assistant: "No",
          chatbot: "Chat text you format yourself",
          sites: "Yes",
        },
        {
          label: "Rewrites the CV around a specific advert",
          us: "Yes",
          assistant: "No",
          chatbot: "Only if you ask, every time",
          sites: "Rarely",
        },
        {
          label: "Scores your CV against that advert",
          us: "Yes, with the gaps named",
          assistant: "No",
          chatbot: "No",
          sites: "Usually a paid add-on",
        },
        {
          label: "Refuses to invent metrics and employers",
          us: "By design",
          assistant: "Doesn't write for you",
          chatbot: "Invents freely",
          sites: "Depends on the engine",
        },
        {
          label: "PDF download",
          us: "Free",
          assistant: "Not applicable",
          chatbot: "Not applicable",
          sites: "Often behind a payment",
        },
        {
          label: "CV written in five languages",
          us: "Yes",
          assistant: "English-first",
          chatbot: "Yes",
          sites: "Usually one",
        },
        {
          label: "Keeps a saved version per application",
          us: "Yes",
          assistant: "No",
          chatbot: "No",
          sites: "On paid plans",
        },
      ],
      note:
        "To be fair to them: Grammarly is very good at catching the sentence you fumbled, and we would happily run a CV through it afterwards. It simply isn't trying to build the document, and it will never tell you what the advert asked for.",
    },
    how: {
      eyebrow: "How it works",
      title: "Five minutes of typing,",
      highlight: "then it's ours",
      description: "No template picking, no drag-and-drop, no twelve-step wizard.",
      steps: [
        {
          title: "Dump what you remember",
          body:
            "One paragraph per job, with dates if you have them. Typos don't matter. This is the only part that is on you, and it takes about five minutes.",
        },
        {
          title: "Paste the advert",
          body:
            "Optional, but it is where the tool earns its keep. The CV gets reordered and reworded around what that employer actually asked for.",
        },
        {
          title: "Close the gaps, then download",
          body:
            "We name the requirements your CV hasn't covered. Add anything genuinely yours, regenerate, and save the PDF straight from your browser.",
        },
      ],
    },
    faq: {
      eyebrow: "Straight answers",
      title: "Questions",
      highlight: "worth asking",
      items: [
        {
          q: "Is it really free?",
          a: "Yes. You need a free account so your CVs are saved and you can come back to them, but there is no paid tier standing between you and the PDF, and no watermark on the download.",
        },
        {
          q: "How is this different from asking a chatbot to write my CV?",
          a: "Two things. A chatbot hands you text in a chat window that you still have to lay out, and it will happily invent numbers to make you sound impressive. This hands you a finished, printable document, and it is constrained to the facts you supplied.",
        },
        {
          q: "Isn't Grammarly enough?",
          a: "Grammarly checks the writing. It doesn't decide what belongs in a CV, order your roles, tailor you to an advert, score you against it, or hand you a PDF. Use it after this if you like — the two aren't really competing.",
        },
        {
          q: "Will the CV get through applicant tracking systems?",
          a: "The PDF is a single-column layout of real, selectable text — no tables, no columns, no images or text boxes, which is what usually breaks a parser. Paste the advert as well and we will show you which of its terms your CV is still missing.",
        },
        {
          q: "Can I change it afterwards?",
          a: "Yes. Edit your notes and regenerate as often as you like, or download the PDF and open it in any editor. Each generated CV is saved to your account, so nothing is lost when you try a different angle.",
        },
        {
          q: "What happens to what I type?",
          a: "Your notes and finished CVs are stored against your account so you can reopen them later, and you can delete any of them from the builder at any time. They are sent to an AI provider only to write your CV.",
        },
      ],
    },
    finalCta: {
      title: "Five minutes of notes,",
      highlight: "one CV you can defend",
      description:
        "You will leave with a PDF you can send today — and nothing in it you would rather a recruiter didn't ask about.",
      primary: "Build my CV",
      secondary: "Talk to a human",
    },
  },

  fr: {
    metaTitle: "Générateur de CV par IA — gratuit, compatible ATS, sans invention",
    metaDescription:
      "Transformez quelques notes en un CV prêt pour les recruteurs. Collez l'annonce, voyez les exigences déjà couvertes et téléchargez un PDF gratuit compatible ATS. Nous n'inventons jamais d'employeur, de date ni de chiffre.",
    hero: {
      badge: "Outil IA gratuit",
      title: "Générateur de CV par IA",
      titleHighlight: "qui n'invente jamais rien",
      subtitle:
        "Donnez-nous les grandes lignes de votre parcours et l'annonce que vous visez. Vous obtenez un CV prêt pour les recruteurs, construit uniquement sur ce que vous avez réellement fait, un score face à cette annonce et un PDF gratuit.",
      ctaPrimary: "Créer mon CV",
      ctaSecondary: "Voir la comparaison",
      trust: [
        "PDF gratuit — sans frais d'export",
        "Rien d'inventé",
        "Colonne unique, compatible ATS",
        "5 langues de CV",
      ],
    },
    stats: [
      { value: "~60s", label: "De quelques notes à un PDF terminé" },
      { value: "0", label: "Paiement entre vous et votre téléchargement" },
      { value: "5", label: "Langues possibles pour votre CV" },
    ],
    authRequired: {
      title: "Connectez-vous pour créer et enregistrer votre CV",
      subtitle: "Veuillez vous connecter ou créer un compte pour générer votre CV avec l'IA et l'enregistrer dans votre profil.",
      login: "Se connecter",
      register: "Créer un compte gratuit",
    },
    builder: {
      eyebrow: "Le générateur",
      title: "Trois étapes,",
      highlight: "un CV terminé",
      description:
        "Remplissez ce dont vous vous souvenez. Les notes brutes sont le principe même : les transformer en langage de CV, c'est notre travail.",
    },
    sections: {
      basics: "À propos de vous",
      basicsHint: "Votre nom, le poste visé et le moyen de vous joindre.",
      background: "Votre parcours",
      backgroundHint: "Les demi-phrases et les fautes de frappe ne gênent pas. Le détail compte plus que la forme.",
      tailoring: "Cible et ton",
      tailoringHint: "Collez l'annonce ici pour débloquer le score de correspondance.",
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
          "Ingénieur frontend chez Northwind, 2021-aujourd'hui. Refonte du tunnel d'achat, temps de chargement divisé par deux, encadrement de deux juniors.\n\nDéveloppeur junior chez Belltower, 2019-2021. Tableaux de bord internes en React.",
        hint: "Des notes brutes suffisent — un poste par paragraphe, avec les dates si vous les avez.",
      },
      education: {
        label: "Formation",
        placeholder: "Licence en informatique, Université de Lyon, 2015-2019",
      },
      skills: {
        label: "Compétences",
        placeholder: "React, TypeScript, Node.js, Figma, management d'équipe, relation client",
      },
      targetJob: {
        label: "Offre d'emploi visée",
        placeholder: "Collez l'annonce à laquelle vous postulez…",
        hint: "Facultatif, mais c'est là que l'outil prend tout son sens : collez une annonce et nous évaluons votre CV face à elle.",
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
    progress: {
      label: "Niveau de détail",
      hint: "Plus vous nous en donnez, moins nous avons à laisser de côté.",
    },
    saved: {
      title: "Vos CV enregistrés",
      subtitle: "Chaque CV généré est conservé ici, pour garder une version par candidature.",
      empty: "Rien d'enregistré pour l'instant — votre premier CV apparaîtra ici.",
      load: "Ouvrir",
      remove: "Supprimer",
      confirm: "Supprimer ce CV enregistré ? Cette action est irréversible.",
    },
    preview: {
      title: "Aperçu",
      placeholderTitle: "Votre CV apparaîtra ici",
      placeholderSubtitle: "Remplissez vos informations à gauche et cliquez sur Générer mon CV.",
      loading: "Rédaction de votre CV. Cela prend généralement 5 à 15 secondes.",
      downloadHint: "Choisissez « Enregistrer au format PDF » dans la fenêtre d'impression. Le texte reste sélectionnable.",
    },
    match: {
      title: "Correspondance avec l'annonce",
      lockedTitle: "Score de correspondance verrouillé",
      lockedBody:
        "Collez l'annonce dans « Cible et ton » et nous évaluerons ce CV face à ce que cet employeur demande réellement.",
      caption: "{matched} des {total} termes clés de l'annonce apparaissent dans votre CV",
      tiers: {
        strong: "Forte correspondance",
        good: "Correspondance correcte",
        weak: "À retravailler",
      },
      tierHints: {
        strong: "Ce CV parle la langue de l'annonce. Téléchargez-le et envoyez-le.",
        good: "Presque. Si un élément ci-dessous vous correspond vraiment, ajoutez-le à vos notes puis régénérez.",
        weak: "L'annonce demande des choses que vos notes ne mentionnent pas. Ajoutez ce que vous avez réellement fait, puis régénérez.",
      },
      matchedLabel: "Couvert",
      missingLabel: "Pas encore couvert",
      honestNote:
        "Nous ne les ajouterons pas à votre place. Ce qui n'est pas dans vos notes n'entre pas dans votre CV — c'est tout l'intérêt.",
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
    why: {
      eyebrow: "Pourquoi celui-ci",
      title: "Beaucoup d'outils écrivent un CV.",
      highlight: "Très peu le gardent vrai.",
      description:
        "Nous l'avons conçu pour l'instant d'après : quand un recruteur vous demande de commenter le CV que vous lui avez envoyé.",
      cards: [
        {
          title: "Il n'invente pas votre carrière",
          body:
            "La plupart des IA vous offriront volontiers une hausse de 47 % que vous n'avez jamais obtenue. La nôtre n'utilise que ce que vous avez écrit : aucun employeur, date, diplôme ni chiffre inventé. Chaque ligne est défendable en entretien.",
        },
        {
          title: "Il écrit le document, pas seulement les phrases",
          body:
            "Les assistants de rédaction améliorent un texte déjà écrit. Il vous reste à structurer le CV, choisir les rubriques et décider de ce qui compte. C'est exactement cette partie que nous prenons en charge.",
        },
        {
          title: "Il répond à l'annonce que vous visez",
          body:
            "Collez l'offre et le CV est réorganisé et reformulé autour d'elle. Nous notons ensuite le résultat et nommons les exigences non couvertes — vous le savez avant le recruteur.",
        },
        {
          title: "Le PDF est gratuit, et c'est du vrai texte",
          body:
            "Aucun frais d'export, aucun filigrane, aucun « passez à la version payante ». Le PDF s'imprime en texte vectoriel sélectionnable, sur une seule colonne, sans tableaux ni zones de texte — ce qui casse d'ordinaire les logiciels de tri.",
        },
        {
          title: "Cinq langues, un seul parcours",
          body:
            "Rédigez le même CV en anglais, français, allemand, espagnol ou arabe, indépendamment de la langue du site. Utile quand vous postulez en Europe et dans le Golfe, pas sur un seul marché.",
        },
        {
          title: "Il y a de vraies personnes derrière",
          body:
            "Nous sommes une agence en activité, pas un abonnement anonyme. Vos CV restent dans votre compte, une version par candidature, et une vraie équipe répond au formulaire de contact.",
        },
      ],
    },
    honesty: {
      eyebrow: "La différence en un exemple",
      title: "Des notes brutes en entrée.",
      highlight: "Un CV honnête en sortie.",
      description:
        "La même phrase, traitée de trois façons. C'est tout l'argument en faveur de cet outil plutôt qu'un chatbot généraliste.",
      typedLabel: "Ce que vous avez réellement écrit",
      typedBody: "Travaillé sur le tunnel d'achat chez Northwind, rendu plus rapide, aidé deux juniors.",
      genericLabel: "Ce qu'une IA généraliste a tendance à écrire",
      genericBody:
        "Augmentation de 47 % de la conversion du tunnel d'achat et pilotage d'une équipe de 8 ingénieurs, générant 2 M$ de revenus annuels supplémentaires.",
      genericNote: "Des chiffres que vous ne lui avez jamais donnés. On vous les demandera.",
      oursLabel: "Ce que nous écrivons",
      oursBody:
        "Refonte du tunnel d'achat de Northwind, réduisant le temps de chargement et fluidifiant le parcours d'achat. Encadrement de deux développeurs juniors jusqu'à leurs premières mises en production.",
      oursNote: "Formulation plus nette, faits identiques. Rien ici ne peut se retourner contre vous.",
    },
    compare: {
      eyebrow: "Une comparaison honnête",
      title: "Notre place —",
      highlight: "et ce que nous ne sommes pas",
      description:
        "Les assistants de rédaction et les chatbots généralistes sont de bons outils. Ce ne sont simplement pas des générateurs de CV. Voici la différence, sans détour.",
      feature: "Ce dont vous avez besoin",
      columns: {
        us: "Creative Surf",
        assistant: "Assistants de rédaction",
        chatbot: "Chatbots généralistes",
        sites: "Sites de CV classiques",
      },
      rows: [
        {
          label: "Transforme des notes brutes en CV terminé",
          us: "Oui",
          assistant: "Non — il corrige ce que vous écrivez",
          chatbot: "Si vous savez le formuler",
          sites: "Vous écrivez chaque ligne",
        },
        {
          label: "Fournit un document mis en page, prêt à imprimer",
          us: "Oui",
          assistant: "Non",
          chatbot: "Du texte à mettre en forme",
          sites: "Oui",
        },
        {
          label: "Réécrit le CV autour d'une annonce précise",
          us: "Oui",
          assistant: "Non",
          chatbot: "Seulement sur demande, à chaque fois",
          sites: "Rarement",
        },
        {
          label: "Évalue votre CV face à cette annonce",
          us: "Oui, avec les manques nommés",
          assistant: "Non",
          chatbot: "Non",
          sites: "Souvent une option payante",
        },
        {
          label: "Refuse d'inventer chiffres et employeurs",
          us: "Par conception",
          assistant: "N'écrit pas à votre place",
          chatbot: "Invente librement",
          sites: "Dépend du moteur",
        },
        {
          label: "Téléchargement du PDF",
          us: "Gratuit",
          assistant: "Sans objet",
          chatbot: "Sans objet",
          sites: "Souvent payant",
        },
        {
          label: "CV rédigé en cinq langues",
          us: "Oui",
          assistant: "Anglais d'abord",
          chatbot: "Oui",
          sites: "Une seule en général",
        },
        {
          label: "Conserve une version par candidature",
          us: "Oui",
          assistant: "Non",
          chatbot: "Non",
          sites: "Sur les offres payantes",
        },
      ],
      note:
        "Pour être juste : Grammarly excelle à repérer la phrase bancale, et nous y passerions volontiers un CV ensuite. Il ne cherche simplement pas à construire le document, et il ne vous dira jamais ce que l'annonce demandait.",
    },
    how: {
      eyebrow: "Comment ça marche",
      title: "Cinq minutes à écrire,",
      highlight: "le reste est pour nous",
      description: "Pas de choix de modèle, pas de glisser-déposer, pas d'assistant en douze étapes.",
      steps: [
        {
          title: "Notez ce dont vous vous souvenez",
          body:
            "Un paragraphe par poste, avec les dates si vous les avez. Les fautes de frappe n'ont aucune importance. C'est la seule partie qui vous revient, et elle prend cinq minutes.",
        },
        {
          title: "Collez l'annonce",
          body:
            "Facultatif, mais c'est là que l'outil prend tout son sens. Le CV est réorganisé et reformulé autour de ce que cet employeur demande vraiment.",
        },
        {
          title: "Comblez les manques, puis téléchargez",
          body:
            "Nous nommons les exigences que votre CV ne couvre pas. Ajoutez ce qui vous appartient réellement, régénérez et enregistrez le PDF depuis votre navigateur.",
        },
      ],
    },
    faq: {
      eyebrow: "Réponses directes",
      title: "Les questions",
      highlight: "qui méritent d'être posées",
      items: [
        {
          q: "Est-ce vraiment gratuit ?",
          a: "Oui. Un compte gratuit est nécessaire pour enregistrer vos CV et les retrouver, mais aucune formule payante ne se dresse entre vous et le PDF, et le téléchargement est sans filigrane.",
        },
        {
          q: "En quoi est-ce différent de demander un CV à un chatbot ?",
          a: "Deux choses. Un chatbot vous rend du texte dans une fenêtre de discussion, qu'il vous reste à mettre en page, et il inventera volontiers des chiffres pour vous flatter. Ici vous obtenez un document fini, imprimable, limité aux faits que vous avez fournis.",
        },
        {
          q: "Grammarly ne suffit-il pas ?",
          a: "Grammarly vérifie la langue. Il ne décide pas de ce qui a sa place dans un CV, n'ordonne pas vos postes, ne vous adapte pas à une annonce, ne vous note pas face à elle et ne vous rend pas de PDF. Utilisez-le ensuite si vous voulez : les deux ne s'opposent pas.",
        },
        {
          q: "Le CV passera-t-il les logiciels de tri de candidatures ?",
          a: "Le PDF est une mise en page à une seule colonne, en texte réel et sélectionnable — sans tableaux, colonnes, images ni zones de texte, ce qui casse habituellement les analyseurs. Collez aussi l'annonce et nous vous montrerons les termes encore absents.",
        },
        {
          q: "Puis-je le modifier ensuite ?",
          a: "Oui. Modifiez vos notes et régénérez autant de fois que vous voulez, ou téléchargez le PDF et ouvrez-le dans n'importe quel éditeur. Chaque CV généré est enregistré dans votre compte.",
        },
        {
          q: "Que deviennent mes informations ?",
          a: "Vos notes et vos CV terminés sont conservés dans votre compte pour que vous puissiez les rouvrir, et vous pouvez les supprimer depuis le générateur à tout moment. Ils sont transmis à un fournisseur d'IA uniquement pour rédiger votre CV.",
        },
      ],
    },
    finalCta: {
      title: "Cinq minutes de notes,",
      highlight: "un CV que vous assumez",
      description:
        "Vous repartirez avec un PDF prêt à envoyer aujourd'hui — et rien dedans que vous préféreriez qu'un recruteur n'aborde pas.",
      primary: "Créer mon CV",
      secondary: "Parler à quelqu'un",
    },
  },

  de: {
    metaTitle: "KI-Lebenslauf-Generator — kostenlos, ATS-sicher, ohne Erfindungen",
    metaDescription:
      "Aus Stichpunkten wird ein Lebenslauf, den Recruiter lesen wollen. Stellenanzeige einfügen, offene Anforderungen sehen und ein kostenloses ATS-sicheres PDF laden. Wir erfinden keine Arbeitgeber, Daten oder Zahlen.",
    hero: {
      badge: "Kostenloses KI-Tool",
      title: "KI-Lebenslauf-Generator",
      titleHighlight: "der nichts erfindet",
      subtitle:
        "Nennen Sie uns die Eckdaten Ihres Werdegangs und die Stelle, die Sie anstreben. Sie bekommen einen Lebenslauf, der nur auf Ihren echten Erfahrungen beruht, eine Bewertung gegen diese Anzeige und ein kostenloses PDF.",
      ctaPrimary: "Lebenslauf erstellen",
      ctaSecondary: "Vergleich ansehen",
      trust: [
        "Kostenloses PDF — keine Exportgebühr",
        "Nichts erfunden",
        "ATS-sichere Einspaltigkeit",
        "5 Sprachen",
      ],
    },
    stats: [
      { value: "~60s", label: "Von Stichpunkten zum fertigen PDF" },
      { value: "0", label: "Bezahlschranken vor dem Download" },
      { value: "5", label: "Sprachen für Ihren Lebenslauf" },
    ],
    authRequired: {
      title: "Melden Sie sich an, um Ihren Lebenslauf zu erstellen und zu speichern",
      subtitle: "Bitte melden Sie sich an oder erstellen Sie ein Konto, um Ihren Lebenslauf mit KI zu erstellen.",
      login: "Anmelden",
      register: "Kostenloses Konto erstellen",
    },
    builder: {
      eyebrow: "Der Generator",
      title: "Drei Schritte,",
      highlight: "ein fertiger Lebenslauf",
      description:
        "Tragen Sie ein, woran Sie sich erinnern. Stichpunkte sind ausdrücklich erwünscht — daraus Lebenslaufsprache zu machen, ist unsere Aufgabe.",
    },
    sections: {
      basics: "Über Sie",
      basicsHint: "Ihr Name, die angestrebte Position und wie man Sie erreicht.",
      background: "Ihr Werdegang",
      backgroundHint: "Halbe Sätze und Tippfehler stören nicht. Inhalt zählt mehr als Form.",
      tailoring: "Ziel & Tonalität",
      tailoringHint: "Fügen Sie hier die Stellenanzeige ein, um die Trefferquote freizuschalten.",
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
          "Frontend-Entwickler bei Northwind, 2021-heute. Checkout neu gebaut, Ladezeit etwa halbiert, zwei Junioren betreut.\n\nJunior-Entwickler bei Belltower, 2019-2021. Interne Dashboards mit React.",
        hint: "Stichpunkte genügen — eine Position pro Absatz, mit Zeitraum, falls vorhanden.",
      },
      education: {
        label: "Ausbildung",
        placeholder: "B.Sc. Informatik, Universität Hamburg, 2015-2019",
      },
      skills: {
        label: "Kenntnisse",
        placeholder: "React, TypeScript, Node.js, Figma, Teamführung, Stakeholder-Kommunikation",
      },
      targetJob: {
        label: "Stellenanzeige",
        placeholder: "Fügen Sie die Stellenanzeige ein, auf die Sie sich bewerben…",
        hint: "Optional, aber hier zeigt das Tool seinen Wert: Anzeige einfügen und wir bewerten Ihren Lebenslauf dagegen.",
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
    progress: {
      label: "Detailtiefe",
      hint: "Je mehr Sie uns geben, desto weniger müssen wir weglassen.",
    },
    saved: {
      title: "Ihre gespeicherten Lebensläufe",
      subtitle: "Jeder erstellte Lebenslauf bleibt hier — eine Fassung je Bewerbung.",
      empty: "Noch nichts gespeichert — Ihr erster Lebenslauf erscheint hier.",
      load: "Öffnen",
      remove: "Löschen",
      confirm: "Diesen gespeicherten Lebenslauf löschen? Das lässt sich nicht rückgängig machen.",
    },
    preview: {
      title: "Vorschau",
      placeholderTitle: "Ihr Lebenslauf erscheint hier",
      placeholderSubtitle: "Füllen Sie Ihre Angaben links aus und klicken Sie auf Lebenslauf erstellen.",
      loading: "Ihr Lebenslauf entsteht. Das dauert meist 5-15 Sekunden.",
      downloadHint: "Wählen Sie im Druckdialog „Als PDF speichern“. Der Text bleibt echter, markierbarer Text.",
    },
    match: {
      title: "Übereinstimmung mit der Anzeige",
      lockedTitle: "Trefferquote gesperrt",
      lockedBody:
        "Fügen Sie die Stellenanzeige unter „Ziel & Tonalität“ ein, dann bewerten wir diesen Lebenslauf gegen das, was dieser Arbeitgeber tatsächlich verlangt.",
      caption: "{matched} von {total} Schlüsselbegriffen der Anzeige stehen in Ihrem Lebenslauf",
      tiers: {
        strong: "Starke Übereinstimmung",
        good: "Solide Übereinstimmung",
        weak: "Noch Luft nach oben",
      },
      tierHints: {
        strong: "Dieser Lebenslauf spricht die Sprache der Anzeige. Herunterladen und abschicken.",
        good: "Fast. Wenn unten etwas wirklich zu Ihnen gehört, ergänzen Sie es in Ihren Notizen und erstellen Sie neu.",
        weak: "Die Anzeige verlangt Dinge, die Ihre Notizen nicht erwähnen. Ergänzen Sie, was Sie tatsächlich getan haben, und erstellen Sie neu.",
      },
      matchedLabel: "Abgedeckt",
      missingLabel: "Noch offen",
      honestNote:
        "Wir ergänzen das nicht für Sie. Was nicht in Ihren Notizen steht, kommt nicht in Ihren Lebenslauf — genau darum geht es.",
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
    why: {
      eyebrow: "Warum dieser",
      title: "Viele Werkzeuge schreiben einen Lebenslauf.",
      highlight: "Kaum eines hält ihn wahr.",
      description:
        "Wir haben ihn für den Moment danach gebaut — wenn ein Recruiter Sie bittet, den eingereichten Lebenslauf zu erläutern.",
      cards: [
        {
          title: "Er erfindet Ihren Werdegang nicht",
          body:
            "Die meisten KIs schenken Ihnen bereitwillig 47 % Steigerung, die es nie gab. Unsere verwendet nur, was Sie geschrieben haben: keine erfundenen Arbeitgeber, Daten, Abschlüsse oder Kennzahlen. Jede Zeile hält im Gespräch stand.",
        },
        {
          title: "Er schreibt das Dokument, nicht nur die Sätze",
          body:
            "Schreibassistenten verbessern Text, den Sie bereits verfasst haben. Struktur, Abschnitte und Auswahl bleiben an Ihnen. Genau diesen Teil übernehmen wir: Stichpunkte hinein, ein geordneter Lebenslauf heraus.",
        },
        {
          title: "Er antwortet auf die Anzeige vor Ihnen",
          body:
            "Fügen Sie die Stellenanzeige ein, und der Lebenslauf wird darauf zugeschnitten. Danach bewerten wir das Ergebnis und benennen die offenen Anforderungen — Sie wissen es vor dem Recruiter.",
        },
        {
          title: "Das PDF ist kostenlos und echter Text",
          body:
            "Keine Exportgebühr, kein Wasserzeichen, kein „Upgrade zum Download“. Es druckt als markierbarer Vektortext, einspaltig, ohne Tabellen oder Textfelder — also ohne das, was Bewerbermanagementsysteme sonst scheitern lässt.",
        },
        {
          title: "Fünf Sprachen, ein Werdegang",
          body:
            "Schreiben Sie denselben Lebenslauf auf Englisch, Französisch, Deutsch, Spanisch oder Arabisch, unabhängig von der Sprache der Website. Nützlich, wenn Sie sich in Europa und am Golf bewerben.",
        },
        {
          title: "Dahinter stehen echte Menschen",
          body:
            "Wir sind eine arbeitende Agentur, kein anonymes Abo. Ihre Lebensläufe bleiben in Ihrem Konto, eine Fassung je Bewerbung, und am Kontaktformular sitzt ein echtes Team.",
        },
      ],
    },
    honesty: {
      eyebrow: "Der Unterschied an einem Beispiel",
      title: "Stichpunkte hinein.",
      highlight: "Ehrlicher Lebenslauf heraus.",
      description:
        "Derselbe Satz, dreimal behandelt. Das ist das ganze Argument für dieses Werkzeug statt eines allgemeinen Chatbots.",
      typedLabel: "Was Sie tatsächlich getippt haben",
      typedBody: "Am Checkout bei Northwind gearbeitet, schneller gemacht, zwei Junioren geholfen.",
      genericLabel: "Was eine allgemeine KI daraus macht",
      genericBody:
        "Steigerte die Checkout-Conversion um 47 % und führte ein Team von 8 Entwicklern, was 2 Mio. $ zusätzlichen Jahresumsatz brachte.",
      genericNote: "Zahlen, die Sie nie genannt haben. Danach wird gefragt.",
      oursLabel: "Was wir schreiben",
      oursBody:
        "Den Northwind-Checkout neu gebaut, die Ladezeit gesenkt und den Kaufweg geglättet. Zwei Junior-Entwickler bis zu ihren ersten Produktiv-Releases begleitet.",
      oursNote: "Schärfere Formulierung, identische Fakten. Nichts davon kann Ihnen auf die Füße fallen.",
    },
    compare: {
      eyebrow: "Ein ehrlicher Vergleich",
      title: "Wo wir hingehören —",
      highlight: "und wo nicht",
      description:
        "Schreibassistenten und allgemeine Chatbots sind gute Werkzeuge. Sie sind nur keine Lebenslauf-Generatoren. Hier der Unterschied, unverblümt.",
      feature: "Was Sie brauchen",
      columns: {
        us: "Creative Surf",
        assistant: "Schreibassistenten",
        chatbot: "Allgemeine KI-Chats",
        sites: "Übliche Lebenslauf-Seiten",
      },
      rows: [
        {
          label: "Macht aus Stichpunkten einen fertigen Lebenslauf",
          us: "Ja",
          assistant: "Nein — korrigiert Ihren Text",
          chatbot: "Bei guter Eingabe",
          sites: "Sie schreiben jede Zeile",
        },
        {
          label: "Liefert ein gesetztes, druckfertiges Dokument",
          us: "Ja",
          assistant: "Nein",
          chatbot: "Chattext zum Selbstsetzen",
          sites: "Ja",
        },
        {
          label: "Schreibt den Lebenslauf um eine konkrete Anzeige herum",
          us: "Ja",
          assistant: "Nein",
          chatbot: "Nur auf Nachfrage, jedes Mal",
          sites: "Selten",
        },
        {
          label: "Bewertet Ihren Lebenslauf gegen diese Anzeige",
          us: "Ja, mit benannten Lücken",
          assistant: "Nein",
          chatbot: "Nein",
          sites: "Meist kostenpflichtig",
        },
        {
          label: "Weigert sich, Kennzahlen und Arbeitgeber zu erfinden",
          us: "Von Grund auf",
          assistant: "Schreibt nicht für Sie",
          chatbot: "Erfindet frei",
          sites: "Je nach Engine",
        },
        {
          label: "PDF-Download",
          us: "Kostenlos",
          assistant: "Nicht zutreffend",
          chatbot: "Nicht zutreffend",
          sites: "Oft kostenpflichtig",
        },
        {
          label: "Lebenslauf in fünf Sprachen",
          us: "Ja",
          assistant: "Englisch zuerst",
          chatbot: "Ja",
          sites: "Meist eine",
        },
        {
          label: "Behält eine Fassung je Bewerbung",
          us: "Ja",
          assistant: "Nein",
          chatbot: "Nein",
          sites: "In Bezahltarifen",
        },
      ],
      note:
        "Fairerweise: Grammarly findet den misslungenen Satz sehr zuverlässig, und wir würden einen Lebenslauf danach gern hindurchschicken. Es versucht nur nicht, das Dokument zu bauen, und es sagt Ihnen nie, was die Anzeige verlangt hat.",
    },
    how: {
      eyebrow: "So funktioniert es",
      title: "Fünf Minuten tippen,",
      highlight: "den Rest übernehmen wir",
      description: "Keine Vorlagenauswahl, kein Drag-and-drop, kein zwölfstufiger Assistent.",
      steps: [
        {
          title: "Schreiben Sie auf, woran Sie sich erinnern",
          body:
            "Ein Absatz pro Position, mit Zeitraum, falls vorhanden. Tippfehler sind egal. Das ist der einzige Teil, der an Ihnen liegt, und er dauert fünf Minuten.",
        },
        {
          title: "Stellenanzeige einfügen",
          body:
            "Optional, aber hier zeigt das Tool seinen Wert. Der Lebenslauf wird auf das umgestellt, was dieser Arbeitgeber wirklich verlangt.",
        },
        {
          title: "Lücken schließen, dann herunterladen",
          body:
            "Wir benennen die Anforderungen, die Ihr Lebenslauf nicht abdeckt. Ergänzen Sie, was wirklich Ihnen gehört, erstellen Sie neu und speichern Sie das PDF direkt aus dem Browser.",
        },
      ],
    },
    faq: {
      eyebrow: "Klare Antworten",
      title: "Fragen,",
      highlight: "die sich lohnen",
      items: [
        {
          q: "Ist es wirklich kostenlos?",
          a: "Ja. Ein kostenloses Konto ist nötig, damit Ihre Lebensläufe gespeichert bleiben, aber zwischen Ihnen und dem PDF steht kein Bezahltarif, und der Download trägt kein Wasserzeichen.",
        },
        {
          q: "Worin unterscheidet sich das von einem Chatbot?",
          a: "In zwei Punkten. Ein Chatbot gibt Ihnen Text im Chatfenster, den Sie noch setzen müssen, und er erfindet bereitwillig Zahlen, damit Sie gut klingen. Hier bekommen Sie ein fertiges, druckbares Dokument, begrenzt auf die Fakten, die Sie geliefert haben.",
        },
        {
          q: "Reicht Grammarly nicht?",
          a: "Grammarly prüft die Sprache. Es entscheidet nicht, was in einen Lebenslauf gehört, ordnet Ihre Stationen nicht, richtet Sie nicht auf eine Anzeige aus, bewertet Sie nicht dagegen und gibt Ihnen kein PDF. Nutzen Sie es gern danach — die beiden konkurrieren nicht.",
        },
        {
          q: "Kommt der Lebenslauf durch Bewerbermanagementsysteme?",
          a: "Das PDF ist einspaltig und besteht aus echtem, markierbarem Text — ohne Tabellen, Spalten, Bilder oder Textfelder, an denen Parser sonst scheitern. Fügen Sie zusätzlich die Anzeige ein, dann zeigen wir Ihnen die noch fehlenden Begriffe.",
        },
        {
          q: "Kann ich ihn danach ändern?",
          a: "Ja. Ändern Sie Ihre Notizen und erstellen Sie so oft neu, wie Sie wollen, oder laden Sie das PDF und öffnen es in einem beliebigen Editor. Jeder erstellte Lebenslauf liegt in Ihrem Konto.",
        },
        {
          q: "Was passiert mit meinen Angaben?",
          a: "Ihre Notizen und fertigen Lebensläufe liegen in Ihrem Konto, damit Sie sie wieder öffnen können, und Sie können sie jederzeit im Generator löschen. An einen KI-Anbieter gehen sie nur, um Ihren Lebenslauf zu schreiben.",
        },
      ],
    },
    finalCta: {
      title: "Fünf Minuten Notizen,",
      highlight: "ein Lebenslauf, zu dem Sie stehen",
      description:
        "Sie gehen mit einem PDF, das Sie heute abschicken können — und ohne eine Zeile, die Ihnen im Gespräch unangenehm wäre.",
      primary: "Lebenslauf erstellen",
      secondary: "Mit einem Menschen sprechen",
    },
  },

  ar: {
    metaTitle: "Munshi Al-Sira Al-Dhatiyya bil-Zaka Al-Istinai — Majjani wa Bidun Ikhtilaq",
    metaDescription:
      "Hawwil mulahazatik ila Sira Dhatiyya jahiza lil-Muwazzifin. Alsiq ilan Al-Wazifa, shahid ayy Al-Mutatallabat ghattaytaha, wa hammil PDF majjani mutawafiq ma anzimat Al-Farz. La nakhtali arbab amal aw tawarikh aw arqam.",
    hero: {
      badge: "Adat Zaka Istinai Majjaniyya",
      title: "Munshi Al-Sira Al-Dhatiyya bil-Zaka Al-Istinai",
      titleHighlight: "alladhi la yakhtali shayan",
      subtitle:
        "Atina Al-Khutut Al-Aridha li-Masirak Al-Mihani wal-Ilan Al-Ladhi tastahdifuhu. Satahsul ala Sira Dhatiyya mabniyya faqat ala ma faaltahu haqqan, ma darajat mutabaqa ma dhalika Al-Ilan, wa PDF majjani.",
      ctaPrimary: "Anshi Siratee",
      ctaSecondary: "Shahid Al-Muqarana",
      trust: [
        "PDF majjani — bidun rusum tasdir",
        "La shay makhtalaq",
        "Amud wahid mutawafiq ma Al-Farz",
        "5 lughat lil-Sira",
      ],
    },
    stats: [
      { value: "~60s", label: "Min mulahazat basita ila PDF jahiz" },
      { value: "0", label: "Hawajiz dafi bainaka wa bayn Al-Tahmil" },
      { value: "5", label: "Lughat yumkin kitabat Siratik biha" },
    ],
    authRequired: {
      title: "Sajjil dukhulak li-insha wa hifz Siratik Al-Dhatiyya",
      subtitle: "Al-Raja al-dukhul aw insha hisab li-tahmil Siratik wal-wusul ilaiha fi ayy waqt.",
      login: "Tasjil Al-Dukhul",
      register: "Insha hisab majjani",
    },
    builder: {
      eyebrow: "Al-Munshi",
      title: "Thalath khutuwat,",
      highlight: "sira wahida jahiza",
      description:
        "Imla ma tatadhakkaruhu. Al-Mulahazat Al-Khama hiya Al-Maqsud — tahwiluha ila lughat Sira Dhatiyya huwa amaluna nahnu.",
    },
    sections: {
      basics: "Manlumat Anka",
      basicsHint: "Ismuka, Al-Wazifa Al-Mustahdafa, wa kayfa yasil ilayka Al-Muwazzif.",
      background: "Khalfiyyatuka",
      backgroundHint: "Al-Jumal Al-Naqisa wal-Akhta Al-Imlaiyya la tudirr. Al-Tafsil ahamm min Al-Sayagha.",
      tailoring: "Al-Hadaf wal-Uslub",
      tailoringHint: "Alsiq Al-Ilan huna li-fath darajat Al-Mutabaqa.",
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
          "Muhandis Frontend fi Northwind, 2021-Al-An. Aadtu bina safhat Al-Dafi, wa qallaltu waqt Al-Tahmil bil-nisf, wa darrabtu muhandisayn.\n\nMutawwir Mubtadi fi Belltower, 2019-2021. Bina lawhat tahakkum dakhiliyya bi-React.",
        hint: "Al-Mulahazat Al-Basita takfi — wazifa wahida li-kull faqra, ma Al-Tawarikh in wujidat.",
      },
      education: {
        label: "Al-Talim",
        placeholder: "Bakalurius Ulum Al-Hasib, Jamiat Al-Qahira, 2015-2019",
      },
      skills: {
        label: "Al-Maharat",
        placeholder: "React, TypeScript, Node.js, Figma, qiyadat Al-Fariq, Al-Tawasul",
      },
      targetJob: {
        label: "Wasf Al-Wazifa Al-Mustahdafa",
        placeholder: "Alsiq ilan Al-Wazifa Al-Ladhi tuqaddim laha…",
        hint: "Ikhtiyari, lakin huna tuzhir Al-Adat qimataha: alsiq Al-Ilan wa sanuqayyim Siratak muqabilahu.",
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
    progress: {
      label: "Mustawa Al-Tafsil",
      hint: "Kullama zadta mimma tuqaddimuhu, qalla ma nadtarr ila hadhfihi.",
    },
    saved: {
      title: "Siratuka Al-Mahfuza",
      subtitle: "Kull sira tunshiuha tabqa huna, li-tahtafiz bi-nuskha li-kull tallab.",
      empty: "La shay mahfuz badu — sa-tazhar siratuka Al-Ula huna.",
      load: "Fath",
      remove: "Hadhf",
      confirm: "Hadhf hadhihi Al-Sira Al-Mahfuza? La yumkin Al-Tarajju.",
    },
    preview: {
      title: "Muaayana",
      placeholderTitle: "Satakharu Siratuka Al-Dhatiyya huna",
      placeholderSubtitle: "Imla bayanatik ala Al-Yasar wa iqnad ala Anshi Siratee.",
      loading: "Jari isdad Siratik. Yastaghriq adatan 5-15 thaniya.",
      downloadHint: "Ikhtar « Hifz bi-sighat PDF » fi nafidhat Al-Tiba. Al-Nass yabqa qabilan lil-tahdid.",
    },
    match: {
      title: "Mutabaqat Al-Ilan",
      lockedTitle: "Darajat Al-Mutabaqa mughlaqa",
      lockedBody:
        "Alsiq ilan Al-Wazifa fi « Al-Hadaf wal-Uslub » wa sanuqayyim hadhihi Al-Sira muqabil ma yatlubuhu sahib Al-Amal filan.",
      caption: "{matched} min {total} min Al-Mustalahat Al-Raisiyya fi Al-Ilan mawjuda fi Siratik",
      tiers: {
        strong: "Mutabaqa qawiyya",
        good: "Mutabaqa maqbula",
        weak: "Tahtaj amalan",
      },
      tierHints: {
        strong: "Hadhihi Al-Sira tatakallam lughat Al-Ilan. Hammilha wa arsilha.",
        good: "Qarib. Idha kan ayy mimma yali yakhussuka haqqan, adifhu ila mulahazatik thumma aid Al-Insha.",
        weak: "Al-Ilan yatlub ashya la tadhkuruha mulahazatuka. Adif ma faaltahu haqqan thumma aid Al-Insha.",
      },
      matchedLabel: "Mughatta",
      missingLabel: "Ghayr mughatta badu",
      honestNote:
        "Lan nudifaha niyabatan anka. Ma laysa fi mulahazatik la yadkhul Siratak — wa hadha huwa Al-Maqsud kulluhu.",
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
    why: {
      eyebrow: "Limadha hadhihi",
      title: "Adawat kathira taktub laka sira.",
      highlight: "Qalil jiddan minha yubqiha sadiqa.",
      description:
        "Bananaha lil-lahza Al-Lati tali Al-Tahmil — hina yatlub minka Al-Muwazzif an tatahaddath an Al-Sira Al-Lati arsaltaha.",
      cards: [
        {
          title: "La yakhtali masirak Al-Mihani",
          body:
            "Muzam anzimat Al-Zaka Al-Istinai satamnahuka bi-suhula zyada 47% lam tuhaqqiqha abadan. Nizamuna yastakhdim ma katabtahu faqat: la arbab amal aw tawarikh aw shahadat aw arqam makhtalaqa. Kull satr yumkinuka Al-Difa anhu fi Al-Muqabala.",
        },
        {
          title: "Yaktub Al-Wathiqa, la Al-Jumal faqat",
          body:
            "Musaadidat Al-Kitaba tuhassin nassan katabtahu bil-fil. Yabqa alayka bina Al-Haykal wa ikhtiyar Al-Aqsam wa taqrir ma yastahiqq Al-Dhikr. Hadha bil-dabt ma naqumu bihi: mulahazat khama tadkhul, wa sira murattaba takhruj.",
        },
        {
          title: "Yujib ala Al-Ilan Al-Ladhi amamak",
          body:
            "Alsiq wasf Al-Wazifa wa sa-yuad tartib Al-Sira wa sayaghatuha hawlahu. Thumma nuqayyim Al-Natija wa nusammi Al-Mutatallabat Al-Lati lam tughattiha badu — fa-tarifuha qabl Al-Muwazzif.",
        },
        {
          title: "Al-PDF majjani, wa nassuhu haqiqi",
          body:
            "La rusum tasdir wa la alama mayiyya wa la « taraqqa lil-tahmil ». Yutba ka-nass shuai qabil lil-tahdid, fi amud wahid bidun jadawil aw sanadiq nass — wa hiya ma yuksir adatan anzimat tatabbu Al-Mutaqaddimin.",
        },
        {
          title: "Khams lughat, masira wahida",
          body:
            "Uktub nafs Al-Sira bil-Ingliziyya aw Al-Faransiyya aw Al-Almaniyya aw Al-Isbaniyya aw Al-Arabiyya, bi-sarf Al-Nazar an lughat Al-Mawqi. Mufid hina tuqaddim fi Uruba wal-Khalij ma.",
        },
        {
          title: "Hunak bashar haqiqiyyun khalfahu",
          body:
            "Nahnu wakala amila, laysa ishtirakan majhulan. Siratuka tabqa fi hisabik, nuskha li-kull tallab, wa fariq haqiqi yujib ala namudhaj Al-Tawasul.",
        },
      ],
    },
    honesty: {
      eyebrow: "Al-Farq fi mithal wahid",
      title: "Mulahaza khama tadkhul.",
      highlight: "Sira sadiqa takhruj.",
      description:
        "Nafs Al-Jumla, muamala bi-thalath turuq. Hadha huwa Al-Hujja Al-Kamila li-istikhdam hadhihi Al-Adat badalan min munaqasha amma.",
      typedLabel: "Ma katabtahu filan",
      typedBody: "Amiltu ala safhat Al-Dafi fi Northwind, jaaltuha asra, wa saadtu muhandisayn mubtadiayn.",
      genericLabel: "Ma tamil Al-Zaka Al-Istinai Al-Amm ila kitabatihi",
      genericBody:
        "Haqqaqtu zyada 47% fi tahwil safhat Al-Dafi wa qudtu fariqan min 8 muhandisin, mimma darr 2 malyun dular iradat sanawiyya idafiyya.",
      genericNote: "Arqam lam tutiha lahu abadan. Sa-tusal anha.",
      oursLabel: "Ma naktubuhu nahnu",
      oursBody:
        "Aadtu bina safhat Al-Dafi fi Northwind, mimma qallala waqt Al-Tahmil wa sahhala masar Al-Shira. Darrabtu muhandisayn mubtadiayn hatta awwal isdarayn lahuma fi Al-Intaj.",
      oursNote: "Sayagha adaqq, wa nafs Al-Haqaiq. La shay huna yumkin an yuqiaka fi harij.",
    },
    compare: {
      eyebrow: "Muqarana sadiqa",
      title: "Ayna nusnif —",
      highlight: "wa ayna lasna",
      description:
        "Musaadidat Al-Kitaba wal-munaqashat Al-Amma adawat jayyida. Innaha faqat laysat munshiat sira dhatiyya. Wa hadha huwa Al-Farq, bi-wuduh.",
      feature: "Ma tahtajuhu",
      columns: {
        us: "Creative Surf",
        assistant: "Musaadidat Al-Kitaba",
        chatbot: "Munaqashat Al-Zaka Al-Amma",
        sites: "Mawaqi Al-Sira Al-Mutada",
      },
      rows: [
        {
          label: "Yuhawwil Al-Mulahazat Al-Khama ila sira jahiza",
          us: "Naam",
          assistant: "La — yusahhih nassaka",
          chatbot: "In ahsanta Al-Talab",
          sites: "Anta taktub kull satr",
        },
        {
          label: "Yumniuka wathiqa munassaqa jahiza lil-tiba",
          us: "Naam",
          assistant: "La",
          chatbot: "Nass tunassiquhu binafsik",
          sites: "Naam",
        },
        {
          label: "Yuid kitabat Al-Sira hawl ilan muhaddad",
          us: "Naam",
          assistant: "La",
          chatbot: "Faqat idha talabta, fi kull marra",
          sites: "Nadiran",
        },
        {
          label: "Yuqayyim Siratak muqabil dhalika Al-Ilan",
          us: "Naam, ma tasmiyat Al-Thaghrat",
          assistant: "La",
          chatbot: "La",
          sites: "Adatan idafa madfua",
        },
        {
          label: "Yarfud ikhtilaq Al-Arqam wa arbab Al-Amal",
          us: "Bil-tasmim",
          assistant: "La yaktub niyabatan ank",
          chatbot: "Yakhtali bi-hurriyya",
          sites: "Hasab Al-Muharrik",
        },
        {
          label: "Tahmil Al-PDF",
          us: "Majjani",
          assistant: "Ghayr mutabiq",
          chatbot: "Ghayr mutabiq",
          sites: "Ghaliban madfu",
        },
        {
          label: "Sira maktuba bi-khams lughat",
          us: "Naam",
          assistant: "Al-Ingliziyya awwalan",
          chatbot: "Naam",
          sites: "Wahida adatan",
        },
        {
          label: "Yahfaz nuskha li-kull tallab",
          us: "Naam",
          assistant: "La",
          chatbot: "La",
          sites: "Fi Al-Khutat Al-Madfua",
        },
      ],
      note:
        "Insafan lahum: Grammarly mumtaz fi iltiqat Al-Jumla Al-Mutaathira, wa sanumarrir sira abrahu bi-suhula bad dhalika. Innahu faqat la yuhawil bina Al-Wathiqa, wa lan yukhbirak abadan bima talabahu Al-Ilan.",
    },
    how: {
      eyebrow: "Kayfa yamal",
      title: "Khams daqaiq min Al-Kitaba,",
      highlight: "wal-baqi alayna",
      description: "La ikhtiyar qawalib, wa la sahb wa iflat, wa la muassid min ithnata ashara khatwa.",
      steps: [
        {
          title: "Uktub ma tatadhakkaruhu",
          body:
            "Faqra li-kull wazifa, ma Al-Tawarikh in wujidat. Al-Akhta Al-Imlaiyya la tuhimm. Hadha huwa Al-Juz Al-Wahid Al-Ladhi alayka, wa yastaghriq khams daqaiq.",
        },
        {
          title: "Alsiq Al-Ilan",
          body:
            "Ikhtiyari, lakinnahu haythu tuzhir Al-Adat qimataha. Yuad tartib Al-Sira wa sayaghatuha hawl ma yatlubuhu sahib Al-Amal filan.",
        },
        {
          title: "Sudd Al-Thaghrat thumma hammil",
          body:
            "Nusammi Al-Mutatallabat Al-Lati lam tughattiha Siratuka. Adif ma yakhussuka haqqan, aid Al-Insha, wa ahfaz Al-PDF mubasharatan min mutasaffihik.",
        },
      ],
    },
    faq: {
      eyebrow: "Ijabat mubashara",
      title: "Asila",
      highlight: "tastahiqq Al-Su-al",
      items: [
        {
          q: "Hal huwa majjani filan?",
          a: "Naam. Tahtaj hisaban majjaniyyan li-tuhfaz siratuka wa tastati Al-Awda ilaiha, lakin la tujad khutta madfua bainaka wa bayn Al-PDF, wa la alama mayiyya ala Al-Tahmil.",
        },
        {
          q: "Bima yakhtalif hadha an tallab sira min munaqasha amma?",
          a: "Amran. Al-Munaqasha tuatika nassan fi nafidha yabqa alayka tansiquhu, wa takhtali arqaman li-tabdu mutamayyizan. Huna tahsul ala wathiqa jahiza lil-tiba, muqayyada bil-haqaiq Al-Lati qaddamtaha.",
        },
        {
          q: "Ala yakfi Grammarly?",
          a: "Grammarly yafhas Al-Kitaba. La yuqarrir ma yantami ila Al-Sira, wa la yurattib wazaifak, wa la yukayyifuka ma ilan, wa la yuqayyimuka muqabilahu, wa la yumniuka PDF. Istakhdimhu badana in aradta — Al-Ithnan la yatanafasan filan.",
        },
        {
          q: "Hal satamurr Al-Sira abr anzimat tatabbu Al-Mutaqaddimin?",
          a: "Al-PDF tansiq bi-amud wahid min nass haqiqi qabil lil-tahdid — bidun jadawil aw amida aw suwar aw sanadiq nass, wa hiya ma yuksir Al-Muhallilat adatan. Alsiq Al-Ilan aydan wa sanurika Al-Mustalahat Al-Lati ma tazal naqisa.",
        },
        {
          q: "Hal yumkinuni tadiluha lahiqan?",
          a: "Naam. Addil mulahazatik wa aid Al-Insha kama tasha, aw hammil Al-PDF wa iftahhu fi ayy muharrir. Kull sira tunsha tuhfaz fi hisabik.",
        },
        {
          q: "Madha yahduth li-ma aktubuhu?",
          a: "Mulahazatuka wa siratuka Al-Jahiza tuhfaz fi hisabik li-tastati fathaha lahiqan, wa yumkinuka hadhfuha min Al-Munshi fi ayy waqt. Tursal ila muzawwid zaka istinai li-kitabat Siratik faqat.",
        },
      ],
    },
    finalCta: {
      title: "Khams daqaiq min Al-Mulahazat,",
      highlight: "wa sira yumkinuka Al-Difa anha",
      description:
        "Sa-tughadir ma PDF yumkinuka irsaluhu Al-Yawm — wa laysa fihi shay tatamanna alla yasalaka anhu Al-Muwazzif.",
      primary: "Anshi Siratee",
      secondary: "Tahaddath ma shakhs haqiqi",
    },
  },
});
