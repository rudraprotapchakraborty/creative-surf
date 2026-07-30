"use client"

import { useT } from "@/lib/i18n"
import { editorUiMessages } from "@/lib/i18n/messages/editorUi"

import { useRef, useState, useCallback } from "react"
import { ImagePlus, Loader2 } from "lucide-react"
import { uploadImageFile } from "@/components/ui/ImageUpload"

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/avif"
const MAX_INPUT_MB = 20

interface MarkdownImageInsertProps {
  onInsert: (markdown: string) => void
  /** Max output dimension (longest edge) in px. Default 1920 for full-width post photos. */
  maxDim?: number
  className?: string
}

function imageMarkdown(url: string, alt: string) {
  return `![${alt}](${url})`
}

function altFromFilename(name: string) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim()
}

export default function MarkdownImageInsert({
  onInsert,
  maxDim = 1920,
  className = "",
}: MarkdownImageInsertProps) {
  const t = useT(editorUiMessages)
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  const handleFiles = useCallback(
    async (files: FileList | null | undefined) => {
      if (!files?.length) return
      setError("")
      setBusy(true)

      try {
        const snippets: string[] = []
        for (const file of Array.from(files)) {
          if (!file.type.startsWith("image/")) {
            setError("Please choose image files only.")
            continue
          }
          if (file.size > MAX_INPUT_MB * 1024 * 1024) {
            setError(`Each image must be under ${MAX_INPUT_MB}MB.`)
            continue
          }
          const url = await uploadImageFile(file, { maxDim })
          const alt = altFromFilename(file.name) || "Photo"
          snippets.push(imageMarkdown(url, alt))
        }
        if (snippets.length) {
          onInsert(snippets.join("\n\n"))
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed. Try another file.")
      } finally {
        setBusy(false)
        if (inputRef.current) inputRef.current.value = ""
      }
    },
    [maxDim, onInsert]
  )

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        multiple
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-60"
        style={{
          background: "rgb(var(--accent-1) / 0.1)",
          color: "rgb(var(--accent-1))",
          border: "1px solid rgb(var(--accent-1) / 0.25)",
        }}
      >
        {busy ? (
          <><Loader2 size={13} className="animate-spin" /> {t("upload.uploading")}</>
        ) : (
          <><ImagePlus size={13} /> {t("upload.addPhoto")}</>
        )}
      </button>
      {error && (
        <p className="text-[11px] mt-1.5" style={{ color: "rgb(239 68 68)" }}>{error}</p>
      )}
    </div>
  )
}