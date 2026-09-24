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
  { href: "/seo-lead-generation/digital-advertising/ppc-management", icon: "pointer" },
  { href: "/seo-lead-generation/digital-advertising/enterprise-ppc", icon: "briefcase" },
  { href: "/seo-lead-generation/digital-advertising/social-media-advertising", icon: "users" },
  { href: "/seo-lead-generation/digital-advertising/enterprise-social-media", icon: "globe" },
  { href: "/seo-lead-generation/digital-advertising/programmatic-advertising", icon: "zap" },
  { href: "/seo-lead-generation/digital-advertising/geofencing", icon: "pin" },
]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(serviceCategoriesMessages)
  return buildMetadata({
    title: t("digitalAdvertising.metaTitle"),
    description: t("digitalAdvertising.metaDescription"),
    path: "/seo-lead-generation/digital-advertising",
  })
}

export default async function DigitalAdvertisingPage() {
  const t = await getTranslator(serviceCategoriesMessages)
  const c = await getTranslator(commonMessages)
  const k = await getTranslator(kitMessages)

  const services = t
    .raw<{ title: string; body: string }[]>("digitalAdvertising.services", [])
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
          { label: t("digitalAdvertising.breadcrumbCurrent") },
        ]}
        kicker={c("breadcrumb.seoLeadGen")}
        title={t("digitalAdvertising.title")}
        subtitle={t("digitalAdvertising.intro")}
        highlights={t.list("digitalAdvertising.highlights")}
        primary={{ label: t("consultation"), href: "/contact" }}
        secondary={{ label: k("explore"), href: "#services" }}
        icon="megaphone"
        chips={services.slice(0, 3).map((s) => s.title)}
      />

      <Section id="services" kicker={k("areasKicker")} title={t("digitalAdvertising.servicesTitle")}>
        <CardGrid items={services} cta={t("learnMore")} columns={3} />
      </Section>

      <ProcessSection />
      <RelatedServices slugs={["social-media-management", "digital-marketing", "content-creation"]} />
      <ContactCta
        title={t("digitalAdvertising.ctaTitle")}
        body={t("digitalAdvertising.ctaBody")}
        button={t("getStarted")}
      />
    </PageShell>
  )
}
