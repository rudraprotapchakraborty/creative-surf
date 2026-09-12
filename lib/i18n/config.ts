/**
 * Locale configuration for the Creative Surf website.
 *
 * The active locale lives in a cookie so the server can render the correct
 * language on first paint (no flash of English), and in React context so the
 * switcher updates the UI instantly without a navigation.
 */

export const LOCALES = ["en", "fr", "de", "ar", "bn"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "cs_locale";

/** One year — the preference should outlive a session. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const LOCALE_META: Record<
  Locale,
  { label: string; short: string; native: string; flag: string; intl: string }
> = {
  en: { label: "English", short: "EN", native: "English", flag: "🇬🇧", intl: "en-US" },
  fr: { label: "French", short: "FR", native: "Français", flag: "🇫🇷", intl: "fr-FR" },
  de: { label: "German", short: "DE", native: "Deutsch", flag: "🇩🇪", intl: "de-DE" },
  // Arabic romanised into Latin script ("Arabizi"), so it stays left-to-right
  // and needs no RTL handling.
  ar: { label: "Arabic (Latin)", short: "AR", native: "Arabi", flag: "🇸🇦", intl: "en-GB" },
  bn: { label: "Bengali", short: "BN", native: "বাংলা", flag: "🇧🇩", intl: "bn-BD" },
};

/**
 * Romanised Arabic month names — `Intl` would render these in Arabic script,
 * which would contradict the whole point of this locale.
 */
const AR_MONTHS_LONG = [
  "Yanayir", "Fibrayir", "Maris", "Abril", "Mayu", "Yunyu",
  "Yulyu", "Aghustus", "Sibtambir", "Uktubar", "Nufambir", "Disambir",
];

const AR_MONTHS_SHORT = [
  "Yan", "Fib", "Mar", "Abr", "May", "Yun",
  "Yul", "Agh", "Sib", "Ukt", "Nuf", "Dis",
];

/** Formats a date string in the visitor's locale. */
export function formatDateForLocale(
  dateStr: string,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" },
): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";

  if (locale === "ar") {
    const months = options.month === "short" ? AR_MONTHS_SHORT : AR_MONTHS_LONG;
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  return date.toLocaleDateString(LOCALE_META[locale].intl, options);
}

/**
 * Locales whose readers expect their own digits. Everything else keeps ASCII,
 * so this is a lookup rather than a call into `Intl` on every render.
 */
const LOCALE_DIGITS: Partial<Record<Locale, readonly string[]>> = {
  bn: ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"],
};

/**
 * Renders a number in the locale's own numerals.
 *
 * Applied to interpolated values only, never to a whole translated string — a
 * message can legitimately contain "Magento 2" or "$15,000", and those are
 * names and prices rather than quantities the reader counts.
 */
export function formatNumber(value: string | number, locale: Locale): string {
  const digits = LOCALE_DIGITS[locale];
  const text = String(value);
  if (!digits) return text;
  return text.replace(/[0-9]/g, (digit) => digits[Number(digit)]);
}

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
