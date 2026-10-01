import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("newPost", "/blogs/new", { noIndex: true })
}

export default function NewPostLayout({ children }: { children: React.ReactNode }) {
  return children
}
