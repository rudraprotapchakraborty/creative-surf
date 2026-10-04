"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"

/**
 * The GA4 property, from NEXT_PUBLIC_GA_MEASUREMENT_ID. Without one nothing is
 * loaded at all — the tag used to load against a placeholder ID, costing every
 * visitor ~70 KB of script that reported to no property.
 */
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    const pagePath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    if (window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pagePath,
      })
    }
  }, [pathname, searchParams])

  if (!GA_MEASUREMENT_ID) return null

  // lazyOnload: analytics waits until the page has loaded and gone idle, so it
  // never competes with the page itself for the network or the main thread.
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname + window.location.search,
            });
          `,
        }}
      />
    </>
  )
}
