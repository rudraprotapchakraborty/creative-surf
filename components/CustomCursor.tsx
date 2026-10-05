"use client"

import { useEffect, useRef } from "react"

/**
 * The site cursor: a dot that sits exactly on the pointer and a ring that
 * trails it a moment behind. Both draw in difference blend, so they read dark
 * on the paper and light on the deep bands and photographs without any
 * per-section colour logic.
 *
 * It only exists for a real mouse — on touch there is no cursor to replace.
 * Text fields keep the native I-beam (you need to see where you're typing),
 * embedded frames (the CV previews) get their own native cursor,
 * and anything can steer it with a data attribute:
 *
 *   data-cursor="none"    hide it (an element drawing its own, like the work tags)
 *   data-cursor="Label"   grow the ring and show the label inside it
 *
 * Position is written straight to transforms inside one rAF loop, so moving
 * the mouse never re-renders React.
 */

const INTERACTIVE = 'a, button, [role="button"], summary, label, select, [data-cursor-hover]'
const TEXT_ENTRY =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="submit"]):not([type="button"]):not([type="file"]), textarea, [contenteditable="true"], [contenteditable=""]'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    if (!fine.matches) return
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    const root = document.documentElement

    let x = -100, y = -100 // pointer
    let rx = -100, ry = -100 // ring, trailing
    let visible = false
    let active = false
    let frame = 0

    const setState = (state: "default" | "hover" | "label" | "hidden" | "text") => {
      ring.dataset.state = state
      dot.dataset.state = state
    }

    // The loop only runs while the ring is still catching up with the
    // pointer; once it settles it stops, and the next move starts it again.
    // An idle page does no per-frame work.
    const loop = () => {
      // Ease the ring toward the pointer; snap under reduced motion.
      const k = still ? 1 : 0.2
      rx += (x - rx) * k
      ry += (y - ry) * k
      const settled = Math.abs(x - rx) < 0.1 && Math.abs(y - ry) < 0.1
      if (settled) {
        rx = x
        ry = y
      }
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      frame = settled ? 0 : requestAnimationFrame(loop)
    }
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(loop)
    }

    const show = (on: boolean) => {
      if (on === visible) return
      visible = on
      dot.style.opacity = ring.style.opacity = on ? "1" : "0"
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      // The cursor takes over on the first real mouse move, not at load:
      // hiding the native cursor restyles the whole document (html.cs-cursor *),
      // and that cost belongs after the page is up, when nobody notices it.
      if (!active) {
        active = true
        root.classList.add("cs-cursor")
      }
      x = e.clientX
      y = e.clientY
      wake()
      if (!visible) {
        // First move after entering: start the ring on the pointer, not flying in.
        rx = x
        ry = y
        show(true)
      }
    }

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null
      if (!target || !(target instanceof Element)) return

      // An embedded frame is its own document: no mouse events reach this one
      // while the pointer is inside it, so the cursor would freeze at the edge.
      // Hand over to the frame's native cursor until the pointer comes back.
      if (target.closest("iframe")) return setState("hidden")

      const steer = target.closest<HTMLElement>("[data-cursor]")
      if (steer?.dataset.cursor === "none") return setState("hidden")
      if (steer?.dataset.cursor) {
        label.textContent = steer.dataset.cursor
        return setState("label")
      }
      if (target.closest(TEXT_ENTRY)) return setState("text")
      if (target.closest(INTERACTIVE)) return setState("hover")
      setState("default")
    }

    const onDown = () => ring.classList.add("is-pressed")
    const onUp = () => ring.classList.remove("is-pressed")
    const onLeave = () => show(false)

    setState("default")
    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerover", onOver, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    window.addEventListener("pointerup", onUp, { passive: true })
    document.documentElement.addEventListener("mouseleave", onLeave)
    window.addEventListener("blur", onLeave)

    return () => {
      cancelAnimationFrame(frame)
      root.classList.remove("cs-cursor")
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerover", onOver)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("blur", onLeave)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} aria-hidden className="cs-cursor-ring">
        <span ref={labelRef} className="cs-cursor-label" />
      </div>
      <div ref={dotRef} aria-hidden className="cs-cursor-dot" />
    </>
  )
}
