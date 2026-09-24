import type { Metadata } from "next"
import ServicesContent from "./ServicesContent"
import { getTranslator } from "@/lib/i18n/server"
import { servicesMessages } from "@/lib/i18n/messages/services"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(servicesMessages)
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default function ServicesPage() {
  return <ServicesContent />
}
