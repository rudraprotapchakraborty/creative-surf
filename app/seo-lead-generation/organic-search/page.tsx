import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { serviceCategoriesMessages } from "@/lib/i18n/messages/serviceCategories"
import { commonMessages } from "@/lib/i18n/messages/common"
import { kitMessages } from "@/lib/i18n/messages/kit"
import { liveHref } from "@/lib/routes"
import { CardGrid, PageHero, PageShell, Section, type IconName } from "@/app/components/kit"
import { ContactCta, ProcessSection, RelatedServices } from "@/app/components/kit-sections"

const SERVICES: { href: string; icon: IconName }[] = [
  { href: "/seo-lead-generation/organic-search/seo-services", icon: "trending" },
  { href: "/seo-lead-generation/organic-search/enterprise-seo", icon: "briefcase" },
  { href: "/seo-lead-generation/organic-search/digital-marketing", icon: "megaphone" },
  { href: "/seo-lead-generation/organic-search/local-seo", icon: "pin" },
  { href: "/seo-lead-generation/organic-search/google-local-services", icon: "shield" },
  { href: "/seo-lead-generation/organic-search/seo-audits", icon: "search" },
  { href: "/seo-lead-generation/organic-search/generative-engine-optimization", icon: "sparkles" },
]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(serviceCategoriesMessages)
  return buildMetadata({
    title: t("organicSearch.metaTitle"),
    description: t("organicSearch.metaDescription"),
    path: "/seo-lead-generation/organic-search",
  })
}

export default async function OrganicSearchPage() {
  const t = await getTranslator(serviceCategoriesMessages)
  const c = await getTranslator(commonMessages)
  const k = await getTranslator(kitMessages)

  const services = t
    .raw<{ title: string; body: string }[]>("organicSearch.services", [])
    .map((service, i) => ({
      title: service.title,
      description: service.body,
      icon: SERVICES[i]?.icon,
      href: liveHref(SERVICES[i]?.href),
    }))

  return (
    <PageShell>
      <PageHero
        crumbs={[
          { label: c("breadcrumb.home"), href: "/" },
          { label: c("breadcrumb.seoLeadGen"), href: "/seo-lead-generation" },
          { label: t("organicSearch.breadcrumbCurrent") },
        ]}
        kicker={c("breadcrumb.seoLeadGen")}
        title={t("organicSearch.title")}
        subtitle={t("organicSearch.intro")}
        highlights={t.list("organicSearch.highlights")}
        primary={{ label: t("consultation"), href: "/contact" }}
        secondary={{ label: k("explore"), href: "#services" }}
        icon="search"
        chips={services.slice(0, 3).map((s) => s.title)}
      />

      <Section id="services" kicker={k("areasKicker")} title={t("organicSearch.servicesTitle")}>
        <CardGrid items={services} cta={t("learnMore")} columns={3} />
      </Section>

      <ProcessSection />
      <RelatedServices slugs={["seo", "content-creation", "web-design-development"]} />
      <ContactCta title={t("organicSearch.ctaTitle")} body={t("organicSearch.ctaBody")} button={t("getStarted")} />
    </PageShell>
  )
}
