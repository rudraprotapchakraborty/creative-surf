"use client"

import { useEffect } from "react"
import { m as motion, useScroll, useSpring } from "framer-motion"

/* Creative Surf real-estate brand */
const G  = "#B8892A"  // gold
const GL = "#D4A843"  // gold light
const B  = "#0066A2"  // cs blue

/**
 * Persistent chrome for the real-estate experience:
 *  • a top scroll-progress bar (gold → gold-light → blue)
 *  • toggles `html.re-active` so globals.css can theme the
 *    browser scrollbar — scoped to real-estate pages only
 *    (cleaned up on unmount).
 */
export default function RealEstateChrome() {
  // ── scroll progress ──────────────────────────────
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  // ── activate scoped scrollbar styles ─────────────
  useEffect(() => {
    const el = document.documentElement
    el.classList.add("re-active")
    return () => el.classList.remove("re-active")
  }, [])

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[9000] pointer-events-none"
      style={{ scaleX, background: `linear-gradient(90deg, ${G}, ${GL} 45%, ${B})` }}
    />
  )
}
