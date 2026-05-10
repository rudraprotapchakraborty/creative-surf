import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoadingBarProvider } from "@/components/LoadingBarContext"
import type { Metadata } from "next"
import { Syne, Outfit } from "next/font/google"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import GoogleAnalytics from "@/components/google-analytics"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
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
    <html lang="en" className={`${syne.variable} ${outfit.variable} font-sans`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>

          {/* NAV */}
          <Navbar />

          {/* PAGE CONTENT */}
          <LoadingBarProvider>
            <main className="min-h-screen">{children}</main>
          </LoadingBarProvider>

          {/* FOOTER */}
          <Footer />

          {/* CHAT BUBBLE - MUST BE OUTSIDE MAIN CONTENT */}
        </ThemeProvider>
      </body>
    </html>
  )
}
