"use client";

import React from "react";

type Corner = "tl" | "tr" | "bl" | "br";
type Size = "sm" | "md" | "lg";

interface WaveBackdropProps {
  /** Anchor corner of the wave */
  corner: Corner;
  /** Visual size preset */
  size?: Size;
  /** Wrapper opacity 0-1 */
  opacity?: number;
  /** Render the third top wave (used in the Hero) */
  showTop?: boolean;
  /** Unique id prefix for gradient defs (must be unique per page) */
  id: string;
}

const SIZE_MAP: Record<Size, string> = {
  sm: "w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] max-w-[1000px] max-h-[1000px]",
  md: "w-[120vw] h-[120vw] md:w-[70vw] md:h-[70vw] max-w-[1200px] max-h-[1200px]",
  lg: "w-[120vw] md:w-[85vw] lg:w-[70vw] h-[120vw] md:h-[85vw] lg:h-[70vw] max-w-[1300px] max-h-[1300px]",
};

const POSITION_MAP: Record<Corner, string> = {
  tl: "top-0 left-0",
  tr: "top-0 right-0",
  bl: "bottom-0 left-0",
  br: "bottom-0 right-0",
};

// Waves are authored as if anchored bottom-right.
// For top corners we flip vertically; for left corners we flip horizontally.
const TRANSFORM_MAP: Record<Corner, string> = {
  br: "",
  bl: "-scale-x-100",
  tr: "-scale-y-100",
  tl: "-scale-x-100 -scale-y-100",
};

/**
 * Sea-wave path states for each layer.
 * All states share the exact same command structure so SMIL can interpolate `d`
 * smoothly. Amplitudes are deliberately wide so the morph reads as real swells.
 * The container itself never moves — only the wave shapes morph.
 */
const PATH_STATES = {
  deep: [
    "M 500,500 L 0,500 C 100,400 150,300 300,350 C 400,380 450,200 500,100 Z",
    "M 500,500 L 0,500 C 130,440 200,260 320,320 C 420,420 470,160 500,80 Z",
    "M 500,500 L 0,500 C 80,380 140,330 280,375 C 420,355 430,235 500,130 Z",
    "M 500,500 L 0,500 C 120,415 175,275 310,340 C 410,395 455,190 500,95 Z",
  ],
  mid: [
    "M 500,500 L 50,500 C 150,450 250,350 350,400 C 420,430 480,250 500,150 Z",
    "M 500,500 L 50,500 C 175,420 235,375 350,385 C 440,455 470,220 500,130 Z",
    "M 500,500 L 50,500 C 130,470 270,325 355,415 C 410,415 490,275 500,170 Z",
    "M 500,500 L 50,500 C 160,440 245,360 350,395 C 430,440 475,235 500,145 Z",
  ],
  top: [
    "M 500,500 L 150,500 C 250,480 320,400 400,450 C 450,480 480,300 500,220 Z",
    "M 500,500 L 150,500 C 270,465 315,420 400,435 C 465,495 470,285 500,205 Z",
    "M 500,500 L 150,500 C 240,490 330,385 400,460 C 440,470 485,315 500,235 Z",
    "M 500,500 L 150,500 C 260,470 315,415 400,440 C 460,490 475,290 500,210 Z",
  ],
};

export default function WaveBackdrop({
  corner,
  size = "sm",
  opacity = 0.55,
  showTop = false,
  id,
}: WaveBackdropProps) {
  return (
    <div
      className={`absolute ${POSITION_MAP[corner]} ${SIZE_MAP[size]} pointer-events-none z-0 overflow-hidden ${TRANSFORM_MAP[corner]}`}
      style={{ opacity }}
      aria-hidden
    >
      <svg
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`${id}-deep`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(var(--accent-3))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(var(--accent-1))" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id={`${id}-mid`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(var(--accent-2))" stopOpacity="0.34" />
            <stop offset="100%" stopColor="rgb(var(--accent-3))" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`${id}-top`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(var(--accent-2))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="rgb(var(--accent-1))" stopOpacity="0.42" />
          </linearGradient>
        </defs>

        <path d={PATH_STATES.deep[0]} fill={`url(#${id}-deep)`}>
          <animate
            attributeName="d"
            values={`${PATH_STATES.deep[0]};${PATH_STATES.deep[1]};${PATH_STATES.deep[2]};${PATH_STATES.deep[3]};${PATH_STATES.deep[0]}`}
            keyTimes="0; 0.25; 0.5; 0.75; 1"
            calcMode="spline"
            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>

        <path d={PATH_STATES.mid[0]} fill={`url(#${id}-mid)`}>
          <animate
            attributeName="d"
            values={`${PATH_STATES.mid[0]};${PATH_STATES.mid[1]};${PATH_STATES.mid[2]};${PATH_STATES.mid[3]};${PATH_STATES.mid[0]}`}
            keyTimes="0; 0.25; 0.5; 0.75; 1"
            calcMode="spline"
            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
            dur="4.5s"
            begin="-1s"
            repeatCount="indefinite"
          />
        </path>

        {showTop && (
          <path d={PATH_STATES.top[0]} fill={`url(#${id}-top)`}>
            <animate
              attributeName="d"
              values={`${PATH_STATES.top[0]};${PATH_STATES.top[1]};${PATH_STATES.top[2]};${PATH_STATES.top[3]};${PATH_STATES.top[0]}`}
              keyTimes="0; 0.25; 0.5; 0.75; 1"
              calcMode="spline"
              keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
              dur="3.5s"
              begin="-2s"
              repeatCount="indefinite"
            />
          </path>
        )}
      </svg>
    </div>
  );
}
