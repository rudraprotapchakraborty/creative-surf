import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getTranslator } from "@/lib/i18n/server"
import { serviceHubsMessages } from "@/lib/i18n/messages/serviceHubs"

const CARD_HREFS = [
  "/seo-lead-generation/organic-search",
  "/seo-lead-generation/digital-advertising",
  "/seo-lead-generation/ecommerce",
  "/seo-lead-generation/learn",
]

const FEATURED_META = [
  {
    href: "/seo-lead-generation/organic-search/seo-services",
    image: "/placeholder.svg?height=400&width=600&text=SEO+Services",
  },
  {
    href: "/seo-lead-generation/digital-advertising/ppc-management",
    image: "/placeholder.svg?height=400&width=600&text=PPC+Management",
  },
  {
    href: "/seo-lead-generation/ecommerce/ecommerce-seo",
    image: "/placeholder.svg?height=400&width=600&text=Ecommerce+SEO",
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(serviceHubsMessages)
  return buildMetadata({
    title: t("seo.metaTitle"),
    description: t("seo.metaDescription"),
    path: "/seo-lead-generation",
  })
}

export default async function SEOLeadGenerationPage() {
  const t = await getTranslator(serviceHubsMessages)

  const cards = t
    .raw<{ title: string; body: string }[]>("seo.cards", [])
    .map((card, i) => ({ ...card, href: CARD_HREFS[i] ?? "#" }))

  const featured = t
    .raw<{ title: string; body: string; imageAlt: string }[]>("seo.featured", [])
    .map((item, i) => ({ ...item, ...FEATURED_META[i] }))

  return (
    <div className="bg-flow-bg min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">{t("seo.title")}</h1>
        <p className="text-xl text-flow-textSoft mb-12 text-center max-w-3xl mx-auto">{t("seo.subtitle")}</p>

        {/* Main Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="group">
              <div className="bg-flow-surface rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600">{card.title}</h2>
                <p className="text-flow-textSoft mb-4">{card.body}</p>
                <Button variant="link" className="p-0 group-hover:text-blue-600">
                  {t("learnMore")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("seo.featuredTitle")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featured.map((item) => (
              <div key={item.title} className="bg-flow-surface rounded-xl shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image src={item.image!} alt={item.imageAlt} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-flow-textSoft mb-4">{item.body}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={item.href!}>{t("learnMore")}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("seo.ctaTitle")}</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">{t("seo.ctaBody")}</p>
          <Button asChild variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-flow-card">
            <Link href="/contact">{t("seo.ctaButton")}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
