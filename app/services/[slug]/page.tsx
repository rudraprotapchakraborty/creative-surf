import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ServiceDetail from "./ServiceDetail"
import { SERVICES, serviceIndex } from "../catalog"
import { getTranslator } from "@/lib/i18n/server"
import { servicesMessages } from "@/lib/i18n/messages/services"
import { serviceDetailsMessages } from "@/lib/i18n/messages/serviceDetails"

type Props = { params: Promise<{ slug: string }> }

// Only the six catalogued services exist; anything else is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return SERVICES.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const index = serviceIndex(slug)
  if (index < 0) return {}

  const t = await getTranslator(servicesMessages)
  const td = await getTranslator(serviceDetailsMessages)
  return {
    title: `${t(`items.${index}.title`)} | Creative Surf`,
    description: td(`services.${slug}.intro`),
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  if (serviceIndex(slug) < 0) notFound()
  return <ServiceDetail slug={slug} />
}
