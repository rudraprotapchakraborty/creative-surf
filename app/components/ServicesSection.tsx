"use client";

import React, { useRef, useState, useEffect } from "react";
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
    description:
      "High-impact visuals for brands, blending art direction with precision graphics.",
    icon: PenTool,
    color: "from-cyan-400 to-blue-500",
  },
  {
    title: "Content Marketing",
    description: "Strategic storytelling to connect deeply with your audience.",
    icon: FileText,
    color: "from-fuchsia-400 to-pink-500",
  },
  {
    title: "Video Editing",
    description: "Cinematic edits with seamless motion and narrative clarity.",
    icon: Video,
    color: "from-yellow-300 to-amber-500",
  },
  {
    title: "Website Development",
    description: "Immersive, high-performance web experiences.",
    icon: Globe,
    color: "from-violet-400 to-purple-600",
  },
  {
    title: "OVC/TVC",
    description: "Premium commercials for maximum brand impact.",
    icon: Tv,
    color: "from-purple-400 to-indigo-600",
  },
  {
    title: "SEO & Social Media",
    description: "Boost your visibility with precision SEO and campaigns.",
    icon: Search,
    color: "from-green-400 to-emerald-500",
  },
  {
    title: "Media Buying",
    description: "Optimized ad spend to maximize ROI.",
    icon: Target,
    color: "from-orange-400 to-red-500",
  },
  {
    title: "Digital Branding",
    description: "Crafting cohesive digital identities for lasting impressions.",
    icon: Users,
    color: "from-teal-400 to-cyan-500",
  },
];

const cardVariants = {
  offscreen: { y: 80, opacity: 0, scale: 0.9, filter: "blur(10px)" },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", bounce: 0.4, duration: 1 },
  },
};

export default function ServicesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1.15]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // --- FIX: Only generate particles on client ---
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 30 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      dy: (Math.random() - 0.5) * 40,
      dx: (Math.random() - 0.5) * 40,
      duration: 4 + Math.random() * 4,
      size: Math.random() > 0.5 ? "w-1 h-1" : "w-2 h-2",
      color: Math.random() > 0.5 ? "bg-white/30" : "bg-cyan-400/30 blur-sm",
    }));

    setParticles(generated);
  }, []); // runs only on client

  return (
    <section
      ref={ref}
      className="relative py-28 bg-black text-white overflow-hidden"
    >
      {/* Aurora Background */}
      <motion.div
        className="absolute inset-0 -z-20"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 40%, rgba(56,189,248,0.15) 0%, transparent 70%), radial-gradient(ellipse at 80% 60%, rgba(0,255,255,0.15) 0%, transparent 70%)",
            "radial-gradient(ellipse at 30% 50%, rgba(0,255,255,0.15) 0%, transparent 70%), radial-gradient(ellipse at 70% 50%, rgba(56,189,248,0.15) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${p.size} ${p.color}`}
          style={{ top: p.top, left: p.left }}
          animate={{ x: [0, p.dx], y: [0, p.dy], opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.h2
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="text-6xl sm:text-7xl font-extrabold mb-24 tracking-tight bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent text-center"
        >
          Our Expertise
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map(({ title, description, icon: Icon, color }) => (
            <motion.div
              key={title}
              className="relative group p-8 rounded-3xl backdrop-blur-xl border border-white/10 bg-white/5 shadow-xl cursor-pointer overflow-hidden"
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ rotateX: 8, rotateY: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 transition-all duration-500`}
              />

              <motion.div
                className={`p-5 mb-6 rounded-full bg-gradient-to-br ${color} shadow-xl`}
                whileHover={{ scale: 1.15, rotate: 5 }}
              >
                <Icon className="h-14 w-14 text-white drop-shadow-lg" />
              </motion.div>

              <h3 className="text-2xl font-bold mb-4">{title}</h3>
              <p className="text-white/70 leading-relaxed">{description}</p>

              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ backgroundPosition: ["0 0", "0 100%"] }}
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(transparent, rgba(255,255,255,0.03) 1px, transparent 2px)",
                  backgroundSize: "100% 4px",
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
