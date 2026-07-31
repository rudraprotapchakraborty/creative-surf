import { defineMessages } from "../types";

export const fixFunnelMessages = defineMessages({
  en: {
    hero: {
      title: "Fix Your Funnel",
      subtitle:
        "Identify conversion bottlenecks and unlock revenue potential with our free funnel analysis tool",
      cta: "Analyze My Funnel",
      imageAlt: "Funnel Analysis Dashboard",
    },
    tool: {
      title: "Analyze Your Conversion Funnel",
      intro:
        "Enter your website data below to receive a personalized analysis of your conversion funnel with actionable recommendations to improve your results.",
      stepLabels: ["Industry", "Traffic", "Conversions", "Revenue"],
      back: "Back",
      next: "Next",
      analyze: "Analyze My Funnel",
      steps: {
        industry: {
          title: "Select Your Industry",
          body: "We'll benchmark your performance against industry standards.",
          label: "Industry",
          placeholder: "Select your industry",
        },
        traffic: {
          title: "Website Traffic",
          body: "Tell us about your monthly website visitors.",
          label: "Monthly Website Visitors",
          placeholder: "e.g., 10000",
        },
        conversions: {
          title: "Conversion Rate",
          body: "What percentage of visitors convert to leads or customers?",
          label: "Conversion Rate (%)",
          placeholder: "e.g., 2.5",
        },
        revenue: {
          title: "Average Revenue",
          body: "What is your average revenue per conversion?",
          label: "Average Revenue Per Conversion ($)",
          placeholder: "e.g., 100",
        },
      },
      industries: {
        ecommerce: "E-commerce",
        saas: "SaaS",
        finance: "Finance",
        healthcare: "Healthcare",
        education: "Education",
        travel: "Travel & Hospitality",
        realestate: "Real Estate",
        other: "Other",
      },
    },
    results: {
      title: "Your Funnel Analysis",
      subtitle: "Based on your inputs, here's how your funnel is performing",
      currentTitle: "Current Performance",
      currentLabel: "Monthly Revenue",
      potentialTitle: "Potential Growth",
      potentialLabel: "Additional Revenue Potential",
      benchmarkTitle: "Industry Benchmark",
      benchmarkLabel: "Average Conversion Rate",
      recommendationsTitle: "Recommendations to Improve Your Funnel",
      recommendations: [
        "Optimize your landing pages with clearer CTAs and value propositions",
        "Implement A/B testing to identify the most effective page elements",
        "Streamline your checkout or form submission process to reduce abandonment",
        "Set up retargeting campaigns to re-engage visitors who didn't convert",
        "Improve page load speed to reduce bounce rates and improve user experience",
      ],
      startOver: "Start Over",
      customStrategy: "Get a Custom Funnel Strategy",
    },
    howItWorks: {
      title: "How Our Funnel Analysis Works",
      intro:
        "Our tool uses industry benchmarks and conversion optimization best practices to identify opportunities in your sales funnel.",
      items: [
        {
          title: "Data Analysis",
          body: "We analyze your current traffic, conversion rates, and revenue to establish your baseline performance.",
        },
        {
          title: "Benchmark Comparison",
          body: "Your metrics are compared against industry standards to identify gaps and opportunities.",
        },
        {
          title: "Actionable Recommendations",
          body: "Receive personalized suggestions to optimize each stage of your conversion funnel.",
        },
      ],
    },
    useCases: {
      title: "Who Can Benefit",
      intro: "Our funnel analysis tool helps businesses of all sizes identify and fix conversion bottlenecks.",
      tabs: ["E-commerce", "SaaS", "Service Businesses"],
      items: [
        {
          title: "E-commerce Stores",
          body: "Identify why shoppers abandon carts and optimize your product pages for higher conversion rates.",
          issuesTitle: "Common E-commerce Funnel Issues:",
          issues: [
            "High cart abandonment rates (industry average: 69.57%)",
            "Poor product page conversion rates",
            "Checkout friction points causing drop-offs",
            "Low average order value",
          ],
        },
        {
          title: "SaaS Companies",
          body: "Optimize your trial-to-paid conversion rates and reduce churn in your subscription funnel.",
          issuesTitle: "Common SaaS Funnel Issues:",
          issues: [
            "Low trial-to-paid conversion rates",
            "High customer acquisition costs",
            "Poor onboarding completion rates",
            "Early subscription cancellations",
          ],
        },
        {
          title: "Service Businesses",
          body: "Improve lead generation and consultation booking rates for your service-based business.",
          issuesTitle: "Common Service Business Funnel Issues:",
          issues: [
            "Low form completion rates",
            "Poor lead quality",
            "Low consultation booking rates",
            "High no-show rates for consultations",
          ],
        },
      ],
    },
    testimonials: {
      title: "Success Stories",
      intro: "See how businesses have improved their conversion rates using our funnel analysis.",
      items: [
        {
          role: "E-commerce Director",
          quote:
            "The funnel analysis tool helped us identify a major drop-off point in our checkout process. After implementing the recommended changes, our conversion rate increased by 28%.",
        },
        {
          role: "Marketing Manager",
          quote:
            "We were struggling with low lead quality. The funnel analysis helped us restructure our lead capture forms, resulting in 35% fewer but much higher quality leads that convert better.",
        },
        {
          role: "SaaS Founder",
          quote:
            "Our trial-to-paid conversion rate was stuck at 8%. After using the funnel analysis tool and implementing the recommendations, we've increased it to 12.5%, which has been transformative for our business.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      intro: "Get answers to common questions about our funnel analysis tool.",
      items: [
        {
          question: "How accurate is the funnel analysis?",
          answer:
            "Our funnel analysis tool uses industry benchmarks and conversion optimization best practices to provide accurate insights. The recommendations are based on data from thousands of successful websites and campaigns across various industries.",
        },
        {
          question: "Is my data secure?",
          answer:
            "Yes, we take data security seriously. The information you provide is used only for generating your funnel analysis and is not stored or shared with third parties. We do not require any sensitive business information to provide our analysis.",
        },
        {
          question: "How do I implement the recommendations?",
          answer:
            "After receiving your analysis, you can implement the recommendations yourself or work with our team of experts who can help you implement the changes. We offer custom funnel optimization services to help you maximize your results.",
        },
        {
          question: "How long does it take to see results?",
          answer:
            "Most businesses start seeing improvements within 2-4 weeks of implementing our recommendations. However, the timeline can vary depending on your traffic volume, industry, and the specific changes implemented.",
        },
        {
          question: "Can I get a more detailed analysis?",
          answer:
            "Yes! Our free tool provides a basic analysis, but we also offer in-depth custom funnel audits that include detailed heatmap analysis, user session recordings, and personalized optimization strategies. Contact us for more information.",
        },
      ],
    },
    cta: {
      title: "Ready to Optimize Your Conversion Funnel?",
      body: "Get started with our free analysis tool or contact our experts for a comprehensive funnel audit.",
      primary: "Analyze My Funnel Now",
      secondary: "Get Expert Help",
    },
  },

  fr: {
    hero: {
      title: "Réparez votre tunnel de conversion",
      subtitle:
        "Identifiez les points de blocage et libérez votre potentiel de revenus avec notre outil gratuit d'analyse de tunnel",
      cta: "Analyser mon tunnel",
      imageAlt: "Tableau de bord d'analyse de tunnel",
    },
    tool: {
      title: "Analysez votre tunnel de conversion",
      intro:
        "Renseignez les données de votre site ci-dessous pour recevoir une analyse personnalisée de votre tunnel de conversion, avec des recommandations concrètes.",
      stepLabels: ["Secteur", "Trafic", "Conversions", "Revenus"],
      back: "Retour",
      next: "Suivant",
      analyze: "Analyser mon tunnel",
      steps: {
        industry: {
          title: "Sélectionnez votre secteur",
          body: "Nous comparerons votre performance aux standards de votre secteur.",
          label: "Secteur",
          placeholder: "Choisissez votre secteur",
        },
        traffic: {
          title: "Trafic du site",
          body: "Parlez-nous de vos visiteurs mensuels.",
          label: "Visiteurs mensuels du site",
          placeholder: "ex. 10000",
        },
        conversions: {
          title: "Taux de conversion",
          body: "Quel pourcentage de visiteurs devient lead ou client ?",
          label: "Taux de conversion (%)",
          placeholder: "ex. 2,5",
        },
        revenue: {
          title: "Revenu moyen",
          body: "Quel est votre revenu moyen par conversion ?",
          label: "Revenu moyen par conversion ($)",
          placeholder: "ex. 100",
        },
      },
      industries: {
        ecommerce: "E-commerce",
        saas: "SaaS",
        finance: "Finance",
        healthcare: "Santé",
        education: "Éducation",
        travel: "Voyage & hôtellerie",
        realestate: "Immobilier",
        other: "Autre",
      },
    },
    results: {
      title: "Votre analyse de tunnel",
      subtitle: "D'après vos données, voici la performance de votre tunnel",
      currentTitle: "Performance actuelle",
      currentLabel: "Revenu mensuel",
      potentialTitle: "Potentiel de croissance",
      potentialLabel: "Revenu additionnel potentiel",
      benchmarkTitle: "Référence du secteur",
      benchmarkLabel: "Taux de conversion moyen",
      recommendationsTitle: "Recommandations pour améliorer votre tunnel",
      recommendations: [
        "Optimisez vos landing pages avec des CTA et des promesses plus claires",
        "Mettez en place des tests A/B pour identifier les éléments les plus efficaces",
        "Simplifiez votre tunnel de commande ou vos formulaires pour réduire l'abandon",
        "Lancez des campagnes de retargeting pour réengager les visiteurs non convertis",
        "Améliorez la vitesse de chargement pour réduire le taux de rebond",
      ],
      startOver: "Recommencer",
      customStrategy: "Obtenir une stratégie sur mesure",
    },
    howItWorks: {
      title: "Comment fonctionne notre analyse de tunnel",
      intro:
        "Notre outil s'appuie sur les références du secteur et les bonnes pratiques d'optimisation de la conversion pour repérer les opportunités de votre tunnel de vente.",
      items: [
        {
          title: "Analyse des données",
          body: "Nous analysons votre trafic, vos taux de conversion et vos revenus actuels pour établir votre performance de référence.",
        },
        {
          title: "Comparaison aux références",
          body: "Vos indicateurs sont comparés aux standards du secteur pour identifier écarts et opportunités.",
        },
        {
          title: "Recommandations actionnables",
          body: "Recevez des suggestions personnalisées pour optimiser chaque étape de votre tunnel de conversion.",
        },
      ],
    },
    useCases: {
      title: "À qui cela s'adresse",
      intro:
        "Notre outil d'analyse aide les entreprises de toutes tailles à identifier et corriger les points de blocage de leur conversion.",
      tabs: ["E-commerce", "SaaS", "Entreprises de services"],
      items: [
        {
          title: "Boutiques e-commerce",
          body: "Comprenez pourquoi les acheteurs abandonnent leur panier et optimisez vos fiches produits pour convertir davantage.",
          issuesTitle: "Problèmes fréquents en e-commerce :",
          issues: [
            "Taux d'abandon de panier élevé (moyenne du secteur : 69,57 %)",
            "Faible taux de conversion des fiches produits",
            "Frictions au moment du paiement qui provoquent des abandons",
            "Panier moyen faible",
          ],
        },
        {
          title: "Éditeurs SaaS",
          body: "Optimisez vos taux de conversion d'essai en abonnement payant et réduisez le churn de votre tunnel.",
          issuesTitle: "Problèmes fréquents en SaaS :",
          issues: [
            "Faible conversion des essais en abonnements payants",
            "Coûts d'acquisition client élevés",
            "Faible taux de complétion de l'onboarding",
            "Résiliations précoces des abonnements",
          ],
        },
        {
          title: "Entreprises de services",
          body: "Améliorez votre génération de leads et vos prises de rendez-vous.",
          issuesTitle: "Problèmes fréquents dans les services :",
          issues: [
            "Faible taux de complétion des formulaires",
            "Qualité de leads insuffisante",
            "Peu de rendez-vous de conseil réservés",
            "Taux d'absence élevé aux rendez-vous",
          ],
        },
      ],
    },
    testimonials: {
      title: "Témoignages",
      intro: "Découvrez comment des entreprises ont amélioré leurs conversions grâce à notre analyse de tunnel.",
      items: [
        {
          role: "Directrice e-commerce",
          quote:
            "L'outil d'analyse nous a permis d'identifier un point de fuite majeur dans notre tunnel de commande. Après avoir appliqué les recommandations, notre taux de conversion a augmenté de 28 %.",
        },
        {
          role: "Responsable marketing",
          quote:
            "Nous avions un problème de qualité de leads. L'analyse nous a aidés à restructurer nos formulaires : 35 % de leads en moins, mais bien mieux qualifiés et qui convertissent davantage.",
        },
        {
          role: "Fondatrice SaaS",
          quote:
            "Notre taux de conversion d'essai à payant plafonnait à 8 %. Après avoir utilisé l'outil et appliqué les recommandations, nous sommes à 12,5 % — un vrai tournant pour notre activité.",
        },
      ],
    },
    faq: {
      title: "Questions fréquentes",
      intro: "Les réponses aux questions les plus courantes sur notre outil d'analyse de tunnel.",
      items: [
        {
          question: "L'analyse de tunnel est-elle fiable ?",
          answer:
            "Notre outil s'appuie sur les références du secteur et les bonnes pratiques d'optimisation de la conversion pour fournir des insights fiables. Les recommandations reposent sur les données de milliers de sites et de campagnes performants, tous secteurs confondus.",
        },
        {
          question: "Mes données sont-elles sécurisées ?",
          answer:
            "Oui, la sécurité des données est une priorité. Les informations que vous fournissez servent uniquement à générer votre analyse ; elles ne sont ni stockées ni partagées avec des tiers. Aucune information sensible n'est requise.",
        },
        {
          question: "Comment appliquer les recommandations ?",
          answer:
            "Après réception de votre analyse, vous pouvez appliquer les recommandations vous-même ou vous faire accompagner par nos experts. Nous proposons des prestations d'optimisation de tunnel sur mesure pour maximiser vos résultats.",
        },
        {
          question: "Combien de temps avant de voir des résultats ?",
          answer:
            "La plupart des entreprises constatent des améliorations sous 2 à 4 semaines après la mise en œuvre. Le délai varie selon votre volume de trafic, votre secteur et les changements réalisés.",
        },
        {
          question: "Puis-je obtenir une analyse plus détaillée ?",
          answer:
            "Oui ! Notre outil gratuit fournit une analyse de base, mais nous proposons aussi des audits de tunnel approfondis : analyse de heatmaps, enregistrements de sessions et stratégies d'optimisation personnalisées. Contactez-nous pour en savoir plus.",
        },
      ],
    },
    cta: {
      title: "Prêt à optimiser votre tunnel de conversion ?",
      body: "Commencez avec notre outil gratuit ou contactez nos experts pour un audit complet de votre tunnel.",
      primary: "Analyser mon tunnel maintenant",
      secondary: "Être accompagné par un expert",
    },
  },

  de: {
    hero: {
      title: "Reparieren Sie Ihren Funnel",
      subtitle:
        "Erkennen Sie Conversion-Engpässe und heben Sie Umsatzpotenzial mit unserem kostenlosen Funnel-Analyse-Tool",
      cta: "Meinen Funnel analysieren",
      imageAlt: "Funnel-Analyse-Dashboard",
    },
    tool: {
      title: "Analysieren Sie Ihren Conversion-Funnel",
      intro:
        "Geben Sie unten Ihre Website-Daten ein und erhalten Sie eine individuelle Analyse Ihres Funnels mit konkreten Empfehlungen für bessere Ergebnisse.",
      stepLabels: ["Branche", "Traffic", "Conversions", "Umsatz"],
      back: "Zurück",
      next: "Weiter",
      analyze: "Meinen Funnel analysieren",
      steps: {
        industry: {
          title: "Wählen Sie Ihre Branche",
          body: "Wir vergleichen Ihre Leistung mit den Standards Ihrer Branche.",
          label: "Branche",
          placeholder: "Branche auswählen",
        },
        traffic: {
          title: "Website-Traffic",
          body: "Erzählen Sie uns von Ihren monatlichen Besuchern.",
          label: "Monatliche Website-Besucher",
          placeholder: "z. B. 10000",
        },
        conversions: {
          title: "Conversion-Rate",
          body: "Wie viel Prozent Ihrer Besucher werden zu Leads oder Kunden?",
          label: "Conversion-Rate (%)",
          placeholder: "z. B. 2,5",
        },
        revenue: {
          title: "Durchschnittlicher Umsatz",
          body: "Wie hoch ist Ihr durchschnittlicher Umsatz je Conversion?",
          label: "Durchschnittlicher Umsatz je Conversion ($)",
          placeholder: "z. B. 100",
        },
      },
      industries: {
        ecommerce: "E-Commerce",
        saas: "SaaS",
        finance: "Finanzen",
        healthcare: "Gesundheitswesen",
        education: "Bildung",
        travel: "Reise & Hotellerie",
        realestate: "Immobilien",
        other: "Sonstiges",
      },
    },
    results: {
      title: "Ihre Funnel-Analyse",
      subtitle: "Basierend auf Ihren Angaben sieht Ihr Funnel so aus",
      currentTitle: "Aktuelle Performance",
      currentLabel: "Monatsumsatz",
      potentialTitle: "Wachstumspotenzial",
      potentialLabel: "Zusätzliches Umsatzpotenzial",
      benchmarkTitle: "Branchen-Benchmark",
      benchmarkLabel: "Durchschnittliche Conversion-Rate",
      recommendationsTitle: "Empfehlungen zur Verbesserung Ihres Funnels",
      recommendations: [
        "Optimieren Sie Ihre Landingpages mit klareren CTAs und Nutzenversprechen",
        "Führen Sie A/B-Tests durch, um die wirksamsten Seitenelemente zu finden",
        "Verschlanken Sie Checkout oder Formular, um Abbrüche zu reduzieren",
        "Starten Sie Retargeting-Kampagnen für Besucher ohne Conversion",
        "Verbessern Sie die Ladezeit, um Absprünge zu senken und die Nutzererfahrung zu verbessern",
      ],
      startOver: "Neu starten",
      customStrategy: "Individuelle Funnel-Strategie erhalten",
    },
    howItWorks: {
      title: "So funktioniert unsere Funnel-Analyse",
      intro:
        "Unser Tool nutzt Branchen-Benchmarks und Best Practices der Conversion-Optimierung, um Chancen in Ihrem Vertriebsfunnel zu identifizieren.",
      items: [
        {
          title: "Datenanalyse",
          body: "Wir analysieren Ihren aktuellen Traffic, Ihre Conversion-Raten und Ihren Umsatz als Ausgangsbasis.",
        },
        {
          title: "Benchmark-Vergleich",
          body: "Ihre Kennzahlen werden mit Branchenstandards verglichen, um Lücken und Chancen zu erkennen.",
        },
        {
          title: "Konkrete Empfehlungen",
          body: "Sie erhalten individuelle Vorschläge zur Optimierung jeder Stufe Ihres Funnels.",
        },
      ],
    },
    useCases: {
      title: "Wer davon profitiert",
      intro:
        "Unser Funnel-Analyse-Tool hilft Unternehmen jeder Größe, Conversion-Engpässe zu finden und zu beheben.",
      tabs: ["E-Commerce", "SaaS", "Dienstleister"],
      items: [
        {
          title: "Onlineshops",
          body: "Erkennen Sie, warum Käufer den Warenkorb verlassen, und optimieren Sie Produktseiten für höhere Conversion.",
          issuesTitle: "Häufige Funnel-Probleme im E-Commerce:",
          issues: [
            "Hohe Warenkorbabbruchrate (Branchendurchschnitt: 69,57 %)",
            "Schwache Conversion-Raten auf Produktseiten",
            "Reibungspunkte im Checkout führen zu Abbrüchen",
            "Niedriger durchschnittlicher Bestellwert",
          ],
        },
        {
          title: "SaaS-Unternehmen",
          body: "Optimieren Sie die Conversion von Testphase zu zahlender Kundschaft und senken Sie die Abwanderung.",
          issuesTitle: "Häufige Funnel-Probleme bei SaaS:",
          issues: [
            "Geringe Conversion von Test- zu Bezahlkonten",
            "Hohe Kundenakquisitionskosten",
            "Niedrige Abschlussquote beim Onboarding",
            "Frühe Kündigungen von Abonnements",
          ],
        },
        {
          title: "Dienstleister",
          body: "Verbessern Sie Ihre Leadgenerierung und die Buchungsrate für Beratungstermine.",
          issuesTitle: "Häufige Funnel-Probleme bei Dienstleistern:",
          issues: [
            "Niedrige Abschlussquote bei Formularen",
            "Schwache Leadqualität",
            "Wenige gebuchte Beratungstermine",
            "Hohe No-Show-Rate bei Terminen",
          ],
        },
      ],
    },
    testimonials: {
      title: "Erfolgsgeschichten",
      intro: "So haben Unternehmen ihre Conversion-Raten mit unserer Funnel-Analyse verbessert.",
      items: [
        {
          role: "E-Commerce-Leiterin",
          quote:
            "Das Analyse-Tool hat uns einen großen Absprungpunkt im Checkout aufgezeigt. Nach Umsetzung der Empfehlungen stieg unsere Conversion-Rate um 28 %.",
        },
        {
          role: "Marketing-Manager",
          quote:
            "Wir hatten Probleme mit der Leadqualität. Die Analyse half uns, unsere Formulare neu zu strukturieren: 35 % weniger, dafür deutlich hochwertigere Leads, die besser konvertieren.",
        },
        {
          role: "SaaS-Gründerin",
          quote:
            "Unsere Conversion von Test zu Bezahlt lag festgefahren bei 8 %. Nach Nutzung des Tools und Umsetzung der Empfehlungen liegen wir bei 12,5 % — ein Wendepunkt für unser Geschäft.",
        },
      ],
    },
    faq: {
      title: "Häufige Fragen",
      intro: "Antworten auf die häufigsten Fragen zu unserem Funnel-Analyse-Tool.",
      items: [
        {
          question: "Wie genau ist die Funnel-Analyse?",
          answer:
            "Unser Tool nutzt Branchen-Benchmarks und bewährte Praktiken der Conversion-Optimierung für belastbare Erkenntnisse. Die Empfehlungen basieren auf Daten tausender erfolgreicher Websites und Kampagnen aus verschiedenen Branchen.",
        },
        {
          question: "Sind meine Daten sicher?",
          answer:
            "Ja, Datensicherheit nehmen wir ernst. Ihre Angaben dienen ausschließlich der Erstellung Ihrer Analyse und werden weder gespeichert noch an Dritte weitergegeben. Sensible Geschäftsdaten sind nicht erforderlich.",
        },
        {
          question: "Wie setze ich die Empfehlungen um?",
          answer:
            "Nach Erhalt Ihrer Analyse können Sie die Empfehlungen selbst umsetzen oder mit unserem Expertenteam zusammenarbeiten. Wir bieten individuelle Funnel-Optimierung, damit Sie das Maximum herausholen.",
        },
        {
          question: "Wie lange dauert es bis zu Ergebnissen?",
          answer:
            "Die meisten Unternehmen sehen Verbesserungen innerhalb von 2–4 Wochen nach Umsetzung. Der Zeitrahmen hängt von Traffic-Volumen, Branche und den konkreten Änderungen ab.",
        },
        {
          question: "Gibt es eine ausführlichere Analyse?",
          answer:
            "Ja! Unser kostenloses Tool liefert eine Basisanalyse. Zusätzlich bieten wir tiefgehende Funnel-Audits mit Heatmap-Analyse, Session-Aufzeichnungen und individuellen Optimierungsstrategien. Sprechen Sie uns an.",
        },
      ],
    },
    cta: {
      title: "Bereit, Ihren Conversion-Funnel zu optimieren?",
      body: "Starten Sie mit unserem kostenlosen Tool oder sprechen Sie mit unseren Fachleuten über ein umfassendes Funnel-Audit.",
      primary: "Jetzt Funnel analysieren",
      secondary: "Expertenhilfe anfordern",
    },
  },
  ar: {
    hero: {
      title: "Aslih Masar Tahwilik",
      subtitle: "Haddid ikhtinaqat Al-Tahwil wa hurrir imkanat Al-Iradat ma adatina Al-Majjaniyya li-tahlil Al-Masar",
      cta: "Hallil Masari",
      imageAlt: "Lawhat maalumat tahlil Al-Masar",
    },
    tool: {
      title: "Hallil masar tahwilik",
      intro:
        "Adkhil bayanat mawqiak adnah li-tahsul ala tahlil mukhassas li-masar tahwilik ma tawsiyat qabila lil-tanfidh li-tahsin nataijik.",
      stepLabels: ["Al-Qita", "Al-Zayarat", "Al-Tahwilat", "Al-Iradat"],
      back: "Ruju",
      next: "Al-Tali",
      analyze: "Hallil Masari",
      steps: {
        industry: {
          title: "Ikhtar qitaak",
          body: "Sa-nuqarin adaak bi-mayair Al-Qita.",
          label: "Al-Qita",
          placeholder: "Ikhtar qitaak",
        },
        traffic: {
          title: "Zayarat Al-Mawqi",
          body: "Hadithna an zuwwar mawqiak Al-Shahriyyin.",
          label: "Zuwwar Al-Mawqi Al-Shahriyyun",
          placeholder: "mathalan 10000",
        },
        conversions: {
          title: "Muaddal Al-Tahwil",
          body: "Ma nisbat Al-Zuwwar alladhina yatahawwalun ila umala muhtamalin aw mushtarin?",
          label: "Muaddal Al-Tahwil (%)",
          placeholder: "mathalan 2.5",
        },
        revenue: {
          title: "Mutawassit Al-Iradat",
          body: "Ma mutawassit iradik li-kull tahwil?",
          label: "Mutawassit Al-Iradat li-kull tahwil ($)",
          placeholder: "mathalan 100",
        },
      },
      industries: {
        ecommerce: "Tijara Iliktruniyya",
        saas: "SaaS",
        finance: "Tamwil",
        healthcare: "Riaya Sihhiyya",
        education: "Talim",
        travel: "Safar wa Diyafa",
        realestate: "Aqarat",
        other: "Ghayr dhalika",
      },
    },
    results: {
      title: "Tahlil masarik",
      subtitle: "Bina ala madkhalatik, hakadha yabdu ada masarik",
      currentTitle: "Al-Ada Al-Hali",
      currentLabel: "Al-Irad Al-Shahri",
      potentialTitle: "Imkanat Al-Numuww",
      potentialLabel: "Imkanat irad idafi",
      benchmarkTitle: "Miyar Al-Qita",
      benchmarkLabel: "Mutawassit muaddal Al-Tahwil",
      recommendationsTitle: "Tawsiyat li-tahsin masarik",
      recommendations: [
        "Hassin safahat hubutik bi-dawaat li-ittikhadh ijra wa uruud qima awdah",
        "Tabbiq ikhtibar A/B li-tahdid anasir Al-Safha Al-Akthar faaliyya",
        "Bassit amaliyyat itmam Al-Shira aw irsal Al-Namudhaj li-taqlil Al-Tark",
        "Aidd istihdaf Al-Zuwwar alladhina lam yatahawwalu abr hamalat Al-Tatabbu",
        "Hassin surat tahmil Al-Safha li-taqlil Al-Irtidad wa tahsin tajribat Al-Mustakhdim",
      ],
      startOver: "Ibda min Jadid",
      customStrategy: "Uhsul ala Istratijiyyat Masar Mukhassasa",
    },
    howItWorks: {
      title: "Kayfa yamal tahliluna lil-masar",
      intro:
        "Tastakhdim adatuna mayair Al-Qita wa afdal mumarasat tahsin Al-Tahwil li-tahdid Al-Furas fi masar mabiatik.",
      items: [
        { title: "Tahlil Al-Bayanat", body: "Nuhallil zayaratik Al-Haliyya wa muaddalat tahwilik wa iradatik li-tahdid khatt asas adaik." },
        { title: "Muqaranat Al-Mayair", body: "Tuqaran muashiratik bi-mayair Al-Qita li-tahdid Al-Fajawat wal-furas." },
        { title: "Tawsiyat Qabila lil-Tanfidh", body: "Ihsal ala iqtirahat mukhassasa li-tahsin kull marhala min masar tahwilik." },
      ],
    },
    useCases: {
      title: "Man yastafid",
      intro: "Tusaid adatuna li-tahlil Al-Masar Al-Sharikat min jami Al-Ahjam ala tahdid wa islah ikhtinaqat Al-Tahwil.",
      tabs: ["Tijara Iliktruniyya", "SaaS", "Sharikat Al-Khadamat"],
      items: [
        {
          title: "Matajir Al-Tijara Al-Iliktruniyya",
          body: "Haddid limadha yatruk Al-Mutasawwiqun Al-Salla wa hassin safahat muntajatik li-muaddalat tahwil aala.",
          issuesTitle: "Mushkilat masar shaia fil-tijara Al-Iliktruniyya:",
          issues: [
            "Muaddalat tark salla aliya (mutawassit Al-Qita: 69.57%)",
            "Muaddalat tahwil daifa li-safahat Al-Muntajat",
            "Nuqat ihtikak fi itmam Al-Shira tusabbib Al-Tark",
            "Mutawassit qimat talab munkhafid",
          ],
        },
        {
          title: "Sharikat SaaS",
          body: "Hassin muaddalat tahwil Al-Tajriba ila ishtirak madfu wa qallil Al-Insihab min masar ishtirakatik.",
          issuesTitle: "Mushkilat masar shaia fil-SaaS:",
          issues: [
            "Muaddalat tahwil munkhafida min Al-Tajriba ila Al-Daf",
            "Taklifat istihwadh ala Al-Umala aliya",
            "Muaddalat ikmal daifa lil-tahyia",
            "Ilgha ishtirakat mubakkir",
          ],
        },
        {
          title: "Sharikat Al-Khadamat",
          body: "Hassin jalb Al-Umala wa muaddalat hajz Al-Istisharat li-amalik Al-Qaim ala Al-Khadamat.",
          issuesTitle: "Mushkilat masar shaia fi sharikat Al-Khadamat:",
          issues: [
            "Muaddalat ikmal namadhij munkhafida",
            "Jawdat umala muhtamalin daifa",
            "Muaddalat hajz istisharat munkhafida",
            "Muaddalat adam hudur aliya lil-istisharat",
          ],
        },
      ],
    },
    testimonials: {
      title: "Qisas Najah",
      intro: "Shahid kayfa hassanat Al-Sharikat muaddalat tahwiliha bi-istikhdam tahlilina lil-masar.",
      items: [
        { role: "Mudirat Al-Tijara Al-Iliktruniyya", quote: "Saadatna adat tahlil Al-Masar ala tahdid nuqtat insihab kabira fi amaliyyat itmam Al-Shira ladayna. Bad tatbiq Al-Taghyirat Al-Musa biha, irtafaa muaddal tahwilina bi-nisbat 28%." },
        { role: "Mudir Al-Taswiq", quote: "Kunna nuani min daf jawdat Al-Umala Al-Muhtamalin. Saadana tahlil Al-Masar ala iadat hikalat namadhij iltiqat Al-Umala, mimma adda ila 35% aqall min Al-Umala lakin bi-jawda aala bi-kathir wa tahwil afdal." },
        { role: "Muassisat SaaS", quote: "Kana muaddal tahwilina min Al-Tajriba ila Al-Daf aliqan ind 8%. Bad istikhdam adat tahlil Al-Masar wa tatbiq Al-Tawsiyat, rafanah ila 12.5%, wa kana dhalika nuqtat tahawwul li-amalina." },
      ],
    },
    faq: {
      title: "Al-Asila Al-Shaia",
      intro: "Ihsal ala ijabat lil-asila Al-Shaia hawl adatina li-tahlil Al-Masar.",
      items: [
        { question: "Ma mada diqqat tahlil Al-Masar?", answer: "Tastakhdim adatuna li-tahlil Al-Masar mayair Al-Qita wa afdal mumarasat tahsin Al-Tahwil li-taqdim ruan daqiqa. Al-Tawsiyat mabniyya ala bayanat min alaf Al-Mawaqi wal-hamalat Al-Najiha fi mukhtalaf Al-Qitaat." },
        { question: "Hal bayanati amina?", answer: "Naam, naakhudh aman Al-Bayanat ala mahmal Al-Jidd. Al-Maalumat allati tuqaddimuha tustakhdam faqat li-insha tahlil masarik wa la tukhzan aw tusharak ma jihat kharijiyya. La natlub ayy maalumat amal hassasa li-taqdim tahlilina." },
        { question: "Kayfa unaffidh Al-Tawsiyat?", answer: "Bad talaqqi tahlilak, yumkinuk tanfidh Al-Tawsiyat bi-nafsik aw Al-Amal ma fariqina min Al-Khubara alladhina yumkinuhum musaadatak ala tanfidh Al-Taghyirat. Nuqaddim khadamat tahsin masar mukhassasa li-musaadatak ala tadif nataijik." },
        { question: "Kam min Al-Waqt yastaghriq zuhur Al-Nataij?", answer: "Tabda muzam Al-Sharikat fi mulahazat tahsinat khilal 2-4 asabi min tanfidh tawsiyatina. Ma dhalika, qad yakhtalif Al-Jadwal Al-Zamani hasab hajm zayaratik wa qitaik wal-taghyirat Al-Muhaddada Al-Munaffadha." },
        { question: "Hal yumkinuni Al-Husul ala tahlil akthar tafsilan?", answer: "Naam! Tuqaddim adatuna Al-Majjaniyya tahlilan asasiyyan, lakinnana nuqaddim aydan tadqiqat masar mukhassasa muammaqa tashmal tahlil kharitat Al-Harara wa tasjilat jalasat Al-Mustakhdimin wa istratijiyyat tahsin mukhassasa. Ittasil bina li-mazid min Al-Maalumat." },
      ],
    },
    cta: {
      title: "Mustaidd li-tahsin masar tahwilik?",
      body: "Ibda ma adatina Al-Majjaniyya lil-tahlil aw ittasil bi-khubaraina li-tadqiq masar shamil.",
      primary: "Hallil Masari Al-An",
      secondary: "Uhsul ala Musaadat Khabir",
    },
  },
});
