import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { designMessages } from "@/lib/i18n/messages/design"
import { commonMessages } from "@/lib/i18n/messages/common"
import { kitMessages } from "@/lib/i18n/messages/kit"
import {
  CardGrid,
  FaqSection,
  FeatureSplit,
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

const FEATURE_ICONS: IconName[] = ["cart", "pen", "code", "chart", "dollar", "users"]

/** Platform names are product names, not copy. */
const PLATFORM_LABELS = ["Shopify", "WooCommerce", "Magento", "BigCommerce"]

const TESTIMONIAL_NAMES = ["Sarah Johnson", "Michael Chen", "Jessica Williams"]

type Card2 = { title: string; body: string }
type Platform = { title: string; body: string; points: string[] }

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(designMessages)
  return buildMetadata({
    title: t("ecommerceDesign.metaTitle"),
    description: t("ecommerceDesign.metaDescription"),
    path: "/ux-interactive/design/ecommerce-design",
  })
}

export default async function EcommerceDesignPage() {
  const t = await getTranslator(designMessages)
  const c = await getTranslator(commonMessages)
  const k = await getTranslator(kitMessages)

  const stats = t.raw<{ value: string; label: string }[]>("ecommerceDesign.stats", [])
  const features = t
    .raw<Card2[]>("ecommerceDesign.features.items", [])
    .map((feature, i) => ({ title: feature.title, description: feature.body, icon: FEATURE_ICONS[i] }))
  const steps = t.raw<Card2[]>("ecommerceDesign.process.steps", [])
  const platforms = t
    .raw<Platform[]>("ecommerceDesign.platforms.items", [])
    .map((platform, i) => ({
      label: PLATFORM_LABELS[i] ?? platform.title,
      title: platform.title,
      body: platform.body,
      points: platform.points,
      icon: "cart" as IconName,
    }))
  const testimonials = t
    .raw<{ company: string; quote: string }[]>("ecommerceDesign.testimonials.items", [])
    .map((item, i) => ({ quote: item.quote, role: item.company, name: TESTIMONIAL_NAMES[i] ?? "", rating: 5 }))
  const faq = t
    .raw<{ question: string; answer: string }[]>("ecommerceDesign.faq.items", [])
    .map((item) => ({ q: item.question, a: item.answer }))

  return (
    <PageShell>
      <PageHero
        crumbs={[
          { label: c("breadcrumb.home"), href: "/" },
          { label: c("breadcrumb.uxInteractive"), href: "/ux-interactive" },
          { label: c("breadcrumb.design") },
          { label: c("breadcrumb.ecommerce") },
        ]}
        kicker={c("breadcrumb.design")}
        title={t("ecommerceDesign.hero.title")}
        subtitle={t("ecommerceDesign.hero.subtitle")}
        primary={{ label: t("ecommerceDesign.hero.primary"), href: "/contact" }}
        secondary={{ label: k("explore"), href: "#features" }}
        icon="cart"
        chips={PLATFORM_LABELS.slice(0, 3)}
      />

      {stats.length > 0 && (
        <section className="section-px bg-flow-bg pb-4">
          <div className="mx-auto max-w-7xl">
            <StatBand items={stats} />
          </div>
        </section>
      )}

      <Section id="features" kicker={k("areasKicker")} title={t("ecommerceDesign.features.title")}>
        <CardGrid items={features} columns={3} />
      </Section>

      <Section grid title={t("ecommerceDesign.process.title")}>
        <Timeline items={steps.map((step) => ({ title: step.title, body: step.body }))} />
      </Section>

      <Section title={t("ecommerceDesign.platforms.title")}>
        <TabbedPanels tabs={platforms} id="ecommerce-platforms" />
      </Section>

      <FeatureSplit
        kicker={k("featuredKicker")}
        title={t("ecommerceDesign.portfolio.title")}
        paragraphs={[t("ecommerceDesign.portfolio.intro")]}
        points={t.list("ecommerceDesign.portfolio.results")}
        icon="trophy"
        reverse
      />

      <Section grid title={t("ecommerceDesign.testimonials.title")}>
        <TestimonialGrid items={testimonials} />
      </Section>

      <FaqSection title={t("ecommerceDesign.faq.title")} items={faq} idPrefix="ecommerce-design" />
      <RelatedServices slugs={["web-design-development", "digital-marketing", "seo"]} />
      <ContactCta
        title={t("ecommerceDesign.cta.title")}
        body={t("ecommerceDesign.cta.body")}
        button={t("ecommerceDesign.cta.primary")}
        secondary={{ label: t("ecommerceDesign.cta.secondary"), href: "/contact" }}
      />
    </PageShell>
  )
}
