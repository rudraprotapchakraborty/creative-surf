import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("newRealEstatePost", "/real-estate/blogs/new", { noIndex: true })
}

export default function NewRealEstatePostLayout({ children }: { children: React.ReactNode }) {
  return children
}
