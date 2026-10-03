"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The Creative Surf mark, as vector: traced from the original artwork and
 * refitted as smooth Bézier curves (paths generated, not hand-drawn — see
 * the note at the bottom). Seven shapes, back to front:
 *
 *   crescent — the deep-blue outer wave
 *   body     — the mid-blue wave that curls in under it
 *   crest    — the light crest riding the top of the body
 *   sweep    — the light inner curl that runs out into the arrow
 *   bars     — three rising bars, left to right
 *
 * Variants:
 *   static  — just the mark (replaces the raster logo anywhere)
 *   intro   — builds itself once: the waves sweep round, the crest and the
 *             arrow wipe in, the bars rise, then a glint crosses it
 *   spinner — a loop for waiting states: the bars rise and settle in turn,
 *             like a signal meter, and the arrow carries a travelling light
 *
 * Reduced motion: intro renders finished; spinner swaps movement for a
 * gentle opacity step so it still reads as "working".
 */

/* ---- Generated geometry (1024-unit artboard of the original) ---- */
const CRESCENT = "M700.7,259.7 C694.4,267.8 660.3,238.7 651.2,232.8 C623.1,214.5 589.5,203.2 557.4,194.6 C466.6,170.4 364.7,196.3 287.6,246.6 C221.3,289.8 180.1,358.5 150.9,429.9 C144.8,445.1 143,461.8 136.8,476.8 C116.4,527.1 93.1,548.8 81.8,608.8 C74.6,647.6 77.2,685.7 87.4,723.6 C90,733.4 102.2,760.1 97.7,764.7 C89.9,772.5 68.4,732.7 65.1,726.9 C39.1,682.5 26.7,630 20.7,579.3 C4.6,442.5 66.2,294.4 173,208 C279.6,121.7 419,89.2 550.9,130.1 C598.5,144.9 644.1,178.5 675.2,216.8 C679.8,222.6 705.7,253.2 700.7,259.7Z";
const BODY = "M521.5,322.6 C529.4,328.8 512.5,342.9 514.1,351.7 C515.4,359.4 533.8,362.3 527.8,372 C522.8,380.1 493,368 485.9,365.1 C458.5,353.9 414.1,361.5 389.5,377.5 C325.1,419.6 341.7,429.6 299.7,471.7 C291.1,480.3 279.3,479.5 270.6,486.6 C218.6,528.6 193.2,598 195,663 C195.7,687.7 209.7,712 222.5,731.5 C230.5,743.8 235.4,758.9 244.6,770.4 C255.1,783.3 272.6,790.9 286.2,799.8 C356.7,845.8 388.2,840.8 470,843 C481.1,843.3 530.8,832.7 543.1,829.5 C555.1,826.4 564.8,815 578.3,814.6 C580.2,814.5 587.2,816.3 587.7,817.3 C593,829.8 508.2,862.1 492.9,866.9 C417.4,890.3 387.8,887.5 310.7,891.7 C246.9,895.3 135.4,830.9 100.1,776.9 C75,738.4 68.4,661 75.1,617.1 C85.7,546.6 109.6,529.6 132.7,472.7 C138.4,458.9 137.7,439.3 147.4,427.4 C154.1,419 167.4,428.2 176.1,421.1 C194.8,406 209.1,386.6 227.6,371.6 C233.1,367.1 241.2,367.6 247.4,364.4 C305.1,334.4 324.5,318 396,318 C436,318 454.5,329.4 489.5,333.5 C501.5,334.9 517.9,319.7 521.5,322.6Z";
const CREST = "M549.7,384.3 C544.5,382 536,388.8 529.4,385.6 C520.5,381.1 526.3,371.9 520.6,366.3 C517,362.6 510.6,362 508.6,356.7 C507.3,353.1 509.7,342.3 507.7,340.3 C503.8,336.5 475.8,335.8 465.4,332.6 C417,317.6 344.1,316.5 297.7,340.7 C277.3,351.3 258.9,366.5 236.5,373.5 C225.7,376.8 159.3,461.6 154.9,419.5 C153.1,401.6 171.4,390 177.1,376.1 C179.9,369 177.5,360.4 181.8,353.8 C190.1,341 211.7,328.7 224.4,320.4 C302.5,269.5 405.5,241.6 492.9,287.1 C527.7,305.1 554.7,339.6 563.3,377.7 C564.8,384.6 570.6,424.9 560.1,424.4 C542.8,423.6 553.3,386 549.7,384.3Z";
const SWEEP = "M1002.7,372.3 C1006,385.9 999.3,488.4 989.3,490.5 C979.4,492.7 966.6,469.7 957.3,466.3 C948.9,491.5 932.2,520.6 919.3,545.3 C830.6,716 691,869.9 493.8,906.8 C434.8,917.9 373,917 314.3,903.7 C297.1,899.9 264.6,897.3 257.3,880.3 C267.6,879.3 282.4,885.5 297.3,886.7 C325.3,889.1 356.3,888.7 384.3,886.3 C442.9,881.3 499.1,862.2 550.5,835.5 C557.1,832 564.9,832.5 571.3,828.3 C579.7,822.9 583.2,813.3 591.1,808.1 C605.7,798.6 675.1,770.8 677.7,755.3 C657.3,755.3 614.6,780.2 591.4,786.4 C509.6,808.2 418,815.1 340.3,774.7 C244.3,724.8 198.9,614.6 250.8,514.8 C255.7,505.4 258.7,490.5 266.1,483.1 C272.3,476.9 282.5,477.4 289.7,472.7 C297.8,467.4 302,460.7 310.7,457.3 C315.6,498.1 275.3,532.7 309.5,616.5 C353.8,725.4 479.9,773.3 590.4,748.4 C717.6,719.6 825.6,625.1 895.7,517.7 C908.6,497.9 927.4,477.1 935.9,454.9 C943.1,436.3 895.5,442.8 900.6,426.1 C903.5,416.4 989.9,375.4 1002.7,372.3Z";
const BARS = [
  "M544,635 L559,638 L559,732 L485,732 L483,658Z",
  "M652,550 L662,551 L662,700 L632,717 L588,727 L586,579Z",
  "M750,427 L764,428 L764,636 L698,686 L688,686 L687,472Z",
];

