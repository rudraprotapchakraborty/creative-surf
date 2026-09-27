"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Section eyebrow/kicker pill — reused across every homepage section. */
export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-aurora-1">
      <span className="w-1.5 h-1.5 rounded-full bg-aurora-1" />
      {children}
    </span>
  );
}

/** Line-by-line, word-by-word kinetic headline reveal (clip-mask slide-up). */
export function KineticHeading({
  lines,
  className,
  style,
  delay = 0,
}: {
  lines: { text: string; accent?: boolean }[];
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  let wordIndex = 0;
  return (
    <div className={className} style={style}>
      {lines.map((line, li) => (
        <div key={li} className="flex flex-wrap overflow-hidden">
          {line.text.split(" ").map((word, wi) => {
            const i = wordIndex++;
            return (
              <span key={wi} className="inline-block overflow-hidden pt-1 pb-[0.16em] -mb-[0.1em] mr-[0.28em]">
                <motion.span
                  className={`inline-block ${line.accent ? "text-aurora" : ""}`}
                  initial={{ y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.045 }}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** Button that drifts slightly toward the cursor while hovered — desktop only. */
export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.28, y: y * 0.35 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Tilt3D — cursor-driven perspective for the hero's floating panel.
 *
 * Tilt3D establishes the perspective context and publishes the pointer's
 * normalised offset; ParallaxLayer children read it and translate by their own
 * depth, so a flat stack of cards becomes a group of objects at different
 * distances. Pure CSS 3D transforms — no WebGL, no bundle cost.
 * ------------------------------------------------------------------ */

type TiltCtx = { px: MotionValue<number>; py: MotionValue<number>; enabled: boolean };

const TiltContext = createContext<TiltCtx | null>(null);

const TILT_SPRING = { stiffness: 140, damping: 18, mass: 0.5 } as const;

export function Tilt3D({
  children,
  className,
  max = 8,
  perspective = 1200,
}: {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees on each axis. */
  max?: number;
  perspective?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  // Raw −1..1 pointer offset from the element's centre.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, TILT_SPRING);
  const py = useSpring(rawY, TILT_SPRING);

  const enabled = !reduced;

  const rotateY = useTransform(px, [-1, 1], [-max, max]);
  const rotateX = useTransform(py, [-1, 1], [max, -max]);

  // Specular sheen that tracks the tilt, so the glass reads as lit rather than
  // merely rotated.
  const sheenX = useTransform(px, [-1, 1], ["120%", "-20%"]);
  const sheenY = useTransform(py, [-1, 1], ["120%", "-20%"]);
  const sheen = useTransform(
    [sheenX, sheenY],
    ([x, y]: string[]) =>
      `radial-gradient(600px circle at ${x} ${y}, rgb(255 255 255 / 0.35), transparent 60%)`
  );

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawX.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) || 0);
    rawY.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) || 0);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const ctx = useMemo(() => ({ px, py, enabled }), [px, py, enabled]);

  return (
    <TiltContext.Provider value={ctx}>
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        className={className}
        style={{ perspective }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            rotateX: enabled ? rotateX : 0,
            rotateY: enabled ? rotateY : 0,
          }}
        >
          {children}
          {enabled && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-40 mix-blend-overlay"
              style={{ background: sheen }}
            />
          )}
        </motion.div>
      </div>
    </TiltContext.Provider>
  );
}

/**
 * A layer inside Tilt3D. `depth` is how far it floats toward the viewer —
 * higher values move further as the cursor travels.
 */
export function ParallaxLayer({
  children,
  depth = 20,
  className,
  style,
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ctx = useContext(TiltContext);
  const zeroX = useMotionValue(0);
  const zeroY = useMotionValue(0);

  const sourceX = ctx?.px ?? zeroX;
  const sourceY = ctx?.py ?? zeroY;

  const x = useTransform(sourceX, [-1, 1], [depth, -depth]);
  const y = useTransform(sourceY, [-1, 1], [depth * 0.6, -depth * 0.6]);

  return (
    <motion.div
      className={className}
      style={{
        ...style,
        x: ctx?.enabled ? x : 0,
        y: ctx?.enabled ? y : 0,
        translateZ: depth,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
 * Section design system
 *
 * Every homepage section opens the same way: a thin light beam, a quiet
 * micro-label, a large light-weight heading, and an optional muted subline —
 * centred. Consistency in the opener is what makes a long page feel authored
 * rather than assembled, so these primitives exist to stop each section
 * inventing its own header.
 * ------------------------------------------------------------------------ */

/** Thin horizontal light beam — the visual "curtain up" before a section. */
export function Beam({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block h-px w-full max-w-md mx-auto ${className}`}
      style={{
        background:
          "linear-gradient(90deg, transparent, rgb(var(--accent-1) / 0.7), rgb(var(--accent-2) / 0.9), rgb(var(--accent-1) / 0.7), transparent)",
        boxShadow: "0 0 24px 1px rgb(var(--accent-2) / 0.45)",
      }}
    />
  );
}

/**
 * Section opener: beam → label → display heading → subline.
 *
 * `split` sets the heading on the left and the subline (plus any `aside`) on
 * the right, bottom-aligned. Alternating it with the centred opener keeps a
 * long page from reading as the same block eight times over.
 */
export function SectionHead({
  label,
  heading,
  accent,
  subline,
  aside,
  align = "center",
  onDark = false,
  className = "",
}: {
  label?: React.ReactNode;
  heading: React.ReactNode;
  /** Second line, rendered in the brand gradient. */
  accent?: React.ReactNode;
  subline?: React.ReactNode;
  /** Extra content under the subline — split layout only. */
  aside?: React.ReactNode;
  align?: "center" | "split";
  /** Flips the label and subline colours for use on a dark panel. */
  onDark?: boolean;
  className?: string;
}) {
  if (align === "split") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        // With nothing to set beside it, the heading takes the full width.
        className={`grid gap-8 lg:items-end lg:gap-16 ${subline || aside ? "lg:grid-cols-[1.25fr_1fr]" : ""} ${className}`}
      >
        <div className="flex flex-col items-start">
          <Beam className="!mx-0 max-w-[12rem] mb-8" />
          {label && (
            <span className={`micro mb-5 ${onDark ? "text-flow-bg/55" : "text-flow-textSoft"}`}>{label}</span>
          )}
          <h2
            className={`display ${onDark ? "text-flow-bg" : "text-flow-text"}`}
            style={{ fontSize: "clamp(2.1rem, 5vw, 4rem)" }}
          >
            {heading}
            {accent && (
              <>
                <br />
                <span className={onDark ? "text-aurora-shimmer" : "text-aurora"}>{accent}</span>
              </>
            )}
          </h2>
        </div>

        {(subline || aside) && (
          <div className="flex flex-col items-start gap-6 lg:pb-2">
            {subline && (
              <p className={`max-w-md text-base leading-relaxed ${onDark ? "text-flow-bg/60" : "text-flow-textSoft"}`}>
                {subline}
              </p>
            )}
            {aside}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`flex flex-col items-center text-center ${className}`}
    >
      <Beam className="mb-10" />

      {label && (
        <span className={`micro mb-5 ${onDark ? "text-flow-bg/55" : "text-flow-textSoft"}`}>
          {label}
        </span>
      )}

      <h2
        className={`display ${onDark ? "text-flow-bg" : "text-flow-text"}`}
        style={{ fontSize: "clamp(2.1rem, 5vw, 4rem)" }}
      >
        {heading}
        {accent && (
          <>
            <br />
            <span className={onDark ? "text-aurora-shimmer" : "text-aurora"}>{accent}</span>
          </>
        )}
      </h2>

      {subline && (
        <p
          className={`mt-5 max-w-xl text-base leading-relaxed ${
            onDark ? "text-flow-bg/60" : "text-flow-textSoft"
          }`}
        >
          {subline}
        </p>
      )}
    </motion.div>
  );
}

/**
 * Squared call-to-action: a wide label tile with a detached square arrow tile
 * beside it. The split is the point — it reads as a control, not a pill.
 */
export function ActionButton({
  children,
  onDark = false,
  className = "",
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  const face = onDark
    ? "bg-flow-bg text-flow-text"
    : "text-white bg-aurora-grad";

  return (
    <span className={`group inline-flex items-stretch gap-1.5 ${className}`}>
      <span
        className={`inline-flex items-center rounded-xl px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-opacity group-hover:opacity-90 ${face}`}
      >
        {children}
      </span>
      <span
        className={`grid place-items-center w-[3.25rem] rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5 ${face}`}
      >
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </span>
  );
}

/**
 * A stat like "2,400+" or "94%" that counts up from zero the first time it
 * scrolls into view. The number is parsed out of the string, so the copy stays
 * the single source of truth; anything unparseable renders as-is.
 */
export function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const still = useReducedMotion() ?? false;
  const match = value.match(/^(\D*)([\d,.]+)(.*)$/);
  const target = match ? parseFloat(match[2].replace(/,/g, "")) : NaN;
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;
  const grouped = !!match && match[2].includes(",");
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;
    if (still) {
      setShown(target);
      return;
    }
    const controls = animate(0, target, { duration, ease: EASE, onUpdate: setShown });
    return () => controls.stop();
  }, [inView, target, duration, still]);

  if (!match || Number.isNaN(target)) return <span>{value}</span>;

  const text = shown.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  });

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>
        {match[1]}
        {text}
        {match[3]}
      </span>
    </span>
  );
}
