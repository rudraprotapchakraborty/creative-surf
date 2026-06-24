import { Plus_Jakarta_Sans, Fraunces } from "next/font/google"
import RealEstateFooter from "./RealEstateFooter"
import RealEstateChrome from "./RealEstateChrome"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-re",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
})

// Elegant editorial serif used for display headings (matches the luxury feel)
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-re-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
})

export default function RealEstateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${jakarta.variable} ${fraunces.variable} real-estate-theme`}>
      <style>{`
        .real-estate-theme {
          --flow-bg: 252 249 243;
          --flow-surface: 255 255 255;
          --flow-border: rgba(184, 137, 42, 0.08);
          --flow-border-strong: rgba(184, 137, 42, 0.14);
        }
        .dark .real-estate-theme {
          --flow-bg: 4 11 24;
          --flow-surface: 8 18 36;
          --flow-border: rgba(255, 255, 255, 0.08);
          --flow-border-strong: rgba(255, 255, 255, 0.14);
        }
      `}</style>
      <RealEstateChrome />
      {/* Guarantees at least a full viewport of content above the footer,
          so the tall footer never rides up under the navbar on short pages. */}
      <div className="min-h-screen">{children}</div>
      <RealEstateFooter />
    </div>
  )
}
