import type { Metadata } from "next"
import type { BlogRecord } from "@/lib/blog-db"

const SITE_CONFIG = {
  "creative-surf": {
    siteName: "Creative Surf",
    baseUrl: "https://www.creativesurf.com",
    blogPath: "/blogs",
    brand: "Creative Surf",
  },
  "real-estate": {
    siteName: "Creative Surf Real Estate",
    baseUrl: "https://www.creativesurf.com",
    blogPath: "/real-estate/blogs",
    brand: "Creative Surf Real Estate",
  },
} as const

export type BlogSite = keyof typeof SITE_CONFIG

export function getBlogSeoDescription(blog: Pick<BlogRecord, "metaDescription" | "excerpt">): string {
  const description = blog.metaDescription?.trim() || blog.excerpt?.trim()
  return description || "Read the latest insights and guides from our team."
}

export function generateBlogPostMetadata(
  blog: BlogRecord,
  site: BlogSite
): Metadata {
  const config = SITE_CONFIG[site]
  const description = getBlogSeoDescription(blog)
  const path = `${config.blogPath}/${blog.slug}`
  const url = `${config.baseUrl}${path}`
  const title = `${blog.title} | ${config.siteName}`
  const image = blog.coverImage?.trim() || "/og-image.jpg"

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: config.siteName,
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt ?? blog.createdAt,
      authors: [blog.author],
      tags: blog.tags,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function generateBlogListingMetadata(site: BlogSite): Metadata {
  const config = SITE_CONFIG[site]
  const isRealEstate = site === "real-estate"
  const title = isRealEstate ? "Real Estate Blog" : "Blog"
  const description = isRealEstate
    ? "Market insights, property guides, and investment tips from Creative Surf Real Estate."
    : "Digital marketing insights, SEO strategies, design tips, and growth guides from Creative Surf."

  return {
    title: `${title} | ${config.siteName}`,
    description,
    alternates: { canonical: `${config.baseUrl}${config.blogPath}` },
    openGraph: {
      title: `${title} | ${config.siteName}`,
      description,
      url: `${config.baseUrl}${config.blogPath}`,
      siteName: config.siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${config.siteName}`,
      description,
    },
    robots: { index: true, follow: true },
  }
}

export function generateArticleJsonLd(blog: BlogRecord, site: BlogSite) {
  const config = SITE_CONFIG[site]
  const description = getBlogSeoDescription(blog)
  const url = `${config.baseUrl}${config.blogPath}/${blog.slug}`

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description,
    image: blog.coverImage ? [blog.coverImage] : undefined,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt ?? blog.createdAt,
    author: {
      "@type": "Person",
      name: blog.author,
    },
    publisher: {
      "@type": "Organization",
      name: config.brand,
      url: config.baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: blog.tags?.length ? blog.tags.join(", ") : undefined,
    articleSection: blog.category,
  }
}