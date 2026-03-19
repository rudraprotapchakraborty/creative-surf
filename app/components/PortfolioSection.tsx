"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

import { caseStudies as ourWorks } from "../case-studies/caseStudiesData";

const WorkCard = ({ work, idx }: { work: any, idx: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effect for the image inside the card
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col gap-6 w-full ${idx % 2 !== 0 ? 'md:mt-40' : ''}`}
    >
      <Link href={work.link} className="block overflow-hidden rounded-sm bg-flow-card aspect-[4/5] md:aspect-square relative border border-flow-border">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image 
            src={work.image} 
            alt={work.title}
            fill
            className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        </motion.div>
        
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
  );
};

export default function PortfolioSection() {
  return (
    <section id="projects" className="relative py-32 bg-flow-bg text-flow-text overflow-hidden border-t border-flow-border">
      {/* Sharp Vector Waves */}
      <div className="absolute bottom-0 left-0 w-[120vw] h-[120vw] md:w-[70vw] md:h-[70vw] max-w-[1200px] max-h-[1200px] pointer-events-none z-0 overflow-hidden transform -scale-x-100 opacity-40">
        <motion.svg 
          viewBox="0 0 500 500" 
          preserveAspectRatio="xMidYMax slice"
          className="absolute bottom-0 left-0 w-full h-full object-cover origin-bottom-left"
        >
          <path d="M 500,500 L 0,500 C 100,400 150,300 300,350 C 400,380 450,200 500,100 Z" className="fill-flow-blob3 transition-colors" />
          <path d="M 500,500 L 50,500 C 150,450 250,350 350,400 C 420,430 480,250 500,150 Z" className="fill-flow-blob1 transition-colors" />
        </motion.svg>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-[2.75rem] sm:text-[3.5rem] md:text-6xl lg:text-[6.5rem] font-heading font-extrabold tracking-[-0.04em] mb-4 leading-[1.05]">
              Selected 
              <br className="hidden md:block"/>
              <span className="text-flow-green inline-block relative">
                Works.
                <motion.svg 
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  viewBox="0 0 200 24" 
                  className="absolute -bottom-1 md:-bottom-2 left-0 w-[105%] h-auto text-flow-text z-[-1] opacity-60" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M 5,8 Q 60,0 110,10 T 195,6" strokeWidth="8" />
                  <path d="M 10,16 Q 70,8 120,18 T 190,14" strokeWidth="6" />
                </motion.svg>
              </span>
            </h2>
            <p className="text-flow-text/80 max-w-md font-normal text-lg md:text-xl mt-6">
              A glimpse into our recent collaborations and digital transformations.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
             <Link href="/case-studies" className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-flow-card border border-flow-border shadow-sm text-flow-text hover:bg-flow-border transition-colors font-semibold">
               View All Projects <ArrowUpRight className="w-4 h-4 ml-2" />
             </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-24 mt-20">
          {ourWorks.map((work, idx) => (
            <WorkCard key={work.title} work={work} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
