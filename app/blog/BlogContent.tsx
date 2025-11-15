"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

// Fake posts (replace with API later)
const blogPosts = [
  {
    slug: "10-seo-strategies-for-2025",
    title: "10 SEO Strategies for 2025",
    excerpt:
      "Stay ahead of the curve with these cutting-edge SEO techniques for the coming year.",
    date: "2025-01-15",
    image: "/placeholder.svg?height=200&width=400",
    category: "SEO",
  },
  {
    slug: "power-of-content-marketing",
    title: "The Power of Content Marketing",
    excerpt:
      "Discover how content marketing can transform your business and boost your online presence.",
    date: "2025-02-01",
    image: "/placeholder.svg?height=200&width=400",
    category: "Content Marketing",
  },
  {
    slug: "social-media-trends-to-watch",
    title: "Social Media Trends to Watch",
    excerpt:
      "Learn about the latest social media trends that are shaping digital marketing strategies.",
    date: "2025-02-15",
    image: "/placeholder.svg?height=200&width=400",
    category: "Social Media",
  },
  {
    slug: "maximizing-roi-with-ppc-campaigns",
    title: "Maximizing ROI with PPC Campaigns",
    excerpt:
      "Explore effective strategies to improve your pay-per-click campaigns and increase ROI.",
    date: "2025-03-01",
    image: "/placeholder.svg?height=200&width=400",
    category: "PPC",
  },
]

export default function BlogContent() {
  return (
    <div className="bg-gray-950 min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Gradient background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-b from-blue-900 via-indigo-900 to-gray-950"
        />

        {/* Floating glowing particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [-20, -200],
                x: [0, (Math.random() - 0.5) * 300],
              }}
              transition={{
                duration: 5 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-xl mt-4 text-gray-200 max-w-2xl mx-auto"
          >
            Stay updated with the latest trends and insights in digital marketing, SEO, and more.
          </motion.p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.slug}
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8 }}
            >
              <Card className="overflow-hidden group relative bg-white/5 border border-white/10 backdrop-blur-lg hover:shadow-xl transition-all duration-300">
                {/* Blog image */}
                <div className="overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <CardContent className="p-6">
                  <div className="text-sm text-cyan-400 font-semibold mb-2">
                    {post.category}
                  </div>
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="text-sm text-gray-400">{post.date}</div>
                </CardContent>

                <CardFooter className="p-6 border-t border-white/10">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button asChild variant="ghost" className="w-full text-cyan-400 hover:text-white hover:bg-cyan-500/20">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center justify-center"
                      >
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  )
}
