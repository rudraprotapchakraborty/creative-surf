"use client";

import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/brand/LogoMark";

/**
 * The page loader: the logo builds itself, the wordmark rises, a counter runs
 * to 100 and the whole stage lifts away like a wave drawing back off the
 * beach, uncovering the page underneath.
 *
 * Mounted once by the root layout. The homepage opens straight onto its hero;
 * every other page plays the loader, on first load and again on each
 * navigation (it is keyed by the path, so the CSS timeline restarts).
 *
 * Driven entirely by CSS (see "Page loader" in globals.css): it plays on a
 * fixed timeline from the first paint, whether or not the page's scripts have
 * arrived, and lifts at --cs-intro-lift. It is decoration — the page is
 * already rendered beneath it — so it is hidden from assistive tech and never
 * takes a pointer.
 */
const TITLE = "Creative Surf";
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const run = (name: string, duration: number, at: number, easing = EASE): CSSProperties => ({
  animation: `${name} ${duration}s ${easing} ${at}s both`,
});

export default function IntroCurtain() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Curtain key={pathname} />;
}

function Curtain() {
  return (
    <div aria-hidden className="cs-intro">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-cs-bg" />

      {/* Wave-shaped trailing edge — seen only while the curtain lifts. */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute left-0 top-full -mt-px h-[12vh] w-full fill-cs-bg"
      >
        <path d="M0 0 H1440 V40 C1200 120 960 10 720 60 C480 110 240 20 0 80 Z" />
      </svg>

      {/* Stage — fades up and away slightly ahead of the curtain. */}
      <div className="cs-intro-stage relative flex h-full flex-col items-center justify-center gap-7">
        <div className="relative h-36 w-36 md:h-44 md:w-44">
          <LogoMark variant="intro" delay={0.05} className="absolute inset-0 h-full w-full" />
        </div>

        {/* Wordmark — letters rise out of a mask one after another. */}
        <div className="flex flex-col items-center gap-2">
          <span className="flex overflow-hidden pb-[0.08em] text-[1.75rem] font-extrabold tracking-[-0.045em] md:text-[2.1rem]">
            {TITLE.split("").map((char, i) => (
              <span
                key={i}
                className={`cs-intro-anim inline-block ${i < 8 ? "text-cs-blue" : "text-cs-cyan"}`}
                style={run("cs-intro-letter", 0.45, 0.15 + i * 0.025)}
              >
                {char === " " ? " " : char}
              </span>
            ))}
          </span>
          <span
            className="cs-intro-anim cs-meta text-cs-ink3"
            style={{ ...run("cs-intro-track", 0.7, 0.3), letterSpacing: "0.2em" }}
          >
            Digital Marketing
          </span>
        </div>

        {/* Counter — a CSS integer animated 0 → 100. */}
        <div className="cs-intro-anim cs-meta flex items-baseline gap-0.5 tabular-nums text-cs-ink3" style={run("cs-intro-fade", 0.3, 0.1)}>
          <span className="cs-intro-count" />
          <span>%</span>
        </div>
      </div>
    </div>
  );
}
