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
  { href: "/seo-lead-generation/organic-search", icon: "search" },
  { href: "/seo-lead-generation/digital-advertising", icon: "megaphone" },
  { href: "/seo-lead-generation/ecommerce", icon: "cart" },
  { href: "/seo-lead-generation/learn", icon: "book" },
]

const FEATURED: { href: string; icon: IconName }[] = [
  { href: "/seo-lead-generation/organic-search/seo-services", icon: "trending" },
  { href: "/seo-lead-generation/digital-advertising/ppc-management", icon: "pointer" },
  { href: "/seo-lead-generation/ecommerce/ecommerce-seo", icon: "cart" },
]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(serviceHubsMessages)
  return buildMetadata({
    title: t("seo.metaTitle"),
    description: t("seo.metaDescription"),
    path: "/seo-lead-generation",
  })
}

export default async function SEOLeadGenerationPage() {
  const t = await getTranslator(serviceHubsMessages)
  const c = await getTranslator(commonMessages)
  const k = await getTranslator(kitMessages)
  const s = await getTranslator(servicesMessages)

  const cards = t
    .raw<{ title: string; body: string }[]>("seo.cards", [])
    .map((card, i) => ({
      title: card.title,
      description: card.body,
      icon: CARDS[i]?.icon,
      href: liveHref(CARDS[i]?.href),
    }))

  const featured = t
    .raw<{ title: string; body: string }[]>("seo.featured", [])
    .map((item, i) => ({
      title: item.title,
      description: item.body,
      icon: FEATURED[i]?.icon,
      eyebrow: k("featuredKicker"),
      href: liveHref(FEATURED[i]?.href),
    }))

  return (
    <PageShell>
      <PageHero
        crumbs={[{ label: c("breadcrumb.home"), href: "/" }, { label: c("breadcrumb.seoLeadGen") }]}
        kicker={c("breadcrumb.seoLeadGen")}
        title={t("seo.title")}
        subtitle={t("seo.subtitle")}
        primary={{ label: s("hero.ctaPrimary"), href: "/contact" }}
        secondary={{ label: k("explore"), href: "#areas" }}
      />

      <Section id="areas" kicker={k("areasKicker")} title={k("areasTitle")} accent={k("areasAccent")}>
        <CardGrid items={cards} cta={t("learnMore")} columns={4} />
      </Section>

      <Section grid kicker={k("featuredKicker")} title={t("seo.featuredTitle")}>
        <CardGrid items={featured} cta={t("learnMore")} columns={3} numbered={false} />
      </Section>

      <ProcessSection />
      <RelatedServices slugs={["seo", "digital-marketing", "content-creation"]} />
      <ContactCta title={t("seo.ctaTitle")} body={t("seo.ctaBody")} button={t("seo.ctaButton")} />
    </PageShell>
  )
}
