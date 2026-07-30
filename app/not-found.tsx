import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { notFoundMessages } from "@/lib/i18n/messages/notFound"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(notFoundMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/404",
  })
}

export default async function NotFound() {
  const t = await getTranslator(notFoundMessages)

  return (
    <div className="flex items-center justify-center min-h-screen bg-flow-card">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-flow-text mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-flow-textSoft mb-6">{t("heading")}</h2>
        <p className="text-xl text-flow-textSoft mb-8">{t("body")}</p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/">{t("cta")}</Link>
        </Button>
      </div>
    </div>
  )
}
