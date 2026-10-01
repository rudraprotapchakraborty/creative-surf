import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("editPost", "/blogs/edit", { noIndex: true })
}

export default function EditPostLayout({ children }: { children: React.ReactNode }) {
  return children
}
