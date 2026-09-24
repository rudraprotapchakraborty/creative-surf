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

/**
 * "Design" has no hub page of its own yet, so it points at its main child —
 * website design — rather than at nothing.
 */
const CARDS: { href: string; icon: IconName }[] = [
  { href: "/ux-interactive/design/website-design", icon: "monitor" },
  { href: "/ux-interactive/content-marketing", icon: "pen" },
  { href: "/ux-interactive/development", icon: "code" },
  { href: "/ux-interactive/challenges", icon: "wrench" },
]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(serviceHubsMessages)
  return buildMetadata({
    title: t("ux.metaTitle"),
    description: t("ux.metaDescription"),
    path: "/ux-interactive",
  })
}

export default async function UXInteractivePage() {
  const t = await getTranslator(serviceHubsMessages)
  const c = await getTranslator(commonMessages)
  const k = await getTranslator(kitMessages)
  const s = await getTranslator(servicesMessages)

  const cards = t
    .raw<{ title: string; body: string }[]>("ux.cards", [])
    .map((card, i) => ({
      title: card.title,
      description: card.body,
      icon: CARDS[i]?.icon,
      href: liveHref(CARDS[i]?.href),
    }))

  return (
    <PageShell>
      <PageHero
        crumbs={[{ label: c("breadcrumb.home"), href: "/" }, { label: c("breadcrumb.uxInteractive") }]}
        kicker={c("breadcrumb.uxInteractive")}
        title={t("ux.title")}
        subtitle={t("ux.subtitle")}
        primary={{ label: s("hero.ctaPrimary"), href: "/contact" }}
        secondary={{ label: k("explore"), href: "#areas" }}
      />

      <Section id="areas" kicker={k("areasKicker")} title={k("areasTitle")} accent={k("areasAccent")}>
        <CardGrid items={cards} cta={t("learnMore")} columns={4} />
      </Section>

      <ProcessSection />
      <RelatedServices slugs={["web-design-development", "brand-strategy", "content-creation"]} />
      <ContactCta body={t("ux.closing")} button={t("ux.ctaButton")} />
    </PageShell>
  )
}
