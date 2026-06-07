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
      {children}
      <RealEstateFooter />
    </div>
  )
}
