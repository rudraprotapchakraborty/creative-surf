import { LogoMark } from "@/components/brand/LogoMark"

/**
 * The brand loading indicator. On the main site it is the vector mark itself
 * at work — the three bars rise and settle in turn while a light runs up the
 * arrow — so waiting looks like the logo doing what it promises. Use it
 * wherever a page or panel is waiting on data; tiny in-button "saving" dots
 * stay plain spinners.
 *
 * The real-estate section passes its own raster mark as `src`, which keeps
 * the ring-and-breathe treatment: that logo has no vector yet.
 */
export function LogoSpinner({
  size = 40,
  src,
  label = "Loading",
  className = "",
}: {
  /** Width in px; the mark keeps its own proportions. */
  size?: number
  /** A raster mark to spin instead of the vector one (real-estate pages). */
  src?: string
  /** Accessible name; pass an empty string when the parent already announces it. */
  label?: string
  className?: string
}) {
  const a11y = {
    role: label ? ("status" as const) : undefined,
    "aria-label": label || undefined,
    "aria-hidden": label ? undefined : true,
  }

  if (!src) {
    return (
      <span {...a11y} className={`inline-flex shrink-0 ${className}`} style={{ width: size }}>
        <LogoMark variant="spinner" className="h-auto w-full" />
      </span>
    )
  }

  const ring = Math.max(2, Math.round(size / 18))

  return (
    <span {...a11y} className={`relative inline-flex shrink-0 ${className}`} style={{ width: size, height: size }}>
      {/* Faint track, then the sweeping arc — a conic fade masked down to a ring. */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: `inset 0 0 0 ${ring}px rgba(5, 96, 176, 0.12)` }}
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-full animate-logo-ring"
        style={{
          background: "conic-gradient(from 0deg, transparent 0deg, rgba(0, 200, 234, 0) 120deg, #30A8E6 280deg, #0560B0 360deg)",
          mask: `radial-gradient(farthest-side, transparent calc(100% - ${ring}px), #000 calc(100% - ${ring}px + 0.5px))`,
          WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${ring}px), #000 calc(100% - ${ring}px + 0.5px))`,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        draggable={false}
        className="absolute inset-[20%] h-[60%] w-[60%] object-contain animate-logo-breathe"
      />
    </span>
  )
}
