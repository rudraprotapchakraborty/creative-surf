import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { aboutAwardsMessages } from "@/lib/i18n/messages/aboutAwards"
import { commonMessages } from "@/lib/i18n/messages/common"
import { liveHref } from "@/lib/routes"
import { CardGrid, FeatureSplit, PageHero, PageShell, Section, type IconName } from "@/app/components/kit"
import { ContactCta } from "@/app/components/kit-sections"

/** Years and per-award icons stay in code; names and copy are translated. */
const YEAR_META: { year: string; icons: IconName[] }[] = [
  { year: "2024", icons: ["trophy", "award", "star"] },
  { year: "2023", icons: ["award", "trophy", "star"] },
  { year: "2022", icons: ["award", "trophy"] },
  { year: "2021", icons: ["trophy"] },
]

const STORY_HREFS = [
  "/case-studies/stylehouse-boutique",
  "/case-studies/techvision-seo",
  "/case-studies/innovate-social",
]

type AwardCopy = { name: string; organization: string; description: string }

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(aboutAwardsMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about/awards",
  })
}

export default async function AwardsPage() {
  const t = await getTranslator(aboutAwardsMessages)
  const c = await getTranslator(commonMessages)

  const years = t
    .raw<{ awards: AwardCopy[] }[]>("years", [])
    .map((group, i) => ({
      year: YEAR_META[i]?.year ?? "",
      awards: group.awards.map((award, j) => ({
        title: award.name,
        eyebrow: award.organization,
        description: award.description,
        icon: YEAR_META[i]?.icons[j] ?? ("trophy" as IconName),
      })),
    }))

  const certifications = t
    .raw<{ name: string; description: string }[]>("certifications", [])
    .map((cert) => ({ title: cert.name, description: cert.description, icon: "shield" as IconName }))

  const stories = t
    .raw<{ badge: string; client: string; body: string }[]>("stories.items", [])
    .map((story, i) => ({
      title: story.client,
      eyebrow: story.badge,
      description: story.body,
      href: liveHref(STORY_HREFS[i]),
    }))

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
        subtitle={t("hero.subtitle")}
        primary={{ label: t("cta.button"), href: "/contact" }}
        secondary={{ label: t("timelineTitle"), href: "#awards" }}
        icon="trophy"
        chips={years.flatMap((y) => y.awards).slice(0, 3).map((a) => a.title)}
      />

      <Section id="awards" grid title={t("timelineTitle")}>
        <div className="space-y-16">
          {years.map((group) => (
            <div key={group.year} className="grid gap-8 lg:grid-cols-[10rem_1fr] lg:gap-12">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <span className="display tabular-nums text-aurora" style={{ fontSize: "clamp(2.8rem, 5vw, 4rem)" }}>
                  {group.year}
                </span>
                <span className="mt-3 block h-px w-16 bg-aurora-grad" />
              </div>
              <CardGrid items={group.awards} columns={group.awards.length >= 3 ? 3 : 2} numbered={false} compact />
            </div>
          ))}
        </div>
      </Section>

      <Section title={t("certificationsTitle")}>
        <CardGrid items={certifications} columns={4} numbered={false} compact />
      </Section>

      <FeatureSplit
        kicker={t("featured.event")}
        title={t("featured.title")}
        paragraphs={[t("featured.body")]}
        icon="award"
        reverse
      />

      <Section grid title={t("stories.title")}>
        <CardGrid items={stories} cta={t("stories.viewCaseStudy")} columns={3} numbered={false} />
      </Section>

      <ContactCta title={t("cta.title")} body={t("cta.body")} button={t("cta.button")} />
    </PageShell>
  )
}
