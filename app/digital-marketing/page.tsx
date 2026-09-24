import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { serviceHubsMessages } from "@/lib/i18n/messages/serviceHubs"
import { commonMessages } from "@/lib/i18n/messages/common"
import { kitMessages } from "@/lib/i18n/messages/kit"
import { servicesMessages } from "@/lib/i18n/messages/services"
import { liveHref } from "@/lib/routes"
import { CardGrid, PageHero, PageShell, Section, type IconName } from "@/app/components/kit"
import { ContactCta, ProcessSection, RelatedServices } from "@/app/components/kit-sections"

const CARDS: { href: string; icon: IconName }[] = [
  { href: "/digital-marketing/digital-intelligence", icon: "lineChart" },
  { href: "/digital-marketing/conversion", icon: "pointer" },
  { href: "/digital-marketing/marketing-automation", icon: "zap" },
  { href: "/digital-marketing/commerce-platforms", icon: "cart" },
]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(serviceHubsMessages)
  return buildMetadata({
    title: t("digitalMarketing.metaTitle"),
    description: t("digitalMarketing.metaDescription"),
    path: "/digital-marketing",
  })
}

export default async function DigitalMarketingPage() {
  const t = await getTranslator(serviceHubsMessages)
  const c = await getTranslator(commonMessages)
  const k = await getTranslator(kitMessages)
  const s = await getTranslator(servicesMessages)

  const cards = t
    .raw<{ title: string; body: string }[]>("digitalMarketing.cards", [])
    .map((card, i) => ({
      title: card.title,
      description: card.body,
      icon: CARDS[i]?.icon,
      href: liveHref(CARDS[i]?.href),
    }))

  return (
    <PageShell>
      <PageHero
        crumbs={[{ label: c("breadcrumb.home"), href: "/" }, { label: c("breadcrumb.digitalMarketing") }]}
        kicker={c("breadcrumb.digitalMarketing")}
        title={t("digitalMarketing.title")}
        subtitle={t("digitalMarketing.subtitle")}
        primary={{ label: s("hero.ctaPrimary"), href: "/contact" }}
        secondary={{ label: k("explore"), href: "#areas" }}
      />

      <Section id="areas" kicker={k("areasKicker")} title={k("areasTitle")} accent={k("areasAccent")}>
        <CardGrid items={cards} cta={t("learnMore")} columns={4} />
      </Section>

      <ProcessSection />
      <RelatedServices slugs={["digital-marketing", "seo", "social-media-management"]} />
      <ContactCta body={t("digitalMarketing.closing")} button={t("digitalMarketing.ctaButton")} />
    </PageShell>
  )
}
