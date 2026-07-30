import { defineMessages } from "../types";

export const homeMessages = defineMessages({
  en: {
    hero: {
      eyebrow: "Creative Surf · Digital Agency",
      headlineLine1: "Transform Your",
      headlineLine2: "Digital Presence.",
      subtitle:
        "We help businesses build meaningful digital brands through strategic design, performance marketing, and measurable results.",
      ctaPrimary: "Start a Project",
      ctaSecondary: "See our services",
      stats: {
        projects: "Projects Delivered",
        retention: "Client Retention",
      },
      panel: {
        title: "Campaign Performance",
        subtitle: "Last 6 months",
        roas: "ROAS",
        leads: "Leads",
        ctr: "CTR",
      },
      chipRating: "Client rating",
      chipAwardTitle: "Award-winning",
      chipAwardSub: "Creative team",
    },

    services: {
      badge: "Our Expertise",
      headingLine1: "What we do",
      headingAccent: "exceptionally well.",
      intro: "Eight disciplines. One integrated team. Every service built to compound your growth.",
      items: [
        {
          title: "Graphics Design",
          description:
            "High-impact visuals blending art direction with precision — brand identity, campaign assets, and everything in between.",
          tags: ["Brand Identity", "Print", "Digital"],
        },
        {
          title: "Content Marketing",
          description:
            "Strategic storytelling that builds authority, drives organic traffic, and converts browsers into loyal buyers.",
          tags: ["Strategy", "Copywriting", "Distribution"],
        },
        {
          title: "Video Editing",
          description:
            "Cinematic edits with seamless motion and narrative clarity — from short-form reels to full brand films.",
          tags: ["Reels", "Ad Films", "Brand Videos"],
        },
        {
          title: "Website Development",
          description:
            "High-performance web experiences engineered for conversion and built to scale as your business grows.",
          tags: ["Next.js", "React", "E-commerce"],
        },
        {
          title: "OVC / TVC",
          description:
            "Premium television and online video commercials that communicate your brand's value with maximum impact.",
          tags: ["Commercials", "Broadcast", "Online"],
        },
        {
          title: "SEO & Social Media",
          description:
            "Precision SEO and social campaigns that compound your visibility and bring high-intent audiences directly to you.",
          tags: ["SEO", "Paid Social", "Analytics"],
        },
        {
          title: "Media Buying",
          description:
            "Optimised ad spend across every channel — making every dollar work harder so your ROI compounds over time.",
          tags: ["Google Ads", "Meta", "Programmatic"],
        },
        {
          title: "Digital Branding",
          description:
            "Cohesive digital identities for lasting impressions — visual systems, brand voice, and positioning that stick.",
          tags: ["Strategy", "Visual Identity", "Voice"],
        },
      ],
    },

    impact: {
      badge: "Measurable Outcomes",
      headingLine1: "Data that drives",
      headingAccent: "results.",
      body:
        "We engineer success through observable metrics. Our strategies align with your business objectives to deliver undeniable, measurable impact — every single time.",
      pills: ["Higher Retention", "Faster Time-to-Market", "Better ROAS"],
      accordion: [
        {
          title: "Actionable Analytics",
          content:
            "Gain deep insights to refine campaigns and boost ROI with precision targeting at every stage.",
        },
        {
          title: "Data Empowerment",
          content:
            "Empower your teams with accessible, real-time data so every decision is backed by evidence.",
        },
        {
          title: "Content Marketing",
          content:
            "Targeted content strategies that attract the right audience, convert leads, and build loyalty.",
        },
        {
          title: "Sales Enablement",
          content: "Align sales and marketing into one seamless engine that accelerates deal closures.",
        },
      ],
    },

    realEstate: {
      badge: "Real Estate Marketing",
      headingLine1: "Your project deserves",
      headingAccent: "the right audience.",
      subline: "Let us help it reach its niche.",
      bodyStart: "Connect with verified buyers, investors, and land share partners.",
      bodyStrong: "No time wasters",
      bodyEnd: "— only high-intent leads who are ready to move.",
      pills: ["Bashundhara R/A", "Apartment Projects", "Land Share Partners"],
      stats: {
        projects: "Projects Marketed",
        leads: "Verified Leads",
        quality: "Avg. Lead Quality",
      },
      cta: "Explore Real Estate Marketing",
      images: {
        alt1: "Springfield – Bashundhara R/A",
        caption1: "Bashundhara R/A",
        alt2: "Spacious Living, Perfectly Designed",
        caption2: "2200 SqFt · 18 Katha",
        alt3: "Ongoing Project – Springfield",
        caption3: "Ongoing Project",
      },
      floatingTitle: "Niche Audience",
      floatingSub: "Real-estate buyers & investors",
    },

    pricing: {
      badge: "Pricing",
      headingLine1: "Clear, transparent",
      headingAccent: "pricing.",
      intro:
        "No hidden fees. No surprises. Pick the package that matches where you are — and where you're going.",
      billingMonthly: "Monthly",
      billingHalfShort: "6-Month · 20% off",
      billingHalfLong: "Half-Yearly · 20% off",
      perMonth: "mo",
      perHalfYear: "half-yr",
      mostPopular: "Most Popular",
      cta: "Get Started",
      footnote: "All plans include a dedicated account manager. Cancel anytime.",
      plans: [
        {
          title: "Basic",
          description: "Perfect for small businesses ready to grow their digital presence.",
          features: [
            "Business Development",
            "Campaign Marketing",
            "Creative Visual Content (Up to 7)",
            "Series Content",
            "Animated Motion Video",
            "Social Media Management",
            "Media Buying on Demand",
          ],
        },
        {
          title: "Standard",
          description: "The complete package — our most popular choice for scaling brands.",
          features: [
            "Product Photography",
            "Creative Visual Content (Up to 10)",
            "Copyright Content with SEO",
            "Media Buying on Demand ($50 free)",
            "Everything in Basic",
          ],
        },
        {
          title: "Premium",
          description: "Full-service digital marketing for enterprise businesses.",
          features: [
            "Website Development",
            "Creative Visual Content (Up to 15)",
            "Media Buying on Demand ($100 free)",
            "Content Writing (Up to 5)",
            "Everything in Standard",
          ],
        },
      ],
    },

    reviews: {
      badge: "Client Testimonials",
      headingLine1: "Don't just take",
      headingAccent: "our word for it.",
      items: [
        {
          position: "Marketing Director",
          text:
            "Working with Creative Surf transformed our digital presence completely. Our conversion rates increased by 45% in just three months.",
        },
        {
          position: "CEO",
          text:
            "They developed our brand identity, built our website, and executed a campaign that got us featured in major publications.",
        },
        {
          position: "E-commerce Manager",
          text:
            "Our online sales have increased by 78% since working with them. Their seasonal launch campaign was absolutely stunning.",
        },
      ],
    },

    trustedBy: {
      badge: "Our Clients",
      headingStart: "Trusted by",
      headingAccent: "forward-thinking",
      headingEnd: "teams",
      subtitle: "Brands that chose Creative Surf to grow their presence",
    },
  },

  fr: {
    hero: {
      eyebrow: "Creative Surf · Agence digitale",
      headlineLine1: "Transformez votre",
      headlineLine2: "présence digitale.",
      subtitle:
        "Nous aidons les entreprises à construire des marques digitales fortes grâce au design stratégique, au marketing de performance et à des résultats mesurables.",
      ctaPrimary: "Démarrer un projet",
      ctaSecondary: "Voir nos services",
      stats: {
        projects: "Projets livrés",
        retention: "Fidélité clients",
      },
      panel: {
        title: "Performance des campagnes",
        subtitle: "6 derniers mois",
        roas: "ROAS",
        leads: "Leads",
        ctr: "CTR",
      },
      chipRating: "Note des clients",
      chipAwardTitle: "Primée",
      chipAwardSub: "Équipe créative",
    },

    services: {
      badge: "Notre expertise",
      headingLine1: "Ce que nous faisons",
      headingAccent: "exceptionnellement bien.",
      intro:
        "Huit disciplines. Une équipe intégrée. Chaque service conçu pour démultiplier votre croissance.",
      items: [
        {
          title: "Design graphique",
          description:
            "Des visuels à fort impact qui allient direction artistique et précision — identité de marque, supports de campagne et tout le reste.",
          tags: ["Identité de marque", "Print", "Digital"],
        },
        {
          title: "Marketing de contenu",
          description:
            "Un storytelling stratégique qui installe votre autorité, génère du trafic organique et transforme les visiteurs en clients fidèles.",
          tags: ["Stratégie", "Rédaction", "Diffusion"],
        },
        {
          title: "Montage vidéo",
          description:
            "Des montages cinématographiques au mouvement fluide et au récit limpide — du format court au film de marque.",
          tags: ["Reels", "Films publicitaires", "Vidéos de marque"],
        },
        {
          title: "Développement web",
          description:
            "Des expériences web performantes, pensées pour la conversion et conçues pour évoluer avec votre entreprise.",
          tags: ["Next.js", "React", "E-commerce"],
        },
        {
          title: "OVC / TVC",
          description:
            "Des publicités premium pour la télévision et le web qui communiquent la valeur de votre marque avec un impact maximal.",
          tags: ["Publicités", "Télévision", "En ligne"],
        },
        {
          title: "SEO & réseaux sociaux",
          description:
            "Des campagnes SEO et sociales précises qui font croître votre visibilité et attirent des audiences à forte intention.",
          tags: ["SEO", "Social payant", "Analytics"],
        },
        {
          title: "Achat média",
          description:
            "Un budget publicitaire optimisé sur tous les canaux — chaque euro travaille plus pour un ROI qui s'accumule.",
          tags: ["Google Ads", "Meta", "Programmatique"],
        },
        {
          title: "Branding digital",
          description:
            "Des identités digitales cohérentes qui marquent durablement — systèmes visuels, voix de marque et positionnement.",
          tags: ["Stratégie", "Identité visuelle", "Voix"],
        },
      ],
    },

    impact: {
      badge: "Résultats mesurables",
      headingLine1: "La donnée au service",
      headingAccent: "des résultats.",
      body:
        "Nous construisons le succès sur des métriques observables. Nos stratégies s'alignent sur vos objectifs business pour livrer un impact mesurable et incontestable — chaque fois.",
      pills: ["Meilleure fidélisation", "Mise sur le marché plus rapide", "Meilleur ROAS"],
      accordion: [
        {
          title: "Analytics actionnables",
          content:
            "Obtenez des insights approfondis pour affiner vos campagnes et augmenter le ROI grâce à un ciblage précis à chaque étape.",
        },
        {
          title: "Autonomie par la donnée",
          content:
            "Donnez à vos équipes un accès à des données en temps réel pour que chaque décision repose sur des preuves.",
        },
        {
          title: "Marketing de contenu",
          content:
            "Des stratégies de contenu ciblées qui attirent la bonne audience, convertissent les leads et bâtissent la fidélité.",
        },
        {
          title: "Sales enablement",
          content:
            "Alignez ventes et marketing en un moteur unique et fluide qui accélère la signature des contrats.",
        },
      ],
    },

    realEstate: {
      badge: "Marketing immobilier",
      headingLine1: "Votre projet mérite",
      headingAccent: "la bonne audience.",
      subline: "Aidons-le à atteindre sa niche.",
      bodyStart: "Entrez en contact avec des acheteurs, investisseurs et partenaires fonciers vérifiés.",
      bodyStrong: "Aucune perte de temps",
      bodyEnd: "— uniquement des leads à forte intention, prêts à passer à l'action.",
      pills: ["Bashundhara R/A", "Projets résidentiels", "Partenaires fonciers"],
      stats: {
        projects: "Projets commercialisés",
        leads: "Leads vérifiés",
        quality: "Qualité moyenne des leads",
      },
      cta: "Découvrir le marketing immobilier",
      images: {
        alt1: "Springfield – Bashundhara R/A",
        caption1: "Bashundhara R/A",
        alt2: "Des espaces généreux, parfaitement conçus",
        caption2: "2200 pi² · 18 Katha",
        alt3: "Projet en cours – Springfield",
        caption3: "Projet en cours",
      },
      floatingTitle: "Audience de niche",
      floatingSub: "Acheteurs et investisseurs immobiliers",
    },

    pricing: {
      badge: "Tarifs",
      headingLine1: "Des tarifs clairs",
      headingAccent: "et transparents.",
      intro:
        "Aucuns frais cachés. Aucune surprise. Choisissez la formule qui correspond à votre situation — et à vos ambitions.",
      billingMonthly: "Mensuel",
      billingHalfShort: "6 mois · -20 %",
      billingHalfLong: "Semestriel · -20 %",
      perMonth: "mois",
      perHalfYear: "semestre",
      mostPopular: "Le plus choisi",
      cta: "Commencer",
      footnote: "Toutes les formules incluent un chargé de compte dédié. Annulable à tout moment.",
      plans: [
        {
          title: "Basic",
          description: "Idéal pour les petites entreprises prêtes à développer leur présence digitale.",
          features: [
            "Développement commercial",
            "Marketing de campagne",
            "Contenus visuels créatifs (jusqu'à 7)",
            "Contenus en série",
            "Vidéo en motion design",
            "Gestion des réseaux sociaux",
            "Achat média à la demande",
          ],
        },
        {
          title: "Standard",
          description: "La formule complète — notre choix le plus populaire pour les marques en croissance.",
          features: [
            "Photographie produit",
            "Contenus visuels créatifs (jusqu'à 10)",
            "Contenus protégés optimisés SEO",
            "Achat média à la demande (50 $ offerts)",
            "Tout le contenu de Basic",
          ],
        },
        {
          title: "Premium",
          description: "Marketing digital complet pour les entreprises d'envergure.",
          features: [
            "Développement de site web",
            "Contenus visuels créatifs (jusqu'à 15)",
            "Achat média à la demande (100 $ offerts)",
            "Rédaction de contenus (jusqu'à 5)",
            "Tout le contenu de Standard",
          ],
        },
      ],
    },

    reviews: {
      badge: "Témoignages clients",
      headingLine1: "Ne nous croyez pas",
      headingAccent: "sur parole.",
      items: [
        {
          position: "Directrice marketing",
          text:
            "Travailler avec Creative Surf a complètement transformé notre présence digitale. Nos taux de conversion ont augmenté de 45 % en trois mois seulement.",
        },
        {
          position: "PDG",
          text:
            "Ils ont créé notre identité de marque, développé notre site et mené une campagne qui nous a valu des articles dans de grands médias.",
        },
        {
          position: "Responsable e-commerce",
          text:
            "Nos ventes en ligne ont progressé de 78 % depuis que nous travaillons avec eux. Leur campagne de lancement saisonnier était tout simplement magnifique.",
        },
      ],
    },

    trustedBy: {
      badge: "Nos clients",
      headingStart: "La confiance des équipes",
      headingAccent: "visionnaires",
      headingEnd: "",
      subtitle: "Des marques qui ont choisi Creative Surf pour développer leur présence",
    },
  },

  de: {
    hero: {
      eyebrow: "Creative Surf · Digitalagentur",
      headlineLine1: "Verwandeln Sie Ihre",
      headlineLine2: "digitale Präsenz.",
      subtitle:
        "Wir helfen Unternehmen, starke digitale Marken aufzubauen — durch strategisches Design, Performance-Marketing und messbare Ergebnisse.",
      ctaPrimary: "Projekt starten",
      ctaSecondary: "Unsere Leistungen",
      stats: {
        projects: "Umgesetzte Projekte",
        retention: "Kundenbindung",
      },
      panel: {
        title: "Kampagnen-Performance",
        subtitle: "Letzte 6 Monate",
        roas: "ROAS",
        leads: "Leads",
        ctr: "CTR",
      },
      chipRating: "Kundenbewertung",
      chipAwardTitle: "Ausgezeichnet",
      chipAwardSub: "Kreativteam",
    },

    services: {
      badge: "Unsere Expertise",
      headingLine1: "Was wir",
      headingAccent: "außergewöhnlich gut können.",
      intro:
        "Acht Disziplinen. Ein integriertes Team. Jede Leistung darauf ausgelegt, Ihr Wachstum zu vervielfachen.",
      items: [
        {
          title: "Grafikdesign",
          description:
            "Wirkungsvolle Visuals, die Art Direction und Präzision verbinden — Markenidentität, Kampagnen-Assets und alles dazwischen.",
          tags: ["Markenidentität", "Print", "Digital"],
        },
        {
          title: "Content-Marketing",
          description:
            "Strategisches Storytelling, das Autorität aufbaut, organischen Traffic bringt und Besucher zu treuen Kunden macht.",
          tags: ["Strategie", "Texterstellung", "Distribution"],
        },
        {
          title: "Videobearbeitung",
          description:
            "Cinematische Schnitte mit fließender Bewegung und klarer Erzählung — von Short-Form-Reels bis zum Markenfilm.",
          tags: ["Reels", "Werbefilme", "Markenvideos"],
        },
        {
          title: "Webentwicklung",
          description:
            "Performante Web-Erlebnisse, auf Conversion ausgelegt und gebaut, um mit Ihrem Unternehmen zu skalieren.",
          tags: ["Next.js", "React", "E-Commerce"],
        },
        {
          title: "OVC / TVC",
          description:
            "Hochwertige TV- und Online-Videospots, die den Wert Ihrer Marke mit maximaler Wirkung vermitteln.",
          tags: ["Werbespots", "Broadcast", "Online"],
        },
        {
          title: "SEO & Social Media",
          description:
            "Präzise SEO- und Social-Kampagnen, die Ihre Sichtbarkeit steigern und kaufbereite Zielgruppen direkt zu Ihnen bringen.",
          tags: ["SEO", "Paid Social", "Analytics"],
        },
        {
          title: "Mediaeinkauf",
          description:
            "Optimiertes Werbebudget über alle Kanäle — jeder Euro arbeitet härter, damit Ihr ROI stetig wächst.",
          tags: ["Google Ads", "Meta", "Programmatic"],
        },
        {
          title: "Digitales Branding",
          description:
            "Stimmige digitale Identitäten für nachhaltigen Eindruck — visuelle Systeme, Markenstimme und Positionierung.",
          tags: ["Strategie", "Visuelle Identität", "Markenstimme"],
        },
      ],
    },

    impact: {
      badge: "Messbare Ergebnisse",
      headingLine1: "Daten, die",
      headingAccent: "Ergebnisse bringen.",
      body:
        "Wir bauen Erfolg auf messbaren Kennzahlen. Unsere Strategien richten sich an Ihren Geschäftszielen aus und liefern unbestreitbare, messbare Wirkung — jedes Mal.",
      pills: ["Höhere Kundenbindung", "Schnellere Time-to-Market", "Besserer ROAS"],
      accordion: [
        {
          title: "Handlungsfähige Analytics",
          content:
            "Gewinnen Sie tiefe Einblicke, um Kampagnen zu verfeinern und den ROI durch präzises Targeting in jeder Phase zu steigern.",
        },
        {
          title: "Datenkompetenz",
          content:
            "Geben Sie Ihren Teams zugängliche Echtzeitdaten, damit jede Entscheidung belegbar ist.",
        },
        {
          title: "Content-Marketing",
          content:
            "Gezielte Content-Strategien, die die richtige Zielgruppe anziehen, Leads konvertieren und Loyalität aufbauen.",
        },
        {
          title: "Sales Enablement",
          content:
            "Vertrieb und Marketing zu einem reibungslosen Motor verbinden, der Abschlüsse beschleunigt.",
        },
      ],
    },

    realEstate: {
      badge: "Immobilienmarketing",
      headingLine1: "Ihr Projekt verdient",
      headingAccent: "die richtige Zielgruppe.",
      subline: "Wir bringen es in seine Nische.",
      bodyStart: "Erreichen Sie geprüfte Käufer, Investoren und Grundstückspartner.",
      bodyStrong: "Keine Zeitverschwender",
      bodyEnd: "— nur kaufbereite Leads mit klarer Absicht.",
      pills: ["Bashundhara R/A", "Wohnprojekte", "Grundstückspartner"],
      stats: {
        projects: "Vermarktete Projekte",
        leads: "Geprüfte Leads",
        quality: "Ø Lead-Qualität",
      },
      cta: "Immobilienmarketing entdecken",
      images: {
        alt1: "Springfield – Bashundhara R/A",
        caption1: "Bashundhara R/A",
        alt2: "Großzügiges Wohnen, perfekt geplant",
        caption2: "2200 sq ft · 18 Katha",
        alt3: "Laufendes Projekt – Springfield",
        caption3: "Laufendes Projekt",
      },
      floatingTitle: "Nischen-Zielgruppe",
      floatingSub: "Immobilienkäufer & Investoren",
    },

    pricing: {
      badge: "Preise",
      headingLine1: "Klare, transparente",
      headingAccent: "Preise.",
      intro:
        "Keine versteckten Kosten. Keine Überraschungen. Wählen Sie das Paket, das zu Ihrem Stand — und Ihren Zielen — passt.",
      billingMonthly: "Monatlich",
      billingHalfShort: "6 Monate · 20 % Rabatt",
      billingHalfLong: "Halbjährlich · 20 % Rabatt",
      perMonth: "Mon.",
      perHalfYear: "Halbjahr",
      mostPopular: "Am beliebtesten",
      cta: "Loslegen",
      footnote: "Alle Pakete enthalten einen persönlichen Account Manager. Jederzeit kündbar.",
      plans: [
        {
          title: "Basic",
          description: "Perfekt für kleine Unternehmen, die ihre digitale Präsenz ausbauen wollen.",
          features: [
            "Business Development",
            "Kampagnen-Marketing",
            "Kreative Visuals (bis zu 7)",
            "Serien-Content",
            "Animiertes Motion-Video",
            "Social-Media-Betreuung",
            "Mediaeinkauf auf Abruf",
          ],
        },
        {
          title: "Standard",
          description: "Das Komplettpaket — unsere beliebteste Wahl für wachsende Marken.",
          features: [
            "Produktfotografie",
            "Kreative Visuals (bis zu 10)",
            "Geschützter Content mit SEO",
            "Mediaeinkauf auf Abruf (50 $ gratis)",
            "Alles aus Basic",
          ],
        },
        {
          title: "Premium",
          description: "Full-Service-Digitalmarketing für größere Unternehmen.",
          features: [
            "Website-Entwicklung",
            "Kreative Visuals (bis zu 15)",
            "Mediaeinkauf auf Abruf (100 $ gratis)",
            "Texterstellung (bis zu 5)",
            "Alles aus Standard",
          ],
        },
      ],
    },

    reviews: {
      badge: "Kundenstimmen",
      headingLine1: "Verlassen Sie sich nicht",
      headingAccent: "nur auf unser Wort.",
      items: [
        {
          position: "Marketingleiterin",
          text:
            "Die Arbeit mit Creative Surf hat unsere digitale Präsenz komplett verändert. Unsere Conversion-Rate stieg in nur drei Monaten um 45 %.",
        },
        {
          position: "CEO",
          text:
            "Sie haben unsere Markenidentität entwickelt, unsere Website gebaut und eine Kampagne umgesetzt, die uns in große Publikationen brachte.",
        },
        {
          position: "E-Commerce-Managerin",
          text:
            "Unsere Online-Verkäufe sind seit der Zusammenarbeit um 78 % gestiegen. Ihre saisonale Launch-Kampagne war einfach herausragend.",
        },
      ],
    },

    trustedBy: {
      badge: "Unsere Kunden",
      headingStart: "Vertraut von",
      headingAccent: "vorausdenkenden",
      headingEnd: "Teams",
      subtitle: "Marken, die Creative Surf für ihr Wachstum gewählt haben",
    },
  },
});
