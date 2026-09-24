import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { aboutCareersMessages } from "@/lib/i18n/messages/aboutCareers"
import { commonMessages } from "@/lib/i18n/messages/common"
import {
  CardGrid,
  CheckList,
  FeatureSplit,
  PageHero,
  PageShell,
  Section,
  TestimonialGrid,
  Timeline,
  type IconName,
} from "@/app/components/kit"
import { ContactCta } from "@/app/components/kit-sections"

const BENEFIT_ICONS: IconName[] = ["heart", "zap", "book", "users"]

const TESTIMONIAL_NAMES = ["Alex Chen", "Sarah Johnson", "Michael Rodriguez"]

/**
 * There are no per-role pages, so applications go through the contact form
 * with the role named in the subject line.
 */
const applyHref = (role: string) => `/contact?subject=${encodeURIComponent(`Career Inquiry: ${role}`)}`

type Job = {
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(aboutCareersMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about/careers",
  })
}

export default async function CareersPage() {
  const t = await getTranslator(aboutCareersMessages)
  const c = await getTranslator(commonMessages)

  const benefits = t
    .raw<{ title: string; description: string }[]>("benefits.items", [])
    .map((benefit, i) => ({ ...benefit, icon: BENEFIT_ICONS[i] }))
  const testimonials = t
    .raw<{ position: string; years: string; quote: string }[]>("testimonials.items", [])
    .map((item, i) => ({ quote: item.quote, name: TESTIMONIAL_NAMES[i] ?? "", role: `${item.position} · ${item.years}` }))
  const jobs = t.raw<Job[]>("openings.jobs", []).map((job) => ({
    title: job.title,
    eyebrow: job.department,
    description: job.description,
    tags: [job.location, job.type],
    points: job.requirements,
    href: applyHref(job.title),
  }))
  const steps = t.raw<{ title: string; description: string }[]>("process.steps", [])
  const extras = t.list("benefits.extras")

  return (
    <PageShell>
      <PageHero
        crumbs={[
          { label: c("breadcrumb.home"), href: "/" },
          { label: c("breadcrumb.about"), href: "/about" },
          { label: t("breadcrumbCurrent") },
        ]}
        kicker={c("breadcrumb.about")}
        title={t("hero.title")}
        subtitle={`${t("hero.p1")} ${t("hero.p2")}`}
        primary={{ label: t("hero.cta"), href: "#current-openings" }}
        icon="briefcase"
        chips={jobs.slice(0, 3).map((job) => job.title)}
      />

      <FeatureSplit
        kicker={t("culture.title")}
        title={t("culture.subtitle")}
        paragraphs={[t("culture.p1"), t("culture.p2"), t("culture.note")]}
        icon="users"
        chips={benefits.slice(0, 3).map((b) => b.title)}
        reverse
      />

      <Section grid title={t("benefits.title")}>
        <CardGrid items={benefits} columns={4} numbered={false} />
        {extras.length > 0 && (
          <div className="mt-10 hairline-card p-8 sm:p-10">
            <h3 className="display-sm text-xl text-flow-text">{t("benefits.extraTitle")}</h3>
            <CheckList items={extras} className="mt-6 sm:grid-cols-2" />
          </div>
        )}
      </Section>

      <Section title={t("testimonials.title")}>
        <TestimonialGrid items={testimonials} />
      </Section>

      <Section id="current-openings" grid title={t("openings.title")}>
        <CardGrid items={jobs} cta={t("openings.apply")} columns={2} numbered={false} />
      </Section>

      <Section title={t("process.title")}>
        <Timeline items={steps.map((step) => ({ title: step.title, body: step.description }))} />
      </Section>

      <ContactCta
        title={t("cta.title")}
        body={t("cta.body")}
        button={t("cta.button")}
        href={`/contact?subject=${encodeURIComponent("Career Inquiry")}`}
      />
    </PageShell>
  )
}
