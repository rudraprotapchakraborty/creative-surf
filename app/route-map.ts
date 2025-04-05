/**
 * Creative Surf Website Route Map
 *
 * This file documents the route structure of the Creative Surf website.
 * It serves as a reference for developers to understand the site hierarchy.
 */

export const routeMap = {
  // Main pages
  home: "/",
  contact: "/contact",
  blog: "/blog",
  caseStudies: "/case-studies",
  proposal: "/proposal",
  privacyTerms: "/privacy-terms",

  // Digital Marketing section
  digitalMarketing: {
    index: "/digital-marketing",
    digitalIntelligence: "/digital-marketing/digital-intelligence",
    conversion: "/digital-marketing/conversion",
    marketingAutomation: "/digital-marketing/marketing-automation",
    commercePlatforms: "/digital-marketing/commerce-platforms",
  },

  // SEO & Lead Generation section
  seoLeadGeneration: {
    index: "/seo-lead-generation",

    // Organic Search
    organicSearch: {
      index: "/seo-lead-generation/organic-search",
      seoServices: "/seo-lead-generation/organic-search/seo-services",
      enterpriseSeo: "/seo-lead-generation/organic-search/enterprise-seo",
      digitalMarketing: "/seo-lead-generation/organic-search/digital-marketing",
      localSeo: "/seo-lead-generation/organic-search/local-seo",
      googleLocalServices: "/seo-lead-generation/organic-search/google-local-services",
      seoAudits: "/seo-lead-generation/organic-search/seo-audits",
      generativeEngineOptimization: "/seo-lead-generation/organic-search/generative-engine-optimization",
    },

    // Digital Advertising
    digitalAdvertising: {
      index: "/seo-lead-generation/digital-advertising",
      ppcManagement: "/seo-lead-generation/digital-advertising/ppc-management",
      enterprisePpc: "/seo-lead-generation/digital-advertising/enterprise-ppc",
      socialMediaAdvertising: "/seo-lead-generation/digital-advertising/social-media-advertising",
      enterpriseSocialMedia: "/seo-lead-generation/digital-advertising/enterprise-social-media",
      programmaticAdvertising: "/seo-lead-generation/digital-advertising/programmatic-advertising",
      geofencing: "/seo-lead-generation/digital-advertising/geofencing",
    },

    // Ecommerce
    ecommerce: {
      index: "/seo-lead-generation/ecommerce",
      ecommerceSeo: "/seo-lead-generation/ecommerce/ecommerce-seo",
      ecommercePpc: "/seo-lead-generation/ecommerce/ecommerce-ppc",
      ecommerceSocialMedia: "/seo-lead-generation/ecommerce/ecommerce-social-media",
      b2bEcommerce: "/seo-lead-generation/ecommerce/b2b-ecommerce",
      shoppingFeed: "/seo-lead-generation/ecommerce/shopping-feed",
      ecommerceDigitalMarketing: "/seo-lead-generation/ecommerce/ecommerce-digital-marketing",
    },

    // Learn
    learn: {
      index: "/seo-lead-generation/learn",
      seoResults: "/seo-lead-generation/learn/seo-results",
      seoCaseStudies: "/seo-lead-generation/learn/seo-case-studies",
      whatIsAnSeoCompany: "/seo-lead-generation/learn/what-is-an-seo-company",
      bestSeoCompanies: "/seo-lead-generation/learn/best-seo-companies",
      seoGuide: "/seo-lead-generation/learn/seo-guide",
      whatIsDigitalMarketing: "/seo-lead-generation/learn/what-is-digital-marketing",
      digitalMarketingTools: "/seo-lead-generation/learn/digital-marketing-tools",
    },
  },

  // UX & Interactive section
  uxInteractive: {
    index: "/ux-interactive",
    design: "/ux-interactive/design",
    contentMarketing: "/ux-interactive/content-marketing",
    development: "/ux-interactive/development",
    challenges: "/ux-interactive/challenges",
  },

  // Who We Are section
  whoWeAre: {
    index: "/about",
    approach: "/about/approach",
    careers: "/about/careers",
    communityImpact: "/about/community-impact",
    values: "/about/values",
    awards: "/about/awards",
  },
}

/**
 * Usage:
 *
 * import { routeMap } from '@/app/route-map'
 *
 * // Then use in components:
 * <Link href={routeMap.contact}>Contact Us</Link>
 * <Link href={routeMap.seoLeadGeneration.organicSearch.seoServices}>SEO Services</Link>
 */

