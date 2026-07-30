"use client";

import * as React from "react";
import { Check, Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LOCALES, LOCALE_META, useLanguage, useT, type Locale } from "@/lib/i18n";
import { commonMessages } from "@/lib/i18n/messages/common";

/**
 * Globe dropdown used in the navbar. `variant="inline"` renders a flat row of
 * buttons instead, which reads better inside the mobile sheet.
 */
export function LanguageSwitcher({
  variant = "dropdown",
  align = "right",
  onSelect,
}: {
  variant?: "dropdown" | "inline";
  align?: "left" | "right";
  onSelect?: () => void;
}) {
  const { locale, setLocale } = useLanguage();
  const t = useT(commonMessages);
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const choose = (next: Locale) => {
    setLocale(next);
    setOpen(false);
    onSelect?.();
  };

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-1.5" role="group" aria-label={t("labels.chooseLanguage")}>
        {LOCALES.map((code) => {
          const active = code === locale;
          return (
            <button
              key={code}
              type="button"
              onClick={() => choose(code)}
              aria-current={active ? "true" : undefined}
              className={`flex-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                active
                  ? "bg-flow-card text-flow-text border border-aurora-1/40"
                  : "text-flow-textSoft border border-transparent hover:text-flow-text hover:bg-flow-card"
              }`}
            >
              <span className="mr-1.5" aria-hidden>
                {LOCALE_META[code].flag}
              </span>
              {LOCALE_META[code].short}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("labels.chooseLanguage")}
        title={t("labels.language")}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-full text-flow-textSoft hover:text-aurora-1 hover:bg-flow-card transition-colors"
      >
        <Globe className="w-[18px] h-[18px]" />
        <span className="text-xs font-bold tracking-wide">{LOCALE_META[locale].short}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t("labels.language")}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`absolute top-[calc(100%+0.6rem)] ${
              align === "right" ? "right-0" : "left-0"
            } min-w-[10.5rem] p-1.5 rounded-2xl glass-strong border border-flow-border shadow-soft z-[6000]`}
          >
            {LOCALES.map((code) => {
              const active = code === locale;
              return (
                <li key={code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => choose(code)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? "text-flow-text bg-flow-card"
                        : "text-flow-textSoft hover:text-flow-text hover:bg-flow-card"
                    }`}
                  >
                    <span className="text-base leading-none" aria-hidden>
                      {LOCALE_META[code].flag}
                    </span>
                    <span className="flex-1 text-left">{LOCALE_META[code].native}</span>
                    {active && <Check className="w-4 h-4 text-aurora-1" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
