import type { Metadata } from "next"
import AboutContent from "./AboutContent"
import { getTranslator } from "@/lib/i18n/server"
import { aboutMessages } from "@/lib/i18n/messages/about"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(aboutMessages)
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default function AboutPage() {
  return <AboutContent />
}
