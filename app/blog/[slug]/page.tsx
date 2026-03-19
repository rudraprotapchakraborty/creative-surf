import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { generateMetadata as generateBlogMetadata } from "@/lib/metadata"
import { blogPosts } from "../blogData"

async function getBlogPost(slug: string) {
  const post = blogPosts.find((post: any) => post.slug === slug)
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

  const relatedPosts = blogPosts.filter((p: any) => p.slug !== post.slug).slice(0, 3)
  
  // Format content to have paragraphs
  const contentParagraphs = post.content.split('\n\n');

  return (
    <div className="bg-flow-bg min-h-screen text-flow-text">
      <div className="container mx-auto px-6 max-w-4xl py-24">
        <Link href="/blog" className="inline-flex items-center text-flow-green hover:opacity-80 transition-opacity mb-8 font-semibold tracking-wide uppercase text-sm">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Perspectives
        </Link>
        
        <article className="border border-flow-border bg-flow-card rounded-sm shadow-sm overflow-hidden">
          <div className="relative w-full aspect-[2/1]">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center text-sm text-flow-text/70 mb-6 gap-x-6 gap-y-3 uppercase tracking-wider font-semibold border-b border-flow-border pb-6">
              <span className="text-flow-green">{post.category}</span>
              <span className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" /> {post.date}
              </span>
              <span className="flex items-center">
                <User className="mr-2 h-4 w-4" /> {post.author}
              </span>
              <span className="flex items-center">
                <Clock className="mr-2 h-4 w-4" /> {post.readTime}
              </span>
            </div>
            <h1 className="text-[2.5rem] md:text-[3.5rem] font-heading font-extrabold mb-8 leading-tight tracking-tight">{post.title}</h1>
            
            <div className="prose prose-lg prose-invert max-w-none text-flow-text/80 space-y-6">
              {contentParagraphs.map((paragraph: string, index: number) => (
                <p key={index} className="leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>

        {/* Read More Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-heading font-extrabold mb-10 tracking-tight">Read More</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost: any) => (
                <Link href={relatedPost.link} key={relatedPost.slug} className="group flex flex-col">
                  <div className="w-full aspect-[4/3] rounded-sm overflow-hidden mb-4 relative border border-flow-border bg-flow-bg">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-flow-card shadow-sm border border-flow-border px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider text-flow-text">
                      {relatedPost.category}
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <h3 className="text-xl font-heading font-extrabold text-flow-text mb-2 line-clamp-2 leading-tight group-hover:text-flow-green transition-colors tracking-tight">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
