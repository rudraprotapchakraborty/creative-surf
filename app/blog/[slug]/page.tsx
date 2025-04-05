import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Metadata } from "next"
import { generateMetadata as generateBlogMetadata } from "@/lib/metadata"

// This would typically come from a database or API
const blogPosts = [
  {
    slug: "10-seo-strategies-for-2025",
    title: "10 SEO Strategies for 2025",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "2025-01-15",
    author: "Jane Doe",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=800",
    category: "SEO",
    excerpt: "A comprehensive guide to SEO strategies for the year 2025.",
  },
  {
    slug: "power-of-content-marketing",
    title: "The Power of Content Marketing",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    date: "2025-02-01",
    author: "John Smith",
    readTime: "7 min read",
    image: "/placeholder.svg?height=400&width=800",
    category: "Content Marketing",
    excerpt: "Explore the effectiveness of content marketing in today's digital landscape.",
  },
  {
    slug: "social-media-trends-to-watch",
    title: "Social Media Trends to Watch",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    date: "2025-02-15",
    author: "Emily Johnson",
    readTime: "6 min read",
    image: "/placeholder.svg?height=400&width=800",
    category: "Social Media",
    excerpt: "Stay ahead of the curve with these emerging social media trends.",
  },
  {
    slug: "maximizing-roi-with-ppc-campaigns",
    title: "Maximizing ROI with PPC Campaigns",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    date: "2025-03-01",
    author: "Michael Brown",
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=800",
    category: "PPC",
    excerpt: "Learn how to optimize your PPC campaigns for maximum return on investment.",
  },
]

// Assuming you have a function to fetch blog post data
async function getBlogPost(slug: string) {
  // Fetch blog post data
  // For now, we'll use the mock data
  const post = blogPosts.find((post) => post.slug === slug)
  return post
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return generateBlogMetadata({
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
      path: `/blog/${params.slug}`,
    })
  }

  return generateBlogMetadata({
    title: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    image: post.image,
    path: `/blog/${post.slug}`,
  })
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <Link href="/blog" className="flex items-center text-blue-600 hover:underline mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-80 object-cover"
          />
          <div className="p-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-4">{post.category}</span>
              <span className="flex items-center mr-4">
                <Calendar className="mr-1 h-4 w-4" /> {post.date}
              </span>
              <span className="flex items-center mr-4">
                <User className="mr-1 h-4 w-4" /> {post.author}
              </span>
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4" /> {post.readTime}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
            <div className="prose max-w-none">
              <p>{post.content}</p>
              {/* Add more content here */}
            </div>
          </div>
        </article>

        {/* Read More Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Read More</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.slug} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={relatedPost.image || "/placeholder.svg"}
                  alt={relatedPost.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="text-sm text-blue-600 font-semibold mb-2">{relatedPost.category}</div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{relatedPost.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{relatedPost.content}</p>
                </CardContent>
                <CardFooter className="bg-gray-50 p-6">
                  <Button asChild variant="ghost" className="w-full">
                    <Link href={`/blog/${relatedPost.slug}`} className="flex items-center justify-center">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

