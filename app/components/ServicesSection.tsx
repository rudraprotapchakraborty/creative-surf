"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  PenTool,
  FileText,
  Video,
  Globe,
  Tv,
  Search,
  Target,
  Users,
} from "lucide-react";

const services = [
  {
    title: "Graphics Design",
    description: "High-impact visuals blending art direction with precision.",
    icon: PenTool,
  },
  {
    title: "Content Marketing",
    description: "Strategic storytelling to connect deeply with your audience.",
    icon: FileText,
  },
  {
    title: "Video Editing",
    description: "Cinematic edits with seamless motion and narrative clarity.",
    icon: Video,
  },
  {
    title: "Website Development",
    description: "Immersive, high-performance web experiences.",
    icon: Globe,
  },
  {
    title: "OVC/TVC",
    description: "Premium commercials for maximum brand impact.",
    icon: Tv,
  },
  {
    title: "SEO & Social Media",
    description: "Boost your visibility with precision SEO and campaigns.",
    icon: Search,
  },
  {
    title: "Media Buying",
    description: "Optimized ad spend to maximize ROI.",
    icon: Target,
  },
  {
    title: "Digital Branding",
    description: "Crafting cohesive digital identities for lasting impressions.",
    icon: Users,
  },
];

export default function ServicesSection() {
  const containerRef = useRef(null);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-32 bg-flow-card text-flow-text overflow-hidden border-t border-flow-border"
    >
      {/* Sharp Vector Waves */}
      <div className="absolute top-0 left-0 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] max-w-[1000px] max-h-[1000px] pointer-events-none z-0 overflow-hidden transform -scale-x-100">
        <motion.svg 
          viewBox="0 0 500 500" 
          preserveAspectRatio="xMidYMax slice"
          className="absolute top-0 left-0 w-full h-full object-cover origin-top-left opacity-60"
        >
          <path d="M 500,500 L 0,500 C 100,400 150,300 300,350 C 400,380 450,200 500,100 Z" className="fill-flow-blob3 transition-colors" />
          <path d="M 500,500 L 50,500 C 150,450 250,350 350,400 C 420,430 480,250 500,150 Z" className="fill-flow-blob2 transition-colors" />
        </motion.svg>
      </div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Left: Sticky Title Component */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-[2.75rem] sm:text-[3.5rem] md:text-6xl lg:text-[6.5rem] font-heading font-extrabold tracking-[-0.04em] text-flow-text leading-[1.05]"
              >
                Our<br/>Expertise
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="mt-6 text-flow-text/70 font-normal text-lg md:text-xl leading-relaxed max-w-sm"
              >
                Comprehensive digital solutions engineered for growth and aesthetic supremacy.
              </motion.p>
            </div>
          </div>

          {/* Right: Scrolling Cards */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            {services.map(({ title, description, icon: Icon }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.05, ease: "easeOut" }}
                className="group p-8 md:p-10 rounded-sm bg-flow-bg border border-flow-border hover:border-flow-text/20 hover:shadow-sm transition-all duration-300 flex flex-col sm:flex-row gap-6 sm:items-center relative overflow-hidden"
              >
                <div className="p-5 rounded-sm bg-flow-green/10 border border-flow-green/20 text-flow-green group-hover:bg-flow-green group-hover:text-white transition-all duration-300 shrink-0">
                  <Icon className="h-8 w-8" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-flow-text tracking-tight transition-colors">
                    {title}
                  </h3>
                  <p className="text-base md:text-lg text-flow-text/70 leading-relaxed font-normal">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
