import type { Metadata } from "next"
import { getTranslator } from "@/lib/i18n/server"
import { aboutApproachMessages } from "@/lib/i18n/messages/aboutApproach"
import { commonMessages } from "@/lib/i18n/messages/common"
import { CardGrid, PageHero, PageShell, Section, Timeline, type IconName } from "@/app/components/kit"
import { ContactCta } from "@/app/components/kit-sections"

const PHILOSOPHY_ICONS: IconName[] = ["target", "chart", "lightbulb"]
const METHODOLOGY_ICONS: IconName[] = ["users", "zap", "chart", "lightbulb"]

type Card = { title: string; body: string }
type Step = { title: string; body: string; points: string[] }
type CaseStudy = { category: string; title: string; body: string }

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(aboutApproachMessages)
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default async function ApproachPage() {
  const t = await getTranslator(aboutApproachMessages)
  const c = await getTranslator(commonMessages)

  const philosophy = t
    .raw<Card[]>("philosophy.cards", [])
    .map((card, i) => ({ title: card.title, description: card.body, icon: PHILOSOPHY_ICONS[i] }))
  const steps = t.raw<Step[]>("process.steps", [])
  const methodology = t
    .raw<Card[]>("methodology.cards", [])
    .map((card, i) => ({ title: card.title, description: card.body, icon: METHODOLOGY_ICONS[i] }))
  const caseStudies = t
    .raw<CaseStudy[]>("caseStudies.items", [])
    .map((study) => ({ title: study.title, description: study.body, eyebrow: study.category, icon: "trophy" as IconName }))

  return (
    <PageShell>
      <PageHero
        crumbs={[
          { label: c("breadcrumb.home"), href: "/" },
          { label: c("breadcrumb.about"), href: "/about" },
          { label: t("hero.title") },
        ]}
        kicker={c("breadcrumb.about")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        primary={{ label: t("cta.proposal"), href: "/contact" }}
        secondary={{ label: t("process.title"), href: "#process" }}
        icon="compass"
        chips={philosophy.map((p) => p.title)}
      />

      <Section title={t("philosophy.title")} subline={t("philosophy.intro")}>
        <CardGrid items={philosophy} columns={3} />
      </Section>

      <Section id="process" grid title={t("process.title")} subline={t("process.intro")}>
        <Timeline
          items={steps.map((step) => ({ title: step.title, body: step.body, points: step.points }))}
          pointsLabel={t("process.expectLabel")}
        />
      </Section>

      <Section title={t("methodology.title")} subline={t("methodology.intro")}>
        <CardGrid items={methodology} columns={2} numbered={false} />
      </Section>

      <Section grid title={t("caseStudies.title")} subline={t("caseStudies.intro")}>
        <CardGrid items={caseStudies} columns={3} numbered={false} />
      </Section>

      <ContactCta
        title={t("cta.title")}
        body={t("cta.body")}
        button={t("cta.proposal")}
        secondary={{ label: t("cta.contact"), href: "/contact" }}
      />
    </PageShell>
  )
}
