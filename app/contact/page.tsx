import type { Metadata } from "next"
import ContactContent from "./ContactContent"

export const metadata: Metadata = {
  title: "Contact Us | Creative Surf",
  description:
    "Get in touch with Creative Surf for your next project. We're here to help bring your vision to life.",
}

export default function ContactPage() {
  return <ContactContent />
}
