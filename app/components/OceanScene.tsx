"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

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

const PATH_BACK  = buildWavePath(70, 36, 600);   // slow distant swells
const PATH_MID   = buildWavePath(115, 50, 400);  // mid-depth waves
const PATH_FRONT = buildWavePath(150, 58, 300);  // foreground — surfer rides

const FRONT_PERIOD = 300;
const FRONT_AMPLITUDE = 58;
const FRONT_BASELINE = 150;
const FRONT_DURATION = 6; // seconds per tile — matches SMIL `dur` for front wave
const SURFER_X_PCT = 0.72;

export default function OceanScene() {
  const [tricks, setTricks] = useState(0);
  const [splashes, setSplashes] = useState<{ id: number; x: number }[]>([]);
  const splashId = useRef(0);
  const isJumping = useRef(false);

  // Shared phase 0..1 driving the front wave + surfer.
  const phase = useMotionValue(0);
  useEffect(() => {
    const controls = animate(phase, 1, {
      duration: FRONT_DURATION,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [phase]);

  const jumpY = useMotionValue(0);
  const jumpRot = useMotionValue(0);

  // Surfer Y in viewBox units — sine of (surferX + scrollOffset).
  const surferYVB = useTransform(phase, (p) => {
    const x = SURFER_X_PCT * VB_W + p * TILE;
    return FRONT_BASELINE - FRONT_AMPLITUDE * Math.sin((x * 2 * Math.PI) / FRONT_PERIOD);
  });
  // Tilt follows the wave slope — derivative of sin is cos.
  const surferTilt = useTransform(phase, (p) => {
    const x = SURFER_X_PCT * VB_W + p * TILE;
    return -Math.cos((x * 2 * Math.PI) / FRONT_PERIOD) * 14;
  });

  // Convert viewBox Y → CSS top % of container (which has same aspect ratio mapping).
  const surferTop = useTransform([surferYVB, jumpY] as any, ([y, j]: any) => {
    return `${((y + j) / VB_H) * 100}%`;
  });
  const surferRotate = useTransform(
    [surferTilt, jumpRot] as any,
    ([t, r]: any) => `${t + r}deg`
  );

  const triggerJump = () => {
    if (isJumping.current) return;
    isJumping.current = true;
    setTricks((t) => t + 1);

    const xPct = SURFER_X_PCT * 100;
    const id = ++splashId.current;
    setSplashes((s) => [...s, { id, x: xPct }]);
    setTimeout(() => setSplashes((s) => s.filter((sp) => sp.id !== id)), 900);

    animate(jumpY, [-95, 0], {
      duration: 1.0,
      ease: [0.32, 0.72, 0.35, 1],
      onComplete: () => {
        isJumping.current = false;
        const lid = ++splashId.current;
        setSplashes((s) => [...s, { id: lid, x: xPct }]);
        setTimeout(() => setSplashes((s) => s.filter((sp) => sp.id !== lid)), 700);
      },
    });
    animate(jumpRot, [0, -360, 0], {
      duration: 1.0,
      ease: "easeInOut",
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        const t = e.target;
        if (t instanceof HTMLElement) {
          if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) return;
        }
        e.preventDefault();
        triggerJump();
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
        <path d={PATH_BACK} fill="url(#ocean-back)">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to={`-${TILE} 0`}
            dur="14s"
            repeatCount="indefinite"
          />
        </path>

        {/* Mid wave */}
        <path d={PATH_MID} fill="url(#ocean-mid)">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to={`-${TILE} 0`}
            dur="9s"
            repeatCount="indefinite"
          />
        </path>

        {/* Front wave — fastest, surfer rides this */}
        <path d={PATH_FRONT} fill="url(#ocean-front)">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to={`-${TILE} 0`}
            dur={`${FRONT_DURATION}s`}
            repeatCount="indefinite"
          />
        </path>

        {/* Foam highlight on the front wave crests */}
        <path
          d={PATH_FRONT}
          fill="none"
          stroke="rgb(var(--accent-3))"
          strokeOpacity="0.65"
          strokeWidth="1.5"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to={`-${TILE} 0`}
            dur={`${FRONT_DURATION}s`}
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Splash particles */}
      {splashes.map((sp) => (
        <Splash key={sp.id} xPct={sp.x} />
      ))}

      {/* Surfer (clickable) */}
      <motion.button
        type="button"
        onClick={triggerJump}
        aria-label="Make the surfer do a trick"
        className="pointer-events-auto absolute z-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora-2 focus-visible:ring-offset-2 focus-visible:ring-offset-flow-bg rounded-full"
        style={{
          left: `${SURFER_X_PCT * 100}%`,
          top: surferTop,
          rotate: surferRotate,
          translateX: "-50%",
          translateY: "-100%",
          transformOrigin: "50% 95%",
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <SurferSvg />
      </motion.button>

      {/* Trick counter / hint */}
      <div className="pointer-events-none absolute bottom-4 right-4 md:bottom-6 md:right-6 z-30 flex items-center gap-3">
        {/* Hint pill — solid white card so it pops over the waves */}
        <div className="hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-flow-cardSolid border-2 border-flow-borderStrong text-xs font-bold uppercase tracking-[0.18em] text-flow-text shadow-aurora">
          <kbd className="px-2.5 py-1 rounded-md bg-aurora-grad text-white text-[10px] font-extrabold tracking-wider shadow-aurora ring-1 ring-white/40">
            SPACE
          </kbd>
          <span className="text-flow-text/75">or tap surfer</span>
        </div>

        {/* Trick counter — solid gradient with strong glow */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
          className="relative px-5 py-3 rounded-full bg-aurora-grad text-white text-sm font-bold tracking-wide flex items-center gap-2.5 ring-2 ring-white/50 shadow-[0_8px_24px_-4px_rgba(0,102,162,0.55),0_2px_6px_rgba(5,26,46,0.18)]"
        >
          {/* outer glow halo */}
          <span
            aria-hidden
            className="absolute -inset-1 rounded-full opacity-60 blur-lg -z-10"
            style={{
              background:
                "linear-gradient(110deg, rgb(var(--accent-1)), rgb(var(--accent-2)))",
            }}
          />
          <span className="text-base">🏄</span>
          <span className="uppercase tracking-[0.14em] text-xs opacity-90">Tricks</span>
          <motion.span
            key={tricks}
            initial={{ scale: 1.6, y: -3 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 16 }}
            className="font-extrabold tabular-nums text-base min-w-[1.5ch] text-center"
          >
            {tricks}
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
  // Logo-matching CARVING pose with full detail:
  // back arm raised high & back, front arm extended forward, knees bent into
  // an athletic stance — but rendered with skin head, wetsuit, sunglasses,
  // hair, gradient board, and articulated limbs.
  return (
    <svg
      width="118"
      height="152"
      viewBox="0 0 140 180"
      fill="none"
      className="drop-shadow-[0_12px_20px_rgba(0,102,162,0.45)]"
    >
      <defs>
        <linearGradient id="board-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(var(--accent-3))" />
          <stop offset="60%" stopColor="rgb(var(--accent-2))" />
          <stop offset="100%" stopColor="rgb(var(--accent-1))" />
        </linearGradient>
        <linearGradient id="wetsuit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--accent-1))" />
          <stop offset="100%" stopColor="rgb(var(--flow-text))" />
        </linearGradient>
      </defs>

      {/* Board fin */}
      <path
        d="M 78,170 L 86,180 L 92,170 Z"
        fill="rgb(var(--accent-1))"
        opacity="0.85"
      />

      {/* Surfboard with gradient + highlight stripe */}
      <ellipse
        cx="70"
        cy="166"
        rx="60"
        ry="7"
        fill="url(#board-grad)"
        stroke="rgb(var(--accent-1))"
        strokeWidth="2"
      />
      <ellipse cx="70" cy="162" rx="52" ry="2.5" fill="white" opacity="0.55" />
      <ellipse cx="14" cy="166" rx="6" ry="3" fill="rgb(var(--accent-1))" opacity="0.5" />

      {/* === BACK LEG (drawn first, partially behind front leg) === */}
      <g
        stroke="url(#wetsuit)"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <polyline points="76,92 90,128 100,158" />
      </g>

      {/* === FRONT LEG (knee forward, weight bearing) === */}
      <g
        stroke="url(#wetsuit)"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <polyline points="62,90 48,124 38,158" />
      </g>

      {/* === TORSO (wetsuit, leaning forward into the carve) === */}
      <path
        d="M 48,46
           C 42,58 42,76 50,90
           L 76,92
           C 84,82 82,62 75,46
           L 68,42
           Z"
        fill="url(#wetsuit)"
      />

      {/* Wetsuit chest stripe */}
      <path
        d="M 45,66 C 53,64 70,64 78,66 L 78,71 C 70,69 53,69 45,71 Z"
        fill="rgb(var(--accent-3))"
        opacity="0.9"
      />

      {/* === BACK ARM (raised HIGH up and back — logo's signature) === */}
      <g
        stroke="rgb(var(--flow-text))"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <polyline points="70,48 92,28 110,10" />
      </g>
      {/* back-arm hand */}
      <circle cx="112" cy="9" r="5" fill="rgb(var(--flow-text))" />

      {/* === FRONT ARM (extended forward for direction) === */}
      <g
        stroke="rgb(var(--flow-text))"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <polyline points="50,54 32,62 14,68" />
      </g>
      {/* front-arm hand */}
      <circle cx="12" cy="68" r="4.5" fill="rgb(var(--flow-text))" />

      {/* === HEAD (skin tone) === */}
      <circle cx="58" cy="30" r="13" fill="#F4C8A0" />

      {/* Hair — back-flowing tuft */}
      <path
        d="M 68,22 C 78,18 86,20 92,26 L 88,32 C 80,26 72,28 67,32 Z"
        fill="rgb(var(--flow-text))"
      />
      {/* Hair top crown */}
      <path
        d="M 50,24 C 53,18 62,16 68,20 L 68,28 C 60,23 53,25 50,30 Z"
        fill="rgb(var(--flow-text))"
      />

      {/* Sunglasses */}
      <rect x="53" y="28" width="13" height="3.5" rx="1.6" fill="rgb(var(--flow-text))" />
      <rect x="50" y="29" width="3" height="2.5" rx="1" fill="rgb(var(--flow-text))" />
    </svg>
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
