"use client"

import { useRef, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

// ─── Wave SVG path ────────────────────────────────────────────────────────────
function buildWavePath(phase: number, width: number): string {
  const amp = 14
  const pts: string[] = []
  const steps = 32
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width
    const y = amp + Math.sin((i / steps) * Math.PI * 5 + phase) * amp
    pts.push(i === 0 ? `M 0 ${y}` : `L ${x} ${y}`)
  }
  pts.push(`L ${width} 120 L 0 120 Z`)
  return pts.join(" ")
}

// ─── Animated wave strip at the leading edge ──────────────────────────────────
function WaveEdge() {
  const pathRef = useRef<SVGPathElement>(null)
  const rafRef  = useRef<number>(0)
  const phaseRef = useRef(0)

  useEffect(() => {
    const W = window.innerWidth || 1440
    function tick() {
      phaseRef.current += 0.06
      pathRef.current?.setAttribute("d", buildWavePath(phaseRef.current, W))
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="absolute -top-[58px] left-0 w-full h-[60px]"
      aria-hidden
    >
      <path ref={pathRef} fill="#C4963E" d="M 0 60 L 1440 60 L 1440 120 L 0 120 Z" />
    </svg>
  )
}

// ─── Centre logo shown while overlay is covering the screen ──────────────────
function OverlayLogo() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-3"
      >
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-label="Creative Surf">
          <rect width="52" height="52" rx="14" fill="#C4963E" fillOpacity="0.12" />
          <path d="M15 26C15 20.477 19.477 16 25 16C28.4 16 31.4 17.5 33.5 19.9"
            stroke="#C4963E" strokeWidth="2" strokeLinecap="round"/>
          <path d="M36 26C36 31.523 31.523 36 26 36C22.6 36 19.6 34.5 17.5 32.1"
            stroke="#E8C57A" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="25.5" cy="26" r="3" fill="#C4963E"/>
        </svg>
        <span className="text-[#C4963E] text-[11px] tracking-[0.3em] uppercase font-light">
          Creative Surf
        </span>
      </motion.div>
    </div>
  )
}

// ─── Provider ─────────────────────────────────────────────────────────────────
type Phase = "idle" | "in" | "out"

export function LuxuryTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname   = usePathname()
  const prevPath   = useRef(pathname)
  const [phase, setPhase] = useState<Phase>("idle")
  const timerRef   = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // ── 1. Intercept every internal <a> click (capture phase fires first) ───────
  useEffect(() => {
    function onLinkClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest("a") as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute("href") ?? ""

      // Ignore: external, hash-only, non-http, modified clicks, same page
      if (!href) return
      if (href.startsWith("http") || href.startsWith("//")) return
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return
      if (href.startsWith("#")) return
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return
      if (href === pathname || href === window.location.pathname) return

      // Kick off the fill-in animation
      clearTimeout(timerRef.current)
      setPhase("in")
    }

    document.addEventListener("click", onLinkClick, true)
    return () => document.removeEventListener("click", onLinkClick, true)
  }, [pathname])

  // ── 2. When the actual pathname changes → the new page is ready → drain ─────
  useEffect(() => {
    if (pathname === prevPath.current) return
    prevPath.current = pathname

    // Short pause so the new page is painted, then slide out
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setPhase("out")
      timerRef.current = setTimeout(() => setPhase("idle"), 650)
    }, 80)
  }, [pathname])

  return (
    <>
      {children}

      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key="page-overlay"
            className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"
            // Slide IN from bottom, slide OUT upward
            initial={{ y: "100%" }}
            animate={{ y: phase === "out" ? "-100%" : "0%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.55,
              ease: phase === "out"
                ? ([0.4, 0, 0.6, 1] as [number,number,number,number])
                : ([0.22, 1, 0.36, 1] as [number,number,number,number]),
            }}
            style={{
              background: "linear-gradient(to top, #050709 0%, #1a0f04 50%, #C4963E 100%)",
            }}
          >
            <WaveEdge />
            {phase === "in" && <OverlayLogo />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
