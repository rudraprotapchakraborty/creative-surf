import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { ecommerceSeoMessages } from "@/lib/i18n/messages/ecommerceSeo"
import { commonMessages } from "@/lib/i18n/messages/common"
import { kitMessages } from "@/lib/i18n/messages/kit"
import { liveHref } from "@/lib/routes"
import {
  CardGrid,
  FaqSection,
  PageHero,
  PageShell,
  Section,
  StatBand,
  TabbedPanels,
  TestimonialGrid,
  Timeline,
  type IconName,
} from "@/app/components/kit"
import { ContactCta, RelatedServices } from "@/app/components/kit-sections"

const SERVICE_ICONS: IconName[] = ["cart", "lineChart", "trending", "users", "star", "zap"]

/** Platform names stay untranslated — they are product names. */
const PLATFORM_LABELS = ["Shopify", "WooCommerce", "Magento", "BigCommerce"]

const CASE_STUDY_HREFS = [
  "/case-studies/fashion-retailer",
  "/case-studies/home-goods",
  "/case-studies/electronics-store",
]

const TESTIMONIAL_NAMES = ["Sarah Johnson", "Michael Chen", "Jessica Martinez"]

type Service = { title: string; body: string; points: string[] }
type Platform = { title: string; body: string; points: string[] }

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(ecommerceSeoMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/seo-lead-generation/ecommerce/ecommerce-seo",
  })
}

export default async function EcommerceSEOPage() {
  const t = await getTranslator(ecommerceSeoMessages)
  const c = await getTranslator(commonMessages)
  const k = await getTranslator(kitMessages)

  const stats = t.raw<{ value: string; label: string }[]>("stats", [])
  const services = t
    .raw<Service[]>("services.items", [])
    .map((service, i) => ({
      title: service.title,
      description: service.body,
      points: service.points,
      icon: SERVICE_ICONS[i],
    }))
  const steps = t.raw<{ title: string; body: string }[]>("process.steps", [])
  const platforms = t
    .raw<Platform[]>("platforms.items", [])
    .map((platform, i) => ({
      label: PLATFORM_LABELS[i] ?? platform.title,
      title: platform.title,
      body: platform.body,
      points: platform.points,
      icon: "cart" as IconName,
    }))
  const caseStudies = t
    .raw<{ tag: string; title: string; body: string; result: string }[]>("caseStudies.items", [])
    .map((study, i) => ({
      title: study.title,
      description: study.body,
      eyebrow: study.tag,
      stat: { label: t("caseStudies.resultsLabel"), value: study.result },
      href: liveHref(CASE_STUDY_HREFS[i]),
    }))
  const testimonials = t
    .raw<{ quote: string; role: string }[]>("testimonials.items", [])
    .map((item, i) => ({ quote: item.quote, role: item.role, name: TESTIMONIAL_NAMES[i] ?? "", rating: 5 }))
  const faq = t
    .raw<{ question: string; answer: string }[]>("faq.items", [])
    .map((item) => ({ q: item.question, a: item.answer }))

  return (
    <PageShell>
      <PageHero
        crumbs={[
          { label: c("breadcrumb.home"), href: "/" },
          { label: c("breadcrumb.seoLeadGen"), href: "/seo-lead-generation" },
          { label: c("breadcrumb.ecommerce") },
        ]}
        kicker={c("breadcrumb.ecommerce")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        primary={{ label: t("hero.ctaPrimary"), href: "/contact" }}
        secondary={{ label: t("hero.ctaSecondary"), href: "#case-studies" }}
        icon="cart"
        chips={[`${t("hero.badgeValue")} ${t("hero.badgeLabel")}`, ...PLATFORM_LABELS.slice(0, 2)]}
      />

      {stats.length > 0 && (
        <section className="section-px bg-flow-bg pb-4">
          <div className="mx-auto max-w-7xl">
            <StatBand items={stats} />
          </div>
        </section>
      )}

      <Section kicker={k("areasKicker")} title={t("services.title")} subline={t("services.intro")}>
        <CardGrid items={services} columns={3} />
      </Section>

      <Section grid title={t("process.title")} subline={t("process.intro")}>
        <Timeline items={steps.map((step) => ({ title: step.title, body: step.body }))} />
      </Section>

      <Section title={t("platforms.title")} subline={t("platforms.intro")}>
        <TabbedPanels tabs={platforms} id="platforms" />
      </Section>

      <Section id="case-studies" grid kicker={k("featuredKicker")} title={t("caseStudies.title")} subline={t("caseStudies.intro")}>
        <CardGrid items={caseStudies} cta={t("caseStudies.readMore")} columns={3} numbered={false} />
      </Section>

      <Section title={t("testimonials.title")} subline={t("testimonials.intro")}>
        <TestimonialGrid items={testimonials} />
      </Section>

      <FaqSection title={t("faq.title")} items={faq} idPrefix="ecommerce-seo" />
      <RelatedServices slugs={["seo", "digital-marketing", "web-design-development"]} />
      <ContactCta
        title={t("cta.title")}
        body={t("cta.body")}
        button={t("cta.primary")}
        secondary={{ label: t("cta.secondary"), href: "/contact" }}
      />
    </PageShell>
  )
}
