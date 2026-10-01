import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("register", "/register", { noIndex: true })
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children
}
