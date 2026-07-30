import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALES, isLocale, resolveLocale, type Locale } from "./config";
import { createTranslator } from "./translator";
import type { Dict, Messages } from "./types";

/**
 * Reads the visitor's locale on the server: explicit cookie choice first, then
 * their browser's Accept-Language, then English.
 */
export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const headerStore = await headers();
  const accept = headerStore.get("accept-language");
  if (accept) {
    for (const part of accept.split(",")) {
      const tag = part.split(";")[0]?.trim();
      const candidate = resolveLocale(tag);
      if (candidate !== DEFAULT_LOCALE && LOCALES.includes(candidate)) return candidate;
      if (tag?.toLowerCase().startsWith("en")) return DEFAULT_LOCALE;
    }
  }

  return DEFAULT_LOCALE;
}

/** Server-component equivalent of `useT` — for metadata and RSC-only copy. */
export async function getTranslator<T extends Dict>(messages: Messages<T>) {
  const locale = await getServerLocale();
  return createTranslator(messages, locale);
}
