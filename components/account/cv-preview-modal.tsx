"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Download, X } from "lucide-react"
import { useT } from "@/lib/i18n"
import { authMessages } from "@/lib/i18n/messages/auth"
import { buildCvHtml, type CvDocumentLabels } from "@/lib/cv-document"
import type { GeneratedCv } from "@/lib/cv-types"

/**
 * Reads a saved CV without downloading it.
 *
 * The sheet is the same HTML the PDF is built from, so what is read here is
 * exactly what would print — no second layout to keep in step. It renders in a
 * sandboxed iframe: the CV is generated from someone's own free text, and an
 * iframe keeps it walled off from the dashboard around it as well as from the
 * site's stylesheet, which would otherwise repaint it.
 */
export function CvPreviewModal({
  cv,
  labels,
  title,
  ownerEmail,
  onClose,
  onDownload,
}: {
  /** Null when nothing is open. Takes the CV itself, so the builder can preview
   *  a CV it has only just generated and never saved. */
  cv: GeneratedCv | null
  labels: CvDocumentLabels
  title: string
  /** Admins are reading other people's CVs, so name whose this is. */
  ownerEmail?: string
  onClose: () => void
  onDownload: () => void
}) {
  const t = useT(authMessages)
  const [mounted, setMounted] = useState(false)
  const [sheetHeight, setSheetHeight] = useState(1123)
  const frameRef = useRef<HTMLIFrameElement>(null)

  // Portals need a DOM to target, which the server render does not have.
  useEffect(() => setMounted(true), [])

  const html = useMemo(() => (cv ? buildCvHtml(cv, labels) : ""), [cv, labels])

  useEffect(() => {
    if (!cv) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)

    // Without this the page behind keeps scrolling under the overlay.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [cv, onClose])

  /**
   * Grows the iframe to its content instead of scrolling inside it, so the CV
   * reads as one continuous sheet and the modal does the scrolling.
   *
   * Measuring once on load is not enough: the sheet reflows when the window
   * changes width, and a web font landing after load shifts the text. Observing
   * the document's own content keeps the frame the height of what is in it —
   * which `allow-same-origin` is what makes reachable.
   *
   * It measures `.sheet`, the CV's own wrapper, and never the document element:
   * that one's scrollHeight is at least the viewport, so it grows with the very
   * frame being sized off it and runs away a screen at a time.
   */
  useEffect(() => {
    const frame = frameRef.current
    if (!cv || !frame) return

    let observer: ResizeObserver | null = null

    const attach = () => {
      const doc = frame.contentDocument
      if (!doc?.body) return

      const content = doc.querySelector<HTMLElement>(".sheet")
      const measure = () => setSheetHeight(content?.offsetHeight || doc.body.scrollHeight)

      measure()
      observer?.disconnect()
      observer = new ResizeObserver(measure)
      observer.observe(content ?? doc.body)
    }

    frame.addEventListener("load", attach)
    // srcDoc may already have loaded by the time this effect runs.
    attach()

    return () => {
      frame.removeEventListener("load", attach)
      observer?.disconnect()
    }
  }, [cv, html])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {cv && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          /*
            Block layout, not flex. As a flex child the sheet was shrunk to the
            viewport rather than overflowing it, and its own overflow-hidden
            then cut off everything past the fold with nothing left to scroll.
          */
          className="fixed inset-0 z-[9000] overflow-y-auto overscroll-contain p-3 sm:p-6"
          style={{ background: "rgb(var(--flow-bg) / 0.85)", backdropFilter: "blur(6px)" }}
        >
          <div className="mx-auto w-full max-w-[794px]">
          {/* Sticky so the title and the way out stay reachable down a long CV. */}
          <div
            onClick={event => event.stopPropagation()}
            className="sticky top-0 z-10 flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{
              background: "var(--flow-card-solid)",
              border: "1px solid var(--flow-border-strong)",
            }}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-flow-text">{title}</p>
              {ownerEmail && (
                <p className="truncate text-xs" style={{ color: "rgb(var(--flow-text-soft))" }}>
                  {ownerEmail}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onDownload}
              className="shine flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-aurora"
              style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
            >
              <Download size={13} />
              <span className="hidden sm:inline">{t("downloadPdf")}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label={t("closePreview")}
              className="shrink-0 rounded-full p-2 transition-colors hover:bg-flow-card"
              style={{ color: "rgb(var(--flow-text-soft))" }}
            >
              <X size={16} />
            </button>
          </div>

          <motion.div
            onClick={event => event.stopPropagation()}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 overflow-hidden rounded-2xl bg-white shadow-soft"
          >
            <iframe
              ref={frameRef}
              title={title}
              srcDoc={html}
              // Same-origin so the height can be measured; scripts stay off, and
              // the document has none of its own.
              sandbox="allow-same-origin"
              className="block w-full border-0 bg-white"
              style={{ height: sheetHeight }}
            />
          </motion.div>

            <div className="h-6" aria-hidden />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
