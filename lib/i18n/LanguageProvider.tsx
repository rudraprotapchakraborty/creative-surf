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
import { getLoadedLocale, loadLocale, type LocaleBundle } from "./load";
import type { Dict, Messages } from "./types";

/**
 * React's `use()`. The app router runs on React 19, but the installed type
 * definitions are React 18's, which don't declare it.
 */
const use = (React as unknown as { use<T>(promise: Promise<T>): T }).use;

/** Fetches a locale's bundle (if it isn't English or already here), then runs `then`. */
function whenLoaded(locale: Locale, then: () => void) {
  if (locale === "en" || getLoadedLocale(locale)) then();
  else loadLocale(locale).then(then, () => {
    /* offline or a failed deploy — stay in the current language */
  });
}

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
    // The copy arrives first, then the whole page switches at once.
    whenLoaded(next, () => React.startTransition(() => setLocaleState(next)));
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
    if (preferred !== DEFAULT_LOCALE) {
      whenLoaded(preferred, () => React.startTransition(() => setLocaleState(preferred)));
    }
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
  // English is bundled with the code. Another language is a separate download:
  // on a page served in that language, the first render waits for it (on the
  // server, and while hydrating, where the server's HTML stays on screen), and
  // after that `use` reads the settled promise synchronously. Always go through
  // `use` for a non-English locale, even once it has loaded: React replays a
  // component that suspended, and skipping `use` on the replay changes the
  // hook sequence (React error #467).
  const bundle: LocaleBundle | undefined = locale === "en" ? undefined : use(loadLocale(locale));
  return React.useMemo(() => createTranslator(messages, locale, bundle), [messages, locale, bundle]);
}
