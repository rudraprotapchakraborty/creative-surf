import type { Metadata } from "next"
import AboutContent from "./AboutContent"

export const metadata: Metadata = {
  title: "About Us | Creative Surf",
  description: "Learn about Creative Surf, our mission, values, and the talented team behind our creative agency.",
}

export default function ContactPage() {
  return <AboutContent />
}