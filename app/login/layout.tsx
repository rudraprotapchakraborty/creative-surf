import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("login", "/login", { noIndex: true })
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
