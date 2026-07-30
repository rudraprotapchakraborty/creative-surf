import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import LegalDocument, { type LegalSection } from "@/components/legal/LegalDocument"
import { getTranslator } from "@/lib/i18n/server"
import { legalTermsMessages } from "@/lib/i18n/messages/legalTerms"
import { commonMessages } from "@/lib/i18n/messages/common"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(legalTermsMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/terms",
  })
}

export default async function TermsPage() {
  const t = await getTranslator(legalTermsMessages)
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
