/*
 * DE copy for every namespace, keyed by the id each messages file
 * passes to defineMessages. This module is its own chunk: it is downloaded
 * only when a visitor is reading the site in this language (see ../load.ts),
 * so English visitors never pay for it.
 *
 * Each namespace is checked against its English source with `satisfies`:
 * keys may be missing (they fall back to English), but not misspelled.
 */
import type { Dict, PartialCopy } from "../types";
import type { aboutMessages } from "../messages/about";
import type { aboutApproachMessages } from "../messages/aboutApproach";
import type { aboutAwardsMessages } from "../messages/aboutAwards";
import type { aboutCareersMessages } from "../messages/aboutCareers";
import type { aboutHistoryMessages } from "../messages/aboutHistory";
import type { aboutReviewsMessages } from "../messages/aboutReviews";
import type { aboutValuesMessages } from "../messages/aboutValues";
import type { authMessages } from "../messages/auth";
import type { blogPostMessages } from "../messages/blogPost";
import type { blogsMessages } from "../messages/blogs";
import type { chatMessages } from "../messages/chat";
import type { commonMessages } from "../messages/common";
import type { contactMessages } from "../messages/contact";
import type { cvTeaserMessages } from "../messages/cvTeaser";
import type { cvBuilderMessages } from "../messages/cvBuilder";
import type { editorMessages } from "../messages/editor";
import type { editorUiMessages } from "../messages/editorUi";
import type { footerMessages } from "../messages/footer";
import type { homeMessages } from "../messages/home";
import type { kitMessages } from "../messages/kit";
import type { legalPrivacyMessages } from "../messages/legalPrivacy";
import type { legalPrivacyTermsMessages } from "../messages/legalPrivacyTerms";
import type { legalTermsMessages } from "../messages/legalTerms";
import type { navMessages } from "../messages/nav";
import type { notFoundMessages } from "../messages/notFound";
import type { pageMetaMessages } from "../messages/pageMeta";
import type { projectEditorMessages } from "../messages/projectEditor";
import type { realEstateMessages } from "../messages/realEstate";
import type { realEstateBlogsMessages } from "../messages/realEstateBlogs";
import type { realEstateFooterMessages } from "../messages/realEstateFooter";
import type { realEstateProjectDetailMessages } from "../messages/realEstateProjectDetail";
import type { realEstateProjectsMessages } from "../messages/realEstateProjects";
import type { realEstateWhatsAppMessages } from "../messages/realEstateWhatsApp";
import type { servicesIndexMessages } from "../messages/servicesIndex";
import type { servicesMessages } from "../messages/services";
import type { sitemapMessages } from "../messages/sitemap";
import type { teamMessages } from "../messages/team";
import type { websiteCostMessages } from "../messages/websiteCost";

const ns_about = {
    metaTitle: "Über uns | Creative Surf",
    metaDescription:
      "Erfahren Sie mehr über Creative Surf, unsere Mission, unsere Werte und das Team hinter unserer Kreativagentur.",
    hero: {
      title: "Über Creative Surf",
      subtitle:
        "Wir sind ein Team leidenschaftlicher Kreativer, das Marken hilft, in ihrer Branche Wellen zu schlagen",
    },
    story: {
      title: "Unsere Geschichte",
      p1:
        "Creative Surf wurde mit einer einfachen Mission gegründet: authentische Markenerlebnisse zu schaffen, die Menschen erreichen und echte Ergebnisse bringen.",
      p2:
        "Was als Team von drei Personen begann, ist heute ein vielfältiges Kollektiv aus Strategen, Designern, Entwicklern und Content-Creators — verbunden durch die Leidenschaft für kreative Exzellenz.",
      p3:
        "Heute arbeiten wir mit Marken aus allen Branchen zusammen, von jungen Startups bis zu etablierten Unternehmen, und helfen ihnen, sich im ständig wandelnden digitalen Umfeld zu orientieren und echte Verbindungen zu ihren Zielgruppen aufzubauen.",
      imageAlt: "Das Creative Surf Team",
    },
    values: {
      title: "Unsere Werte",
      items: [
        { title: "Kreativität", description: "Wir gehen jede Herausforderung mit frischem Denken und innovativen Lösungen an." },
        { title: "Zusammenarbeit", description: "Wir glauben: Die besten Ergebnisse entstehen, wenn verschiedene Perspektiven zusammenkommen." },
        { title: "Exzellenz", description: "Wir setzen bei allem, was wir tun, die höchsten Maßstäbe an uns selbst." },
        { title: "Authentizität", description: "Wir schätzen Ehrlichkeit und Transparenz in allen unseren Beziehungen." },
        { title: "Wachstum", description: "Wir lernen und verbessern uns kontinuierlich." },
        { title: "Wirkung", description: "Wir messen unseren Erfolg an den Ergebnissen, die wir für unsere Kunden liefern." },
      ],
    },
    cta: {
      title: "Lassen Sie uns gemeinsam Großes schaffen",
      body: "Bereit, Ihre Marke auf das nächste Level zu bringen? Erzählen Sie uns von Ihrem Projekt.",
      button: "Kontakt aufnehmen",
    },
  } satisfies PartialCopy<typeof aboutMessages.en>;

const ns_aboutApproach = {
    metaTitle: "Unser Ansatz | Creative Surf",
    metaDescription:
      "Entdecken Sie die bewährte Methodik von Creative Surf für messbare Ergebnisse: Analyse, Strategie, Umsetzung und laufende Optimierung.",
    hero: {
      title: "Unser Ansatz",
      subtitle: "Wie wir mit unserer bewährten Methodik außergewöhnliche Ergebnisse erzielen",
    },
    philosophy: {
      title: "Unsere Philosophie",
      intro:
        "Bei Creative Surf setzen wir auf einen datengetriebenen, kundenzentrierten Ansatz mit messbaren Ergebnissen. Unsere Methodik verbindet strategisches Denken, kreative Exzellenz und technische Expertise.",
      cards: [
        {
          title: "Strategischer Fokus",
          body:
            "Wir beginnen damit, Ihre Geschäftsziele und Zielgruppe zu verstehen, um Strategien zu entwickeln, die auf Ihre Ziele einzahlen.",
        },
        {
          title: "Datenbasierte Entscheidungen",
          body:
            "Wir nutzen Analytics und Marktforschung, um unsere Strategien zu schärfen und die Performance laufend zu optimieren.",
        },
        {
          title: "Kreative Innovation",
          body:
            "Wir verbinden Kreativität mit Technologie, um innovative Lösungen zu entwickeln, mit denen Ihre Marke in einem gesättigten Markt heraussticht.",
        },
      ],
    },
    process: {
      title: "Unser Prozess",
      intro: "Ein systematisches Vorgehen für konstante Qualität und verlässliche Ergebnisse",
      expectLabel: "Das erwartet Sie:",
      steps: [
        {
          title: "Analyse & Erkenntnisse",
          body:
            "Wir beginnen damit, Ihr Unternehmen, Ihre Ziele, Ihre Zielgruppe und Ihr Wettbewerbsumfeld zu verstehen. Unser Team recherchiert und analysiert gründlich, um Chancen und Herausforderungen zu erkennen.",
          points: [
            "Umfassende Unternehmensanalyse",
            "Bewertung des Wettbewerbsumfelds",
            "Zielgruppenforschung",
          ],
        },
        {
          title: "Strategieentwicklung",
          body:
            "Auf Basis unserer Erkenntnisse entwickeln wir eine individuelle Strategie, die auf Ihre Ziele ausgerichtet ist. Wir definieren klare KPIs und eine Roadmap für die Umsetzung.",
          points: [
            "Individueller Strategieplan",
            "Klare KPIs und Erfolgsmetriken",
            "Ressourcenplanung und Zeitplan",
          ],
        },
        {
          title: "Umsetzung",
          body:
            "Unser Expertenteam setzt die Strategie präzise und detailgenau um — mit den aktuellsten Tools und Technologien für hochwertige Ergebnisse.",
          points: [
            "Umsetzung durch Spezialisten",
            "Regelmäßige Fortschrittsupdates",
            "Qualitätssicherung in jedem Schritt",
          ],
        },
        {
          title: "Messung & Optimierung",
          body:
            "Wir überwachen die Performance laufend, analysieren Ergebnisse und optimieren datenbasiert, um Wirkung und ROI zu maximieren.",
          points: [
            "Umfassendes Performance-Reporting",
            "Datenbasierte Optimierungsempfehlungen",
            "Kontinuierlicher Verbesserungszyklus",
          ],
        },
      ],
    },
    methodology: {
      title: "Unsere Methodik",
      intro: "Die Grundprinzipien, die unsere Arbeit leiten und herausragende Ergebnisse sichern",
      cards: [
        {
          title: "Partnerschaft mit Kunden",
          body:
            "Wir verstehen uns als Erweiterung Ihres Teams und arbeiten gemeinsam auf Ihre Ziele zu. Transparente Kommunikation und regelmäßige Updates halten Sie immer im Bild.",
        },
        {
          title: "Agile Umsetzung",
          body:
            "Unser agiler Ansatz erlaubt es, schnell auf veränderte Marktbedingungen und Anforderungen zu reagieren. Wir iterieren zügig, testen laufend und optimieren auf maximale Wirkung.",
        },
        {
          title: "Ergebnisorientiert",
          body:
            "Wir sind besessen von messbaren Ergebnissen, die Ihr Geschäftsergebnis verbessern. Jede Strategie und Taktik hat klare Ziele und KPIs.",
        },
        {
          title: "Kontinuierliche Innovation",
          body:
            "Wir bleiben an der Spitze von Branchentrends und Technologien, um Lösungen zu liefern, die Ihnen einen Wettbewerbsvorsprung verschaffen.",
        },
      ],
    },
    caseStudies: {
      title: "Unser Ansatz in der Praxis",
      intro: "Sehen Sie, welche Ergebnisse unsere Methodik für Kunden erzielt hat",
      readMore: "Case Study lesen",
      items: [
        {
          category: "E-Commerce",
          title: "300 % Umsatzwachstum",
          body: "Wie wir einer E-Commerce-Marke geholfen haben, ihren Umsatz durch strategisches Digitalmarketing zu verdreifachen.",
          imageAlt: "Case Study E-Commerce-Wachstum",
        },
        {
          category: "B2B",
          title: "10× mehr Leads",
          body: "Wie unser Ansatz einem B2B-Unternehmen in 6 Monaten zu 10× mehr qualifizierten Leads verhalf.",
          imageAlt: "Case Study B2B-Leadgenerierung",
        },
        {
          category: "Markentransformation",
          title: "Erfolgreicher Marken-Relaunch",
          body: "Wie wir eine etablierte Marke digital transformiert und ein neues Marktsegment erschlossen haben.",
          imageAlt: "Case Study Markentransformation",
        },
      ],
    },
    cta: {
      title: "Bereit für unseren Ansatz?",
      body: "Sprechen wir darüber, wie unsere bewährte Methodik Ihrem Unternehmen zu herausragenden Ergebnissen verhilft.",
      contact: "Kontakt aufnehmen",
      proposal: "Angebot anfordern",
    },
  } satisfies PartialCopy<typeof aboutApproachMessages.en>;

const ns_aboutAwards = {
    metaTitle: "Auszeichnungen & Anerkennung",
    metaDescription:
      "Entdecken Sie die Auszeichnungen, die Creative Surf für Exzellenz in Digitalmarketing, Webdesign und Kundenzufriedenheit erhalten hat.",
    breadcrumbCurrent: "Auszeichnungen",
    hero: {
      title: "Auszeichnungen & Anerkennung",
      subtitle:
        "Wir sind stolz darauf, für unseren Qualitätsanspruch, unsere Innovationskraft und den Erfolg unserer Kunden im Digitalmarketing ausgezeichnet zu werden.",
      imageAlt: "Auszeichnungen von Creative Surf",
    },
    timelineTitle: "Unsere Auszeichnungen im Zeitverlauf",
    years: [
      {
        awards: [
          {
            name: "Excellence Award Digitalmarketing",
            organization: "Digital Innovation Awards",
            description:
              "Ausgezeichnet für herausragende Leistung und Innovation in Digitalmarketing-Kampagnen.",
          },
          {
            name: "Beste SEO-Agentur",
            organization: "Marketing Excellence Awards",
            description:
              "Ausgezeichnet für außergewöhnliche Ergebnisse und innovative Strategien in der Suchmaschinenoptimierung.",
          },
          {
            name: "Top 10 Webdesign-Agenturen",
            organization: "Design Industry Association",
            description:
              "Zu den besten Webdesign-Agenturen gezählt — für kreative Exzellenz und Kundenzufriedenheit.",
          },
        ],
      },
      {
        awards: [
          {
            name: "Bester Arbeitgeber",
            organization: "Employer Excellence Awards",
            description:
              "Ausgezeichnet für herausragende Unternehmenskultur, Mitarbeiterzufriedenheit und Entwicklungschancen.",
          },
          {
            name: "Innovation im Social-Media-Marketing",
            organization: "Social Media Marketing Association",
            description:
              "Ausgezeichnet für wegweisende Social-Media-Kampagnen mit außergewöhnlichen Ergebnissen für Kunden.",
          },
          {
            name: "Aufsteiger-Agentur",
            organization: "Marketing Industry Network",
            description:
              "Als eine der am schnellsten wachsenden und vielversprechendsten Agenturen der Branche anerkannt.",
          },
        ],
      },
      {
        awards: [
          {
            name: "Exzellenz in der Kundenzufriedenheit",
            organization: "Customer Experience Awards",
            description:
              "Ausgezeichnet für höchste Standards in Kundenzufriedenheit und Servicequalität.",
          },
          {
            name: "Beste Content-Marketing-Kampagne",
            organization: "Content Marketing Institute",
            description:
              "Ausgezeichnet für eine innovative Content-Strategie, die Engagement und Conversions deutlich gesteigert hat.",
          },
        ],
      },
      {
        awards: [
          {
            name: "Aufstrebende Digitalagentur des Jahres",
            organization: "Digital Business Awards",
            description:
              "Als vielversprechendste neue Agentur mit außergewöhnlichem Wachstum und starken Kundenergebnissen ausgezeichnet.",
          },
        ],
      },
    ],
    certificationsTitle: "Branchenzertifizierungen",
    certifications: [
      {
        name: "Google Partner",
        description:
          "Zertifizierter Google Partner mit Spezialisierungen in Search, Display und Video-Advertising.",
      },
      {
        name: "Meta Business Partner",
        description:
          "Zertifizierter Meta Business Partner mit Expertise in Facebook- und Instagram-Werbung.",
      },
      {
        name: "HubSpot Solutions Partner",
        description:
          "Zertifizierter HubSpot Solutions Partner mit Expertise in Inbound-Marketing und CRM-Einführung.",
      },
      {
        name: "Shopify Partner",
        description:
          "Zertifizierter Shopify Partner, spezialisiert auf E-Commerce-Entwicklung und -Optimierung.",
      },
    ],
    featured: {
      title: "Finalist: Digitalagentur des Jahres",
      body:
        "Wir sind stolz darauf, bei den Digital Excellence Awards 2024 als Finalist für den renommierten Preis „Digitalagentur des Jahres“ nominiert worden zu sein. Diese Anerkennung unterstreicht den Einsatz unseres Teams für außergewöhnliche Ergebnisse und innovative Digitalarbeit.",
      event: "Digital Excellence Awards 2024",
      imageAlt: "Preisverleihung Digitalagentur des Jahres",
    },
    stories: {
      title: "Ausgezeichnete Kundenerfolge",
      viewCaseStudy: "Case Study ansehen",
      items: [
        {
          badge: "Beste E-Commerce-Kampagne",
          client: "StyleHouse Boutique",
          body:
            "Unsere ausgezeichnete E-Commerce-Strategie steigerte die Online-Verkäufe um 78 % und erweiterte den Kundenstamm auf drei neue Märkte.",
          imageAlt: "E-Commerce-Erfolgsgeschichte",
        },
        {
          badge: "Beste SEO-Kampagne",
          client: "TechVision Inc.",
          body:
            "Unsere SEO-Strategie brachte TechVision 150 % mehr organischen Traffic und 200 % mehr qualifizierte Leads.",
          imageAlt: "SEO-Erfolgsgeschichte",
        },
        {
          badge: "Beste Social-Media-Kampagne",
          client: "Innovate Solutions",
          body:
            "Unsere innovative Social-Media-Kampagne verhalf diesem Startup zu 120 % Follower-Wachstum und einer Series-A-Finanzierung.",
          imageAlt: "Social-Media-Erfolgsgeschichte",
        },
      ],
    },
    cta: {
      title: "Bereit für eine ausgezeichnete Agentur?",
      body:
        "Arbeiten Sie mit Creative Surf und erleben Sie, was ausgezeichnetes Digitalmarketing für Ihr Unternehmen bewirken kann.",
      button: "Jetzt Kontakt aufnehmen",
    },
  } satisfies PartialCopy<typeof aboutAwardsMessages.en>;

