import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { websiteCostMessages } from "@/lib/i18n/messages/websiteCost"
import { commonMessages } from "@/lib/i18n/messages/common"

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

  const tiers = t.raw<{ label: string; range: string }[]>("tiers", [])

  return (
    <div className="bg-flow-bg min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-flow-textSoft mb-8 flex-wrap">
          <Link href="/" className="hover:text-blue-600">
            {c("breadcrumb.home")}
          </Link>
          <span className="mx-2">/</span>
          <Link href="/about" className="hover:text-blue-600">
            {c("breadcrumb.about")}
          </Link>
          <span className="mx-2">/</span>
          <Link href="/about/pricing" className="hover:text-blue-600">
            {t("breadcrumb.pricingGuides")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-flow-textSoft">{t("breadcrumb.current")}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">{t("title")}</h1>
        <p className="text-xl text-flow-textSoft mb-12 text-center max-w-3xl mx-auto">{t("subtitle")}</p>

        <div className="bg-flow-surface rounded-xl shadow-md p-8 mb-16">
          <div className="prose max-w-none">
            <h2>{t("factorsTitle")}</h2>
            <p>{t("factorsBody")}</p>

            <h3>{t("typeTitle")}</h3>
            <p>{t("typeIntro")}</p>
            <ul>
              {tiers.map((tier) => (
                <li key={tier.label}>
                  <strong>{tier.label}</strong> {tier.range}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">{t("cta.title")}</h2>
          <p className="text-xl text-flow-textSoft mb-8 max-w-3xl mx-auto">{t("cta.body")}</p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">{t("cta.button")}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
