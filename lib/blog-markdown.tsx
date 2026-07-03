import type { Components } from "react-markdown"

export const blogMarkdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="font-bold text-flow-text mb-4 mt-10 leading-tight" style={{ fontSize: "clamp(1.4rem, 4vw, 2.2rem)", fontFamily: "var(--font-heading)" }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-bold text-flow-text mb-3 mt-9 leading-snug" style={{ fontSize: "clamp(1.2rem, 3vw, 1.7rem)", fontFamily: "var(--font-heading)" }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-bold text-flow-text mb-2 mt-7 leading-snug text-lg" style={{ fontFamily: "var(--font-heading)" }}>
      {children}
    </h3>
  ),
  p: ({ children, node }) => {
    const hasImage = node?.children?.some(
      (child) => child.type === "element" && child.tagName === "img"
    )
    if (hasImage) {
      return <>{children}</>
    }
    return (
      <p className="text-sm sm:text-base leading-[1.85] mb-5" style={{ color: "rgb(var(--flow-text))" }}>
        {children}
      </p>
    )
  },
  strong: ({ children }) => (
    <strong className="font-semibold" style={{ color: "rgb(var(--flow-text))" }}>
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em style={{ color: "rgb(var(--flow-text-soft))" }}>{children}</em>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 space-y-2 pl-0" style={{ listStyleType: "none" }}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 space-y-2 pl-5" style={{ listStyleType: "decimal", color: "rgb(var(--flow-text))" }}>{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-sm sm:text-base leading-relaxed flex gap-2" style={{ color: "rgb(var(--flow-text))" }}>
      <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ background: "rgb(var(--accent-1))" }} />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 py-3 sm:py-4 px-4 sm:px-5 rounded-xl" style={{ background: "rgb(var(--accent-1) / 0.06)", borderLeft: "3px solid rgb(var(--accent-1))" }}>
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-")
    if (isBlock) {
      return (
        <code className="block p-3 sm:p-4 rounded-xl text-xs sm:text-sm font-mono mb-5 overflow-x-auto" style={{ background: "rgb(var(--flow-text) / 0.06)", color: "rgb(var(--flow-text))" }}>
          {children}
        </code>
      )
    }
    return (
      <code className="px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono" style={{ background: "rgb(var(--accent-1) / 0.1)", color: "rgb(var(--accent-1))" }}>
        {children}
      </code>
    )
  },
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2" style={{ color: "rgb(var(--accent-2))" }}>
      {children}
    </a>
  ),
  hr: () => (
    <hr className="my-8" style={{ borderColor: "var(--flow-border-strong)" }} />
  ),
  img: ({ src }) => {
    if (!src) return null
    return (
      <figure className="my-6 sm:my-8">
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--flow-border)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>
      </figure>
    )
  },
}