"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import MouseParticles from "@/components/MouseParticles";
import OceanScene from "./OceanScene";

export default function HeroSection() {
  const words1 = "Transform Your".split(" ");
  const words2 = ["Digital", "Presence"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "120%", opacity: 0, rotateZ: 4 },
    visible: {
      y: "0%",
      opacity: 1,
      rotateZ: 0,
      transition: { type: "spring", stiffness: 180, damping: 22 },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 22, delay: 0.6 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[80vh] md:min-h-[72vh] w-full flex flex-col md:items-center md:justify-center px-5 sm:px-6 pt-24 md:pt-28 pb-0 md:pb-12 bg-flow-bg text-flow-text overflow-hidden"
    >
      <MouseParticles />

      {/* Soft sky-glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aurora-blob aurora-1 w-[55vw] h-[55vw] -top-[15vw] -left-[10vw] opacity-50 animate-aurora" />
        <div className="aurora-blob aurora-3 w-[45vw] h-[45vw] top-[20vh] right-[5vw] opacity-40 animate-aurora-alt" />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 bg-grid mask-radial pointer-events-none opacity-50" />

      {/* Subtle grain */}
      <div className="absolute inset-0 bg-grain opacity-[0.06] pointer-events-none mix-blend-overlay" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start lg:items-start pointer-events-none">
        <div className="flex flex-col items-start lg:text-left max-w-5xl pointer-events-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-5"
          >
            <span className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-flow-border text-sm font-semibold text-flow-text tracking-wide shadow-soft overflow-hidden">
              <span
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(var(--accent-1) / 0.12), rgb(var(--accent-2) / 0.08), rgb(var(--accent-3) / 0.14))",
                }}
              />
              <span className="relative flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-aurora-2 opacity-80 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-aurora-1" />
                </span>
                <Sparkles className="w-4 h-4 text-aurora-1" />
                Premium Digital Solutions
              </span>
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-6 space-y-1 lg:space-y-2 flex flex-col items-start select-none"
          >
            <div className="flex flex-wrap lg:justify-start overflow-hidden w-full">
              {words1.map((word, index) => (
                <div key={index} className="overflow-hidden pb-1 pr-3 lg:pr-4">
                  <motion.h1
                    variants={wordVariants}
                    className="text-[2.375rem] sm:text-[2.875rem] md:text-[3.25rem] lg:text-[4.625rem] xl:text-[5.375rem] font-heading font-extrabold tracking-[-0.05em] text-flow-text leading-[0.95]"
                  >
                    {word}&nbsp;
                  </motion.h1>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap lg:justify-start overflow-hidden w-full relative">
              {words2.map((word, index) => (
                <div key={index} className="overflow-hidden pb-2 pr-3 lg:pr-4 relative">
                  <motion.h1
                    variants={wordVariants}
                    className={`text-[2.375rem] sm:text-[2.875rem] md:text-[3.25rem] lg:text-[4.625rem] xl:text-[5.375rem] font-heading font-extrabold tracking-[-0.05em] leading-[0.95] ${
                      word === "Digital" ? "text-aurora-shimmer italic" : "text-flow-text"
                    }`}
                  >
                    {word}&nbsp;
                  </motion.h1>
                  {word === "Digital" && (
                    <motion.svg
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.1, delay: 1.1, ease: "easeOut" }}
                      viewBox="0 0 200 24"
                      className="absolute -bottom-1 md:-bottom-2 left-0 w-[105%] h-auto z-[-1] opacity-90"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <defs>
                        <linearGradient id="oceanStroke" x1="0" x2="1" y1="0" y2="0">
                          <stop offset="0%" stopColor="rgb(var(--accent-1))" />
                          <stop offset="50%" stopColor="rgb(var(--accent-2))" />
                          <stop offset="100%" stopColor="rgb(var(--accent-3))" />
                        </linearGradient>
                      </defs>
                      <path d="M 5,8 Q 60,0 110,10 T 195,6" stroke="url(#oceanStroke)" strokeWidth="8" />
                      <path d="M 10,16 Q 70,8 120,18 T 190,14" stroke="url(#oceanStroke)" strokeWidth="6" opacity="0.6" />
                    </motion.svg>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-base md:text-lg text-flow-textSoft max-w-2xl font-normal leading-relaxed mb-7"
          >
            We help modern businesses create meaningful connections through fluid design,
            strong branding, and high-performance digital strategy.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center gap-4 lg:gap-5 w-full sm:w-auto"
          >
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="shine relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-white rounded-full font-semibold text-base md:text-lg shadow-aurora overflow-hidden group cursor-pointer"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, rgb(var(--accent-1)), rgb(var(--accent-2)) 60%, rgb(var(--accent-1)))",
                backgroundSize: "200% auto",
              }}
            >
              <span className="relative flex items-center gap-3">
                Start a Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-base md:text-lg text-flow-text border border-flow-borderStrong glass hover:border-aurora-1/50 transition-all text-center cursor-pointer"
            >
              View Our Work
            </motion.a>
          </motion.div>

        </div>
      </div>

      {/*
        Continuous parallax ocean + interactive surfer.
        On mobile this renders BELOW the CTAs as part of the flex flow,
        becoming the closing band of the hero (with surfer + trick HUD).
        On md+ the inner OceanScene root re-positions itself absolutely
        to fill the bottom of the section as a backdrop behind the content.
      */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative w-full mt-8 md:mt-0 md:absolute md:inset-0"
      >
        <OceanScene />
      </motion.div>

      {/* Bottom fade-out (desktop only — mobile waves end at the section edge) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-flow-bg to-transparent pointer-events-none hidden md:block" />
    </section>
  );
}
