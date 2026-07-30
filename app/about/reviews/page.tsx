import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Star, Quote } from "lucide-react"
import { getTranslator } from "@/lib/i18n/server"
import { aboutReviewsMessages } from "@/lib/i18n/messages/aboutReviews"
import { commonMessages } from "@/lib/i18n/messages/common"

/** Reviewer identities and scores are facts; role, date and quote are translated. */
const REVIEW_META = [
  { name: "Sarah Johnson", company: "TechVision Inc.", rating: 5 },
  { name: "Michael Chen", company: "Innovate Solutions", rating: 5 },
  { name: "Emily Rodriguez", company: "StyleHouse Boutique", rating: 5 },
  { name: "David Wilson", company: "Global Logistics Partners", rating: 4 },
  { name: "Jennifer Lee", company: "HealthTech Solutions", rating: 5 },
  { name: "Robert Martinez", company: "Artisan Crafts Co.", rating: 5 },
]

const AVATAR = "/placeholder.svg?height=100&width=100"

const RECOGNITION_IMAGES = [
  "/placeholder.svg?height=100&width=200&text=Award+1",
  "/placeholder.svg?height=100&width=200&text=Award+2",
  "/placeholder.svg?height=100&width=200&text=Award+3",
  "/placeholder.svg?height=100&width=200&text=Award+4",
]

const PLATFORMS = [
  { name: "Google", logo: "/placeholder.svg?height=60&width=200&text=Google+Reviews", href: "https://google.com", rating: "4.9", count: 87, stars: 5 },
  { name: "Clutch", logo: "/placeholder.svg?height=60&width=200&text=Clutch", href: "https://clutch.co", rating: "4.8", count: 42, stars: 5 },
  { name: "Trustpilot", logo: "/placeholder.svg?height=60&width=200&text=Trustpilot", href: "https://trustpilot.com", rating: "4.7", count: 63, stars: 4 },
]

const averageRating = REVIEW_META.reduce((acc, review) => acc + review.rating, 0) / REVIEW_META.length

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(aboutReviewsMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about/reviews",
  })
}

export default async function ReviewsPage() {
  const t = await getTranslator(aboutReviewsMessages)
  const c = await getTranslator(commonMessages)

  const clientReviews = t
    .raw<{ position: string; date: string; text: string }[]>("reviews", [])
    .map((review, i) => ({ ...review, ...REVIEW_META[i], avatar: AVATAR }))

  const recognition = t
    .raw<{ name: string; event: string; imageAlt: string }[]>("recognition.items", [])
    .map((item, i) => ({ ...item, image: RECOGNITION_IMAGES[i] }))

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

          {/* Rating Summary */}
          <div className="bg-flow-surface rounded-xl shadow-md p-8 max-w-md mx-auto">
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-8 w-8 ${i < Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <div className="text-3xl font-bold text-center mb-2">
              {t("hero.outOfFive", { rating: averageRating.toFixed(1) })}
            </div>
            <p className="text-flow-textSoft text-center">
              {t("hero.basedOn", { count: clientReviews.length })}
            </p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {clientReviews.map((review, index) => (
            <div key={index} className="bg-flow-surface rounded-xl shadow-md p-6 relative">
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6 bg-blue-600 text-white p-3 rounded-full shadow-lg">
                <Quote className="h-5 w-5" />
              </div>

              {/* Rating */}
              <div className="flex mb-4 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < (review.rating ?? 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-flow-textSoft italic mb-6">"{review.text}"</p>

              {/* Reviewer Info */}
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src={review.avatar} alt={review.name ?? ""} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold">{review.name}</h3>
                  <p className="text-sm text-flow-textSoft">
                    {review.position}, {review.company}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="text-xs text-flow-textSoft mt-4 text-right">{review.date}</div>
            </div>
          ))}
        </div>

        {/* Industry Recognition */}
        <div className="bg-flow-surface rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("recognition.title")}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {recognition.map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative h-24 mb-4">
                  <Image src={item.image!} alt={item.imageAlt} fill className="object-contain" />
                </div>
                <h3 className="font-bold mb-1">{item.name}</h3>
                <p className="text-sm text-flow-textSoft">{item.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Review Platforms */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("platforms.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {PLATFORMS.map((platform) => (
              <div key={platform.name} className="bg-flow-surface p-6 rounded-xl shadow-md text-center">
                <div className="relative h-16 mb-4">
                  <Image src={platform.logo} alt={platform.name} fill className="object-contain" />
                </div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < platform.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-flow-textSoft mb-4">
                  {t("platforms.summary", { rating: platform.rating, count: platform.count })}
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={platform.href} target="_blank" rel="noopener noreferrer">
                    {t("platforms.readOn", { platform: platform.name })}
                  </Link>
                </Button>
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
