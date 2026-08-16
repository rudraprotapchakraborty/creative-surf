"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

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
              <span key={wi} className="inline-block overflow-hidden py-1 mr-[0.28em]">
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
