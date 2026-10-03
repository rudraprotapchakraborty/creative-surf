"use client";

import { useEffect, useState } from "react";

/**
 * The branded intro (components/PageLoader) and whatever sits under it share
 * one signal: "the curtain is lifting". Anything heavy or worth watching waits
 * for it — a WebGL compile mid-intro stalls the loader, and an entrance played
 * behind the curtain is work nobody sees.
 */
const EVENT = "cs:intro-done";
const ATTR = "intro";

/** Never wait longer than this, in case the loader is absent or suspended. */
const FALLBACK_MS = 2600;

export function markIntroPending() {
  delete document.documentElement.dataset[ATTR];
}

export function markIntroDone() {
  if (document.documentElement.dataset[ATTR] === "done") return;
  document.documentElement.dataset[ATTR] = "done";
  window.dispatchEvent(new Event(EVENT));
}

/** False until the intro curtain starts lifting, then true for good. */
export function useIntroDone() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset[ATTR] === "done") {
      setDone(true);
      return;
    }
    const finish = () => setDone(true);
    window.addEventListener(EVENT, finish, { once: true });
    const fallback = window.setTimeout(finish, FALLBACK_MS);
    return () => {
      window.removeEventListener(EVENT, finish);
      clearTimeout(fallback);
    };
  }, []);

  return done;
}
