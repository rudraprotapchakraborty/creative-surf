import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoadingBarProvider } from "@/components/LoadingBarContext"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Suspense } from "react"
import GoogleAnalytics from "@/components/google-analytics"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
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
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <body className="overflow-x-hidden">
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <Navbar />
        <LoadingBarProvider>
          <main className="min-h-screen">{children}</main>
        </LoadingBarProvider>
        <Footer />
      </body>
    </html>
  )
}
