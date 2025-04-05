"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoadingBarProvider } from "@/components/LoadingBarContext"
import type React from "react"
import { Poppins } from "next/font/google"
import { Suspense } from "react" // ✅ import Suspense
import GoogleAnalytics from "@/components/google-analytics"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <body className="overflow-x-hidden">
        {/* ✅ Wrap in Suspense */}
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>

        <Navbar />
        <LoadingBarProvider>
          <main className="min-h-screen">{children}</main>
        </LoadingBarProvider>
        <Footer />
        <style jsx global>{`
          :root {
            --font-poppins: ${poppins.style.fontFamily}, sans-serif;
          }
          body {
            font-family: var(--font-poppins);
          }
        `}</style>
      </body>
    </html>
  )
}
