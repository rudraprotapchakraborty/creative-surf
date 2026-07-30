import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import { getTranslator } from "@/lib/i18n/server"
import { serviceCategoriesMessages } from "@/lib/i18n/messages/serviceCategories"
import { commonMessages } from "@/lib/i18n/messages/common"

const SERVICE_HREFS = [
  "/seo-lead-generation/digital-advertising/ppc-management",
  "/seo-lead-generation/digital-advertising/enterprise-ppc",
  "/seo-lead-generation/digital-advertising/social-media-advertising",
  "/seo-lead-generation/digital-advertising/enterprise-social-media",
  "/seo-lead-generation/digital-advertising/programmatic-advertising",
  "/seo-lead-generation/digital-advertising/geofencing",
]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(serviceCategoriesMessages)
  return buildMetadata({
    title: t("digitalAdvertising.metaTitle"),
    description: t("digitalAdvertising.metaDescription"),
    path: "/seo-lead-generation/digital-advertising",
  })
}

export default async function DigitalAdvertisingPage() {
  const t = await getTranslator(serviceCategoriesMessages)
  const c = await getTranslator(commonMessages)

  const services = t
    .raw<{ title: string; body: string }[]>("digitalAdvertising.services", [])
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
          <Link href="/seo-lead-generation" className="hover:text-blue-600">
            {c("breadcrumb.seoLeadGen")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-flow-textSoft">{t("digitalAdvertising.breadcrumbCurrent")}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("digitalAdvertising.title")}</h1>
            <p className="text-xl text-flow-textSoft mb-6">{t("digitalAdvertising.intro")}</p>
            <div className="space-y-4 mb-8">
              {t.list("digitalAdvertising.highlights").map((highlight) => (
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
              src="/placeholder.svg?height=800&width=600&text=Digital+Advertising"
              alt={t("digitalAdvertising.imageAlt")}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("digitalAdvertising.servicesTitle")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link key={service.href} href={service.href} className="group">
                <div className="bg-flow-surface rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">{service.title}</h3>
                  <p className="text-flow-textSoft mb-4">{service.body}</p>
                  <div className="text-blue-600 flex items-center group-hover:underline">
                    {t("learnMore")} <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("digitalAdvertising.ctaTitle")}</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">{t("digitalAdvertising.ctaBody")}</p>
          <Button asChild variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-flow-card">
            <Link href="/contact">{t("getStarted")}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
