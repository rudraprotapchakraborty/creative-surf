"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

/* Creative Surf real-estate brand */
const G  = "#B8892A"  // gold
const GL = "#D4A843"  // gold light
const B  = "#0066A2"  // cs blue

/**
 * Persistent chrome for the real-estate experience:
 *  • a top scroll-progress bar (gold → gold-light → blue)
 *  • a custom two-part cursor (gold ring + blue dot)
 *  • toggles `html.re-active` so globals.css can theme the
 *    browser scrollbar and hide the native cursor — scoped to
 *    real-estate pages only (cleaned up on unmount).
 */
export default function RealEstateChrome() {
  // ── scroll progress ──────────────────────────────
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  // ── activate scoped scrollbar / cursor styles ─────
  useEffect(() => {
    const el = document.documentElement
    el.classList.add("re-active")
    return () => el.classList.remove("re-active")
  }, [])

  // ── custom cursor ────────────────────────────────
  const [mounted, setMounted] = useState(false)
  const [fine, setFine] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(false)

  const ringX = useSpring(-100, { damping: 25, stiffness: 300, mass: 0.5 })
  const ringY = useSpring(-100, { damping: 25, stiffness: 300, mass: 0.5 })
  const dotX  = useSpring(-100, { damping: 100, stiffness: 2000, mass: 0.1 })
  const dotY  = useSpring(-100, { damping: 100, stiffness: 2000, mass: 0.1 })

  useEffect(() => {
    setMounted(true)
    setFine(window.matchMedia("(pointer: fine)").matches)

    const move = (e: MouseEvent) => {
      ringX.set(e.clientX - 18)
      ringY.set(e.clientY - 18)
      dotX.set(e.clientX - 3)
      dotY.set(e.clientY - 3)
    }
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const interactive =
        t.tagName === "A" || t.tagName === "BUTTON" ||
        !!t.closest("a") || !!t.closest("button") ||
        window.getComputedStyle(t).cursor === "pointer"
      setHovering(interactive)
    }
    const leave = () => setHidden(true)
    const enter = () => setHidden(false)

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", over)
    document.addEventListener("mouseleave", leave)
    document.addEventListener("mouseenter", enter)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", over)
      document.removeEventListener("mouseleave", leave)
      document.removeEventListener("mouseenter", enter)
    }
  }, [ringX, ringY, dotX, dotY])

  return (
    <>
      {/* top scroll-progress bar */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[9000] pointer-events-none"
        style={{ scaleX, background: `linear-gradient(90deg, ${G}, ${GL} 45%, ${B})` }}
      />

      {/* custom cursor (desktop / fine pointer only) */}
      {mounted && fine && (
        <>
          <motion.div
            aria-hidden
            className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9998]"
            style={{ x: ringX, y: ringY, border: `1.5px solid ${G}` }}
            animate={{
              scale: hovering ? 1.6 : 1,
              opacity: hidden ? 0 : hovering ? 0.55 : 1,
              backgroundColor: hovering ? "rgba(184,137,42,0.12)" : "rgba(184,137,42,0)",
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            aria-hidden
            className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999]"
            style={{ x: dotX, y: dotY, background: B }}
            animate={{ scale: hovering ? 0 : 1, opacity: hidden ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
        </>
      )}
    </>
  )
}
