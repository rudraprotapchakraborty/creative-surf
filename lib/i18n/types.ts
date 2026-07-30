import type { Locale } from "./config";

/** A translation value can be a string, a list, or a nested group of either. */
export type DictValue = string | number | DictValue[] | { [key: string]: DictValue };

export type Dict = { [key: string]: DictValue };

/**
 * A namespace of messages. `en` is mandatory and doubles as the fallback for
 * any key a translation has not caught up with yet.
 */
export type Messages<T extends Dict = Dict> = { en: T } & Partial<Record<Locale, T>>;

/** Helper that keeps every locale's shape checked against the English source. */
export function defineMessages<T extends Dict>(messages: { en: T } & Partial<Record<Locale, T>>): Messages<T> {
  return messages;
}
