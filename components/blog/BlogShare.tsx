import { Facebook, Linkedin } from "lucide-react"

/** lucide only ships the pre-rebrand bird, so the X mark is inlined. */
function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

interface BlogShareProps {
  /** Absolute canonical URL of the post — share dialogs reject relative paths. */
  url: string
  title: string
  label?: string
  accentColor?: string
}

export default function BlogShare({
  url,
  title,
  label = "Share",
  accentColor = "rgb(var(--accent-1))",
}: BlogShareProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const targets = [
    {
      Icon: XIcon,
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      Icon: Facebook,
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      Icon: Linkedin,
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ]

  return (
    <div className="mt-10 sm:mt-12 pt-6 sm:pt-8" style={{ borderTop: "1px solid var(--flow-border)" }}>
      <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: "rgb(var(--flow-text-soft))" }}>
        {label}
      </p>
      <div className="flex items-center gap-2.5">
        {targets.map(({ Icon, name, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} — ${name}`}
            title={name}
            className="inline-flex items-center justify-center rounded-full transition-all hover:-translate-y-0.5"
            style={{
              width: 38,
              height: 38,
              border: "1px solid var(--flow-border)",
              color: accentColor,
            }}
          >
            <Icon size={16} />
          </a>
        ))}
      </div>
    </div>
  )
}
