import { Suspense } from "react"
import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import ContactContent from "./ContactContent"
import { getTranslator } from "@/lib/i18n/server"
import { contactMessages } from "@/lib/i18n/messages/contact"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(contactMessages)
  return {
    ...buildMetadata({
      title: t("metaTitle"),
      description: t("metaDescription"),
      path: "/contact",
    }),
  }
}

export default function ContactPage() {
  // ContactContent reads the query string (?subject=, ?package=) to pre-fill
  // the enquiry, which needs a Suspense boundary.
  return (
    <Suspense fallback={null}>
      <ContactContent />
    </Suspense>
  )
}
