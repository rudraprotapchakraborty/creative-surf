import type { Locale } from "./config";
import type { Dict } from "./types";

/**
 * Loads a language's copy on demand. English ships with the code; every other
 * language is a separate chunk (./locales/<locale>.ts) fetched only when a
 * visitor is reading the site in it. Works on the server and in the browser.
 */

export type LocaleBundle = Record<string, Dict>;

const loaders: Record<Exclude<Locale, "en">, () => Promise<{ default: LocaleBundle }>> = {
  fr: () => import("./locales/fr"),
  de: () => import("./locales/de"),
  ar: () => import("./locales/ar"),
  bn: () => import("./locales/bn"),
};

/**
 * A promise that also records its result on itself. React's `use()` reads
 * `status`/`value`, so once a bundle has arrived, components read it
 * synchronously instead of suspending again.
 */
type TrackedPromise = Promise<LocaleBundle> & {
  status?: "pending" | "fulfilled" | "rejected";
  value?: LocaleBundle;
  reason?: unknown;
};

const cache = new Map<Locale, TrackedPromise>();

export function loadLocale(locale: Exclude<Locale, "en">): TrackedPromise {
  let promise = cache.get(locale);
  if (!promise) {
    const tracked: TrackedPromise = loaders[locale]().then((mod) => mod.default);
    tracked.status = "pending";
    tracked.then(
      (value) => {
        tracked.status = "fulfilled";
        tracked.value = value;
      },
      (reason) => {
        tracked.status = "rejected";
        tracked.reason = reason;
        // Let a later attempt (e.g. switching again) retry the download.
        cache.delete(locale);
      }
    );
    cache.set(locale, tracked);
    promise = tracked;
  }
  return promise;
}

/** The bundle if it has already arrived, without starting a download. */
export function getLoadedLocale(locale: Locale): LocaleBundle | undefined {
  if (locale === "en") return undefined;
  const promise = cache.get(locale);
  return promise?.status === "fulfilled" ? promise.value : undefined;
}
