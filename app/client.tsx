import "./globals.css"
import { Navbar } from "@/components/navbar"
import { ConditionalFooter } from "@/components/ConditionalFooter"
import { LoadingBarProvider } from "@/components/LoadingBarContext"
import { ChatWidget } from "@/components/ChatWidget"
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

/**
 * The signature that greets anyone who opens devtools: a comment node at the
 * very top of the document, plus a styled banner in the console.
 *
 * It runs from an inline <head> script rather than JSX because React has no way
 * to render a comment node, and the mark has to sit *outside* <head> to read
 * the way it does on hand-built sites.
 */
// Strokes are two blocks thick: a one-block stroke reads as hairline once the
// console's monospace advance separates the columns.
const MARK = [
  "██████   ██   ██  ██████   ██████    █████ ",
  "███████  ██   ██  ███████  ███████  ███████",
  "██   ██  ██   ██  ██   ██  ██   ██  ██   ██",
  "██   ██  ██   ██  ██   ██  ██   ██  ██   ██",
  "███████  ██   ██  ██   ██  ███████  ███████",
  "██████   ██   ██  ██   ██  ██████   ███████",
  "██  ██   ███████  ███████  ██  ██   ██   ██",
  "██   ██   █████   ██████   ██   ██  ██   ██",
].join("\n")

const SIGN_OFF = `\n  Coded by Rudra Protap Chakraborty\n\n${MARK}\n\n  rudraprotapchakraborty.com\n`

// One colour, one face, credit above the art — the console banner reads as the
// same mark as the DOM comment rather than as a second, louder thing.
// JSON.stringify does the escaping, so the art survives the trip into an
// inline script without a second layer of backslashes to get wrong.
const SIGNATURE = `try{
document.documentElement.insertBefore(document.createComment(${JSON.stringify(
  SIGN_OFF
)}),document.documentElement.firstChild);
console.log("%c" + ${JSON.stringify(SIGN_OFF)},
"color:#9b9b9b;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;line-height:1.05");
}catch(e){}`

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

        {/*
          Signature. React can't render a comment node, so the mark is inserted
          as the first child of <html> from here — it lands above <head> in the
          Elements panel, which is where anyone curious enough to look will be.
          The console banner is the same credit for anyone who opens that tab
          instead.
        */}
        <script dangerouslySetInnerHTML={{ __html: SIGNATURE }} />
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

            {/* FLOATING AI ASSISTANT */}
            <ChatWidget />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
