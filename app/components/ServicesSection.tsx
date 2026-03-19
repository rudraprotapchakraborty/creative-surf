"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function ServicesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-32 bg-[#06080F] text-white overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 font-sans">
        <motion.div
           style={{ scale: titleScale, opacity: titleOpacity }}
           className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
            Our Expertise
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto font-light text-lg">
            Comprehensive digital solutions engineered for growth and aesthetic supremacy.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map(({ title, description, icon: Icon }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="mb-6 inline-flex p-3 rounded-2xl bg-white/[0.05] text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-transform duration-300 ease-out">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-medium mb-3 text-white/90 group-hover:text-white transition-colors">
                {title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                {description}
              </p>

              {/* Hover Glow */}
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-cyan-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
