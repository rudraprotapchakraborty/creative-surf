import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { aboutHistoryMessages } from "@/lib/i18n/messages/aboutHistory"
import { commonMessages } from "@/lib/i18n/messages/common"
import { CardGrid, PageHero, PageShell, Section, Timeline, type IconName } from "@/app/components/kit"
import { ContactCta } from "@/app/components/kit-sections"

/** Years are fixed; each entry's title and body are translated. */
const YEARS = ["2019", "2020", "2021", "2022", "2023", "2024"]
const VALUE_ICONS: IconName[] = ["lightbulb", "handshake", "trending"]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(aboutHistoryMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about/history",
  })
}

export default async function HistoryPage() {
  const t = await getTranslator(aboutHistoryMessages)
  const c = await getTranslator(commonMessages)

  const timeline = t
    .raw<{ title: string; body: string }[]>("timeline", [])
    .map((entry, i) => ({ label: YEARS[i], title: entry.title, body: entry.body }))

  const values = t
    .raw<{ title: string; body: string }[]>("values", [])
    .map((value, i) => ({ title: value.title, description: value.body, icon: VALUE_ICONS[i] }))

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
        primary={{ label: t("cta.join"), href: "/about/careers" }}
        secondary={{ label: t("timelineTitle"), href: "#timeline" }}
      />

      <Section id="timeline" grid title={t("timelineTitle")}>
        <Timeline items={timeline} />
      </Section>

      <Section title={t("valuesTitle")}>
        <CardGrid items={values} columns={3} />
      </Section>

      <ContactCta
        title={t("cta.title")}
        body={t("cta.body")}
        button={t("cta.contact")}
        secondary={{ label: t("cta.join"), href: "/about/careers" }}
      />
    </PageShell>
  )
}
