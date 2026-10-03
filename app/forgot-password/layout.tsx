import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("forgotPassword", "/forgot-password", { noIndex: true })
}

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return children
}
