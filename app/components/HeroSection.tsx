"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import MouseParticles from "@/components/MouseParticles";
import OceanScene from "./OceanScene";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const lines = [
  { text: "Transform Your", accent: false },
  { text: "Digital Presence.", accent: true },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] md:min-h-[85vh] w-full flex flex-col px-5 sm:px-10 lg:px-20 xl:px-28 pt-24 sm:pt-28 md:pt-32 pb-0 md:pb-16 bg-flow-bg text-flow-text overflow-hidden"
    >
      <MouseParticles />

      {/* Restrained background texture */}
      <div className="absolute inset-0 bg-grid mask-radial pointer-events-none opacity-35" />
      <div className="absolute inset-0 bg-grain opacity-[0.05] pointer-events-none mix-blend-overlay" />

      {/* Single subtle aurora accent — top left */}
      <div
        className="absolute pointer-events-none rounded-full animate-aurora"
        style={{
          width: "40vw",
          height: "40vw",
          top: "-15vw",
          left: "-8vw",
          background: "radial-gradient(circle, rgb(var(--accent-1) / 0.18), transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Content — pointer-events-none wrapper so OceanScene stays interactive */}
      <div className="relative z-10 flex flex-col items-start pointer-events-none">
        <div className="flex flex-col items-start pointer-events-auto">

          {/* Tag — editorial label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="w-5 h-[2px]" style={{ background: "rgb(var(--accent-1))" }} />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: "rgb(var(--accent-1))" }}
            >
              Creative Surf · Digital Agency
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-5">
            {lines.map(({ text, accent }, i) => (
              <motion.h1
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.15 }}
                className="block font-bold leading-[1.05]"
                style={{
                  fontSize: "clamp(2rem, 3.8vw, 3.8rem)",
                  color: accent ? "rgb(var(--accent-1))" : undefined,
                }}
              >
                {text}
              </motion.h1>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            className="text-flow-textSoft text-base leading-relaxed max-w-md mb-8"
          >
            We help businesses build meaningful digital brands through strategic
            design, performance marketing, and measurable results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
            className="flex flex-wrap items-center gap-5"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white shadow-aurora"
              style={{
                background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))",
              }}
            >
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="#services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-flow-textSoft hover:text-flow-text transition-colors"
            >
              See our services
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Ocean scene — below content on mobile, absolute backdrop on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative w-full mt-8 md:mt-0 md:absolute md:inset-0"
      >
        <OceanScene />
      </motion.div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-flow-bg to-transparent pointer-events-none hidden md:block" />
    </section>
  );
}
