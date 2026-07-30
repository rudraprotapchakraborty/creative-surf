import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { getTranslator } from "@/lib/i18n/server"
import { digitalIntelligenceMessages } from "@/lib/i18n/messages/digitalIntelligence"
import { commonMessages } from "@/lib/i18n/messages/common"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(digitalIntelligenceMessages)
  return buildMetadata({
    title: t("callTracking.metaTitle"),
    description: t("callTracking.metaDescription"),
    path: "/digital-marketing/digital-intelligence/web-channel-call-tracking",
  })
}

export default async function WebChannelCallTrackingPage() {
  const t = await getTranslator(digitalIntelligenceMessages)
  const c = await getTranslator(commonMessages)

  const steps = t.raw<{ title: string; body: string }[]>("callTracking.steps", [])

  return (
    <div className="bg-flow-bg min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-flow-textSoft mb-8 flex-wrap">
          <Link href="/" className="hover:text-blue-600">
            {c("breadcrumb.home")}
          </Link>
          <span className="mx-2">/</span>
          <Link href="/digital-marketing" className="hover:text-blue-600">
            {c("breadcrumb.digitalMarketing")}
          </Link>
          <span className="mx-2">/</span>
          <Link href="/digital-marketing/digital-intelligence" className="hover:text-blue-600">
            {c("breadcrumb.digitalIntelligence")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-flow-textSoft">{t("callTracking.breadcrumbCurrent")}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("callTracking.title")}</h1>
            <p className="text-xl text-flow-textSoft mb-6">{t("callTracking.intro")}</p>
            <div className="space-y-4 mb-8">
              {t.list("callTracking.highlights").map((highlight) => (
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
              src="/placeholder.svg?height=800&width=600&text=Call+Tracking"
              alt={t("callTracking.imageAlt")}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="bg-flow-surface rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">{t("callTracking.howTitle")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center p-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-flow-textSoft">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">{t("callTracking.ctaTitle")}</h2>
          <p className="text-xl text-flow-textSoft mb-8 max-w-3xl mx-auto">{t("callTracking.ctaBody")}</p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">{t("getStarted")}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
