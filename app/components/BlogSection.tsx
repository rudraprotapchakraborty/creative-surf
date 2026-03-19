"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "../blog/blogData";

export default function BlogSection() {
  return (
    <section className="relative py-32 bg-flow-bg text-flow-text overflow-hidden border-t border-flow-border">
      {/* Sharp Vector Waves */}
      <div className="absolute bottom-0 right-0 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] max-w-[1000px] max-h-[1000px] pointer-events-none z-0 overflow-hidden transform opacity-40">
        <motion.svg 
          viewBox="0 0 500 500" 
          preserveAspectRatio="xMidYMax slice"
          className="absolute bottom-0 right-0 w-full h-full object-cover origin-bottom-right"
        >
          <path d="M 500,500 L 0,500 C 100,400 150,300 300,350 C 400,380 450,200 500,100 Z" className="fill-flow-blob3 transition-colors" />
          <path d="M 500,500 L 50,500 C 150,450 250,350 350,400 C 420,430 480,250 500,150 Z" className="fill-flow-blob1 transition-colors" />
        </motion.svg>
      </div>
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[2.75rem] sm:text-[3.5rem] md:text-6xl lg:text-[6.5rem] font-heading font-extrabold tracking-[-0.04em] mb-4 leading-[1.05]">
              Insights & <br className="hidden md:block"/>
              <span className="text-flow-green">Perspectives</span>
            </h2>
            <p className="text-flow-text/70 font-normal text-lg max-w-lg">
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-flow-card border border-flow-border shadow-sm text-flow-text hover:bg-flow-border transition-colors font-semibold"
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
        
      </div>
    </section>
  );
}
