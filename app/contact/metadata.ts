import { generateMetadata as baseGenerateMetadata } from "@/lib/metadata"

export function generateMetadata() {
  return baseGenerateMetadata({
    title: "Contact Us",
    description: "Get in touch with Creative Surf. We're here to answer your questions and help your business grow.",
    path: "/contact",
  })
}

