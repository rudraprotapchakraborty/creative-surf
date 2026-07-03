import Link from "next/link"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
import type { BlogSeoLink } from "@/lib/blog-types"

interface BlogSeoLinksProps {
  inboundLinks?: BlogSeoLink[]
  outboundLinks?: BlogSeoLink[]
  accentColor?: string
  inboundTitle?: string
  outboundTitle?: string
}

function validLinks(links?: BlogSeoLink[]) {
  return (links ?? []).filter(link => link.label.trim() && link.url.trim())
}

function isInternalUrl(url: string) {
  return url.startsWith("/") || url.startsWith("#")
}

function LinkRow({
  link,
  external,
  accentColor,
}: {
  link: BlogSeoLink
  external: boolean
  accentColor: string
}) {
  const className =
    "inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-75 underline-offset-2 hover:underline"

  if (!external && isInternalUrl(link.url)) {
    return (
      <Link href={link.url} className={className} style={{ color: accentColor }}>
        <ArrowDownLeft size={14} />
        {link.label}
      </Link>
    )
  }

  return (
    <a
      href={link.url}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
      style={{ color: accentColor }}
    >
      {external ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
      {link.label}
    </a>
  )
}

export default function BlogSeoLinks({
  inboundLinks,
  outboundLinks,
  accentColor = "rgb(var(--accent-1))",
  inboundTitle = "Related on Creative Surf",
  outboundTitle = "External Resources",
}: BlogSeoLinksProps) {
  const inbound = validLinks(inboundLinks)
  const outbound = validLinks(outboundLinks)

  if (!inbound.length && !outbound.length) return null

  return (
    <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 space-y-6" style={{ borderTop: "1px solid var(--flow-border)" }}>
      {inbound.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgb(var(--flow-text-soft))" }}>
            {inboundTitle}
          </h2>
          <ul className="space-y-2">
            {inbound.map((link, i) => (
              <li key={`in-${i}`}>
                <LinkRow link={link} external={false} accentColor={accentColor} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {outbound.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgb(var(--flow-text-soft))" }}>
            {outboundTitle}
          </h2>
          <ul className="space-y-2">
            {outbound.map((link, i) => (
              <li key={`out-${i}`}>
                <LinkRow link={link} external accentColor={accentColor} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}