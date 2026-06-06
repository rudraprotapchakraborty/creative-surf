"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Building2, Clock } from "lucide-react"

const G = "#B8892A"
const N = "#080F1A"

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function ProjectsPage() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ fontFamily: "var(--font-re)", backgroundColor: N }}
    >
      {/* background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/real-estate-reimagined.png"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${N}80 0%, ${N} 70%)` }} />
      </div>

      {/* floating ring decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ border: `1px solid ${G}12` }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ border: `1px solid ${G}18` }} />

      {/* content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">

        {/* icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
          style={{ background: `${G}15`, border: `1px solid ${G}40` }}
        >
          <Building2 className="w-9 h-9" style={{ color: G }} />
        </motion.div>

        {/* label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="flex items-center gap-2 mb-6"
        >
          <Clock className="w-3.5 h-3.5" style={{ color: G }} />
          <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: G }}>Coming Soon</span>
        </motion.div>

        {/* heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="font-bold text-white leading-tight mb-6"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          Projects Showcase<br />
          <span style={{ color: G }}>Launching Soon</span>
        </motion.h1>

        {/* description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          className="text-white/50 text-base leading-relaxed mb-10 max-w-md"
        >
          We're curating a premium portfolio of Dhaka's finest real estate developments.
          Check back soon to explore verified listings from our developer partners.
        </motion.p>

        {/* divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          className="h-px w-16 mb-10 origin-center"
          style={{ background: G }}
        />

        {/* mock project cards — blurred placeholders */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          className="grid grid-cols-3 gap-3 mb-10 w-full max-w-sm"
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-xl blur-[2px] opacity-30"
              style={{
                background: `linear-gradient(135deg, ${G}30, ${G}10)`,
                border: `1px solid ${G}25`,
              }}
            />
          ))}
        </motion.div>

        {/* back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link
            href="/real-estate"
            className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: `${G}90` }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Real Estate
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
