import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { digitalIntelligenceMessages } from "@/lib/i18n/messages/digitalIntelligence"
import { commonMessages } from "@/lib/i18n/messages/common"
import { kitMessages } from "@/lib/i18n/messages/kit"
import { PageHero, PageShell, Section, Timeline } from "@/app/components/kit"
import { ContactCta, RelatedServices } from "@/app/components/kit-sections"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(digitalIntelligenceMessages)
  return buildMetadata({
    title: t("callTracking.metaTitle"),
    description: t("callTracking.metaDescription"),
    path: "/digital-marketing/digital-intelligence/web-channel-call-tracking",
  })
}

export default async function CallTrackingPage() {
  const t = await getTranslator(digitalIntelligenceMessages)
  const c = await getTranslator(commonMessages)
  const k = await getTranslator(kitMessages)

  const steps = t.raw<{ title: string; body: string }[]>("callTracking.steps", [])
  const highlights = t.list("callTracking.highlights")

  return (
    <PageShell>
      <PageHero
        crumbs={[
          { label: c("breadcrumb.home"), href: "/" },
          { label: c("breadcrumb.digitalMarketing"), href: "/digital-marketing" },
          { label: c("breadcrumb.digitalIntelligence"), href: "/digital-marketing/digital-intelligence" },
          { label: t("callTracking.breadcrumbCurrent") },
        ]}
        kicker={c("breadcrumb.digitalIntelligence")}
        title={t("callTracking.title")}
        subtitle={t("callTracking.intro")}
        highlights={highlights}
        primary={{ label: t("consultation"), href: "/contact" }}
        secondary={{ label: k("explore"), href: "#how" }}
        icon="phone"
        chips={steps.slice(0, 3).map((s) => s.title)}
      />

      <Section id="how" grid title={t("callTracking.howTitle")}>
        <Timeline items={steps.map((step) => ({ title: step.title, body: step.body }))} />
      </Section>

      <RelatedServices slugs={["digital-marketing", "seo", "social-media-management"]} />
      <ContactCta title={t("callTracking.ctaTitle")} body={t("callTracking.ctaBody")} button={t("getStarted")} />
    </PageShell>
  )
}
