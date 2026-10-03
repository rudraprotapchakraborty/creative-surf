/**
 * The brand loading indicator: the Creative Surf mark breathing inside a ring
 * that sweeps round it in the logo's own blues. Use it wherever a page or
 * panel is waiting on data; tiny in-button "saving" dots stay plain spinners.
 */
export function LogoSpinner({
  size = 40,
  src = "/logo.webp",
  label = "Loading",
  className = "",
}: {
  /** Outer diameter in px. */
  size?: number
  /** The mark in the middle; the real-estate section passes its own logo. */
  src?: string
  /** Accessible name; pass an empty string when the parent already announces it. */
  label?: string
  className?: string
}) {
  const ring = Math.max(2, Math.round(size / 18))

  return (
    <span
      role={label ? "status" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={`relative inline-flex shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Faint track, then the sweeping arc — a conic fade masked down to a ring. */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: `inset 0 0 0 ${ring}px rgba(5, 96, 176, 0.12)`,
        }}
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
