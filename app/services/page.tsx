import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import ServicesContent from "./ServicesContent"
import { getTranslator } from "@/lib/i18n/server"
import { servicesMessages } from "@/lib/i18n/messages/services"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(servicesMessages)
  return {
    ...buildMetadata({
      title: t("metaTitle"),
      description: t("metaDescription"),
      path: "/services",
    }),
  }
}

export default function ServicesPage() {
  return <ServicesContent />
}
