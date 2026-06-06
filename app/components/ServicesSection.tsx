"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  PenTool, FileText, Video, Globe, Tv,
  Search, Target, Users, ChevronRight,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const services = [
  {
    title: "Graphics Design",
    description: "High-impact visuals blending art direction with precision — brand identity, campaign assets, and everything in between.",
    icon: PenTool,
    tags: ["Brand Identity", "Print", "Digital"],
  },
  {
    title: "Content Marketing",
    description: "Strategic storytelling that builds authority, drives organic traffic, and converts browsers into loyal buyers.",
    icon: FileText,
    tags: ["Strategy", "Copywriting", "Distribution"],
  },
  {
    title: "Video Editing",
    description: "Cinematic edits with seamless motion and narrative clarity — from short-form reels to full brand films.",
    icon: Video,
    tags: ["Reels", "Ad Films", "Brand Videos"],
  },
  {
    title: "Website Development",
    description: "High-performance web experiences engineered for conversion and built to scale as your business grows.",
    icon: Globe,
    tags: ["Next.js", "React", "E-commerce"],
  },
  {
    title: "OVC / TVC",
    description: "Premium television and online video commercials that communicate your brand's value with maximum impact.",
    icon: Tv,
    tags: ["Commercials", "Broadcast", "Online"],
  },
  {
    title: "SEO & Social Media",
    description: "Precision SEO and social campaigns that compound your visibility and bring high-intent audiences directly to you.",
    icon: Search,
    tags: ["SEO", "Paid Social", "Analytics"],
  },
  {
    title: "Media Buying",
    description: "Optimised ad spend across every channel — making every dollar work harder so your ROI compounds over time.",
    icon: Target,
    tags: ["Google Ads", "Meta", "Programmatic"],
  },
  {
    title: "Digital Branding",
    description: "Cohesive digital identities for lasting impressions — visual systems, brand voice, and positioning that stick.",
    icon: Users,
    tags: ["Strategy", "Visual Identity", "Voice"],
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative bg-flow-bg text-flow-text overflow-hidden border-t border-flow-border"
    >
      {/* Section header */}
      <div className="px-6 sm:px-10 lg:px-20 xl:px-28 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-aurora-1" />
              Our Expertise
            </span>
            <h2
              className="font-bold text-flow-text leading-tight"
              style={{ fontSize: "clamp(2rem,3.5vw,3.25rem)" }}
            >
              What we do<br />
              <span className="text-aurora">exceptionally well.</span>
            </h2>
          </div>
          <p className="text-flow-textSoft text-base max-w-xs leading-relaxed md:text-right">
            Eight disciplines. One integrated team. Every service built to compound your growth.
          </p>
        </motion.div>
      </div>

      {/* Editorial numbered rows */}
      <div>
        {services.map(({ title, description, icon: Icon, tags }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.04 }}
            className="group relative flex items-start gap-3 sm:gap-8 lg:gap-14 px-4 sm:px-10 lg:px-20 xl:px-28 py-6 sm:py-9 border-t border-flow-border cursor-default transition-colors duration-300 hover:bg-flow-surface"
          >
            {/* Hover left accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top rounded-r-full"
              style={{ background: "linear-gradient(180deg, rgb(var(--accent-1)), transparent)" }}
            />

            {/* Watermark number — hidden on mobile */}
            <span
              className="hidden sm:block flex-shrink-0 font-black leading-none select-none"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                color: "rgb(var(--accent-1) / 0.10)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Icon chip */}
            <div
              className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110"
              style={{
                background: "rgb(var(--accent-1) / 0.10)",
                border: "1px solid rgb(var(--accent-1) / 0.20)",
              }}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "rgb(var(--accent-1))" }} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 pt-0.5 lg:flex lg:items-start lg:gap-10">
              <div className="lg:w-56 flex-shrink-0 mb-2 lg:mb-0">
                <h3 className="font-bold text-flow-text text-base sm:text-lg mb-2 group-hover:text-aurora-1 transition-colors duration-300">
                  {title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgb(var(--accent-1) / 0.08)",
                        color: "rgb(var(--accent-2) / 0.9)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-flow-textSoft text-sm sm:text-[0.95rem] leading-relaxed flex-1 mt-2 lg:mt-0">
                {description}
              </p>
            </div>

            <ChevronRight
              className="hidden sm:block flex-shrink-0 mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-aurora-1"
              size={20}
            />
          </motion.div>
        ))}
        <div className="border-t border-flow-border mx-6 sm:mx-10 lg:mx-20 xl:mx-28" />
      </div>
    </section>
  );
}
