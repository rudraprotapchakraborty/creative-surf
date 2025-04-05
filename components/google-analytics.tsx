"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX" // Replace with your actual Measurement ID

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const pagePath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    if (window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pagePath,
      })
    }
  }, [pathname, searchParams])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
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