const VIEWBOX = "8 100 1010 826";
/** Where the two waves turn about — the eye of the curl. */
const CX = 440;
const CY = 520;

/** Sampled from the artwork: the sweep shades from light blue into cyan. */
const SWEEP_STOPS = [["0.083", "#5ACCF3"], ["0.25", "#59CCF3"], ["0.417", "#4BCDF3"], ["0.583", "#26CDEE"], ["0.75", "#08CAEA"], ["0.917", "#0CCAEA"]];
const BODY_STOPS = [["0.083", "#2DAAE7"], ["0.25", "#2DABE7"], ["0.417", "#2FACE7"], ["0.583", "#30ADE6"], ["0.75", "#34AEE6"], ["0.917", "#3DB4EB"]];
const DEEP = "#035CAC";
const CREST_FILL = "#59CBF4";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DRAW: [number, number, number, number] = [0.65, 0, 0.35, 1];

/** A full circle as a path, drawn clockwise or anticlockwise from 3 o'clock. */
const ring = (r: number, clockwise: boolean) =>
  `M${CX + r},${CY} A${r},${r} 0 1 ${clockwise ? 1 : 0} ${CX - r},${CY} A${r},${r} 0 1 ${clockwise ? 1 : 0} ${CX + r},${CY}`;

export type LogoMarkVariant = "static" | "intro" | "spinner";

