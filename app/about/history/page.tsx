import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { getTranslator } from "@/lib/i18n/server"
import { aboutHistoryMessages } from "@/lib/i18n/messages/aboutHistory"
import { commonMessages } from "@/lib/i18n/messages/common"

/** Years and images are fixed; each entry's title and body are translated. */
const TIMELINE_META = [
  { year: "2019", image: "/placeholder.svg?height=400&width=800&text=Founding+Team" },
  { year: "2020", image: "/placeholder.svg?height=400&width=800&text=Growth+Phase" },
  { year: "2021", image: "/placeholder.svg?height=400&width=800&text=Award+Winning" },
  { year: "2022", image: "/placeholder.svg?height=400&width=800&text=National+Expansion" },
  { year: "2023", image: "/placeholder.svg?height=400&width=800&text=International+Growth" },
  { year: "2024", image: "/placeholder.svg?height=400&width=800&text=Present+Day" },
]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(aboutHistoryMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about/history",
  })
}

export default async function HistoryPage() {
  const t = await getTranslator(aboutHistoryMessages)
  const c = await getTranslator(commonMessages)

  const timeline = t
    .raw<{ title: string; body: string; imageAlt: string }[]>("timeline", [])
    .map((entry, i) => ({ ...entry, ...TIMELINE_META[i] }))

  const values = t.raw<{ title: string; body: string }[]>("values", [])

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">{t("hero.title")}</h1>
          <p className="text-xl text-flow-textSoft mb-8 text-center max-w-3xl mx-auto">{t("hero.subtitle")}</p>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=800&width=1600&text=CreativeSurf+History"
              alt={t("hero.imageAlt")}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-flow-surface rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("timelineTitle")}</h2>

          <div className="space-y-16">
            {timeline.map((entry) => (
              <div key={entry.year} className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-1">
                  <div className="bg-blue-600 text-white text-2xl font-bold rounded-lg p-4 text-center">
                    {entry.year}
                  </div>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-2xl font-bold mb-3">{entry.title}</h3>
                  <p className="text-flow-textSoft mb-4">{entry.body}</p>
                  <div className="relative h-[200px] rounded-lg overflow-hidden">
                    <Image src={entry.image!} alt={entry.imageAlt} fill className="object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("valuesTitle")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-flow-surface p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-3 text-blue-600">{value.title}</h3>
                <p className="text-flow-textSoft">{value.body}</p>
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
