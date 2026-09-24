import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { sitemapMessages } from "@/lib/i18n/messages/sitemap"
import { commonMessages } from "@/lib/i18n/messages/common"
import { navMessages } from "@/lib/i18n/messages/nav"
import { servicesMessages } from "@/lib/i18n/messages/services"
import { digitalIntelligenceMessages } from "@/lib/i18n/messages/digitalIntelligence"
import { serviceCategoriesMessages } from "@/lib/i18n/messages/serviceCategories"
import { serviceHubsMessages } from "@/lib/i18n/messages/serviceHubs"
import { seoServicesMessages } from "@/lib/i18n/messages/seoServices"
import { designMessages } from "@/lib/i18n/messages/design"
import { aboutApproachMessages } from "@/lib/i18n/messages/aboutApproach"
import { aboutHistoryMessages } from "@/lib/i18n/messages/aboutHistory"
import { aboutValuesMessages } from "@/lib/i18n/messages/aboutValues"
import { aboutAwardsMessages } from "@/lib/i18n/messages/aboutAwards"
import { aboutCareersMessages } from "@/lib/i18n/messages/aboutCareers"
import { aboutReviewsMessages } from "@/lib/i18n/messages/aboutReviews"
import { websiteCostMessages } from "@/lib/i18n/messages/websiteCost"
import { fixFunnelMessages } from "@/lib/i18n/messages/fixFunnel"
import { keywordToolMessages } from "@/lib/i18n/messages/keywordTool"
import { legalPrivacyMessages } from "@/lib/i18n/messages/legalPrivacy"
import { legalPrivacyTermsMessages } from "@/lib/i18n/messages/legalPrivacyTerms"
import { legalTermsMessages } from "@/lib/i18n/messages/legalTerms"
import { SERVICES } from "@/app/services/catalog"
import { isLiveRoute } from "@/lib/routes"
import { LinkDirectory, PageHero, PageShell, Section, type DirectoryGroup } from "@/app/components/kit"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(sitemapMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/sitemap",
  })
}

/**
 * Every page that exists, grouped by section. Labels come from each page's
 * own translations, so the sitemap reads correctly in every locale without a
 * parallel list of names to keep in sync.
 */
