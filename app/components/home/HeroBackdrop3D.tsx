"use client";

/**
 * Owns every risk around the hero ocean so HeroOcean can stay pure.
 *
 * The rule: the hero must paint exactly as it does today, on schedule, whether
 * or not WebGL ever shows up. The canvas is imported at idle after first paint
 * and cross-faded in over the CSS/SVG swell, which stays put as the permanent
 * base layer — no WebGL, no missing hero.
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const HeroOcean = dynamic(() => import("./HeroOcean"), { ssr: false });

/** Cheap capability probe — a lost or blocked context should degrade, not throw. */
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

/** Lets the intro curtain finish lifting before WebGL claims the main thread. */
const AFTER_CURTAIN_MS = 900;

export default function HeroBackdrop3D({ ready = true }: { ready?: boolean }) {
  const reduced = useReducedMotion() ?? false;
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (!ready || !hasWebGL()) return;

    // Wait out the intro curtain, then for the browser to go idle, so the
    // loader and the wordmark own the main thread. The ocean arrives a beat
    // later, by design.
    const start = () => setMount(true);
    const canIdle = typeof window.requestIdleCallback === "function";
    let idle = 0;
    const delay = window.setTimeout(() => {
      if (canIdle) idle = window.requestIdleCallback(start, { timeout: 1500 });
      else start();
    }, AFTER_CURTAIN_MS);

    return () => {
      clearTimeout(delay);
      if (canIdle && idle) window.cancelIdleCallback(idle);
    };
  }, [ready]);

  if (!mount) return null;

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // The delay covers the chunk's first rendered frame, so the ocean never
      // cross-fades in while its canvas is still blank.
      transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
      aria-hidden
    >
      <HeroOcean reduced={reduced} />
    </motion.div>
  );
}
