import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import BlogContent from "./BlogContent"

export const metadata: Metadata = generateMetadata({
  title: "Blog",
  description:
    "Stay updated with the latest trends and insights in digital marketing, SEO, and more.",
  path: "/blog",
})

export default function BlogPage() {
  return <BlogContent />
}
