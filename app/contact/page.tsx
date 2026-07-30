import type { Metadata } from "next"
import ContactContent from "./ContactContent"
import { getTranslator } from "@/lib/i18n/server"
import { contactMessages } from "@/lib/i18n/messages/contact"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(contactMessages)
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default function ContactPage() {
  return <ContactContent />
}
