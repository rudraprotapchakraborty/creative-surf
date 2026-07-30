import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import { getTranslator } from "@/lib/i18n/server"
import { digitalIntelligenceMessages } from "@/lib/i18n/messages/digitalIntelligence"
import { commonMessages } from "@/lib/i18n/messages/common"

const SERVICE_HREFS = [
  "/digital-marketing/digital-intelligence/web-channel-call-tracking",
  "/digital-marketing/digital-intelligence/seo-reporting",
  "/digital-marketing/digital-intelligence/channel-attribution",
  "/digital-marketing/digital-intelligence/competitor-analysis",
  "/digital-marketing/digital-intelligence/private-equity",
  "/digital-marketing/digital-intelligence/revenue-operations",
]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(digitalIntelligenceMessages)
  return buildMetadata({
    title: t("index.metaTitle"),
    description: t("index.metaDescription"),
    path: "/digital-marketing/digital-intelligence",
  })
}

export default async function DigitalIntelligencePage() {
  const t = await getTranslator(digitalIntelligenceMessages)
  const c = await getTranslator(commonMessages)

  const services = t
    .raw<{ title: string; body: string }[]>("index.services", [])
    .map((service, i) => ({ ...service, href: SERVICE_HREFS[i] ?? "#" }))

  return (
    <div className="bg-flow-bg min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-flow-textSoft mb-8">
          <Link href="/" className="hover:text-blue-600">
            {c("breadcrumb.home")}
          </Link>
          <span className="mx-2">/</span>
          <Link href="/digital-marketing" className="hover:text-blue-600">
            {c("breadcrumb.digitalMarketing")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-flow-textSoft">{t("index.breadcrumbCurrent")}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("index.title")}</h1>
            <p className="text-xl text-flow-textSoft mb-6">{t("index.intro")}</p>
            <div className="space-y-4 mb-8">
              {t.list("index.highlights").map((highlight) => (
                <div key={highlight} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-flow-textSoft">{highlight}</p>
                </div>
              ))}
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">{t("consultation")}</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt={t("index.imageAlt")}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="bg-flow-surface rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">{t("index.servicesTitle")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.href}
                className="p-6 border border-flow-border rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-flow-textSoft">{service.body}</p>
                <Link href={service.href} className="text-blue-600 flex items-center mt-4 hover:underline">
                  {t("learnMore")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">{t("index.ctaTitle")}</h2>
          <p className="text-xl text-flow-textSoft mb-8 max-w-3xl mx-auto">{t("index.ctaBody")}</p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">{t("contactUs")}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
