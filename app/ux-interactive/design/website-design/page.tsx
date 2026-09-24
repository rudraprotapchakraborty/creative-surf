import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { designMessages } from "@/lib/i18n/messages/design"
import { commonMessages } from "@/lib/i18n/messages/common"
import { PageHero, PageShell } from "@/app/components/kit"
import { ContactCta, ProcessSection, RelatedServices } from "@/app/components/kit-sections"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(designMessages)
  return buildMetadata({
    title: t("websiteDesign.metaTitle"),
    description: t("websiteDesign.metaDescription"),
    path: "/ux-interactive/design/website-design",
  })
}

export default async function WebsiteDesignPage() {
  const t = await getTranslator(designMessages)
  const c = await getTranslator(commonMessages)
  const highlights = t.list("websiteDesign.highlights")

  return (
    <PageShell>
      <PageHero
        crumbs={[
          { label: c("breadcrumb.home"), href: "/" },
          { label: c("breadcrumb.uxInteractive"), href: "/ux-interactive" },
          { label: c("breadcrumb.design") },
          { label: t("websiteDesign.breadcrumbCurrent") },
        ]}
        kicker={c("breadcrumb.design")}
        title={t("websiteDesign.title")}
        subtitle={t("websiteDesign.intro")}
        highlights={highlights}
        primary={{ label: t("websiteDesign.cta"), href: "/contact" }}
        secondary={{ label: c("breadcrumb.services"), href: "/services/web-design-development" }}
        icon="monitor"
        chips={["UX / UI", "Next.js", "E-commerce"]}
      />

      <ProcessSection />
      <RelatedServices slugs={["web-design-development", "brand-strategy", "seo"]} />
      <ContactCta button={t("websiteDesign.cta")} />
    </PageShell>
  )
}
