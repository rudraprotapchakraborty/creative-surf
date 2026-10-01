import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("editRealEstatePost", "/real-estate/blogs/edit", { noIndex: true })
}

export default function EditRealEstatePostLayout({ children }: { children: React.ReactNode }) {
  return children
}
