import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import LegalDocument, { type LegalSection } from "@/components/legal/LegalDocument"
import { getTranslator } from "@/lib/i18n/server"
import { legalPrivacyTermsMessages } from "@/lib/i18n/messages/legalPrivacyTerms"
import { commonMessages } from "@/lib/i18n/messages/common"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(legalPrivacyTermsMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/privacy-terms",
  })
}

export default async function PrivacyTermsPage() {
  const t = await getTranslator(legalPrivacyTermsMessages)
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
