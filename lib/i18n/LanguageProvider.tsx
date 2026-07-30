"use client";

import * as React from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  resolveLocale,
  type Locale,
} from "./config";
import { createTranslator, type Translator } from "./translator";
import type { Dict, Messages } from "./types";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  initialLocale = DEFAULT_LOCALE,
  children,
}: {
  initialLocale?: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = React.useState<Locale>(initialLocale);

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next);
    // Persist so the server renders this language directly on the next load.
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};samesite=lax`;
    try {
      window.localStorage.setItem(LOCALE_COOKIE, next);
    } catch {
      /* private mode — the cookie is enough */
    }
  }, []);

  // Keep <html lang> honest for screen readers, translation tools and SEO.
  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // If the cookie was dropped (or this is a statically served shell) fall back
  // to whatever the visitor last chose.
  React.useEffect(() => {
    if (initialLocale !== DEFAULT_LOCALE) return;
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(LOCALE_COOKIE);
    } catch {
      stored = null;
    }
    const fromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${LOCALE_COOKIE}=`))
      ?.split("=")[1];
    const preferred = resolveLocale(fromCookie ?? stored);
    if (preferred !== DEFAULT_LOCALE) setLocaleState(preferred);
  }, [initialLocale]);

  const value = React.useMemo<LanguageContextValue>(() => ({ locale, setLocale }), [locale, setLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext);
  // Components rendered outside the provider (e.g. isolated tests) still work,
  // they just always speak English.
  if (!ctx) return { locale: DEFAULT_LOCALE, setLocale: () => {} };
  return ctx;
}

export function useLocale(): Locale {
  return useLanguage().locale;
}

/**
 * Primary hook. Pass the namespace the component needs:
 *
 *   const t = useT(navMessages);
 *   <span>{t("links.home")}</span>
 */
export function useT<T extends Dict>(messages: Messages<T>): Translator<T> {
  const locale = useLocale();
  return React.useMemo(() => createTranslator(messages, locale), [messages, locale]);
}
