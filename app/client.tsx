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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jakarta.variable} font-sans`} suppressHydrationWarning>
      <body suppressHydrationWarning>
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
      </body>
    </html>
  )
}
