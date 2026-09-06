"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { X, ArrowUp, Square, RotateCcw } from "lucide-react";
import { useLocale, useT } from "@/lib/i18n";
import { chatMessages } from "@/lib/i18n/messages/chat";
import { getVisitorId } from "@/lib/visitor-id";

type Message = { role: "user" | "assistant"; content: string };

/** Matches MAX_MESSAGE_CHARS in app/api/chat/route.ts. */
const MAX_INPUT = 2000;

/**
 * The visitor's own copy of the exchange. Survives client-side navigation and a
 * reload, but not a closed tab — the durable copy lives server-side, keyed by
 * the conversation id stored alongside it.
 */
const STORAGE_KEY = "cs-chat-history";
const CONVERSATION_KEY = "cs-chat-conversation";

/**
 * Identifies this conversation for the whole session, so every turn updates one
 * transcript instead of scattering a visitor's exchange across several records.
 */
function conversationId(): string {
  try {
    const existing = window.sessionStorage.getItem(CONVERSATION_KEY);
    if (existing) return existing;
    const fresh = crypto.randomUUID();
    window.sessionStorage.setItem(CONVERSATION_KEY, fresh);
    return fresh;
  } catch {
    // Private mode: each turn becomes its own record rather than none at all.
    return crypto.randomUUID();
  }
}

function loadHistory(): Message[] {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (m): m is Message =>
        m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
    );
  } catch {
    return [];
  }
}

/** How far the eyes travel from centre, in viewBox units (the face is 100 wide). */
const GAZE_RADIUS = 11;

/**
 * The launcher's face: a pale dome cropped by the button, with two capsule eyes
 * that look wherever the pointer is.
 *
 * The eyes ride a circle of fixed radius around their resting position, so they
 * point at the pointer through a full 360° — anywhere on that circle, including
 * below and to the right of a launcher parked in the corner. Scaling the travel
 * by distance instead would flatten the effect into one shallow quadrant, since
 * from a corner the pointer is nearly always up and to the left.
 */
function SurfFace() {
  // The face is rendered twice on the page, and two <defs> sharing one id would
  // leave the second instance pointing at the first one's gradient.
  const gradientId = `cs-face-dome-${React.useId()}`;
  const hostRef = React.useRef<SVGSVGElement>(null);
  const eyesRef = React.useRef<SVGGElement>(null);
  const lidsRef = React.useRef<SVGGElement>(null);
  const blinkTimer = React.useRef<number | null>(null);

  /**
   * The gaze is written straight to the DOM rather than held in React state.
   *
   * A pointer produces well over a hundred move events a second, and routing
   * each one through state would re-render the entire widget — the open panel
   * and its whole message list included — to move two shapes a few pixels.
   * Writing the transform in the handler keeps the eyes locked to the cursor
   * with no render work and no easing to lag behind it.
   *
   * Tracking is skipped where there is no real pointer: on a touch screen the
   * listener would only ever fire on a tap, which reads as a twitch rather than
   * a glance.
   */
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: MouseEvent) => {
      const host = hostRef.current;
      const eyes = eyesRef.current;
      if (!host || !eyes) return;

      const rect = host.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);

      // Directly over the face there is no direction to point in, and the
      // normalised vector would spin wildly on sub-pixel movements.
      if (distance < 4) {
        eyes.style.transform = "translate(0px, 0px)";
        return;
      }

      const x = (dx / distance) * GAZE_RADIUS;
      const y = (dy / distance) * GAZE_RADIUS;
      eyes.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /**
   * Blinks whenever anything clickable on the site is pressed, so the face
   * reacts to the visitor rather than only staring at them.
   *
   * Listening on the capture phase means a control that stops propagation — a
   * menu item, a card that swallows its own clicks — still gets a blink.
   */
  React.useEffect(() => {
    const CLICKABLE = "button, a, [role='button'], input[type='submit'], input[type='button'], summary";

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest(CLICKABLE)) return;

      const lids = lidsRef.current;
      if (!lids) return;

      lids.style.transform = "scaleY(0.06)";
      if (blinkTimer.current) window.clearTimeout(blinkTimer.current);
      blinkTimer.current = window.setTimeout(() => {
        if (lidsRef.current) lidsRef.current.style.transform = "scaleY(1)";
      }, 110);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      if (blinkTimer.current) window.clearTimeout(blinkTimer.current);
    };
  }, []);

  return (
    <svg ref={hostRef} viewBox="0 0 100 100" className="h-full w-full" aria-hidden focusable="false">
      <defs>
        <radialGradient id={gradientId} cx="40%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f2f2f4" />
          <stop offset="100%" stopColor="#c9ccd2" />
        </radialGradient>
      </defs>

      {/* Centred on the button and oversized, so the dome meets both side edges
          and runs off the bottom while leaving dark above it — the peeking
          silhouette of the reference, without sitting off to one side. The head
          itself never moves: only the eyes track. */}
      <circle cx="50" cy="66" r="50" fill={`url(#${gradientId})`} />

      {/*
        Identical eyes, mirrored about the centre line and moved as one group,
        so both travel exactly the same distance in the same direction.

        No transition and no motion spring: on an SVG child a px transform is
        already in viewBox units, so the handler's value lands exactly where the
        gaze says, on the same frame as the pointer event.
      */}
      <g ref={eyesRef} fill="#0b0b0d">
        {/* Blink lives on its own group so squeezing the eyes shut never fights
            the gaze translate on the parent. The origin is the eyes' own centre
            line, so the lids close inward rather than sliding up the face. */}
        <g
          ref={lidsRef}
          style={{
            transformOrigin: "50px 53px",
            transition: "transform 70ms ease-out",
          }}
        >
          <rect x="30.5" y="39" width="13" height="28" rx="6.5" transform="rotate(18 37 53)" />
          <rect x="56.5" y="39" width="13" height="28" rx="6.5" transform="rotate(18 63 53)" />
        </g>
      </g>
    </svg>
  );
}

