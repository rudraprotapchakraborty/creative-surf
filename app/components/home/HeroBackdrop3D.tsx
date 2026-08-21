"use client";

/**
 * Owns every risk around the 3D swell so WaveField can stay pure.
 *
 * The rule: the hero must paint exactly as it does today, on schedule, whether
 * or not WebGL ever shows up. The canvas is loaded at idle after first paint
 * and cross-faded in on top of the existing CSS backdrop, which stays put as
 * the permanent base layer.
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const WaveField = dynamic(() => import("./WaveField"), { ssr: false });

/** Cheap capability probe — a lost/blocked context should degrade, not throw. */
function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export default function HeroBackdrop3D() {
  const reduced = useReducedMotion() ?? false;
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (!hasWebGL()) return;

    // Wait for the browser to go idle so the headline and CTAs own the main
    // thread through LCP. The wave arrives a beat later, by design.
    const start = () => setMount(true);
    const canIdle = typeof window.requestIdleCallback === "function";
    const handle = canIdle
      ? window.requestIdleCallback(start, { timeout: 2500 })
      : window.setTimeout(start, 1200);

    return () => {
      if (canIdle) window.cancelIdleCallback(handle);
      else clearTimeout(handle);
    };
  }, []);

  if (!mount) return null;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      // Declarative fade: the short delay covers the chunk's first rendered
      // frame, so the swell never cross-fades in while the canvas is still blank.
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
      style={{
        // Lets the swell dissolve upward into the headline area instead of
        // ending on a hard horizon.
        maskImage: "linear-gradient(to bottom, transparent 0%, black 34%, black 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 34%, black 100%)",
      }}
      aria-hidden
    >
      <WaveField reduced={reduced} />
    </motion.div>
  );
}
