'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { animate, AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { markIntroDone, markIntroPending } from '@/lib/intro';
import { LogoMark } from '@/components/brand/LogoMark';

/**
 * The branded intro for arriving on the homepage: the logo draws itself, the
 * wordmark rises, a counter runs to 100 and the whole stage lifts away like a
 * wave drawing back off the beach. Every other page — the real-estate section
 * included — opens straight onto its content.
 */
const LOADER_ROUTES = new Set(['/']);

/** How long the intro plays before the curtain lifts, in ms. */
const INTRO_MS = 1500;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const CURTAIN_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const still = !!useReducedMotion();
  const enabled = LOADER_ROUTES.has(pathname);
  // Seeded from the route so any other page never flashes the loader on its
  // first paint before the effect below can switch it off.
  const [loading, setLoading] = useState(enabled);

  // One progress value drives the counter, so it can't drift from the intro.
  const progress = useMotionValue(0);
  const percent = useTransform(progress, (v) => `${Math.round(v)}`);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      markIntroDone();
      return;
    }
    markIntroPending();
    setLoading(true);
    progress.set(still ? 100 : 0);
    const run = still
      ? undefined
      : animate(progress, 100, { duration: (INTRO_MS - 250) / 1000, ease: [0.45, 0, 0.2, 1] });
    const timeout = setTimeout(() => {
      setLoading(false);
      // The page underneath starts its own entrance as the curtain lifts.
      markIntroDone();
    }, INTRO_MS);
    return () => {
      run?.stop();
      clearTimeout(timeout);
    };
  }, [pathname, searchParams, enabled, progress, still]);

  const title = 'Creative Surf';

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          role="status"
          aria-live="polite"
          aria-label={`${title} — loading`}
          className="fixed inset-0 z-[9999] pointer-events-none will-change-transform"
          initial={{ transform: 'translateY(0%)' }}
          // Animating `transform` itself (not `y`) lets Motion hand the lift to
          // the compositor, so it glides even while the page below is busy.
          exit={still ? { opacity: 0 } : { transform: 'translateY(-110%)' }}
          transition={{ duration: still ? 0.3 : 0.85, ease: CURTAIN_EASE }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-cs-bg" />

          {/* Wave-shaped trailing edge — visible only while the curtain lifts. */}
          <svg
            aria-hidden
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="absolute left-0 top-full w-full h-[12vh] -mt-px fill-cs-bg"
          >
            <path d="M0 0 H1440 V40 C1200 120 960 10 720 60 C480 110 240 20 0 80 Z" />
          </svg>

          {/* Stage — fades up and away slightly ahead of the curtain. */}
          <motion.div
            className="relative h-full flex flex-col items-center justify-center gap-7"
            exit={{ opacity: 0, transform: 'translateY(-24px) scale(0.97)' }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="relative w-36 h-36 md:w-44 md:h-44">
              <LogoMark variant="intro" delay={0.1} className="absolute inset-0 h-full w-full" />
            </div>

            {/* Wordmark — letters rise out of a mask one after another. */}
            <div className="flex flex-col items-center gap-2">
              <span
                className="flex overflow-hidden pb-[0.08em] text-[1.75rem] md:text-[2.1rem] font-extrabold tracking-[-0.045em]"
                aria-hidden
              >
                {title.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className={`inline-block ${i < 8 ? 'text-cs-blue' : 'text-cs-cyan'}`}
                    initial={still ? false : { y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.03 }}
                  >
                    {char === ' ' ? ' ' : char}
                  </motion.span>
                ))}
              </span>
              <motion.span
                className="cs-meta text-cs-ink3"
                initial={still ? false : { opacity: 0, letterSpacing: '0.04em' }}
                animate={{ opacity: 1, letterSpacing: '0.2em' }}
                transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              >
                Digital Marketing
              </motion.span>
            </div>

            {/* Counter */}
            <motion.div
              className="cs-meta flex items-baseline gap-0.5 tabular-nums text-cs-ink3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <motion.span>{percent}</motion.span>
              <span>%</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
