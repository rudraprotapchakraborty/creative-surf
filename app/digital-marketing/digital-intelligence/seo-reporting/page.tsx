import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, BarChart2, LineChart, TrendingUp, PieChart } from "lucide-react"
import { getTranslator } from "@/lib/i18n/server"
import { digitalIntelligenceMessages } from "@/lib/i18n/messages/digitalIntelligence"
import { commonMessages } from "@/lib/i18n/messages/common"

const FEATURE_ICONS = [BarChart2, LineChart, TrendingUp, PieChart]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(digitalIntelligenceMessages)
  return buildMetadata({
    title: t("seoReporting.metaTitle"),
    description: t("seoReporting.metaDescription"),
    path: "/digital-marketing/digital-intelligence/seo-reporting",
  })
}

export default async function SEOReportingPage() {
  const t = await getTranslator(digitalIntelligenceMessages)
  const c = await getTranslator(commonMessages)

  const features = t
    .raw<{ title: string; body: string }[]>("seoReporting.features", [])
    .map((feature, i) => ({ ...feature, icon: FEATURE_ICONS[i] ?? BarChart2 }))

  const steps = t.raw<{ title: string; body: string }[]>("seoReporting.steps", [])

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
          <span className="text-flow-textSoft">{t("seoReporting.breadcrumbCurrent")}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("seoReporting.title")}</h1>
            <p className="text-xl text-flow-textSoft mb-6">{t("seoReporting.intro")}</p>
            <div className="space-y-4 mb-8">
              {t.list("seoReporting.highlights").map((highlight) => (
                <div key={highlight} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-flow-textSoft">{highlight}</p>
                </div>
              ))}
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">{t("seoReporting.requestDemo")}</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=800&width=600&text=SEO+Reporting"
              alt={t("seoReporting.imageAlt")}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-flow-surface rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("seoReporting.featuresTitle")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="text-center p-6 border border-flow-border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-flow-textSoft">{feature.body}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("seoReporting.howTitle")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="bg-flow-surface p-6 rounded-xl shadow-md">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-flow-textSoft">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study Section */}
        <div className="bg-flow-surface rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">{t("seoReporting.caseStudy.label")}</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Case+Study"
                alt={t("seoReporting.caseStudy.imageAlt")}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">{t("seoReporting.caseStudy.title")}</h3>
              <p className="text-flow-textSoft mb-4">{t("seoReporting.caseStudy.body")}</p>
              <ul className="space-y-2 mb-4">
                {t.list("seoReporting.caseStudy.results").map((result) => (
                  <li key={result} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                    <p className="text-flow-textSoft">{result}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">{t("seoReporting.ctaTitle")}</h2>
          <p className="text-xl text-flow-textSoft mb-8 max-w-3xl mx-auto">{t("seoReporting.ctaBody")}</p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">{t("seoReporting.ctaButton")}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
