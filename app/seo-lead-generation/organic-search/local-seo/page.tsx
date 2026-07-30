import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, MapPin, Search, Star, TrendingUp, Users, ChevronRight } from "lucide-react"
import { getTranslator } from "@/lib/i18n/server"
import { localSeoMessages } from "@/lib/i18n/messages/localSeo"

const SERVICE_ICONS = [MapPin, Star, Search, Users, TrendingUp, MapPin]

const CASE_STUDY_IMAGES = [
  "/placeholder.svg?height=300&width=500",
  "/placeholder.svg?height=300&width=500",
  "/placeholder.svg?height=300&width=500",
]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(localSeoMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/seo-lead-generation/organic-search/local-seo",
  })
}

export default async function LocalSEOPage() {
  const t = await getTranslator(localSeoMessages)

  const stats = t.raw<{ value: string; label: string }[]>("stats", [])
  const reasons = t.raw<{ title: string; body: string }[]>("what.reasons", [])
  const services = t
    .raw<{ title: string; body: string; points: string[] }[]>("services.items", [])
    .map((service, i) => ({ ...service, icon: SERVICE_ICONS[i] ?? MapPin }))
  const steps = t.raw<{ title: string; body: string }[]>("process.steps", [])
  const tiers = t
    .raw<{ name: string; price: string; audience: string; features: string[] }[]>("pricing.tiers", [])
    .map((tier, i) => ({ ...tier, highlight: i === 1 }))
  const caseStudies = t
    .raw<{ category: string; title: string; body: string; imageAlt: string }[]>("caseStudies.items", [])
    .map((study, i) => ({ ...study, image: CASE_STUDY_IMAGES[i] }))
  const faq = t.raw<{ question: string; answer: string }[]>("faq.items", [])

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#051C2C] to-[#0A2A42] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2 text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t("hero.title")}</h1>
              <p className="text-lg md:text-xl mb-8 text-gray-200">{t("hero.subtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  {t("hero.ctaPrimary")}
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  {t("hero.ctaSecondary")}
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-[280px] md:h-[320px]">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt={t("hero.imageAlt")}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-flow-surface py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.value} className="bg-flow-bg p-6 rounded-lg text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-flow-textSoft">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Local SEO Section */}
      <section className="py-16 bg-flow-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("what.title")}</h2>
            <p className="text-lg text-flow-textSoft max-w-3xl mx-auto">{t("what.body")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="bg-flow-surface p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">{t("what.whyTitle")}</h3>
                <ul className="space-y-4">
                  {reasons.map((reason) => (
                    <li key={reason.title} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">{reason.title}</p>
                        <p className="text-flow-textSoft">{reason.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative h-[350px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt={t("what.imageAlt")}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Local SEO Services */}
      <section className="py-16 bg-flow-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("services.title")}</h2>
            <p className="text-lg text-flow-textSoft max-w-3xl mx-auto">{t("services.intro")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div key={service.title} className="bg-flow-bg p-6 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-flow-textSoft mb-4">{service.body}</p>
                  <ul className="space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-flow-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("process.title")}</h2>
            <p className="text-lg text-flow-textSoft max-w-3xl mx-auto">{t("process.intro")}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-blue-200 transform md:translate-x-[-0.5px]"></div>

              {steps.map((step, index) => {
                const onLeft = index % 2 === 0
                return (
                  <div
                    key={step.title}
                    className={`relative flex flex-col md:flex-row items-center md:items-start ${
                      index < steps.length - 1 ? "mb-12" : ""
                    }`}
                  >
                    {/* Desktop: alternate sides. Mobile: always below the marker. */}
                    {onLeft ? (
                      <>
                        <div className="order-1 w-full md:w-1/2 md:pr-8 text-right hidden md:block">
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-flow-textSoft mb-4">{step.body}</p>
                        </div>
                        <div className="order-2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-4 md:mb-0 md:mx-0 flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="order-3 w-full md:w-1/2 md:pl-8 md:text-left block md:hidden">
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-flow-textSoft mb-4">{step.body}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="order-1 md:order-3 w-full md:w-1/2 md:pl-8">
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-flow-textSoft mb-4">{step.body}</p>
                        </div>
                        <div className="order-2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-4 md:mb-0 md:mx-0 flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="order-3 md:order-1 w-full md:w-1/2 md:pr-8 md:text-right hidden md:block"></div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-flow-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("pricing.title")}</h2>
            <p className="text-lg text-flow-textSoft max-w-3xl mx-auto">{t("pricing.intro")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`border rounded-lg overflow-hidden ${tier.highlight ? "shadow-lg relative" : ""}`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    {t("pricing.mostPopular")}
                  </div>
                )}
                <div className={`${tier.highlight ? "bg-blue-50" : "bg-flow-bg"} p-6 text-center`}>
                  <h3 className="text-xl font-semibold">{tier.name}</h3>
                  <p className="text-3xl font-bold mt-2">
                    {tier.price}
                    <span className="text-sm font-normal text-flow-textSoft">{t("pricing.perMonth")}</span>
                  </p>
                  <p className="text-flow-textSoft mt-2">{tier.audience}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">{t("pricing.getStarted")}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-flow-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("caseStudies.title")}</h2>
            <p className="text-lg text-flow-textSoft max-w-3xl mx-auto">{t("caseStudies.intro")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <div key={study.title} className="bg-flow-surface rounded-lg overflow-hidden shadow-md">
                <div className="relative h-48">
                  <Image src={study.image!} alt={study.imageAlt} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-semibold mb-2">{study.category}</div>
                  <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                  <p className="text-flow-textSoft mb-4">{study.body}</p>
                  <Link href="#" className="text-blue-600 font-medium flex items-center">
                    {t("caseStudies.readMore")}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-flow-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("faq.title")}</h2>
            <p className="text-lg text-flow-textSoft max-w-3xl mx-auto">{t("faq.intro")}</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faq.map((item) => (
              <div key={item.question} className="bg-flow-bg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
                <p className="text-flow-textSoft">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-b from-[#051C2C] to-[#0A2A42] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t("cta.title")}</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">{t("cta.body")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              {t("cta.primary")}
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              {t("cta.secondary")}
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
