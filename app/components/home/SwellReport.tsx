"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { cn } from "@/lib/utils";
import { EASE } from "@/app/components/editorial";

/**
 * The swell report: the hero's ocean, redrawn as the thing the agency sells.
 * Each tab is a client outcome the site already reports (testimonials and the
 * real-estate figures); the curve is its growth, drawn as a wave. The curves
 * are illustrative and say so — only the headline figures are claims.
 *
 * Every series has the same number of points, so switching tabs morphs one
 * path into the next instead of swapping it.
 */

type SeriesCopy = {
  tab: string;
  value: string;
  label: string;
  context: string;
  source: string;
  axis: string[];
};

type SeriesData = {
  points: number[];
  /** Formats a raw point for the scrub readout. */
  format: (v: number) => string;
};

const SERIES: SeriesData[] = [
  {
    // Conversion rate, indexed to 100 at the start — +45% in twelve weeks.
    points: [100, 103, 101, 108, 112, 109, 118, 124, 121, 131, 137, 134, 145],
    format: (v) => `+${Math.round(v - 100)}%`,
  },
  {
    // Online sales, indexed to 100 — +78%.
    points: [100, 104, 111, 108, 119, 127, 124, 138, 149, 145, 160, 171, 178],
    format: (v) => `+${Math.round(v - 100)}%`,
  },
  {
    // Cumulative verified real-estate leads.
    points: [0, 90, 210, 300, 480, 640, 780, 1010, 1240, 1450, 1720, 2050, 2400],
    format: (v) => Math.round(v).toLocaleString("en-US"),
  },
];

/** Chart space. The SVG stretches to fit, so strokes are non-scaling. */
const W = 1000;
const H = 240;
const PAD_TOP = 0.16;
const PAD_BOTTOM = 0.1;

function toPoints(values: number[]): [number, number][] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const usable = H * (1 - PAD_TOP - PAD_BOTTOM);
  return values.map((v, i) => [
    (i / (values.length - 1)) * W,
    H * PAD_TOP + usable - ((v - min) / span) * usable,
  ]);
}