export default async function SitemapPage() {
  const [t, c, nav, services, di, cat, hubs, seo, design, approach, history, values, awards, careers, reviews, cost, funnel, keywords, privacy, privacyTerms, terms] =
    await Promise.all([
      getTranslator(sitemapMessages),
      getTranslator(commonMessages),
      getTranslator(navMessages),
      getTranslator(servicesMessages),
      getTranslator(digitalIntelligenceMessages),
      getTranslator(serviceCategoriesMessages),
      getTranslator(serviceHubsMessages),
      getTranslator(seoServicesMessages),
      getTranslator(designMessages),
      getTranslator(aboutApproachMessages),
      getTranslator(aboutHistoryMessages),
      getTranslator(aboutValuesMessages),
      getTranslator(aboutAwardsMessages),
      getTranslator(aboutCareersMessages),
      getTranslator(aboutReviewsMessages),
      getTranslator(websiteCostMessages),
      getTranslator(fixFunnelMessages),
      getTranslator(keywordToolMessages),
      getTranslator(legalPrivacyMessages),
      getTranslator(legalPrivacyTermsMessages),
      getTranslator(legalTermsMessages),
    ])

  const serviceTitles = services.raw<{ title: string }[]>("items", [])

  const groups: DirectoryGroup[] = [
    {
      title: t("mainPages"),
      icon: "compass",
      links: [
        { label: nav("links.home"), href: "/" },
        { label: nav("links.services"), href: "/services" },
        { label: nav("links.blogs"), href: "/blogs" },
        { label: nav("links.team"), href: "/team" },
        { label: nav("links.cvBuilder"), href: "/cv-builder" },
        { label: nav("links.contact"), href: "/contact" },
      ],
    },
    {
      title: nav("links.services"),
      href: "/services",
      icon: "sparkles",
      links: SERVICES.map((service, i) => ({ label: serviceTitles[i]?.title ?? service.slug, href: `/services/${service.slug}` })),
    },
    {
      title: c("breadcrumb.digitalMarketing"),
      href: "/digital-marketing",
      icon: "megaphone",
      links: [
        { label: c("breadcrumb.digitalIntelligence"), href: "/digital-marketing/digital-intelligence" },
        { label: di("seoReporting.breadcrumbCurrent"), href: "/digital-marketing/digital-intelligence/seo-reporting" },
        { label: di("callTracking.breadcrumbCurrent"), href: "/digital-marketing/digital-intelligence/web-channel-call-tracking" },
      ],
    },
    {
      title: c("breadcrumb.seoLeadGen"),
      href: "/seo-lead-generation",
      icon: "search",
      links: [
        { label: c("breadcrumb.organicSearch"), href: "/seo-lead-generation/organic-search" },
        { label: seo("breadcrumbCurrent"), href: "/seo-lead-generation/organic-search/seo-services" },
        { label: cat("organicSearch.services.3.title"), href: "/seo-lead-generation/organic-search/local-seo" },
        { label: c("breadcrumb.digitalAdvertising"), href: "/seo-lead-generation/digital-advertising" },
        { label: hubs("seo.featured.2.title"), href: "/seo-lead-generation/ecommerce/ecommerce-seo" },
      ],
    },
    {
      title: c("breadcrumb.uxInteractive"),
      href: "/ux-interactive",
      icon: "monitor",
      links: [
        { label: design("websiteDesign.breadcrumbCurrent"), href: "/ux-interactive/design/website-design" },
        { label: design("ecommerceDesign.metaTitle"), href: "/ux-interactive/design/ecommerce-design" },
      ],
    },
    {
      title: nav("links.about"),
      href: "/about",
      icon: "heart",
      links: [
        { label: approach("hero.title"), href: "/about/approach" },
        { label: history("hero.title"), href: "/about/history" },
        { label: values("hero.title"), href: "/about/values" },
        { label: awards("hero.title"), href: "/about/awards" },
        { label: careers("hero.title"), href: "/about/careers" },
        { label: reviews("hero.title"), href: "/about/reviews" },
        { label: cost("breadcrumb.current"), href: "/about/pricing/website-cost" },
      ],
    },
    {
      title: c("breadcrumb.tools"),
      icon: "wrench",
      links: [
        { label: funnel("hero.title"), href: "/tools/fix-funnel" },
        { label: keywords("hero.title"), href: "/tools/keyword-suggestion" },
      ],
    },
    {
      title: c("breadcrumb.realEstate"),
      href: "/real-estate",
      icon: "pin",
      links: [
        { label: c("breadcrumb.projects"), href: "/real-estate/projects" },
        { label: nav("links.blogs"), href: "/real-estate/blogs" },
      ],
    },
    {
      title: privacyTerms("title"),
      icon: "shield",
      links: [
        { label: privacy("breadcrumbCurrent"), href: "/privacy-policy" },
        { label: terms("breadcrumbCurrent"), href: "/terms" },
        { label: privacyTerms("breadcrumbCurrent"), href: "/privacy-terms" },
      ],
    },
  ]

  // Belt and braces: if a page is ever removed, it drops out of the sitemap
  // as soon as it leaves the route list.
  const live = groups.map((group) => ({
    ...group,
    href: group.href && isLiveRoute(group.href) ? group.href : undefined,
    links: group.links.filter((link) => isLiveRoute(link.href)),
  }))

  return (
    <PageShell>
      <PageHero
        crumbs={[{ label: c("breadcrumb.home"), href: "/" }, { label: t("breadcrumbCurrent") }]}
        title={t("title")}
        subtitle={t("metaDescription")}
      />
      <Section>
        <LinkDirectory groups={live} />
      </Section>
    </PageShell>
  )
}
