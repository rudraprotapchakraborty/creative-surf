/**
 * Locale configuration for the Creative Surf website.
 *
 * The active locale lives in a cookie so the server can render the correct
 * language on first paint (no flash of English), and in React context so the
 * switcher updates the UI instantly without a navigation.
 */

export const LOCALES = ["en", "fr", "de"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "cs_locale";

/** One year — the preference should outlive a session. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const LOCALE_META: Record<Locale, { label: string; short: string; native: string; flag: string }> = {
  en: { label: "English", short: "EN", native: "English", flag: "🇬🇧" },
  fr: { label: "French", short: "FR", native: "Français", flag: "🇫🇷" },
  de: { label: "German", short: "DE", native: "Deutsch", flag: "🇩🇪" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Normalises anything (cookie value, Accept-Language tag) to a supported locale. */
export function resolveLocale(value: string | undefined | null): Locale {
  if (!value) return DEFAULT_LOCALE;
  const lower = value.toLowerCase();
  if (isLocale(lower)) return lower;
  const base = lower.split("-")[0];
  return isLocale(base) ? base : DEFAULT_LOCALE;
}