/** Catmull-Rom through every point, as cubic Béziers — a swell, not a zigzag. */
function linePath(pts: [number, number][]) {
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

const areaPath = (line: string) => `${line} L${W},${H} L0,${H} Z`;

/**
 * A seamless sine swell, two screens wide, for the water drifting behind the
 * data. It slides by exactly one screen per loop, so the seam never shows.
 */
function swellPath(amplitude: number, base: number, periods: number) {
  const width = W * 2;
  const step = width / (periods * 8);
  let d = `M0,${base}`;
  for (let x = step; x <= width + 0.1; x += step) {
    const y = base + Math.sin((x / width) * periods * Math.PI * 2) * amplitude;
    d += ` L${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return `${d} L${width},${H} L0,${H} Z`;
}

const SWELL_BACK = swellPath(10, 168, 4);
const SWELL_FRONT = swellPath(7, 192, 6);

export default function SwellReport({ ready }: { ready: boolean }) {
  const t = useT(homeExtraMessages);
  const still = useReducedMotion() ?? false;
  const copy = t.raw<SeriesCopy[]>("swell.series", []);
  const [active, setActive] = React.useState(0);
  const [scrub, setScrub] = React.useState<number | null>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = React.useId();

  const series = SERIES[active];
  const current = copy[active];
  const pts = React.useMemo(() => toPoints(series.points), [series]);
  const line = React.useMemo(() => linePath(pts), [pts]);

  // The marker rides the last point until the pointer takes over.
  const markerIndex = scrub ?? pts.length - 1;
  const [mx, my] = pts[markerIndex];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next: number | null = null;
    if (e.key in keys) next = (active + keys[e.key] + SERIES.length) % SERIES.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = SERIES.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    setScrub(Math.round(ratio * (pts.length - 1)));
  };

  if (!current) return null;

  const transition = still ? { duration: 0 } : { duration: 0.9, ease: EASE };

  return (
    <div className="relative">
      {/* ---- Header row: what this is, and the switch ---- */}
      <div className="flex flex-col gap-4 border-t border-cs-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="cs-meta flex items-center gap-2.5 text-cs-ink3">
          <span aria-hidden className="relative flex h-2 w-2">
            <span className="cs-pulse absolute inset-0 rounded-full bg-cs-cyan" />
            <span className="relative h-2 w-2 rounded-full bg-cs-cyan" />
          </span>
          {t("swell.title")}
        </p>

        <div
          role="tablist"
          aria-label={t("swell.tabsLabel")}
          onKeyDown={onKeyDown}
          className="-mx-1 flex gap-1 overflow-x-auto no-scrollbar"
        >
          {copy.map((s, i) => {
            const selected = i === active;
            return (
              <button
                key={s.tab}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "cs-focus cs-meta relative shrink-0 rounded-md px-2 py-2.5 transition-colors duration-200 sm:px-3",
                  selected ? "text-cs-ink" : "text-cs-ink3 hover:text-cs-ink"
                )}
              >
                <span className="mr-2 hidden tabular-nums text-cs-ink3 sm:inline">{String(i + 1).padStart(2, "0")}</span>
                {s.tab}
                {selected && (
                  <motion.span
                    layoutId={`${baseId}-tab-bar`}
                    aria-hidden
                    className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-cs-cyan sm:inset-x-3"
                    transition={still ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---- Readout + chart ---- */}
      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="grid gap-6 pt-6 pb-2 lg:grid-cols-12 lg:gap-8 lg:pt-8"
      >
        <div className="relative min-h-[7.5rem] lg:col-span-3" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={still ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={still ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex items-end gap-5 lg:block"
            >
              <p
                className="cs-display font-semibold tabular-nums text-cs-ink"
                style={{ fontSize: "clamp(3.25rem, 5.4vw, 5rem)", lineHeight: 0.9 }}
              >
                {current.value}
              </p>
              <div className="pb-1 lg:mt-4 lg:pb-0">
                <p className="text-[15px] font-semibold tracking-[-0.01em] text-cs-ink">{current.label}</p>
                <p className="mt-1 text-sm text-cs-ink2">{current.context}</p>
                <p className="cs-meta mt-3 text-cs-ink3">— {current.source}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <figure className="relative lg:col-span-9" aria-label={`${current.label}: ${current.value}, ${current.context} — ${current.source}`}>
          <div
            className="relative h-[150px] cursor-crosshair sm:h-[190px] lg:h-[210px]"
            onPointerMove={onPointerMove}
            onPointerLeave={() => setScrub(null)}
            aria-hidden
          >
            {/* Gridlines */}
            {[0.16, 0.43, 0.7].map((top) => (
              <span
                key={top}
                className="absolute inset-x-0 border-t border-dashed border-cs-ink/[0.08]"
                style={{ top: `${top * 100}%` }}
              />
            ))}

            {/* The water behind the data: two swells drifting at different speeds. */}
            <div className="absolute inset-0 overflow-hidden">
              <svg
                viewBox={`0 0 ${W * 2} ${H}`}
                preserveAspectRatio="none"
                className="cs-swell-slow absolute inset-y-0 left-0 h-full w-[200%]"
              >
                <path d={SWELL_BACK} fill="rgb(var(--cs-cyan) / 0.06)" />
              </svg>
              <svg
                viewBox={`0 0 ${W * 2} ${H}`}
                preserveAspectRatio="none"
                className="cs-swell absolute inset-y-0 left-0 h-full w-[200%]"
              >
                <path d={SWELL_FRONT} fill="rgb(var(--cs-cyan) / 0.07)" />
              </svg>
            </div>

            {/* The data */}
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <linearGradient id={`${baseId}-fill`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(var(--cs-cyan))" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="rgb(var(--cs-cyan))" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ d: areaPath(line), opacity: 0 }}
                animate={{ d: areaPath(line), opacity: ready ? 1 : 0 }}
                transition={{ d: transition, opacity: { duration: 1.2, delay: still ? 0 : 0.9 } }}
                fill={`url(#${baseId}-fill)`}
              />
              <motion.path
                initial={{ d: line, pathLength: still ? 1 : 0 }}
                animate={{ d: line, pathLength: ready ? 1 : 0 }}
                transition={{ d: transition, pathLength: { duration: still ? 0 : 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.5 } }}
                fill="none"
                stroke="rgb(var(--cs-cyan))"
                strokeWidth={2}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Scrub line */}
            {scrub !== null && (
              <span
                className="pointer-events-none absolute inset-y-0 w-px bg-cs-ink/15"
                style={{ left: `${(mx / W) * 100}%` }}
              />
            )}

            {/* Marker: the surfer on the crest */}
            <motion.span
              className="pointer-events-none absolute"
              initial={false}
              animate={{ left: `${(mx / W) * 100}%`, top: `${(my / H) * 100}%`, opacity: ready ? 1 : 0 }}
              transition={
                scrub !== null
                  ? { type: "spring", stiffness: 500, damping: 40 }
                  : { ...transition, opacity: { duration: 0.5, delay: still ? 0 : 1.8 } }
              }
            >
              <span className="absolute -left-[5px] -top-[5px] h-2.5 w-2.5 rounded-full border-2 border-cs-cyan bg-cs-bg" />
              <span
                className={cn(
                  "cs-meta absolute bottom-3 whitespace-nowrap rounded-md bg-cs-ink px-2 py-1 text-cs-bg",
                  markerIndex > pts.length * 0.75 ? "right-1" : "left-1"
                )}
              >
                {series.format(series.points[markerIndex])}
              </span>
            </motion.span>
          </div>

          {/* Axis */}
          <div className="cs-meta mt-3 flex justify-between text-cs-ink3" aria-hidden>
            {current.axis.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>
          <figcaption className="mt-4 text-[11px] leading-snug text-cs-ink3">{t("swell.footnote")}</figcaption>
        </figure>
      </div>
    </div>
  );
}
