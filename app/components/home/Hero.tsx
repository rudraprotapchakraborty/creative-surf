"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, TrendingUp, Sparkles, Star } from "lucide-react";

import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";
import { EASE, Kicker, KineticHeading, Magnetic } from "./shared";

export default function Hero() {
  const t = useT(homeMessages);

  const lines = [
    { text: t("hero.headlineLine1"), accent: false },
    { text: t("hero.headlineLine2"), accent: true },
  ];

  const stats = [
    { value: "150+", label: t("hero.stats.projects") },
    { value: "98%", label: t("hero.stats.retention") },
  ];

  return (
    <section
      id="home"
      className="relative w-full flex flex-col bg-flow-bg text-flow-text overflow-hidden"
    >
      {/* Ambient backdrop */}
      <div className="absolute inset-0 bg-aurora-mesh opacity-60 pointer-events-none animate-mesh" />
      <div className="absolute inset-0 bg-grid mask-radial pointer-events-none opacity-30" />
      <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none mix-blend-overlay" />
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

      {/* ---- Content ---- */}
      <div className="relative z-10 section-px w-full mx-auto max-w-7xl pt-32 sm:pt-36 pb-24 sm:pb-28 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center">
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-8"
          >
            <Kicker>{t("hero.eyebrow")}</Kicker>
          </motion.div>

          <KineticHeading
            lines={lines}
            className="mb-6 font-bold leading-[1.03] tracking-tight"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5.4rem)" }}
            delay={0.15}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
            className="text-flow-textSoft text-base sm:text-lg leading-relaxed max-w-lg mb-9"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
            className="flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <Magnetic>
              <Link
                href="/contact"
                className="focus-ring group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white shadow-aurora bg-aurora-grad hover:opacity-95 transition-opacity"
              >
                {t("hero.ctaPrimary")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Magnetic>

            <Magnetic>
              <Link
                href="#services"
                className="focus-ring group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-flow-text glass border border-flow-borderStrong hover:border-aurora-1/40 transition-colors"
              >
                {t("hero.ctaSecondary")}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1 }}
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

        {/* RIGHT — floating growth panel */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          className="relative hidden lg:flex justify-center items-center"
        >
          <div
            className="absolute inset-0 -z-10 rounded-[2rem] blur-3xl opacity-60"
            style={{ background: "radial-gradient(circle at 50% 40%, rgb(var(--accent-2) / 0.28), transparent 70%)" }}
          />

          <motion.div
            animate={{ rotate: [0, 1.2, 0] }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
            className="glass-strong border border-flow-border rounded-[1.75rem] shadow-premium p-7 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className="grid place-items-center w-9 h-9 rounded-xl bg-aurora-grad text-white shadow-aurora">
                  <TrendingUp className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-flow-text">{t("hero.panel.title")}</p>
                  <p className="text-[10px] text-flow-textSoft uppercase tracking-wider">{t("hero.panel.subtitle")}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-aurora-1 bg-aurora-1/10 px-2.5 py-1 rounded-full">
                +143%
              </span>
            </div>

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
                  transition={{ duration: 1.6, ease: EASE, delay: 0.9 }}
                />
                <path
                  d="M0,95 C40,90 60,70 100,72 C140,74 150,40 195,38 C240,36 260,18 320,8 L320,120 L0,120 Z"
                  fill="url(#hero-chart-fill)"
                />
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-flow-border">
              {[
                { k: t("hero.panel.roas"), v: "6.2x" },
                { k: t("hero.panel.leads"), v: "12.4k" },
                { k: t("hero.panel.ctr"), v: "8.9%" },
              ].map((m) => (
                <div key={m.k}>
                  <p className="text-lg font-extrabold text-flow-text tabular-nums leading-none">{m.v}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-flow-textSoft">{m.k}</p>
                </div>
              ))}
            </div>
          </motion.div>

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
              <p className="text-[10px] text-flow-textSoft mt-1">{t("hero.chipRating")}</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
            className="absolute -bottom-6 -left-4 glass-strong border border-flow-border rounded-2xl shadow-soft px-4 py-3 flex items-center gap-2.5"
          >
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-aurora-grad text-white">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <p className="text-sm font-bold text-flow-text leading-none">{t("hero.chipAwardTitle")}</p>
              <p className="text-[10px] text-flow-textSoft mt-1">{t("hero.chipAwardSub")}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="pointer-events-none absolute z-10 left-1/2 -translate-x-1/2 bottom-6 sm:bottom-8 flex flex-col items-center gap-1.5"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="grid place-items-center w-8 h-8 rounded-full glass border border-flow-border text-aurora-1"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.span>
      </motion.div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-flow-bg to-transparent pointer-events-none" />
    </section>
  );
}
