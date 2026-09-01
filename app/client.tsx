import "./globals.css"
import { Navbar } from "@/components/navbar"
import { ConditionalFooter } from "@/components/ConditionalFooter"
import { LoadingBarProvider } from "@/components/LoadingBarContext"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import GoogleAnalytics from "@/components/google-analytics"
import PageLoader from "@/components/PageLoader"
import { LanguageProvider } from "@/lib/i18n"
import { getServerLocale } from "@/lib/i18n/server"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Creative Surf",
  description: "Creative Surf is a leading digital marketing agency...",
  icons: {
    icon: "/favicon.ico",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getServerLocale()

  return (
    <html lang={locale} className={`${jakarta.variable} font-sans`} suppressHydrationWarning>
      <head>
        {/*
          One-time reset of a stale saved theme.

          The site has always defaulted to light and ignores the OS setting
          (`enableSystem={false}`), but an earlier build forced `dark` on the
          real-estate section and persisted it under the same key — leaving
          those visitors stuck dark on the main site with no clue why.

          This clears that once per browser, then never runs again, so a
          deliberate switch to dark still persists as normal. It has to be a
          blocking script in <head>: next-themes reads localStorage from its
          own inline script in <body>, so anything later would be too late.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var k='cs-theme-reset-v1';if(!localStorage.getItem(k)){if(localStorage.getItem('theme')==='dark'){localStorage.setItem('theme','light')}localStorage.setItem(k,'1')}}catch(e){}`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider initialLocale={locale}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <Suspense fallback={null}>
              <GoogleAnalytics />
            </Suspense>

            {/* PAGE LOAD WAVE LOADER */}
            <Suspense fallback={null}>
              <PageLoader />
            </Suspense>

            {/* NAV */}
            <Navbar />

            {/* PAGE CONTENT */}
            <LoadingBarProvider>
              <main className="min-h-screen">{children}</main>
            </LoadingBarProvider>

            {/* FOOTER */}
            <ConditionalFooter />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
