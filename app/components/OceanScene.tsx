"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";

/**
 * Continuous, parallax ocean scene with an interactive surfer.
 *
 * Tile math
 * ---------
 * - The visible viewBox is exactly one tile wide (TILE).
 * - Each <path> is drawn 2× tile wide (= 2*TILE) and contains two identical halves.
 * - Each path is animated `translate(0,0) → translate(-TILE,0)` over its duration.
 *   When translate reaches -TILE, the second half (which is identical) is now
 *   exactly under the visible viewBox, and the cycle resets seamlessly.
 *
 * Surfer
 * ------
 * - A shared `phase` motion value (0→1, looping) drives the front wave's translate.
 * - The surfer's Y is computed from the same phase, sampling the front wave's
 *   sine, so it always sits on the crest.
 * - Click the surfer or press Space / Arrow Up to do a trick. Score increments.
 */

const TILE = 1200;            // one wave repeat unit (in viewBox units)
const VB_W = TILE;            // visible viewBox width
const VB_H = 220;             // viewBox height

// Bezier peak height = 0.75 * control offset, so multiply by 4/3 to make the
// wave actually peak at the requested amplitude.
const BEZIER_CTRL = 4 / 3;

/** Build a tileable wave path: two identical halves over [0, 2*TILE]. */
function buildWavePath(baseline: number, amplitude: number, period: number): string {
  const totalCycles = Math.round((2 * TILE) / period); // must be integer for clean tiling
  const segments: string[] = [`M 0,${baseline}`];
  for (let i = 0; i < totalCycles; i++) {
    const startX = i * period;
    const cx1 = startX + period * 0.25;
    const cx2 = startX + period * 0.75;
    const endX = startX + period;
    const dir = i % 2 === 0 ? -1 : 1;
    const ctrlY = baseline + amplitude * BEZIER_CTRL * dir;
    segments.push(`C ${cx1},${ctrlY} ${cx2},${ctrlY} ${endX},${baseline}`);
  }
  segments.push(`L ${2 * TILE},${VB_H} L 0,${VB_H} Z`);
  return segments.join(" ");
}

const PATH_BACK  = buildWavePath(70, 18, 600);   // slow distant swells
const PATH_MID   = buildWavePath(115, 28, 400);  // mid-depth waves
const PATH_FRONT = buildWavePath(150, 32, 300);  // foreground — surfer rides

const FRONT_PERIOD = 300;
const FRONT_AMPLITUDE = 32;
const FRONT_BASELINE = 150;
const FRONT_DURATION = 6; // seconds per tile — matches SMIL `dur` for front wave
const SURFER_X_PCT = 0.72;

