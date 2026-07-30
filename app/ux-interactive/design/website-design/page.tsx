import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { designMessages } from "@/lib/i18n/messages/design"
import { commonMessages } from "@/lib/i18n/messages/common"

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

  return (
    <div className="bg-flow-bg min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-flow-textSoft mb-8 flex-wrap">
          <Link href="/" className="hover:text-blue-600">
            {c("breadcrumb.home")}
          </Link>
          <span className="mx-2">/</span>
          <Link href="/ux-interactive" className="hover:text-blue-600">
            {c("breadcrumb.uxInteractive")}
          </Link>
          <span className="mx-2">/</span>
          <Link href="/ux-interactive/design" className="hover:text-blue-600">
            {c("breadcrumb.design")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-flow-textSoft">{t("websiteDesign.breadcrumbCurrent")}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("websiteDesign.title")}</h1>
            <p className="text-xl text-flow-textSoft mb-6">{t("websiteDesign.intro")}</p>
            <div className="space-y-4 mb-8">
              {t.list("websiteDesign.highlights").map((highlight) => (
                <div key={highlight} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-flow-textSoft">{highlight}</p>
                </div>
              ))}
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">{t("websiteDesign.cta")}</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=800&width=600&text=Website+Design"
              alt={t("websiteDesign.imageAlt")}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
