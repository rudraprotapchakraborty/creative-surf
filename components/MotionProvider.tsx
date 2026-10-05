"use client"

import type React from "react"
import { LazyMotion } from "framer-motion"

/**
 * framer-motion, split in two. Components use the slim `m` element (imported
 * everywhere as `m as motion`, so the JSX still reads `motion.div`), and the
 * features that actually animate arrive here as a separate chunk once the app
 * has mounted.
 *
 * The full `motion` bundle is ~40 KB gzipped, and every script the page asks
 * for in <head> counts against Largest Contentful Paint on Lighthouse mobile.
 * Until the features land (a moment after hydration), elements simply hold
 * their server-rendered `initial` state, which is where they start anyway.
 *
 * Keep importing `m as motion`, not `motion`: one plain `motion` import pulls
 * the full bundle back into that page.
 */
const loadFeatures = () => import("./motion-features").then((mod) => mod.default)

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>
}
