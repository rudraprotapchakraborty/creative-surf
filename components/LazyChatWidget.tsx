"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

/*
 * The assistant (with its markdown renderer) is the heaviest thing every page
 * carries, and nobody can use it before they have touched the page. So its
 * code is fetched on the first sign of a person — a pointer move, a scroll, a
 * key, a touch — or after a few seconds regardless, never during page load.
 */
const ChatWidget = dynamic(() => import("./ChatWidget").then((m) => m.ChatWidget), { ssr: false })

const WAKE_EVENTS = ["pointermove", "pointerdown", "keydown", "scroll", "touchstart"] as const
const FALLBACK_MS = 10_000

export function LazyChatWidget() {
  const [awake, setAwake] = useState(false)

  useEffect(() => {
    if (awake) return
    const wake = () => setAwake(true)
    WAKE_EVENTS.forEach((type) => window.addEventListener(type, wake, { once: true, passive: true }))
    const timer = window.setTimeout(wake, FALLBACK_MS)
    return () => {
      WAKE_EVENTS.forEach((type) => window.removeEventListener(type, wake))
      window.clearTimeout(timer)
    }
  }, [awake])

  return awake ? <ChatWidget /> : null
}
