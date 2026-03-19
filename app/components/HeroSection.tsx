"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import MouseParticles from "@/components/MouseParticles";

export default function HeroSection() {
  const words1 = "Transform Your".split(" ");
  const words2 = "Digital Presence".split(" ");

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
    hidden: { y: "150%", opacity: 0, rotateZ: 5 },
    visible: {
      y: "0%",
      opacity: 1,
      rotateZ: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.6 }
    },
  };

  return (
    <section id="home" className="relative min-h-[95vh] w-full flex items-center justify-center px-6 pt-32 pb-24 bg-flow-bg text-flow-text overflow-hidden selection:bg-flow-green/20 selection:text-flow-text">
      <MouseParticles />

      {/* Sharp Vector Waves (Flow Agency Style) - Bottom Right Corner */}
      <div className="absolute bottom-0 right-0 w-[120vw] md:w-[80vw] lg:w-[70vw] h-[120vw] md:h-[80vw] lg:h-[70vw] max-w-[1200px] max-h-[1200px] overflow-hidden pointer-events-none z-0">
        <motion.svg
          viewBox="0 0 500 500"
          preserveAspectRatio="xMidYMax slice"
          className="absolute bottom-0 right-0 w-full h-full object-cover origin-bottom-right"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Base Wave */}
          <path
            d="M 500,500 L 0,500 C 100,400 150,300 300,350 C 400,380 450,200 500,100 Z"
            className="fill-flow-blob3 transition-colors"
          />
          {/* Middle Wave */}
          <path
            d="M 500,500 L 50,500 C 150,450 250,350 350,400 C 420,430 480,250 500,150 Z"
            className="fill-flow-blob2 transition-colors"
          />
          {/* Top Wave */}
          <path
            d="M 500,500 L 150,500 C 250,480 320,400 400,450 C 450,480 480,300 500,220 Z"
            className="fill-flow-blob1 transition-colors"
          />
        </motion.svg>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-start lg:items-start pl-0 lg:pl-[5%]">

        <div className="flex flex-col items-start lg:text-left max-w-5xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-flow-card border border-flow-border text-sm font-semibold text-flow-text tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-flow-green" />
              Premium Digital Solutions
            </span>
          </motion.div>

          {/* Title with Organic Flow Agency Aesthetic */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 space-y-2 lg:space-y-4 flex flex-col items-start select-none"
          >
            <div className="flex flex-wrap lg:justify-start overflow-hidden w-full">
              {words1.map((word, index) => (
                <div key={index} className="overflow-hidden pb-1 pr-3 lg:pr-4">
                  <motion.h1
                    variants={wordVariants}
                    className="text-[2.75rem] sm:text-[3.5rem] md:text-6xl lg:text-[6.5rem] font-heading font-extrabold tracking-[-0.04em] text-flow-text leading-[1.05]"
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
                    className="text-[2.75rem] sm:text-[3.5rem] md:text-6xl lg:text-[6.5rem] font-heading font-extrabold tracking-[-0.04em] text-flow-text leading-[1.05]"
                  >
                    {word}&nbsp;
                  </motion.h1>
                  {/* Custom Thick Marker Underline on "Digital" */}
                  {word === "Digital" && (
                    <motion.svg
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                      viewBox="0 0 200 24"
                      className="absolute -bottom-1 md:-bottom-2 left-0 w-[105%] h-auto text-flow-green z-[-1] opacity-90"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M 5,8 Q 60,0 110,10 T 195,6" strokeWidth="8" />
                      <path d="M 10,16 Q 70,8 120,18 T 190,14" strokeWidth="6" />
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
            className="mt-4 text-lg md:text-2xl text-flow-text/80 max-w-3xl font-normal leading-relaxed mb-12"
          >
            We help modern businesses create meaningful connections through fluid design,
            strong branding, and high-performance digital strategy.
          </motion.p>

          {/* CTA Buttons - Flat B2B Style */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6 w-full sm:w-auto"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-flow-green text-white rounded-none md:rounded-sm font-semibold text-lg hover:bg-flow-buttonHover transition-colors cursor-pointer"
            >
              Start a Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-10 py-5 rounded-none md:rounded-sm font-extrabold shadow-sm text-lg text-flow-text border-[1.5px] border-flow-border bg-flow-card hover:border-flow-text/20 transition-colors text-center cursor-pointer"
            >
              View Our Work
            </motion.a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
