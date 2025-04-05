import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateMetadata({
  title: "Blog",
  description: "Stay updated with the latest trends and insights in digital marketing, SEO, and more.",
  path: "/blog",
})

// This would typically come from a database or API
const blogPosts = [
  {
    slug: "10-seo-strategies-for-2025",
    title: "10 SEO Strategies for 2025",
    excerpt: "Stay ahead of the curve with these cutting-edge SEO techniques for the coming year.",
    date: "2025-01-15",
    image: "/placeholder.svg?height=200&width=400",
    category: "SEO",
  },
  {
    slug: "power-of-content-marketing",
    title: "The Power of Content Marketing",
    excerpt: "Discover how content marketing can transform your business and boost your online presence.",
    date: "2025-02-01",
    image: "/placeholder.svg?height=200&width=400",
    category: "Content Marketing",
  },
  {
    slug: "social-media-trends-to-watch",
    title: "Social Media Trends to Watch",
    excerpt: "Learn about the latest social media trends that are shaping digital marketing strategies.",
    date: "2025-02-15",
    image: "/placeholder.svg?height=200&width=400",
    category: "Social Media",
  },
  {
    slug: "maximizing-roi-with-ppc-campaigns",
    title: "Maximizing ROI with PPC Campaigns",
    excerpt: "Explore effective strategies to improve your pay-per-click campaigns and increase ROI.",
    date: "2025-03-01",
    image: "/placeholder.svg?height=200&width=400",
    category: "PPC",
  },
]

export default function BlogPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Our Blog</h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Stay updated with the latest trends and insights in digital marketing, SEO, and more.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">{post.category}</div>
                <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="text-sm text-gray-500">{post.date}</div>
              </CardContent>
              <CardFooter className="bg-gray-50 p-6">
                <Button asChild variant="ghost" className="w-full">
                  <Link href={`/blog/${post.slug}`} className="flex items-center justify-center">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