const ns_aboutCareers = {
    metaTitle: "Karriere",
    metaDescription:
      "Entdecken Sie Karrierechancen bei Creative Surf. Werden Sie Teil unseres Teams aus Digitalmarketing-Experten und gestalten Sie die digitale Zukunft mit.",
    breadcrumbCurrent: "Karriere",
    hero: {
      title: "Werden Sie Teil des Teams",
      p1:
        "Bei Creative Surf bauen wir ein Team aus leidenschaftlichen, kreativen und innovativen Fachleuten auf, die außergewöhnliche Ergebnisse für unsere Kunden liefern.",
      p2:
        "Wenn Sie ein dynamisches Umfeld suchen, in dem Ihre Ideen zählen und Ihre Karriere wachsen kann, freuen wir uns auf Ihre Nachricht.",
      cta: "Offene Stellen ansehen",
      imageAlt: "Zusammenarbeit im Creative Surf Team",
    },
    culture: {
      title: "Unsere Kultur",
      imageAlt: "Die Unternehmenskultur von Creative Surf",
      subtitle: "Was uns unterscheidet",
      p1:
        "Bei Creative Surf sind unsere Menschen unser größtes Kapital. Wir haben eine Kultur geschaffen, die Kreativität, Zusammenarbeit und kontinuierliches Lernen wertschätzt — in einem inklusiven Umfeld, in dem unterschiedliche Perspektiven willkommen sind.",
      p2:
        "Unsere Teammitglieder werden ermutigt, querzudenken, Verantwortung für ihre Arbeit zu übernehmen und zum Erfolg des Unternehmens beizutragen. Wir setzen auf eine gesunde Work-Life-Balance und geben unserem Team die Unterstützung, die es braucht.",
      note: "Werden Sie Teil eines Teams, das Ihre Perspektive und Talente schätzt",
    },
    benefits: {
      title: "Vorteile & Extras",
      items: [
        {
          title: "Umfassende Gesundheitsleistungen",
          description:
            "Kranken-, Zahn- und Sehversorgung für Sie und Ihre Angehörigen, mit Arbeitgeberbeteiligung an den Beiträgen.",
        },
        {
          title: "Flexible Arbeitsmodelle",
          description:
            "Hybrides Arbeiten, flexible Arbeitszeiten und großzügige Urlaubsregelung für eine gute Work-Life-Balance.",
        },
        {
          title: "Fachliche Weiterentwicklung",
          description:
            "Laufende Schulungen, Konferenzbesuche, Unterstützung bei Zertifizierungen und Bildungszuschüsse.",
        },
        {
          title: "Kollaborative Kultur",
          description:
            "Arbeiten Sie mit einem vielfältigen Expertenteam in einem unterstützenden Umfeld, das Kreativität und Innovation schätzt.",
        },
      ],
      extraTitle: "Weitere Extras",
      extras: [
        "Betriebliche Altersvorsorge mit Zuschuss",
        "Bezahlte Elternzeit",
        "Gesundheitsprogramm",
        "Firmenevents",
        "Remote-Arbeit möglich",
        "Budget für Weiterbildung",
      ],
    },
    testimonials: {
      title: "Unser Team",
      items: [
        {
          position: "Senior SEO-Spezialist",
          years: "4 Jahre bei Creative Surf",
          quote:
            "Die Arbeit bei Creative Surf war das Highlight meiner Karriere. Das kollaborative Umfeld, spannende Projekte und Entwicklungschancen haben mich fachlich und persönlich wachsen lassen.",
        },
        {
          position: "Webentwicklerin",
          years: "2 Jahre bei Creative Surf",
          quote:
            "Ich liebe die Kultur bei Creative Surf. Wir dürfen mit neuen Technologien und Ansätzen experimentieren, und kontinuierliches Lernen wird wirklich gefördert.",
        },
        {
          position: "Content-Marketing-Manager",
          years: "3 Jahre bei Creative Surf",
          quote:
            "Die Work-Life-Balance bei Creative Surf ist unübertroffen. Die flexiblen Modelle erlauben mir, produktiv zu sein und trotzdem Zeit für Privatleben und Familie zu haben.",
        },
      ],
    },
    openings: {
      title: "Offene Stellen",
      requirementsLabel: "Anforderungen:",
      apply: "Jetzt bewerben",
      jobs: [
        {
          title: "Senior SEO-Spezialist (m/w/d)",
          department: "Digitalmarketing",
          location: "San Francisco, CA (hybrid)",
          type: "Vollzeit",
          description:
            "Wir suchen einen erfahrenen SEO-Spezialisten, der umfassende SEO-Strategien für unsere Kunden aus verschiedenen Branchen entwickelt und umsetzt.",
          requirements: [
            "5+ Jahre Erfahrung im SEO",
            "Starke analytische Fähigkeiten und Erfahrung mit SEO-Tools",
            "Kenntnisse in technischem SEO, Onpage-Optimierung und Linkaufbau",
            "Erfahrung mit Google Analytics und der Search Console",
            "Ausgezeichnete Kommunikations- und Kundenbetreuungsfähigkeiten",
          ],
        },
        {
          title: "Webentwickler (m/w/d)",
          department: "UX & Interaktiv",
          location: "Remote",
          type: "Vollzeit",
          description:
            "Verstärken Sie unser Entwicklungsteam und bauen Sie responsive, nutzerfreundliche Websites und Web-Apps mit modernsten Technologien.",
          requirements: [
            "3+ Jahre Erfahrung in der Webentwicklung",
            "Sicher in HTML, CSS, JavaScript und React",
            "Erfahrung mit Next.js und weiteren modernen Frameworks",
            "Verständnis für UI/UX-Prinzipien",
            "Ausgeprägte Problemlösungskompetenz und Detailgenauigkeit",
          ],
        },
        {
          title: "Social-Media-Manager (m/w/d)",
          department: "Content-Marketing",
          location: "San Francisco, CA (hybrid)",
          type: "Vollzeit",
          description:
            "Wir suchen einen kreativen und strategischen Social-Media-Manager, der Kampagnen für unsere vielfältigen Kunden entwickelt und umsetzt.",
          requirements: [
            "3+ Jahre Erfahrung im Social-Media-Management",
            "Erfahrung mit Social Advertising und Analytics",
            "Starke Fähigkeiten in Content-Erstellung und Texten",
            "Kenntnis aktueller Social-Media-Trends und Best Practices",
            "Ausgezeichnete Organisations- und Zeitmanagementfähigkeiten",
          ],
        },
        {
          title: "Praktikum Digitalmarketing",
          department: "Digitalmarketing",
          location: "San Francisco, CA (vor Ort)",
          type: "Praktikum (3–6 Monate)",
          description:
            "Sammeln Sie praktische Erfahrung im Digitalmarketing und arbeiten Sie mit unserem Expertenteam an echten Kundenprojekten.",
          requirements: [
            "Studium in Marketing, Kommunikation oder einem verwandten Fach",
            "Grundverständnis von Digitalmarketing-Konzepten",
            "Sehr gute schriftliche und mündliche Ausdrucksfähigkeit",
            "Lernbereitschaft und Interesse am Digitalmarketing",
            "Sicherer Umgang mit Microsoft Office und Google Workspace",
          ],
        },
      ],
    },
    process: {
      title: "Unser Bewerbungsprozess",
      steps: [
        {
          title: "Bewerbung",
          description: "Senden Sie Lebenslauf und Anschreiben über unser Online-Bewerbungssystem.",
        },
        {
          title: "Erstgespräch",
          description:
            "Ein Telefon- oder Videointerview mit unserem HR-Team über Ihre Erfahrung und Ihre Ziele.",
        },
        {
          title: "Fachliche Aufgabe",
          description: "Sie bearbeiten eine Aufgabe oder ein Projekt passend zur ausgeschriebenen Stelle.",
        },
        {
          title: "Abschlussgespräch",
          description: "Sie treffen das Team, mit dem Sie arbeiten würden — für ein beidseitig gutes Match.",
        },
      ],
    },
    cta: {
      title: "Nichts Passendes gefunden?",
      body:
        "Wir suchen immer talentierte Menschen für unser Team. Senden Sie uns Ihren Lebenslauf — wir denken bei künftigen Chancen an Sie.",
      button: "Lebenslauf senden",
    },
  } satisfies PartialCopy<typeof aboutCareersMessages.en>;

const ns_aboutHistory = {
    metaTitle: "Unsere Geschichte",
    metaDescription:
      "Erfahren Sie mehr über den Weg und die Meilensteine von CreativeSurf — von der Gründung bis zur führenden Digitalmarketing-Agentur.",
    breadcrumbCurrent: "Die Geschichte von CreativeSurf",
    hero: {
      title: "Unser Weg",
      subtitle:
        "Von einem kleinen Team leidenschaftlicher Marketer zur führenden Digitalmarketing-Agentur — die Geschichte hinter CreativeSurf.",
      imageAlt: "Die Geschichte von CreativeSurf",
    },
    timelineTitle: "Unsere Zeitleiste",
    timeline: [
      {
        title: "Der Anfang",
        body:
          "CreativeSurf wurde von einem kleinen Team von Digitalmarketing-Experten gegründet, mit der Vision, Unternehmen durch die komplexe digitale Landschaft zu führen. Mit nur fünf Mitarbeitenden in einem kleinen Büro begannen wir mit SEO und Content-Marketing für lokale Unternehmen.",
        imageAlt: "Die Gründung von CreativeSurf",
      },
      {
        title: "Expansion & Innovation",
        body:
          "Trotz der globalen Herausforderungen war 2020 ein Wachstumsjahr für CreativeSurf. Wir erweiterten unser Angebot um Webdesign und Social-Media-Marketing. Unser Team verdoppelte sich und wir zogen in größere Büros.",
        imageAlt: "Das Wachstum von CreativeSurf",
      },
      {
        title: "Anerkennung der Branche",
        body:
          "Unser Qualitätsanspruch wurde belohnt: Wir gewannen unsere ersten Branchenauszeichnungen für herausragende Digitalmarketing-Kampagnen. Zudem starteten wir unsere eigene Analytics-Plattform, die Kunden tiefere Einblicke in ihre Marketing-Performance gibt.",
        imageAlt: "Die Auszeichnungen von CreativeSurf",
      },
      {
        title: "Nationale Expansion",
        body:
          "CreativeSurf expandierte landesweit und eröffnete Büros in drei Großstädten. Wir starteten unsere Digitalmarketing-Akademie mit Schulungen und Ressourcen für Unternehmen und Fachkräfte.",
        imageAlt: "Die nationale Expansion von CreativeSurf",
      },
      {
        title: "Internationales Wachstum",
        body:
          "Wir machten unsere ersten Schritte in internationalen Märkten und schlossen Partnerschaften mit Agenturen in Europa und Asien. Unser Team wuchs auf über 100 Expertinnen und Experten, und wir führten fortschrittliche KI-gestützte Marketinglösungen ein.",
        imageAlt: "Das internationale Wachstum von CreativeSurf",
      },
      {
        title: "Innovation & Zukunftsfokus",
        body:
          "Heute treibt CreativeSurf das Digitalmarketing weiter voran. Wir haben unsere Nachhaltigkeitsinitiative gestartet, um unseren ökologischen Fußabdruck zu verringern und Kunden zu nachhaltigem Marketing zu verhelfen. Mit Fokus auf neue Technologien wie KI und Metaverse bereiten wir unsere Kunden auf die Zukunft des Digitalmarketings vor.",
        imageAlt: "CreativeSurf heute",
      },
    ],
    valuesTitle: "Unsere bleibenden Werte",
    values: [
      {
        title: "Innovation",
        body:
          "Von Tag eins an halten wir uns an der Spitze der Trends und Technologien im Digitalmarketing. Dieser Innovationsgeist treibt uns weiter voran.",
      },
      {
        title: "Kundenerfolg",
        body:
          "Der Erfolg unserer Kunden war immer unser wichtigster Maßstab. Wir sind stolz darauf, hunderten Unternehmen zu digitalem Wachstum verholfen zu haben.",
      },
      {
        title: "Gemeinschaft",
        body:
          "Wir geben etwas an die Gemeinschaften zurück, für die wir arbeiten. Seit unseren Anfängen engagieren wir uns gesellschaftlich und sozial.",
      },
    ],
    cta: {
      title: "Werden Sie Teil unserer Zukunft",
      body:
        "Schreiben Sie mit uns die nächsten Kapitel der CreativeSurf-Geschichte. Als Kunde, Partner oder Teammitglied — für Sie ist ein Platz dabei.",
      contact: "Kontakt aufnehmen",
      join: "Team beitreten",
    },
  } satisfies PartialCopy<typeof aboutHistoryMessages.en>;

const ns_aboutReviews = {
    metaTitle: "Kundenbewertungen & Referenzen",
    metaDescription:
      "Erfahren Sie, was unsere Kunden über die Zusammenarbeit mit Creative Surf sagen. Lesen Sie Referenzen von Unternehmen, die wir erfolgreich gemacht haben.",
    breadcrumbCurrent: "Bewertungen",
    hero: {
      title: "Kundenbewertungen & Referenzen",
      subtitle:
        "Verlassen Sie sich nicht nur auf unser Wort. Lesen Sie, was unsere Kunden über die Zusammenarbeit mit Creative Surf sagen.",
      outOfFive: "{rating} von 5",
      basedOn: "Basierend auf {count} Kundenbewertungen",
    },
    reviews: [
      {
        position: "Marketingleiterin",
        date: "15. März 2025",
        text:
          "Die Zusammenarbeit mit Creative Surf hat unsere digitale Präsenz komplett verändert. Ihr strategischer Ansatz brachte in nur drei Monaten messbare Ergebnisse: 45 % höhere Conversion-Rate und doppeltes Social-Media-Engagement.",
      },
      {
        position: "CEO",
        date: "3. Februar 2025",
        text:
          "Als Startup-Gründer brauchte ich eine Agentur, die das gesamte Marketing übernimmt, während ich mich auf das Produkt konzentriere. Creative Surf hat meine Erwartungen in jeder Hinsicht übertroffen: Markenidentität entwickelt, Website gebaut und eine Launch-Kampagne umgesetzt, die uns in wichtige Branchenmedien brachte. Ihre Arbeit hat direkt zu unserer erfolgreichen Series-A-Finanzierung beigetragen.",
      },
      {
        position: "E-Commerce-Managerin",
        date: "22. Januar 2025",
        text:
          "Unsere Online-Verkäufe sind seit Beginn der Zusammenarbeit mit Creative Surf um 78 % gestiegen. Ihr Verständnis für E-Commerce-Trends und Konsumverhalten ist außergewöhnlich. Die Produktfotografie und Social-Kampagnen für unseren Saison-Launch waren beeindruckend und sehr wirkungsvoll. Sie sind immer einen Schritt voraus.",
      },
      {
        position: "Betriebsleiter",
        date: "10. Dezember 2024",
        text:
          "In einer B2B-Branche wie unserer war es schwer, eine Agentur zu finden, die die Feinheiten unseres Marktes versteht — bis wir Creative Surf fanden. Sie haben unsere Leadgenerierung neu aufgesetzt und Inhalte geschaffen, die unsere Zielkunden wirklich ansprechen. Der datengetriebene Ansatz und das regelmäßige Reporting machen den ROI transparent.",
      },
      {
        position: "Marketingmanagerin",
        date: "5. November 2024",
        text:
          "Die SEO-Expertise von Creative Surf war für unser Unternehmen von unschätzbarem Wert. Sechs Monate nach Umsetzung ihrer Empfehlungen war unser organischer Traffic um 120 % gestiegen und unsere Rankings für zentrale Branchenbegriffe deutlich besser. Ein reaktionsschnelles, kompetentes Team, dem unser Erfolg wirklich am Herzen liegt.",
      },
      {
        position: "Gründer",
        date: "18. Oktober 2024",
        text:
          "Als Inhaber eines kleinen Unternehmens war ich zögerlich, in Digitalmarketing zu investieren, aber Creative Surf hat den Einstieg zugänglich und erschwinglich gemacht. Sie haben sich Zeit genommen, meine Anforderungen zu verstehen, und eine individuelle Strategie entwickelt, die mir neue Kunden und Wachstum gebracht hat. Ihre persönliche Note und Detailgenauigkeit machen den Unterschied.",
      },
    ],
    recognition: {
      title: "Anerkennung der Branche",
      items: [
        { name: "Marketing-Exzellenz", event: "Digital Innovation Awards 2024", imageAlt: "Excellence Award Digitalmarketing" },
        { name: "Beste SEO-Agentur", event: "Digital Marketing Awards 2023", imageAlt: "Beste SEO-Agentur" },
        { name: "Top Webdesign-Agentur", event: "Creative Excellence Awards 2023", imageAlt: "Top Webdesign-Agentur" },
        { name: "Bester Arbeitgeber", event: "Employer Excellence Awards 2022", imageAlt: "Bester Arbeitgeber" },
      ],
    },
    platforms: {
      title: "Finden Sie uns auf Bewertungsplattformen",
      summary: "{rating} von 5 bei {count} Bewertungen",
      readOn: "{platform}-Bewertungen lesen",
    },
    cta: {
      title: "Bereit für solche Ergebnisse?",
      body:
        "Schließen Sie sich unseren zufriedenen Kunden an und erleben Sie, wie Creative Surf Ihre digitale Präsenz verwandelt.",
      button: "Jetzt Kontakt aufnehmen",
    },
  } satisfies PartialCopy<typeof aboutReviewsMessages.en>;

