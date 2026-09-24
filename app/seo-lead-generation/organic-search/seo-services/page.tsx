import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { seoServicesMessages } from "@/lib/i18n/messages/seoServices"
import { commonMessages } from "@/lib/i18n/messages/common"
import { kitMessages } from "@/lib/i18n/messages/kit"
import { liveHref } from "@/lib/routes"
import {
  CardGrid,
  FaqSection,
  FeatureSplit,
  PageHero,
  PageShell,
  PricingGrid,
  Section,
  type IconName,
} from "@/app/components/kit"
import { ContactCta, RelatedServices } from "@/app/components/kit-sections"

const APPROACH_ICONS: IconName[] = ["search", "wrench", "pen", "chart"]
const BENEFIT_ICONS: IconName[] = ["trending", "target", "heart", "rocket"]

/** Package slugs stay in English so the contact deep-links keep working. */
const PACKAGE_SLUGS = ["seo-basic", "seo-professional", "seo-enterprise"]

const CASE_STUDY_HREF = "/case-studies/b2b-software-seo"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(seoServicesMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/seo-lead-generation/organic-search/seo-services",
  })
}

export default async function SEOServicesPage() {
  const t = await getTranslator(seoServicesMessages)
  const c = await getTranslator(commonMessages)
  const k = await getTranslator(kitMessages)

  const approach = t
    .raw<{ title: string; body: string }[]>("approach.items", [])
    .map((item, i) => ({ title: item.title, description: item.body, icon: APPROACH_ICONS[i] }))

  const benefits = t
    .raw<{ title: string; body: string }[]>("benefits.items", [])
    .map((item, i) => ({ title: item.title, description: item.body, icon: BENEFIT_ICONS[i] }))

  const tiers = t
    .raw<{ name: string; audience: string; price: string; features: string[] }[]>("packages.tiers", [])
    .map((tier, i) => ({
      ...tier,
      period: t("packages.perMonth"),
      href: `/contact?package=${PACKAGE_SLUGS[i] ?? ""}`,
      cta: t("packages.getStarted"),
      highlight: i === 1,
      badge: t("packages.popular"),
    }))

  const faq = t
    .raw<{ question: string; answer: string }[]>("faq.items", [])
    .map((item) => ({ q: item.question, a: item.answer }))

  const caseStudyHref = liveHref(CASE_STUDY_HREF)

  return (
    <PageShell>
      <PageHero
        crumbs={[
          { label: c("breadcrumb.home"), href: "/" },
          { label: c("breadcrumb.seoLeadGen"), href: "/seo-lead-generation" },
          { label: c("breadcrumb.organicSearch"), href: "/seo-lead-generation/organic-search" },
          { label: t("breadcrumbCurrent") },
        ]}
        kicker={c("breadcrumb.organicSearch")}
        title={t("hero.title")}
        subtitle={t("hero.intro")}
        highlights={t.list("hero.highlights")}
        primary={{ label: t("hero.cta"), href: "/contact" }}
        secondary={{ label: k("explore"), href: "#approach" }}
        icon="trending"
        chips={approach.slice(0, 3).map((a) => a.title)}
      />

      <Section id="approach" kicker={k("areasKicker")} title={t("approach.title")}>
        <CardGrid items={approach} columns={4} />
      </Section>

      <Section grid kicker={k("highlightsKicker")} title={t("benefits.title")}>
        <CardGrid items={benefits} columns={2} numbered={false} />
      </Section>

      <FeatureSplit
        kicker={t("caseStudy.label")}
        title={t("caseStudy.title")}
        paragraphs={[t("caseStudy.body")]}
        points={t.list("caseStudy.results")}
        icon="trophy"
        action={caseStudyHref ? { label: t("caseStudy.readFull"), href: caseStudyHref } : undefined}
        reverse
      />

      <Section grid title={t("packages.title")}>
        <PricingGrid tiers={tiers} />
      </Section>

      <FaqSection title={t("faq.title")} items={faq} idPrefix="seo-services" />
      <RelatedServices slugs={["seo", "content-creation", "web-design-development"]} />
      <ContactCta title={t("cta.title")} body={t("cta.body")} button={t("cta.button")} />
    </PageShell>
  )
}
