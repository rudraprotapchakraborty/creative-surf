import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Trophy, Award, Star, Medal } from "lucide-react"
import { getTranslator } from "@/lib/i18n/server"
import { aboutAwardsMessages } from "@/lib/i18n/messages/aboutAwards"
import { commonMessages } from "@/lib/i18n/messages/common"

/** Years and per-award icons stay in code; names and copy are translated. */
const YEAR_META = [
  { year: "2024", icons: [Trophy, Award, Star] },
  { year: "2023", icons: [Medal, Trophy, Star] },
  { year: "2022", icons: [Award, Trophy] },
  { year: "2021", icons: [Trophy] },
]

const CERTIFICATION_LOGOS = [
  "/placeholder.svg?height=100&width=200&text=Google+Partner",
  "/placeholder.svg?height=100&width=200&text=Meta+Business+Partner",
  "/placeholder.svg?height=100&width=200&text=HubSpot+Partner",
  "/placeholder.svg?height=100&width=200&text=Shopify+Partner",
]

const STORY_META = [
  { image: "/placeholder.svg?height=400&width=600&text=E-commerce+Success", href: "/case-studies/stylehouse-boutique" },
  { image: "/placeholder.svg?height=400&width=600&text=SEO+Success", href: "/case-studies/techvision-seo" },
  { image: "/placeholder.svg?height=400&width=600&text=Social+Media+Success", href: "/case-studies/innovate-social" },
]

type AwardCopy = { name: string; organization: string; description: string }

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(aboutAwardsMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about/awards",
  })
}

export default async function AwardsPage() {
  const t = await getTranslator(aboutAwardsMessages)
  const c = await getTranslator(commonMessages)

  const awards = t
    .raw<{ awards: AwardCopy[] }[]>("years", [])
    .map((group, i) => ({
      year: YEAR_META[i]?.year ?? "",
      awards: group.awards.map((award, j) => ({ ...award, icon: YEAR_META[i]?.icons[j] ?? Trophy })),
    }))

  const certifications = t
    .raw<{ name: string; description: string }[]>("certifications", [])
    .map((cert, i) => ({ ...cert, logo: CERTIFICATION_LOGOS[i] }))

  const stories = t
    .raw<{ badge: string; client: string; body: string; imageAlt: string }[]>("stories.items", [])
    .map((story, i) => ({ ...story, ...STORY_META[i] }))

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
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("hero.title")}</h1>
          <p className="text-xl text-flow-textSoft mb-8 max-w-3xl mx-auto">{t("hero.subtitle")}</p>
          <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl max-w-4xl mx-auto">
            <Image
              src="/placeholder.svg?height=600&width=1200&text=Awards+and+Recognition"
              alt={t("hero.imageAlt")}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Awards Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("timelineTitle")}</h2>

          <div className="space-y-16">
            {awards.map((yearGroup) => (
              <div key={yearGroup.year} className="relative">
                <div className="bg-blue-600 text-white text-2xl font-bold rounded-lg p-4 inline-block mb-8">
                  {yearGroup.year}
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {yearGroup.awards.map((award, index) => {
                    const Icon = award.icon
                    return (
                      <div key={index} className="bg-flow-surface rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{award.name}</h3>
                        <p className="text-blue-600 font-medium mb-3">{award.organization}</p>
                        <p className="text-flow-textSoft">{award.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Certifications */}
        <div className="bg-flow-surface rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("certificationsTitle")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center p-4">
                <div className="relative h-24 mb-4">
                  <Image src={cert.logo || "/placeholder.svg"} alt={cert.name} fill className="object-contain" />
                </div>
                <h3 className="font-bold mb-2">{cert.name}</h3>
                <p className="text-sm text-flow-textSoft">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Award Highlight */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">{t("featured.title")}</h2>
              <p className="text-lg mb-6">{t("featured.body")}</p>
              <div className="flex items-center">
                <Trophy className="h-8 w-8 mr-3" />
                <span className="text-xl font-semibold">{t("featured.event")}</span>
              </div>
            </div>
            <div className="relative h-[300px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Award+Ceremony"
                alt={t("featured.imageAlt")}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Client Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("stories.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div key={index} className="bg-flow-surface rounded-xl shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image src={story.image!} alt={story.imageAlt} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Award className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-sm text-blue-600 font-medium">{story.badge}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{story.client}</h3>
                  <p className="text-flow-textSoft mb-4">{story.body}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={story.href!}>{t("stories.viewCaseStudy")}</Link>
                  </Button>
                </div>
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
