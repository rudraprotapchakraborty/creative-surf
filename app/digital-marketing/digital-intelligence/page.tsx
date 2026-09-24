import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { digitalIntelligenceMessages } from "@/lib/i18n/messages/digitalIntelligence"
import { commonMessages } from "@/lib/i18n/messages/common"
import { kitMessages } from "@/lib/i18n/messages/kit"
import { liveHref } from "@/lib/routes"
import { CardGrid, PageHero, PageShell, Section, type IconName } from "@/app/components/kit"
import { ContactCta, ProcessSection, RelatedServices } from "@/app/components/kit-sections"

const SERVICES: { href: string; icon: IconName }[] = [
  { href: "/digital-marketing/digital-intelligence/web-channel-call-tracking", icon: "phone" },
  { href: "/digital-marketing/digital-intelligence/seo-reporting", icon: "chart" },
  { href: "/digital-marketing/digital-intelligence/channel-attribution", icon: "layers" },
  { href: "/digital-marketing/digital-intelligence/competitor-analysis", icon: "eye" },
  { href: "/digital-marketing/digital-intelligence/private-equity", icon: "briefcase" },
  { href: "/digital-marketing/digital-intelligence/revenue-operations", icon: "dollar" },
]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(digitalIntelligenceMessages)
  return buildMetadata({
    title: t("index.metaTitle"),
    description: t("index.metaDescription"),
    path: "/digital-marketing/digital-intelligence",
  })
}

export default async function DigitalIntelligencePage() {
  const t = await getTranslator(digitalIntelligenceMessages)
  const c = await getTranslator(commonMessages)
  const k = await getTranslator(kitMessages)

  const services = t
    .raw<{ title: string; body: string }[]>("index.services", [])
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
          { label: c("breadcrumb.digitalMarketing"), href: "/digital-marketing" },
          { label: t("index.breadcrumbCurrent") },
        ]}
        kicker={c("breadcrumb.digitalMarketing")}
        title={t("index.title")}
        subtitle={t("index.intro")}
        highlights={t.list("index.highlights")}
        primary={{ label: t("consultation"), href: "/contact" }}
        secondary={{ label: k("explore"), href: "#services" }}
        icon="lineChart"
        chips={services.slice(0, 3).map((s) => s.title)}
      />

      <Section id="services" kicker={k("areasKicker")} title={t("index.servicesTitle")}>
        <CardGrid items={services} cta={t("learnMore")} columns={3} />
      </Section>

      <ProcessSection />
      <RelatedServices slugs={["digital-marketing", "seo", "web-design-development"]} />
      <ContactCta title={t("index.ctaTitle")} body={t("index.ctaBody")} button={t("contactUs")} />
    </PageShell>
  )
}
