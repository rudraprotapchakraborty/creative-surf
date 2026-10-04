import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"

// Indexable: a sign-in page is a legitimate way into the site, and a noindex
// on it only costs the page its search listing.
export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("register", "/register")
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children
}