const ns_aboutValues = {
    metaTitle: "Unsere Grundwerte",
    metaDescription:
      "Entdecken Sie die Grundwerte, die Kultur, Entscheidungen und Kundenbeziehungen bei Creative Surf prägen.",
    breadcrumbCurrent: "Unsere Werte",
    hero: {
      title: "Unsere Grundwerte",
      p1:
        "Bei Creative Surf sind unsere Werte mehr als Worte an der Wand. Sie leiten unsere Entscheidungen, prägen unsere Kultur und bestimmen, wie wir mit Kunden und miteinander arbeiten.",
      p2:
        "Diese Prinzipien stehen seit dem ersten Tag im Zentrum unseres Unternehmens und tragen unseren Erfolg und unser Wachstum.",
      imageAlt: "Die Grundwerte von Creative Surf",
    },
    principlesTitle: "Die Prinzipien, die uns leiten",
    values: [
      {
        title: "Kundenerfolg",
        description:
          "Wir messen unseren Erfolg an den Ergebnissen für unsere Kunden. Ihr Wachstum ist unser wichtigstes Ziel und die Grundlage all unseres Handelns.",
      },
      {
        title: "Zusammenarbeit",
        description:
          "Wir glauben an die Kraft der Teamarbeit — intern und mit unseren Kunden. Gemeinsam erreichen wir mehr als jeder für sich.",
      },
      {
        title: "Innovation",
        description:
          "Wir bleiben an der Spitze der Trends und Technologien im Digitalmarketing, um Lösungen zu liefern, die unseren Kunden einen Wettbewerbsvorsprung geben.",
      },
      {
        title: "Exzellenz",
        description:
          "Wir liefern herausragende Qualität in allem, was wir tun — von der Strategie bis zu Umsetzung und Reporting.",
      },
      {
        title: "Integrität",
        description:
          "Wir handeln ehrlich, transparent und ethisch. Wir tun das Richtige für unsere Kunden, auch wenn es nicht der einfachste Weg ist.",
      },
      {
        title: "Verantwortung",
        description:
          "Wir übernehmen Verantwortung für unsere Gemeinschaft und die Umwelt — durch nachhaltige Praktiken und lokales Engagement.",
      },
    ],
    inAction: {
      title: "Unsere Werte in der Praxis",
      imageAlt: "Die Werte von Creative Surf in der Praxis",
      subtitle: "Wie wir unsere Werte täglich leben",
      body:
        "Unsere Werte sind keine Absichtserklärungen — sie zeigen sich in unserer täglichen Arbeit und in unseren Entscheidungen. Von der Teamstruktur bis zum Umgang mit Kundenherausforderungen sind sie überall verankert.",
      points: [
        "Wir feiern Kundenerfolge wie unsere eigenen",
        "Wir investieren in kontinuierliches Lernen und Entwicklung",
        "Wir liefern transparentes Reporting und ehrliches Feedback",
        "Wir unterstützen gemeinnützige Initiativen und nachhaltige Praktiken",
      ],
    },
    community: {
      title: "Unser gesellschaftliches Engagement",
      items: [
        {
          title: "Bildungsinitiativen",
          description:
            "Wir arbeiten mit Schulen und Hochschulen zusammen, um Studierenden Digitalmarketing-Wissen und Praktikumsplätze zu bieten.",
        },
        {
          title: "Umweltengagement",
          description:
            "Unsere Nachhaltigkeitsmaßnahmen umfassen die Reduzierung unseres CO₂-Fußabdrucks, papierlose Prozesse und gemeinsame Aufräumaktionen.",
        },
        {
          title: "Unterstützung von NGOs",
          description:
            "Jedes Jahr unterstützen wir ausgewählte gemeinnützige Organisationen pro bono im Digitalmarketing, damit ihre Wirkung größer wird.",
        },
      ],
    },
    cta: {
      title: "Teilen Sie unsere Werte?",
      body:
        "Wenn unsere Werte Ihnen zusagen, sprechen wir gerne darüber, wie wir zusammenarbeiten können — als Kunde, Partner oder Teammitglied.",
      contact: "Kontakt aufnehmen",
      join: "Team beitreten",
    },
  } satisfies PartialCopy<typeof aboutValuesMessages.en>;

const ns_auth = {
    brand: "Creative Surf",

    loginTitle: "Willkommen zurück",
    loginSubtitle: "Melden Sie sich bei Ihrem Creative-Surf-Konto an",
    identifier: "E-Mail",
    identifierPlaceholder: "sie@beispiel.com",
    password: "Passwort",
    passwordPlaceholder: "Passwort eingeben",
    signIn: "Anmelden",
    signingIn: "Anmeldung läuft…",
    invalidCredentials: "Ungültige Zugangsdaten",
    noAccount: "Neu bei Creative Surf?",
    createOne: "Konto erstellen",

    registerTitle: "Konto erstellen",
    registerSubtitle: "Wir senden Ihnen einen Code per E-Mail zur Bestätigung",
    name: "Vollständiger Name",
    namePlaceholder: "Ihr Name",
    email: "E-Mail",
    emailPlaceholder: "sie@beispiel.com",
    choosePassword: "Passwort",
    choosePasswordPlaceholder: "Mindestens 8 Zeichen",
    passwordHint: "Mindestens 8 Zeichen mit einem Buchstaben und einer Ziffer.",
    createAccount: "Konto erstellen",
    creatingAccount: "Code wird gesendet…",
    haveAccount: "Sie haben bereits ein Konto?",
    signInLink: "Anmelden",

    otpTitle: "Prüfen Sie Ihr Postfach",
    otpSubtitle: "Wir haben einen 6-stelligen Code an {email} gesendet. Er läuft in 10 Minuten ab.",
    otpLabel: "Bestätigungscode",
    verify: "Bestätigen & fortfahren",
    verifying: "Wird bestätigt…",
    resend: "Code erneut senden",
    resendIn: "Erneut senden in {seconds}s",
    resent: "Ein neuer Code ist unterwegs.",
    changeEmail: "Andere E-Mail verwenden",

    googleContinue: "Weiter mit Google",
    orDivider: "oder",

    dashboard: "Übersicht",
    profileDetails: "Profildaten",
    displayName: "Anzeigename",
    edit: "Bearbeiten",
    save: "Speichern",
    saving: "Wird gespeichert…",
    cancel: "Abbrechen",
    nameUpdated: "Name aktualisiert.",
    usersTitle: "Benutzer",
    administrators: "Administratoren",
    members: "Mitglieder",
    noMembers: "Noch keine Mitglieder",
    joined: "Beigetreten",
    lastSeen: "Zuletzt gesehen",
    never: "Nie",
    signInMethod: "Anmeldemethode",
    methodPassword: "Passwort",
    methodGoogle: "Google",
    methodBoth: "Passwort + Google",
    accountTitle: "Ihr Konto",
    accountGreeting: "Hallo {name}",
    accountEmail: "E-Mail",
    accountRole: "Kontotyp",
    roleAdmin: "Administrator",
    roleUser: "Mitglied",
    memberSince: "Mitglied seit",
    profileOverview: "Überblick",
    profileAbout: "Über",
    savedCvsTitle: "Gespeicherte Lebensläufe",
    allCvsTitle: "Alle Lebensläufe",
    statCvs: "Lebensläufe",
    statPeople: "Personen",
    cvsEmptyMember: "Sie haben noch keinen Lebenslauf erstellt.",
    cvsEmptyAdmin: "Bisher hat niemand einen Lebenslauf erstellt.",
    createFirstCv: "Ersten Lebenslauf erstellen",
    downloadPdf: "PDF herunterladen",
    viewCv: "Ansehen",
    closePreview: "Vorschau schließen",
    openCv: "Öffnen",
    openCvCopy: "Kopie bearbeiten",
    deleteCv: "Löschen",
    deleteCvConfirm: "Diesen gespeicherten Lebenslauf löschen? Das lässt sich nicht rückgängig machen.",
    peopleTitle: "Personen",
    peopleSubtitle: "Alle mit einem Konto auf der Website.",
    makeAdmin: "Zum Administrator machen",
    makeMember: "Zum Mitglied machen",
    roleChangeConfirm: "{name} zu {role} ändern?",
    deleteUser: "Konto löschen",
    deleteUserConfirm: "{name} löschen? Konto und gespeicherte Lebensläufe werden endgültig entfernt. Das lässt sich nicht rückgängig machen.",
    youBadge: "Sie",
    tabPeople: "Alle Nutzer",
    tabCvs: "Alle CVs",
    tabChats: "KI-Chats",
    chatsTitle: "Assistent-Gespräche",
    chatsSubtitle: "Was Besucher den Assistenten gefragt haben.",
    statChats: "Gespräche",
    chatsEmpty: "Bisher hat niemand den Assistenten genutzt.",
    chatsLoadFailed: "Gespräche konnten nicht geladen werden.",
    chatVisitor: "Besucher",
    chatSignedIn: "Angemeldet",
    chatAnonymous: "Anonymer Besucher",
    chatTurns: "{count} Nachrichten",
    chatStartedOn: "Gestartet auf",
    chatOpen: "Gespräch lesen",
    chatCollapse: "Gespräch ausblenden",
    chatDelete: "Gespräch löschen",
    chatDeleteConfirm: "Dieses Gespräch löschen? Das lässt sich nicht rückgängig machen.",
    userSearch: "Nutzer durchsuchen",
    userNoMatches: "Keine Nutzer passen zu dieser Suche.",
    chatSearch: "Gespräche durchsuchen",
    chatNoMatches: "Keine Gespräche passen zu dieser Suche.",
    accountSignedInWith: "Angemeldet mit",
    adminPanel: "Zu den Admin-Blogs",
    signOut: "Abmelden",
    signingOut: "Abmeldung läuft…",

    errorGoogleUnavailable: "Die Google-Anmeldung ist noch nicht eingerichtet.",
    errorGoogleDenied: "Die Google-Anmeldung wurde abgebrochen.",
    errorGoogleState: "Dieser Anmeldelink ist abgelaufen. Bitte erneut versuchen.",
    errorGoogleUnverified: "Dieses Google-Konto hat keine bestätigte E-Mail-Adresse.",
    errorGoogleFailed: "Die Google-Anmeldung ist fehlgeschlagen. Bitte erneut versuchen.",
    genericError: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    footer: "Creative Surf",
  } satisfies PartialCopy<typeof authMessages.en>;

const ns_blogPost = {
    notFound: "Beitrag nicht gefunden",
    backToBlogs: "← Zurück zum Blog",
    backToBlogsShort: "Zurück zum Blog",
    back: "Zurück",
    backToAll: "Zurück zu allen Artikeln",
    edit: "Bearbeiten",
    delete: "Löschen",
    confirmDelete: "Diesen Beitrag löschen? Das kann nicht rückgängig gemacht werden.",
    writtenBy: "Geschrieben von",
    share: "Teilen",
    keyTakeaways: "Kernaussagen",
    seo: {
      inboundReal: "Passend dazu bei Creative Surf Immobilien",
      inbound: "Passend dazu bei Creative Surf",
      outbound: "Externe Ressourcen",
    },
  } satisfies PartialCopy<typeof blogPostMessages.en>;

const ns_blogs = {
    eyebrow: "Creative Surf · Blog",
    title: "Einblicke & Ideen",
    subtitle:
      "Expertenwissen zu Digitalmarketing, UX-Design, SEO und Markenstrategie — direkt vom Creative-Surf-Team.",
    categoryAll: "Alle",
    newPost: "Neuer Beitrag",
    logout: "Abmelden",
    emptyTitle: "Noch keine Beiträge",
    emptyAdmin: "Erstellen Sie Ihren ersten Blogbeitrag, um zu starten.",
    emptyPublic: "Schauen Sie bald wieder vorbei — für Einblicke vom Creative-Surf-Team.",
    writeFirst: "Ersten Beitrag schreiben",
    edit: "Bearbeiten",
    delete: "Löschen",
    confirmDelete: '„{title}“ löschen? Das kann nicht rückgängig gemacht werden.',
    read: "Lesen →",
    brand: "Creative Surf",
    like: "Gefällt mir",
    comment: "Kommentieren",
    share: "Teilen",
    likesCount: "{count} Likes",
    likeCountOne: "1 Like",
    commentsCount: "{count} Kommentare",
    commentCountOne: "1 Kommentar",
    sharesCount: "{count} Mal geteilt",
    shareCountOne: "1 Mal geteilt",
    viewsCount: "{count} Aufrufe",
    viewCountOne: "1 Aufruf",
    shareInstagram: "Link für Instagram kopieren",
    copyLink: "Link kopieren",
    copy: "Kopieren",
    copied: "Kopiert",
    close: "Schließen",
    commentsTitle: "Kommentare",
    noComments: "Noch keine Kommentare — teilen Sie als Erste(r) Ihre Gedanken.",
    yourName: "Ihr Name",
    writeComment: "Kommentar schreiben…",
    postComment: "Senden",
    posting: "Wird gesendet…",
    commentFailed: "Kommentar konnte nicht gesendet werden. Bitte erneut versuchen.",
    signInToComment: "Melden Sie sich an, um mitzureden.",
    signInToCommentAction: "Anmelden",
    createAccountAction: "Kostenloses Konto erstellen",
    commentingAs: "Sie kommentieren als {name}",
    deleteComment: "Kommentar löschen",
    confirmDeleteComment: "Diesen Kommentar löschen? Das lässt sich nicht rückgängig machen.",
    deleteCommentFailed: "Kommentar konnte nicht gelöscht werden. Bitte erneut versuchen.",
    editComment: "Bearbeiten",
    saveComment: "Speichern",
    cancelEdit: "Abbrechen",
    editedLabel: "bearbeitet",
    editCommentFailed: "Änderungen konnten nicht gespeichert werden. Bitte erneut versuchen.",
    composerPrompt: "Woran denken Sie?",
    categoriesTitle: "Feed",
    loadMore: "Weitere Beiträge laden",
    allCaughtUp: "Sie sind auf dem neuesten Stand",
    readFullPost: "Ganzen Beitrag lesen",
    viewAllComments: "Alle {count} Kommentare ansehen",
    hideComments: "Kommentare ausblenden",
    timeJustNow: "Gerade eben",
    timeMinutes: "{count} Min.",
    timeHours: "{count} Std.",
    timeDays: "{count} T.",
    timeWeeks: "{count} Wo.",
    trendingTitle: "Angesagt",
    postsLabel: "Beiträge",
    topicsLabel: "Themen",
    loginToPost: "Zum Posten anmelden",
  } satisfies PartialCopy<typeof blogsMessages.en>;

