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
  ArrowUpRight,
} from "lucide-react";
import WaveBackdrop from "./WaveBackdrop";

const services = [
  { title: "Graphics Design", description: "High-impact visuals blending art direction with precision.", icon: PenTool },
  { title: "Content Marketing", description: "Strategic storytelling to connect deeply with your audience.", icon: FileText },
  { title: "Video Editing", description: "Cinematic edits with seamless motion and narrative clarity.", icon: Video },
  { title: "Website Development", description: "Immersive, high-performance web experiences.", icon: Globe },
  { title: "OVC/TVC", description: "Premium commercials for maximum brand impact.", icon: Tv },
  { title: "SEO & Social Media", description: "Boost your visibility with precision SEO and campaigns.", icon: Search },
  { title: "Media Buying", description: "Optimized ad spend to maximize ROI.", icon: Target },
  { title: "Digital Branding", description: "Crafting cohesive digital identities for lasting impressions.", icon: Users },
];

export default function ServicesSection() {
  const containerRef = useRef(null);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-flow-bg text-flow-text overflow-hidden border-t border-flow-border"
    >
      <WaveBackdrop id="svc-wave" corner="tl" size="sm" opacity={0.65} />

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aurora-blob aurora-3 w-[30vw] h-[30vw] bottom-[10vh] right-[5vw] opacity-30 animate-aurora-alt" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 bg-grid-fine mask-radial-tl pointer-events-none opacity-50" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-14 lg:gap-24 relative">
          {/* Sticky title */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-1 mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-aurora-1" />
                Our Expertise
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-[2.25rem] sm:text-[3rem] md:text-5xl lg:text-[5.5rem] font-heading font-extrabold tracking-[-0.05em] text-flow-text leading-[1.0]"
              >
                Built<br />
                <span className="text-aurora italic">to scale.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="mt-6 text-flow-textSoft font-normal text-lg md:text-xl leading-relaxed max-w-sm"
              >
                Comprehensive digital solutions engineered for growth and aesthetic supremacy.
              </motion.p>
            </div>
          </div>

          {/* Cards */}
          <div className="lg:w-2/3 flex flex-col gap-5">
            {services.map(({ title, description, icon: Icon }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.05, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="conic-ring group p-7 md:p-9 rounded-2xl glass border border-flow-border flex flex-col sm:flex-row gap-6 sm:items-center relative overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-0 bg-aurora-soft opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-aurora-grad rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity" />
                  <div className="relative p-5 rounded-xl bg-aurora-grad text-white">
                    <Icon className="h-7 w-7" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex-1 relative">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-flow-text tracking-tight transition-colors">
                    {title}
                  </h3>
                  <p className="text-base md:text-lg text-flow-textSoft leading-relaxed font-normal">
                    {description}
                  </p>
                </div>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                  <div className="p-2 rounded-full bg-flow-cardSolid border border-flow-borderStrong">
                    <ArrowUpRight className="h-4 w-4 text-aurora-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
