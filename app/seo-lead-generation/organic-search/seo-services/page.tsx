import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, BarChart2, Search, Settings, FileText } from "lucide-react"
import { getTranslator } from "@/lib/i18n/server"
import { seoServicesMessages } from "@/lib/i18n/messages/seoServices"
import { commonMessages } from "@/lib/i18n/messages/common"

const APPROACH_ICONS = [Search, Settings, FileText, BarChart2]

const BENEFIT_IMAGES = [
  "/placeholder.svg?height=300&width=500&text=Traffic+Growth",
  "/placeholder.svg?height=300&width=500&text=Lead+Quality",
  "/placeholder.svg?height=300&width=500&text=User+Experience",
  "/placeholder.svg?height=300&width=500&text=Long+Term+Growth",
]

/** Package slugs stay in English so the contact deep-links keep working. */
const PACKAGE_SLUGS = ["seo-basic", "seo-professional", "seo-enterprise"]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(seoServicesMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/seo-lead-generation/organic-search/seo-services",
  })
}

export default async function SEOServicesPage() {
  const t = await getTranslator(seoServicesMessages)
  const c = await getTranslator(commonMessages)

  const approach = t
    .raw<{ title: string; body: string }[]>("approach.items", [])
    .map((item, i) => ({ ...item, icon: APPROACH_ICONS[i] ?? Search }))

  const benefits = t
    .raw<{ title: string; body: string }[]>("benefits.items", [])
    .map((item, i) => ({ ...item, image: BENEFIT_IMAGES[i] }))

  const tiers = t
    .raw<{ name: string; audience: string; price: string; features: string[] }[]>("packages.tiers", [])
    .map((tier, i) => ({ ...tier, slug: PACKAGE_SLUGS[i] ?? "", highlight: i === 1 }))

  const faq = t.raw<{ question: string; answer: string }[]>("faq.items", [])

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
          <Link href="/seo-lead-generation/organic-search" className="hover:text-blue-600">
            {c("breadcrumb.organicSearch")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-flow-textSoft">{t("breadcrumbCurrent")}</span>
        </div>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("hero.title")}</h1>
            <p className="text-xl text-flow-textSoft mb-6">{t("hero.intro")}</p>
            <div className="space-y-4 mb-8">
              {t.list("hero.highlights").map((highlight) => (
                <div key={highlight} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-flow-textSoft">{highlight}</p>
                </div>
              ))}
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">{t("hero.cta")}</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=800&width=600&text=SEO+Services"
              alt={t("hero.imageAlt")}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Our Approach Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("approach.title")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approach.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-flow-surface rounded-xl shadow-md p-6">
                  <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-flow-textSoft">{item.body}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("benefits.title")}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-flow-surface rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-flow-textSoft mb-4">{benefit.body}</p>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image src={benefit.image!} alt={benefit.title} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study Section */}
        <div className="bg-flow-surface rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">{t("caseStudy.label")}</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Case+Study"
                alt={t("caseStudy.imageAlt")}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">{t("caseStudy.title")}</h3>
              <p className="text-flow-textSoft mb-4">{t("caseStudy.body")}</p>
              <ul className="space-y-2 mb-4">
                {t.list("caseStudy.results").map((result) => (
                  <li key={result} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                    <p className="text-flow-textSoft">{result}</p>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                <Link href="/case-studies/b2b-software-seo">
                  {t("caseStudy.readFull")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("packages.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.slug}
                className={`bg-flow-surface rounded-xl shadow-md p-6 border-t-4 ${
                  tier.highlight ? "border-blue-600 transform scale-105 relative" : "border-flow-border"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-lg">
                    {t("packages.popular")}
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-flow-textSoft mb-4">{tier.audience}</p>
                <div className="text-3xl font-bold mb-4">
                  {tier.price}
                  <span className="text-lg text-flow-textSoft">{t("packages.perMonth")}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                      <p className="text-flow-textSoft">{feature}</p>
                    </li>
                  ))}
                </ul>
                <Button asChild className={`w-full ${tier.highlight ? "bg-blue-600 hover:bg-blue-700" : ""}`}>
                  <Link href={`/contact?package=${tier.slug}`}>{t("packages.getStarted")}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("faq.title")}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faq.map((item) => (
              <div key={item.question} className="bg-flow-surface rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">{item.question}</h3>
                <p className="text-flow-textSoft">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">{t("cta.body")}</p>
          <Button asChild variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-flow-card">
            <Link href="/contact">{t("cta.button")}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