const ns_chat = {
    open: "Chatten Sie mit uns",
    close: "Chat schließen",
    bubble: "Frag Surf!",
    title: "Surf fragen",
    subtitle: "Der Assistent von Creative Surf",
    greeting:
      "Hallo — ich bin Surf, der Assistent dieser Website. Fragen Sie mich, was Creative Surf macht, oder alles zu SEO, Anzeigen, Content und Conversion.",
    disclaimer:
      "KI-Assistent. Er kann sich irren — prüfen Sie Wichtiges bitte mit dem Team.",
    placeholder: "Stellen Sie eine Frage…",
    send: "Senden",
    stop: "Stopp",
    thinking: "Denkt nach…",
    clear: "Neuer Chat",
    error: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    suggestions: [
      "Was macht Creative Surf?",
      "Wie bekomme ich mehr organischen Traffic?",
      "Können Sie bei Google Ads helfen?",
      "Wie erreiche ich Sie?",
    ],
  } satisfies PartialCopy<typeof chatMessages.en>;

const ns_common = {
    cta: {
      getStarted: "Loslegen",
      startProject: "Projekt starten",
      contactUs: "Kontakt aufnehmen",
      talkToUs: "Sprechen wir",
      learnMore: "Mehr erfahren",
      readMore: "Weiterlesen",
      seeMore: "Mehr anzeigen",
      viewAll: "Alle ansehen",
      getProposal: "Angebot anfordern",
      getQuote: "Kostenloses Angebot",
      bookCall: "Termin buchen",
      requestAudit: "Kostenloses Audit anfordern",
      exploreServices: "Leistungen entdecken",
      backHome: "Zurück zur Startseite",
      goBack: "Zurück",
      submit: "Absenden",
      send: "Senden",
      cancel: "Abbrechen",
      save: "Speichern",
      close: "Schließen",
      next: "Weiter",
      previous: "Zurück",
    },
    labels: {
      loading: "Lädt…",
      error: "Etwas ist schiefgelaufen",
      retry: "Erneut versuchen",
      required: "Erforderlich",
      optional: "Optional",
      search: "Suchen",
      readingTime: "{minutes} Min. Lesezeit",
      published: "Veröffentlicht",
      updated: "Aktualisiert",
      by: "von",
      all: "Alle",
      language: "Sprache",
      chooseLanguage: "Sprache wählen",
      menu: "Menü",
      toggleMenu: "Menü umschalten",
    },
    breadcrumb: {
      home: "Startseite",
      about: "Über uns",
      services: "Leistungen",
      blogs: "Blog",
      seoLeadGen: "SEO & Leadgenerierung",
      organicSearch: "Organische Suche",
      digitalAdvertising: "Digitale Werbung",
      ecommerce: "E-Commerce",
      digitalMarketing: "Digitalmarketing",
      digitalIntelligence: "Digital Intelligence",
      uxInteractive: "UX & Interaktiv",
      design: "Design",
      realEstate: "Immobilien",
      projects: "Projekte",
    },
  } satisfies PartialCopy<typeof commonMessages.en>;

const ns_contact = {
    metaTitle: "Kontakt | Creative Surf",
    metaDescription:
      "Interessiert an einer Zusammenarbeit mit Creative Surf? Kontaktieren Sie uns noch heute für eine personalisierte Social-Media-Strategie.",
    headerLine1: "Interessiert an einer Zusammenarbeit mit Creative Surf? Lassen Sie uns Ihre Marke gemeinsam stärken!",
    headerLine2: "Kontaktieren Sie uns noch heute, um eine personalisierte Social-Media-Strategie zu entdecken, die speziell für Sie entwickelt wurde.",
    form: {
      name: "Name",
      firstName: "Vorname",
      lastName: "Nachname",
      required: "(erforderlich)",
      company: "Firmenname (falls zutreffend)",
      email: "E-Mail",
      socialUrl: "Social Media URL",
      socialPlaceholder: "http://",
      servicesTitle: "An welchen Dienstleistungen sind Sie interessiert?",
      serviceOptions: [
        "Social Media Management",
        "Social Media Audit",
        "Content Erstellung",
        "Pinterest Management",
        "Ich sehe nicht, was ich suche, können wir chatten?",
      ],
      comments: "Zusätzliche Anmerkungen zu Ihren Vorstellungen (Zeitplan, Anforderungen, Budget usw.)",
      howDidYouHear: "Wie haben Sie von uns erfahren?",
      submit: "ABSENDEN",
      submitting: "WIRD GESENDET...",
      errorGeneric: "Bitte füllen Sie alle erforderlichen Felder aus.",
      errorNetwork: "Netzwerkfehler. Bitte versuchen Sie es erneut.",
      successTitle: "Vielen Dank!",
      successBody: "Wir freuen uns darauf, mit Ihnen zusammenzuarbeiten! Wir werden Ihre Nachricht prüfen.",
      sendAnother: "Weitere Nachricht senden",
    },
    kicker: "Kontakt aufnehmen",
    errorServices: "Bitte wählen Sie mindestens eine Leistung aus.",
    badges: [
      "Antwort innerhalb von 24 h",
      "100 % Datenschutz",
      "150+ Marken beschleunigt"
    ],
    cards: {
      whatsappTitle: "Strategie-Chat auf WhatsApp",
      whatsappBody: "Brauchen Sie sofort eine Antwort? Schreiben Sie unseren Kampagnenleitern direkt auf WhatsApp.",
      whatsappCta: "Auf WhatsApp chatten",
      emailTitle: "Direktes E-Mail-Postfach",
      emailBody: "Senden Sie Ausschreibungen, ausführliche Briefings oder Kooperationsanfragen direkt an unser Team.",
      emailCopy: "E-Mail-Adresse kopieren",
      emailCopied: "E-Mail kopiert!",
      hqTitle: "Agenturzentrale",
      hqLocation: "Dhaka, Bangladesch",
      hqHours: "Mo–Fr: 9:00 – 18:00 Uhr (GMT+6)",
      hqAvailable: "Offen für neue Projekte"
    },
    faqKicker: "Fragen?",
    faqTitle: "Häufig gestellte",
    faqAccent: "Fragen.",
    faq: [
      {
        q: "Wie schnell antwortet Creative Surf auf meine Anfrage?",
        a: "Wir prüfen jede Anfrage sorgfältig und melden uns innerhalb von 24 Geschäftsstunden mit einem ersten, auf Ihre Marke zugeschnittenen Beratungsplan."
      },
      {
        q: "Was umfasst ein Social-Media-Audit?",
        a: "Unser Audit analysiert Ihre Profilleistung, das Engagement Ihrer Zielgruppe, Ihr visuelles Branding, Ihre Content-Hooks und Ihre Wettbewerbsposition — mit konkreten Wachstumsschritten."
      },
      {
        q: "Können Sie ein Paket auf mein Budget und meine Ziele zuschneiden?",
        a: "Ja! Jede Vereinbarung passen wir an Ihre Kanäle, Ihre Posting-Frequenz, Ihr Werbebudget und Ihren gewünschten Wachstumszeitplan an."
      },
      {
        q: "Betreuen Sie organische Inhalte und bezahlte Kampagnen?",
        a: "Full-Funnel-Strategie ist unsere Kernkompetenz: Wir verbinden starke organische Inhalte mit ROI-orientierten bezahlten Kampagnen."
      },
      {
        q: "Wie läuft das Onboarding ab, wenn wir zusammenarbeiten?",
        a: "Nach Ihrer Anfrage folgt ein kurzes Kennenlerngespräch, ein individuelles Angebot, die Abstimmung der wichtigsten Assets und der Start innerhalb von 5–7 Werktagen."
      }
    ],
  } satisfies PartialCopy<typeof contactMessages.en>;

const ns_cvTeaser = {
    hero: {
      title: "Ihr Lebenslauf",
      titleHighlight: "in 60 Sekunden",
      subtitle: "Fügen Sie Ihre groben Notizen und die Stellenanzeige ein. Sie bekommen einen Lebenslauf, der nur auf Ihren echten Erfahrungen beruht — bewertet gegen diese Anzeige, und als kostenloses PDF für Sie.",
      ctaPrimary: "Lebenslauf erstellen",
      trust: ["Nichts erfunden","Kostenloses PDF, keine Exportgebühr","ATS-sichere Einspaltigkeit"],
    },
  } satisfies PartialCopy<typeof cvTeaserMessages.en>;

