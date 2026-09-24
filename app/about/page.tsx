import type { Metadata } from "next"
import { getTranslator } from "@/lib/i18n/server"
import { aboutMessages } from "@/lib/i18n/messages/about"
import { aboutApproachMessages } from "@/lib/i18n/messages/aboutApproach"
import { aboutHistoryMessages } from "@/lib/i18n/messages/aboutHistory"
import { aboutValuesMessages } from "@/lib/i18n/messages/aboutValues"
import { aboutAwardsMessages } from "@/lib/i18n/messages/aboutAwards"
import { aboutCareersMessages } from "@/lib/i18n/messages/aboutCareers"
import { aboutReviewsMessages } from "@/lib/i18n/messages/aboutReviews"
import { commonMessages } from "@/lib/i18n/messages/common"
import { kitMessages } from "@/lib/i18n/messages/kit"
import { teamMessages } from "@/lib/i18n/messages/team"
import { TEAM } from "@/app/team/members"
import {
  CardGrid,
  FeatureSplit,
  PageHero,
  PageShell,
  PeopleStrip,
  Section,
  type IconName,
} from "@/app/components/kit"
import { ContactCta } from "@/app/components/kit-sections"

const VALUE_ICONS: IconName[] = ["lightbulb", "handshake", "star", "heart", "trending", "target"]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(aboutMessages)
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default async function AboutPage() {
  const t = await getTranslator(aboutMessages)
  const c = await getTranslator(commonMessages)
  const k = await getTranslator(kitMessages)
  const tm = await getTranslator(teamMessages)

  const values = t
    .raw<{ title: string; description: string }[]>("values.items", [])
    .map((value, i) => ({ ...value, icon: VALUE_ICONS[i] }))

  // The real team, shared with /team — never stand-in names.
  const people = TEAM.map((member) => ({
    name: member.name,
    role: tm(member.roleKey),
    photo: member.photo,
    initials: member.initials,
    accent: member.accent,
  }))

  // Each About sub-page, introduced by its own translated heading.
  const [approach, history, valuesPage, awards, careers, reviews] = await Promise.all([
    getTranslator(aboutApproachMessages),
    getTranslator(aboutHistoryMessages),
    getTranslator(aboutValuesMessages),
    getTranslator(aboutAwardsMessages),
    getTranslator(aboutCareersMessages),
    getTranslator(aboutReviewsMessages),
  ])
  const subPages = [
    { title: approach("hero.title"), description: approach("hero.subtitle"), href: "/about/approach", icon: "compass" as IconName },
    { title: history("hero.title"), description: history("hero.subtitle"), href: "/about/history", icon: "book" as IconName },
    { title: valuesPage("hero.title"), description: valuesPage("hero.p1"), href: "/about/values", icon: "heart" as IconName },
    { title: awards("hero.title"), description: awards("hero.subtitle"), href: "/about/awards", icon: "trophy" as IconName },
    { title: careers("hero.title"), description: careers("hero.p1"), href: "/about/careers", icon: "briefcase" as IconName },
    { title: reviews("hero.title"), description: reviews("hero.subtitle"), href: "/about/reviews", icon: "star" as IconName },
  ]

  return (
    <PageShell>
      <PageHero
        crumbs={[{ label: c("breadcrumb.home"), href: "/" }, { label: c("breadcrumb.about") }]}
        kicker={c("breadcrumb.about")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        primary={{ label: t("cta.button"), href: "/contact" }}
        secondary={{ label: t("story.title"), href: "#story" }}
      />

      <FeatureSplit
        id="story"
        kicker={c("breadcrumb.about")}
        title={t("story.title")}
        paragraphs={[t("story.p1"), t("story.p2"), t("story.p3")]}
        icon="heart"
        chips={values.slice(0, 3).map((v) => v.title)}
      />

      <Section grid kicker={k("highlightsKicker")} title={t("values.title")}>
        <CardGrid items={values} columns={3} />
      </Section>

      <Section kicker={tm("hero.eyebrow")} title={tm("hero.title")} subline={tm("hero.subtitle")}>
        <PeopleStrip people={people} action={{ label: tm("hero.title"), href: "/team" }} />
      </Section>

      <Section grid kicker={k("explore")} title={c("breadcrumb.about")}>
        <CardGrid items={subPages} cta={k("learnMore")} columns={3} compact />
      </Section>

      <ContactCta title={t("cta.title")} body={t("cta.body")} button={t("cta.button")} />
    </PageShell>
  )
}
