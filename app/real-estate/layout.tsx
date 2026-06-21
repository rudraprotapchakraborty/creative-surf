import { Plus_Jakarta_Sans } from "next/font/google"
import RealEstateFooter from "./RealEstateFooter"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-re",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
})

export default function RealEstateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={jakarta.variable}>
      {/* Guarantees at least a full viewport of content above the footer,
          so the tall footer never rides up under the navbar on short pages. */}
      <div className="min-h-screen">{children}</div>
      <RealEstateFooter />
    </div>
  )
}