export default function OceanScene() {
  const [boosts, setBoosts] = useState(0);
  const isBoosting = useRef(false);
  const surferScale = useMotionValue(1);

  // Wave x-offset motion values (SVG viewBox units, 0 → -TILE loops)
  const backX  = useMotionValue(0);
  const midX   = useMotionValue(0);
  const frontX = useMotionValue(0);
  const foamX  = useMotionValue(0);

  // Keep animation controls so we can set .speed on them
  const waveCtrl = useRef<ReturnType<typeof animate>[]>([]);

  const phase = useMotionValue(0);

  useEffect(() => {
    waveCtrl.current = [
      animate(backX,  [0, -TILE], { duration: 14,            ease: "linear", repeat: Infinity }),
      animate(midX,   [0, -TILE], { duration: 9,             ease: "linear", repeat: Infinity }),
      animate(frontX, [0, -TILE], { duration: FRONT_DURATION, ease: "linear", repeat: Infinity }),
      animate(foamX,  [0, -TILE], { duration: FRONT_DURATION, ease: "linear", repeat: Infinity }),
    ];
    const phaseCtrl = animate(phase, 1, { duration: FRONT_DURATION, ease: "linear", repeat: Infinity });
    return () => {
      waveCtrl.current.forEach((c) => c.stop());
      phaseCtrl.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Surfer Y in viewBox units — sine of (surferX + scrollOffset).
  const surferYVB = useTransform(phase, (p) => {
    const x = SURFER_X_PCT * VB_W + p * TILE;
    return FRONT_BASELINE - FRONT_AMPLITUDE * Math.sin((x * 2 * Math.PI) / FRONT_PERIOD);
  });
  const surferTop = useTransform(surferYVB, (y) => `${(y / VB_H) * 100}%`);

  const triggerBoost = () => {
    if (isBoosting.current) return;
    isBoosting.current = true;
    setBoosts((n) => n + 1);

    waveCtrl.current.forEach((c) => { c.speed = 4; });
    animate(surferScale, 0.75, { duration: 0.2, ease: "easeOut" });

    setTimeout(() => {
      isBoosting.current = false;
      waveCtrl.current.forEach((c) => { c.speed = 1; });
      animate(surferScale, 1, { duration: 0.4, ease: "easeOut" });
    }, 1500);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        const t = e.target;
        if (t instanceof HTMLElement) {
          if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) return;
        }
        e.preventDefault();
        triggerBoost();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="relative w-full h-[42vh] sm:h-[46vh] md:absolute md:inset-x-0 md:bottom-0 md:w-auto md:h-[60vh] pointer-events-none overflow-hidden"
      aria-hidden
    >
      {/* Sun glow above horizon */}
      <div
        className="absolute inset-x-0 bottom-[55%] h-44 pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 75% 100%, rgb(var(--accent-3) / 0.4), transparent 60%)",
        }}
      />

      {/* Three parallax wave layers */}
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 w-full h-full"
      >
        <defs>
          <linearGradient id="ocean-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--accent-3))" stopOpacity="0.22" />
            <stop offset="100%" stopColor="rgb(var(--accent-1))" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="ocean-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--accent-2))" stopOpacity="0.32" />
            <stop offset="100%" stopColor="rgb(var(--accent-1))" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id="ocean-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--accent-2))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="rgb(var(--accent-1))" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Back wave — slowest */}
        <motion.g style={{ x: backX }}>
          <path d={PATH_BACK} fill="url(#ocean-back)" />
        </motion.g>

        {/* Mid wave */}
        <motion.g style={{ x: midX }}>
          <path d={PATH_MID} fill="url(#ocean-mid)" />
        </motion.g>

        {/* Front wave — fastest, surfer rides this */}
        <motion.g style={{ x: frontX }}>
          <path d={PATH_FRONT} fill="url(#ocean-front)" />
        </motion.g>

        {/* Foam highlight on the front wave crests */}
        <motion.g style={{ x: foamX }}>
          <path
            d={PATH_FRONT}
            fill="none"
            stroke="rgb(var(--accent-3))"
            strokeOpacity="0.65"
            strokeWidth="1.5"
          />
        </motion.g>
      </svg>

      {/* Surfer (clickable) */}
      <motion.button
        type="button"
        onClick={triggerBoost}
        aria-label="Boost the surfer"
        className="pointer-events-auto absolute z-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora-2 focus-visible:ring-offset-2 focus-visible:ring-offset-flow-bg rounded-full"
        style={{
          left: `${SURFER_X_PCT * 100}%`,
          top: surferTop,
          translateX: "-50%",
          translateY: "-100%",
          scale: surferScale,
        }}
      >
        <SurferSvg />
      </motion.button>

      {/* Boost indicator */}
      <div className="pointer-events-none absolute bottom-4 right-4 md:bottom-6 md:right-6 z-30 flex items-center gap-3">
        {/* Hint pill */}
        <div className="hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-flow-cardSolid border-2 border-flow-borderStrong text-xs font-bold uppercase tracking-[0.18em] text-flow-text shadow-aurora">
          <kbd className="px-2.5 py-1 rounded-md bg-aurora-grad text-white text-[10px] font-extrabold tracking-wider shadow-aurora ring-1 ring-white/40">
            SPACE
          </kbd>
          <span className="text-flow-text/75">or tap surfer</span>
        </div>

        {/* Boost counter */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
          className="relative px-5 py-3 rounded-full bg-aurora-grad text-white text-sm font-bold tracking-wide flex items-center gap-2.5 ring-2 ring-white/50 shadow-[0_8px_24px_-4px_rgba(0,102,162,0.55),0_2px_6px_rgba(5,26,46,0.18)]"
        >
          <span
            aria-hidden
            className="absolute -inset-1 rounded-full opacity-60 blur-lg -z-10"
            style={{
              background: "linear-gradient(110deg, rgb(var(--accent-1)), rgb(var(--accent-2)))",
            }}
          />
          <span className="text-base">🏄</span>
          <span className="uppercase tracking-[0.14em] text-xs opacity-90">Boost</span>
          <motion.span
            key={boosts}
            initial={{ scale: 1.6, y: -3 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 16 }}
            className="font-extrabold tabular-nums text-base min-w-[1.5ch] text-center"
          >
            {boosts}
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Sub-components                                */
/* -------------------------------------------------------------------------- */

function SurferSvg() {
  return (
    <Image
      src="/surfer.png"
      alt="surfer"
      width={130}
      height={110}
      className="drop-shadow-[0_8px_18px_rgba(0,102,162,0.45)] -rotate-[15deg]"
      priority
    />
  );
}

function Splash({ xPct }: { xPct: number }) {
  const drops = Array.from({ length: 7 });
  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: `${xPct}%`, bottom: "32%", transform: "translateX(-50%)" }}
    >
      {drops.map((_, i) => {
        const angle = (i / drops.length) * Math.PI - Math.PI / 8;
        const distance = 22 + Math.random() * 28;
        const dx = Math.cos(angle) * distance;
        const dy = -Math.abs(Math.sin(angle)) * distance - 6;
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: dx, y: dy, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.7 + Math.random() * 0.2, ease: "easeOut" }}
            className="absolute block w-1.5 h-1.5 rounded-full"
            style={{
              left: 0,
              bottom: 0,
              background: "rgb(var(--accent-3))",
              boxShadow: "0 0 4px rgb(var(--accent-2))",
            }}
          />
        );
      })}
    </div>
  );
}
