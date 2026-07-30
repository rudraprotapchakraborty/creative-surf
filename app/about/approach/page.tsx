import { Suspense } from "react"
import type { Metadata } from "next"
import ApproachPage from "./ApproachPage"
import { getTranslator } from "@/lib/i18n/server"
import { aboutApproachMessages } from "@/lib/i18n/messages/aboutApproach"
import { commonMessages } from "@/lib/i18n/messages/common"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(aboutApproachMessages)
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default async function ParentPage() {
  const c = await getTranslator(commonMessages)

  return (
    <Suspense fallback={<div className="text-center py-10">{c("labels.loading")}</div>}>
      <ApproachPage />
    </Suspense>
  )
}
