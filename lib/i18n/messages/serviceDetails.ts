import { defineMessages } from "../types";

/**
 * Copy for the /services/[slug] detail pages. Each service's title and tags
 * come from `servicesMessages.items` so the overview and the detail page can
 * never disagree; this file holds only what the detail page adds.
 */
export const serviceDetailsMessages = defineMessages({
  en: {
    labels: {
      back: "All services",
      of: "of",
      heroCta: "Start a project",
      deeper: "Go deeper",
      includesKicker: "What's included",
      includesTitle: "Everything it takes,",
      includesAccent: "handled for you.",
      outcomesKicker: "Outcomes",
      outcomesTitle: "What you can",
      outcomesAccent: "expect from it.",
      faqKicker: "FAQ",
      faqTitle: "Common",
      faqAccent: "questions.",
      next: "Next service",
      otherKicker: "Explore more",
      otherTitle: "Services that",
      otherAccent: "work well together.",
      ctaKicker: "Let's talk",
      ctaTitle: "Ready to get",
      ctaAccent: "started?",
      ctaBody: "Tell us where you want to go — we'll come back with a plan to get you there.",
      ctaButton: "Get in touch",
    },
    services: {
      "brand-strategy": {
        tagline: "A brand people recognise, remember and choose.",
        intro:
          "We define what makes you different, who you're for and how you should sound — then turn it into an identity and a message that stay consistent everywhere your brand shows up.",
        includes: [
          { title: "Brand discovery", description: "Workshops, audience research and a competitor review to find the space only you can own." },
          { title: "Positioning & messaging", description: "A clear value proposition, key messages and a tone of voice your whole team can use." },
          { title: "Visual identity", description: "Logo, colour, typography and imagery direction built to work from favicon to billboard." },
          { title: "Brand guidelines", description: "A practical playbook so every designer, writer and partner applies the brand the same way." },
        ],
        outcomes: [
          { title: "Clarity", description: "Everyone — from your team to your customers — can say what you do and why it matters." },
          { title: "Consistency", description: "Every touchpoint looks and sounds like the same brand, which builds trust faster." },
          { title: "Premium perception", description: "A considered brand lets you compete on value rather than on price." },
        ],
        faq: [
          { q: "Do you only work on new brands?", a: "No. We also refresh established brands — keeping the equity you've built while fixing what no longer fits." },
          { q: "What do we receive at the end?", a: "Your strategy, identity files in every format you need, and brand guidelines your team can use straight away." },
        ],
      },
      "web-design-development": {
        tagline: "Websites that look exceptional and convert.",
        intro:
          "From first wireframe to launch, we design and build fast, accessible websites that tell your story clearly and turn visitors into enquiries and sales.",
        includes: [
          { title: "UX & information architecture", description: "Sitemaps, user journeys and wireframes that put the right content in front of the right people." },
          { title: "UI design", description: "Distinctive, on-brand interfaces designed for every screen size." },
          { title: "Development", description: "Modern, performant builds with a CMS your team can update without a developer." },
          { title: "Launch & care", description: "SEO-ready migration, analytics set-up and ongoing support after go-live." },
        ],
        outcomes: [
          { title: "Speed", description: "Fast pages that keep visitors engaged and help your search rankings." },
          { title: "Conversion", description: "Clear journeys and calls to action designed around your business goals." },
          { title: "Control", description: "An easy-to-edit site, so you're never waiting on someone else to change a page." },
        ],
        faq: [
          { q: "Can you redesign our existing website?", a: "Yes. We audit what's working today, keep it, and rebuild the rest — protecting your search rankings through the move." },
          { q: "Will the site work on mobile?", a: "Every site is designed mobile-first and tested across devices and browsers before launch." },
        ],
      },
      "digital-marketing": {
        tagline: "Campaigns built on data, measured on revenue.",
        intro:
          "We plan and run multi-channel campaigns — search, social, display and email — and keep optimising them against the numbers that matter to your business.",
        includes: [
          { title: "Strategy & planning", description: "Audience, channel and budget planning tied to clear targets." },
          { title: "Paid media", description: "Search, social and display campaigns built, launched and managed end to end." },
          { title: "Email & automation", description: "Lifecycle emails and nurture flows that keep leads warm until they're ready to buy." },
          { title: "Analytics & reporting", description: "Tracking set up properly and reports that show exactly where results come from." },
        ],
        outcomes: [
          { title: "More qualified leads", description: "Spend focused on the audiences most likely to become customers." },
          { title: "Better return on spend", description: "Continuous testing moves budget towards what performs." },
          { title: "Full visibility", description: "You'll always know what's running, what it costs and what it's delivering." },
        ],
        faq: [
          { q: "Is there a minimum ad budget?", a: "No fixed minimum. We'll recommend a budget based on your goals and market, and scale it as results come in." },
          { q: "How soon will we see results?", a: "Paid campaigns can produce data within days; we usually spend the first weeks learning and optimising before scaling." },
        ],
      },
      "content-creation": {
        tagline: "Stories worth stopping the scroll for.",
        intro:
          "Our writers, designers and video producers create content that earns attention, explains what you do and gives people a reason to act.",
        includes: [
          { title: "Content strategy", description: "Themes, formats and a calendar grounded in what your audience actually searches for and shares." },
          { title: "Copywriting", description: "Website copy, articles, guides and ad copy written in your brand voice." },
          { title: "Video & motion", description: "Short-form reels, explainers and brand films, from script to final edit." },
          { title: "Design & photography", description: "Graphics, illustrations and photo shoots that make every piece recognisably yours." },
        ],
        outcomes: [
          { title: "Authority", description: "Useful content positions you as the expert in your field." },
          { title: "Organic reach", description: "Content built for search and sharing keeps working long after it's published." },
          { title: "A steady pipeline", description: "A reliable flow of content, so your channels are never left empty." },
        ],
        faq: [
          { q: "Can you match our existing tone of voice?", a: "Yes. We start from your brand guidelines and past content, and refine the voice with you on the first pieces." },
          { q: "Do you handle publishing too?", a: "We can deliver ready-to-post files, or publish and distribute across your channels for you." },
        ],
      },
      "social-media-management": {
        tagline: "A social presence that builds community.",
        intro:
          "We run your social channels day to day — planning, creating, posting and engaging — so your brand shows up consistently where your audience spends its time.",
        includes: [
          { title: "Channel strategy", description: "The right platforms, formats and posting rhythm for your audience." },
          { title: "Content calendar", description: "Planned, designed and scheduled posts, approved by you in advance." },
          { title: "Community management", description: "Replies, comments and messages handled promptly in your brand voice." },
          { title: "Creators & paid social", description: "Influencer partnerships and paid boosts to reach beyond your followers." },
        ],
        outcomes: [
          { title: "Consistency", description: "An active, on-brand presence without taking up your team's time." },
          { title: "Engagement", description: "Content designed for conversation, not just impressions." },
          { title: "Growth", description: "A larger, more relevant audience you can turn into customers." },
        ],
        faq: [
          { q: "Which platforms do you manage?", a: "Instagram, Facebook, LinkedIn, TikTok, X and YouTube — we'll recommend the ones that fit your audience." },
          { q: "Do we get to approve posts?", a: "Always. You'll review each content calendar before anything goes live." },
        ],
      },
      seo: {
        tagline: "Be found by the people already searching for you.",
        intro:
          "We fix the technical foundations, sharpen your content and build authority, so your site ranks for the searches that bring in real business.",
        includes: [
          { title: "SEO audit", description: "A full technical, content and backlink review with a prioritised action plan." },
          { title: "Technical SEO", description: "Site speed, crawlability, structured data and indexing issues fixed at the source." },
          { title: "On-page & content", description: "Keyword research, page optimisation and new content targeting high-intent searches." },
          { title: "Local SEO", description: "Google Business Profile, citations and reviews to win searches in your area." },
        ],
        outcomes: [
          { title: "Higher rankings", description: "Visibility for the terms your customers use when they're ready to buy." },
          { title: "Compounding traffic", description: "Organic traffic that grows over time without paying for every click." },
          { title: "Clear reporting", description: "Rankings, traffic and enquiries tracked so you can see the return." },
        ],
        faq: [
          { q: "How long does SEO take to work?", a: "Technical fixes can help within weeks; meaningful ranking gains typically build over three to six months." },
          { q: "Do you guarantee first place on Google?", a: "No one honestly can. We commit to the work and the transparency, and report on progress every month." },
        ],
      },
    },
  },

  fr: {
    labels: {
      back: "Tous les services",
      of: "sur",
      heroCta: "Démarrer un projet",
      deeper: "En savoir plus",
      includesKicker: "Ce qui est inclus",
      includesTitle: "Tout le nécessaire,",
      includesAccent: "pris en charge pour vous.",
      outcomesKicker: "Résultats",
      outcomesTitle: "Ce que vous pouvez",
      outcomesAccent: "en attendre.",
      faqKicker: "FAQ",
      faqTitle: "Questions",
      faqAccent: "fréquentes.",
      next: "Service suivant",
      otherKicker: "Explorer",
      otherTitle: "Des services qui",
      otherAccent: "fonctionnent ensemble.",
      ctaKicker: "Parlons-en",
      ctaTitle: "Prêt à",
      ctaAccent: "vous lancer ?",
      ctaBody: "Dites-nous où vous voulez aller — nous revenons avec un plan pour y arriver.",
      ctaButton: "Nous contacter",
    },
    services: {
      "brand-strategy": {
        tagline: "Une marque que l'on reconnaît, retient et choisit.",
        intro:
          "Nous définissons ce qui vous distingue, à qui vous vous adressez et comment vous devez parler — puis nous en faisons une identité et un message cohérents partout où votre marque apparaît.",
        includes: [
          { title: "Découverte de la marque", description: "Ateliers, étude d'audience et analyse concurrentielle pour trouver l'espace que vous seul pouvez occuper." },
          { title: "Positionnement & messages", description: "Une proposition de valeur claire, des messages clés et un ton que toute votre équipe peut utiliser." },
          { title: "Identité visuelle", description: "Logo, couleurs, typographie et direction photo pensés pour fonctionner du favicon à l'affiche." },
          { title: "Charte de marque", description: "Un guide pratique pour que chaque designer, rédacteur et partenaire applique la marque de la même façon." },
        ],
        outcomes: [
          { title: "Clarté", description: "Tout le monde — votre équipe comme vos clients — sait dire ce que vous faites et pourquoi c'est important." },
          { title: "Cohérence", description: "Chaque point de contact ressemble à la même marque, ce qui crée la confiance plus vite." },
          { title: "Perception premium", description: "Une marque réfléchie vous permet de vous battre sur la valeur plutôt que sur le prix." },
        ],
        faq: [
          { q: "Travaillez-vous uniquement sur de nouvelles marques ?", a: "Non. Nous faisons aussi évoluer des marques établies — en préservant leur capital tout en corrigeant ce qui ne fonctionne plus." },
          { q: "Que recevons-nous à la fin ?", a: "Votre stratégie, les fichiers d'identité dans tous les formats nécessaires et une charte immédiatement utilisable par votre équipe." },
        ],
      },
      "web-design-development": {
        tagline: "Des sites remarquables qui convertissent.",
        intro:
          "Du premier wireframe à la mise en ligne, nous concevons et développons des sites rapides et accessibles qui racontent clairement votre histoire et transforment les visiteurs en demandes et en ventes.",
        includes: [
          { title: "UX & architecture de l'information", description: "Arborescence, parcours utilisateurs et wireframes qui présentent le bon contenu aux bonnes personnes." },
          { title: "Design d'interface", description: "Des interfaces distinctives et fidèles à votre marque, pensées pour tous les écrans." },
          { title: "Développement", description: "Des sites modernes et performants, avec un CMS que votre équipe met à jour sans développeur." },
          { title: "Lancement & suivi", description: "Migration optimisée SEO, mise en place de l'analytics et accompagnement après la mise en ligne." },
        ],
        outcomes: [
          { title: "Rapidité", description: "Des pages rapides qui retiennent les visiteurs et soutiennent votre référencement." },
          { title: "Conversion", description: "Des parcours et appels à l'action clairs, pensés autour de vos objectifs." },
          { title: "Autonomie", description: "Un site facile à modifier : vous n'attendez plus personne pour changer une page." },
        ],
        faq: [
          { q: "Pouvez-vous refondre notre site actuel ?", a: "Oui. Nous analysons ce qui fonctionne, le conservons et reconstruisons le reste — en protégeant votre référencement pendant la migration." },
          { q: "Le site fonctionnera-t-il sur mobile ?", a: "Chaque site est conçu mobile-first et testé sur différents appareils et navigateurs avant le lancement." },
        ],
      },
      "digital-marketing": {
        tagline: "Des campagnes fondées sur la donnée, mesurées au chiffre d'affaires.",
        intro:
          "Nous planifions et pilotons des campagnes multicanales — search, social, display et e-mail — et les optimisons en continu sur les indicateurs qui comptent pour votre entreprise.",
        includes: [
          { title: "Stratégie & planification", description: "Audiences, canaux et budgets planifiés autour d'objectifs clairs." },
          { title: "Médias payants", description: "Campagnes search, social et display conçues, lancées et gérées de bout en bout." },
          { title: "E-mail & automatisation", description: "E-mails de cycle de vie et scénarios de nurturing qui entretiennent l'intérêt jusqu'à l'achat." },
          { title: "Analytics & reporting", description: "Un tracking bien configuré et des rapports qui montrent précisément d'où viennent les résultats." },
        ],
        outcomes: [
          { title: "Des leads plus qualifiés", description: "Un budget concentré sur les audiences les plus susceptibles de devenir clientes." },
          { title: "Un meilleur retour sur investissement", description: "Des tests continus réorientent le budget vers ce qui performe." },
          { title: "Une visibilité totale", description: "Vous savez toujours ce qui tourne, ce que cela coûte et ce que cela rapporte." },
        ],
        faq: [
          { q: "Y a-t-il un budget publicitaire minimum ?", a: "Pas de minimum fixe. Nous recommandons un budget selon vos objectifs et votre marché, puis l'ajustons selon les résultats." },
          { q: "Quand verrons-nous des résultats ?", a: "Les campagnes payantes produisent des données en quelques jours ; nous consacrons généralement les premières semaines à apprendre et optimiser avant d'accélérer." },
        ],
      },
      "content-creation": {
        tagline: "Des histoires qui arrêtent le défilement.",
        intro:
          "Nos rédacteurs, designers et vidéastes créent des contenus qui captent l'attention, expliquent ce que vous faites et donnent envie d'agir.",
        includes: [
          { title: "Stratégie de contenu", description: "Thèmes, formats et calendrier fondés sur ce que votre audience recherche et partage réellement." },
          { title: "Rédaction", description: "Textes de site, articles, guides et annonces écrits dans la voix de votre marque." },
          { title: "Vidéo & motion", description: "Reels, vidéos explicatives et films de marque, du script au montage final." },
          { title: "Design & photographie", description: "Visuels, illustrations et shootings qui rendent chaque contenu reconnaissable." },
        ],
        outcomes: [
          { title: "Autorité", description: "Des contenus utiles vous positionnent comme l'expert de votre domaine." },
          { title: "Portée organique", description: "Des contenus pensés pour la recherche et le partage continuent de travailler longtemps après publication." },
          { title: "Un flux régulier", description: "Une production fiable pour que vos canaux ne restent jamais vides." },
        ],
        faq: [
          { q: "Pouvez-vous reprendre notre ton actuel ?", a: "Oui. Nous partons de votre charte et de vos contenus existants, puis affinons la voix avec vous sur les premières pièces." },
          { q: "Gérez-vous aussi la publication ?", a: "Nous pouvons livrer des fichiers prêts à publier, ou publier et diffuser pour vous sur vos canaux." },
        ],
      },
      "social-media-management": {
        tagline: "Une présence sociale qui fédère une communauté.",
        intro:
          "Nous gérons vos réseaux au quotidien — planification, création, publication et échanges — pour que votre marque soit présente là où votre audience passe son temps.",
        includes: [
          { title: "Stratégie par canal", description: "Les bonnes plateformes, les bons formats et le bon rythme pour votre audience." },
          { title: "Calendrier éditorial", description: "Des publications planifiées, conçues et programmées, validées par vous à l'avance." },
          { title: "Gestion de communauté", description: "Réponses, commentaires et messages traités rapidement, dans la voix de votre marque." },
          { title: "Créateurs & social payant", description: "Partenariats d'influence et sponsorisation pour toucher au-delà de vos abonnés." },
        ],
        outcomes: [
          { title: "Régularité", description: "Une présence active et fidèle à la marque, sans mobiliser votre équipe." },
          { title: "Engagement", description: "Des contenus conçus pour la conversation, pas seulement pour les impressions." },
          { title: "Croissance", description: "Une audience plus large et plus pertinente, à convertir en clients." },
        ],
        faq: [
          { q: "Quelles plateformes gérez-vous ?", a: "Instagram, Facebook, LinkedIn, TikTok, X et YouTube — nous recommandons celles qui correspondent à votre audience." },
          { q: "Validons-nous les publications ?", a: "Toujours. Vous relisez chaque calendrier avant toute mise en ligne." },
        ],
      },
      seo: {
        tagline: "Soyez trouvé par ceux qui vous cherchent déjà.",
        intro:
          "Nous corrigeons les fondations techniques, affûtons vos contenus et renforçons votre autorité pour que votre site se positionne sur les recherches qui génèrent du business.",
        includes: [
          { title: "Audit SEO", description: "Une analyse technique, éditoriale et de netlinking complète, avec un plan d'action priorisé." },
          { title: "SEO technique", description: "Vitesse, exploration, données structurées et indexation corrigées à la source." },
          { title: "On-page & contenu", description: "Recherche de mots-clés, optimisation des pages et nouveaux contenus ciblant les requêtes à forte intention." },
          { title: "SEO local", description: "Fiche Google Business Profile, citations et avis pour gagner les recherches de votre zone." },
        ],
        outcomes: [
          { title: "De meilleures positions", description: "De la visibilité sur les termes que vos clients utilisent au moment d'acheter." },
          { title: "Un trafic qui s'additionne", description: "Un trafic organique qui croît sans payer chaque clic." },
          { title: "Un reporting clair", description: "Positions, trafic et demandes suivis pour mesurer le retour." },
        ],
        faq: [
          { q: "Combien de temps faut-il pour que le SEO fonctionne ?", a: "Les corrections techniques peuvent aider en quelques semaines ; les gains significatifs se construisent généralement sur trois à six mois." },
          { q: "Garantissez-vous la première place sur Google ?", a: "Personne ne peut honnêtement le garantir. Nous nous engageons sur le travail et la transparence, avec un point chaque mois." },
        ],
      },
    },
  },

  de: {
    labels: {
      back: "Alle Leistungen",
      of: "von",
      heroCta: "Projekt starten",
      deeper: "Mehr erfahren",
      includesKicker: "Das ist enthalten",
      includesTitle: "Alles, was dazugehört,",
      includesAccent: "für Sie erledigt.",
      outcomesKicker: "Ergebnisse",
      outcomesTitle: "Was Sie",
      outcomesAccent: "erwarten können.",
      faqKicker: "FAQ",
      faqTitle: "Häufige",
      faqAccent: "Fragen.",
      next: "Nächste Leistung",
      otherKicker: "Mehr entdecken",
      otherTitle: "Leistungen, die",
      otherAccent: "gut zusammenspielen.",
      ctaKicker: "Lassen Sie uns reden",
      ctaTitle: "Bereit",
      ctaAccent: "loszulegen?",
      ctaBody: "Sagen Sie uns, wohin Sie wollen — wir melden uns mit einem Plan, wie Sie dorthin kommen.",
      ctaButton: "Kontakt aufnehmen",
    },
    services: {
      "brand-strategy": {
        tagline: "Eine Marke, die man erkennt, sich merkt und wählt.",
        intro:
          "Wir definieren, was Sie besonders macht, für wen Sie da sind und wie Sie klingen sollten — und machen daraus eine Identität und Botschaft, die überall einheitlich auftritt.",
        includes: [
          { title: "Markenanalyse", description: "Workshops, Zielgruppenforschung und Wettbewerbsanalyse, um den Platz zu finden, den nur Sie besetzen können." },
          { title: "Positionierung & Botschaften", description: "Ein klares Werteversprechen, Kernbotschaften und eine Tonalität, die Ihr ganzes Team nutzen kann." },
          { title: "Visuelle Identität", description: "Logo, Farben, Typografie und Bildsprache, die vom Favicon bis zur Plakatwand funktionieren." },
          { title: "Markenrichtlinien", description: "Ein praktisches Handbuch, damit alle Designer, Texter und Partner die Marke gleich anwenden." },
        ],
        outcomes: [
          { title: "Klarheit", description: "Alle — vom Team bis zu den Kunden — können sagen, was Sie tun und warum es wichtig ist." },
          { title: "Konsistenz", description: "Jeder Kontaktpunkt wirkt wie dieselbe Marke — das schafft schneller Vertrauen." },
          { title: "Premium-Wahrnehmung", description: "Eine durchdachte Marke lässt Sie über Wert statt über Preis konkurrieren." },
        ],
        faq: [
          { q: "Arbeiten Sie nur an neuen Marken?", a: "Nein. Wir entwickeln auch etablierte Marken weiter — und bewahren dabei, was Sie bereits aufgebaut haben." },
          { q: "Was erhalten wir am Ende?", a: "Ihre Strategie, Identitätsdateien in allen benötigten Formaten und Markenrichtlinien, die Ihr Team sofort nutzen kann." },
        ],
      },
      "web-design-development": {
        tagline: "Websites, die herausragend aussehen und konvertieren.",
        intro:
          "Vom ersten Wireframe bis zum Launch gestalten und entwickeln wir schnelle, barrierearme Websites, die Ihre Geschichte klar erzählen und Besucher zu Anfragen und Käufen führen.",
        includes: [
          { title: "UX & Informationsarchitektur", description: "Sitemaps, Nutzerpfade und Wireframes, die den richtigen Inhalt den richtigen Menschen zeigen." },
          { title: "UI-Design", description: "Unverwechselbare, markengerechte Oberflächen für jede Bildschirmgröße." },
          { title: "Entwicklung", description: "Moderne, performante Umsetzung mit einem CMS, das Ihr Team ohne Entwickler pflegen kann." },
          { title: "Launch & Betreuung", description: "SEO-sichere Migration, Analytics-Einrichtung und Support nach dem Go-live." },
        ],
        outcomes: [
          { title: "Geschwindigkeit", description: "Schnelle Seiten, die Besucher halten und Ihre Rankings stützen." },
          { title: "Conversion", description: "Klare Wege und Handlungsaufforderungen, ausgerichtet auf Ihre Geschäftsziele." },
          { title: "Kontrolle", description: "Eine leicht bearbeitbare Website — Sie warten nie auf andere, um eine Seite zu ändern." },
        ],
        faq: [
          { q: "Können Sie unsere bestehende Website neu gestalten?", a: "Ja. Wir prüfen, was heute funktioniert, behalten es und bauen den Rest neu — und schützen dabei Ihre Rankings." },
          { q: "Funktioniert die Website auf Mobilgeräten?", a: "Jede Website wird mobile-first gestaltet und vor dem Launch auf verschiedenen Geräten und Browsern getestet." },
        ],
      },
      "digital-marketing": {
        tagline: "Kampagnen auf Datenbasis, gemessen am Umsatz.",
        intro:
          "Wir planen und steuern Multichannel-Kampagnen — Suche, Social, Display und E-Mail — und optimieren sie laufend auf die Kennzahlen, die für Ihr Geschäft zählen.",
        includes: [
          { title: "Strategie & Planung", description: "Zielgruppen, Kanäle und Budgets, geplant entlang klarer Ziele." },
          { title: "Paid Media", description: "Such-, Social- und Display-Kampagnen, komplett aufgesetzt, gestartet und betreut." },
          { title: "E-Mail & Automatisierung", description: "Lifecycle-Mails und Nurturing-Strecken, die Leads bis zur Kaufbereitschaft begleiten." },
          { title: "Analytics & Reporting", description: "Sauberes Tracking und Berichte, die genau zeigen, woher Ergebnisse kommen." },
        ],
        outcomes: [
          { title: "Qualifiziertere Leads", description: "Budget fokussiert auf die Zielgruppen mit der höchsten Kaufwahrscheinlichkeit." },
          { title: "Besserer Return", description: "Laufende Tests verschieben Budget zu dem, was funktioniert." },
          { title: "Volle Transparenz", description: "Sie wissen immer, was läuft, was es kostet und was es bringt." },
        ],
        faq: [
          { q: "Gibt es ein Mindestbudget für Anzeigen?", a: "Kein festes Minimum. Wir empfehlen ein Budget passend zu Ihren Zielen und Ihrem Markt und skalieren mit den Ergebnissen." },
          { q: "Wann sehen wir Ergebnisse?", a: "Bezahlte Kampagnen liefern innerhalb von Tagen Daten; die ersten Wochen nutzen wir meist zum Lernen und Optimieren, bevor wir skalieren." },
        ],
      },
      "content-creation": {
        tagline: "Geschichten, bei denen man innehält.",
        intro:
          "Unsere Texter, Designer und Videoproduzenten schaffen Inhalte, die Aufmerksamkeit gewinnen, erklären, was Sie tun, und einen Grund zum Handeln geben.",
        includes: [
          { title: "Content-Strategie", description: "Themen, Formate und Redaktionsplan auf Basis dessen, was Ihre Zielgruppe wirklich sucht und teilt." },
          { title: "Texte", description: "Website-Texte, Artikel, Ratgeber und Anzeigentexte in Ihrer Markenstimme." },
          { title: "Video & Motion", description: "Reels, Erklärvideos und Markenfilme — vom Skript bis zum finalen Schnitt." },
          { title: "Design & Fotografie", description: "Grafiken, Illustrationen und Shootings, die jedes Stück unverkennbar machen." },
        ],
        outcomes: [
          { title: "Autorität", description: "Nützliche Inhalte positionieren Sie als Experten Ihres Fachs." },
          { title: "Organische Reichweite", description: "Für Suche und Teilen gebaute Inhalte wirken lange nach der Veröffentlichung weiter." },
          { title: "Stetiger Output", description: "Ein verlässlicher Content-Fluss, damit Ihre Kanäle nie leer bleiben." },
        ],
        faq: [
          { q: "Können Sie unsere bestehende Tonalität treffen?", a: "Ja. Wir starten mit Ihren Richtlinien und bisherigen Inhalten und schärfen die Stimme mit Ihnen an den ersten Stücken." },
          { q: "Übernehmen Sie auch die Veröffentlichung?", a: "Wir liefern fertige Dateien oder veröffentlichen und verteilen die Inhalte für Sie auf Ihren Kanälen." },
        ],
      },
      "social-media-management": {
        tagline: "Eine Social-Präsenz, die Community aufbaut.",
        intro:
          "Wir betreuen Ihre Kanäle im Alltag — planen, erstellen, posten und interagieren — damit Ihre Marke dort präsent ist, wo Ihre Zielgruppe ihre Zeit verbringt.",
        includes: [
          { title: "Kanalstrategie", description: "Die richtigen Plattformen, Formate und Posting-Frequenzen für Ihre Zielgruppe." },
          { title: "Redaktionsplan", description: "Geplante, gestaltete und terminierte Posts, vorab von Ihnen freigegeben." },
          { title: "Community-Management", description: "Antworten, Kommentare und Nachrichten zügig und in Ihrer Markenstimme." },
          { title: "Creator & Paid Social", description: "Influencer-Kooperationen und bezahlte Reichweite über Ihre Follower hinaus." },
        ],
        outcomes: [
          { title: "Beständigkeit", description: "Eine aktive, markengerechte Präsenz, ohne Ihr Team zu binden." },
          { title: "Interaktion", description: "Inhalte für Gespräche, nicht nur für Impressionen." },
          { title: "Wachstum", description: "Eine größere, relevantere Zielgruppe, die zu Kunden werden kann." },
        ],
        faq: [
          { q: "Welche Plattformen betreuen Sie?", a: "Instagram, Facebook, LinkedIn, TikTok, X und YouTube — wir empfehlen die, die zu Ihrer Zielgruppe passen." },
          { q: "Geben wir die Beiträge frei?", a: "Immer. Sie prüfen jeden Redaktionsplan, bevor etwas live geht." },
        ],
      },
      seo: {
        tagline: "Gefunden werden von denen, die Sie schon suchen.",
        intro:
          "Wir beheben technische Grundlagen, schärfen Ihre Inhalte und bauen Autorität auf, damit Ihre Website für Suchen rankt, die echtes Geschäft bringen.",
        includes: [
          { title: "SEO-Audit", description: "Eine vollständige Technik-, Content- und Backlink-Analyse mit priorisiertem Maßnahmenplan." },
          { title: "Technisches SEO", description: "Ladezeit, Crawlbarkeit, strukturierte Daten und Indexierung an der Wurzel behoben." },
          { title: "On-Page & Content", description: "Keyword-Recherche, Seitenoptimierung und neue Inhalte für kaufnahe Suchanfragen." },
          { title: "Lokales SEO", description: "Google-Unternehmensprofil, Einträge und Bewertungen, um Suchen in Ihrer Region zu gewinnen." },
        ],
        outcomes: [
          { title: "Bessere Rankings", description: "Sichtbarkeit für die Begriffe, die Kunden kurz vor dem Kauf nutzen." },
          { title: "Wachsender Traffic", description: "Organischer Traffic, der mit der Zeit wächst — ohne für jeden Klick zu zahlen." },
          { title: "Klares Reporting", description: "Rankings, Traffic und Anfragen im Blick, damit Sie den Ertrag sehen." },
        ],
        faq: [
          { q: "Wie lange dauert es, bis SEO wirkt?", a: "Technische Korrekturen helfen oft innerhalb von Wochen; deutliche Ranking-Gewinne entstehen meist über drei bis sechs Monate." },
          { q: "Garantieren Sie Platz eins bei Google?", a: "Das kann niemand ehrlich garantieren. Wir stehen für die Arbeit und für Transparenz und berichten jeden Monat über den Fortschritt." },
        ],
      },
    },
  },

  ar: {
    labels: {
      back: "Kull Al-Khadamat",
      of: "min",
      heroCta: "Ibda mashruak",
      deeper: "Iktashif Al-Mazid",
      includesKicker: "Ma Yashmaluh",
      includesTitle: "Kull ma yalzam,",
      includesAccent: "natawallah anka.",
      outcomesKicker: "Al-Nataij",
      outcomesTitle: "Ma yumkinuk",
      outcomesAccent: "an tatawaqqaah.",
      faqKicker: "Al-Asila Al-Shaia",
      faqTitle: "Asila",
      faqAccent: "mutakarrira.",
      next: "Al-Khidma Al-Taliya",
      otherKicker: "Istakshif Al-Mazid",
      otherTitle: "Khadamat",
      otherAccent: "takmul baduha badan.",
      ctaKicker: "Falnatahaddath",
      ctaTitle: "Mustaidd",
      ctaAccent: "lil-bad?",
      ctaBody: "Akhbirna ila ayna turid Al-Wusul — wa sanaud ilayk bi-khitta tusilak ilayh.",
      ctaButton: "Tawasal Maana",
    },
    services: {
      "brand-strategy": {
        tagline: "Alama yaarifuha Al-Nas wa yatadhakkarunaha wa yakhtarunaha.",
        intro:
          "Nuhaddid ma yumayyizuk wa li-man tatawajjah wa kayfa yajib an yakun sawtuk — thumma nuhawwiluh ila hawiyya wa risala mutanasiqa fi kull makan tazhar fih alamatuk.",
        includes: [
          { title: "Iktishaf Al-Alama", description: "Warash amal wa bahth fil-jumhur wa muraja lil-munafisin li-ijad Al-Masaha Allati tamlikuha wahdak." },
          { title: "Al-Tamawdu wal-rasail", description: "Qima muqtaraha wadiha wa rasail asasiyya wa nabra yastakhdimuha fariquk kulluh." },
          { title: "Al-Hawiyya Al-Basariyya", description: "Shiar wa alwan wa khutut wa ittijah basari yanjah min Al-Ayquna ila Al-Lawha Al-Iilaniyya." },
          { title: "Dalil Al-Alama", description: "Dalil amali li-yatbiq kull musammim wa katib wa sharik Al-Alama bil-tariqa nafsiha." },
        ],
        outcomes: [
          { title: "Al-Wuduh", description: "Al-Jami — min fariquk ila umalaik — yastatiun qawl ma tafaluh wa limadha yuhimm." },
          { title: "Al-Tanasuq", description: "Kull nuqtat tawasul tabdu ka-alama wahida, ma yabni Al-Thiqa asra." },
          { title: "Intiba mumayyaz", description: "Alama madrusa tasmah lak bil-munafasa bil-qima la bil-sir." },
        ],
        faq: [
          { q: "Hal tamalun ala Al-Alamat Al-Jadida faqat?", a: "La. Nujaddid aydan Al-Alamat Al-Qaima — maa Al-Hifaz ala ma banaytah wa islah ma lam yaud munasiban." },
          { q: "Madha nastalim fil-nihaya?", a: "Istratijiyyatak, wa milaffat Al-Hawiyya bi-kull Al-Siyagh Al-Lazima, wa dalil alama yumkin li-fariqik istikhdamuh fawran." },
        ],
      },
      "web-design-development": {
        tagline: "Mawaqi tabdu mumayyaza wa tuhaqqiq Al-Tahwil.",
        intro:
          "Min awwal mukhattat hatta Al-Itlaq, nusammim wa nabni mawaqi sariaa wa sahlat Al-Wusul tarwi qissatak bi-wuduh wa tuhawwil Al-Zuwwar ila talabat wa mabiat.",
        includes: [
          { title: "Tajribat Al-Mustakhdim wa haykalat Al-Muhtawa", description: "Kharait Al-Mawqi wa rihlat Al-Mustakhdim wal-mukhattatat li-wad Al-Muhtawa Al-Sahih amam Al-Nas Al-Munasibin." },
          { title: "Tasmim Al-Wajiha", description: "Wajihat mumayyaza mutawafiqa maa alamatik li-kull ahjam Al-Shashat." },
          { title: "Al-Tatwir", description: "Bina hadith wa sari maa nizam idarat muhtawa yumkin li-fariqik tahdithuh bidun mutawwir." },
          { title: "Al-Itlaq wal-riaya", description: "Naql adil li-muharrikat Al-Bahth wa ihdad Al-Tahlilat wa dam mustamirr bad Al-Itlaq." },
        ],
        outcomes: [
          { title: "Al-Sura", description: "Safahat sariaa tabqi Al-Zuwwar wa tadam tartibak fil-bahth." },
          { title: "Al-Tahwil", description: "Rihlat wa daawat wadiha lil-amal musammama hawl ahdafik." },
          { title: "Al-Saytara", description: "Mawqi sahl Al-Tadil, fa-la tantazir ahadan li-taghyir safha." },
        ],
        faq: [
          { q: "Hal yumkinukum iadat tasmim mawqiina Al-Hali?", a: "Naam. Nurajiu ma yanjah Al-Yawm wa nuhafiz alayh wa nuid bina Al-Baqi — maa himayat tartibak athna Al-Naql." },
          { q: "Hal sayamal Al-Mawqi ala Al-Hatif?", a: "Kull mawqi yusamam lil-hatif awwalan wa yukhtabar ala ajhiza wa mutasaffihat mukhtalifa qabl Al-Itlaq." },
        ],
      },
      "digital-marketing": {
        tagline: "Hamalat mabniyya ala Al-Bayanat wa tuqas bil-iradat.",
        intro:
          "Nukhattit wa nudir hamalat mutaaddidat Al-Qanawat — Al-Bahth wa Al-Tawasul wal-ilanat Al-Mariyya wal-barid — wa nuhassinuha bistimrar wifq Al-Arqam Allati tuhimm amalak.",
        includes: [
          { title: "Al-Istratijiyya wal-takhtit", description: "Takhtit Al-Jumhur wal-qanawat wal-mizaniyya murtabit bi-ahdaf wadiha." },
          { title: "Al-Ilan Al-Madfu", description: "Hamalat bahth wa tawasul wa ilanat mariyya tubna wa tutlaq wa tudar kamilan." },
          { title: "Al-Barid wal-atmata", description: "Rasail dawrat Al-Hayat wa masarat riaya tubqi Al-Umala Al-Muhtamalin mutahammisin hatta Al-Shira." },
          { title: "Al-Tahlilat wal-taqarir", description: "Tatabbu mudabbat bi-shakl sahih wa taqarir tubayyin bi-diqqa masdar Al-Nataij." },
        ],
        outcomes: [
          { title: "Umala muhtamalun ahl", description: "Infaq murakkaz ala Al-Jumhur Al-Aktar ihtimalan li-an yusbih umala." },
          { title: "Aid afdal ala Al-Infaq", description: "Al-Ikhtibar Al-Mustamirr yunaqil Al-Mizaniyya nahw ma yanjah." },
          { title: "Ruya kamila", description: "Satarif daiman ma yamal wa kam yukallif wa madha yuhaqqiq." },
        ],
        faq: [
          { q: "Hal hunak hadd adna lil-mizaniyya Al-Ilaniyya?", a: "La yujad hadd thabit. Nuqtarih mizaniyya bina ala ahdafik wa suqik wa nuwassiuha maa zuhur Al-Nataij." },
          { q: "Mata sanara Al-Nataij?", a: "Tunti Al-Hamalat Al-Madfua bayanat khilal ayyam; wa adatan nukhassis Al-Asabi Al-Ula lil-taallum wal-tahsin qabl Al-Tawassu." },
        ],
      },
      "content-creation": {
        tagline: "Qisas tastahiqq an yatawaqqaf Al-Tamrir min ajliha.",
        intro:
          "Yasna kuttabuna wa musammimuna wa muntiju Al-Fidyu ladayna muhtawa yakhtaf Al-Intibah wa yashrah ma tafaluh wa yamnah Al-Nas sababan lil-tasarruf.",
        includes: [
          { title: "Istratijiyyat Al-Muhtawa", description: "Mawadi wa ashkal wa jadwal mabni ala ma yabhath anh jumhurak wa yusharikuh fian." },
          { title: "Al-Kitaba", description: "Nusus Al-Mawqi wal-maqalat wal-adilla wa nusus Al-Ilanat bi-sawt alamatik." },
          { title: "Al-Fidyu wal-haraka", description: "Maqati qasira wa fidyuhat tawdihiyya wa aflam lil-alama, min Al-Nass ila Al-Muntaj Al-Nihai." },
          { title: "Al-Tasmim wal-taswir", description: "Rusumat wa rusum tawdihiyya wa jalsat taswir tajal kull amal mumayyazan bik." },
        ],
        outcomes: [
          { title: "Al-Sulta Al-Marifiyya", description: "Al-Muhtawa Al-Mufid yadauk ka-khabir fi majalik." },
          { title: "Wusul tabii", description: "Muhtawa mabni lil-bahth wal-musharaka yastamirr fil-amal tawilan bad nashrih." },
          { title: "Tadaffuq thabit", description: "Intaj mawthuq kay la tabqa qanawatuk farigha abadan." },
        ],
        faq: [
          { q: "Hal yumkinukum mutabaqat nabratina Al-Haliyya?", a: "Naam. Nabda min dalil alamatik wa muhtawak Al-Sabiq, thumma nusaqqil Al-Sawt maak fil-qitaat Al-Ula." },
          { q: "Hal tatawallawn Al-Nashr aydan?", a: "Yumkinuna taslim milaffat jahiza lil-nashr, aw Al-Nashr wal-tawzi nayabatan ank ala qanawatik." },
        ],
      },
      "social-media-management": {
        tagline: "Hudur ijtimai yabni mujtamaan.",
        intro:
          "Nudir qanawatak Al-Ijtimaiyya yawmiyyan — takhtitan wa intajan wa nashran wa tafulan — kay tazhar alamatuk bi-intizam haythu yaqdi jumhurak waqtah.",
        includes: [
          { title: "Istratijiyyat Al-Qanawat", description: "Al-Manassat wal-ashkal wa iqa Al-Nashr Al-Munasib li-jumhurik." },
          { title: "Jadwal Al-Muhtawa", description: "Manshurat mukhattata wa musammama wa mujadwala, tuwafiq alayha muqaddaman." },
          { title: "Idarat Al-Mujtama", description: "Al-Rudud wal-taliqat wal-rasail tuala bi-sura wa bi-sawt alamatik." },
          { title: "Al-Mubdiun wal-tarwij Al-Madfu", description: "Shirakat maa Al-Muaththirin wa tarwij madfu lil-wusul ila ma bad mutabiik." },
        ],
        outcomes: [
          { title: "Al-Intizam", description: "Hudur nashit mutawafiq maa Al-Alama dun istihlak waqt fariqik." },
          { title: "Al-Tafaul", description: "Muhtawa musamam lil-hiwar, la lil-mushahadat faqat." },
          { title: "Al-Numuw", description: "Jumhur akbar wa aktar sila yumkin tahwiluh ila umala." },
        ],
        faq: [
          { q: "Ayy Al-Manassat tudirunaha?", a: "Instagram wa Facebook wa LinkedIn wa TikTok wa X wa YouTube — wa nuqtarih ma yunasib jumhurak." },
          { q: "Hal nuwafiq ala Al-Manshurat?", a: "Daiman. Turajiu kull jadwal muhtawa qabl nashr ayy shay." },
        ],
      },
      seo: {
        tagline: "Kun marisan li-man yabhathun anka bil-fil.",
        intro:
          "Nuslih Al-Usus Al-Tiqniyya wa nusaqqil muhtawak wa nabni sultatak, li-yatasaddar mawqiuk Al-Bahth Allati tajlib amalan haqiqiyyan.",
        includes: [
          { title: "Tadqiq SEO", description: "Muraja tiqniyya wa muhtawiyya wa lil-rawabit Al-Khalfiyya kamila maa khitta amal murattaba bil-awlawiyya." },
          { title: "SEO tiqni", description: "Sura Al-Mawqi wa qabiliyyat Al-Zahf wal-bayanat Al-Munazzama wa mashakil Al-Fahrasa tuslah min Al-Jidhr." },
          { title: "Dakhil Al-Safha wal-muhtawa", description: "Bahth Al-Kalimat Al-Miftahiyya wa tahsin Al-Safahat wa muhtawa jadid yastahdif Al-Bahth dha Al-Niyya Al-Aliya." },
          { title: "SEO mahalli", description: "Milaff Google Business wa Al-Iqtibasat wal-taqyimat lil-fawz bi-bahth mintaqatik." },
        ],
        outcomes: [
          { title: "Tartib aala", description: "Zuhur lil-kalimat Allati yastakhdimuha umalauk inda Al-Istidad lil-shira." },
          { title: "Ziyarat mutarakima", description: "Ziyarat tabiiyya tanmu maa Al-Waqt dun Al-Dafa li-kull naqra." },
          { title: "Taqarir wadiha", description: "Tatabbu Al-Tartib wal-ziyarat wal-istifsarat li-tara Al-Aid." },
        ],
        faq: [
          { q: "Kam yastaghriq SEO li-yuti thimarah?", a: "Qad tusaid Al-Islahat Al-Tiqniyya khilal asabi; amma Al-Makasib Al-Kabira fil-tartib fa-tatarakam adatan khilal thalatha ila sitta ashhur." },
          { q: "Hal tadmanun Al-Martaba Al-Ula fi Google?", a: "La ahad yastati dhalik bi-sidq. Naltazim bil-amal wal-shafafiyya wa nuqaddim taqriran an Al-Taqaddum kull shahr." },
        ],
      },
    },
  },

  bn: {
    labels: {
      back: "সব সেবা",
      of: "এর মধ্যে",
      heroCta: "প্রকল্প শুরু করুন",
      deeper: "আরও জানুন",
      includesKicker: "যা যা থাকছে",
      includesTitle: "যা কিছু লাগে,",
      includesAccent: "সবই আমরা সামলাই।",
      outcomesKicker: "ফলাফল",
      outcomesTitle: "আপনি যা",
      outcomesAccent: "আশা করতে পারেন।",
      faqKicker: "প্রশ্নোত্তর",
      faqTitle: "সাধারণ",
      faqAccent: "প্রশ্নসমূহ।",
      next: "পরের সেবা",
      otherKicker: "আরও দেখুন",
      otherTitle: "যে সেবাগুলো",
      otherAccent: "একসাথে ভালো কাজ করে।",
      ctaKicker: "চলুন কথা বলি",
      ctaTitle: "শুরু করতে",
      ctaAccent: "প্রস্তুত?",
      ctaBody: "আপনি কোথায় পৌঁছাতে চান বলুন — সেখানে পৌঁছানোর পরিকল্পনা নিয়ে আমরা ফিরে আসব।",
      ctaButton: "যোগাযোগ করুন",
    },
    services: {
      "brand-strategy": {
        tagline: "এমন ব্র্যান্ড, যা মানুষ চেনে, মনে রাখে আর বেছে নেয়।",
        intro:
          "আপনাকে কী আলাদা করে, আপনি কার জন্য আর আপনার কণ্ঠ কেমন হওয়া উচিত — আমরা তা ঠিক করি, তারপর সেটিকে এমন আইডেন্টিটি ও বার্তায় রূপ দিই যা সব জায়গায় একই রকম থাকে।",
        includes: [
          { title: "ব্র্যান্ড অনুসন্ধান", description: "ওয়ার্কশপ, দর্শক গবেষণা আর প্রতিযোগী বিশ্লেষণ — যাতে এমন জায়গা খুঁজে পাওয়া যায় যা শুধু আপনার।" },
          { title: "পজিশনিং ও মেসেজিং", description: "পরিষ্কার ভ্যালু প্রপোজিশন, মূল বার্তা আর এমন টোন যা আপনার পুরো টিম ব্যবহার করতে পারে।" },
          { title: "ভিজ্যুয়াল আইডেন্টিটি", description: "লোগো, রং, টাইপোগ্রাফি আর ছবির ধরন — ফেভিকন থেকে বিলবোর্ড পর্যন্ত মানানসই।" },
          { title: "ব্র্যান্ড গাইডলাইন", description: "একটি ব্যবহারিক নির্দেশিকা, যাতে প্রত্যেক ডিজাইনার, লেখক ও পার্টনার ব্র্যান্ডকে একইভাবে ব্যবহার করেন।" },
        ],
        outcomes: [
          { title: "স্পষ্টতা", description: "আপনার টিম থেকে গ্রাহক — সবাই বলতে পারবে আপনি কী করেন আর কেন তা গুরুত্বপূর্ণ।" },
          { title: "সামঞ্জস্য", description: "প্রতিটি টাচপয়েন্ট একই ব্র্যান্ডের মতো দেখায়, তাই আস্থা দ্রুত গড়ে ওঠে।" },
          { title: "প্রিমিয়াম ভাবমূর্তি", description: "ভেবেচিন্তে গড়া ব্র্যান্ড দামের বদলে মূল্যের ভিত্তিতে প্রতিযোগিতা করতে দেয়।" },
        ],
        faq: [
          { q: "আপনারা কি শুধু নতুন ব্র্যান্ড নিয়ে কাজ করেন?", a: "না। প্রতিষ্ঠিত ব্র্যান্ডও আমরা নতুন করে সাজাই — যা গড়েছেন তা রেখে, যা আর মানায় না তা ঠিক করে।" },
          { q: "শেষে আমরা কী পাব?", a: "আপনার কৌশল, দরকারি সব ফরম্যাটে আইডেন্টিটি ফাইল আর এমন ব্র্যান্ড গাইডলাইন যা আপনার টিম সঙ্গে সঙ্গে ব্যবহার করতে পারবে।" },
        ],
      },
      "web-design-development": {
        tagline: "এমন ওয়েবসাইট, যা দেখতে অসাধারণ আর কনভার্টও করে।",
        intro:
          "প্রথম ওয়্যারফ্রেম থেকে লঞ্চ পর্যন্ত আমরা দ্রুত ও সহজে ব্যবহারযোগ্য ওয়েবসাইট ডিজাইন ও তৈরি করি, যা আপনার গল্প পরিষ্কারভাবে বলে আর ভিজিটরকে এনকোয়ারি ও বিক্রিতে রূপ দেয়।",
        includes: [
          { title: "UX ও ইনফরমেশন আর্কিটেকচার", description: "সাইটম্যাপ, ইউজার জার্নি আর ওয়্যারফ্রেম — ঠিক মানুষের সামনে ঠিক কনটেন্ট।" },
          { title: "UI ডিজাইন", description: "সব স্ক্রিনের জন্য আলাদা, ব্র্যান্ডের সাথে মানানসই ইন্টারফেস।" },
          { title: "ডেভেলপমেন্ট", description: "আধুনিক, দ্রুত সাইট আর এমন CMS যা আপনার টিম ডেভেলপার ছাড়াই আপডেট করতে পারে।" },
          { title: "লঞ্চ ও রক্ষণাবেক্ষণ", description: "এসইও-বান্ধব মাইগ্রেশন, অ্যানালিটিক্স সেটআপ আর লঞ্চের পরেও সাপোর্ট।" },
        ],
        outcomes: [
          { title: "গতি", description: "দ্রুত পেজ, যা ভিজিটর ধরে রাখে আর সার্চ র‍্যাংকিংয়ে সাহায্য করে।" },
          { title: "কনভার্শন", description: "আপনার ব্যবসার লক্ষ্য ঘিরে সাজানো পরিষ্কার জার্নি আর কল-টু-অ্যাকশন।" },
          { title: "নিয়ন্ত্রণ", description: "সহজে এডিট করা যায় এমন সাইট — পেজ বদলাতে কারও অপেক্ষায় থাকতে হয় না।" },
        ],
        faq: [
          { q: "আমাদের বর্তমান সাইট কি নতুন করে ডিজাইন করা যাবে?", a: "হ্যাঁ। যা কাজ করছে তা রেখে বাকিটা নতুন করে গড়ি — মাইগ্রেশনের সময় সার্চ র‍্যাংকিং সুরক্ষিত রেখে।" },
          { q: "সাইট কি মোবাইলে চলবে?", a: "প্রতিটি সাইট মোবাইল-ফার্স্ট ডিজাইন করা হয় আর লঞ্চের আগে নানা ডিভাইস ও ব্রাউজারে পরীক্ষা করা হয়।" },
        ],
      },
      "digital-marketing": {
        tagline: "ডেটার ওপর গড়া ক্যাম্পেইন, আয়ের হিসাবে মাপা।",
        intro:
          "আমরা সার্চ, সোশ্যাল, ডিসপ্লে আর ইমেইল জুড়ে মাল্টি-চ্যানেল ক্যাম্পেইন পরিকল্পনা ও পরিচালনা করি, আর আপনার ব্যবসার জন্য গুরুত্বপূর্ণ সংখ্যাগুলো ধরে নিয়মিত উন্নত করি।",
        includes: [
          { title: "কৌশল ও পরিকল্পনা", description: "স্পষ্ট লক্ষ্যের সাথে যুক্ত দর্শক, চ্যানেল আর বাজেট পরিকল্পনা।" },
          { title: "পেইড মিডিয়া", description: "সার্চ, সোশ্যাল আর ডিসপ্লে ক্যাম্পেইন — তৈরি, চালু আর পরিচালনা, শুরু থেকে শেষ।" },
          { title: "ইমেইল ও অটোমেশন", description: "লাইফসাইকেল ইমেইল আর নার্চার ফ্লো, যা কেনার আগ পর্যন্ত লিডকে আগ্রহী রাখে।" },
          { title: "অ্যানালিটিক্স ও রিপোর্টিং", description: "ঠিকঠাক ট্র্যাকিং আর এমন রিপোর্ট যা দেখায় ফল ঠিক কোথা থেকে আসছে।" },
        ],
        outcomes: [
          { title: "আরও যোগ্য লিড", description: "খরচ কেন্দ্রীভূত সেই দর্শকদের ওপর, যাদের গ্রাহক হওয়ার সম্ভাবনা সবচেয়ে বেশি।" },
          { title: "খরচে আরও ভালো রিটার্ন", description: "নিয়মিত পরীক্ষার মাধ্যমে বাজেট যায় যা ভালো ফল দিচ্ছে সেদিকে।" },
          { title: "পূর্ণ স্বচ্ছতা", description: "কী চলছে, কত খরচ হচ্ছে আর কী ফল আসছে — সবসময় জানবেন।" },
        ],
        faq: [
          { q: "বিজ্ঞাপনের কি ন্যূনতম বাজেট আছে?", a: "নির্দিষ্ট ন্যূনতম নেই। আপনার লক্ষ্য ও বাজার দেখে বাজেট সুপারিশ করি, আর ফল আসার সাথে সাথে বাড়াই।" },
          { q: "কত দিনে ফল দেখা যাবে?", a: "পেইড ক্যাম্পেইন কয়েক দিনের মধ্যেই ডেটা দেয়; সাধারণত প্রথম কয়েক সপ্তাহ শেখা ও উন্নত করায় যায়, তারপর বড় করা হয়।" },
        ],
      },
      "content-creation": {
        tagline: "এমন গল্প, যার জন্য স্ক্রল থেমে যায়।",
        intro:
          "আমাদের লেখক, ডিজাইনার আর ভিডিও প্রযোজকরা এমন কনটেন্ট বানান যা মনোযোগ কাড়ে, আপনি কী করেন তা বোঝায় আর মানুষকে পদক্ষেপ নেওয়ার কারণ দেয়।",
        includes: [
          { title: "কনটেন্ট কৌশল", description: "আপনার দর্শক আসলে যা খোঁজে ও শেয়ার করে, তার ভিত্তিতে বিষয়, ফরম্যাট আর ক্যালেন্ডার।" },
          { title: "কপিরাইটিং", description: "ওয়েবসাইট কপি, আর্টিকেল, গাইড আর বিজ্ঞাপনের লেখা — আপনার ব্র্যান্ডের কণ্ঠে।" },
          { title: "ভিডিও ও মোশন", description: "রিলস, এক্সপ্লেইনার আর ব্র্যান্ড ফিল্ম — স্ক্রিপ্ট থেকে ফাইনাল এডিট পর্যন্ত।" },
          { title: "ডিজাইন ও ফটোগ্রাফি", description: "গ্রাফিক্স, ইলাস্ট্রেশন আর ফটোশুট, যা প্রতিটি কাজকে আপনার বলে চেনায়।" },
        ],
        outcomes: [
          { title: "কর্তৃত্ব", description: "কাজের কনটেন্ট আপনাকে নিজের ক্ষেত্রে বিশেষজ্ঞ হিসেবে প্রতিষ্ঠা করে।" },
          { title: "অর্গানিক রিচ", description: "সার্চ আর শেয়ারের জন্য তৈরি কনটেন্ট প্রকাশের অনেক পরেও কাজ করে যায়।" },
          { title: "নিয়মিত প্রবাহ", description: "নির্ভরযোগ্য কনটেন্ট সরবরাহ, যাতে আপনার চ্যানেল কখনো ফাঁকা না থাকে।" },
        ],
        faq: [
          { q: "আমাদের বর্তমান টোন কি মেলাতে পারবেন?", a: "হ্যাঁ। আপনার ব্র্যান্ড গাইডলাইন আর আগের কনটেন্ট থেকে শুরু করি, প্রথম কয়েকটি কাজে আপনার সাথে মিলে কণ্ঠটি ঠিক করি।" },
          { q: "প্রকাশের কাজও কি আপনারা করেন?", a: "প্রকাশের জন্য তৈরি ফাইল দিতে পারি, অথবা আপনার হয়ে চ্যানেলগুলোতে প্রকাশ ও বিতরণ করতে পারি।" },
        ],
      },
      "social-media-management": {
        tagline: "এমন সোশ্যাল উপস্থিতি, যা কমিউনিটি গড়ে।",
        intro:
          "আমরা প্রতিদিন আপনার সোশ্যাল চ্যানেল চালাই — পরিকল্পনা, তৈরি, পোস্ট আর যোগাযোগ — যাতে আপনার দর্শক যেখানে সময় কাটায়, সেখানে ব্র্যান্ড নিয়মিত থাকে।",
        includes: [
          { title: "চ্যানেল কৌশল", description: "আপনার দর্শকের জন্য সঠিক প্ল্যাটফর্ম, ফরম্যাট আর পোস্টের ছন্দ।" },
          { title: "কনটেন্ট ক্যালেন্ডার", description: "পরিকল্পিত, ডিজাইন করা ও শিডিউল করা পোস্ট, আগেই আপনার অনুমোদিত।" },
          { title: "কমিউনিটি ব্যবস্থাপনা", description: "উত্তর, কমেন্ট আর মেসেজ দ্রুত সামলানো, আপনার ব্র্যান্ডের কণ্ঠে।" },
          { title: "ক্রিয়েটর ও পেইড সোশ্যাল", description: "ইনফ্লুয়েন্সার পার্টনারশিপ আর পেইড বুস্ট, ফলোয়ারের বাইরেও পৌঁছাতে।" },
        ],
        outcomes: [
          { title: "ধারাবাহিকতা", description: "আপনার টিমের সময় না নিয়েই সক্রিয়, ব্র্যান্ড-মানানসই উপস্থিতি।" },
          { title: "এনগেজমেন্ট", description: "শুধু ইমপ্রেশন নয়, কথোপকথনের জন্য তৈরি কনটেন্ট।" },
          { title: "প্রবৃদ্ধি", description: "আরও বড় ও প্রাসঙ্গিক দর্শক, যাদের গ্রাহকে রূপ দেওয়া যায়।" },
        ],
        faq: [
          { q: "কোন কোন প্ল্যাটফর্ম আপনারা সামলান?", a: "Instagram, Facebook, LinkedIn, TikTok, X আর YouTube — আপনার দর্শকের সাথে যেগুলো মেলে, সেগুলো সুপারিশ করি।" },
          { q: "পোস্ট কি আমরা অনুমোদন করব?", a: "সবসময়। কিছু প্রকাশের আগে আপনি প্রতিটি কনটেন্ট ক্যালেন্ডার দেখে নেবেন।" },
        ],
      },
      seo: {
        tagline: "যাঁরা আপনাকে খুঁজছেন, তাঁদের কাছে খুঁজে পাওয়া যান।",
        intro:
          "আমরা টেকনিক্যাল ভিত্তি ঠিক করি, কনটেন্ট ধারালো করি আর অথরিটি গড়ি, যাতে আপনার সাইট সেই সার্চগুলোতে র‍্যাংক করে যেগুলো আসল ব্যবসা আনে।",
        includes: [
          { title: "এসইও অডিট", description: "পূর্ণাঙ্গ টেকনিক্যাল, কনটেন্ট ও ব্যাকলিংক পর্যালোচনা, অগ্রাধিকার অনুযায়ী কর্মপরিকল্পনাসহ।" },
          { title: "টেকনিক্যাল এসইও", description: "সাইটের গতি, ক্রলযোগ্যতা, স্ট্রাকচার্ড ডেটা আর ইনডেক্সিং সমস্যা গোড়া থেকে সমাধান।" },
          { title: "অন-পেজ ও কনটেন্ট", description: "কিওয়ার্ড গবেষণা, পেজ অপ্টিমাইজেশন আর কেনার আগ্রহসম্পন্ন সার্চের জন্য নতুন কনটেন্ট।" },
          { title: "লোকাল এসইও", description: "Google Business Profile, সাইটেশন আর রিভিউ — আপনার এলাকার সার্চ জিততে।" },
        ],
        outcomes: [
          { title: "উঁচু র‍্যাংকিং", description: "গ্রাহক কেনার সময় যে শব্দগুলো খোঁজেন, সেগুলোতে দৃশ্যমানতা।" },
          { title: "ক্রমবর্ধমান ট্রাফিক", description: "প্রতিটি ক্লিকের দাম না দিয়েই সময়ের সাথে বাড়তে থাকা অর্গানিক ট্রাফিক।" },
          { title: "পরিষ্কার রিপোর্টিং", description: "র‍্যাংকিং, ট্রাফিক আর এনকোয়ারি ট্র্যাক করা হয়, যাতে রিটার্ন দেখতে পান।" },
        ],
        faq: [
          { q: "এসইও কাজ করতে কত সময় লাগে?", a: "টেকনিক্যাল সমাধান কয়েক সপ্তাহেই সাহায্য করতে পারে; উল্লেখযোগ্য র‍্যাংকিং উন্নতি সাধারণত তিন থেকে ছয় মাসে গড়ে ওঠে।" },
          { q: "আপনারা কি গুগলে প্রথম স্থান নিশ্চিত করেন?", a: "সৎভাবে কেউই তা পারে না। আমরা কাজ আর স্বচ্ছতার প্রতিশ্রুতি দিই, আর প্রতি মাসে অগ্রগতির রিপোর্ট দিই।" },
        ],
      },
    },
  },
});
