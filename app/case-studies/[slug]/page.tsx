import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react"
import type { Metadata } from "next"
import { generateMetadata as generateCaseStudyMetadata } from "@/lib/metadata"
import { caseStudies } from "../caseStudiesData"

async function getCaseStudy(slug: string) {
  const post = caseStudies.find((post: any) => post.slug === slug)
  return post
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getCaseStudy(params.slug)

  if (!post) {
    return generateCaseStudyMetadata({
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
      path: `/case-studies/${params.slug}`,
    })
  }

  return generateCaseStudyMetadata({
    title: post.title,
    description: post.description,
    image: post.image,
    path: `/case-studies/${post.slug}`,
  })
}

export default async function CaseStudy({ params }: { params: { slug: string } }) {
  const post = await getCaseStudy(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = caseStudies.filter((p: any) => p.slug !== post.slug).slice(0, 2)
  
  // Format content to have paragraphs
  const contentParagraphs = post.content.split('\n\n');

  return (
    <div className="bg-flow-bg min-h-screen text-flow-text">
      {/* Hero */}
      <div className="container mx-auto px-6 max-w-5xl pt-24 pb-12">
        <Link href="/case-studies" className="inline-flex items-center text-flow-green hover:opacity-80 transition-opacity mb-10 font-semibold tracking-wide uppercase text-sm">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Works
        </Link>
        <div className="flex gap-3 mb-6">
          {post.tags.map((tag: string) => (
            <span key={tag} className="px-4 py-1.5 text-xs font-bold tracking-wide uppercase rounded-sm bg-flow-green/20 text-flow-green border border-flow-green/20">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-[2.5rem] md:text-[4.5rem] font-heading font-extrabold leading-tight tracking-tight mb-6">
          {post.title}
        </h1>
        <p className="text-xl md:text-2xl text-flow-text/70 mb-10 font-normal max-w-3xl">
          {post.description}
        </p>
      </div>

      {/* Main Image */}
      <div className="container mx-auto px-6 max-w-6xl mb-20">
         <div className="relative w-full aspect-[21/9] rounded-sm overflow-hidden border border-flow-border bg-flow-card">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
            />
         </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-12 gap-16 pb-24 border-b border-flow-border">
        {/* Results Sidebar */}
        <div className="md:col-span-4 flex flex-col gap-10">
           <div className="bg-flow-card p-8 rounded-sm border border-flow-border shadow-sm">
             <h3 className="text-xs uppercase tracking-widest font-bold text-flow-text/50 mb-2">Client</h3>
             <p className="text-xl font-heading font-bold text-flow-text">{post.client}</p>
           </div>
           
           <div className="bg-flow-card p-8 rounded-sm border border-flow-border shadow-sm">
             <h3 className="text-xs uppercase tracking-widest font-bold text-flow-text/50 mb-6">Key Results</h3>
             <ul className="space-y-4">
               {post.results.map((result: string, index: number) => (
                 <li key={index} className="flex gap-3">
                   <CheckCircle2 className="w-5 h-5 text-flow-green shrink-0 mt-0.5" />
                   <span className="text-flow-text/90 font-medium">{result}</span>
                 </li>
               ))}
             </ul>
           </div>
        </div>

        {/* Content body */}
        <div className="md:col-span-8 prose prose-lg prose-invert max-w-none text-flow-text/80">
          <h2 className="text-3xl font-heading font-extrabold text-flow-text mb-6">The Challenge & Solution</h2>
          {contentParagraphs.map((paragraph: string, index: number) => (
            <p key={index} className="leading-relaxed text-lg mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Read More Section */}
      {relatedPosts.length > 0 && (
        <div className="container mx-auto px-6 max-w-6xl py-24">
          <h2 className="text-3xl lg:text-5xl font-heading font-extrabold mb-12 tracking-tight">More Case Studies</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {relatedPosts.map((relatedPost: any) => (
              <Link href={relatedPost.link} key={relatedPost.slug} className="group relative flex flex-col gap-6 w-full">
                <div className="block overflow-hidden rounded-sm bg-flow-card aspect-[16/9] relative border border-flow-border">
                  <Image
                    src={relatedPost.image || "/placeholder.svg"}
                    alt={relatedPost.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-flow-text/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                  <div className="absolute top-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10 pointer-events-none">
                     <div className="w-12 h-12 rounded-full bg-flow-green flex items-center justify-center text-white shadow-lg">
                        <ArrowUpRight className="w-5 h-5" strokeWidth={2} />
                     </div>
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-2xl font-heading font-extrabold text-flow-text mb-2 line-clamp-2 leading-tight group-hover:text-flow-green transition-colors tracking-tight">
                    {relatedPost.title}
                  </h3>
                  <p className="text-flow-text/70 text-base font-normal line-clamp-2">
                    {relatedPost.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
