import type { Metadata } from "next"
import { generateBlogListingMetadata } from "@/lib/blog-metadata"

export const metadata: Metadata = generateBlogListingMetadata("real-estate")

export default function RealEstateBlogsLayout({ children }: { children: React.ReactNode }) {
  return children
}