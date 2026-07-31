import { defineMessages } from "../types";

export const keywordToolMessages = defineMessages({
  en: {
    hero: {
      title: "Free Keyword Suggestion Tool",
      subtitle: "Discover high-value keywords for your SEO and content strategy",
      placeholder: "Enter a keyword or topic...",
      searching: "Searching...",
      popularSearches: "Popular searches:",
    },
    results: {
      heading: 'Keyword Suggestions for "{keyword}"',
      found: "Found {count} keyword suggestions. Use these keywords to improve your SEO strategy.",
      tabs: {
        all: "All Keywords",
        low: "Low Difficulty",
        medium: "Medium Difficulty",
        high: "High Difficulty",
      },
      copy: "Copy",
      copied: "Copied!",
      csv: "CSV",
      columns: {
        keyword: "Keyword",
        volume: "Search Volume",
        difficulty: "Difficulty",
        cpc: "CPC",
      },
      tooltips: {
        volume: "Monthly search volume based on Google data",
        difficulty: "SEO difficulty score from 1-100. Higher means more competitive.",
        cpc: "Average cost per click in USD for Google Ads",
      },
      empty: "No keywords match the selected filter. Try another difficulty level.",
      csvHeaders: ["Keyword", "Search Volume", "Difficulty", "CPC ($)"],
    },
    howTo: {
      title: "How to Use This Tool",
      description: "Get started with our free keyword suggestion tool in 3 simple steps",
      steps: [
        {
          title: "Enter a seed keyword",
          body: "Type in a keyword related to your business or content",
        },
        {
          title: "Review keyword suggestions",
          body: "Analyze search volume, difficulty, and CPC data",
        },
        {
          title: "Export your keywords",
          body: "Download as CSV or copy to clipboard for your SEO strategy",
        },
      ],
    },
    features: {
      title: "Why Use Our Keyword Suggestion Tool?",
      items: [
        {
          title: "Discover Untapped Opportunities",
          body:
            "Find valuable keywords your competitors might have missed. Our tool helps you identify low-competition, high-volume keywords.",
        },
        {
          title: "Optimize Your Content Strategy",
          body:
            "Create content that ranks by targeting the right keywords. Understand search intent and difficulty to prioritize your efforts.",
        },
        {
          title: "Improve Your PPC Campaigns",
          body:
            "Get CPC data to optimize your ad spend. Find more affordable keywords with good search volume to maximize ROI.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How accurate is the keyword data?",
          answer:
            "Our keyword data is sourced from multiple reliable providers and updated regularly. While we strive for accuracy, search volumes and competition metrics can fluctuate over time. We recommend using this tool as a starting point for your keyword research.",
        },
        {
          question: "How many keywords can I research?",
          answer:
            "Our free tool allows unlimited searches with up to 10 keyword suggestions per search. For more comprehensive keyword research with hundreds of suggestions, consider our premium SEO services.",
        },
        {
          question: "What does the difficulty score mean?",
          answer:
            "The difficulty score ranges from 1-100 and indicates how challenging it would be to rank for a particular keyword. Factors include competition, domain authority of ranking sites, and content quality. Lower scores (under 45) represent easier ranking opportunities.",
        },
        {
          question: "How should I use these keywords in my content?",
          answer:
            "For best results, focus on creating high-quality content that naturally incorporates your target keywords. Include keywords in your title, headings, meta description, and throughout your content where relevant. Avoid keyword stuffing, as this can harm your rankings.",
        },
        {
          question: "Do you offer more advanced keyword research?",
          answer:
            "Yes! Our SEO experts can provide in-depth keyword research tailored to your specific industry and goals. We analyze competitors, identify content gaps, and create a comprehensive keyword strategy. Contact us for a custom proposal.",
        },
      ],
    },
    cta: {
      title: "Need More Advanced SEO Tools?",
      body:
        "Our team of SEO experts can help you develop a comprehensive keyword strategy and improve your search rankings.",
      button: "Get a Custom SEO Proposal",
    },
  },

  fr: {
    hero: {
      title: "Outil gratuit de suggestion de mots-clés",
      subtitle: "Trouvez des mots-clés à forte valeur pour votre stratégie SEO et de contenu",
      placeholder: "Saisissez un mot-clé ou un thème…",
      searching: "Recherche en cours…",
      popularSearches: "Recherches populaires :",
    },
    results: {
      heading: 'Suggestions de mots-clés pour « {keyword} »',
      found: "{count} suggestions trouvées. Utilisez ces mots-clés pour renforcer votre stratégie SEO.",
      tabs: {
        all: "Tous les mots-clés",
        low: "Difficulté faible",
        medium: "Difficulté moyenne",
        high: "Difficulté élevée",
      },
      copy: "Copier",
      copied: "Copié !",
      csv: "CSV",
      columns: {
        keyword: "Mot-clé",
        volume: "Volume de recherche",
        difficulty: "Difficulté",
        cpc: "CPC",
      },
      tooltips: {
        volume: "Volume de recherche mensuel basé sur les données Google",
        difficulty: "Score de difficulté SEO de 1 à 100. Plus il est élevé, plus la concurrence est forte.",
        cpc: "Coût par clic moyen en USD sur Google Ads",
      },
      empty: "Aucun mot-clé ne correspond au filtre sélectionné. Essayez un autre niveau de difficulté.",
      csvHeaders: ["Mot-clé", "Volume de recherche", "Difficulté", "CPC ($)"],
    },
    howTo: {
      title: "Comment utiliser cet outil",
      description: "Démarrez avec notre outil gratuit de suggestion de mots-clés en 3 étapes",
      steps: [
        {
          title: "Saisissez un mot-clé de départ",
          body: "Entrez un mot-clé en lien avec votre activité ou vos contenus",
        },
        {
          title: "Parcourez les suggestions",
          body: "Analysez le volume de recherche, la difficulté et le CPC",
        },
        {
          title: "Exportez vos mots-clés",
          body: "Téléchargez le CSV ou copiez la liste pour votre stratégie SEO",
        },
      ],
    },
    features: {
      title: "Pourquoi utiliser notre outil de suggestion de mots-clés ?",
      items: [
        {
          title: "Repérez des opportunités inexploitées",
          body:
            "Trouvez des mots-clés précieux que vos concurrents ont peut-être manqués. Notre outil vous aide à identifier des requêtes peu concurrentielles à fort volume.",
        },
        {
          title: "Optimisez votre stratégie de contenu",
          body:
            "Créez des contenus qui se positionnent en ciblant les bons mots-clés. Comprenez l'intention de recherche et la difficulté pour prioriser vos efforts.",
        },
        {
          title: "Améliorez vos campagnes PPC",
          body:
            "Utilisez les données de CPC pour optimiser votre budget publicitaire. Trouvez des mots-clés plus abordables au bon volume pour maximiser le ROI.",
        },
      ],
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          question: "Les données de mots-clés sont-elles fiables ?",
          answer:
            "Nos données proviennent de plusieurs fournisseurs reconnus et sont mises à jour régulièrement. Malgré notre exigence de précision, les volumes de recherche et les indicateurs de concurrence peuvent varier dans le temps. Utilisez cet outil comme point de départ de votre recherche.",
        },
        {
          question: "Combien de mots-clés puis-je rechercher ?",
          answer:
            "Notre outil gratuit permet des recherches illimitées, avec jusqu'à 10 suggestions par requête. Pour une recherche plus complète, avec des centaines de suggestions, découvrez nos prestations SEO premium.",
        },
        {
          question: "Que signifie le score de difficulté ?",
          answer:
            "Le score de difficulté va de 1 à 100 et indique la difficulté à se positionner sur un mot-clé. Il tient compte de la concurrence, de l'autorité de domaine des sites positionnés et de la qualité des contenus. Un score faible (moins de 45) signale une opportunité plus accessible.",
        },
        {
          question: "Comment utiliser ces mots-clés dans mes contenus ?",
          answer:
            "Pour de meilleurs résultats, créez des contenus de qualité qui intègrent naturellement vos mots-clés cibles : dans le titre, les intertitres, la meta description et le corps du texte lorsque c'est pertinent. Évitez le bourrage de mots-clés, qui peut nuire à votre positionnement.",
        },
        {
          question: "Proposez-vous une recherche de mots-clés plus avancée ?",
          answer:
            "Oui ! Nos experts SEO réalisent des recherches approfondies adaptées à votre secteur et à vos objectifs : analyse concurrentielle, identification des manques de contenu et stratégie de mots-clés complète. Contactez-nous pour une proposition sur mesure.",
        },
      ],
    },
    cta: {
      title: "Besoin d'outils SEO plus avancés ?",
      body:
        "Notre équipe d'experts SEO peut vous aider à bâtir une stratégie de mots-clés complète et à améliorer votre positionnement.",
      button: "Obtenir une proposition SEO sur mesure",
    },
  },

  de: {
    hero: {
      title: "Kostenloses Keyword-Tool",
      subtitle: "Finden Sie wertvolle Keywords für Ihre SEO- und Content-Strategie",
      placeholder: "Keyword oder Thema eingeben…",
      searching: "Suche läuft…",
      popularSearches: "Beliebte Suchen:",
    },
    results: {
      heading: 'Keyword-Vorschläge für „{keyword}“',
      found: "{count} Keyword-Vorschläge gefunden. Nutzen Sie sie, um Ihre SEO-Strategie zu verbessern.",
      tabs: {
        all: "Alle Keywords",
        low: "Geringe Schwierigkeit",
        medium: "Mittlere Schwierigkeit",
        high: "Hohe Schwierigkeit",
      },
      copy: "Kopieren",
      copied: "Kopiert!",
      csv: "CSV",
      columns: {
        keyword: "Keyword",
        volume: "Suchvolumen",
        difficulty: "Schwierigkeit",
        cpc: "CPC",
      },
      tooltips: {
        volume: "Monatliches Suchvolumen auf Basis von Google-Daten",
        difficulty: "SEO-Schwierigkeit von 1–100. Höher bedeutet mehr Wettbewerb.",
        cpc: "Durchschnittlicher Klickpreis in USD für Google Ads",
      },
      empty: "Keine Keywords passen zum gewählten Filter. Probieren Sie eine andere Schwierigkeitsstufe.",
      csvHeaders: ["Keyword", "Suchvolumen", "Schwierigkeit", "CPC ($)"],
    },
    howTo: {
      title: "So nutzen Sie dieses Tool",
      description: "In 3 einfachen Schritten mit unserem kostenlosen Keyword-Tool starten",
      steps: [
        {
          title: "Start-Keyword eingeben",
          body: "Geben Sie ein Keyword rund um Ihr Geschäft oder Ihre Inhalte ein",
        },
        {
          title: "Vorschläge prüfen",
          body: "Analysieren Sie Suchvolumen, Schwierigkeit und CPC-Daten",
        },
        {
          title: "Keywords exportieren",
          body: "Als CSV herunterladen oder für Ihre SEO-Strategie kopieren",
        },
      ],
    },
    features: {
      title: "Warum unser Keyword-Tool nutzen?",
      items: [
        {
          title: "Ungenutzte Chancen entdecken",
          body:
            "Finden Sie wertvolle Keywords, die Ihre Wettbewerber übersehen haben. Unser Tool hilft, Begriffe mit wenig Wettbewerb und hohem Volumen zu identifizieren.",
        },
        {
          title: "Content-Strategie optimieren",
          body:
            "Erstellen Sie Inhalte, die ranken, indem Sie die richtigen Keywords ansprechen. Verstehen Sie Suchintention und Schwierigkeit, um Prioritäten zu setzen.",
        },
        {
          title: "PPC-Kampagnen verbessern",
          body:
            "Nutzen Sie CPC-Daten, um Ihr Werbebudget zu optimieren. Finden Sie günstigere Keywords mit gutem Suchvolumen für maximalen ROI.",
        },
      ],
    },
    faq: {
      title: "Häufige Fragen",
      items: [
        {
          question: "Wie genau sind die Keyword-Daten?",
          answer:
            "Unsere Daten stammen von mehreren verlässlichen Anbietern und werden regelmäßig aktualisiert. Trotz aller Sorgfalt können Suchvolumen und Wettbewerbskennzahlen im Zeitverlauf schwanken. Nutzen Sie dieses Tool als Ausgangspunkt Ihrer Recherche.",
        },
        {
          question: "Wie viele Keywords kann ich recherchieren?",
          answer:
            "Unser kostenloses Tool erlaubt unbegrenzte Suchen mit bis zu 10 Vorschlägen pro Suche. Für umfassendere Recherchen mit hunderten Vorschlägen empfehlen wir unsere Premium-SEO-Leistungen.",
        },
        {
          question: "Was bedeutet der Schwierigkeitswert?",
          answer:
            "Der Wert reicht von 1 bis 100 und zeigt, wie schwer es ist, für ein Keyword zu ranken. Er berücksichtigt Wettbewerb, Domain-Autorität der rankenden Seiten und Content-Qualität. Niedrige Werte (unter 45) stehen für leichtere Chancen.",
        },
        {
          question: "Wie setze ich diese Keywords in Inhalten ein?",
          answer:
            "Für beste Ergebnisse erstellen Sie hochwertige Inhalte, die Ihre Ziel-Keywords natürlich einbinden — in Titel, Überschriften, Meta-Description und, wo passend, im Text. Vermeiden Sie Keyword-Stuffing, das Ihren Rankings schadet.",
        },
        {
          question: "Bieten Sie erweiterte Keyword-Recherche an?",
          answer:
            "Ja! Unsere SEO-Fachleute liefern tiefgehende Keyword-Recherche für Ihre Branche und Ziele: Wettbewerbsanalyse, Identifikation von Content-Lücken und eine vollständige Keyword-Strategie. Kontaktieren Sie uns für ein individuelles Angebot.",
        },
      ],
    },
    cta: {
      title: "Brauchen Sie fortgeschrittenere SEO-Tools?",
      body:
        "Unser SEO-Team hilft Ihnen, eine umfassende Keyword-Strategie zu entwickeln und Ihre Rankings zu verbessern.",
      button: "Individuelles SEO-Angebot anfordern",
    },
  },
  ar: {
    hero: {
      title: "Adat majjaniyya li-iqtirah Al-Kalimat Al-Miftahiyya",
      subtitle: "Iktashif kalimat miftahiyya aliyat Al-Qima li-istratijiyyat Al-SEO wal-muhtawa ladayk",
      placeholder: "Adkhil kalima miftahiyya aw mawduan…",
      searching: "Jari Al-Bahth…",
      popularSearches: "Abhath shaia:",
    },
    results: {
      heading: "Iqtirahat kalimat miftahiyya li-{keyword}",
      found: "Tamma Al-Uthur ala {count} iqtirah. Istakhdim hadhihi Al-Kalimat li-tahsin istratijiyyat Al-SEO ladayk.",
      tabs: {
        all: "Jami Al-Kalimat",
        low: "Suuba munkhafida",
        medium: "Suuba mutawassita",
        high: "Suuba aliya",
      },
      copy: "Nasakh",
      copied: "Tamma Al-Nasakh!",
      csv: "CSV",
      columns: {
        keyword: "Al-Kalima Al-Miftahiyya",
        volume: "Hajm Al-Bahth",
        difficulty: "Al-Suuba",
        cpc: "CPC",
      },
      tooltips: {
        volume: "Hajm Al-Bahth Al-Shahri bina ala bayanat Google",
        difficulty: "Darajat suubat Al-SEO min 1 ila 100. Kullama irtafaat zadat Al-Munafasa.",
        cpc: "Mutawassit taklifat Al-Naqra bil-dular fi Google Ads",
      },
      empty: "La tujad kalimat tutabiq Al-Murashshih Al-Mukhtar. Jarrib mustawa suuba akhar.",
      csvHeaders: ["Al-Kalima Al-Miftahiyya", "Hajm Al-Bahth", "Al-Suuba", "CPC ($)"],
    },
    howTo: {
      title: "Kayfa tastakhdim hadhihi Al-Adat",
      description: "Ibda ma adatina Al-Majjaniyya li-iqtirah Al-Kalimat Al-Miftahiyya fi thalath khatawat basita",
      steps: [
        { title: "Adkhil kalima miftahiyya asasiyya", body: "Aktub kalima miftahiyya dhat sila bi-amalak aw muhtawak" },
        { title: "Rajii Al-Iqtirahat", body: "Hallil hajm Al-Bahth wal-suuba wa bayanat CPC" },
        { title: "Saddir kalimatik", body: "Hammil bi-sighat CSV aw insakh ila Al-Hafiza li-istratijiyyat Al-SEO ladayk" },
      ],
    },
    features: {
      title: "Limadha tastakhdim adatana li-iqtirah Al-Kalimat Al-Miftahiyya?",
      items: [
        { title: "Iktashif furasan ghayr mustaghalla", body: "Jid kalimat miftahiyya qayyima rubbama fatat munafisik. Tusaiduk adatuna ala tahdid kalimat qalilat Al-Munafasa wa aliyat Al-Hajm." },
        { title: "Hassin istratijiyyat muhtawak", body: "Anshi muhtawa yatasaddar bi-istihdaf Al-Kalimat Al-Sahiha. Ifham niyyat Al-Bahth wal-suuba li-tartib awlawiyyat juhudik." },
        { title: "Hassin hamalatik fil-PPC", body: "Ihsal ala bayanat CPC li-tahsin infaqik Al-Ilani. Jid kalimat miftahiyya ahsan sian bi-hajm bahth jayyid li-tadif Al-Aid." },
      ],
    },
    faq: {
      title: "Al-Asila Al-Shaia",
      items: [
        { question: "Ma mada diqqat bayanat Al-Kalimat Al-Miftahiyya?", answer: "Tati bayanat Al-Kalimat Al-Miftahiyya ladayna min iddat muzawwidin mawthuqin wa tuhaddath bi-intizam. Wa raghma sayina lil-diqqa, qad tataqallab ahjam Al-Bahth wa muashirat Al-Munafasa ma murur Al-Waqt. Nansah bi-istikhdam hadhihi Al-Adat ka-nuqtat bidaya li-bahthik." },
        { question: "Kam kalima miftahiyya yumkinuni Al-Bahth anha?", answer: "Tutih adatuna Al-Majjaniyya abhathan ghayr mahduda ma hatta 10 iqtirahat li-kull bahth. Lil-bahth Al-Akthar shumulan bi-miat Al-Iqtirahat, ittali ala khadamatina Al-Mumayyaza fil-SEO." },
        { question: "Madha tani darajat Al-Suuba?", answer: "Tatarawah darajat Al-Suuba bayn 1 wa 100 wa tushir ila mada sauba Al-Tasaddur li-kalima miftahiyya muayyana. Tashmal Al-Awamil Al-Munafasa wa sultat nutuq Al-Mawaqi Al-Mutasaddira wa jawdat Al-Muhtawa. Al-Darajat Al-Munkhafida (aqall min 45) tumaththil furas tasaddur ashal." },
        { question: "Kayfa astakhdim hadhihi Al-Kalimat fi muhtawaya?", answer: "Li-afdal Al-Natai'j, rakkiz ala insha muhtawa aliy Al-Jawda yudammin kalimatik Al-Mustahdafa bi-shakl tabii. Adrij Al-Kalimat fil-unwan wal-anawin Al-Farriyya wal-wasf Al-Taarifi wa fi jami anha muhtawak hayth yakun dhalika munasiban. Tajannab hashw Al-Kalimat li-annahu qad yadurr bi-tartibik." },
        { question: "Hal tuqaddimun bahth kalimat miftahiyya akthar tataqquman?", answer: "Naam! Yumkin li-khubara Al-SEO ladayna taqdim bahth kalimat miftahiyya muammaq mukhassas li-qitaik wa ahdafik. Nuhallil Al-Munafisin wa nuhaddid fajawat Al-Muhtawa wa nunshi istratijiyyat kalimat miftahiyya shamila. Ittasil bina lil-husul ala ard mukhassas." },
      ],
    },
    cta: {
      title: "Tahtaj adawat SEO akthar tataqquman?",
      body: "Yumkin li-fariqina min khubara Al-SEO musaadatak ala tatwir istratijiyyat kalimat miftahiyya shamila wa tahsin tartibik fil-bahth.",
      button: "Uhsul ala Ard SEO Mukhassas",
    },
  },
});