/** Renders assistant markdown: site paths become client-side links, everything else opens away. */
const markdownComponents = {
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className="text-aurora-1 font-medium underline underline-offset-2">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-aurora-1 font-medium underline underline-offset-2"
      >
        {children}
      </a>
    );
  },
  p: ({ children }: { children?: React.ReactNode }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-2 last:mb-0 list-disc pl-4 space-y-1">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mb-2 last:mb-0 list-decimal pl-4 space-y-1">{children}</ol>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-flow-text">{children}</strong>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="px-1 py-0.5 rounded bg-flow-card text-[0.85em]">{children}</code>
  ),
};

export function ChatWidget() {
  const t = useT(chatMessages);
  const locale = useLocale();

  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [streaming, setStreaming] = React.useState(false);
  const [error, setError] = React.useState("");

  const abortRef = React.useRef<AbortController | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const suggestions = t.list("suggestions");

  // Restore on mount only — sessionStorage is not available during SSR.
  React.useEffect(() => {
    setMessages(loadHistory());
  }, []);

  React.useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* private mode — the conversation simply won't survive a reload */
    }
  }, [messages]);

  // Pin to the newest message as tokens arrive.
  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // A widget left mid-stream on unmount would keep a fetch alive for nothing.
  React.useEffect(() => () => abortRef.current?.abort(), []);

  const send = React.useCallback(
    async (text: string) => {
      const question = text.trim().slice(0, MAX_INPUT);
      if (!question || streaming) return;

      const history = [...messages, { role: "user" as const, content: question }];
      setMessages(history);
      setInput("");
      setError("");
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history,
            locale,
            conversationId: conversationId(),
            visitorId: getVisitorId(),
            pagePath: window.location.pathname,
          }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.error || t("error"));
        }

        // The assistant turn is appended empty, then filled in place as chunks land.
        setMessages((current) => [...current, { role: "assistant", content: "" }]);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let answer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          setMessages((current) => {
            const next = [...current];
            next[next.length - 1] = { role: "assistant", content: answer };
            return next;
          });
        }

        // An empty stream would leave a blank bubble sitting there.
        if (!answer.trim()) {
          setMessages((current) => current.slice(0, -1));
          setError(t("error"));
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          // Stopped on purpose. Whatever streamed in stays on screen.
          setMessages((current) =>
            current.length && !current[current.length - 1].content.trim()
              ? current.slice(0, -1)
              : current
          );
        } else {
          setError((err as Error).message || t("error"));
        }
      } finally {
        abortRef.current = null;
        setStreaming(false);
      }
    },
    [locale, messages, streaming, t]
  );

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setError("");
    setInput("");
    // A new conversation needs a new id, or the next turn would overwrite the
    // transcript the visitor just walked away from.
    try {
      window.sessionStorage.removeItem(CONVERSATION_KEY);
    } catch {
      /* nothing stored, nothing to clear */
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter breaks the line — what people expect from a chat box.
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send(input);
    }
  };

  return (
    <>
      {/*
        Nudge above the launcher. A floating face alone does not say what it is,
        and it only earns the space while the chat is shut and unused — once
        someone has talked to Surf, the prompt has done its job.
      */}
      <AnimatePresence>
        {!open && messages.length === 0 && (
          <motion.button
            type="button"
            onClick={() => {
              setOpen(true);
              window.setTimeout(() => inputRef.current?.focus(), 260);
            }}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="fixed bottom-[5.25rem] right-5 sm:bottom-24 sm:right-6 z-[4000] rounded-full px-3.5 py-2 text-xs font-semibold text-flow-text shadow-soft"
            style={{
              background: "var(--flow-card-solid)",
              border: "1px solid var(--flow-border-strong)",
            }}
          >
            {t("bubble")}
            {/* Tail, pointing down at the face. */}
            <span
              aria-hidden
              className="absolute right-5 -bottom-1 h-2.5 w-2.5 rotate-45"
              style={{
                background: "var(--flow-card-solid)",
                borderRight: "1px solid var(--flow-border-strong)",
                borderBottom: "1px solid var(--flow-border-strong)",
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => {
          setOpen((value) => !value);
          // Focus after the panel's entrance animation, or it fights the transform.
          if (!open) window.setTimeout(() => inputRef.current?.focus(), 260);
        }}
        aria-label={open ? t("close") : t("open")}
        aria-expanded={open}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[4000] grid place-items-center w-14 h-14 overflow-hidden rounded-[28%] text-white shadow-aurora"
        style={{ background: "linear-gradient(150deg, #26262b 0%, #08080a 100%)" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
              transition={{ duration: 0.16 }}
              className="grid place-items-center"
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="face"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.16 }}
              className="absolute inset-0"
            >
              <SurfFace />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t("title")}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-[4000] flex flex-col w-[min(24rem,calc(100vw-2rem))] h-[min(32rem,calc(100vh-9rem))] rounded-3xl glass-strong border border-flow-border shadow-soft overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-flow-border">
              {/* The same face as the launcher, so the panel reads as the thing
                  the visitor just clicked rather than a separate window. */}
              <span
                className="relative w-9 h-9 flex-shrink-0 overflow-hidden rounded-[28%]"
                style={{ background: "linear-gradient(150deg, #26262b 0%, #08080a 100%)" }}
              >
                <SurfFace />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-flow-text leading-tight">{t("title")}</p>
                <p className="text-[11px] text-flow-textSoft truncate">{t("subtitle")}</p>
              </div>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  aria-label={t("clear")}
                  title={t("clear")}
                  className="p-2 rounded-full text-flow-textSoft hover:text-flow-text hover:bg-flow-card transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("close")}
                className="p-2 rounded-full text-flow-textSoft hover:text-flow-text hover:bg-flow-card transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Transcript */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              <div className="rounded-2xl rounded-tl-sm bg-flow-card border border-flow-border px-3.5 py-2.5 text-sm text-flow-text">
                {t("greeting")}
              </div>

              {messages.map((message, index) =>
                message.role === "user" ? (
                  <div key={index} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-aurora-grad text-white px-3.5 py-2.5 text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="max-w-[92%] rounded-2xl rounded-tl-sm bg-flow-card border border-flow-border px-3.5 py-2.5 text-sm text-flow-textSoft break-words"
                  >
                    {message.content ? (
                      <ReactMarkdown components={markdownComponents}>{message.content}</ReactMarkdown>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-flow-textSoft">
                        <span className="w-1.5 h-1.5 rounded-full bg-aurora-1 animate-pulse" />
                        {t("thinking")}
                      </span>
                    )}
                  </div>
                )
              )}

              {error && (
                <p className="text-xs text-destructive bg-destructive/10 rounded-xl px-3 py-2">{error}</p>
              )}

              {/* Openers, until the visitor has asked something of their own. */}
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => void send(suggestion)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium text-flow-text border border-flow-border hover:border-aurora-1/50 hover:bg-flow-card transition-colors text-left"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-flow-border px-3 pt-3 pb-2">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value.slice(0, MAX_INPUT))}
                  onKeyDown={onKeyDown}
                  rows={1}
                  maxLength={MAX_INPUT}
                  placeholder={t("placeholder")}
                  aria-label={t("placeholder")}
                  className="flex-1 resize-none bg-transparent text-sm text-flow-text placeholder:text-flow-textSoft/70 px-2 py-2 max-h-28 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => (streaming ? abortRef.current?.abort() : void send(input))}
                  disabled={!streaming && !input.trim()}
                  aria-label={streaming ? t("stop") : t("send")}
                  className="grid place-items-center flex-shrink-0 w-9 h-9 rounded-full text-white bg-aurora-grad disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all"
                >
                  {streaming ? <Square className="w-3.5 h-3.5" /> : <ArrowUp className="w-4 h-4" />}
                </button>
              </div>
              <p className="mt-1.5 px-2 text-[10px] leading-snug text-flow-textSoft/70">
                {t("disclaimer")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
