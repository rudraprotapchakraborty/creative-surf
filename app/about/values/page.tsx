import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Heart, Users, Lightbulb, Target, Shield, Globe } from "lucide-react"
import { getTranslator } from "@/lib/i18n/server"
import { aboutValuesMessages } from "@/lib/i18n/messages/aboutValues"
import { commonMessages } from "@/lib/i18n/messages/common"

/** Icons and swatches stay in code; titles and copy are translated. */
const VALUE_META = [
  { icon: Heart, color: "bg-red-100 text-red-600" },
  { icon: Users, color: "bg-blue-100 text-blue-600" },
  { icon: Lightbulb, color: "bg-yellow-100 text-yellow-600" },
  { icon: Target, color: "bg-green-100 text-green-600" },
  { icon: Shield, color: "bg-purple-100 text-purple-600" },
  { icon: Globe, color: "bg-teal-100 text-teal-600" },
]

const COMMUNITY_IMAGES = [
  "/placeholder.svg?height=400&width=600&text=Education+Initiatives",
  "/placeholder.svg?height=400&width=600&text=Environmental+Efforts",
  "/placeholder.svg?height=400&width=600&text=Nonprofit+Support",
]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(aboutValuesMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about/values",
  })
}

export default async function ValuesPage() {
  const t = await getTranslator(aboutValuesMessages)
  const c = await getTranslator(commonMessages)

  const coreValues = t
    .raw<{ title: string; description: string }[]>("values", [])
    .map((value, i) => ({ ...value, ...VALUE_META[i] }))

  const community = t
    .raw<{ title: string; description: string }[]>("community.items", [])
    .map((item, i) => ({ ...item, image: COMMUNITY_IMAGES[i] }))

  return (
    <div className="bg-flow-bg min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-flow-textSoft mb-8">
          <Link href="/" className="hover:text-blue-600">
            {c("breadcrumb.home")}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/about" className="hover:text-blue-600">
            {c("breadcrumb.about")}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-flow-textSoft font-medium">{t("breadcrumbCurrent")}</span>
        </div>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("hero.title")}</h1>
              <p className="text-xl text-flow-textSoft mb-6">{t("hero.p1")}</p>
              <p className="text-lg text-flow-textSoft mb-8">{t("hero.p2")}</p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=800&width=600&text=Our+Values"
                alt={t("hero.imageAlt")}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("principlesTitle")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon ?? Heart
              return (
                <div key={index} className="bg-flow-surface rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className={`${value.color} p-3 rounded-full w-fit mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-flow-textSoft">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Values in Action */}
        <div className="bg-flow-surface rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("inAction.title")}</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Values+in+Action"
                alt={t("inAction.imageAlt")}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">{t("inAction.subtitle")}</h3>
              <p className="text-flow-textSoft mb-4">{t("inAction.body")}</p>
              <ul className="space-y-3">
                {t.list("inAction.points").map((point) => (
                  <li key={point} className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-2 mt-1">
                      <ChevronRight className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-flow-textSoft">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Community Initiatives */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("community.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {community.map((item, index) => (
              <div key={index} className="bg-flow-surface rounded-xl shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-flow-textSoft mb-4">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">{t("cta.body")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-flow-card">
              <Link href="/contact">{t("cta.contact")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-blue-700">
              <Link href="/about/careers">{t("cta.join")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
