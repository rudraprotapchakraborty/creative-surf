import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { digitalIntelligenceMessages } from "@/lib/i18n/messages/digitalIntelligence"
import { commonMessages } from "@/lib/i18n/messages/common"
import { kitMessages } from "@/lib/i18n/messages/kit"
import { CardGrid, FeatureSplit, PageHero, PageShell, Section, Timeline, type IconName } from "@/app/components/kit"
import { ContactCta, RelatedServices } from "@/app/components/kit-sections"

const FEATURE_ICONS: IconName[] = ["chart", "lineChart", "trending", "layers"]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(digitalIntelligenceMessages)
  return buildMetadata({
    title: t("seoReporting.metaTitle"),
    description: t("seoReporting.metaDescription"),
    path: "/digital-marketing/digital-intelligence/seo-reporting",
  })
}

export default async function SEOReportingPage() {
  const t = await getTranslator(digitalIntelligenceMessages)
  const c = await getTranslator(commonMessages)
  const k = await getTranslator(kitMessages)

  const features = t
    .raw<{ title: string; body: string }[]>("seoReporting.features", [])
    .map((feature, i) => ({ title: feature.title, description: feature.body, icon: FEATURE_ICONS[i] }))

  const steps = t.raw<{ title: string; body: string }[]>("seoReporting.steps", [])

  return (
    <PageShell>
      <PageHero
        crumbs={[
          { label: c("breadcrumb.home"), href: "/" },
          { label: c("breadcrumb.digitalMarketing"), href: "/digital-marketing" },
          { label: c("breadcrumb.digitalIntelligence"), href: "/digital-marketing/digital-intelligence" },
          { label: t("seoReporting.breadcrumbCurrent") },
        ]}
        kicker={c("breadcrumb.digitalIntelligence")}
        title={t("seoReporting.title")}
        subtitle={t("seoReporting.intro")}
        highlights={t.list("seoReporting.highlights")}
        primary={{ label: t("seoReporting.requestDemo"), href: "/contact" }}
        secondary={{ label: k("explore"), href: "#features" }}
        icon="chart"
        chips={features.slice(0, 3).map((f) => f.title)}
      />

      <Section id="features" kicker={k("areasKicker")} title={t("seoReporting.featuresTitle")}>
        <CardGrid items={features} columns={4} />
      </Section>

      <Section grid title={t("seoReporting.howTitle")}>
        <Timeline items={steps.map((step) => ({ title: step.title, body: step.body }))} />
      </Section>

      <FeatureSplit
        kicker={t("seoReporting.caseStudy.label")}
        title={t("seoReporting.caseStudy.title")}
        paragraphs={[t("seoReporting.caseStudy.body")]}
        points={t.list("seoReporting.caseStudy.results")}
        icon="trophy"
        reverse
      />

      <RelatedServices slugs={["seo", "digital-marketing", "content-creation"]} />
      <ContactCta
        title={t("seoReporting.ctaTitle")}
        body={t("seoReporting.ctaBody")}
        button={t("seoReporting.ctaButton")}
      />
    </PageShell>
  )
}
