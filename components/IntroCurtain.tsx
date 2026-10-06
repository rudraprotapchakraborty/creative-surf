"use client";

import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/brand/LogoMark";

/**
 * The page loader: the logo builds itself, then the whole stage lifts away
 * like a wave drawing back off the beach, uncovering the page underneath.
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
      <div className="cs-intro-stage relative flex h-full items-center justify-center">
        <div className="relative h-36 w-36 md:h-44 md:w-44">
          <LogoMark variant="intro" delay={0.05} className="absolute inset-0 h-full w-full" />
        </div>
      </div>
    </div>
  );
}
