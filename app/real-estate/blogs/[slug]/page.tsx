import { notFound } from "next/navigation"
import type { Metadata } from "next"
import BlogPostClient from "./BlogPostClient"
import { getRealEstateBlogBySlug } from "@/lib/blog-db"
import { generateArticleJsonLd, generateBlogPostMetadata } from "@/lib/blog-metadata"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = await getRealEstateBlogBySlug(slug)
  if (!blog) {
    return { title: "Post not found | Creative Surf Real Estate", robots: { index: false, follow: false } }
  }
  return generateBlogPostMetadata(blog, "real-estate")
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await getRealEstateBlogBySlug(slug)
  if (!blog) notFound()

  const jsonLd = generateArticleJsonLd(blog, "real-estate")

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient slug={slug} initialBlog={blog} />
    </>
  )
}