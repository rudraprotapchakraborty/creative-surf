import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getTranslator } from "@/lib/i18n/server"
import { serviceHubsMessages } from "@/lib/i18n/messages/serviceHubs"

const CARD_HREFS = [
  "/ux-interactive/design",
  "/ux-interactive/content-marketing",
  "/ux-interactive/development",
  "/ux-interactive/challenges",
]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(serviceHubsMessages)
  return buildMetadata({
    title: t("ux.metaTitle"),
    description: t("ux.metaDescription"),
    path: "/ux-interactive",
  })
}

export default async function UXInteractivePage() {
  const t = await getTranslator(serviceHubsMessages)

  const cards = t
    .raw<{ title: string; body: string }[]>("ux.cards", [])
    .map((card, i) => ({ ...card, href: CARD_HREFS[i] ?? "#" }))

  return (
    <div className="bg-flow-bg min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">{t("ux.title")}</h1>
        <p className="text-xl text-flow-textSoft mb-12 text-center max-w-3xl mx-auto">{t("ux.subtitle")}</p>

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

        <div className="text-center">
          <p className="text-flow-textSoft mb-6">{t("ux.closing")}</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">{t("ux.ctaButton")}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
