"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import { ChevronDown, Loader2, MessageSquare, Search, Trash2, UserRound } from "lucide-react"
import { useT } from "@/lib/i18n"
import { authMessages } from "@/lib/i18n/messages/auth"
import { Panel } from "@/components/account/panel"
import type { ChatTranscript } from "@/lib/chat-types"

/**
 * Every conversation visitors have had with the site assistant.
 *
 * Admin-only, and rendered as the exchange itself rather than a table of rows:
 * the value in reading these is hearing how someone actually asked for what
 * they wanted, which a summarised grid throws away.
 */
export function ChatTranscriptsSection({
  chats,
  failed,
  formatDate,
  onDeleted,
}: {
  /** Null while loading. */
  chats: ChatTranscript[] | null
  failed: boolean
  formatDate: (iso?: string | null) => string
  onDeleted: (id: string) => void
}) {
  const t = useT(authMessages)
  const [query, setQuery] = useState("")
  const [openId, setOpenId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!chats) return null
    const needle = query.trim().toLowerCase()
    if (!needle) return chats
    // Searches the exchange itself, not just the preview — the useful question
    // is often the third one, not the first.
    return chats.filter(chat =>
      [chat.userEmail, chat.pagePath, ...chat.messages.map(m => m.content)]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    )
  }, [chats, query])

  const handleDelete = async (id: string) => {
    if (!window.confirm(t("chatDeleteConfirm"))) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/chats/${id}`, { method: "DELETE" })
      if (res.ok) {
        if (openId === id) setOpenId(null)
        onDeleted(id)
      }
    } catch {
      /* Leaving the row in place is the honest outcome of a failed delete. */
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <Panel
      title={t("chatsTitle")}
      subtitle={t("chatsSubtitle")}
      icon={<MessageSquare size={15} />}
      action={
        chats && chats.length > 0 ? (
          <label className="relative shrink-0">
            <Search
              size={13}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "rgb(var(--flow-text-soft))" }}
            />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t("chatSearch")}
              aria-label={t("chatSearch")}
              className="w-36 rounded-full py-1.5 pl-8 pr-3 text-xs outline-none transition-all focus:w-48 sm:w-44 sm:focus:w-60"
              style={{
                background: "rgb(var(--flow-surface))",
                border: "1px solid var(--flow-border-strong)",
                color: "rgb(var(--flow-text))",
              }}
            />
          </label>
        ) : undefined
      }
    >
      {chats === null && !failed ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin" style={{ color: "rgb(var(--accent-1))" }} />
        </div>
      ) : failed ? (
        <p className="py-8 text-center text-sm" style={{ color: "rgb(239 68 68)" }}>
          {t("chatsLoadFailed")}
        </p>
      ) : chats!.length === 0 ? (
        <EmptyState label={t("chatsEmpty")} />
      ) : filtered!.length === 0 ? (
        <EmptyState label={t("chatNoMatches")} />
      ) : (
        <div className="space-y-2">
          {filtered!.map(chat => (
            <ConversationRow
              key={chat._id}
              chat={chat}
              open={openId === chat._id}
              deleting={deletingId === chat._id}
              formatDate={formatDate}
              onToggle={() => setOpenId(openId === chat._id ? null : chat._id)}
              onDelete={() => handleDelete(chat._id)}
            />
          ))}
        </div>
      )}
    </Panel>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-12 text-center">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ background: "rgb(var(--accent-1) / 0.1)", border: "1px solid rgb(var(--accent-1) / 0.2)" }}
      >
        <MessageSquare className="h-6 w-6" style={{ color: "rgb(var(--accent-1))" }} />
      </div>
      <p className="text-sm" style={{ color: "rgb(var(--flow-text-soft))" }}>
        {label}
      </p>
    </div>
  )
}

function ConversationRow({
  chat,
  open,
  deleting,
  formatDate,
  onToggle,
  onDelete,
}: {
  chat: ChatTranscript
  open: boolean
  deleting: boolean
  formatDate: (iso?: string | null) => string
  onToggle: () => void
  onDelete: () => void
}) {
  const t = useT(authMessages)
  const who = chat.userEmail || t("chatAnonymous")

  return (
    <div
      className="overflow-hidden rounded-xl transition-colors"
      style={{
        background: open ? "rgb(var(--flow-surface))" : "transparent",
        border: `1px solid ${open ? "var(--flow-border-strong)" : "var(--flow-border)"}`,
      }}
    >
      <div className="flex items-center gap-3 p-3">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-label={open ? t("chatCollapse") : t("chatOpen")}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{
              background: chat.userEmail ? "rgb(var(--accent-1) / 0.12)" : "rgb(var(--flow-surface))",
              border: "1px solid var(--flow-border-strong)",
              color: chat.userEmail ? "rgb(var(--accent-1))" : "rgb(var(--flow-text-soft))",
            }}
          >
            <UserRound size={16} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-flow-text">
              {chat.firstMessage || "—"}
            </span>
            <span className="mt-0.5 block truncate text-xs" style={{ color: "rgb(var(--flow-text-soft))" }}>
              {who} · {t("chatTurns", { count: chat.messageCount })} · {formatDate(chat.updatedAt)}
              {chat.pagePath ? ` · ${t("chatStartedOn")} ${chat.pagePath}` : ""}
            </span>
          </span>

          <span
            className="hidden shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase sm:inline-block"
            style={{
              background: "rgb(var(--accent-1) / 0.1)",
              color: "rgb(var(--accent-1))",
              border: "1px solid rgb(var(--accent-1) / 0.2)",
            }}
          >
            {chat.locale}
          </span>

          <ChevronDown
            size={16}
            className="shrink-0 transition-transform duration-300"
            style={{
              color: "rgb(var(--flow-text-soft))",
              transform: open ? "rotate(180deg)" : "none",
            }}
          />
        </button>

        <button
          type="button"
          onClick={onDelete}
          disabled={deleting}
          aria-label={t("chatDelete")}
          title={t("chatDelete")}
          className="shrink-0 rounded-lg p-2 transition-colors hover:bg-flow-card disabled:opacity-60"
          style={{ color: "rgb(239 68 68)" }}
        >
          {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-flow-border px-3 py-4 sm:px-4">
              {chat.messages.map((message, index) => (
                <Bubble key={index} role={message.role} content={message.content} />
              ))}

              <p className="pt-1 text-[11px]" style={{ color: "rgb(var(--flow-text-soft))" }}>
                {t("chatVisitor")} {chat.visitorId ? chat.visitorId.slice(0, 8) : "—"}
                {chat.userEmail ? ` · ${t("chatSignedIn")}` : ""} · {formatDate(chat.createdAt)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * The exchange, styled the way the visitor saw it — their turns on the right in
 * the brand gradient, the assistant's on the left as cards.
 */
function Bubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-sm text-white"
          style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
        >
          {content}
        </div>
      </div>
    )
  }

  return (
    <div
      className="max-w-[92%] break-words rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm"
      style={{
        background: "var(--flow-card)",
        border: "1px solid var(--flow-border)",
        color: "rgb(var(--flow-text-soft))",
      }}
    >
      <ReactMarkdown
        components={{
          // Opened away from the dashboard so reading a transcript never costs
          // the admin their place in the list.
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
              style={{ color: "rgb(var(--accent-1))" }}
            >
              {children}
            </a>
          ),
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-4 last:mb-0">{children}</ul>,
          ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-4 last:mb-0">{children}</ol>,
          strong: ({ children }) => <strong className="font-semibold text-flow-text">{children}</strong>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

/** Loads transcripts for an admin. Members never issue the request. */
export function useChatTranscripts(isAdmin: boolean) {
  const [chats, setChats] = useState<ChatTranscript[] | null>(null)
  const [total, setTotal] = useState<number | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!isAdmin) return
    let active = true
    fetch("/api/admin/chats")
      .then(r => (r.ok ? r.json() : Promise.reject(new Error("request failed"))))
      .then(d => {
        if (!active) return
        setChats(d?.chats ?? [])
        // The list is capped at a page's worth, so the headline figure comes
        // from the count rather than from what happened to be returned.
        setTotal(typeof d?.total === "number" ? d.total : (d?.chats?.length ?? 0))
      })
      .catch(() => {
        if (active) setFailed(true)
      })
    return () => {
      active = false
    }
  }, [isAdmin])

  const remove = (id: string) => {
    setChats(prev => (prev ?? []).filter(c => c._id !== id))
    setTotal(prev => (prev === null ? prev : Math.max(0, prev - 1)))
  }

  return { chats, total, failed, remove }
}
