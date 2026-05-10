"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { blogPosts } from "../blog/blogData";
import WaveBackdrop from "./WaveBackdrop";

export default function BlogSection() {
  return (
    <section className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-flow-bg text-flow-text overflow-hidden border-t border-flow-border">
      <WaveBackdrop id="blog-wave" corner="br" size="sm" opacity={0.45} />

      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-30" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-aurora-3" />
              Blog
            </span>
            <h2 className="text-[2.25rem] sm:text-[3rem] md:text-5xl lg:text-[5.5rem] font-heading font-extrabold tracking-[-0.05em] mb-4 leading-[1.0]">
              Insights & <br className="hidden md:block" />
              <span className="text-aurora-shimmer italic">perspectives.</span>
            </h2>
            <p className="text-flow-textSoft font-normal text-lg max-w-lg">
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
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-flow-border text-flow-text hover:border-aurora-1/50 transition-all font-semibold"
            >
              View All Articles
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
              whileHover={{ y: -6 }}
              className="group flex flex-col"
            >
              <Link
                href={post.link}
                className="block w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative border border-flow-border bg-flow-cardSolid"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Ocean wash on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-aurora-1/25 via-transparent to-aurora-3/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-strong border border-flow-borderStrong text-[10px] font-bold uppercase tracking-[0.15em] text-flow-text">
                  {post.category}
                </div>
              </Link>

              <div className="flex flex-col flex-1">
                <p className="text-xs text-aurora-1 mb-2 font-bold uppercase tracking-[0.15em]">
                  {post.date}
                </p>
                <h3 className="text-2xl font-heading font-extrabold text-flow-text mb-2 line-clamp-2 leading-tight group-hover:text-aurora-1 transition-colors tracking-tight">
                  <Link href={post.link}>{post.title}</Link>
                </h3>
                <p className="text-flow-textSoft text-base font-normal line-clamp-3 mb-4 flex-1">
                  {post.excerpt}
                </p>
                <Link
                  href={post.link}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-flow-text group-hover:text-aurora-1 transition-colors"
                >
                  Read article
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
