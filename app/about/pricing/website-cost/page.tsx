import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { websiteCostMessages } from "@/lib/i18n/messages/websiteCost"
import { commonMessages } from "@/lib/i18n/messages/common"
import { CardGrid, PageHero, PageShell, Section, type IconName } from "@/app/components/kit"
import { ContactCta, RelatedServices } from "@/app/components/kit-sections"

const TIER_ICONS: IconName[] = ["monitor", "briefcase", "cart", "code"]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(websiteCostMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about/pricing/website-cost",
  })
}

export default async function WebsiteCostPage() {
  const t = await getTranslator(websiteCostMessages)
  const c = await getTranslator(commonMessages)

  // Labels are written as "Basic informational website:" for the old inline
  // list; as card titles the trailing colon goes.
  const tiers = t
    .raw<{ label: string; range: string }[]>("tiers", [])
    .map((tier, i) => ({
      title: tier.label.replace(/[:：]\s*$/, ""),
      stat: { value: tier.range },
      icon: TIER_ICONS[i],
    }))

  return (
    <PageShell>
      <PageHero
        crumbs={[
          { label: c("breadcrumb.home"), href: "/" },
          { label: c("breadcrumb.about"), href: "/about" },
          { label: t("breadcrumb.pricingGuides") },
          { label: t("breadcrumb.current") },
        ]}
        kicker={t("breadcrumb.pricingGuides")}
        title={t("title")}
        subtitle={t("subtitle")}
        primary={{ label: t("cta.button"), href: "/contact" }}
        secondary={{ label: t("typeTitle"), href: "#pricing" }}
      />

      <Section id="pricing" grid kicker={t("factorsTitle")} title={t("typeTitle")} subline={`${t("factorsBody")} ${t("typeIntro")}`}>
        <CardGrid items={tiers} columns={4} />
      </Section>

      <RelatedServices slugs={["web-design-development", "brand-strategy", "seo"]} />
      <ContactCta title={t("cta.title")} body={t("cta.body")} button={t("cta.button")} />
    </PageShell>
  )
}
