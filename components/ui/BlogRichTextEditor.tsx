"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useEditor, EditorContent, NodeViewWrapper, ReactNodeViewRenderer, type NodeViewProps } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import { Markdown } from "tiptap-markdown"
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Link2,
  ImagePlus,
  Loader2,
  Undo2,
  Redo2,
  Minus,
} from "lucide-react"
import { uploadImageFile } from "@/components/ui/ImageUpload"
import { normalizeBlogMarkdown } from "@/lib/blog-markdown-normalize"

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/avif"
const MAX_INPUT_MB = 20

function BlogImageView({ node, selected }: NodeViewProps) {
  const { src } = node.attrs

  return (
    <NodeViewWrapper className="blog-editor-image-block my-6 sm:my-8">
      <div
        className={`rounded-2xl overflow-hidden transition-shadow ${selected ? "ring-2 ring-[rgb(var(--accent-1))] ring-offset-2 ring-offset-[var(--flow-card)]" : ""}`}
        style={{ border: "1px solid var(--flow-border)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="w-full h-auto block" draggable={false} />
      </div>
    </NodeViewWrapper>
  )
}

const BlogImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      alt: { default: null },
      title: { default: null },
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(BlogImageView)
  },
})

function getMarkdown(editor: ReturnType<typeof useEditor>) {
  if (!editor) return ""
  const storage = editor.storage as unknown as { markdown?: { getMarkdown: () => string } }
  return storage.markdown?.getMarkdown() ?? ""
}

interface ToolbarButtonProps {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}

function ToolbarButton({ onClick, active, disabled, title, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm transition-all disabled:opacity-40"
      style={{
        background: active ? "rgb(var(--accent-1) / 0.15)" : "transparent",
        color: active ? "rgb(var(--accent-1))" : "rgb(var(--flow-text))",
      }}
    >
      {children}
    </button>
  )
}

function ToolbarDivider() {
  return <div className="w-px h-6 mx-0.5" style={{ background: "var(--flow-border-strong)" }} />
}

interface BlogRichTextEditorProps {
  value: string
  onChange: (markdown: string) => void
  placeholder?: string
  minHeight?: number
}

