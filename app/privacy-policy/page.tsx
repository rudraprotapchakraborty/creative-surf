import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import LegalDocument, { type LegalSection } from "@/components/legal/LegalDocument"
import { getTranslator } from "@/lib/i18n/server"
import { legalPrivacyMessages } from "@/lib/i18n/messages/legalPrivacy"
import { commonMessages } from "@/lib/i18n/messages/common"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(legalPrivacyMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/privacy-policy",
  })
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslator(legalPrivacyMessages)
  const c = await getTranslator(commonMessages)

  return (
    <LegalDocument
      breadcrumbHome={c("breadcrumb.home")}
      breadcrumbCurrent={t("breadcrumbCurrent")}
      title={t("title")}
      lastUpdatedLabel={t("lastUpdated")}
      sections={t.raw<LegalSection[]>("sections", [])}
    />
  )
}
