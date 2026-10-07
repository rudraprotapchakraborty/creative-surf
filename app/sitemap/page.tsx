import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { sitemapMessages } from "@/lib/i18n/messages/sitemap"
import { commonMessages } from "@/lib/i18n/messages/common"
import { navMessages } from "@/lib/i18n/messages/nav"
import { servicesMessages } from "@/lib/i18n/messages/services"
import { aboutApproachMessages } from "@/lib/i18n/messages/aboutApproach"
import { aboutHistoryMessages } from "@/lib/i18n/messages/aboutHistory"
import { aboutValuesMessages } from "@/lib/i18n/messages/aboutValues"
import { aboutAwardsMessages } from "@/lib/i18n/messages/aboutAwards"
import { aboutCareersMessages } from "@/lib/i18n/messages/aboutCareers"
import { aboutReviewsMessages } from "@/lib/i18n/messages/aboutReviews"
import { websiteCostMessages } from "@/lib/i18n/messages/websiteCost"
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
  const [t, c, nav, services, approach, history, values, awards, careers, reviews, cost, privacy, privacyTerms, terms] =
    await Promise.all([
      getTranslator(sitemapMessages),
      getTranslator(commonMessages),
      getTranslator(navMessages),
      getTranslator(servicesMessages),
      getTranslator(aboutApproachMessages),
      getTranslator(aboutHistoryMessages),
      getTranslator(aboutValuesMessages),
      getTranslator(aboutAwardsMessages),
      getTranslator(aboutCareersMessages),
      getTranslator(aboutReviewsMessages),
      getTranslator(websiteCostMessages),
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
      links: SERVICES.map((service, i) => ({ label: serviceTitles[i]?.title ?? service.slug, href: `/services#${service.slug}` })),
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
