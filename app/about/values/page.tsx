import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { aboutValuesMessages } from "@/lib/i18n/messages/aboutValues"
import { commonMessages } from "@/lib/i18n/messages/common"
import { CardGrid, FeatureSplit, PageHero, PageShell, Section, type IconName } from "@/app/components/kit"
import { ContactCta } from "@/app/components/kit-sections"

const VALUE_ICONS: IconName[] = ["heart", "users", "lightbulb", "target", "shield", "globe"]
const COMMUNITY_ICONS: IconName[] = ["book", "globe", "handshake"]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(aboutValuesMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about/values",
  })
}

export default async function ValuesPage() {
  const t = await getTranslator(aboutValuesMessages)
  const c = await getTranslator(commonMessages)

  const coreValues = t
    .raw<{ title: string; description: string }[]>("values", [])
    .map((value, i) => ({ ...value, icon: VALUE_ICONS[i] }))
  const community = t
    .raw<{ title: string; description: string }[]>("community.items", [])
    .map((item, i) => ({ ...item, icon: COMMUNITY_ICONS[i] }))

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
        primary={{ label: t("cta.join"), href: "/about/careers" }}
        secondary={{ label: t("principlesTitle"), href: "#principles" }}
        icon="heart"
        chips={coreValues.slice(0, 3).map((v) => v.title)}
      />

      <Section id="principles" grid title={t("principlesTitle")}>
        <CardGrid items={coreValues} columns={3} />
      </Section>

      <FeatureSplit
        kicker={t("inAction.title")}
        title={t("inAction.subtitle")}
        paragraphs={[t("inAction.body")]}
        points={t.list("inAction.points")}
        icon="handshake"
        reverse
      />

      <Section grid title={t("community.title")}>
        <CardGrid items={community} columns={3} numbered={false} />
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