const ns_cvBuilder = {
    metaTitle: "Kostenloser KI-Lebenslauf-Generator — ATS-sicher | Creative Surf",
    metaDescription:
      "Aus Stichpunkten wird ein Lebenslauf, den Recruiter lesen wollen. Stellenanzeige einfügen, offene Anforderungen sehen und ein kostenloses ATS-sicheres PDF laden. Wir erfinden keine Arbeitgeber, Daten oder Zahlen.",
    hero: {
      ...ns_cvTeaser.hero,
      badge: "Kostenlos · Ohne Anmeldung",
      ctaSecondary: "Beispiel-Lebenslauf ansehen",
    },
    stats: [
      { value: "~60s", label: "Von Stichpunkten zum fertigen PDF" },
      { value: "0", label: "Bezahlschranken vor dem Download" },
      { value: "6", label: "Sprachen für Ihren Lebenslauf" },
    ],
    import: {
      title: "Schon einen Lebenslauf?",
      subtitle:
        "Laden Sie eine PDF- oder Word-Datei (.docx) hoch und sehen Sie sofort ihren ATS-Score. Wir füllen auch das Formular aus – verbessern ist dann nur ein Klick.",
      button: "Lebenslauf hochladen",
      reading: "Lebenslauf wird gelesen…",
      success: "Ihr Lebenslauf ist mit seinem ATS-Score in der Vorschau, und das Formular ist ausgefüllt. Generieren Sie für eine verbesserte Version.",
      failed: "Dieser Lebenslauf konnte nicht gelesen werden. Versuchen Sie eine andere Datei oder füllen Sie das Formular von Hand aus.",
    },
    guestNotice: {
      title: "Sie erstellen ohne Konto",
      subtitle: "Erstellen und laden Sie Ihren Lebenslauf ohne Anmeldung herunter — er gehört dann zu keinem Konto, Sie können ihn später also nicht erneut öffnen. Ein kostenloses Konto behält Ihre Lebensläufe an einem Ort.",
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
      links: "Links (optional)",
      photo: "Foto (optional)",
      photoAdd: "Foto hochladen",
      photoChange: "Foto ersetzen",
      photoRemove: "Entfernen",
      photoReading: "Wird vorbereitet…",
      photoFailed: "Dieses Foto konnte nicht gelesen werden. Bitte eine andere Datei wählen.",
      photoTooLarge: "Dieses Foto ist zu groß. Bitte ein kleineres Bild wählen.",
      photoHint:
        "In weiten Teilen Europas, Asiens und Lateinamerikas gehört ein Foto zum Lebenslauf; in Großbritannien, den USA und Kanada wird es aussortiert, bevor ein Mensch den Lebenslauf sieht. Lassen Sie das Feld leer, wenn Sie sich dort bewerben.",
      languages: "Sprachen (optional)",
      languageName: "Sprache",
      languageLevel: "Niveau",
      languageAdd: "Weitere Sprache hinzufügen",
      languageRemove: "Diese Sprache entfernen",
      languagePlaceholder: "Deutsch",
      languagesHint:
        "Ihr Niveau steht im Lebenslauf genau so, wie Sie es hier angeben — wir runden es nie zugunsten der Ausschreibung auf.",
      linkLabel: "Link",
      linkType: "Typ",
      linkAdd: "Weiteren Link hinzufügen",
      linkRemove: "Diesen Link entfernen",
      linksHint:
        "Fügen Sie einen Link ein — LinkedIn, GitHub, Ihre eigene Website, was immer Sie möchten. Wählen Sie daneben aus, worum es sich handelt. Ein „Andere“-Link wird im Lebenslauf nach der Website benannt, auf die er zeigt — fügen Sie deshalb die vollständige Adresse ein und nicht nur den Benutzernamen.",
    },
    fields: {
      fullName: { label: "Vollständiger Name", placeholder: "Alex Morgan" },
      jobTitle: { label: "Zielposition oder aktueller Titel", placeholder: "Senior Frontend-Entwickler" },
      email: { label: "E-Mail", placeholder: "alex@example.com" },
      phone: { label: "Telefon", placeholder: "+49 151 23456789" },
      location: { label: "Standort", placeholder: "Berlin, Deutschland" },
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
      effort: { label: "Aufwand" },
    },
    languageLevels: {
      native: "Muttersprache",
      fluent: "Fließend",
      professional: "Verhandlungssicher",
      intermediate: "Mittelstufe",
      basic: "Grundkenntnisse",
    },
    linkTypes: {
      linkedin: "LinkedIn",
      github: "GitHub",
      portfolio: "Portfolio",
      other: "Andere",
    },
    linkPlaceholders: {
      linkedin: "linkedin.com/in/alexmorgan",
      github: "github.com/alexmorgan",
      portfolio: "alexmorgan.dev",
      scholar: "scholar.google.com/citations?user=…",
      orcid: "orcid.org/0000-0002-1825-0097",
      behance: "behance.net/alexmorgan",
      researchgate: "researchgate.net/profile/Alex-Morgan",
      kaggle: "kaggle.com/alexmorgan",
      leetcode: "leetcode.com/u/alexmorgan",
      medium: "medium.com/@alexmorgan",
      other: "dribbble.com/alexmorgan",
    },
    efforts: {
      high: "Hoch",
      low: "Niedrig",
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
      view: "Ansehen",
      startOver: "Formular leeren",
    },
    wizard: {
      label: "Schritte",
      stepOf: "Schritt {current} von {total}",
      back: "Zurück",
      next: "Weiter",
      nextTo: "Weiter: {step}",
      filled: "Ausgefüllt",
      add: "Hinzufügen",
      jump: "Zu Schritt {n}: {step}",
      short: { basics: "Über Sie", profiles: "Links", experience: "Erfahrung", education: "Ausbildung", target: "Ziel" },
      profiles: "Links & Sprachen",
      profilesHint: "Wo Recruiter Ihre Arbeit sehen können, und die Sprachen, in denen Sie arbeiten. Beides optional.",
      experience: "Berufserfahrung",
      experienceHint: "Jede Position, die auf die Seite soll. Halbe Sätze und Tippfehler stören nicht — Inhalt zählt mehr als Form.",
      education: "Ausbildung & Kenntnisse",
      educationHint: "Abschlüsse und Kurse, dann die Werkzeuge und Stärken, in denen Sie sich gern prüfen lassen.",
      ready: "Bereit, wenn Sie es sind",
      readyHint: "Alles Weitere ist optional. Jetzt erstellen, oder zuerst die Anzeige einfügen — für einen schärferen Lebenslauf und eine Trefferquote.",
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
    ats: {
      title: "ATS-Tauglichkeit",
      caption: "{passed} von {total} Prüfungen bestanden",
      tiers: { strong: "ATS-tauglich", good: "Fast so weit", weak: "Noch Luft nach oben" },
      tierHints: {
        strong: "Ein Bewerbersystem kann jeden Teil dieses Lebenslaufs lesen. Hier bremst Sie nichts.",
        good:
          "Lesbar, aber an den Punkten unten verlieren Lebensläufe still und leise Punkte. Beheben Sie, was geht, und erstellen Sie neu.",
        weak:
          "Ein Bewerbermanagementsystem wird damit Mühe haben. Arbeiten Sie die Fehlschläge unten ab — die meisten löst mehr Detail in Ihren Notizen.",
      },
      note:
        "Bewertet wird die Mechanik, die ein Bewerbersystem zuerst liest: Struktur, Daten, Zahlen, Kontaktangaben. Das ist eine andere Frage als die Übereinstimmung mit der Anzeige — ein Lebenslauf kann das eine gut und das andere schlecht können.",
      checks: {
        contact: {
          label: "Kontaktangaben vollständig",
          fix: "Ergänzen Sie Telefonnummer und Standort — ein Parser sucht beides im Kopfbereich.",
        },
        profileLinks: {
          label: "Mindestens ein Profil-Link",
          fix:
            "Ergänzen Sie oben LinkedIn, persönliche Website oder GitHub. Die meisten Recruiter öffnen einen davon vor dem Anruf.",
        },
        headline: {
          label: "Kurze, konkrete Kopfzeile",
          fix: "Die Kopfzeile fehlt oder ist zu lang. Eine präzisere Zielposition im Formular behebt das.",
        },
        summary: {
          label: "Profil hat die richtige Länge",
          fix: "Zielen Sie auf 25 bis 130 Wörter. Kürzer sagt nichts, länger wird übersprungen.",
        },
        experienceDepth: {
          label: "Jede Station ist ausreichend beschrieben",
          fix:
            "Einige Stationen haben weniger als drei Stichpunkte. Ergänzen Sie in der Berufserfahrung, was Sie dort getan haben.",
        },
        dates: {
          label: "Jede Station ist datiert",
          fix:
            "Eine Station ohne Daten kann ein Parser nicht einordnen. Ergänzen Sie Jahreszahlen in der Berufserfahrung.",
        },
        metrics: {
          label: "Erfolge sind messbar",
          fix:
            "Zu wenige Stichpunkte enthalten eine Zahl. Ergänzen Sie Teamgrößen, Prozente, Budgets oder Zeiträume, an die Sie sich wirklich erinnern.",
        },
        bulletLength: {
          label: "Stichpunkte in lesbarer Länge",
          fix:
            "Mehrere Stichpunkte sind sehr kurz oder zu lang. Sechs bis dreißig Wörter lesen sich am besten.",
        },
        skills: {
          label: "Kenntnisse gruppiert und konkret",
          fix: "Nennen Sie mehr Kenntnisse — genug für mindestens zwei Gruppen.",
        },
        firstPerson: {
          label: "Ohne „ich“ und „mein“ geschrieben",
          fix: "Ein Lebenslauf steht in der gedachten Ich-Form. Neu erstellen behebt das meist.",
        },
        length: {
          label: "Gesamtlänge stimmt",
          fix:
            "Zielen Sie auf etwa 300 bis 850 Wörter. Ergänzen Sie Ihre Notizen, wenn es dünn ist, kürzen Sie, wenn es ausufert.",
        },
      },
    },
    match: {
      title: "Übereinstimmung mit der Anzeige",
      lockedTitle: "Trefferquote gesperrt",
      lockedBody:
        "Fügen Sie die Stellenanzeige unter „Ziel & Tonalität“ ein, dann bewerten wir diesen Lebenslauf gegen das, was dieser Arbeitgeber tatsächlich verlangt.",
      ungradedTitle: "Diesmal nicht bewertet",
      ungradedBody:
        "Wir konnten diesen Lebenslauf gerade nicht gegen die Anzeige bewerten. Ein erneutes Erstellen hilft meist — und eine Zahl, für die wir nicht geradestehen können, ist schlechter als gar keine.",
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
          title: "Sechs Sprachen, ein Werdegang",
          body:
            "Schreiben Sie denselben Lebenslauf auf Englisch, Französisch, Deutsch, Spanisch, Arabisch oder Bengalisch, unabhängig von der Sprache der Website. Nützlich, wenn Sie sich in Europa, am Golf und in Südasien bewerben.",
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
          label: "Lebenslauf in sechs Sprachen",
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
  } satisfies PartialCopy<typeof cvBuilderMessages.en>;




const ns_editor = {
    editPost: "Beitrag bearbeiten",
    newPost: "Neuer Beitrag",
    preview: "Vorschau",
    editorMode: "Editor",
    untitled: "Beitrag ohne Titel",
    noContent: "*Noch kein Inhalt…*",
    titlePlaceholder: "Titel des Beitrags…",
    excerptLabel: "Auszug / Zusammenfassung",
    excerptPlaceholder: "Eine kurze Zusammenfassung, die in Beitragslisten erscheint…",
    contentLabel: "Inhalt",
    contentPlaceholder:
      "Beginnen Sie zu schreiben — nutzen Sie die Symbolleiste für Überschriften, Fett, Kursiv, Listen und Bilder…",
    categoryLabel: "Kategorie",
    coverImageLabel: "Titelbild",
    tagsLabel: "Schlagwörter",
    tagPlaceholder: "Schlagwort eingeben + Enter",
    authorsLabel: "Geschrieben von",
    authorPlaceholder: "Name eingeben + Enter",
    tipsTitle: "Editor-Tipps",
    tips: [
      "Nutzen Sie das Stil-Dropdown für Überschriften — sie erscheinen beim Tippen in voller Größe.",
      "Markieren Sie Text und klicken Sie auf B, I oder Unterstreichen, um ihn zu formatieren.",
      "Klicken Sie auf das Bildsymbol, um Fotos hochzuladen — sie erscheinen direkt im Beitrag.",
      "Nutzen Sie die Vorschau oben, um das endgültige Layout zu sehen.",
    ],
    saving: "Wird gespeichert…",
    updatePost: "Beitrag aktualisieren",
    publishPost: "Beitrag veröffentlichen",
    errors: {
      titleRequired: "Titel ist erforderlich.",
      slugRequired: "Slug ist erforderlich.",
      contentRequired: "Inhalt ist erforderlich.",
      saveFailed: "Speichern fehlgeschlagen. Bitte erneut versuchen.",
      network: "Netzwerkfehler. Bitte erneut versuchen.",
    },
  } satisfies PartialCopy<typeof editorMessages.en>;

const ns_editorUi = {
    seo: {
      metaDescriptionLabel: "Meta-Description",
      metaPlaceholder:
        "Eine knappe Zusammenfassung für Google-Suchergebnisse (150–160 Zeichen empfohlen)…",
      fallbackHint: "Ohne Eingabe wird der Auszug verwendet",
      characters: "{count} Zeichen",
      idealLength: "Ideale Länge",
      considerShortening: "Kürzen empfohlen",
      inboundTitle: "Interne Links",
      outboundTitle: "Externe Links",
      inboundHint:
        "Interne Links auf Ihre Website. Verwenden Sie die vollständige URL (https://…). Bezeichnung und URL sind Pflichtfelder.",
      outboundHint: "Externe Links zu vertrauenswürdigen Quellen. Bezeichnung und URL sind Pflichtfelder.",
      removeLink: "Link entfernen",
    },
    takeaways: {
      label: "Kernaussagen",
      hint: "Ein paar kurze Stichpunkte, die den Beitrag zusammenfassen. Erscheinen in einer Karte über dem Artikel.",
      placeholder: "z. B. Sprachabdeckung allein reicht für kultursensible KI nicht aus.",
      itemLabel: "Kernaussage {number}",
      add: "Kernaussage hinzufügen",
      remove: "Kernaussage entfernen",
      moveUp: "Nach oben",
      moveDown: "Nach unten",
      count: "{count} / {max}",
    },
    upload: {
      urlPlaceholder: "https://…",
      uploading: "Wird hochgeladen…",
      prompt: "Klicken oder Bild hierher ziehen",
      addPhoto: "Foto hinzufügen",
      chooseImage: "Bitte wählen Sie eine Bilddatei.",
      chooseImagesOnly: "Bitte wählen Sie ausschließlich Bilddateien.",
      failed: "Upload fehlgeschlagen. Versuchen Sie eine andere Datei.",
      couldNotRead: "Datei konnte nicht gelesen werden",
      couldNotLoad: "Bild konnte nicht geladen werden",
    },
    toolbar: {
      placeholder: "Beginnen Sie, Ihren Beitrag zu schreiben…",
      normalText: "Normaler Text",
      bold: "Fett",
      italic: "Kursiv",
      underline: "Unterstrichen",
      bulletList: "Aufzählung",
      numberedList: "Nummerierte Liste",
      quote: "Zitat",
      insertLink: "Link einfügen",
      linkPrompt: "Link-URL",
      insertImage: "Bild einfügen",
      divider: "Trennlinie",
      undo: "Rückgängig",
      redo: "Wiederholen",
    },
  } satisfies PartialCopy<typeof editorUiMessages.en>;

const ns_footer = {
    badge: "Sprechen wir",
    headlineLine1: "Bauen wir etwas",
    headlineAccent: "Unglaubliches.",
    blurb: "Kreativität, Strategie und Technologie vereint, um die Zukunft Ihrer Marke zu gestalten.",
    cta: "Projekt starten",
    exploreTitle: "Entdecken",
    contactTitle: "Kontakt",
    whatsapp: "Auf WhatsApp chatten",
    links: {
      home: "Startseite",
      services: "Leistungen",
      blogs: "Blog",
      about: "Über uns",
      contact: "Kontakt",
    },
    location: "Dhaka, Bangladesch",
    rights: "© {year} Creative Surf. Alle Rechte vorbehalten.",
    terms: "Nutzungsbedingungen",
    privacy: "Datenschutzerklärung",
    craftedPre: "Gestaltet mit",
    craftedAccent: "Aurora",
    craftedPost: "Energie",
    logoAlt: "Creative Surf",
  } satisfies PartialCopy<typeof footerMessages.en>;

const ns_home = {
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
  } satisfies PartialCopy<typeof homeMessages.en>;

const ns_kit = {
    areasKicker: "Was wir abdecken",
    areasTitle: "Jeder Blickwinkel,",
    areasAccent: "abgedeckt.",
    featuredKicker: "Im Fokus",
    highlightsKicker: "Warum es zählt",
    explore: "Entdecken",
    learnMore: "Mehr erfahren",
  } satisfies PartialCopy<typeof kitMessages.en>;

const ns_legalPrivacy = {
    metaTitle: "Datenschutzerklärung",
    metaDescription: "Datenschutzerklärung für die Website und die Leistungen von Creative Surf.",
    breadcrumbCurrent: "Datenschutzerklärung",
    title: "Datenschutzerklärung",
    lastUpdated: "Zuletzt aktualisiert: Juni 2026",
    sections: [
      {
        heading: "1. Einleitung",
        blocks: [
          { type: "p", text: "Creative Surf („das Unternehmen“, „wir“, „uns“) respektiert Ihre Privatsphäre und schützt Ihre personenbezogenen Daten. Diese Datenschutzerklärung erläutert, wie wir Informationen erheben, nutzen, offenlegen und schützen, wenn Sie unsere Website besuchen, unsere Leistungen nutzen oder mit uns kommunizieren." },
          { type: "p", text: "Mit der Nutzung unserer Website und Leistungen stimmen Sie der Erhebung und Verwendung von Informationen gemäß dieser Datenschutzerklärung zu." },
        ],
      },
      {
        heading: "2. Welche Daten wir erheben",
        blocks: [
          { type: "strong", text: "Personenbezogene Daten" },
          { type: "p", text: "Wir können Informationen erheben, die Sie freiwillig angeben, darunter:" },
          {
            type: "ul",
            items: [
              "Vollständiger Name",
              "E-Mail-Adresse",
              "Telefonnummer",
              "Firmenname",
              "Unternehmenswebsite",
              "Marketingziele und Projektanforderungen",
              "Rechnungsdaten",
            ],
          },
          { type: "strong", text: "Automatisch erhobene Daten" },
          { type: "p", text: "Beim Besuch unserer Website können wir automatisch erfassen:" },
          {
            type: "ul",
            items: [
              "IP-Adresse",
              "Browsertyp",
              "Geräteinformationen",
              "Besuchte Seiten",
              "Verweisende Website",
              "Sitzungsdauer",
              "Analytics-Daten",
            ],
          },
          { type: "strong", text: "Gespräche mit dem Chat-Assistenten" },
          { type: "p", text: "Wenn Sie den Chat-Assistenten auf unserer Website nutzen, speichern wir das vollständige Gespräch — Ihre Nachrichten und die Antworten des Assistenten — zusammen mit der Seite, auf der Sie begonnen haben, Ihrer Sprache und einer anonymen Browser-Kennung. Wenn Sie angemeldet sind, wird das Gespräch mit Ihrem Konto verknüpft. Diese Protokolle werden unbefristet aufbewahrt und sind für unsere Administratoren einsehbar; Ihre Nachrichten werden zudem an unsere KI-Anbieter übermittelt, um eine Antwort zu erzeugen. Bitte geben Sie im Chat keine Passwörter, Zahlungsdaten oder andere sensible Informationen an. Über die unten stehenden Kontaktdaten können Sie jederzeit die Löschung Ihrer Gespräche verlangen." },
        ],
      },
      {
        heading: "3. Wie wir Ihre Daten verwenden",
        blocks: [
          { type: "p", text: "Wir verwenden die erhobenen Daten, um:" },
          {
            type: "ul",
            items: [
              "Marketingleistungen zu erbringen",
              "Anfragen zu beantworten",
              "Beratungstermine zu vereinbaren",
              "Zahlungen abzuwickeln",
              "Website und Leistungen zu verbessern",
              "Service-Updates zu versenden",
              "Berichte und Kampagnen-Insights zu liefern",
              "Gesetzliche Pflichten zu erfüllen",
              "Betrug und Missbrauch vorzubeugen",
            ],
          },
        ],
      },
      {
        heading: "4. Marketing-Kommunikation",
        blocks: [
          { type: "p", text: "Wir können Werbe-E-Mails, Newsletter und Service-Updates versenden. Sie können sich jederzeit über den Abmeldelink in unseren E-Mails abmelden." },
        ],
      },
      {
        heading: "5. Dienste Dritter",
        blocks: [
          { type: "p", text: "Wir können Anbieter Dritter einsetzen, darunter:" },
          {
            type: "ul",
            items: [
              "Meta (Facebook & Instagram)",
              "Google",
              "TikTok",
              "LinkedIn",
              "Analytics-Plattformen",
              "CRM-Systeme",
              "Zahlungsdienstleister",
              "E-Mail-Marketing-Anbieter",
            ],
          },
          { type: "p", text: "Diese Anbieter haben eigene Datenschutzrichtlinien und -praktiken." },
        ],
      },
      {
        heading: "6. Weitergabe von Daten",
        blocks: [
          { type: "p", text: "Wir verkaufen keine personenbezogenen Daten." },
          { type: "p", text: "Wir können Daten weitergeben an:" },
          {
            type: "ul",
            items: [
              "Dienstleister, die uns operativ unterstützen",
              "Werbeplattformen im Rahmen der Kampagnensteuerung",
              "Behörden, sofern gesetzlich vorgeschrieben",
              "Rechtsnachfolger im Fall einer Fusion, Übernahme oder eines Verkaufs",
            ],
          },
        ],
      },
      {
        heading: "7. Datensicherheit",
        blocks: [
          { type: "p", text: "Wir setzen angemessene administrative, technische und organisatorische Schutzmaßnahmen ein. Allerdings kann keine Übertragung über das Internet und kein Speichersystem zu 100 % sicher sein." },
        ],
      },
      {
        heading: "8. Speicherdauer",
        blocks: [
          { type: "p", text: "Wir speichern Daten nur so lange, wie es zur Erbringung der Leistungen, zur Erfüllung gesetzlicher Pflichten, zur Beilegung von Streitigkeiten und zur Durchsetzung von Vereinbarungen erforderlich ist." },
        ],
      },
      {
        heading: "9. Ihre Rechte",
        blocks: [
          { type: "p", text: "Je nach Ihrem Wohnort können Ihnen folgende Rechte zustehen:" },
          {
            type: "ul",
            items: [
              "Auskunft über Ihre personenbezogenen Daten",
              "Berichtigung unrichtiger Daten",
              "Löschung Ihrer Daten",
              "Einschränkung der Verarbeitung",
              "Widerspruch gegen die Verarbeitung",
              "Datenübertragbarkeit",
            ],
          },
          { type: "p", text: "Zur Ausübung dieser Rechte kontaktieren Sie uns über die unten angegebenen Daten." },
        ],
      },
      {
        heading: "10. Cookies",
        blocks: [
          { type: "p", text: "Unsere Website kann Cookies und ähnliche Technologien verwenden, um die Nutzererfahrung zu verbessern, Traffic zu analysieren und Werbemaßnahmen zu unterstützen." },
          { type: "p", text: "Sie können Cookies über die Einstellungen Ihres Browsers steuern." },
        ],
      },
      {
        heading: "11. Datenschutz für Minderjährige",
        blocks: [
          { type: "p", text: "Unsere Leistungen richten sich nicht an Personen unter 18 Jahren. Wir erheben wissentlich keine personenbezogenen Daten von Minderjährigen." },
        ],
      },
      {
        heading: "12. Internationale Datenübermittlung",
        blocks: [
          { type: "p", text: "Ihre Daten können in andere Länder als Ihr eigenes übermittelt und dort verarbeitet werden. Mit der Nutzung unserer Leistungen stimmen Sie solchen Übermittlungen zu." },
        ],
      },
      {
        heading: "13. Änderungen dieser Erklärung",
        blocks: [
          { type: "p", text: "Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Änderungen werden mit Veröffentlichung auf dieser Seite wirksam." },
        ],
      },
    ],
  } satisfies PartialCopy<typeof legalPrivacyMessages.en>;

const ns_legalPrivacyTerms = {
    metaTitle: "Datenschutz & Nutzungsbedingungen",
    metaDescription:
      "Datenschutzerklärung und Nutzungsbedingungen für die Leistungen der Marketingagentur Creative Surf.",
    breadcrumbCurrent: "Datenschutz & Nutzungsbedingungen",
    title: "Datenschutzerklärung & Nutzungsbedingungen",
    lastUpdated: "Zuletzt aktualisiert: 12. März 2025",
    sections: [
      {
        heading: "1. Einleitung",
        blocks: [
          { type: "p", text: "Willkommen bei Creative Surf („wir“, „uns“). Wir schützen Ihre Privatsphäre und bieten Ihnen ein sicheres Online-Erlebnis. Diese Datenschutzerklärung erläutert, wie wir Ihre Daten erheben, nutzen, offenlegen und schützen, wenn Sie unsere Website besuchen oder unsere Leistungen nutzen." },
          { type: "p", text: "Mit dem Zugriff auf unsere Leistungen oder deren Nutzung stimmen Sie dieser Datenschutzerklärung und unseren Nutzungsbedingungen zu. Wenn Sie nicht einverstanden sind, nutzen Sie unsere Leistungen bitte nicht." },
        ],
      },
      {
        heading: "2. Welche Daten wir erheben",
        blocks: [
          { type: "h3", text: "2.1 Personenbezogene Daten" },
          { type: "p", text: "Wir können personenbezogene Daten erheben, die Sie uns freiwillig übermitteln, wenn Sie:" },
          {
            type: "ul",
            items: [
              "Ein Konto anlegen",
              "Sich für unseren Newsletter anmelden",
              "Ein Angebot oder eine Beratung anfragen",
              "Ein Kontaktformular ausfüllen",
              "An Umfragen oder Gewinnspielen teilnehmen",
              "Mit uns in sozialen Netzwerken interagieren",
            ],
          },
          { type: "p", text: "Diese Daten können Ihren Namen, Ihre E-Mail-Adresse, Telefonnummer, Ihren Firmennamen, Ihre Position sowie weitere von Ihnen angegebene Informationen umfassen." },
          { type: "h3", text: "2.2 Automatisch erhobene Daten" },
          { type: "p", text: "Beim Besuch unserer Website können wir bestimmte Informationen zu Ihrem Gerät und Nutzungsverhalten automatisch erfassen, darunter:" },
          {
            type: "ul",
            items: [
              "IP-Adresse",
              "Browsertyp und -version",
              "Betriebssystem",
              "Verweisende Website",
              "Aufgerufene Seiten",
              "Datum und Uhrzeit Ihres Besuchs",
              "Verweildauer auf Seiten",
              "Weitere Statistiken",
            ],
          },
        ],
      },
      {
        heading: "3. Wie wir Ihre Daten verwenden",
        blocks: [
          { type: "p", text: "Wir können die erhobenen Daten für verschiedene Zwecke verwenden, unter anderem um:" },
          {
            type: "ul",
            items: [
              "Unsere Leistungen bereitzustellen, zu betreiben und zu verbessern",
              "Transaktionen abzuwickeln und zugehörige Informationen zu versenden",
              "Administrative Informationen wie Updates, Sicherheitshinweise und Support-Nachrichten zu senden",
              "Auf Ihre Kommentare, Fragen und Anfragen zu antworten",
              "Personalisierte Inhalte und Empfehlungen bereitzustellen",
              "Trends, Nutzung und Aktivitäten zu beobachten und auszuwerten",
              "Technische Probleme zu erkennen, zu verhindern und zu beheben",
              "Uns vor schädlichen oder rechtswidrigen Aktivitäten zu schützen",
            ],
          },
        ],
      },
      {
        heading: "4. Cookies und ähnliche Technologien",
        blocks: [
          { type: "p", text: "Wir verwenden Cookies und ähnliche Tracking-Technologien, um Aktivitäten auf unserer Website nachzuvollziehen und bestimmte Informationen zu speichern. Cookies sind kleine Dateien, die eine anonyme eindeutige Kennung enthalten können." },
          { type: "p", text: "Sie können Ihren Browser anweisen, alle Cookies abzulehnen oder deren Übermittlung anzuzeigen. Ohne Cookies können jedoch Teile unseres Angebots nicht nutzbar sein." },
          { type: "p", text: "Wir verwenden folgende Cookie-Arten:" },
          {
            type: "ul",
            items: [
              "Notwendige Cookies: erforderlich für den Betrieb unserer Website",
              "Analyse-/Performance-Cookies: erlauben es, Besucher zu erkennen und zu zählen sowie ihre Navigation nachzuvollziehen",
              "Funktions-Cookies: ermöglichen die Personalisierung von Inhalten",
              "Targeting-Cookies: erfassen Ihren Besuch, die aufgerufenen Seiten und die von Ihnen verfolgten Links",
            ],
          },
        ],
      },
      {
        heading: "5. Weitergabe und Offenlegung von Daten",
        blocks: [
          { type: "p", text: "Wir können Ihre Daten in folgenden Fällen weitergeben:" },
          {
            type: "ul",
            items: [
              "An Dienstleister: Wir können Ihre Daten an Anbieter, Dienstleister, Auftragnehmer oder Vertreter weitergeben, die Leistungen für uns erbringen.",
              "Unternehmensübergänge: Wir können Ihre Daten im Zusammenhang mit einer Fusion, einem Verkauf von Unternehmenswerten, einer Finanzierung oder Übernahme — auch während der Verhandlungen — weitergeben oder übertragen.",
              "Mit Ihrer Einwilligung: Wir können Ihre Daten mit Ihrer Zustimmung zu weiteren Zwecken offenlegen.",
              "Gesetzliche Anforderungen: Wir können Ihre Daten offenlegen, wenn dies gesetzlich vorgeschrieben ist oder auf berechtigte Anfragen von Behörden hin.",
            ],
          },
        ],
      },
      {
        heading: "6. Datensicherheit",
        blocks: [
          { type: "p", text: "Wir setzen geeignete technische und organisatorische Maßnahmen ein, um Ihre personenbezogenen Daten zu schützen. Bitte beachten Sie jedoch, dass keine Übertragung über das Internet und keine elektronische Speicherung zu 100 % sicher ist und wir keine absolute Sicherheit garantieren können." },
        ],
      },
      {
        heading: "7. Ihre Datenschutzrechte",
        blocks: [
          { type: "p", text: "Je nach Ihrem Wohnort können Ihnen bestimmte Rechte an Ihren personenbezogenen Daten zustehen, etwa:" },
          {
            type: "ul",
            items: [
              "Das Recht auf Auskunft über Ihre personenbezogenen Daten",
              "Das Recht auf Berichtigung unrichtiger Daten",
              "Das Recht auf Löschung Ihrer Daten",
              "Das Recht auf Einschränkung der Verarbeitung",
              "Das Recht auf Datenübertragbarkeit",
              "Das Recht auf Widerspruch gegen die Verarbeitung",
            ],
          },
          { type: "p", text: "Zur Ausübung dieser Rechte kontaktieren Sie uns bitte über die Angaben im Abschnitt „Kontakt“." },
        ],
      },
      {
        heading: "Nutzungsbedingungen",
        blocks: [
          { type: "h3", text: "1. Annahme der Bedingungen" },
          { type: "p", text: "Mit dem Zugriff auf unsere Website und Leistungen oder deren Nutzung erklären Sie sich an diese Nutzungsbedingungen sowie alle geltenden Gesetze und Vorschriften gebunden. Wenn Sie diesen Bedingungen nicht zustimmen, ist Ihnen die Nutzung unserer Leistungen untersagt." },
          { type: "h3", text: "2. Nutzungslizenz" },
          { type: "p", text: "Es ist gestattet, vorübergehend eine Kopie der Materialien auf der Website von Creative Surf für den persönlichen, nicht kommerziellen und vorübergehenden Gebrauch herunterzuladen. Dies ist eine Lizenz, keine Eigentumsübertragung; im Rahmen dieser Lizenz dürfen Sie nicht:" },
          {
            type: "ul",
            items: [
              "Die Materialien verändern oder kopieren",
              "Die Materialien kommerziell oder für öffentliche Darstellungen nutzen",
              "Versuchen, Software auf der Website von Creative Surf zu dekompilieren oder zurückzuentwickeln",
              "Urheberrechts- oder sonstige Schutzvermerke aus den Materialien entfernen",
              "Die Materialien an Dritte weitergeben oder auf einem anderen Server „spiegeln“",
            ],
          },
          { type: "p", text: "Diese Lizenz endet automatisch bei Verstoß gegen eine dieser Beschränkungen und kann von Creative Surf jederzeit widerrufen werden." },
          { type: "h3", text: "3. Haftungsausschluss" },
          { type: "p", text: "Die Materialien auf der Website von Creative Surf werden „wie besehen“ bereitgestellt. Creative Surf übernimmt keine ausdrücklichen oder stillschweigenden Gewährleistungen und schließt hiermit alle weiteren Gewährleistungen aus, einschließlich stillschweigender Zusicherungen der Marktgängigkeit, der Eignung für einen bestimmten Zweck oder der Nichtverletzung geistigen Eigentums." },
          { type: "p", text: "Ferner übernimmt Creative Surf keine Gewähr und macht keine Zusagen hinsichtlich der Richtigkeit, der voraussichtlichen Ergebnisse oder der Verlässlichkeit der Nutzung der Materialien auf ihrer Website oder auf verlinkten Seiten." },
          { type: "h3", text: "4. Haftungsbeschränkung" },
          { type: "p", text: "Creative Surf oder ihre Zulieferer haften in keinem Fall für Schäden (einschließlich, ohne Einschränkung, Daten- oder Gewinnverlust oder Betriebsunterbrechung), die aus der Nutzung oder Unmöglichkeit der Nutzung der Materialien auf der Website entstehen, selbst wenn Creative Surf oder ein autorisierter Vertreter mündlich oder schriftlich auf die Möglichkeit solcher Schäden hingewiesen wurde." },
          { type: "h3", text: "5. Richtigkeit der Materialien" },
          { type: "p", text: "Die Materialien auf der Website von Creative Surf können technische, typografische oder fotografische Fehler enthalten. Creative Surf gewährleistet nicht, dass die Materialien richtig, vollständig oder aktuell sind, und kann sie jederzeit ohne Ankündigung ändern." },
          { type: "h3", text: "6. Links" },
          { type: "p", text: "Creative Surf hat nicht alle mit ihrer Website verlinkten Seiten geprüft und ist für deren Inhalte nicht verantwortlich. Die Aufnahme eines Links bedeutet keine Billigung durch Creative Surf. Die Nutzung solcher Seiten erfolgt auf eigenes Risiko." },
          { type: "h3", text: "7. Änderungen" },
          { type: "p", text: "Creative Surf kann diese Nutzungsbedingungen jederzeit ohne Ankündigung überarbeiten. Mit der Nutzung dieser Website erklären Sie sich an die jeweils aktuelle Fassung gebunden." },
          { type: "h3", text: "8. Anwendbares Recht" },
          { type: "p", text: "Diese Bedingungen unterliegen dem Recht der Vereinigten Staaten und werden entsprechend ausgelegt; Sie unterwerfen sich unwiderruflich der ausschließlichen Zuständigkeit der dortigen Gerichte." },
        ],
      },
      {
        heading: "Kontakt",
        blocks: [
          { type: "p", text: "Bei Fragen zu dieser Datenschutzerklärung oder zu den Nutzungsbedingungen erreichen Sie uns unter:" },
          {
            type: "ul",
            items: [
              "Creative Surf",
              "Dhaka, Bangladesh",
              "E-Mail: creativesurfcs@gmail.com",
              "Telefon: +880 1988-467099",
            ],
          },
        ],
      },
    ],
  } satisfies PartialCopy<typeof legalPrivacyTermsMessages.en>;

const ns_legalTerms = {
    metaTitle: "Nutzungsbedingungen",
    metaDescription: "Nutzungsbedingungen für die Website und die Leistungen von Creative Surf.",
    breadcrumbCurrent: "Nutzungsbedingungen",
    title: "Nutzungsbedingungen",
    lastUpdated: "Zuletzt aktualisiert: Juni 2026",
    sections: [
      {
        heading: "1. Vertrag",
        blocks: [
          { type: "p", text: "Diese Nutzungsbedingungen („Bedingungen“) regeln Ihren Zugang zur Website und zu den Leistungen von Creative Surf sowie deren Nutzung." },
          { type: "p", text: "Mit dem Zugriff auf unsere Website oder der Beauftragung unserer Leistungen erklären Sie sich mit diesen Bedingungen einverstanden." },
        ],
      },
      {
        heading: "2. Leistungen",
        blocks: [
          { type: "p", text: "Creative Surf erbringt Leistungen im Digitalmarketing und in der Beratung, insbesondere:" },
          {
            type: "ul",
            items: [
              "Meta-Werbung",
              "Google-Werbung",
              "TikTok-Werbung",
              "Leadgenerierung",
              "SEO-Leistungen",
              "Social-Media-Betreuung",
              "Marketingberatung",
              "Conversion-Optimierung",
            ],
          },
          { type: "p", text: "Leistungen können nach unserem Ermessen geändert, erweitert oder eingestellt werden." },
        ],
      },
      {
        heading: "3. Pflichten des Kunden",
        blocks: [
          { type: "p", text: "Der Kunde verpflichtet sich:" },
          {
            type: "ul",
            items: [
              "Zutreffende Informationen bereitzustellen",
              "Erforderliche Kontozugänge zu gewähren",
              "Anfragen zeitnah zu beantworten",
              "Das Eigentum an Werbekonten zu behalten, sofern nichts anderes vereinbart ist",
              "Plattformrichtlinien und geltendes Recht einzuhalten",
            ],
          },
        ],
      },
      {
        heading: "4. Honorare und Zahlungen",
        blocks: [
          { type: "p", text: "Alle Honorare sind in Dienstleistungsverträgen, Angeboten oder Rechnungen ausgewiesen." },
          { type: "strong", text: "Zahlungen:" },
          {
            type: "ul",
            items: [
              "Sind gemäß dem vereinbarten Zeitplan fällig",
              "Können ohne anderslautende Angabe nicht erstattungsfähig sein",
              "Enthalten keine Werbebudgets, sofern nicht ausdrücklich angegeben",
            ],
          },
          { type: "p", text: "Zahlungsverzug kann zur Aussetzung der Leistungen führen." },
        ],
      },
      {
        heading: "5. Werbeplattformen",
        blocks: [
          { type: "p", text: "Die Kampagnen-Performance hängt von zahlreichen Faktoren außerhalb unseres Einflussbereichs ab, darunter:" },
          {
            type: "ul",
            items: [
              "Marktbedingungen",
              "Wettbewerb",
              "Plattform-Algorithmen",
              "Produkt-Markt-Passung",
              "Qualität des Kundenangebots",
            ],
          },
          { type: "p", text: "Wir garantieren keine bestimmten Ergebnisse hinsichtlich Umsatz, Leads, Verkäufen, ROAS, Rankings oder Werbeerfolg." },
        ],
      },
      {
        heading: "6. Geistiges Eigentum",
        blocks: [
          { type: "p", text: "Sämtliche Inhalte, Markenelemente, Logos, Website-Materialien, Frameworks und eigenen Methodiken bleiben Eigentum von Creative Surf, sofern nicht schriftlich anders vereinbart." },
          { type: "p", text: "Der Kunde behält das Eigentum an seinen eigenen Marken, Inhalten und Geschäftswerten." },
        ],
      },
      {
        heading: "7. Vertraulichkeit",
        blocks: [
          { type: "p", text: "Beide Parteien verpflichten sich, vertrauliche Informationen geheim zu halten und ohne Zustimmung nicht an Dritte weiterzugeben, außer wenn gesetzlich vorgeschrieben." },
        ],
      },
      {
        heading: "8. Haftungsbeschränkung",
        blocks: [
          { type: "p", text: "Im gesetzlich zulässigen Höchstmaß gilt:" },
          { type: "p", text: "Creative Surf haftet nicht für indirekte, zufällige, besondere, Folge- oder Strafschäden, einschließlich entgangenem Gewinn, Umsatzverlust, Betriebsunterbrechung oder Datenverlust." },
          { type: "p", text: "Unsere Gesamthaftung übersteigt nicht den Betrag, den der Kunde in den drei Monaten vor der Geltendmachung gezahlt hat." },
        ],
      },
      {
        heading: "9. Keine Garantien",
        blocks: [
          { type: "p", text: "Marketing und Werbung sind mit Risiken verbunden." },
          { type: "p", text: "Wir arbeiten an bestmöglicher Performance und positiven Ergebnissen, garantieren jedoch nicht:" },
          {
            type: "ul",
            items: [
              "Bestimmte Lead-Mengen",
              "Umsatzziele",
              "Suchmaschinen-Rankings",
              "Conversion-Raten",
              "Die Freigabe von Anzeigen",
              "Die Stabilität von Plattform-Konten",
            ],
          },
        ],
      },
      {
        heading: "10. Kündigung",
        blocks: [
          { type: "p", text: "Beide Parteien können die Leistungen gemäß den Bestimmungen des jeweiligen Dienstleistungsvertrags beenden." },
          { type: "strong", text: "Bei Beendigung gilt:" },
          {
            type: "ul",
            items: [
              "Offene Honorare bleiben zahlbar",
              "Der Zugang zu geschützten Ressourcen kann entzogen werden",
              "Die Kampagnenbetreuung endet",
            ],
          },
        ],
      },
      {
        heading: "11. Plattformen Dritter",
        blocks: [
          { type: "p", text: "Der Kunde erkennt an, dass die Leistungen Plattformen Dritter wie Meta, Google, TikTok, LinkedIn und weitere Anbieter einbeziehen können." },
          { type: "strong", text: "Creative Surf ist nicht verantwortlich für:" },
          {
            type: "ul",
            items: [
              "Plattformausfälle",
              "Kontosperrungen",
              "Richtlinienänderungen",
              "Von Plattformen auferlegte Beschränkungen",
            ],
          },
        ],
      },
      {
        heading: "12. Freistellung",
        blocks: [
          { type: "p", text: "Der Kunde stellt Creative Surf von Ansprüchen, Schäden, Haftung und Kosten frei, die aus seinen Produkten, Leistungen, Werbeinhalten oder Rechtsverstößen entstehen." },
        ],
      },
      {
        heading: "13. Anwendbares Recht",
        blocks: [
          { type: "p", text: "Diese Bedingungen unterliegen dem Recht von England und Wales und werden entsprechend ausgelegt." },
        ],
      },
      {
        heading: "14. Änderungen der Bedingungen",
        blocks: [
          { type: "p", text: "Wir behalten uns vor, diese Bedingungen jederzeit zu ändern. Die weitere Nutzung unserer Website oder Leistungen gilt als Annahme der aktualisierten Bedingungen." },
        ],
      },
    ],
  } satisfies PartialCopy<typeof legalTermsMessages.en>;


const ns_nav = {
    links: {
      home: "Startseite",
      projects: "Projekte",
      blogs: "Blog",
      cvBuilder: "Lebenslauf-Generator",
      team: "Team",
      services: "Leistungen",
      about: "Über uns",
      contact: "Kontakt",
    },
    sections: {
      marketing: "Marketing",
      realEstate: "Immobilien",
    },
    cta: "Loslegen",
    startProject: "Projekt starten",
    openMenu: "Menü",
    closeMenu: "Menü schließen",
    mainNav: "Hauptnavigation",
    login: "Anmelden",
    register: "Registrieren",
    account: "Konto",
    profile: "Profil",
    logout: "Abmelden",
    loggingOut: "Abmeldung…",
    accountMenu: "Kontomenü",
    logoAlt: "Creative Surf Logo",
    toggleMenu: "Menü umschalten",
    lightMode: "Hell",
    darkMode: "Dunkel",
  } satisfies PartialCopy<typeof navMessages.en>;

const ns_notFound = {
    metaTitle: "404 - Seite nicht gefunden",
    metaDescription: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    heading: "Seite nicht gefunden",
    body: "Hoppla! Die gesuchte Seite existiert nicht oder wurde verschoben.",
    cta: "Zurück zur Startseite",
  } satisfies PartialCopy<typeof notFoundMessages.en>;

const ns_pageMeta = {
    account: {
      title: "Mein Konto | Creative Surf",
      description: "Verwalten Sie Ihr Creative-Surf-Konto, Lebensläufe und Chats.",
    },
    newPost: {
      title: "Neuer Blogbeitrag | Creative Surf",
      description: "Schreiben Sie einen neuen Blogbeitrag.",
    },
    editPost: {
      title: "Blogbeitrag bearbeiten | Creative Surf",
      description: "Bearbeiten Sie einen Blogbeitrag.",
    },
    newRealEstatePost: {
      title: "Neuer Blogbeitrag | Creative Surf Real Estate",
      description: "Schreiben Sie einen neuen Immobilien-Blogbeitrag.",
    },
    editRealEstatePost: {
      title: "Blogbeitrag bearbeiten | Creative Surf Real Estate",
      description: "Bearbeiten Sie einen Immobilien-Blogbeitrag.",
    },
    home: {
      title: "Creative Surf | Agentur für digitales Marketing",
      description:
        "Creative Surf ist eine Agentur für digitales Marketing mit Schwerpunkt auf SEO, Webdesign, Content und Social Media, die das Umsatzwachstum von Unternehmen vorantreibt.",
    },
    login: {
      title: "Anmelden | Creative Surf",
      description: "Melden Sie sich bei Ihrem Creative-Surf-Konto an.",
    },
    register: {
      title: "Konto erstellen | Creative Surf",
      description: "Erstellen Sie ein kostenloses Creative-Surf-Konto, um Lebensläufe, Chats und mehr zu speichern.",
    },
    realEstate: {
      title: "Immobilienmarketing in Dhaka | Creative Surf Real Estate",
      description:
        "Dhakas digitale Plattform, die Bauträger mit qualifizierten Käufern, Investoren und Grundstückspartnern verbindet.",
    },
    realEstateProjects: {
      title: "Immobilienprojekte in Dhaka | Creative Surf Real Estate",
      description: "Entdecken Sie laufende und geplante Wohn- und Gewerbeimmobilienprojekte in Dhaka.",
    },
    realEstateProject: {
      title: "Projektdetails | Creative Surf Real Estate",
      description: "Grundstücks-, Einheiten- und Gebäudedetails zu diesem Immobilienprojekt in Dhaka.",
    },
    newProject: {
      title: "Neues Projekt | Creative Surf Real Estate",
      description: "Fügen Sie ein neues Immobilienprojekt hinzu.",
    },
    editProject: {
      title: "Projekt bearbeiten | Creative Surf Real Estate",
      description: "Bearbeiten Sie ein Immobilienprojekt.",
    },
  } satisfies PartialCopy<typeof pageMetaMessages.en>;

const ns_projectEditor = {
    editProject: "Projekt bearbeiten",
    newProject: "Neues Projekt",
    namePlaceholder: "Projektname…",
    subtitleLabel: "Untertitel / Wohnanlage",
    subtitlePlaceholder: "z. B. JOLSHIRI ABASHON",
    plotDetailsLabel: "Grundstücksdaten",
    specs: {
      plotNo: "Grundstücksnr.",
      roadNo: "Straßennr.",
      sector: "Sektor",
      plotSize: "Grundstücksgröße",
      numberOfUnits: "Anzahl der Einheiten",
      buildingDetails: "Gebäudedetails",
      flatSize: "Wohnungsgröße",
    },
    featuresDescriptionLabel: "Beschreibung der Ausstattung",
    featuresDescriptionPlaceholder: "Beschreiben Sie die wichtigsten Merkmale des Projekts…",
    rooftopFeatures: "Dach-Ausstattung",
    groundFloorFeatures: "Ausstattung im Erdgeschoss",
    availableFlats: "Verfügbare Wohnungen",
    featurePlaceholder: "Merkmal hinzufügen und Enter drücken…",
    statusLabel: "Status",
    coverImageLabel: "Titelbild",
    additionalImages: "Weitere Bilder",
    mapLabel: "Google-Maps-Standort",
    mapPlaceholder: "Google-Maps-Einbettungs-URL oder Freigabelink einfügen…",
    mapHintStart: "Fügen Sie die Google-Maps-",
    mapHintStrong: "Einbettungs-URL",
    mapHintEnd: "ein (Teilen → Karte einbetten → src-URL kopieren) oder einen normalen Google-Maps-Link.",
    saving: "Wird gespeichert…",
    updateProject: "Projekt aktualisieren",
    addProject: "Projekt anlegen",
    errors: {
      nameRequired: "Der Projektname ist erforderlich.",
      loadFailed: "Projekt konnte nicht geladen werden.",
      network: "Netzwerkfehler. Bitte erneut versuchen.",
    },
  } satisfies PartialCopy<typeof projectEditorMessages.en>;

const ns_realEstate = {
    hero: {
      tag: "Creative Surf · Immobilien",
      headline: ["Bauen Sie das Projekt.", "Wir sorgen dafür,", "dass es entdeckt wird."],
      subtitle:
        "Dhakas dedizierte Digitalplattform, die Projektentwickler mit qualifizierten Käufern, Investoren und Grundstückspartnern verbindet.",
      pills: ["Projekt einstellen", "Käufer erreichen", "Abschlüsse erzielen"],
      ctaPrimary: "Jetzt Projekt einstellen",
      ctaSecondary: "Mehr erfahren",
    },
    about: {
      badge: "Über uns",
      headingStart: "Wir gestalten die Zukunft der",
      headingAccent: "Immobilien in Dhaka",
      headingEnd: ".",
      imageAlt: "Über uns",
      viewProjects: "Projekte ansehen",
      tabBackground: "Hintergrund",
      tabMessage: "Unser Anspruch",
      brandName: "Creative Surf Real Estate",
      introRest:
        "ist eine schnell wachsende Digitalplattform, die Dhakas Projektentwickler mit qualifizierten Käufern und Investoren über alle Immobilientypen hinweg verbindet.",
      body:
        "Unser Team verbindet Digitalmarketing-Expertise mit tiefem Wissen über den bangladeschischen Immobilienmarkt — von der Objektaufbereitung über Kampagnen bis zur Online-Präsenz, die echte Anfragen bringt. Wir stehen für Qualität, Transparenz und messbare Ergebnisse.",
      goals: [
        {
          name: "Digitales Ökosystem",
          desc: "Eine dedizierte Plattform aufbauen, auf der Entwickler in Dhaka Wohn- und Gewerbeprojekte im großen Stil präsentieren.",
        },
        {
          name: "Maximale Sichtbarkeit",
          desc: "SEO, Social Media und Performance-Werbung nutzen, um jeder gelisteten Immobilie höchste Aufmerksamkeit zu verschaffen.",
        },
        {
          name: "Qualifizierte Reichweite",
          desc: "Entwickler und Grundstücksangebote über intelligentes Targeting mit den passenden Käufern zusammenbringen.",
        },
      ],
      visionQuote:
        "Das vertrauenswürdigste digitale Tor Bangladeschs für die Immobiliensuche zu werden — damit Transaktionen transparent, zugänglich und inspirierend werden, für Entwickler wie für Käufer.",
      visionLabel: "Vision & Mission",
    },
    objectives: {
      badge: "Unsere Ziele",
      headingStart: "Was wir erreichen",
      headingAccent: "wollen",
      intro:
        "Vier Säulen der Exzellenz, die unseren Entwicklerpartnern in ganz Bangladesch digitale Ergebnisse bringen.",
      items: [
        {
          title: "Digitales Ökosystem",
          body: "Eine dedizierte Plattform aufbauen, auf der Entwickler in Dhaka Wohn- und Gewerbeprojekte im großen Stil präsentieren.",
        },
        {
          title: "Maximale Sichtbarkeit",
          body: "SEO, Social Media und Performance-Werbung nutzen, um jeder gelisteten Immobilie höchste Aufmerksamkeit zu verschaffen.",
        },
        {
          title: "Qualifizierte Reichweite",
          body: "Entwickler und Grundstücksangebote über intelligentes Targeting mit den passenden Käufern zusammenbringen.",
        },
        {
          title: "Messbarer ROI",
          body: "Höchste Standards in Kreativität, Transparenz und Ergebnissen für jeden Partner sichern.",
        },
      ],
    },
    featured: {
      tag: "Ausgewählte Arbeiten",
      headingStart: "Projekte, die uns",
      headingAccent: "ausmachen",
      viewAll: "Alle Projekte ansehen",
    },
    process: {
      badge: "Der Prozess",
      intro: "Vom Onboarding bis zum ausverkauften Projekt — in vier durchdachten Schritten.",
      steps: [
        {
          title: "Verstehen",
          body: "Teilen Sie Ihre Projektdaten — Lage, Bestand, Zielgruppe. Wir analysieren die Marktnachfrage und definieren Ihre digitale Positionierung.",
        },
        {
          title: "Gestalten",
          body: "Wir bauen dedizierte, SEO-optimierte Projekt-Microsites und entwickeln hochwertige Werbekampagnen für Ihr Bauvorhaben.",
        },
        {
          title: "Ausrollen",
          body: "Wir starten zielgerichtete, performante Kampagnen über Such- und Social-Kanäle, um qualifizierte Käuferanfragen zu gewinnen.",
        },
        {
          title: "Liefern",
          body: "Wir übergeben vorqualifizierte Leads direkt an Ihr Vertriebsteam, verfolgen Conversions und optimieren, bis Ihr Bestand vollständig vergeben ist.",
        },
      ],
    },
    testimonials: {
      tag: "Stimmen unserer Partner",
      headingStart: "Vertraut von Dhakas",
      headingAccent: "besten Entwicklern",
      items: [
        {
          quote:
            "Creative Surf hat unsere Angebote in einen stetigen Strom qualifizierter Käufer verwandelt. Die Kampagnen haben sich im ersten Monat amortisiert.",
          role: "Geschäftsführer",
        },
        {
          quote:
            "Professionelle Fotografie, eine eigene Microsite und echte Analytics — endlich ein Partner, der Marketing und Immobilien versteht.",
          role: "Vertriebsleiterin",
        },
        {
          quote:
            "Unser Projekt war in 48 Stunden online und vorzeitig vollständig vergeben. Transparenz und Reporting sind in Dhaka unerreicht.",
          role: "Vorstandsvorsitzender",
        },
      ],
    },
  } satisfies PartialCopy<typeof realEstateMessages.en>;

const ns_realEstateBlogs = {
    eyebrow: "Creative Surf · Immobilien",
    title: "Einblicke & Ideen",
    subtitle:
      "Markttrends, Kaufratgeber und Investment-Analysen zum Immobilienmarkt in Dhaka — direkt vom Creative-Surf-Team.",
    categoryAll: "Alle",
    newPost: "Neuer Beitrag",
    logout: "Abmelden",
    emptyTitle: "Noch keine Beiträge",
    emptyAdmin: "Erstellen Sie Ihren ersten Blogbeitrag, um zu starten.",
    emptyPublic: "Schauen Sie bald wieder vorbei — für Einblicke vom Creative-Surf-Team.",
    writeFirst: "Ersten Beitrag schreiben",
    edit: "Bearbeiten",
    delete: "Löschen",
    confirmDelete: '„{title}“ löschen? Das kann nicht rückgängig gemacht werden.',
    read: "Lesen →",
    brand: "Creative Surf",
  } satisfies PartialCopy<typeof realEstateBlogsMessages.en>;

const ns_realEstateFooter = {
    cta: {
      badge: "Für Immobilienkäufer",
      heading: "Finden Sie Ihr neues Zuhause in Dhaka.",
      body: "Entdecken Sie geprüfte Wohnprojekte in ganz Dhaka — von Luxuswohnungen bis zu günstigen Apartments — und finden Sie das perfekte Zuhause für sich und Ihre Familie.",
      primary: "Verfügbare Wohnungen ansehen",
      secondary: "Besichtigung vereinbaren",
    },
    brand: {
      line1: "Immobilien.",
      line2: "Neu gedacht.",
      blurb:
        "Wir gestalten herausragende digitale Erlebnisse für Projektentwickler — von immersiven Projektpräsentationen bis zu Marketing, das den Markt bewegt.",
      cta: "Projekt starten",
    },
    exploreTitle: "Entdecken",
    contactTitle: "Kontakt",
    whatsapp: "Auf WhatsApp chatten",
    links: {
      home: "Startseite",
      projects: "Projekte",
      blogs: "Blog",
      contact: "Kontakt",
    },
    location: "Dhaka, Bangladesch",
    skylineAlt: "Skyline von Dhaka",
    rights: "© {year} Creative Surf. Alle Rechte vorbehalten.",
    terms: "Nutzungsbedingungen",
    privacy: "Datenschutzerklärung",
    craftedPre: "Gestaltet mit",
    craftedAccent: "Aurora",
    craftedPost: "Energie",
  } satisfies PartialCopy<typeof realEstateFooterMessages.en>;

const ns_realEstateProjectDetail = {
    notFound: "Projekt nicht gefunden",
    backToProjects: "← Zurück zu den Projekten",
    allProjects: "Alle Projekte",
    edit: "Bearbeiten",
    delete: "Löschen",
    deleting: "Wird gelöscht…",
    confirmDelete: '„{name}“ löschen? Das kann nicht rückgängig gemacht werden.',
    detailsTitle: "Projektdetails",
    specs: {
      plotNo: "Grundstücksnr.",
      roadNo: "Straßennr.",
      sector: "Sektor",
      plotSize: "Grundstücksgröße",
      numberOfUnits: "Anzahl der Einheiten",
      buildingDetails: "Gebäudedetails",
      flatSize: "Wohnungsgröße",
    },
    location: {
      title: "Lage",
      overviewNote: "— Übersicht Dhaka",
      viewOnMaps: "Auf Google Maps ansehen",
      mapTitleFallback: "Dhaka, Bangladesch",
      mapTitle: "Lage von {name}",
      tapToOpen: "Tippen, um in Google Maps zu öffnen",
      openInMaps: "In Maps öffnen →",
    },
    availableFlats: "Verfügbare Wohnungen",
    rooftopFeatures: "Dach-Ausstattung",
    groundFloorFeatures: "Ausstattung im Erdgeschoss",
    gallery: "Galerie",
    blogs: {
      eyebrow: "Immobilien-Insights",
      title: "Neueste Artikel & Ratgeber",
      viewAll: "Alle Artikel ansehen →",
      read: "Lesen →",
    },
    lightbox: {
      close: "Schließen",
      previous: "Vorheriges Bild",
      next: "Nächstes Bild",
    },
  } satisfies PartialCopy<typeof realEstateProjectDetailMessages.en>;

const ns_realEstateProjects = {
    list: {
      eyebrow: "Creative Surf · Immobilien",
      title: "Unsere Projekte",
      subtitle: "Hochwertige Wohnprojekte in Dhaka — mit Qualität gebaut, fürs Leben gestaltet.",
      statusAll: "Alle",
      newProject: "Neues Projekt",
      logout: "Abmelden",
      emptyTitle: "Noch keine Projekte",
      emptyAdmin: "Legen Sie Ihr erstes Immobilienprojekt an, um zu starten.",
      emptyPublic: "Projekte erscheinen hier in Kürze.",
      addFirst: "Erstes Projekt anlegen",
      edit: "Bearbeiten",
      delete: "Löschen",
      confirmDelete: '„{name}“ löschen? Das kann nicht rückgängig gemacht werden.',
    },
  } satisfies PartialCopy<typeof realEstateProjectsMessages.en>;

const ns_realEstateWhatsApp = {
    floating: "Auf WhatsApp chatten",
    prefill: {
      general: "Hallo Creative Surf, ich möchte mehr über Ihre Immobilienprojekte erfahren.",
      project: "Hallo Creative Surf, ich interessiere mich für {name}. Könnten Sie mir mehr Details schicken? {url}",
    },
  } satisfies PartialCopy<typeof realEstateWhatsAppMessages.en>;





const ns_servicesIndex = {
    offerSubtitle: "Wählen Sie eine Leistung oder kombinieren Sie mehrere — jedes Projekt richtet sich nach dem Ergebnis, das Sie brauchen.",
    viewAll: "Alle Leistungen ansehen",
    items: [
      {
        "title": "Markenstrategie",
        "description": "Wir entwickeln umfassende Markenstrategien, die Ihre einzigartige Marktposition definieren und Ihre Zielgruppe erreichen.",
        "tags": [
          "Positionierung",
          "Identität",
          "Botschaften"
        ]
      },
      {
        "title": "Webdesign & Entwicklung",
        "description": "Individuelle Websites, die beeindruckende Optik mit reibungsloser Funktionalität verbinden — für einprägsame digitale Erlebnisse.",
        "tags": [
          "UX / UI",
          "Next.js",
          "E-Commerce"
        ]
      },
      {
        "title": "Digitalmarketing",
        "description": "Datengetriebene Kampagnen über mehrere Kanäle, die Ihre Sichtbarkeit erhöhen und Conversions bringen.",
        "tags": [
          "Paid Media",
          "E-Mail",
          "Analytics"
        ]
      },
      {
        "title": "Content-Erstellung",
        "description": "Fesselnde Inhalte, die Ihre Geschichte erzählen und Ihre Zielgruppe auf allen Plattformen erreichen.",
        "tags": [
          "Texte",
          "Video",
          "Fotografie"
        ]
      },
      {
        "title": "Social-Media-Betreuung",
        "description": "Eine strategische Social-Media-Präsenz, die Community aufbaut und Ihre Markenstimme stärkt.",
        "tags": [
          "Community",
          "Redaktionsplan",
          "Creator"
        ]
      },
      {
        "title": "SEO-Optimierung",
        "description": "Technische und inhaltliche Optimierung, um Ihre Rankings zu verbessern und organischen Traffic zu gewinnen.",
        "tags": [
          "Technik",
          "On-Page",
          "Lokal"
        ]
      }
    ],
  } satisfies PartialCopy<typeof servicesIndexMessages.en>;

const ns_services = {
    ...ns_servicesIndex,
    metaTitle: "Unsere Leistungen | Creative Surf",
    metaDescription:
      "Entdecken Sie unser umfassendes Angebot an Kreativ- und Digitalmarketing-Leistungen, das Ihre Marke voranbringt.",
    hero: {
      kicker: "Unsere Leistungen",
      title: "Alles, was Ihre Marke braucht,",
      titleAccent: "um zu wachsen – aus einem Team.",
      subtitle:
        "Umfassende Kreativlösungen, zugeschnitten darauf, Ihre Marke zu stärken und Ihre Geschäftsziele zu erreichen",
      ctaPrimary: "Projekt starten",
      ctaSecondary: "Leistungen ansehen",
    },
    offerKicker: "Was wir anbieten",
    offerTitle: "Sechs Disziplinen,",
    offerAccent: "ein integriertes Team.",
    explore: "Entdecken",
    processKicker: "Unser Vorgehen",
    processTitle: "Ein klarer Prozess,",
    processAccent: "vom ersten Gespräch bis zum Wachstum.",
    processSubtitle: "Fünf Phasen und ein verantwortliches Team — Sie wissen immer, was als Nächstes passiert.",
    process: [
      {
        step: "Analyse",
        description:
          "Wir beginnen damit, Ihr Unternehmen, Ihre Ziele und Ihre Zielgruppe zu verstehen — als strategische Grundlage.",
      },
      {
        step: "Strategie",
        description:
          "Auf Basis unserer Erkenntnisse entwickeln wir eine passgenaue Strategie, die zu Ihren Zielen und Ihrer Marktposition passt.",
      },
      {
        step: "Umsetzung",
        description:
          "Unser Kreativteam bringt die Strategie mit überzeugendem Design und Content zum Leben.",
      },
      {
        step: "Ausrollen",
        description: "Wir setzen den Plan präzise über alle relevanten Kanäle und Plattformen um.",
      },
      {
        step: "Optimierung",
        description:
          "Durch laufendes Monitoring und Analyse verfeinern wir unser Vorgehen, um die Ergebnisse zu maximieren.",
      },
    ],
    whyKicker: "Warum Creative Surf",
    whyTitle: "Gemacht für Ergebnisse,",
    whyAccent: "nicht nur für Deliverables.",
    why: [
      {
        title: "Strategie zuerst",
        description: "Jede Arbeit zahlt auf ein Geschäftsziel ein, das vor dem ersten Entwurf vereinbart wird.",
      },
      {
        title: "Mit Daten gemessen",
        description: "Klares Reporting darüber, was funktioniert — Entscheidungen auf Basis von Zahlen statt Meinungen.",
      },
      {
        title: "Ein Team, durchgängig",
        description:
          "Strategen, Designer, Entwickler und Marketer unter einem Dach — nichts geht zwischen Agenturen verloren.",
      },
      {
        title: "Transparente Partnerschaft",
        description: "Klare Zeitpläne, ehrliche Empfehlungen und ein Team, das Sie wirklich erreichen.",
      },
    ],
    faqKicker: "FAQ",
    faqTitle: "Fragen,",
    faqAccent: "beantwortet.",
    faq: [
      {
        q: "Muss ich alle Leistungen buchen?",
        a: "Nein. Sie können mit einer einzelnen Leistung beginnen und weitere hinzufügen, wenn Sie wachsen. Viele Kunden starten mit einem Projekt und bauen aus, sobald sie Ergebnisse sehen.",
      },
      {
        q: "Wie lange dauert ein typisches Projekt?",
        a: "Das hängt vom Umfang ab. Eine fokussierte Kampagne oder ein Marken-Refresh dauert einige Wochen; eine komplette Website oder ein laufendes Marketingprogramm planen wir in Phasen mit klaren Meilensteinen.",
      },
      {
        q: "Wie messen Sie Erfolg?",
        a: "Wir legen zu Beginn die Kennzahlen fest, die für Sie zählen — Leads, Umsatz, Rankings, Engagement — und berichten regelmäßig darüber.",
      },
      {
        q: "Arbeiten Sie auch mit unserem internen Team?",
        a: "Auf jeden Fall. Wir können ein Projekt komplett übernehmen oder Ihr bestehendes Team gezielt ergänzen.",
      },
    ],
    cta: {
      kicker: "Lassen Sie uns reden",
      title: "Bereit, Ihre Marke",
      titleAccent: "zu verwandeln?",
      body: "Lassen Sie uns gemeinsam etwas Außergewöhnliches schaffen, das echte Ergebnisse für Ihr Unternehmen bringt.",
      button: "Kontakt aufnehmen",
    },
  } satisfies PartialCopy<typeof servicesMessages.en>;

const ns_sitemap = {
    metaTitle: "Sitemap",
    metaDescription: "Alle Seiten der Creative-Surf-Website im Überblick.",
    breadcrumbCurrent: "Sitemap",
    title: "Sitemap",
    mainPages: "Hauptseiten",
  } satisfies PartialCopy<typeof sitemapMessages.en>;

const ns_team = {
    metaTitle: "Unser Team | Creative Surf",
    metaDescription:
      "Lernen Sie die Menschen hinter Creative Surf kennen — das Team hinter Strategie, Produkten und Geschichten.",
    hero: {
      eyebrow: "Über uns",
      title: "Das Team",
      subtitle:
        "Ein kleines Team mit großer Reichweite — Strategie, Entwicklung, Visuals und Text unter einem Dach.",
    },
    roles: {
      marketingLead: "Leiter Digitalmarketing",
      webDeveloper: "Webentwickler",
      contentStrategist: "Content-Stratege",
      visualiser: "Senior Visualizer | Editor",
    },
    bios: {
      marketingLead:
        "Führt unsere Kampagnen und unser Wachstum und betreut Kunden und Partnerschaften.",
      webDeveloper:
        "Baut und pflegt die Creative-Surf-Plattform, von der Oberfläche bis zur Infrastruktur.",
      contentStrategist:
        "Plant die Worte hinter unseren Kampagnen, Blogs und unserer Markenstimme.",
      visualiser:
        "Macht aus Ideen Bilder — Design, Motion und der Schnitt, der alles verbindet.",
      editor:
        "Gestaltet unsere Video- und Bildinhalte, vom ersten Storyboard bis zum finalen Schnitt.",
    },
    cta: {
      title: "Lust, mit uns zu arbeiten?",
      body: "Wir freuen uns jederzeit über neue Projekte und Ideen.",
      button: "Kontakt aufnehmen",
    },
  } satisfies PartialCopy<typeof teamMessages.en>;

const ns_websiteCost = {
    metaTitle: "Was sollte eine Website kosten?",
    metaDescription:
      "Erfahren Sie mehr über die Kosten der Website-Entwicklung und welche Faktoren den Preis je Website-Typ beeinflussen.",
    breadcrumb: {
      pricingGuides: "Preis-Ratgeber",
      current: "Website-Kosten",
    },
    title: "Was sollte eine Website kosten?",
    subtitle:
      "Website-Entwicklungskosten verstehen — und welche Faktoren den Preis je Website-Typ beeinflussen.",
    factorsTitle: "Kostenfaktoren einer Website",
    factorsBody:
      "Die Kosten einer Website variieren stark je nach mehreren Faktoren. Wer sie kennt, kann das Budget für sein Projekt realistisch planen.",
    typeTitle: "Website-Typ",
    typeIntro:
      "Verschiedene Website-Typen haben unterschiedliche Komplexität und damit unterschiedliche Kosten:",
    tiers: [
      { label: "Einfache Informations-Website:", range: "5.000 $ – 10.000 $" },
      { label: "Website für kleine Unternehmen:", range: "10.000 $ – 25.000 $" },
      { label: "E-Commerce-Website:", range: "25.000 $ – 50.000 $+" },
      { label: "Individuelle Webanwendung:", range: "50.000 $ – 250.000 $+" },
    ],
    cta: {
      title: "Bereit anzufangen?",
      body: "Kontaktieren Sie uns für ein individuelles Angebot für Ihr Website-Projekt.",
      button: "Kostenloses Angebot erhalten",
    },
  } satisfies PartialCopy<typeof websiteCostMessages.en>;

const dicts = {
  "about": ns_about,
  "aboutApproach": ns_aboutApproach,
  "aboutAwards": ns_aboutAwards,
  "aboutCareers": ns_aboutCareers,
  "aboutHistory": ns_aboutHistory,
  "aboutReviews": ns_aboutReviews,
  "aboutValues": ns_aboutValues,
  "auth": ns_auth,
  "blogPost": ns_blogPost,
  "blogs": ns_blogs,
  "chat": ns_chat,
  "common": ns_common,
  "contact": ns_contact,
  "cvTeaser": ns_cvTeaser,
  "cvBuilder": ns_cvBuilder,
  "editor": ns_editor,
  "editorUi": ns_editorUi,
  "footer": ns_footer,
  "home": ns_home,
  "kit": ns_kit,
  "legalPrivacy": ns_legalPrivacy,
  "legalPrivacyTerms": ns_legalPrivacyTerms,
  "legalTerms": ns_legalTerms,
  "nav": ns_nav,
  "notFound": ns_notFound,
  "pageMeta": ns_pageMeta,
  "projectEditor": ns_projectEditor,
  "realEstate": ns_realEstate,
  "realEstateBlogs": ns_realEstateBlogs,
  "realEstateFooter": ns_realEstateFooter,
  "realEstateProjectDetail": ns_realEstateProjectDetail,
  "realEstateProjects": ns_realEstateProjects,
  "realEstateWhatsApp": ns_realEstateWhatsApp,
  "servicesIndex": ns_servicesIndex,
  "services": ns_services,
  "sitemap": ns_sitemap,
  "team": ns_team,
  "websiteCost": ns_websiteCost,
} as unknown as Record<string, Dict>;

export default dicts;
