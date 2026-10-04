"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useT } from "@/lib/i18n"
import { commonMessages } from "@/lib/i18n/messages/common"

/** One level of the trail. The last one is the page itself and isn't linked. */
export type Crumb = { label: string; href?: string }

const SITE_URL = "https://www.creativesurf.agency"

/**
 * The trail as schema.org BreadcrumbList, which search engines can show in
 * place of a bare URL. Each level carries the absolute URL of its page; the
 * current page, having no link, takes the URL it was rendered at.
 */
export function BreadcrumbJsonLd({ crumbs }: { crumbs: Crumb[] }) {
  const currentPath = usePathname()
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => {
      const href = crumb.href ?? (i === crumbs.length - 1 ? currentPath : undefined)
      return {
        "@type": "ListItem",
        position: i + 1,
        name: crumb.label,
        ...(href ? { item: `${SITE_URL}${href}` } : {}),
      }
    }),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

/**
 * The site breadcrumb, set in the mono label voice of the page datelines it
 * sits in. Starts at Home (or the section's own home, for real estate); each
 * level before the last is a link, and the last is marked as the current page.
 *
 * Pass `structuredData={false}` on pages kept out of search (account, sign-in).
 */
export function Breadcrumbs({
  items,
  root,
  structuredData = true,
  className = "",
}: {
  /** The levels after the root, in order; the last is the current page. */
  items: Crumb[]
  /** Where the trail starts. Defaults to the site home. */
  root?: Crumb
  structuredData?: boolean
  className?: string
}) {
  const t = useT(commonMessages)
  const crumbs: Crumb[] = [root ?? { label: t("breadcrumb.home"), href: "/" }, ...items]

  return (
    <>
      <nav aria-label={t("breadcrumb.label")} className={`min-w-0 ${className}`}>
        <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          {crumbs.map((crumb, i) => {
            const last = i === crumbs.length - 1
            return (
              <li key={`${crumb.label}-${i}`} className="flex min-w-0 items-center gap-2">
                {crumb.href && !last ? (
                  <Link
                    href={crumb.href}
                    className="cs-focus rounded-sm text-cs-ink3 transition-colors duration-200 hover:text-cs-blue"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className="truncate text-cs-ink">
                    {crumb.label}
                  </span>
                )}
                {!last && (
                  <span aria-hidden className="opacity-50">
                    /
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      {structuredData && <BreadcrumbJsonLd crumbs={crumbs} />}
    </>
  )
}
