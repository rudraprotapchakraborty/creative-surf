"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Code2, PenTool, Search, TrendingUp, type LucideIcon } from "lucide-react";
import { useT } from "@/lib/i18n";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { EASE, SectionHead } from "./shared";

type Step = { title: string; description: string };

/** One icon per step, in message order: Discover, Design, Build, Grow. */
const STEP_ICONS: LucideIcon[] = [Search, PenTool, Code2, TrendingUp];

/**
 * The four steps on a rail that fills as the reader scrolls through them. Each
 * node lights up when the fill reaches it, so the section demonstrates the
 * "momentum" its heading promises instead of just listing four columns.
 *
 * Desktop draws one continuous horizontal rail scrubbed by scroll; small
 * screens stack the steps and join them with vertical segments that fill as
 * each step is reached.
 */
export default function Process() {
  const t = useT(homeExtraMessages);
  const steps = t.raw<Step[]>("process.steps", []);
  const still = useReducedMotion() ?? false;

  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 80%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const [scrolled, setScrolled] = useState(0);
  // Reduced motion skips the scrub and shows every step lit.
  const reached = still ? steps.length : scrolled;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Node i lights once the fill passes its share of the rail.
    const last = Math.max(steps.length - 1, 1);
    setScrolled(Math.min(steps.length, Math.floor(v * last + 0.001) + 1));
  });

  return (
    <section className="relative section-py section-px bg-flow-bg text-flow-text overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-25" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHead
          className="mb-16 sm:mb-20"
          label={t("process.badge")}
          heading={t("process.headingLine1")}
          accent={t("process.headingAccent")}
          subline={t("process.intro")}
        />

        <div ref={railRef} className="relative">
          {/* Desktop rail: from the first node's centre to the last one's.
              With four equal columns and a 2rem gap, a column centre sits at
              12.5% minus 3/8 of the gap from each edge. */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-7 h-px bg-flow-border"
            style={{ left: "calc(12.5% - 12px)", right: "calc(12.5% - 12px)" }}
          >
            <motion.div
              className="absolute inset-0 origin-left bg-aurora-grad"
              style={{ scaleX: still ? 1 : fill, boxShadow: "0 0 14px rgb(var(--accent-2) / 0.6)" }}
            />
          </div>

          <ol className="relative grid grid-cols-1 lg:grid-cols-4 gap-x-8">
            {steps.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? Search;
              const lit = i < reached;
              const isLast = i === steps.length - 1;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                  className="relative flex gap-5 pb-12 lg:pb-0 lg:flex-col lg:items-center lg:text-center"
                >
                  {/* Mobile connector to the next step */}
                  {!isLast && (
                    <span aria-hidden className="lg:hidden absolute left-7 top-14 bottom-0 w-px -translate-x-1/2 bg-flow-border overflow-hidden">
                      <span
                        className="absolute inset-0 origin-top bg-aurora-grad transition-transform duration-700 ease-out"
                        style={{ transform: `scaleY(${i + 1 < reached ? 1 : 0})` }}
                      />
                    </span>
                  )}

                  {/* Node */}
                  <span className="relative z-10 flex-shrink-0">
                    <span
                      className={`grid place-items-center w-14 h-14 rounded-2xl border transition-all duration-500 ${
                        lit
                          ? "border-transparent text-white shadow-[0_12px_30px_-10px_rgb(var(--accent-1)/0.6)]"
                          : "border-flow-border bg-flow-bg text-flow-textSoft"
                      }`}
                      style={lit ? { background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" } : undefined}
                    >
                      <Icon className={`w-5 h-5 transition-transform duration-500 ${lit ? "scale-110" : ""}`} />
                    </span>
                    {/* A ring pulses out once, the moment a node lights. */}
                    {lit && !still && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-2xl border-2"
                        style={{ borderColor: "rgb(var(--accent-2))" }}
                        initial={{ opacity: 0.8, scale: 1 }}
                        animate={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                      />
                    )}
                  </span>

                  <div className="min-w-0 pt-1 lg:pt-7">
                    <span
                      className={`micro tabular-nums transition-colors duration-500 ${lit ? "text-aurora-1" : "text-flow-textSoft/60"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 display-sm text-lg sm:text-xl text-flow-text">{step.title}</h3>
                    <p className="mt-2.5 text-sm text-flow-textSoft leading-relaxed max-w-xs lg:mx-auto">{step.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
