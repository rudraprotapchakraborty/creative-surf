import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { localSeoMessages } from "@/lib/i18n/messages/localSeo"
import { commonMessages } from "@/lib/i18n/messages/common"
import { serviceCategoriesMessages } from "@/lib/i18n/messages/serviceCategories"
import { kitMessages } from "@/lib/i18n/messages/kit"
import {
  CardGrid,
  FaqSection,
  PageHero,
  PageShell,
  PricingGrid,
  Section,
  StatBand,
  Timeline,
  type IconName,
} from "@/app/components/kit"
import { ContactCta, RelatedServices } from "@/app/components/kit-sections"

const SERVICE_ICONS: IconName[] = ["pin", "star", "search", "users", "trending", "globe"]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(localSeoMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/seo-lead-generation/organic-search/local-seo",
  })
}

export default async function LocalSEOPage() {
  const t = await getTranslator(localSeoMessages)
  const c = await getTranslator(commonMessages)
  const k = await getTranslator(kitMessages)
  const sc = await getTranslator(serviceCategoriesMessages)

  const stats = t.raw<{ value: string; label: string }[]>("stats", [])
  const reasons = t
    .raw<{ title: string; body: string }[]>("what.reasons", [])
    .map((reason) => ({ title: reason.title, description: reason.body, icon: "target" as IconName }))
  const services = t
    .raw<{ title: string; body: string; points: string[] }[]>("services.items", [])
    .map((service, i) => ({
      title: service.title,
      description: service.body,
      points: service.points,
      icon: SERVICE_ICONS[i],
    }))
  const steps = t.raw<{ title: string; body: string }[]>("process.steps", [])
  const tiers = t
    .raw<{ name: string; price: string; audience: string; features: string[] }[]>("pricing.tiers", [])
    .map((tier, i) => ({
      ...tier,
      period: t("pricing.perMonth"),
      href: "/contact",
      cta: t("pricing.getStarted"),
      highlight: i === 1,
      badge: t("pricing.mostPopular"),
    }))
  const caseStudies = t
    .raw<{ category: string; title: string; body: string }[]>("caseStudies.items", [])
    .map((study) => ({ title: study.title, description: study.body, eyebrow: study.category, icon: "trophy" as IconName }))
  const faq = t
    .raw<{ question: string; answer: string }[]>("faq.items", [])
    .map((item) => ({ q: item.question, a: item.answer }))

  return (
    <PageShell>
      <PageHero
        crumbs={[
          { label: c("breadcrumb.home"), href: "/" },
          { label: c("breadcrumb.seoLeadGen"), href: "/seo-lead-generation" },
          { label: c("breadcrumb.organicSearch"), href: "/seo-lead-generation/organic-search" },
          { label: sc("organicSearch.services.3.title") },
        ]}
        kicker={c("breadcrumb.organicSearch")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        primary={{ label: t("hero.ctaPrimary"), href: "/contact" }}
        secondary={{ label: t("hero.ctaSecondary"), href: "#pricing" }}
        icon="pin"
        chips={services.slice(0, 3).map((s) => s.title)}
      />

      {stats.length > 0 && (
        <section className="section-px bg-flow-bg pb-4">
          <div className="mx-auto max-w-7xl">
            <StatBand items={stats} />
          </div>
        </section>
      )}

      <Section kicker={t("what.whyTitle")} title={t("what.title")} subline={t("what.body")}>
        <CardGrid items={reasons} columns={reasons.length >= 4 ? 4 : 3} numbered={false} compact />
      </Section>

      <Section grid kicker={k("areasKicker")} title={t("services.title")} subline={t("services.intro")}>
        <CardGrid items={services} columns={3} />
      </Section>

      <Section title={t("process.title")} subline={t("process.intro")}>
        <Timeline items={steps.map((step) => ({ title: step.title, body: step.body }))} />
      </Section>

      <Section id="pricing" grid title={t("pricing.title")} subline={t("pricing.intro")}>
        <PricingGrid tiers={tiers} />
      </Section>

      <Section kicker={k("featuredKicker")} title={t("caseStudies.title")} subline={t("caseStudies.intro")}>
        <CardGrid items={caseStudies} columns={3} numbered={false} />
      </Section>

      <FaqSection title={t("faq.title")} items={faq} idPrefix="local-seo" />
      <RelatedServices slugs={["seo", "social-media-management", "digital-marketing"]} />
      <ContactCta
        title={t("cta.title")}
        body={t("cta.body")}
        button={t("cta.primary")}
        secondary={{ label: t("cta.secondary"), href: "/contact" }}
      />
    </PageShell>
  )
}
