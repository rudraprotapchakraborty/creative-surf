import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { pageMetaMessages } from "@/lib/i18n/messages/pageMeta"

type PageMetaKey = keyof (typeof pageMetaMessages)["en"]

/**
 * Localised metadata for a route whose page is a client component, read by the
 * route's layout.tsx. `noIndex` keeps account and admin screens out of search.
 */
export async function pageMetadata(
  key: PageMetaKey,
  path: string,
  { noIndex = false }: { noIndex?: boolean } = {}
): Promise<Metadata> {
  const t = await getTranslator(pageMetaMessages)
  const metadata = buildMetadata({
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    path,
  })
  return noIndex ? { ...metadata, robots: { index: false, follow: false } } : metadata
}
