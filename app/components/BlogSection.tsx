"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "10 SEO Strategies for 2025",
    excerpt: "Next-gen SEO hacks that will dominate the algorithm battlefield.",
    image: "/placeholder.svg?height=400&width=600",
    link: "/blog/seo-strategies-2025",
    category: "SEO",
    date: "Oct 12, 2024"
  },
  {
    title: "The Power of Content Marketing",
    excerpt: "Harness the narrative. Build empires with words & visuals.",
    image: "/placeholder.svg?height=400&width=600",
    link: "/blog/power-of-content-marketing",
    category: "Marketing",
    date: "Oct 05, 2024"
  },
  {
    title: "Social Media Trends to Watch",
    excerpt: "Social’s new frontier — immersive, AI-driven, and unfiltered.",
    image: "/placeholder.svg?height=400&width=600",
    link: "/blog/social-media-trends",
    category: "Social",
    date: "Sep 28, 2024"
  },
  {
    title: "Maximizing ROI with PPC Campaigns",
    excerpt: "AI bidding, intent mapping, and creative rotations to rule PPC.",
    image: "/placeholder.svg?height=400&width=600",
    link: "/blog/maximizing-ppc-roi",
    category: "Advertising",
    date: "Sep 21, 2024"
  },
];

export default function BlogSection() {
  return (
    <section className="relative py-32 bg-[#06080F] text-white overflow-hidden border-t border-white/[0.05]">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
              Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Perspectives</span>
            </h2>
            <p className="text-gray-400 font-light text-lg max-w-lg">
              Expert advice, industry trends, and strategic plays to keep you ahead of the digital curve.
            </p>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
          >
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-colors font-medium"
            >
              View All Articles <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col"
            >
              <Link href={post.link} className="block w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 relative border border-white/5 bg-white/5">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-medium text-white">
                  {post.category}
                </div>
              </Link>
              
              <div className="flex flex-col flex-1">
                <p className="text-sm text-cyan-400 mb-2 font-medium">{post.date}</p>
                <h3 className="text-xl font-medium text-white mb-2 line-clamp-2 leading-tight group-hover:text-cyan-300 transition-colors">
                  <Link href={post.link}>{post.title}</Link>
                </h3>
                <p className="text-gray-400 text-sm font-light line-clamp-3 mb-4 flex-1">
                  {post.excerpt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
