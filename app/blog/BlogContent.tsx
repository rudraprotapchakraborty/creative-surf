"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "./blogData";

export default function BlogContent() {
  return (
    <div className="bg-flow-bg min-h-screen text-flow-text">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-flow-border">
        {/* Sharp Vector Waves */}
        <div className="absolute top-0 left-0 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] max-w-[1000px] max-h-[1000px] pointer-events-none z-0 overflow-hidden transform opacity-20 -scale-y-100">
          <motion.svg 
            viewBox="0 0 500 500" 
            preserveAspectRatio="xMidYMax slice"
            className="absolute bottom-0 left-0 w-full h-full object-cover origin-bottom-left"
          >
            <path d="M 500,500 L 0,500 C 100,400 150,300 300,350 C 400,380 450,200 500,100 Z" className="fill-flow-blob3 transition-colors" />
            <path d="M 500,500 L 50,500 C 150,450 250,350 350,400 C 420,430 480,250 500,150 Z" className="fill-flow-blob1 transition-colors" />
          </motion.svg>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[3rem] md:text-[5rem] font-heading font-extrabold tracking-tight mb-6 leading-tight"
          >
            Insights & <br className="hidden md:block"/>
            <span className="text-flow-green">Perspectives</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-flow-text/70 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Expert advice, industry trends, and strategic plays to keep you ahead of the digital curve.
          </motion.p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-6 max-w-7xl py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col"
            >
              <Link href={post.link} className="block w-full aspect-[4/3] rounded-sm overflow-hidden mb-6 relative border border-flow-border bg-flow-bg">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4 bg-flow-card shadow-sm border border-flow-border px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider text-flow-text">
                  {post.category}
                </div>
              </Link>
              
              <div className="flex flex-col flex-1">
                <p className="text-sm text-flow-green mb-2 font-bold uppercase tracking-wider">{post.date}</p>
                <h3 className="text-2xl font-heading font-extrabold text-flow-text mb-2 line-clamp-2 leading-tight group-hover:text-flow-green transition-colors tracking-tight">
                  <Link href={post.link}>{post.title}</Link>
                </h3>
                <p className="text-flow-text/70 text-base font-normal line-clamp-3 mb-4 flex-1">
                  {post.excerpt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
