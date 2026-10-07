/*
 * FR copy for every namespace, keyed by the id each messages file
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
import type { teamMessages } from "../messages/team";
import type { websiteCostMessages } from "../messages/websiteCost";

const ns_about = {
    metaTitle: "À propos | Creative Surf",
    metaDescription:
      "Découvrez Creative Surf, notre mission, nos valeurs et l'équipe talentueuse derrière notre agence créative.",
    hero: {
      title: "À propos de Creative Surf",
      subtitle:
        "Nous sommes une équipe de créatifs passionnés, déterminés à aider les marques à faire des vagues dans leur secteur",
    },
    story: {
      title: "Notre histoire",
      p1:
        "Creative Surf est née d'une mission simple : créer des expériences de marque authentiques qui touchent les audiences et génèrent de vrais résultats.",
      p2:
        "Ce qui a commencé par une équipe de trois personnes est devenu un collectif diversifié de stratèges, designers, développeurs et créateurs de contenu, réunis par la même passion de l'excellence créative.",
      p3:
        "Aujourd'hui, nous sommes fiers d'accompagner des marques de tous secteurs, de la jeune startup au grand groupe, en les aidant à naviguer dans un paysage digital en constante évolution et à créer des liens authentiques avec leurs audiences.",
      imageAlt: "L'équipe Creative Surf",
    },
    values: {
      title: "Nos valeurs",
      items: [
        { title: "Créativité", description: "Nous abordons chaque défi avec un regard neuf et des solutions innovantes." },
        { title: "Collaboration", description: "Nous croyons que le meilleur travail naît de la rencontre de perspectives diverses." },
        { title: "Excellence", description: "Nous nous imposons les standards les plus élevés dans tout ce que nous faisons." },
        { title: "Authenticité", description: "Nous valorisons l'honnêteté et la transparence dans toutes nos relations." },
        { title: "Progression", description: "Nous nous engageons à apprendre et à nous améliorer en continu." },
        { title: "Impact", description: "Nous mesurons notre succès aux résultats que nous livrons à nos clients." },
      ],
    },
    cta: {
      title: "Créons ensemble quelque chose d'exceptionnel",
      body: "Prêt à faire passer votre marque au niveau supérieur ? Parlez-nous de votre projet.",
      button: "Nous contacter",
    },
  } satisfies PartialCopy<typeof aboutMessages.en>;

const ns_aboutApproach = {
    metaTitle: "Notre approche | Creative Surf",
    metaDescription:
      "Découvrez la méthodologie éprouvée de Creative Surf pour livrer des résultats mesurables : découverte, stratégie, exécution et optimisation continue.",
    hero: {
      title: "Notre approche",
      subtitle: "Comment nous obtenons des résultats exceptionnels grâce à notre méthodologie éprouvée",
    },
    philosophy: {
      title: "Notre philosophie",
      intro:
        "Chez Creative Surf, nous croyons à une approche pilotée par la donnée et centrée sur le client, qui produit des résultats mesurables. Notre méthodologie associe réflexion stratégique, excellence créative et expertise technique.",
      cards: [
        {
          title: "Cap stratégique",
          body:
            "Nous commençons par comprendre vos objectifs business et votre audience cible pour construire des stratégies alignées sur vos ambitions.",
        },
        {
          title: "Décisions fondées sur la donnée",
          body:
            "Nous nous appuyons sur l'analytics et l'étude de marché pour orienter nos stratégies et optimiser en continu la performance.",
        },
        {
          title: "Innovation créative",
          body:
            "Nous associons créativité et technologie pour développer des solutions innovantes qui font ressortir votre marque dans un marché saturé.",
        },
      ],
    },
    process: {
      title: "Notre processus",
      intro: "Une démarche systématique qui garantit une qualité et des résultats constants",
      expectLabel: "Ce que vous obtenez :",
      steps: [
        {
          title: "Découverte & analyse",
          body:
            "Nous commençons par comprendre votre activité, vos objectifs, votre audience et votre environnement concurrentiel. Notre équipe mène des recherches approfondies pour identifier opportunités et obstacles.",
          points: [
            "Analyse complète de l'activité",
            "Évaluation du paysage concurrentiel",
            "Étude de l'audience cible",
          ],
        },
        {
          title: "Élaboration de la stratégie",
          body:
            "À partir de nos constats, nous élaborons une stratégie sur mesure alignée sur vos objectifs. Nous définissons des KPI clairs et une feuille de route de mise en œuvre.",
          points: [
            "Plan stratégique sur mesure",
            "KPI et indicateurs de succès clairs",
            "Allocation des ressources et calendrier",
          ],
        },
        {
          title: "Exécution & mise en œuvre",
          body:
            "Notre équipe d'experts exécute la stratégie avec précision et souci du détail, en s'appuyant sur les outils et technologies les plus récents.",
          points: [
            "Exécution par des spécialistes",
            "Points d'avancement réguliers",
            "Contrôle qualité à chaque étape",
          ],
        },
        {
          title: "Mesure & optimisation",
          body:
            "Nous suivons la performance en continu, analysons les résultats et procédons à des optimisations fondées sur la donnée pour maximiser le ROI.",
          points: [
            "Reporting de performance complet",
            "Recommandations d'optimisation fondées sur la donnée",
            "Cycle d'amélioration continue",
          ],
        },
      ],
    },
    methodology: {
      title: "Notre méthodologie",
      intro: "Les principes fondamentaux qui guident notre travail et garantissent l'excellence",
      cards: [
        {
          title: "Partenariat client",
          body:
            "Nous nous considérons comme le prolongement de votre équipe et travaillons main dans la main pour atteindre vos objectifs. Notre communication transparente et nos points réguliers vous gardent informé et impliqué.",
        },
        {
          title: "Exécution agile",
          body:
            "Notre approche agile nous permet de nous adapter vite aux évolutions du marché et de vos besoins. Nous itérons rapidement, testons en continu et optimisons pour un impact maximal.",
        },
        {
          title: "Orientation résultats",
          body:
            "Nous sommes obsédés par les résultats mesurables qui pèsent sur vos comptes. Chaque stratégie et chaque tactique sont conçues avec des objectifs et des KPI clairs.",
        },
        {
          title: "Innovation continue",
          body:
            "Nous restons à la pointe des tendances et technologies du secteur pour apporter des solutions innovantes qui vous donnent un avantage concurrentiel.",
        },
      ],
    },
    caseStudies: {
      title: "Notre approche en action",
      intro: "Découvrez les résultats que notre méthodologie a produits pour nos clients",
      readMore: "Lire l'étude de cas",
      items: [
        {
          category: "E-commerce",
          title: "+300 % de chiffre d'affaires",
          body: "Comment nous avons aidé une marque e-commerce à tripler son chiffre d'affaires grâce au marketing digital.",
          imageAlt: "Étude de cas : croissance e-commerce",
        },
        {
          category: "B2B",
          title: "10× plus de leads",
          body: "Comment notre approche a permis à une entreprise B2B de multiplier par 10 ses leads qualifiés en 6 mois.",
          imageAlt: "Étude de cas : génération de leads B2B",
        },
        {
          category: "Transformation de marque",
          title: "Relance de marque réussie",
          body: "Comment nous avons accompagné la transformation digitale d'une marque historique vers un nouveau segment de marché.",
          imageAlt: "Étude de cas : transformation de marque",
        },
      ],
    },
    cta: {
      title: "Envie de découvrir notre approche ?",
      body: "Parlons de la façon dont notre méthodologie éprouvée peut faire décoller vos résultats.",
      contact: "Nous contacter",
      proposal: "Obtenir une proposition",
    },
  } satisfies PartialCopy<typeof aboutApproachMessages.en>;

const ns_aboutAwards = {
    metaTitle: "Prix & distinctions",
    metaDescription:
      "Découvrez les prix et distinctions reçus par Creative Surf pour son excellence en marketing digital, design web et satisfaction client.",
    breadcrumbCurrent: "Distinctions",
    hero: {
      title: "Prix & distinctions",
      subtitle:
        "Nous sommes fiers d'être reconnus pour notre exigence, notre innovation et la réussite de nos clients dans le marketing digital.",
      imageAlt: "Les prix et distinctions de Creative Surf",
    },
    timelineTitle: "Notre palmarès",
    years: [
      {
        awards: [
          {
            name: "Prix d'excellence en marketing digital",
            organization: "Digital Innovation Awards",
            description:
              "Récompensée pour des performances et une innovation remarquables dans nos campagnes de marketing digital.",
          },
          {
            name: "Meilleure agence SEO",
            organization: "Marketing Excellence Awards",
            description:
              "Récompensée pour des résultats exceptionnels et des stratégies innovantes en référencement naturel.",
          },
          {
            name: "Top 10 des agences de design web",
            organization: "Design Industry Association",
            description:
              "Classée parmi les meilleures agences de design web pour l'excellence créative et la satisfaction client.",
          },
        ],
      },
      {
        awards: [
          {
            name: "Meilleur employeur",
            organization: "Employer Excellence Awards",
            description:
              "Récompensée pour la qualité de sa culture d'entreprise, la satisfaction des équipes et les perspectives d'évolution.",
          },
          {
            name: "Innovation en marketing social",
            organization: "Social Media Marketing Association",
            description:
              "Récompensée pour des campagnes sociales innovantes ayant produit des résultats exceptionnels pour nos clients.",
          },
          {
            name: "Agence en pleine ascension",
            organization: "Marketing Industry Network",
            description:
              "Reconnue parmi les agences les plus dynamiques et prometteuses du secteur.",
          },
        ],
      },
      {
        awards: [
          {
            name: "Excellence en satisfaction client",
            organization: "Customer Experience Awards",
            description:
              "Récompensée pour le maintien des plus hauts standards de satisfaction client et de qualité de service.",
          },
          {
            name: "Meilleure campagne de marketing de contenu",
            organization: "Content Marketing Institute",
            description:
              "Récompensée pour une stratégie de contenu innovante ayant fortement accru l'engagement et les conversions.",
          },
        ],
      },
      {
        awards: [
          {
            name: "Agence digitale émergente de l'année",
            organization: "Digital Business Awards",
            description:
              "Reconnue comme la nouvelle agence la plus prometteuse, avec une croissance et des résultats clients remarquables.",
          },
        ],
      },
    ],
    certificationsTitle: "Certifications professionnelles",
    certifications: [
      {
        name: "Google Partner",
        description:
          "Partenaire Google certifié, avec des spécialisations Search, Display et Vidéo.",
      },
      {
        name: "Meta Business Partner",
        description:
          "Partenaire Meta Business certifié, expert de la publicité Facebook et Instagram.",
      },
      {
        name: "HubSpot Solutions Partner",
        description:
          "Partenaire HubSpot Solutions certifié, expert en inbound marketing et déploiement CRM.",
      },
      {
        name: "Shopify Partner",
        description:
          "Partenaire Shopify certifié, spécialisé dans le développement et l'optimisation de sites e-commerce.",
      },
    ],
    featured: {
      title: "Finaliste : Agence digitale de l'année",
      body:
        "Nous sommes fiers d'avoir été finalistes du prestigieux prix Agence digitale de l'année aux Digital Excellence Awards 2024. Cette distinction souligne l'engagement de notre équipe à livrer des résultats exceptionnels et à repousser les limites de l'innovation en marketing digital.",
      event: "Digital Excellence Awards 2024",
      imageAlt: "Cérémonie du prix Agence digitale de l'année",
    },
    stories: {
      title: "Réussites clients primées",
      viewCaseStudy: "Voir l'étude de cas",
      items: [
        {
          badge: "Meilleure campagne e-commerce",
          client: "StyleHouse Boutique",
          body:
            "Notre stratégie e-commerce primée a fait progresser les ventes en ligne de 78 % et élargi leur clientèle sur trois nouveaux marchés.",
          imageAlt: "Réussite e-commerce",
        },
        {
          badge: "Meilleure campagne SEO",
          client: "TechVision Inc.",
          body:
            "Notre stratégie SEO a permis à TechVision d'augmenter son trafic organique de 150 % et ses leads qualifiés de 200 %.",
          imageAlt: "Réussite SEO",
        },
        {
          badge: "Meilleure campagne social media",
          client: "Innovate Solutions",
          body:
            "Notre campagne sociale innovante a permis à cette startup de gagner 120 % d'abonnés et de boucler sa série A.",
          imageAlt: "Réussite social media",
        },
      ],
    },
    cta: {
      title: "Prêt à travailler avec une agence primée ?",
      body:
        "Faites équipe avec Creative Surf et découvrez la différence qu'un marketing digital primé peut faire pour votre activité.",
      button: "Nous contacter",
    },
  } satisfies PartialCopy<typeof aboutAwardsMessages.en>;

const ns_aboutCareers = {
    metaTitle: "Carrières",
    metaDescription:
      "Découvrez les opportunités de carrière chez Creative Surf. Rejoignez notre équipe d'experts du marketing digital et façonnez l'avenir du digital.",
    breadcrumbCurrent: "Carrières",
    hero: {
      title: "Rejoignez notre équipe",
      p1:
        "Chez Creative Surf, nous construisons une équipe de professionnels passionnés, créatifs et innovants, déterminés à livrer des résultats exceptionnels à nos clients.",
      p2:
        "Si vous cherchez un environnement dynamique où vos idées sont valorisées et où votre carrière peut s'épanouir, écrivez-nous.",
      cta: "Voir les postes ouverts",
      imageAlt: "Collaboration au sein de l'équipe Creative Surf",
    },
    culture: {
      title: "Notre culture",
      imageAlt: "La culture d'entreprise de Creative Surf",
      subtitle: "Ce qui nous distingue",
      p1:
        "Chez Creative Surf, nous sommes convaincus que nos équipes sont notre plus grande richesse. Nous avons bâti une culture qui valorise la créativité, la collaboration et l'apprentissage continu, dans un environnement inclusif où la diversité des points de vue est célébrée.",
      p2:
        "Nos collaborateurs sont encouragés à sortir du cadre, à s'approprier leur travail et à contribuer à la croissance de l'entreprise. Nous croyons à un équilibre de vie sain et fournissons le soutien et les moyens nécessaires pour que chacun s'épanouisse.",
      note: "Rejoignez une équipe qui valorise votre regard et vos talents",
    },
    benefits: {
      title: "Avantages",
      items: [
        {
          title: "Couverture santé complète",
          description:
            "Assurance médicale, dentaire et optique pour vous et vos ayants droit, avec participation de l'entreprise aux cotisations.",
        },
        {
          title: "Organisation du travail flexible",
          description:
            "Travail hybride, horaires flexibles et politique de congés généreuse pour préserver votre équilibre de vie.",
        },
        {
          title: "Développement professionnel",
          description:
            "Formations continues, participation à des conférences, soutien aux certifications et remboursement des frais d'études.",
        },
        {
          title: "Culture collaborative",
          description:
            "Travaillez avec une équipe d'experts variée, dans un cadre bienveillant qui valorise créativité et innovation.",
        },
      ],
      extraTitle: "Autres avantages",
      extras: [
        "Épargne retraite avec abondement",
        "Congé parental rémunéré",
        "Programme bien-être",
        "Événements d'entreprise",
        "Possibilité de télétravail",
        "Budget de développement professionnel",
      ],
    },
    testimonials: {
      title: "Rencontrez notre équipe",
      items: [
        {
          position: "Spécialiste SEO senior",
          years: "4 ans chez Creative Surf",
          quote:
            "Travailler chez Creative Surf a été le point fort de ma carrière. L'environnement collaboratif, les projets exigeants et les perspectives d'évolution m'ont fait grandir professionnellement et personnellement.",
        },
        {
          position: "Développeuse web",
          years: "2 ans chez Creative Surf",
          quote:
            "J'adore la culture de Creative Surf. On est encouragés à expérimenter de nouvelles technologies et approches, et l'apprentissage continu est vraiment mis en avant.",
        },
        {
          position: "Responsable marketing de contenu",
          years: "3 ans chez Creative Surf",
          quote:
            "L'équilibre vie pro / vie perso chez Creative Surf est sans égal. La flexibilité me permet d'être productif tout en gardant du temps pour ma vie personnelle et ma famille.",
        },
      ],
    },
    openings: {
      title: "Postes ouverts",
      requirementsLabel: "Profil recherché :",
      apply: "Postuler",
      jobs: [
        {
          title: "Spécialiste SEO senior",
          department: "Marketing digital",
          location: "San Francisco, CA (hybride)",
          type: "Temps plein",
          description:
            "Nous recherchons un spécialiste SEO expérimenté pour élaborer et déployer des stratégies de référencement complètes pour nos clients de tous secteurs.",
          requirements: [
            "5 ans et plus d'expérience en SEO",
            "Solides compétences analytiques et maîtrise des outils SEO",
            "Connaissance du SEO technique, de l'optimisation on-page et du netlinking",
            "Expérience de Google Analytics et de la Search Console",
            "Excellentes qualités relationnelles et de gestion de clients",
          ],
        },
        {
          title: "Développeur web",
          department: "UX & interactif",
          location: "Télétravail",
          type: "Temps plein",
          description:
            "Rejoignez notre équipe de développement pour créer des sites et applications web réactifs et ergonomiques avec les technologies les plus récentes.",
          requirements: [
            "3 ans et plus d'expérience en développement web",
            "Maîtrise de HTML, CSS, JavaScript et React",
            "Expérience de Next.js et d'autres frameworks modernes",
            "Compréhension des principes UI/UX",
            "Sens de la résolution de problèmes et souci du détail",
          ],
        },
        {
          title: "Responsable réseaux sociaux",
          department: "Marketing de contenu",
          location: "San Francisco, CA (hybride)",
          type: "Temps plein",
          description:
            "Nous cherchons un responsable réseaux sociaux créatif et stratège pour concevoir et déployer des campagnes sociales pour notre portefeuille de clients variés.",
          requirements: [
            "3 ans et plus d'expérience en gestion de réseaux sociaux",
            "Expérience en publicité sociale et en analytics",
            "Solides compétences en création de contenu et rédaction",
            "Connaissance des tendances et bonnes pratiques sociales",
            "Excellentes capacités d'organisation et de gestion du temps",
          ],
        },
        {
          title: "Stagiaire marketing digital",
          department: "Marketing digital",
          location: "San Francisco, CA (sur site)",
          type: "Stage (3 à 6 mois)",
          description:
            "Acquérez une expérience concrète du marketing digital en travaillant aux côtés de nos experts sur de vrais projets clients.",
          requirements: [
            "Formation en cours en marketing, communication ou domaine proche",
            "Compréhension de base des concepts du marketing digital",
            "Excellentes qualités rédactionnelles et orales",
            "Envie d'apprendre et de progresser dans le marketing digital",
            "Maîtrise de Microsoft Office et Google Workspace",
          ],
        },
      ],
    },
    process: {
      title: "Notre processus de recrutement",
      steps: [
        {
          title: "Candidature",
          description: "Envoyez votre CV et votre lettre de motivation via notre plateforme en ligne.",
        },
        {
          title: "Premier entretien",
          description:
            "Un entretien téléphonique ou visio avec notre équipe RH pour parler de votre parcours et de vos objectifs.",
        },
        {
          title: "Évaluation des compétences",
          description: "Réalisez un test ou un cas pratique en lien avec le poste visé.",
        },
        {
          title: "Entretien final",
          description: "Rencontrez l'équipe avec laquelle vous travaillerez, pour valider l'adéquation mutuelle.",
        },
      ],
    },
    cta: {
      title: "Aucun poste ne correspond ?",
      body:
        "Nous recherchons en permanence des talents. Envoyez-nous votre CV et nous penserons à vous pour de futures opportunités.",
      button: "Envoyer votre CV",
    },
  } satisfies PartialCopy<typeof aboutCareersMessages.en>;

const ns_aboutHistory = {
    metaTitle: "Notre histoire",
    metaDescription:
      "Découvrez le parcours et les étapes clés de CreativeSurf, de sa création à son statut d'agence de marketing digital de référence.",
    breadcrumbCurrent: "L'histoire de CreativeSurf",
    hero: {
      title: "Notre parcours",
      subtitle:
        "D'une petite équipe de marketeurs passionnés à une agence de marketing digital de référence : découvrez l'histoire de CreativeSurf.",
      imageAlt: "L'histoire de CreativeSurf",
    },
    timelineTitle: "Notre chronologie",
    timeline: [
      {
        title: "Les débuts",
        body:
          "CreativeSurf a été fondée par une petite équipe d'experts du marketing digital, avec l'ambition d'aider les entreprises à s'orienter dans un paysage digital complexe. À cinq, dans un petit bureau, nous avons commencé par proposer du SEO et du marketing de contenu à des entreprises locales.",
        imageAlt: "L'équipe fondatrice de CreativeSurf",
      },
      {
        title: "Expansion & innovation",
        body:
          "Malgré le contexte mondial difficile, 2020 a été une année de croissance pour CreativeSurf. Nous avons élargi notre offre au design web et au marketing sur les réseaux sociaux. Notre équipe a doublé et nous avons déménagé dans des locaux plus grands.",
        imageAlt: "La croissance de CreativeSurf",
      },
      {
        title: "Reconnaissance du secteur",
        body:
          "Notre exigence a été récompensée par nos premiers prix professionnels pour des campagnes de marketing digital remarquables. Nous avons lancé notre plateforme d'analytics propriétaire, offrant à nos clients une vision plus fine de leurs performances.",
        imageAlt: "Les récompenses de CreativeSurf",
      },
      {
        title: "Expansion nationale",
        body:
          "CreativeSurf s'est déployée à l'échelle nationale avec l'ouverture de bureaux dans trois grandes villes. Nous avons lancé notre académie du marketing digital, offrant formations et ressources aux entreprises et aux professionnels.",
        imageAlt: "L'expansion nationale de CreativeSurf",
      },
      {
        title: "Croissance internationale",
        body:
          "Nous avons fait nos premiers pas sur les marchés internationaux, en nouant des partenariats avec des agences en Europe et en Asie. Notre équipe a dépassé les 100 experts et nous avons introduit des solutions marketing avancées basées sur l'IA.",
        imageAlt: "La croissance internationale de CreativeSurf",
      },
      {
        title: "Innovation & vision d'avenir",
        body:
          "Aujourd'hui, CreativeSurf continue d'innover et de mener la marche dans le marketing digital. Nous avons lancé notre initiative de durabilité, avec l'engagement de réduire notre impact environnemental et d'aider nos clients à adopter des pratiques marketing durables. En misant sur les technologies émergentes comme l'IA et le métavers, nous préparons nos clients au marketing digital de demain.",
        imageAlt: "CreativeSurf aujourd'hui",
      },
    ],
    valuesTitle: "Nos valeurs durables",
    values: [
      {
        title: "Innovation",
        body:
          "Depuis le premier jour, nous nous engageons à rester à la pointe des tendances et technologies du marketing digital. Cet esprit d'innovation continue de nous porter.",
      },
      {
        title: "Réussite client",
        body:
          "La réussite de nos clients a toujours été notre principale mesure du succès. Nous sommes fiers d'avoir aidé des centaines d'entreprises à croître et prospérer dans l'univers digital.",
      },
      {
        title: "Communauté",
        body:
          "Nous croyons qu'il faut rendre aux communautés que nous servons. Tout au long de notre histoire, nous avons maintenu un engagement local et sociétal.",
      },
    ],
    cta: {
      title: "Faites partie de notre avenir",
      body:
        "Rejoignez-nous pour écrire les prochains chapitres de l'histoire de CreativeSurf. Client, partenaire ou membre de l'équipe : il y a une place pour vous.",
      contact: "Nous contacter",
      join: "Rejoindre l'équipe",
    },
  } satisfies PartialCopy<typeof aboutHistoryMessages.en>;

const ns_aboutReviews = {
    metaTitle: "Avis & témoignages clients",
    metaDescription:
      "Découvrez ce que nos clients disent de leur collaboration avec Creative Surf. Lisez les témoignages des entreprises que nous avons accompagnées.",
    breadcrumbCurrent: "Avis",
    hero: {
      title: "Avis & témoignages clients",
      subtitle:
        "Ne nous croyez pas sur parole. Découvrez ce que nos clients disent de leur collaboration avec Creative Surf.",
      outOfFive: "{rating} sur 5",
      basedOn: "Sur la base de {count} avis clients",
    },
    reviews: [
      {
        position: "Directrice marketing",
        date: "15 mars 2025",
        text:
          "Travailler avec Creative Surf a complètement transformé notre présence digitale. Leur approche stratégique de nos enjeux marketing a produit des résultats mesurables en trois mois seulement : +45 % de taux de conversion et un engagement social doublé.",
      },
      {
        position: "PDG",
        date: "3 février 2025",
        text:
          "Fondateur de startup, j'avais besoin d'une agence capable de gérer tout le marketing pendant que je me concentrais sur le produit. Creative Surf a dépassé mes attentes sur tous les plans. Ils ont créé notre identité de marque, développé notre site et mené une campagne de lancement qui nous a valu des articles dans les grands médias du secteur. Leur travail a directement contribué à notre levée de série A.",
      },
      {
        position: "Responsable e-commerce",
        date: "22 janvier 2025",
        text:
          "Nos ventes en ligne ont progressé de 78 % depuis le début de notre collaboration avec Creative Surf. Leur compréhension des tendances e-commerce et du comportement des consommateurs est remarquable. La photographie produit et les campagnes sociales créées pour le lancement de notre collection saisonnière étaient superbes et très efficaces. Ils ont toujours une idée d'avance.",
      },
      {
        position: "Directeur des opérations",
        date: "10 décembre 2024",
        text:
          "Dans un secteur B2B comme le nôtre, trouver une agence qui comprend les subtilités de notre marché était difficile — jusqu'à Creative Surf. Ils ont repensé notre stratégie de génération de leads et créé des contenus qui parlent vraiment à nos clients cibles. Leur approche pilotée par la donnée et leur reporting régulier rendent le ROI limpide.",
      },
      {
        position: "Responsable marketing",
        date: "5 novembre 2024",
        text:
          "L'expertise SEO de Creative Surf a été précieuse pour notre entreprise. Six mois après la mise en œuvre de leurs recommandations, notre trafic organique avait augmenté de 120 % et nos positions sur les requêtes clés s'étaient nettement améliorées. Une équipe réactive, compétente et sincèrement investie dans notre réussite.",
      },
      {
        position: "Fondateur",
        date: "18 octobre 2024",
        text:
          "Dirigeant de petite entreprise, j'hésitais à investir dans le marketing digital, mais Creative Surf a rendu la démarche accessible et abordable. Ils ont pris le temps de comprendre mes besoins spécifiques et bâti une stratégie sur mesure qui m'a aidé à toucher de nouveaux clients et à croître. Leur attention et leur souci du détail font la différence.",
      },
    ],
    recognition: {
      title: "Reconnaissance du secteur",
      items: [
        { name: "Excellence marketing", event: "Digital Innovation Awards 2024", imageAlt: "Prix d'excellence en marketing digital" },
        { name: "Meilleure agence SEO", event: "Digital Marketing Awards 2023", imageAlt: "Meilleure agence SEO" },
        { name: "Meilleure agence de design web", event: "Creative Excellence Awards 2023", imageAlt: "Meilleure agence de design web" },
        { name: "Meilleur employeur", event: "Employer Excellence Awards 2022", imageAlt: "Meilleur employeur" },
      ],
    },
    platforms: {
      title: "Retrouvez-nous sur les plateformes d'avis",
      summary: "{rating} sur 5 sur la base de {count} avis",
      readOn: "Lire les avis {platform}",
    },
    cta: {
      title: "Envie d'obtenir ce type de résultats ?",
      body:
        "Rejoignez notre liste grandissante de clients satisfaits et découvrez comment Creative Surf peut transformer votre présence digitale.",
      button: "Nous contacter",
    },
  } satisfies PartialCopy<typeof aboutReviewsMessages.en>;

const ns_aboutValues = {
    metaTitle: "Nos valeurs fondamentales",
    metaDescription:
      "Découvrez les valeurs fondamentales qui guident la culture, les décisions et les relations client de Creative Surf.",
    breadcrumbCurrent: "Nos valeurs",
    hero: {
      title: "Nos valeurs fondamentales",
      p1:
        "Chez Creative Surf, nos valeurs sont bien plus que des mots affichés au mur. Elles guident nos décisions, façonnent notre culture et définissent notre façon de travailler avec nos clients et entre nous.",
      p2:
        "Ces principes sont au cœur de l'entreprise depuis le premier jour et continuent de porter notre réussite et notre croissance.",
      imageAlt: "Les valeurs fondamentales de Creative Surf",
    },
    principlesTitle: "Les principes qui nous guident",
    values: [
      {
        title: "Réussite client",
        description:
          "Nous mesurons notre succès aux résultats que nous obtenons pour nos clients. Votre croissance est notre objectif premier et le socle de tout ce que nous faisons.",
      },
      {
        title: "Collaboration",
        description:
          "Nous croyons à la force du travail d'équipe, en interne comme avec nos clients. Ensemble, nous obtenons de meilleurs résultats que chacun séparément.",
      },
      {
        title: "Innovation",
        description:
          "Nous restons à la pointe des tendances et technologies du marketing digital pour offrir des solutions avancées qui donnent à nos clients un avantage concurrentiel.",
      },
      {
        title: "Excellence",
        description:
          "Nous nous engageons à livrer une qualité exceptionnelle dans tout ce que nous faisons, de la stratégie à l'exécution et au reporting.",
      },
      {
        title: "Intégrité",
        description:
          "Nous agissons avec honnêteté, transparence et éthique. Nous faisons ce qui est juste pour nos clients, même quand ce n'est pas le chemin le plus simple.",
      },
      {
        title: "Responsabilité",
        description:
          "Nous assumons notre responsabilité envers notre communauté et l'environnement, à travers des pratiques durables et un engagement local.",
      },
    ],
    inAction: {
      title: "Nos valeurs en action",
      imageAlt: "Les valeurs de Creative Surf en action",
      subtitle: "Comment nous vivons nos valeurs au quotidien",
      body:
        "Nos valeurs ne sont pas de simples déclarations d'intention — elles se traduisent dans notre travail et nos décisions au quotidien. De l'organisation de nos équipes à notre manière d'aborder les défis clients, elles sont partout.",
      points: [
        "Nous célébrons les victoires de nos clients comme les nôtres",
        "Nous investissons dans l'apprentissage et le développement continus",
        "Nous offrons un reporting transparent et des retours honnêtes",
        "Nous soutenons les initiatives locales et les pratiques durables",
      ],
    },
    community: {
      title: "Nos initiatives citoyennes",
      items: [
        {
          title: "Initiatives éducatives",
          description:
            "Nous collaborons avec des écoles et universités locales pour proposer des formations au marketing digital et des stages aux étudiants.",
        },
        {
          title: "Engagement environnemental",
          description:
            "Nos actions de durabilité incluent la réduction de notre empreinte carbone, la dématérialisation de nos processus et l'organisation d'opérations de nettoyage.",
        },
        {
          title: "Soutien aux associations",
          description:
            "Chaque année, nous offrons des prestations de marketing digital pro bono à des associations sélectionnées pour amplifier leur impact.",
        },
      ],
    },
    cta: {
      title: "Vous partagez nos valeurs ?",
      body:
        "Si nos valeurs vous parlent, explorons ensemble comment travailler — en tant que client, partenaire ou membre de l'équipe.",
      contact: "Nous contacter",
      join: "Rejoindre l'équipe",
    },
  } satisfies PartialCopy<typeof aboutValuesMessages.en>;

const ns_auth = {
    brand: "Creative Surf",

    loginTitle: "Bon retour",
    loginSubtitle: "Connectez-vous à votre compte Creative Surf",
    identifier: "E-mail",
    identifierPlaceholder: "vous@exemple.com",
    password: "Mot de passe",
    passwordPlaceholder: "Saisissez votre mot de passe",
    signIn: "Se connecter",
    signingIn: "Connexion…",
    invalidCredentials: "Identifiants invalides",
    noAccount: "Nouveau chez Creative Surf ?",
    createOne: "Créer un compte",

    registerTitle: "Créez votre compte",
    registerSubtitle: "Nous vous enverrons un code par e-mail pour confirmer votre identité",
    name: "Nom complet",
    namePlaceholder: "Votre nom",
    email: "E-mail",
    emailPlaceholder: "vous@exemple.com",
    choosePassword: "Mot de passe",
    choosePasswordPlaceholder: "Au moins 8 caractères",
    passwordHint: "Utilisez au moins 8 caractères, dont une lettre et un chiffre.",
    createAccount: "Créer un compte",
    creatingAccount: "Envoi du code…",
    haveAccount: "Vous avez déjà un compte ?",
    signInLink: "Se connecter",

    otpTitle: "Consultez votre boîte mail",
    otpSubtitle: "Nous avons envoyé un code à 6 chiffres à {email}. Il expire dans 10 minutes.",
    otpLabel: "Code de vérification",
    verify: "Vérifier et continuer",
    verifying: "Vérification…",
    resend: "Renvoyer le code",
    resendIn: "Renvoyer dans {seconds}s",
    resent: "Un nouveau code est en route.",
    changeEmail: "Utiliser une autre adresse",

    googleContinue: "Continuer avec Google",
    orDivider: "ou",

    dashboard: "Tableau de bord",
    profileDetails: "Détails du profil",
    displayName: "Nom affiché",
    edit: "Modifier",
    save: "Enregistrer",
    saving: "Enregistrement…",
    cancel: "Annuler",
    nameUpdated: "Nom mis à jour.",
    usersTitle: "Utilisateurs",
    administrators: "Administrateurs",
    members: "Membres",
    noMembers: "Aucun membre pour l’instant",
    joined: "Inscrit le",
    lastSeen: "Vu la dernière fois",
    never: "Jamais",
    signInMethod: "Méthode de connexion",
    methodPassword: "Mot de passe",
    methodGoogle: "Google",
    methodBoth: "Mot de passe + Google",
    accountTitle: "Votre compte",
    accountGreeting: "Bonjour {name}",
    accountEmail: "E-mail",
    accountRole: "Type de compte",
    roleAdmin: "Administrateur",
    roleUser: "Membre",
    memberSince: "Membre depuis",
    profileOverview: "Aperçu",
    profileAbout: "À propos",
    savedCvsTitle: "CV enregistrés",
    allCvsTitle: "Tous les CV",
    statCvs: "CV",
    statPeople: "Personnes",
    cvsEmptyMember: "Vous n'avez pas encore créé de CV.",
    cvsEmptyAdmin: "Personne n'a encore généré de CV.",
    createFirstCv: "Créer mon premier CV",
    downloadPdf: "Télécharger en PDF",
    viewCv: "Voir",
    closePreview: "Fermer l'aperçu",
    openCv: "Ouvrir",
    openCvCopy: "Modifier une copie",
    deleteCv: "Supprimer",
    deleteCvConfirm: "Supprimer ce CV enregistré ? Cette action est irréversible.",
    peopleTitle: "Personnes",
    peopleSubtitle: "Toutes les personnes inscrites sur le site.",
    makeAdmin: "Nommer administrateur",
    makeMember: "Rétrograder en membre",
    roleChangeConfirm: "Changer {name} en {role} ?",
    deleteUser: "Supprimer le compte",
    deleteUserConfirm: "Supprimer {name} ? Son compte et ses CV enregistrés seront définitivement supprimés. Cette action est irréversible.",
    youBadge: "Vous",
    tabPeople: "Utilisateurs",
    tabCvs: "Tous les CV",
    tabChats: "Chats IA",
    chatsTitle: "Conversations avec l'assistant",
    chatsSubtitle: "Ce que les visiteurs ont demandé à l'assistant du site.",
    statChats: "Conversations",
    chatsEmpty: "Personne n'a encore utilisé l'assistant.",
    chatsLoadFailed: "Impossible de charger les conversations.",
    chatVisitor: "Visiteur",
    chatSignedIn: "Connecté",
    chatAnonymous: "Visiteur anonyme",
    chatTurns: "{count} messages",
    chatStartedOn: "Démarrée sur",
    chatOpen: "Lire la conversation",
    chatCollapse: "Masquer la conversation",
    chatDelete: "Supprimer la conversation",
    chatDeleteConfirm: "Supprimer cette conversation ? Cette action est irréversible.",
    userSearch: "Rechercher des utilisateurs",
    userNoMatches: "Aucun utilisateur ne correspond à cette recherche.",
    chatSearch: "Rechercher dans les conversations",
    chatNoMatches: "Aucune conversation ne correspond à cette recherche.",
    accountSignedInWith: "Connecté avec",
    adminPanel: "Accéder aux articles admin",
    signOut: "Se déconnecter",
    signingOut: "Déconnexion…",

    errorGoogleUnavailable: "La connexion Google n'est pas encore configurée.",
    errorGoogleDenied: "La connexion Google a été annulée.",
    errorGoogleState: "Ce lien de connexion a expiré. Veuillez réessayer.",
    errorGoogleUnverified: "Ce compte Google n'a pas d'adresse e-mail vérifiée.",
    errorGoogleFailed: "La connexion Google a échoué. Veuillez réessayer.",
    genericError: "Une erreur est survenue. Veuillez réessayer.",
    footer: "Creative Surf",
  } satisfies PartialCopy<typeof authMessages.en>;

const ns_blogPost = {
    notFound: "Article introuvable",
    backToBlogs: "← Retour au blog",
    backToBlogsShort: "Retour au blog",
    back: "Retour",
    backToAll: "Retour à tous les articles",
    edit: "Modifier",
    delete: "Supprimer",
    confirmDelete: "Supprimer cet article ? Cette action est irréversible.",
    writtenBy: "Écrit par",
    share: "Partager",
    keyTakeaways: "Points clés",
    seo: {
      inboundReal: "À lire aussi sur Creative Surf Immobilier",
      inbound: "À lire aussi sur Creative Surf",
      outbound: "Ressources externes",
    },
  } satisfies PartialCopy<typeof blogPostMessages.en>;

const ns_blogs = {
    eyebrow: "Creative Surf · Blog",
    title: "Analyses & idées",
    subtitle:
      "Le regard de nos experts sur le marketing digital, l'UX design, le SEO et la stratégie de marque — directement par l'équipe Creative Surf.",
    categoryAll: "Tous",
    newPost: "Nouvel article",
    logout: "Déconnexion",
    emptyTitle: "Aucun article pour l'instant",
    emptyAdmin: "Créez votre premier article pour commencer.",
    emptyPublic: "Revenez bientôt pour les analyses de l'équipe Creative Surf.",
    writeFirst: "Écrire le premier article",
    edit: "Modifier",
    delete: "Supprimer",
    confirmDelete: 'Supprimer « {title} » ? Cette action est irréversible.',
    read: "Lire →",
    brand: "Creative Surf",
    like: "J'aime",
    comment: "Commenter",
    share: "Partager",
    likesCount: "{count} J'aime",
    likeCountOne: "1 J'aime",
    commentsCount: "{count} commentaires",
    commentCountOne: "1 commentaire",
    sharesCount: "{count} partages",
    shareCountOne: "1 partage",
    viewsCount: "{count} vues",
    viewCountOne: "1 vue",
    shareInstagram: "Copier le lien pour Instagram",
    copyLink: "Copier le lien",
    copy: "Copier",
    copied: "Copié",
    close: "Fermer",
    commentsTitle: "Commentaires",
    noComments: "Aucun commentaire pour l'instant — soyez le premier à réagir.",
    yourName: "Votre nom",
    writeComment: "Écrire un commentaire…",
    postComment: "Publier",
    posting: "Publication…",
    commentFailed: "Impossible de publier votre commentaire. Veuillez réessayer.",
    signInToComment: "Connectez-vous pour participer à la conversation.",
    signInToCommentAction: "Se connecter",
    createAccountAction: "Créer un compte gratuit",
    commentingAs: "Vous commentez en tant que {name}",
    deleteComment: "Supprimer le commentaire",
    confirmDeleteComment: "Supprimer ce commentaire ? Cette action est irréversible.",
    deleteCommentFailed: "Impossible de supprimer ce commentaire. Veuillez réessayer.",
    editComment: "Modifier",
    saveComment: "Enregistrer",
    cancelEdit: "Annuler",
    editedLabel: "modifié",
    editCommentFailed: "Impossible d'enregistrer vos modifications. Veuillez réessayer.",
    composerPrompt: "À quoi pensez-vous ?",
    categoriesTitle: "Fil",
    loadMore: "Voir plus d'articles",
    allCaughtUp: "Vous êtes à jour",
    readFullPost: "Lire l'article complet",
    viewAllComments: "Voir les {count} commentaires",
    hideComments: "Masquer les commentaires",
    timeJustNow: "À l'instant",
    timeMinutes: "{count} min",
    timeHours: "{count} h",
    timeDays: "{count} j",
    timeWeeks: "{count} sem",
    trendingTitle: "Tendances",
    postsLabel: "Articles",
    topicsLabel: "Thèmes",
    loginToPost: "Connectez-vous pour publier",
  } satisfies PartialCopy<typeof blogsMessages.en>;

const ns_chat = {
    open: "Discuter avec nous",
    close: "Fermer le chat",
    bubble: "Demandez à Surf !",
    title: "Demandez à Surf",
    subtitle: "L'assistant de Creative Surf",
    greeting:
      "Bonjour — je suis Surf, l'assistant du site. Posez-moi vos questions sur Creative Surf, ou sur le SEO, la publicité, le contenu et la conversion.",
    disclaimer:
      "Assistant IA. Il peut se tromper — vérifiez toute information importante auprès de l'équipe.",
    placeholder: "Posez une question…",
    send: "Envoyer",
    stop: "Arrêter",
    thinking: "Réflexion…",
    clear: "Nouvelle conversation",
    error: "Une erreur s'est produite. Veuillez réessayer.",
    suggestions: [
      "Que fait Creative Surf ?",
      "Comment augmenter mon trafic organique ?",
      "Pouvez-vous m'aider avec Google Ads ?",
      "Comment vous contacter ?",
    ],
  } satisfies PartialCopy<typeof chatMessages.en>;

const ns_common = {
    cta: {
      getStarted: "Commencer",
      startProject: "Démarrer un projet",
      contactUs: "Nous contacter",
      talkToUs: "Parlons-en",
      learnMore: "En savoir plus",
      readMore: "Lire la suite",
      seeMore: "Voir plus",
      viewAll: "Tout voir",
      getProposal: "Obtenir une proposition",
      getQuote: "Obtenir un devis gratuit",
      bookCall: "Réserver un appel",
      requestAudit: "Demander un audit gratuit",
      exploreServices: "Découvrir nos services",
      backHome: "Retour à l'accueil",
      goBack: "Retour",
      submit: "Envoyer",
      send: "Envoyer",
      cancel: "Annuler",
      save: "Enregistrer",
      close: "Fermer",
      next: "Suivant",
      previous: "Précédent",
    },
    labels: {
      loading: "Chargement…",
      error: "Une erreur est survenue",
      retry: "Réessayer",
      required: "Obligatoire",
      optional: "Facultatif",
      search: "Rechercher",
      readingTime: "{minutes} min de lecture",
      published: "Publié",
      updated: "Mis à jour",
      by: "par",
      all: "Tous",
      language: "Langue",
      chooseLanguage: "Choisir la langue",
      menu: "Menu",
      toggleMenu: "Ouvrir le menu",
    },
    breadcrumb: {
      home: "Accueil",
      about: "À propos",
      services: "Services",
      blogs: "Blog",
      seoLeadGen: "SEO & génération de leads",
      organicSearch: "Référencement naturel",
      digitalAdvertising: "Publicité digitale",
      ecommerce: "E-commerce",
      digitalMarketing: "Marketing digital",
      digitalIntelligence: "Digital Intelligence",
      uxInteractive: "UX & interactif",
      design: "Design",
      realEstate: "Immobilier",
      projects: "Projets",
    },
  } satisfies PartialCopy<typeof commonMessages.en>;

const ns_contact = {
    metaTitle: "Contact | Creative Surf",
    metaDescription:
      "Intéressé par une collaboration avec Creative Surf ? Contactez-nous dès aujourd'hui pour explorer une stratégie sur mesure.",
    headerLine1: "Intéressé par une collaboration avec Creative Surf ? Améliorons votre marque ensemble !",
    headerLine2: "Contactez-nous dès aujourd'hui pour explorer une stratégie de médias sociaux personnalisée conçue spécialement pour vous. Nous avons hâte de surfer avec vous !",
    form: {
      name: "Nom",
      firstName: "Prénom",
      lastName: "Nom de famille",
      required: "(obligatoire)",
      company: "Nom de l'entreprise (le cas échéant)",
      email: "E-mail",
      socialUrl: "URL des médias sociaux",
      socialPlaceholder: "http://",
      servicesTitle: "Quels services vous intéressent ?",
      serviceOptions: [
        "Gestion des médias sociaux",
        "Audit des médias sociaux",
        "Création de contenu",
        "Gestion Pinterest",
        "Je ne trouve pas ce que je cherche, pouvons-nous discuter ?",
      ],
      comments: "Commentaires supplémentaires sur ce que vous recherchez (calendrier, exigences, budget, etc.)",
      howDidYouHear: "Comment avez-vous entendu parler de nous ?",
      submit: "SOUMETTRE",
      submitting: "ENVOI EN COURS...",
      errorGeneric: "Veuillez remplir tous les champs obligatoires.",
      errorNetwork: "Erreur réseau. Veuillez réessayer.",
      successTitle: "Merci !",
      successBody: "Nous avons hâte de travailler avec vous ! Nous étudierons votre message et vous répondrons sous peu.",
      sendAnother: "Soumettre un autre message",
    },
    kicker: "Contactez-nous",
    errorServices: "Veuillez sélectionner au moins un service.",
    badges: [
      "Réponse sous 24 h",
      "Confidentialité garantie à 100 %",
      "150+ marques accélérées"
    ],
    cards: {
      whatsappTitle: "Échange stratégique sur WhatsApp",
      whatsappBody: "Besoin d'une réponse immédiate ? Discutez directement avec nos responsables de campagne sur WhatsApp.",
      whatsappCta: "Discuter sur WhatsApp",
      emailTitle: "Boîte e-mail directe",
      emailBody: "Envoyez vos appels d'offres, briefs détaillés ou demandes de collaboration directement à notre équipe.",
      emailCopy: "Copier l'adresse e-mail",
      emailCopied: "E-mail copié !",
      hqTitle: "Siège de l'agence",
      hqLocation: "Dacca, Bangladesh",
      hqHours: "Lun–ven : 9 h – 18 h (GMT+6)",
      hqAvailable: "Disponibles pour de nouveaux projets"
    },
    faqKicker: "Des questions ?",
    faqTitle: "Questions",
    faqAccent: "fréquentes.",
    faq: [
      {
        q: "En combien de temps Creative Surf répond-elle à ma demande ?",
        a: "Nous étudions chaque demande avec attention et revenons vers vous sous 24 heures ouvrées avec un premier plan d'accompagnement adapté à votre marque."
      },
      {
        q: "Que comprend un audit des réseaux sociaux ?",
        a: "Notre audit analyse la performance de vos profils, l'engagement de votre audience, votre identité visuelle, vos accroches et votre positionnement face à la concurrence, avec des actions concrètes de croissance."
      },
      {
        q: "Pouvez-vous créer une offre sur mesure selon mon budget et mes objectifs ?",
        a: "Oui ! Chaque accord est personnalisé selon vos canaux, votre fréquence de publication, la gestion de votre budget publicitaire et votre calendrier de croissance."
      },
      {
        q: "Gérez-vous à la fois le contenu organique et les campagnes payantes ?",
        a: "La stratégie digitale full-funnel est notre spécialité : nous associons contenus organiques à fort impact et campagnes payantes orientées ROI."
      },
      {
        q: "Comment se passe l'onboarding une fois le partenariat décidé ?",
        a: "Après votre demande, nous organisons un court appel de découverte, livrons une proposition sur mesure, validons les éléments clés et lançons l'exécution sous 5 à 7 jours ouvrés."
      }
    ],
  } satisfies PartialCopy<typeof contactMessages.en>;

const ns_cvTeaser = {
    hero: {
      title: "Créez votre CV",
      titleHighlight: "en 60 secondes",
      subtitle: "Collez vos notes en vrac et l'annonce visée. Vous obtenez un CV prêt pour les recruteurs, bâti uniquement sur ce que vous avez réellement fait — noté face à cette annonce, et à vous en PDF gratuit.",
      ctaPrimary: "Créer mon CV",
      trust: ["Rien d'inventé","PDF gratuit, sans frais d'export","Colonne unique, compatible ATS"],
    },
  } satisfies PartialCopy<typeof cvTeaserMessages.en>;

const ns_cvBuilder = {
    metaTitle: "Générateur de CV IA gratuit — compatible ATS | Creative Surf",
    metaDescription:
      "Transformez quelques notes en un CV prêt pour les recruteurs. Collez l'annonce, voyez les exigences déjà couvertes et téléchargez un PDF gratuit compatible ATS. Nous n'inventons jamais d'employeur, de date ni de chiffre.",
    hero: {
      ...ns_cvTeaser.hero,
      badge: "Gratuit · Sans inscription",
      ctaSecondary: "Voir un exemple de CV",
    },
    stats: [
      { value: "~60s", label: "De quelques notes à un PDF terminé" },
      { value: "0", label: "Paiement entre vous et votre téléchargement" },
      { value: "6", label: "Langues possibles pour votre CV" },
    ],
    import: {
      title: "Vous avez déjà un CV ?",
      subtitle:
        "Importez un fichier PDF ou Word (.docx) pour voir tout de suite son score ATS. Nous remplissons aussi le formulaire : l'améliorer ne prend qu'un clic.",
      button: "Importer un CV",
      reading: "Lecture de votre CV…",
      success: "Votre CV est dans l'aperçu avec son score ATS, et le formulaire est rempli. Générez pour obtenir une version améliorée.",
      failed: "Impossible de lire ce CV. Essayez un autre fichier ou remplissez le formulaire à la main.",
    },
    guestNotice: {
      title: "Vous créez sans compte",
      subtitle: "Créez et téléchargez votre CV sans vous connecter — il ne sera rattaché à aucun compte, vous ne pourrez donc pas le rouvrir plus tard. Un compte gratuit garde vos CV au même endroit.",
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
      links: "Liens (facultatif)",
      photo: "Photo (facultatif)",
      photoAdd: "Ajouter une photo",
      photoChange: "Remplacer la photo",
      photoRemove: "Retirer",
      photoReading: "Préparation…",
      photoFailed: "Impossible de lire cette photo. Essayez un autre fichier.",
      photoTooLarge: "Cette photo est trop lourde. Essayez une image plus petite.",
      photoHint:
        "La photo est attendue sur un CV dans une grande partie de l'Europe, de l'Asie et de l'Amérique latine, mais elle est écartée avant tout regard humain au Royaume-Uni, aux États-Unis et au Canada. Laissez le champ vide si vous postulez là-bas.",
      languages: "Langues (facultatif)",
      languageName: "Langue",
      languageLevel: "Niveau",
      languageAdd: "Ajouter une autre langue",
      languageRemove: "Retirer cette langue",
      languagePlaceholder: "Français",
      languagesHint:
        "Votre niveau figure dans le CV tel que vous l'indiquez ici : nous ne l'arrondissons jamais pour coller à l'annonce.",
      linkLabel: "Lien",
      linkType: "Type",
      linkAdd: "Ajouter un autre lien",
      linkRemove: "Supprimer ce lien",
      linksHint:
        "Collez un lien — LinkedIn, GitHub, votre propre site, peu importe. Choisissez de quoi il s'agit dans la liste à côté. Un lien « Autre » prend dans le CV le nom du site visé, alors collez l'adresse complète plutôt qu'un simple identifiant.",
    },
    fields: {
      fullName: { label: "Nom complet", placeholder: "Alex Morgan" },
      jobTitle: { label: "Poste visé ou titre actuel", placeholder: "Ingénieur frontend senior" },
      email: { label: "E-mail", placeholder: "alex@example.com" },
      phone: { label: "Téléphone", placeholder: "+33 6 12 34 56 78" },
      location: { label: "Localisation", placeholder: "Paris, France" },
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
      effort: { label: "Effort" },
    },
    languageLevels: {
      native: "Langue maternelle",
      fluent: "Courant",
      professional: "Professionnel",
      intermediate: "Intermédiaire",
      basic: "Notions",
    },
    linkTypes: {
      linkedin: "LinkedIn",
      github: "GitHub",
      portfolio: "Portfolio",
      other: "Autre",
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
      high: "Élevé",
      low: "Faible",
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
      view: "Voir",
      startOver: "Effacer le formulaire",
    },
    wizard: {
      label: "Étapes",
      stepOf: "Étape {current} sur {total}",
      back: "Retour",
      next: "Suivant",
      nextTo: "Suivant : {step}",
      filled: "Rempli",
      add: "Ajouter",
      jump: "Aller à l'étape {n} : {step}",
      short: { basics: "Vous", profiles: "Liens", experience: "Expérience", education: "Formation", target: "Cible" },
      profiles: "Liens et langues",
      profilesHint: "Où un recruteur peut voir votre travail, et les langues dans lesquelles vous travaillez. Les deux sont facultatifs.",
      experience: "Expérience",
      experienceHint: "Chaque poste que vous voulez voir figurer. Les demi-phrases et les fautes de frappe ne gênent pas — le détail compte plus que la forme.",
      education: "Formation et compétences",
      educationHint: "Diplômes et formations, puis les outils et points forts sur lesquels vous accepteriez d'être testé.",
      ready: "Prêt quand vous l'êtes",
      readyHint: "Le reste est facultatif. Générez maintenant, ou ajoutez d'abord l'annonce pour un CV plus ciblé et un score de correspondance.",
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
    ats: {
      title: "Compatibilité ATS",
      caption: "{passed} contrôles réussis sur {total}",
      tiers: { strong: "Prêt pour les ATS", good: "Presque prêt", weak: "À retravailler" },
      tierHints: {
        strong: "Un logiciel de recrutement peut lire chaque partie de ce CV. Rien ne vous freine ici.",
        good:
          "Lisible, mais les points ci-dessous sont là où un CV perd discrètement des points. Corrigez ce que vous pouvez puis régénérez.",
        weak:
          "Un logiciel de suivi des candidatures aura du mal avec ce CV. Reprenez les échecs ci-dessous — la plupart se règlent en détaillant vos notes.",
      },
      note:
        "Ceci évalue la mécanique qu'un logiciel de recrutement lit en premier : structure, dates, chiffres, coordonnées. C'est une question différente de la correspondance avec l'annonce, et un CV peut réussir l'une et rater l'autre.",
      checks: {
        contact: {
          label: "Coordonnées complètes",
          fix:
            "Ajoutez votre téléphone et votre localisation — un analyseur cherche les deux dans l'en-tête.",
        },
        profileLinks: {
          label: "Au moins un lien de profil",
          fix:
            "Ajoutez un lien LinkedIn, site personnel ou GitHub ci-dessus. La plupart des recruteurs en ouvrent un avant d'appeler.",
        },
        headline: {
          label: "Accroche courte et précise",
          fix:
            "L'accroche manque ou est trop longue à lire. Un poste visé plus précis dans le formulaire y remédie.",
        },
        summary: {
          label: "Résumé de la bonne longueur",
          fix: "Visez 25 à 130 mots. Plus court ne dit rien ; plus long n'est pas lu.",
        },
        experienceDepth: {
          label: "Chaque poste est assez détaillé",
          fix:
            "Certains postes comptent moins de trois puces. Détaillez davantage ce que vous y avez fait dans votre expérience.",
        },
        dates: {
          label: "Chaque poste est daté",
          fix:
            "Un poste sans dates est un poste qu'un analyseur ne sait pas situer. Ajoutez les années à votre expérience.",
        },
        metrics: {
          label: "Réalisations mesurables",
          fix:
            "Trop peu de puces contiennent un chiffre. Ajoutez les tailles d'équipe, pourcentages, budgets ou délais dont vous vous souvenez vraiment.",
        },
        bulletLength: {
          label: "Puces d'une longueur lisible",
          fix: "Plusieurs puces sont très courtes ou trop longues. Entre six et trente mots se lit le mieux.",
        },
        skills: {
          label: "Compétences groupées et précises",
          fix: "Listez plus de compétences, et assez pour former au moins deux groupes.",
        },
        firstPerson: {
          label: "Rédigé sans « je » ni « mon »",
          fix: "Un CV s'écrit à la première personne sous-entendue. Régénérer suffit généralement.",
        },
        length: {
          label: "Longueur globale correcte",
          fix: "Visez environ 300 à 850 mots. Étoffez vos notes si c'est mince, allégez si c'est trop long.",
        },
      },
    },
    match: {
      title: "Correspondance avec l'annonce",
      lockedTitle: "Score de correspondance verrouillé",
      lockedBody:
        "Collez l'annonce dans « Cible et ton » et nous évaluerons ce CV face à ce que cet employeur demande réellement.",
      ungradedTitle: "Pas évalué cette fois",
      ungradedBody:
        "Nous n'avons pas pu évaluer ce CV face à l'annonce cette fois-ci. Relancer la génération suffit généralement — et un score dont nous ne répondons pas vaut moins que pas de score du tout.",
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
          title: "Six langues, un seul parcours",
          body:
            "Rédigez le même CV en anglais, français, allemand, espagnol, arabe ou bengali, indépendamment de la langue du site. Utile quand vous postulez en Europe, dans le Golfe et en Asie du Sud, pas sur un seul marché.",
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
          label: "CV rédigé en six langues",
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
  } satisfies PartialCopy<typeof cvBuilderMessages.en>;




const ns_editor = {
    editPost: "Modifier l'article",
    newPost: "Nouvel article",
    preview: "Aperçu",
    editorMode: "Éditeur",
    untitled: "Article sans titre",
    noContent: "*Aucun contenu pour l'instant…*",
    titlePlaceholder: "Titre de l'article…",
    excerptLabel: "Extrait / résumé",
    excerptPlaceholder: "Un court résumé affiché dans les listes d'articles…",
    contentLabel: "Contenu",
    contentPlaceholder:
      "Commencez à écrire — utilisez la barre d'outils pour les titres, le gras, l'italique, les listes et les images…",
    categoryLabel: "Catégorie",
    coverImageLabel: "Image de couverture",
    tagsLabel: "Étiquettes",
    tagPlaceholder: "Saisissez une étiquette + Entrée",
    authorsLabel: "Écrit par",
    authorPlaceholder: "Saisissez un nom + Entrée",
    tipsTitle: "Conseils d'édition",
    tips: [
      "Utilisez le menu de styles pour les titres — ils s'affichent en taille réelle pendant la saisie.",
      "Sélectionnez du texte, puis cliquez sur B, I ou souligné pour le mettre en forme.",
      "Cliquez sur l'icône image pour téléverser des photos — elles s'intègrent au fil de l'article.",
      "Utilisez l'aperçu dans l'en-tête pour voir le rendu final.",
    ],
    saving: "Enregistrement…",
    updatePost: "Mettre à jour",
    publishPost: "Publier l'article",
    errors: {
      titleRequired: "Le titre est obligatoire.",
      slugRequired: "Le slug est obligatoire.",
      contentRequired: "Le contenu est obligatoire.",
      saveFailed: "Échec de l'enregistrement. Veuillez réessayer.",
      network: "Erreur réseau. Veuillez réessayer.",
    },
  } satisfies PartialCopy<typeof editorMessages.en>;

const ns_editorUi = {
    seo: {
      metaDescriptionLabel: "Méta-description",
      metaPlaceholder:
        "Un résumé concis pour les résultats Google (150 à 160 caractères recommandés)…",
      fallbackHint: "L'extrait est utilisé si ce champ est vide",
      characters: "{count} caractères",
      idealLength: "Longueur idéale",
      considerShortening: "Pensez à raccourcir",
      inboundTitle: "Liens internes",
      outboundTitle: "Liens externes",
      inboundHint:
        "Liens internes vers votre site. Utilisez l'URL complète (https://…). Le libellé et l'URL sont obligatoires.",
      outboundHint: "Liens externes vers des sources fiables. Le libellé et l'URL sont obligatoires.",
      removeLink: "Supprimer le lien",
    },
    takeaways: {
      label: "Points clés",
      hint: "Quelques puces courtes qui résument l'article. Affichées dans un encadré au-dessus du contenu.",
      placeholder: "ex. La couverture linguistique seule ne suffit pas à une IA culturellement pertinente.",
      itemLabel: "Point clé {number}",
      add: "Ajouter un point clé",
      remove: "Supprimer le point clé",
      moveUp: "Monter",
      moveDown: "Descendre",
      count: "{count} / {max}",
    },
    upload: {
      urlPlaceholder: "https://…",
      uploading: "Téléversement…",
      prompt: "Cliquez ou déposez une image à téléverser",
      addPhoto: "Ajouter une photo",
      chooseImage: "Veuillez choisir un fichier image.",
      chooseImagesOnly: "Veuillez choisir uniquement des fichiers image.",
      failed: "Échec du téléversement. Essayez un autre fichier.",
      couldNotRead: "Impossible de lire le fichier",
      couldNotLoad: "Impossible de charger l'image",
    },
    toolbar: {
      placeholder: "Commencez à rédiger votre article…",
      normalText: "Texte normal",
      bold: "Gras",
      italic: "Italique",
      underline: "Souligné",
      bulletList: "Liste à puces",
      numberedList: "Liste numérotée",
      quote: "Citation",
      insertLink: "Insérer un lien",
      linkPrompt: "URL du lien",
      insertImage: "Insérer une image",
      divider: "Séparateur",
      undo: "Annuler",
      redo: "Rétablir",
    },
  } satisfies PartialCopy<typeof editorUiMessages.en>;

const ns_footer = {
    badge: "Discutons",
    headlineLine1: "Créons quelque chose",
    headlineAccent: "d'irréel.",
    blurb: "Créativité, stratégie et technologie réunies pour façonner l'avenir de votre marque.",
    cta: "Démarrer un projet",
    exploreTitle: "Explorer",
    contactTitle: "Nous joindre",
    whatsapp: "Discuter sur WhatsApp",
    links: {
      home: "Accueil",
      services: "Services",
      blogs: "Blog",
      about: "À propos",
      contact: "Contact",
    },
    location: "Dhaka, Bangladesh",
    rights: "© {year} Creative Surf. Tous droits réservés.",
    terms: "Conditions d'utilisation",
    privacy: "Politique de confidentialité",
    craftedPre: "Conçu avec une énergie",
    craftedAccent: "aurore",
    craftedPost: "",
    logoAlt: "Creative Surf",
  } satisfies PartialCopy<typeof footerMessages.en>;

const ns_home = {
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
  } satisfies PartialCopy<typeof homeMessages.en>;

const ns_kit = {
    areasKicker: "Ce que nous couvrons",
    areasTitle: "Chaque angle,",
    areasAccent: "couvert.",
    featuredKicker: "À la une",
    highlightsKicker: "Pourquoi c'est important",
    explore: "Découvrir",
    learnMore: "En savoir plus",
  } satisfies PartialCopy<typeof kitMessages.en>;

const ns_legalPrivacy = {
    metaTitle: "Politique de confidentialité",
    metaDescription: "Politique de confidentialité du site et des services de Creative Surf.",
    breadcrumbCurrent: "Politique de confidentialité",
    title: "Politique de confidentialité",
    lastUpdated: "Dernière mise à jour : juin 2026",
    sections: [
      {
        heading: "1. Introduction",
        blocks: [
          { type: "p", text: "Creative Surf (« la Société », « nous », « notre ») respecte votre vie privée et s'engage à protéger vos données personnelles. La présente politique explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site, utilisez nos services ou communiquez avec nous." },
          { type: "p", text: "En utilisant notre site et nos services, vous acceptez la collecte et l'utilisation d'informations conformément à cette politique de confidentialité." },
        ],
      },
      {
        heading: "2. Informations que nous collectons",
        blocks: [
          { type: "strong", text: "Données personnelles" },
          { type: "p", text: "Nous pouvons collecter les informations que vous fournissez volontairement, notamment :" },
          {
            type: "ul",
            items: [
              "Nom complet",
              "Adresse e-mail",
              "Numéro de téléphone",
              "Nom de l'entreprise",
              "Site web professionnel",
              "Objectifs marketing et besoins du projet",
              "Informations de facturation",
            ],
          },
          { type: "strong", text: "Informations collectées automatiquement" },
          { type: "p", text: "Lorsque vous visitez notre site, nous pouvons collecter automatiquement :" },
          {
            type: "ul",
            items: [
              "Adresse IP",
              "Type de navigateur",
              "Informations sur l'appareil",
              "Pages consultées",
              "Site référent",
              "Durée de session",
              "Données analytiques",
            ],
          },
          { type: "strong", text: "Conversations avec l'assistant de chat" },
          { type: "p", text: "Lorsque vous utilisez l'assistant de chat de notre site, nous conservons l'intégralité de la conversation — vos messages et les réponses de l'assistant — ainsi que la page depuis laquelle vous avez commencé, votre langue et un identifiant de navigateur anonyme. Si vous êtes connecté, la conversation est associée à votre compte. Ces transcriptions sont conservées sans limite de durée et sont consultables par nos administrateurs ; vos messages sont également transmis à nos fournisseurs d'IA afin de générer une réponse. Merci de ne pas communiquer de mots de passe, de coordonnées bancaires ou d'autres informations sensibles dans le chat. Vous pouvez à tout moment demander la suppression de vos conversations via les coordonnées ci-dessous." },
        ],
      },
      {
        heading: "3. Utilisation de vos informations",
        blocks: [
          { type: "p", text: "Nous utilisons les informations collectées pour :" },
          {
            type: "ul",
            items: [
              "Fournir des prestations marketing",
              "Répondre aux demandes",
              "Planifier des rendez-vous",
              "Traiter les paiements",
              "Améliorer notre site et nos services",
              "Envoyer des mises à jour de service",
              "Livrer rapports et analyses de campagne",
              "Respecter nos obligations légales",
              "Prévenir la fraude et les abus",
            ],
          },
        ],
      },
      {
        heading: "4. Communications marketing",
        blocks: [
          { type: "p", text: "Nous pouvons envoyer des e-mails promotionnels, des newsletters et des informations de service. Vous pouvez vous désabonner à tout moment via le lien de désinscription présent dans nos e-mails." },
        ],
      },
      {
        heading: "5. Services tiers",
        blocks: [
          { type: "p", text: "Nous pouvons faire appel à des prestataires tiers, notamment :" },
          {
            type: "ul",
            items: [
              "Meta (Facebook et Instagram)",
              "Google",
              "TikTok",
              "LinkedIn",
              "Plateformes d'analytics",
              "Systèmes CRM",
              "Prestataires de paiement",
              "Solutions d'e-mail marketing",
            ],
          },
          { type: "p", text: "Ces prestataires appliquent leurs propres politiques et pratiques de confidentialité." },
        ],
      },
      {
        heading: "6. Partage des données",
        blocks: [
          { type: "p", text: "Nous ne vendons pas vos données personnelles." },
          { type: "p", text: "Nous pouvons partager des informations avec :" },
          {
            type: "ul",
            items: [
              "Des prestataires qui participent à nos opérations",
              "Des plateformes publicitaires dans le cadre de la gestion des campagnes",
              "Les autorités, lorsque la loi l'exige",
              "Un repreneur en cas de fusion, d'acquisition ou de cession",
            ],
          },
        ],
      },
      {
        heading: "7. Sécurité des données",
        blocks: [
          { type: "p", text: "Nous mettons en œuvre des mesures administratives, techniques et organisationnelles raisonnables pour protéger les données personnelles. Toutefois, aucune transmission par internet ni aucun système de stockage ne peut être garanti sûr à 100 %." },
        ],
      },
      {
        heading: "8. Conservation des données",
        blocks: [
          { type: "p", text: "Nous conservons les informations uniquement le temps nécessaire à la fourniture des services, au respect de nos obligations légales, au règlement des litiges et à l'application de nos accords." },
        ],
      },
      {
        heading: "9. Vos droits",
        blocks: [
          { type: "p", text: "Selon votre pays de résidence, vous pouvez disposer des droits suivants :" },
          {
            type: "ul",
            items: [
              "Accéder à vos données personnelles",
              "Rectifier des informations inexactes",
              "Demander la suppression de vos données",
              "Limiter le traitement",
              "Vous opposer au traitement",
              "Demander la portabilité de vos données",
            ],
          },
          { type: "p", text: "Pour exercer ces droits, contactez-nous à l'aide des coordonnées ci-dessous." },
        ],
      },
      {
        heading: "10. Cookies",
        blocks: [
          { type: "p", text: "Notre site peut utiliser des cookies et des technologies similaires pour améliorer l'expérience utilisateur, analyser le trafic et soutenir nos actions publicitaires." },
          { type: "p", text: "Vous pouvez contrôler les cookies via les paramètres de votre navigateur." },
        ],
      },
      {
        heading: "11. Protection des mineurs",
        blocks: [
          { type: "p", text: "Nos services ne s'adressent pas aux personnes de moins de 18 ans. Nous ne collectons pas sciemment de données personnelles auprès de mineurs." },
        ],
      },
      {
        heading: "12. Transferts internationaux de données",
        blocks: [
          { type: "p", text: "Vos informations peuvent être transférées et traitées dans des pays autres que le vôtre. En utilisant nos services, vous consentez à ces transferts." },
        ],
      },
      {
        heading: "13. Modifications de cette politique",
        blocks: [
          { type: "p", text: "Nous pouvons mettre à jour cette politique de confidentialité périodiquement. Les mises à jour prennent effet dès leur publication sur cette page." },
        ],
      },
    ],
  } satisfies PartialCopy<typeof legalPrivacyMessages.en>;

const ns_legalPrivacyTerms = {
    metaTitle: "Confidentialité & conditions d'utilisation",
    metaDescription:
      "Politique de confidentialité et conditions d'utilisation des services de l'agence Creative Surf.",
    breadcrumbCurrent: "Confidentialité & conditions d'utilisation",
    title: "Politique de confidentialité & conditions d'utilisation",
    lastUpdated: "Dernière mise à jour : 12 mars 2025",
    sections: [
      {
        heading: "1. Introduction",
        blocks: [
          { type: "p", text: "Bienvenue chez Creative Surf (« nous », « notre »). Nous nous engageons à protéger votre vie privée et à offrir une expérience en ligne sûre. La présente politique explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site ou utilisez nos services." },
          { type: "p", text: "En accédant à nos services ou en les utilisant, vous acceptez cette politique de confidentialité ainsi que nos conditions d'utilisation. Si vous n'êtes pas d'accord avec nos pratiques, veuillez ne pas utiliser nos services." },
        ],
      },
      {
        heading: "2. Informations que nous collectons",
        blocks: [
          { type: "h3", text: "2.1 Données personnelles" },
          { type: "p", text: "Nous pouvons collecter les données personnelles que vous nous fournissez volontairement lorsque vous :" },
          {
            type: "ul",
            items: [
              "Créez un compte",
              "Vous inscrivez à notre newsletter",
              "Demandez une proposition ou un rendez-vous",
              "Remplissez un formulaire de contact",
              "Participez à une enquête ou à un concours",
              "Interagissez avec nous sur les réseaux sociaux",
            ],
          },
          { type: "p", text: "Ces informations peuvent inclure votre nom, votre adresse e-mail, votre numéro de téléphone, le nom de votre entreprise, votre fonction et toute autre information que vous choisissez de fournir." },
          { type: "h3", text: "2.2 Informations collectées automatiquement" },
          { type: "p", text: "Lorsque vous visitez notre site, nous pouvons collecter automatiquement certaines informations sur votre appareil et votre navigation, notamment :" },
          {
            type: "ul",
            items: [
              "Adresse IP",
              "Type et version du navigateur",
              "Système d'exploitation",
              "Site référent",
              "Pages consultées",
              "Date et heure de votre visite",
              "Temps passé sur les pages",
              "Autres statistiques",
            ],
          },
        ],
      },
      {
        heading: "3. Utilisation de vos informations",
        blocks: [
          { type: "p", text: "Nous pouvons utiliser les informations collectées à différentes fins, notamment pour :" },
          {
            type: "ul",
            items: [
              "Fournir, maintenir et améliorer nos services",
              "Traiter les transactions et envoyer les informations associées",
              "Envoyer des informations administratives : mises à jour, alertes de sécurité et messages de support",
              "Répondre à vos commentaires, questions et demandes",
              "Proposer des contenus et recommandations personnalisés",
              "Suivre et analyser les tendances, usages et activités",
              "Détecter, prévenir et résoudre les problèmes techniques",
              "Nous protéger contre les activités nuisibles ou illicites",
            ],
          },
        ],
      },
      {
        heading: "4. Cookies et technologies similaires",
        blocks: [
          { type: "p", text: "Nous utilisons des cookies et technologies de suivi similaires pour analyser l'activité sur notre site et conserver certaines informations. Les cookies sont de petits fichiers de données pouvant contenir un identifiant unique anonyme." },
          { type: "p", text: "Vous pouvez configurer votre navigateur pour refuser tous les cookies ou vous avertir de leur envoi. Toutefois, sans cookies, certaines parties de notre service peuvent devenir inaccessibles." },
          { type: "p", text: "Nous utilisons les types de cookies suivants :" },
          {
            type: "ul",
            items: [
              "Cookies essentiels : nécessaires au fonctionnement du site",
              "Cookies analytiques / de performance : nous permettent de reconnaître et compter les visiteurs et d'observer leur navigation",
              "Cookies de fonctionnalité : nous permettent de personnaliser le contenu",
              "Cookies de ciblage : enregistrent votre visite, les pages consultées et les liens suivis",
            ],
          },
        ],
      },
      {
        heading: "5. Partage et divulgation des données",
        blocks: [
          { type: "p", text: "Nous pouvons partager vos informations dans les cas suivants :" },
          {
            type: "ul",
            items: [
              "Avec des prestataires : nous pouvons partager vos informations avec des fournisseurs, prestataires, sous-traitants ou agents qui interviennent pour notre compte.",
              "Transferts d'entreprise : nous pouvons partager ou transférer vos informations dans le cadre d'une fusion, d'une cession d'actifs, d'un financement ou d'une acquisition, ou lors de leur négociation.",
              "Avec votre consentement : nous pouvons divulguer vos informations à toute autre fin avec votre accord.",
              "Obligations légales : nous pouvons divulguer vos informations si la loi l'exige ou en réponse à une demande valide des autorités publiques.",
            ],
          },
        ],
      },
      {
        heading: "6. Sécurité des données",
        blocks: [
          { type: "p", text: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles. Sachez toutefois qu'aucune méthode de transmission sur internet ni aucun stockage électronique n'est sûr à 100 %, et que nous ne pouvons garantir une sécurité absolue." },
        ],
      },
      {
        heading: "7. Vos droits en matière de protection des données",
        blocks: [
          { type: "p", text: "Selon votre pays de résidence, vous pouvez disposer de certains droits sur vos données personnelles, notamment :" },
          {
            type: "ul",
            items: [
              "Le droit d'accéder à vos données personnelles",
              "Le droit de rectifier des données inexactes",
              "Le droit de demander la suppression de vos données",
              "Le droit de limiter le traitement de vos données",
              "Le droit à la portabilité des données",
              "Le droit de vous opposer au traitement",
            ],
          },
          { type: "p", text: "Pour exercer ces droits, contactez-nous à l'aide des coordonnées de la section « Nous contacter »." },
        ],
      },
      {
        heading: "Conditions d'utilisation",
        blocks: [
          { type: "h3", text: "1. Acceptation des conditions" },
          { type: "p", text: "En accédant à notre site et à nos services ou en les utilisant, vous acceptez d'être lié par ces conditions d'utilisation ainsi que par l'ensemble des lois et règlements applicables. Si vous n'acceptez pas ces conditions, il vous est interdit d'utiliser nos services." },
          { type: "h3", text: "2. Licence d'utilisation" },
          { type: "p", text: "Il vous est permis de télécharger temporairement une copie des contenus du site de Creative Surf pour un usage personnel, non commercial et transitoire. Il s'agit d'une licence, non d'un transfert de propriété ; à ce titre, vous ne pouvez pas :" },
          {
            type: "ul",
            items: [
              "Modifier ou copier les contenus",
              "Utiliser les contenus à des fins commerciales ou pour un affichage public",
              "Tenter de décompiler ou de faire de l'ingénierie inverse sur un logiciel du site de Creative Surf",
              "Supprimer les mentions de droit d'auteur ou de propriété des contenus",
              "Transférer les contenus à un tiers ou les « mettre en miroir » sur un autre serveur",
            ],
          },
          { type: "p", text: "Cette licence prend fin automatiquement en cas de non-respect de ces restrictions et peut être révoquée par Creative Surf à tout moment." },
          { type: "h3", text: "3. Clause de non-responsabilité" },
          { type: "p", text: "Les contenus du site de Creative Surf sont fournis « en l'état ». Creative Surf n'offre aucune garantie, expresse ou implicite, et décline toute autre garantie, notamment les garanties implicites de qualité marchande, d'adéquation à un usage particulier ou d'absence de contrefaçon." },
          { type: "p", text: "Par ailleurs, Creative Surf ne garantit pas et ne fait aucune déclaration quant à l'exactitude, aux résultats probables ou à la fiabilité de l'utilisation des contenus de son site, ni de tout site lié." },
          { type: "h3", text: "4. Limitations" },
          { type: "p", text: "Creative Surf et ses fournisseurs ne pourront en aucun cas être tenus responsables de dommages (y compris, sans limitation, perte de données ou de bénéfices, ou interruption d'activité) résultant de l'utilisation ou de l'impossibilité d'utiliser les contenus du site, même si Creative Surf ou un représentant autorisé a été informé oralement ou par écrit de l'éventualité d'un tel dommage." },
          { type: "h3", text: "5. Exactitude des contenus" },
          { type: "p", text: "Les contenus du site de Creative Surf peuvent comporter des erreurs techniques, typographiques ou photographiques. Creative Surf ne garantit pas que ces contenus soient exacts, complets ou à jour, et peut les modifier à tout moment sans préavis." },
          { type: "h3", text: "6. Liens" },
          { type: "p", text: "Creative Surf n'a pas examiné l'ensemble des sites liés au sien et n'est pas responsable de leur contenu. La présence d'un lien n'implique aucune approbation de la part de Creative Surf. L'utilisation de ces sites se fait aux risques de l'utilisateur." },
          { type: "h3", text: "7. Modifications" },
          { type: "p", text: "Creative Surf peut réviser ces conditions d'utilisation à tout moment sans préavis. En utilisant ce site, vous acceptez d'être lié par la version alors en vigueur." },
          { type: "h3", text: "8. Droit applicable" },
          { type: "p", text: "Ces conditions sont régies et interprétées conformément au droit des États-Unis, et vous vous soumettez irrévocablement à la compétence exclusive des tribunaux de ce ressort." },
        ],
      },
      {
        heading: "Nous contacter",
        blocks: [
          { type: "p", text: "Pour toute question sur cette politique de confidentialité ou ces conditions d'utilisation, contactez-nous :" },
          {
            type: "ul",
            items: [
              "Creative Surf",
              "Dhaka, Bangladesh",
              "E-mail : creativesurfcs@gmail.com",
              "Téléphone : +880 1988-467099",
            ],
          },
        ],
      },
    ],
  } satisfies PartialCopy<typeof legalPrivacyTermsMessages.en>;

const ns_legalTerms = {
    metaTitle: "Conditions d'utilisation",
    metaDescription: "Conditions d'utilisation du site et des services de Creative Surf.",
    breadcrumbCurrent: "Conditions d'utilisation",
    title: "Conditions d'utilisation",
    lastUpdated: "Dernière mise à jour : juin 2026",
    sections: [
      {
        heading: "1. Accord",
        blocks: [
          { type: "p", text: "Les présentes conditions d'utilisation (« Conditions ») régissent votre accès au site et aux services de Creative Surf, ainsi que leur utilisation." },
          { type: "p", text: "En accédant à notre site ou en faisant appel à nos services, vous acceptez d'être lié par ces Conditions." },
        ],
      },
      {
        heading: "2. Services",
        blocks: [
          { type: "p", text: "Creative Surf fournit des services de marketing digital et de conseil, notamment :" },
          {
            type: "ul",
            items: [
              "Publicité Meta",
              "Publicité Google",
              "Publicité TikTok",
              "Génération de leads",
              "Prestations SEO",
              "Gestion des réseaux sociaux",
              "Conseil marketing",
              "Optimisation de la conversion",
            ],
          },
          { type: "p", text: "Les services peuvent être modifiés, étendus ou interrompus à notre discrétion." },
        ],
      },
      {
        heading: "3. Obligations du client",
        blocks: [
          { type: "p", text: "Le client s'engage à :" },
          {
            type: "ul",
            items: [
              "Fournir des informations exactes",
              "Donner les accès nécessaires aux comptes",
              "Répondre aux demandes dans des délais raisonnables",
              "Conserver la propriété des comptes publicitaires, sauf accord contraire",
              "Respecter les règles des plateformes et la législation applicable",
            ],
          },
        ],
      },
      {
        heading: "4. Honoraires et paiements",
        blocks: [
          { type: "p", text: "Tous les honoraires sont précisés dans les contrats de service, les propositions ou les factures." },
          { type: "strong", text: "Les paiements :" },
          {
            type: "ul",
            items: [
              "Sont exigibles selon l'échéancier convenu",
              "Peuvent être non remboursables, sauf mention contraire",
              "N'incluent pas les budgets publicitaires, sauf mention expresse",
            ],
          },
          { type: "p", text: "Un retard de paiement peut entraîner la suspension des services." },
        ],
      },
      {
        heading: "5. Plateformes publicitaires",
        blocks: [
          { type: "p", text: "La performance des campagnes dépend de nombreux facteurs indépendants de notre volonté, notamment :" },
          {
            type: "ul",
            items: [
              "Les conditions de marché",
              "La concurrence",
              "Les algorithmes des plateformes",
              "L'adéquation produit-marché",
              "La qualité de l'offre du client",
            ],
          },
          { type: "p", text: "Nous ne garantissons aucun résultat précis en matière de chiffre d'affaires, de leads, de ventes, de ROAS, de positionnement ou de performance publicitaire." },
        ],
      },
      {
        heading: "6. Propriété intellectuelle",
        blocks: [
          { type: "p", text: "L'ensemble des contenus, éléments de marque, logos, supports web, méthodes et méthodologies propriétaires demeurent la propriété de Creative Surf, sauf accord écrit contraire." },
          { type: "p", text: "Le client conserve la propriété de ses marques, contenus et actifs commerciaux." },
        ],
      },
      {
        heading: "7. Confidentialité",
        blocks: [
          { type: "p", text: "Les deux parties s'engagent à préserver la confidentialité des informations échangées et à ne pas les divulguer à des tiers sans consentement, sauf obligation légale." },
        ],
      },
      {
        heading: "8. Limitation de responsabilité",
        blocks: [
          { type: "p", text: "Dans les limites autorisées par la loi :" },
          { type: "p", text: "Creative Surf ne saurait être tenue responsable de dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, y compris la perte de bénéfices, la perte de chiffre d'affaires, l'interruption d'activité ou la perte de données." },
          { type: "p", text: "Notre responsabilité totale ne pourra excéder les sommes versées par le client au cours des trois mois précédant la réclamation." },
        ],
      },
      {
        heading: "9. Absence de garantie",
        blocks: [
          { type: "p", text: "Le marketing et la publicité comportent une part de risque." },
          { type: "p", text: "Bien que nous mettions tout en œuvre pour améliorer la performance et produire des résultats positifs, nous ne garantissons pas :" },
          {
            type: "ul",
            items: [
              "Un volume de leads précis",
              "Des objectifs de chiffre d'affaires",
              "Des positions dans les résultats de recherche",
              "Des taux de conversion",
              "L'approbation des publicités",
              "La stabilité des comptes sur les plateformes",
            ],
          },
        ],
      },
      {
        heading: "10. Résiliation",
        blocks: [
          { type: "p", text: "Chaque partie peut mettre fin aux services conformément aux stipulations du contrat de service applicable." },
          { type: "strong", text: "En cas de résiliation :" },
          {
            type: "ul",
            items: [
              "Les sommes dues restent exigibles",
              "L'accès aux ressources propriétaires peut être révoqué",
              "La gestion des campagnes prend fin",
            ],
          },
        ],
      },
      {
        heading: "11. Plateformes tierces",
        blocks: [
          { type: "p", text: "Le client reconnaît que les services peuvent impliquer des plateformes tierces telles que Meta, Google, TikTok, LinkedIn et d'autres prestataires." },
          { type: "strong", text: "Creative Surf n'est pas responsable :" },
          {
            type: "ul",
            items: [
              "Des pannes de plateformes",
              "Des suspensions de comptes",
              "Des changements de règles",
              "Des restrictions imposées par les plateformes",
            ],
          },
        ],
      },
      {
        heading: "12. Garantie d'indemnisation",
        blocks: [
          { type: "p", text: "Le client s'engage à garantir Creative Surf contre toute réclamation, dommage, responsabilité ou frais découlant de ses produits, services, contenus publicitaires ou de tout manquement à la loi." },
        ],
      },
      {
        heading: "13. Droit applicable",
        blocks: [
          { type: "p", text: "Les présentes Conditions sont régies et interprétées conformément au droit d'Angleterre et du Pays de Galles." },
        ],
      },
      {
        heading: "14. Modification des Conditions",
        blocks: [
          { type: "p", text: "Nous nous réservons le droit de modifier ces Conditions à tout moment. La poursuite de l'utilisation du site ou des services vaut acceptation des Conditions mises à jour." },
        ],
      },
    ],
  } satisfies PartialCopy<typeof legalTermsMessages.en>;


const ns_nav = {
    links: {
      home: "Accueil",
      projects: "Projets",
      blogs: "Blog",
      cvBuilder: "Créateur de CV",
      team: "Équipe",
      services: "Services",
      about: "À propos",
      contact: "Contact",
    },
    sections: {
      marketing: "Marketing",
      realEstate: "Immobilier",
    },
    cta: "Commencer",
    startProject: "Démarrer un projet",
    openMenu: "Menu",
    closeMenu: "Fermer le menu",
    mainNav: "Principale",
    login: "Connexion",
    register: "Inscription",
    account: "Mon compte",
    profile: "Profil",
    logout: "Déconnexion",
    loggingOut: "Déconnexion…",
    accountMenu: "Menu du compte",
    logoAlt: "Logo Creative Surf",
    toggleMenu: "Ouvrir le menu",
    lightMode: "Clair",
    darkMode: "Sombre",
  } satisfies PartialCopy<typeof navMessages.en>;

const ns_notFound = {
    metaTitle: "404 - Page introuvable",
    metaDescription: "La page que vous recherchez n'existe pas ou a été déplacée.",
    heading: "Page introuvable",
    body: "Oups ! La page que vous recherchez n'existe pas ou a été déplacée.",
    cta: "Retour à l'accueil",
  } satisfies PartialCopy<typeof notFoundMessages.en>;

const ns_pageMeta = {
    account: {
      title: "Mon compte | Creative Surf",
      description: "Gérez votre compte Creative Surf, vos CV et vos conversations.",
    },
    newPost: {
      title: "Nouvel article | Creative Surf",
      description: "Rédigez un nouvel article de blog.",
    },
    editPost: {
      title: "Modifier l'article | Creative Surf",
      description: "Modifiez un article de blog.",
    },
    newRealEstatePost: {
      title: "Nouvel article | Creative Surf Real Estate",
      description: "Rédigez un nouvel article immobilier.",
    },
    editRealEstatePost: {
      title: "Modifier l'article | Creative Surf Real Estate",
      description: "Modifiez un article immobilier.",
    },
    home: {
      title: "Creative Surf | Agence de marketing digital",
      description:
        "Creative Surf est une agence de marketing digital spécialisée en SEO, design web, contenu et réseaux sociaux pour accélérer la croissance de votre chiffre d'affaires.",
    },
    login: {
      title: "Connexion | Creative Surf",
      description: "Connectez-vous à votre compte Creative Surf.",
    },
    register: {
      title: "Créer un compte | Creative Surf",
      description: "Créez un compte Creative Surf gratuit pour enregistrer vos CV, conversations et plus encore.",
    },
    realEstate: {
      title: "Marketing immobilier à Dhaka | Creative Surf Real Estate",
      description:
        "La plateforme digitale de Dhaka qui met en relation promoteurs immobiliers, acheteurs qualifiés, investisseurs et partenaires fonciers.",
    },
    realEstateProjects: {
      title: "Projets immobiliers à Dhaka | Creative Surf Real Estate",
      description: "Découvrez les projets immobiliers résidentiels et commerciaux en cours et à venir à Dhaka.",
    },
    realEstateProject: {
      title: "Détails du projet | Creative Surf Real Estate",
      description: "Détails du terrain, des logements et du bâtiment pour ce projet immobilier à Dhaka.",
    },
    newProject: {
      title: "Nouveau projet | Creative Surf Real Estate",
      description: "Ajoutez une nouvelle annonce de projet immobilier.",
    },
    editProject: {
      title: "Modifier le projet | Creative Surf Real Estate",
      description: "Modifiez une annonce de projet immobilier.",
    },
  } satisfies PartialCopy<typeof pageMetaMessages.en>;

const ns_projectEditor = {
    editProject: "Modifier le projet",
    newProject: "Nouveau projet",
    namePlaceholder: "Nom du projet…",
    subtitleLabel: "Sous-titre / résidence",
    subtitlePlaceholder: "ex. JOLSHIRI ABASHON",
    plotDetailsLabel: "Détails du terrain",
    specs: {
      plotNo: "N° de parcelle",
      roadNo: "N° de rue",
      sector: "Secteur",
      plotSize: "Superficie du terrain",
      numberOfUnits: "Nombre de logements",
      buildingDetails: "Détails du bâtiment",
      flatSize: "Surface des appartements",
    },
    featuresDescriptionLabel: "Description des prestations",
    featuresDescriptionPlaceholder: "Décrivez les prestations clés du projet…",
    rooftopFeatures: "Équipements en toiture",
    groundFloorFeatures: "Équipements au rez-de-chaussée",
    availableFlats: "Appartements disponibles",
    featurePlaceholder: "Ajoutez une prestation et appuyez sur Entrée…",
    statusLabel: "Statut",
    coverImageLabel: "Image de couverture",
    additionalImages: "Images supplémentaires",
    mapLabel: "Emplacement Google Maps",
    mapPlaceholder: "Collez l'URL d'intégration ou le lien de partage Google Maps…",
    mapHintStart: "Collez l'",
    mapHintStrong: "URL d'intégration",
    mapHintEnd: "Google Maps (Partager → Intégrer une carte → copier l'URL src) ou un lien Google Maps classique.",
    saving: "Enregistrement…",
    updateProject: "Mettre à jour le projet",
    addProject: "Ajouter le projet",
    errors: {
      nameRequired: "Le nom du projet est obligatoire.",
      loadFailed: "Échec du chargement du projet.",
      network: "Erreur réseau. Veuillez réessayer.",
    },
  } satisfies PartialCopy<typeof projectEditorMessages.en>;

const ns_realEstate = {
    hero: {
      tag: "Creative Surf · Immobilier",
      headline: ["Construisez le projet.", "Nous l'aidons à", "se faire découvrir."],
      subtitle:
        "La plateforme digitale de référence à Dhaka, qui met en relation promoteurs immobiliers, acheteurs qualifiés, investisseurs et partenaires fonciers.",
      pills: ["Référencer votre projet", "Toucher les acheteurs", "Conclure des ventes"],
      ctaPrimary: "Référencer mon projet",
      ctaSecondary: "En savoir plus",
    },
    about: {
      badge: "À propos",
      headingStart: "Construire l'avenir de",
      headingAccent: "l'immobilier à Dhaka",
      headingEnd: ".",
      imageAlt: "À propos",
      viewProjects: "Voir les projets",
      tabBackground: "Présentation",
      tabMessage: "Notre message",
      brandName: "Creative Surf Real Estate",
      introRest:
        "est une plateforme digitale en forte croissance, dédiée à la mise en relation des promoteurs de Dhaka avec des acheteurs et investisseurs qualifiés, sur tous les types de biens.",
      body:
        "Notre équipe associe l'expertise du marketing digital à une connaissance fine du marché immobilier bangladais — création d'annonces, pilotage de campagnes et construction de la présence en ligne qui génère de vraies demandes. Nous sommes engagés sur la qualité, la transparence et des résultats mesurables.",
      goals: [
        {
          name: "Écosystème digital",
          desc: "Bâtir une plateforme dédiée permettant aux promoteurs de Dhaka de présenter leurs projets résidentiels et commerciaux à grande échelle.",
        },
        {
          name: "Visibilité maximale",
          desc: "Mobiliser le SEO, les réseaux sociaux et la publicité à la performance pour offrir une exposition optimale à chaque bien.",
        },
        {
          name: "Audience qualifiée",
          desc: "Relier les promoteurs et les opportunités foncières aux bons acheteurs grâce à un ciblage intelligent.",
        },
      ],
      visionQuote:
        "Devenir la porte d'entrée digitale la plus fiable du Bangladesh pour la découverte immobilière — en rendant les transactions transparentes, accessibles et inspirantes pour les promoteurs comme pour les acheteurs.",
      visionLabel: "Vision & mission",
    },
    objectives: {
      badge: "Nos objectifs",
      headingStart: "Ce que nous visons",
      headingAccent: "à accomplir",
      intro:
        "Quatre piliers d'excellence au service des résultats digitaux de nos promoteurs partenaires à travers le Bangladesh.",
      items: [
        {
          title: "Écosystème digital",
          body: "Bâtir une plateforme dédiée permettant aux promoteurs de Dhaka de présenter leurs projets résidentiels et commerciaux à grande échelle.",
        },
        {
          title: "Visibilité maximale",
          body: "Mobiliser le SEO, les réseaux sociaux et la publicité à la performance pour offrir une exposition optimale à chaque bien.",
        },
        {
          title: "Audience qualifiée",
          body: "Relier les promoteurs et les opportunités foncières aux bons acheteurs grâce à un ciblage intelligent.",
        },
        {
          title: "ROI mesurable",
          body: "Maintenir le plus haut niveau de créativité, de transparence et de résultats pour chaque partenaire.",
        },
      ],
    },
    featured: {
      tag: "Réalisations",
      headingStart: "Les projets qui",
      headingAccent: "nous définissent",
      viewAll: "Voir tous les projets",
    },
    process: {
      badge: "Le processus",
      intro: "De l'intégration à la commercialisation complète, en quatre étapes réfléchies.",
      steps: [
        {
          title: "Découvrir",
          body: "Partagez les détails de votre projet — localisation, inventaire, audience cible. Nous analysons la demande du marché et définissons votre positionnement digital.",
        },
        {
          title: "Concevoir",
          body: "Nous construisons des mini-sites dédiés et optimisés pour le SEO, et créons des campagnes publicitaires premium adaptées à votre programme.",
        },
        {
          title: "Déployer",
          body: "Nous lançons des campagnes ciblées et performantes sur les canaux search et sociaux pour capter des demandes d'acheteurs qualifiés.",
        },
        {
          title: "Livrer",
          body: "Nous transmettons les leads pré-qualifiés directement à votre équipe commerciale, en suivant les conversions et en optimisant jusqu'à la commercialisation complète.",
        },
      ],
    },
    testimonials: {
      tag: "Paroles de partenaires",
      headingStart: "La confiance des meilleurs",
      headingAccent: "promoteurs de Dhaka",
      items: [
        {
          quote:
            "Creative Surf a transformé nos annonces en un flux constant d'acheteurs qualifiés. Les campagnes se sont rentabilisées dès le premier mois.",
          role: "Directeur général",
        },
        {
          quote:
            "Photographie professionnelle, mini-site dédié et vraies données analytiques — enfin un partenaire qui comprend à la fois le marketing et l'immobilier.",
          role: "Directrice des ventes",
        },
        {
          quote:
            "Notre projet était en ligne en 48 heures et entièrement commercialisé en avance. La transparence et le reporting sont sans égal à Dhaka.",
          role: "Président",
        },
      ],
    },
  } satisfies PartialCopy<typeof realEstateMessages.en>;

const ns_realEstateBlogs = {
    eyebrow: "Creative Surf · Immobilier",
    title: "Analyses & idées",
    subtitle:
      "Tendances du marché, guides d'achat et analyses d'investissement sur l'immobilier à Dhaka — directement par l'équipe Creative Surf.",
    categoryAll: "Tous",
    newPost: "Nouvel article",
    logout: "Déconnexion",
    emptyTitle: "Aucun article pour l'instant",
    emptyAdmin: "Créez votre premier article pour commencer.",
    emptyPublic: "Revenez bientôt pour les analyses de l'équipe Creative Surf.",
    writeFirst: "Écrire le premier article",
    edit: "Modifier",
    delete: "Supprimer",
    confirmDelete: 'Supprimer « {title} » ? Cette action est irréversible.',
    read: "Lire →",
    brand: "Creative Surf",
  } satisfies PartialCopy<typeof realEstateBlogsMessages.en>;

const ns_realEstateFooter = {
    cta: {
      badge: "Pour les acheteurs",
      heading: "Trouvez votre prochain logement à Dhaka.",
      body: "Parcourez des projets résidentiels vérifiés partout à Dhaka — des appartements de luxe aux logements abordables — et trouvez la maison idéale pour vous et votre famille.",
      primary: "Voir les logements disponibles",
      secondary: "Planifier une visite",
    },
    brand: {
      line1: "L'immobilier.",
      line2: "Réinventé.",
      blurb:
        "Nous concevons des expériences digitales remarquables pour les promoteurs immobiliers — des présentations de projets immersives au marketing qui fait bouger le marché.",
      cta: "Démarrer un projet",
    },
    exploreTitle: "Explorer",
    contactTitle: "Nous joindre",
    whatsapp: "Discuter sur WhatsApp",
    links: {
      home: "Accueil",
      projects: "Projets",
      blogs: "Blog",
      contact: "Contact",
    },
    location: "Dhaka, Bangladesh",
    skylineAlt: "Panorama de Dhaka",
    rights: "© {year} Creative Surf. Tous droits réservés.",
    terms: "Conditions d'utilisation",
    privacy: "Politique de confidentialité",
    craftedPre: "Conçu avec une énergie",
    craftedAccent: "aurore",
    craftedPost: "",
  } satisfies PartialCopy<typeof realEstateFooterMessages.en>;

const ns_realEstateProjectDetail = {
    notFound: "Projet introuvable",
    backToProjects: "← Retour aux projets",
    allProjects: "Tous les projets",
    edit: "Modifier",
    delete: "Supprimer",
    deleting: "Suppression…",
    confirmDelete: 'Supprimer « {name} » ? Cette action est irréversible.',
    detailsTitle: "Détails du projet",
    specs: {
      plotNo: "N° de parcelle",
      roadNo: "N° de rue",
      sector: "Secteur",
      plotSize: "Superficie du terrain",
      numberOfUnits: "Nombre de logements",
      buildingDetails: "Détails du bâtiment",
      flatSize: "Surface des appartements",
    },
    location: {
      title: "Emplacement",
      overviewNote: "— vue d'ensemble de Dhaka",
      viewOnMaps: "Voir sur Google Maps",
      mapTitleFallback: "Dhaka, Bangladesh",
      mapTitle: "Emplacement de {name}",
      tapToOpen: "Touchez pour ouvrir dans Google Maps",
      openInMaps: "Ouvrir dans Maps →",
    },
    availableFlats: "Appartements disponibles",
    rooftopFeatures: "Équipements en toiture",
    groundFloorFeatures: "Équipements au rez-de-chaussée",
    gallery: "Galerie",
    blogs: {
      eyebrow: "Actualités immobilières",
      title: "Derniers articles & conseils",
      viewAll: "Voir tous les articles →",
      read: "Lire →",
    },
    lightbox: {
      close: "Fermer",
      previous: "Image précédente",
      next: "Image suivante",
    },
  } satisfies PartialCopy<typeof realEstateProjectDetailMessages.en>;

const ns_realEstateProjects = {
    list: {
      eyebrow: "Creative Surf · Immobilier",
      title: "Nos projets",
      subtitle: "Des résidences haut de gamme à Dhaka — construites avec exigence, pensées pour la vie.",
      statusAll: "Tous",
      newProject: "Nouveau projet",
      logout: "Déconnexion",
      emptyTitle: "Aucun projet pour l'instant",
      emptyAdmin: "Ajoutez votre premier projet immobilier pour commencer.",
      emptyPublic: "Les projets apparaîtront bientôt ici.",
      addFirst: "Ajouter le premier projet",
      edit: "Modifier",
      delete: "Supprimer",
      confirmDelete: 'Supprimer « {name} » ? Cette action est irréversible.',
    },
  } satisfies PartialCopy<typeof realEstateProjectsMessages.en>;

const ns_realEstateWhatsApp = {
    floating: "Discuter sur WhatsApp",
    prefill: {
      general: "Bonjour Creative Surf, j'aimerais en savoir plus sur vos projets immobiliers.",
      project: "Bonjour Creative Surf, le projet {name} m'intéresse. Pourriez-vous m'en dire plus ? {url}",
    },
  } satisfies PartialCopy<typeof realEstateWhatsAppMessages.en>;





const ns_servicesIndex = {
    offerSubtitle: "Choisissez un service ou combinez-les — chaque mission est construite autour du résultat dont vous avez besoin.",
    viewAll: "Voir tous les services",
    items: [
      {
        "title": "Stratégie de marque",
        "description": "Nous élaborons des stratégies de marque complètes qui définissent votre position unique sur le marché et créent le lien avec votre audience cible.",
        "tags": [
          "Positionnement",
          "Identité",
          "Messages"
        ]
      },
      {
        "title": "Design & développement web",
        "description": "Des sites sur mesure qui allient visuels saisissants et fonctionnalité fluide pour créer des expériences digitales mémorables.",
        "tags": [
          "UX / UI",
          "Next.js",
          "E-commerce"
        ]
      },
      {
        "title": "Marketing digital",
        "description": "Des campagnes pilotées par la donnée sur plusieurs canaux pour accroître votre visibilité et générer des conversions.",
        "tags": [
          "Médias payants",
          "E-mailing",
          "Analytics"
        ]
      },
      {
        "title": "Création de contenu",
        "description": "Des contenus engageants qui racontent votre histoire et résonnent avec votre audience sur toutes les plateformes.",
        "tags": [
          "Rédaction",
          "Vidéo",
          "Photographie"
        ]
      },
      {
        "title": "Gestion des réseaux sociaux",
        "description": "Une présence sociale stratégique qui fédère une communauté et renforce la voix de votre marque.",
        "tags": [
          "Communauté",
          "Calendriers",
          "Créateurs"
        ]
      },
      {
        "title": "Optimisation SEO",
        "description": "Optimisation technique et éditoriale pour améliorer votre référencement et générer du trafic organique.",
        "tags": [
          "Technique",
          "On-page",
          "Local"
        ]
      }
    ],
  } satisfies PartialCopy<typeof servicesIndexMessages.en>;

const ns_services = {
    ...ns_servicesIndex,
    metaTitle: "Nos services | Creative Surf",
    metaDescription:
      "Découvrez notre gamme complète de services créatifs et de marketing digital conçus pour faire rayonner votre marque.",
    hero: {
      kicker: "Nos services",
      title: "Tout ce dont votre marque a besoin",
      titleAccent: "pour grandir, en une seule équipe.",
      subtitle:
        "Des solutions créatives complètes, taillées pour élever votre marque et atteindre vos objectifs business",
      ctaPrimary: "Démarrer un projet",
      ctaSecondary: "Voir les services",
    },
    offerKicker: "Ce que nous proposons",
    offerTitle: "Six disciplines,",
    offerAccent: "une équipe intégrée.",
    explore: "Découvrir",
    processKicker: "Notre méthode",
    processTitle: "Un processus clair,",
    processAccent: "du premier appel à la croissance.",
    processSubtitle: "Cinq étapes et une équipe responsable — vous savez toujours ce qui vient ensuite.",
    process: [
      {
        step: "Découverte",
        description:
          "Nous commençons par comprendre votre entreprise, vos objectifs et votre audience pour poser des bases stratégiques solides.",
      },
      {
        step: "Stratégie",
        description:
          "À partir de nos constats, nous développons une stratégie sur mesure alignée sur vos objectifs et votre positionnement.",
      },
      {
        step: "Création",
        description:
          "Notre équipe créative donne vie à la stratégie à travers un design et des contenus percutants.",
      },
      {
        step: "Déploiement",
        description: "Nous exécutons le plan avec précision sur tous les canaux et plateformes pertinents.",
      },
      {
        step: "Optimisation",
        description:
          "Grâce à un suivi et une analyse continus, nous affinons notre approche pour maximiser les résultats.",
      },
    ],
    whyKicker: "Pourquoi Creative Surf",
    whyTitle: "Pensé pour les résultats,",
    whyAccent: "pas seulement les livrables.",
    why: [
      {
        title: "La stratégie d'abord",
        description: "Chaque réalisation répond à un objectif business, validé avant de produire quoi que ce soit.",
      },
      {
        title: "Mesuré par la donnée",
        description: "Un reporting clair sur ce qui fonctionne, pour décider sur des chiffres plutôt que des opinions.",
      },
      {
        title: "Une équipe, de bout en bout",
        description:
          "Stratèges, designers, développeurs et marketeurs sous un même toit — rien ne se perd entre agences.",
      },
      {
        title: "Un partenariat transparent",
        description: "Des délais clairs, des recommandations honnêtes et une équipe réellement joignable.",
      },
    ],
    faqKicker: "FAQ",
    faqTitle: "Vos questions,",
    faqAccent: "nos réponses.",
    faq: [
      {
        q: "Dois-je souscrire à tous les services ?",
        a: "Non. Vous pouvez commencer par un seul service et en ajouter au fil de votre croissance. Beaucoup de clients démarrent avec un projet puis élargissent une fois les résultats visibles.",
      },
      {
        q: "Combien de temps dure un projet type ?",
        a: "Cela dépend du périmètre. Une campagne ciblée ou un rafraîchissement de marque peut prendre quelques semaines ; un site complet ou un programme marketing continu est planifié par phases avec des jalons clairs.",
      },
      {
        q: "Comment mesurez-vous le succès ?",
        a: "Nous définissons dès le départ les indicateurs qui comptent pour vous — leads, ventes, positions, engagement — et en rendons compte régulièrement.",
      },
      {
        q: "Pouvez-vous travailler avec notre équipe interne ?",
        a: "Absolument. Nous pouvons piloter un projet de bout en bout, ou rejoindre votre équipe existante pour combler des besoins précis.",
      },
    ],
    cta: {
      kicker: "Parlons-en",
      title: "Prêt à transformer",
      titleAccent: "votre marque ?",
      body: "Collaborons pour créer quelque chose d'extraordinaire qui génère de vrais résultats pour votre entreprise.",
      button: "Nous contacter",
    },
  } satisfies PartialCopy<typeof servicesMessages.en>;

const ns_team = {
    metaTitle: "Notre équipe | Creative Surf",
    metaDescription:
      "Rencontrez les personnes derrière Creative Surf — l'équipe qui construit notre stratégie, nos produits et nos histoires.",
    hero: {
      eyebrow: "Qui sommes-nous",
      title: "Rencontrez l'équipe",
      subtitle:
        "Une petite équipe à large portée — stratégie, développement, visuels et rédaction sous un même toit.",
    },
    roles: {
      marketingLead: "Responsable marketing digital",
      webDeveloper: "Développeur web",
      contentStrategist: "Stratège de contenu",
      visualiser: "Directeur visuel | Monteur",
    },
    bios: {
      marketingLead:
        "Dirige nos campagnes et notre croissance, et veille sur nos clients et partenariats.",
      webDeveloper:
        "Conçoit et maintient la plateforme Creative Surf, de l'interface à l'infrastructure.",
      contentStrategist:
        "Planifie les mots de nos campagnes, de notre blog et de notre voix de marque.",
      visualiser:
        "Transforme les idées en visuels — design, animation et montage qui relie le tout.",
      editor:
        "Façonne nos contenus vidéo et visuels, du premier storyboard au montage final.",
    },
    cta: {
      title: "Envie de travailler avec nous ?",
      body: "Nous sommes toujours ravis d'entendre parler de nouveaux projets et idées.",
      button: "Nous contacter",
    },
  } satisfies PartialCopy<typeof teamMessages.en>;

const ns_websiteCost = {
    metaTitle: "Combien doit coûter un site web ?",
    metaDescription:
      "Comprenez les coûts de développement web et les facteurs qui influencent le prix des différents types de sites.",
    breadcrumb: {
      pricingGuides: "Guides tarifaires",
      current: "Coût d'un site web",
    },
    title: "Combien doit coûter un site web ?",
    subtitle:
      "Comprendre les coûts de développement web et les facteurs qui influencent le prix selon le type de site.",
    factorsTitle: "Les facteurs de coût d'un site web",
    factorsBody:
      "Le coût d'un site web varie fortement selon plusieurs facteurs. Les comprendre vous aide à bâtir un budget réaliste pour votre projet.",
    typeTitle: "Type de site web",
    typeIntro:
      "Les différents types de sites présentent des niveaux de complexité — et donc des coûts — différents :",
    tiers: [
      { label: "Site vitrine simple :", range: "5 000 $ - 10 000 $" },
      { label: "Site de petite entreprise :", range: "10 000 $ - 25 000 $" },
      { label: "Site e-commerce :", range: "25 000 $ - 50 000 $ et plus" },
      { label: "Application web sur mesure :", range: "50 000 $ - 250 000 $ et plus" },
    ],
    cta: {
      title: "Prêt à démarrer ?",
      body: "Contactez-nous dès aujourd'hui pour un devis personnalisé pour votre projet web.",
      button: "Obtenir un devis gratuit",
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
  "team": ns_team,
  "websiteCost": ns_websiteCost,
} as unknown as Record<string, Dict>;

export default dicts;
