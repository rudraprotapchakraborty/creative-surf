"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

import { useIntroDone } from "@/lib/intro";
import { EASE } from "./shared";
import HeroBackdrop3D from "./HeroBackdrop3D";

/** Services listed under the wordmark, as on the brand banner. */
const SERVICES = [
  "Digital Marketing",
  "Branding",
  "Content",
  "Web",
  "Real Estate Listings",
  "Film",
];

const WORDMARK = [
  { text: "Creative", tone: "var(--hero-blue)" },
  { text: "Surf", tone: "var(--hero-cyan)" },
];

/**
 * Per-character reveal. Each glyph swings up out of the water on its own axis
 * with a little depth, so the lockup assembles rather than fades — the effect
 * only reads if the characters are separate elements, hence the split.
 */
function Wordmark({ still, ready }: { still: boolean; ready: boolean }) {
  let index = 0;
  return (
    <h1
      className="relative flex flex-nowrap justify-center whitespace-nowrap gap-x-[0.26em] font-extrabold tracking-tight"
      style={{ fontSize: "clamp(2.7rem, 8.2vw, 7.5rem)", lineHeight: 1.02, perspective: "900px" }}
    >
      {WORDMARK.map((word) => (
        <span key={word.text} className="inline-flex" style={{ transformStyle: "preserve-3d" }}>
          {word.text.split("").map((char) => {
            const i = index++;
            return (
              <motion.span
                key={`${char}-${i}`}
                className="inline-block will-change-transform"
                style={{ color: word.tone, transformOrigin: "50% 100%" }}
                initial={still ? false : { opacity: 0, y: "0.5em", rotateX: -85 }}
                animate={ready ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
                transition={{ duration: 1, ease: EASE, delay: 0.1 + i * 0.045 }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const still = !!useReducedMotion();
  // Entrances start as the intro curtain lifts, not hidden behind it.
  const ready = useIntroDone() || still;
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    // The SVG swell is the base layer; it hides once the canvas is live so the
    // two don't stack into a muddy double horizon.
    const id = window.setTimeout(() => {
      try {
        const c = document.createElement("canvas");
        setWebgl(Boolean(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl"))));
      } catch {
        setWebgl(false);
      }
    }, 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--hero-bg)" }}
    >
      {/* ---- Atmosphere: two brand glows breathing behind the mark ---- */}
      <div
        aria-hidden
        className="absolute pointer-events-none rounded-full animate-breathe-a will-change-transform"
        style={{
          width: "62vw",
          height: "62vw",
          top: "-24vw",
          left: "-16vw",
          background: "radial-gradient(circle, var(--hero-glow-1), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none rounded-full animate-breathe-b will-change-transform"
        style={{
          width: "54vw",
          height: "54vw",
          top: "-18vw",
          right: "-18vw",
          background: "radial-gradient(circle, var(--hero-glow-2), transparent 70%)",
        }}
      />

      {/* ---- The ocean. Real geometry, real normals, real light.
              Anchored to the lower half and masked at the top so the horizon
              sits below the copy — water behind the words, never over them. ---- */}
      <div
        className="absolute inset-x-0 bottom-0 h-[64%] pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 16%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 16%, black 100%)",
        }}
      >
        <HeroBackdrop3D ready={ready} />
      </div>

      {/* ---- SVG swell: the permanent base layer. It carries the hero on its
              own when WebGL is unavailable, and steps aside when it isn't. ---- */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[58%] pointer-events-none"
        aria-hidden
        animate={{ opacity: webgl ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <svg viewBox="0 0 1280 460" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="swell-deep" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--hero-swell-deep-1)" />
              <stop offset="50%" stopColor="var(--hero-swell-deep-2)" />
              <stop offset="100%" stopColor="var(--hero-swell-deep-3)" />
            </linearGradient>
            <linearGradient id="swell-foam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--hero-swell-foam)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--hero-swell-foam)" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path
            d="M0,210 C200,140 360,300 640,268 C900,238 1080,120 1280,178 L1280,460 L0,460 Z"
            fill="url(#swell-deep)"
            opacity="0.5"
          />
          <path
            d="M0,372 C200,342 400,418 640,400 C880,382 1060,316 1280,342 L1280,460 L0,460 Z"
            fill="url(#swell-foam)"
            opacity="var(--hero-swell-foam-op)"
          />
        </svg>
      </motion.div>

      {/* Light shafts raking down across the water — the one purely painterly
          layer, kept on screen blend so it lifts rather than tints. */}
      {!still && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-screen animate-shafts will-change-transform"
          style={{
            background:
              "linear-gradient(102deg, transparent 38%, var(--hero-sheen) 46%, transparent 52%, transparent 66%, var(--hero-sheen) 72%, transparent 78%)",
            opacity: 0.25,
          }}
        />
      )}

      {/* Scrim: the copy sits where sky meets water, and water is the one part
          of the backdrop whose brightness we don't control. This keeps contrast
          under the tagline without visibly tinting the scene. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[18%] h-[52%] pointer-events-none"
        style={{ background: "radial-gradient(60% 60% at 50% 45%, var(--hero-scrim), transparent 72%)" }}
      />

      {/* ---- Content ---- */}
      <div
        className="relative z-10 section-px w-full mx-auto max-w-5xl pt-32 sm:pt-36 pb-32 flex flex-col items-center text-center"
      >
        <div className="relative">
          <Wordmark still={still} ready={ready} />

          {/* Light sweep across the glyphs, long after they land. */}
          {!still && (
            <motion.span
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 42%, var(--hero-sheen) 50%, transparent 58%)",
                mixBlendMode: "overlay",
              }}
              initial={{ x: "-130%" }}
              animate={ready ? { x: "130%" } : undefined}
              transition={{ duration: 2.6, ease: EASE, delay: 1.4, repeat: Infinity, repeatDelay: 7 }}
            />
          )}
        </div>

        <motion.p
          initial={still ? false : { opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
          className="mt-5 font-medium tracking-tight"
          style={{ color: "var(--hero-ink)", fontSize: "clamp(1.15rem, 3vw, 2.2rem)" }}
        >
          Surfing Growth with{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(100deg, var(--hero-blue), var(--hero-cyan))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            AI-Powered Creativity.
          </span>
        </motion.p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {SERVICES.map((s, i) => (
            <motion.li
              key={s}
              initial={still ? false : { opacity: 0, y: 16, scale: 0.96 }}
              animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ duration: 0.6, ease: EASE, delay: 0.6 + i * 0.05 }}
              className="rounded-full px-4 py-1.5 text-[13px] sm:text-sm font-semibold"
              style={{
                color: "var(--hero-chip-text)",
                background: "var(--hero-chip-bg)",
                border: "1px solid var(--hero-chip-border)",
                boxShadow: "var(--hero-chip-shadow)",
              }}
            >
              {s}
            </motion.li>
          ))}
        </ul>

        <motion.span
          initial={still ? false : { opacity: 0, scaleX: 0 }}
          animate={ready ? { opacity: 1, scaleX: 1 } : undefined}
          transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
          className="mt-10 block h-[3px] w-24 rounded-full"
          style={{ background: "linear-gradient(90deg, var(--hero-blue), var(--hero-cyan))" }}
          aria-hidden
        />

        <motion.div
          initial={still ? false : { opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: 0.95 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="focus-ring group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-95"
            style={{
              backgroundImage: "linear-gradient(105deg, var(--hero-blue), var(--hero-cyan))",
              boxShadow: "0 14px 34px rgb(var(--accent-1) / 0.34)",
            }}
          >
            Start a Project
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#projects"
            className="focus-ring group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors"
            style={{
              color: "var(--hero-ink)",
              background: "var(--hero-chip-bg)",
              border: "1px solid var(--hero-chip-border)",
            }}
          >
            See our work
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={still ? false : { opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="pointer-events-none absolute z-10 left-1/2 -translate-x-1/2 bottom-6 sm:bottom-8"
      >
        <span
          className="grid place-items-center w-9 h-9 rounded-full animate-bob"
          style={{
            color: "var(--hero-blue)",
            background: "var(--hero-chip-bg)",
            border: "1px solid var(--hero-chip-border)",
          }}
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </span>
      </motion.div>

      {/* Fine grain — takes the digital edge off the gradients. */}
      <div className="absolute inset-0 bg-grain opacity-[0.05] pointer-events-none mix-blend-overlay" aria-hidden />
    </section>
  );
}
