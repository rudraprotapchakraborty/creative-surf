"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import WaveBackdrop from "./WaveBackdrop";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const lines = [
  { text: "Transform Your", accent: false },
  { text: "Digital Presence.", accent: true },
];

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Retention" },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] w-full flex items-center px-5 sm:px-10 lg:px-20 xl:px-28 pt-32 pb-20 md:pb-24 bg-flow-bg text-flow-text overflow-hidden"
    >
      {/* ---- Ambient backdrop (non-interactive) ---- */}
      <div className="absolute inset-0 bg-aurora-mesh opacity-60 pointer-events-none animate-mesh" />
      <div className="absolute inset-0 bg-grid mask-radial pointer-events-none opacity-30" />
      <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none mix-blend-overlay" />

      {/* Soft aurora accent — top left */}
      <div
        className="absolute pointer-events-none rounded-full animate-aurora"
        style={{
          width: "42vw",
          height: "42vw",
          top: "-16vw",
          left: "-10vw",
          background: "radial-gradient(circle, rgb(var(--accent-1) / 0.18), transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* On-brand animated ocean swell — bottom right, ambient */}
      <WaveBackdrop corner="br" size="lg" opacity={0.5} showTop id="hero-wave" />

      {/* ---- Content grid ---- */}
      <div className="relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center">
        {/* LEFT — copy */}
        <div className="flex flex-col items-start">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full glass border border-flow-border"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-aurora-1" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-aurora-1">
              Creative Surf · Digital Agency
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-6">
            {lines.map(({ text, accent }, i) => (
              <motion.h1
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.15 }}
                className="block font-bold leading-[1.04] tracking-tight"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.4rem)" }}
              >
                {accent ? <span className="text-aurora">{text}</span> : text}
              </motion.h1>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            className="text-flow-textSoft text-base sm:text-lg leading-relaxed max-w-lg mb-9"
          >
            We help businesses build meaningful digital brands through strategic
            design, performance marketing, and measurable results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
            className="flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <Link
              href="/contact"
              className="focus-ring group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white shadow-aurora bg-aurora-grad hover:opacity-95 transition-opacity"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="#services"
              className="focus-ring group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-flow-text glass border border-flow-borderStrong hover:border-aurora-1/40 transition-colors"
            >
              See our services
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
            className="mt-12 flex items-center gap-8 sm:gap-10"
          >
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-8 sm:gap-10">
                {i > 0 && <span className="h-9 w-px bg-flow-border" />}
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-extrabold text-flow-text tabular-nums leading-none">
                    {s.value}
                  </span>
                  <span className="mt-1.5 text-[11px] sm:text-xs font-medium text-flow-textSoft">
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — premium "results" visual */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          className="relative hidden lg:flex justify-center items-center"
        >
          {/* glow behind panel */}
          <div
            className="absolute inset-0 -z-10 rounded-[2rem] blur-3xl opacity-60"
            style={{ background: "radial-gradient(circle at 50% 40%, rgb(var(--accent-2) / 0.28), transparent 70%)" }}
          />

          {/* Main growth panel */}
          <div className="glass-strong border border-flow-border rounded-[1.75rem] shadow-premium p-7 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className="grid place-items-center w-9 h-9 rounded-xl bg-aurora-grad text-white shadow-aurora">
                  <TrendingUp className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-flow-text">Campaign Performance</p>
                  <p className="text-[10px] text-flow-textSoft uppercase tracking-wider">Last 6 months</p>
                </div>
              </div>
              <span className="text-xs font-bold text-aurora-1 bg-aurora-1/10 px-2.5 py-1 rounded-full">
                +143%
              </span>
            </div>

            {/* Mini chart */}
            <div className="relative h-32 mb-2">
              <svg viewBox="0 0 320 120" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                  <linearGradient id="hero-chart-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(var(--accent-2))" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="rgb(var(--accent-2))" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0,95 C40,90 60,70 100,72 C140,74 150,40 195,38 C240,36 260,18 320,8"
                  fill="none"
                  stroke="rgb(var(--accent-1))"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, ease: EASE, delay: 0.8 }}
                />
                <path
                  d="M0,95 C40,90 60,70 100,72 C140,74 150,40 195,38 C240,36 260,18 320,8 L320,120 L0,120 Z"
                  fill="url(#hero-chart-fill)"
                />
              </svg>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-flow-border">
              {[
                { k: "ROAS", v: "6.2x" },
                { k: "Leads", v: "12.4k" },
                { k: "CTR", v: "8.9%" },
              ].map((m) => (
                <div key={m.k}>
                  <p className="text-lg font-extrabold text-flow-text tabular-nums leading-none">{m.v}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-flow-textSoft">{m.k}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating chip — top right */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            className="absolute -top-5 -right-2 glass-strong border border-flow-border rounded-2xl shadow-soft px-4 py-3 flex items-center gap-2.5"
          >
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-aurora-warm/15">
              <Star className="w-4 h-4 text-aurora-warm fill-aurora-warm" />
            </span>
            <div>
              <p className="text-sm font-bold text-flow-text leading-none">4.9/5</p>
              <p className="text-[10px] text-flow-textSoft mt-1">Client rating</p>
            </div>
          </motion.div>

          {/* Floating chip — bottom left */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
            className="absolute -bottom-6 -left-4 glass-strong border border-flow-border rounded-2xl shadow-soft px-4 py-3 flex items-center gap-2.5"
          >
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-aurora-grad text-white">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <p className="text-sm font-bold text-flow-text leading-none">Award-winning</p>
              <p className="text-[10px] text-flow-textSoft mt-1">Creative team</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-flow-bg to-transparent pointer-events-none" />
    </section>
  );
}
