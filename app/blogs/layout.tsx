import type { Metadata } from "next"
import { generateBlogListingMetadata } from "@/lib/blog-metadata"

export const metadata: Metadata = generateBlogListingMetadata("creative-surf")

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children
}