export function LogoMark({
  variant = "static",
  className,
  title,
  delay = 0,
}: {
  variant?: LogoMarkVariant;
  className?: string;
  /** Accessible name. Omit when the mark sits beside its own wordmark. */
  title?: string;
  /** Intro only: seconds to wait before building. */
  delay?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const still = useReducedMotion() ?? false;
  const intro = variant === "intro" && !still;
  const id = (name: string) => `lm-${name}-${uid}`;

  // Intro timeline, in seconds from `delay`.
  const at = (s: number) => delay + s;

  return (
    <svg
      viewBox={VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      overflow="visible"
    >
      <defs>
        <linearGradient id={id("sweep")} gradientUnits="userSpaceOnUse" x1="230" y1="0" x2="1004" y2="0">
          {SWEEP_STOPS.map(([offset, color]) => (
            <stop key={offset} offset={offset} stopColor={color} />
          ))}
        </linearGradient>
        <linearGradient id={id("body")} gradientUnits="userSpaceOnUse" x1="74" y1="0" x2="587" y2="0">
          {BODY_STOPS.map(([offset, color]) => (
            <stop key={offset} offset={offset} stopColor={color} />
          ))}
        </linearGradient>

        {intro && (
          <>
            {/* Pie-wedge reveals: a stroke far wider than its radius, so
                drawing it round uncovers a growing wedge from the centre. */}
            <mask id={id("m-crescent")} maskUnits="userSpaceOnUse" x="-400" y="-400" width="2000" height="2000">
              <motion.path
                d={ring(380, true)}
                transform={`rotate(128 ${CX} ${CY})`}
                fill="none"
                stroke="#fff"
                strokeWidth={800}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.85, ease: DRAW, delay: at(0) }}
              />
            </mask>
            <mask id={id("m-body")} maskUnits="userSpaceOnUse" x="-400" y="-400" width="2000" height="2000">
              <motion.path
                d={ring(380, false)}
                transform={`rotate(-40 ${CX} ${CY})`}
                fill="none"
                stroke="#fff"
                strokeWidth={800}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.85, ease: DRAW, delay: at(0.12) }}
              />
            </mask>

            {/* Left-to-right wipes with a feathered leading edge. */}
            <linearGradient id={id("feather")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0.9" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id={id("m-crest")} maskUnits="userSpaceOnUse" x="-2000" y="0" width="5000" height="1100">
              {/* Offset lives on the group: framer animates `x` as a transform. */}
              <g transform={`translate(${155 - 900} 0)`}>
                <motion.rect
                  width="900"
                  height="1100"
                  fill={`url(#${id("feather")})`}
                  initial={{ x: 0 }}
                  animate={{ x: 564 - 155 + 120 }}
                  transition={{ duration: 0.6, ease: EASE, delay: at(0.38) }}
                />
              </g>
            </mask>
            <mask id={id("m-sweep")} maskUnits="userSpaceOnUse" x="-2000" y="0" width="5000" height="1100">
              <g transform={`translate(${230 - 1100} 0)`}>
                <motion.rect
                  width="1100"
                  height="1100"
                  fill={`url(#${id("feather")})`}
                  initial={{ x: 0 }}
                  animate={{ x: 1004 - 230 + 140 }}
                  transition={{ duration: 0.8, ease: DRAW, delay: at(0.5) }}
                />
              </g>
            </mask>

            {/* The glint is clipped to the mark's own silhouette. */}
            <clipPath id={id("clip")}>
              <path d={CRESCENT} />
              <path d={BODY} />
              <path d={CREST} />
              <path d={SWEEP} />
              {BARS.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </clipPath>
            <linearGradient id={id("glint")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="0.65" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </>
        )}

        {variant === "spinner" && !still && (
          <>
          <clipPath id={id("sweep-clip")}>
            <path d={SWEEP} />
          </clipPath>
          <linearGradient id={id("travel")} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="260" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.7" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          </>
        )}
      </defs>

      {/* ---- The mark, back to front ---- */}
      <g mask={intro ? `url(#${id("m-crescent")})` : undefined}>
        <path d={CRESCENT} fill={DEEP} />
      </g>
      <g mask={intro ? `url(#${id("m-body")})` : undefined}>
        <path d={BODY} fill={`url(#${id("body")})`} />
      </g>
      <g mask={intro ? `url(#${id("m-crest")})` : undefined}>
        <path d={CREST} fill={CREST_FILL} />
      </g>
      <g mask={intro ? `url(#${id("m-sweep")})` : undefined}>
        <path d={SWEEP} fill={`url(#${id("sweep")})`} />
      </g>

      {BARS.map((d, i) =>
        intro ? (
          <motion.path
            key={i}
            d={d}
            fill={DEEP}
            style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: at(0.55 + i * 0.1) }}
          />
        ) : (
          <path
            key={i}
            d={d}
            fill={DEEP}
            className={variant === "spinner" ? "cs-logo-bar" : undefined}
            style={variant === "spinner" ? ({ "--bar": i } as React.CSSProperties) : undefined}
          />
        )
      )}

      {/* Spinner: a light travelling the arrow, clipped to the sweep. */}
      {variant === "spinner" && !still && (
        <g clipPath={`url(#${id("sweep-clip")})`}>
          <rect className="cs-logo-travel" x="-260" y="300" width="260" height="700" fill={`url(#${id("travel")})`} />
        </g>
      )}

      {/* Intro: one glint across the finished mark. */}
      {intro && (
        <g clipPath={`url(#${id("clip")})`}>
          {/* Skew and offset on the group; the motion transform would replace them. */}
          <g transform="translate(-300 0) skewX(-18)">
            <motion.rect
              width="300"
              height="1100"
              fill={`url(#${id("glint")})`}
              initial={{ x: 0 }}
              animate={{ x: 1600 }}
              transition={{ duration: 0.7, ease: "easeInOut", delay: at(1.05) }}
            />
          </g>
        </g>
      )}
    </svg>
  );
}

/*
 * Geometry note. The paths above were produced by tracing public/logo.webp:
 * each colour region was separated (deep by lightness, mid vs light by its
 * green/blue ratio, which keeps the arrow's light-to-cyan gradient in one
 * piece), traced along its pixel edges at 4x, smoothed with a curvature-aware
 * average and refitted with Schneider's least-squares Bézier fit. The bars are
 * straight-edged polygons. Silhouette difference against the original: ~5%,
 * almost all of it the original's anti-aliased edge.
 */
