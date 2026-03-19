"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "./caseStudiesData";

export default function CaseStudiesPage() {
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
            Selected <br className="hidden md:block"/>
            <span className="text-flow-green inline-block relative">
              Works.
              <motion.svg 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                viewBox="0 0 200 24" 
                className="absolute -bottom-1 left-0 w-[105%] h-auto text-flow-text z-[-1] opacity-60" 
                fill="none" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M 5,8 Q 60,0 110,10 T 195,6" strokeWidth="8" />
                <path d="M 10,16 Q 70,8 120,18 T 190,14" strokeWidth="6" />
              </motion.svg>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-flow-text/70 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Explore how we've helped businesses across various industries achieve remarkable growth through innovative digital strategies.
          </motion.p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="container mx-auto px-6 max-w-7xl py-24">
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
          {caseStudies.map((work, idx) => (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (idx % 2) * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative flex flex-col gap-6 w-full ${idx % 2 !== 0 ? 'md:mt-40' : ''}`}
            >
              <Link href={work.link} className="block overflow-hidden rounded-sm bg-flow-card aspect-[4/5] md:aspect-square relative border border-flow-border">
                <div className="absolute inset-0 w-full h-full">
                  <Image 
                    src={work.image} 
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                
                <div className="absolute inset-0 bg-flow-text/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                
                {/* Overlay Badge */}
                <div className="absolute top-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10 pointer-events-none">
                   <div className="w-14 h-14 rounded-full bg-flow-green flex items-center justify-center text-white shadow-lg">
                      <ArrowUpRight className="w-6 h-6" strokeWidth={2} />
                   </div>
                </div>
              </Link>
              
              <div className="px-2">
                <div className="flex gap-2 mb-4">
                  {work.tags.map((tag: string) => (
                    <span key={tag} className="px-4 py-1.5 text-xs font-bold tracking-wide uppercase rounded-sm bg-flow-green/10 text-flow-green">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl lg:text-4xl font-heading font-extrabold mb-3 text-flow-text hover:text-flow-green transition-colors duration-300 tracking-tight">
                  <Link href={work.link}>{work.title}</Link>
                </h3>
                <p className="text-flow-text/70 font-normal text-lg">
                  {work.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