export default function BlogRichTextEditor({
  value,
  onChange,
  placeholder = "Start writing your blog post…",
  minHeight = 400,
}: BlogRichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageBusy, setImageBusy] = useState(false)
  const [imageError, setImageError] = useState("")
  const skipExternalSync = useRef(false)
  const lastEmitted = useRef(value)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "font-medium underline underline-offset-2",
          style: "color: rgb(var(--accent-2))",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      BlogImage.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder }),
      Markdown.configure({
        html: false,
        tightLists: true,
        bulletListMarker: "-",
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    content: normalizeBlogMarkdown(value || ""),
    editorProps: {
      attributes: {
        class: "blog-rich-editor-content outline-none",
        style: `min-height: ${minHeight}px`,
      },
    },
    onUpdate: ({ editor: ed }) => {
      const md = normalizeBlogMarkdown(getMarkdown(ed))
      skipExternalSync.current = true
      lastEmitted.current = md
      onChange(md)
    },
  })

  useEffect(() => {
    if (!editor) return
    if (skipExternalSync.current) {
      skipExternalSync.current = false
      return
    }
    const normalized = normalizeBlogMarkdown(value || "")
    if (normalized !== lastEmitted.current && normalized !== normalizeBlogMarkdown(getMarkdown(editor))) {
      editor.commands.setContent(normalized)
      lastEmitted.current = normalized
    }
  }, [value, editor])

  const setBlock = useCallback(
    (level: 0 | 1 | 2 | 3) => {
      if (!editor) return
      if (level === 0) {
        editor.chain().focus().setParagraph().run()
      } else {
        editor.chain().focus().toggleHeading({ level }).run()
      }
    },
    [editor]
  )

  const setLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes("link").href as string | undefined
    const url = window.prompt("Link URL", prev || "https://")
    if (url === null) return
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  const handleImageFiles = useCallback(
    async (files: FileList | null | undefined) => {
      if (!editor || !files?.length) return
      setImageError("")
      setImageBusy(true)

      try {
        for (const file of Array.from(files)) {
          if (!file.type.startsWith("image/")) {
            setImageError("Please choose image files only.")
            continue
          }
          if (file.size > MAX_INPUT_MB * 1024 * 1024) {
            setImageError(`Each image must be under ${MAX_INPUT_MB}MB.`)
            continue
          }
          const url = await uploadImageFile(file, { maxDim: 1920 })
          editor.chain().focus().setImage({ src: url }).run()
        }
      } catch (e) {
        setImageError(e instanceof Error ? e.message : "Upload failed. Try another file.")
      } finally {
        setImageBusy(false)
        if (fileInputRef.current) fileInputRef.current.value = ""
      }
    },
    [editor]
  )

  const blockValue = editor?.isActive("heading", { level: 1 })
    ? "h1"
    : editor?.isActive("heading", { level: 2 })
      ? "h2"
      : editor?.isActive("heading", { level: 3 })
        ? "h3"
        : "p"

  return (
    <div className="blog-rich-editor rounded-xl overflow-hidden" style={{ border: "1px solid var(--flow-border-strong)" }}>
      {/* Toolbar */}
      <div
        className="flex flex-wrap items-center gap-0.5 px-2 py-2"
        style={{ background: "var(--flow-card)", borderBottom: "1px solid var(--flow-border)" }}
      >
        <select
          value={blockValue}
          onChange={e => {
            const v = e.target.value
            if (v === "p") setBlock(0)
            else if (v === "h1") setBlock(1)
            else if (v === "h2") setBlock(2)
            else setBlock(3)
          }}
          className="h-8 px-2 mr-1 rounded-lg text-xs font-semibold outline-none cursor-pointer"
          style={{
            background: "rgb(var(--flow-text) / 0.04)",
            color: "rgb(var(--flow-text))",
            border: "1px solid var(--flow-border)",
            fontFamily: "var(--font-heading)",
          }}
        >
          <option value="p">Normal text</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <ToolbarDivider />

        <ToolbarButton
          title="Bold"
          active={editor?.isActive("bold")}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          active={editor?.isActive("italic")}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Underline"
          active={editor?.isActive("underline")}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={15} />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          title="Bullet list"
          active={editor?.isActive("bulletList")}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Numbered list"
          active={editor?.isActive("orderedList")}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Quote"
          active={editor?.isActive("blockquote")}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        >
          <Quote size={15} />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton title="Insert link" active={editor?.isActive("link")} onClick={setLink}>
          <Link2 size={15} />
        </ToolbarButton>

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="hidden"
          onChange={e => handleImageFiles(e.target.files)}
        />
        <ToolbarButton
          title="Insert image"
          disabled={imageBusy}
          onClick={() => fileInputRef.current?.click()}
        >
          {imageBusy ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} />}
        </ToolbarButton>

        <ToolbarButton
          title="Divider"
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
        >
          <Minus size={15} />
        </ToolbarButton>

        <div className="flex-1" />

        <ToolbarButton title="Undo" onClick={() => editor?.chain().focus().undo().run()}>
          <Undo2 size={15} />
        </ToolbarButton>
        <ToolbarButton title="Redo" onClick={() => editor?.chain().focus().redo().run()}>
          <Redo2 size={15} />
        </ToolbarButton>
      </div>

      {imageError && (
        <p className="px-3 py-1.5 text-[11px]" style={{ color: "rgb(239 68 68)", background: "rgb(239 68 68 / 0.08)" }}>
          {imageError}
        </p>
      )}

      {/* Editor canvas */}
      <div className="px-4 sm:px-5 py-4 sm:py-5" style={{ background: "transparent" }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}