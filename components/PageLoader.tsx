'use client';

import { useEffect, useId, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { markIntroDone, markIntroPending } from '@/lib/intro';
import { LogoMark } from '@/components/brand/LogoMark';

/* ------------------------------------------------------------------ *
 * The real-estate mark — a vector rebuild of public/logo2.webp: a crescent
 * "C" with rising bars and an arrow off the curve. Drawn in a 100-unit box.
 * ------------------------------------------------------------------ */

/**
 * Crescent: a disc minus an offset disc, so the band is thick on the left and
 * tapers to a hairline on the right — the same weight shift as the logo.
 */
const CRESCENT =
  'M4 50a46 46 0 1 0 92 0a46 46 0 1 0 -92 0Z M18 48a38 38 0 1 0 76 0a38 38 0 1 0 -76 0Z';

/** Rising bars and an arrow off the curve. */
const BARS = [
  { x: 40, y: 55, h: 12 },
  { x: 52, y: 45, h: 22 },
  { x: 64, y: 33, h: 34 },
];
const ARROW = 'M28 84C50 86 70 76 86 54';
const ARROW_HEAD = 'M78 54L86 54L86 62';

/**
 * The two section landing pages. The loader is a branded intro for arriving at
 * a section, not a transition for every navigation, so interior pages
 * (/blogs, /about, /login, /real-estate/projects …) skip it entirely.
 */
const LOADER_ROUTES = new Set(['/', '/real-estate']);

/** How long the intro plays before the curtain lifts, in ms. */
const INTRO_MS = 1500;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DRAW_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
const CURTAIN_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const still = !!useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const enabled = LOADER_ROUTES.has(pathname);
  // Seeded from the route so an interior page never flashes the loader on its
  // first paint before the effect below can switch it off.
  const [loading, setLoading] = useState(enabled);

  // One progress value drives the sweep (crescent or logo), its glowing tip
  // and the counter, so they can never drift out of step.
  const progress = useMotionValue(0);
  const percent = useTransform(progress, (v) => `${Math.round(v)}`);
  const sweep = useTransform(progress, [0, 100], [0, 1]);
  const tipRotate = useTransform(progress, [0, 100], [0, 360]);
  const tipOpacity = useTransform(progress, [0, 4, 94, 100], [0, 1, 1, 0]);

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

  // Real-estate section runs on a gold accent; everywhere else is the ocean blue.
  const realEstate = pathname.startsWith('/real-estate');

  const theme = realEstate
    ? {
        deep: '#8A6414',
        mid: '#B8892A',
        light: '#E8C57A',
        glowA: 'rgba(212,168,67,0.28)',
        glowB: 'rgba(184,137,42,0.20)',
        subtitle: 'Real Estate',
        subtitleClass: 'text-[#B8892A] dark:text-[#E8C57A]',
        track: 'rgba(184,137,42,0.14)',
      }
    : {
        deep: '#0B5E9E',
        mid: '#1B8FD0',
        light: '#5BC0EB',
        glowA: 'rgba(14,165,233,0.26)',
        glowB: 'rgba(0,102,162,0.22)',
        subtitle: 'Digital Marketing',
        subtitleClass: 'text-[#0066A2] dark:text-[#38BDF8]',
        track: 'rgba(2,132,199,0.12)',
      };

  const ids = {
    crescentGrad: `ld-cg-${uid}`,
    innerGrad: `ld-ig-${uid}`,
    sweepMask: `ld-sm-${uid}`,
    crescentClip: `ld-cc-${uid}`,
    glint: `ld-gl-${uid}`,
    ringGrad: `ld-rg-${uid}`,
  };

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
          // The whole stage lifts away like a wave drawing back off the beach.
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

          {realEstate && (
            <>
              <div
                aria-hidden
                className="absolute rounded-full animate-drift-a will-change-transform"
                style={{
                  width: '60vmax',
                  height: '60vmax',
                  top: '-20vmax',
                  left: '-18vmax',
                  background: `radial-gradient(circle, ${theme.glowA}, transparent 68%)`,
                }}
              />
              <div
                aria-hidden
                className="absolute rounded-full animate-drift-b will-change-transform"
                style={{
                  width: '55vmax',
                  height: '55vmax',
                  bottom: '-22vmax',
                  right: '-16vmax',
                  background: `radial-gradient(circle, ${theme.glowB}, transparent 68%)`,
                }}
              />
            </>
          )}

          {/* Stage — fades up and away slightly ahead of the curtain. */}
          <motion.div
            className="relative h-full flex flex-col items-center justify-center gap-7"
            exit={{ opacity: 0, transform: 'translateY(-24px) scale(0.97)' }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="relative w-36 h-36 md:w-44 md:h-44">
              {/* Soft pulse behind the mark */}
              {realEstate && <div
                aria-hidden
                className="absolute inset-[8%] rounded-full animate-pulse-soft will-change-transform"
                style={{ background: `radial-gradient(circle, ${theme.glowA}, transparent 70%)` }}
              />}

              {realEstate ? (
                <>
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
                    <defs>
                      {/* Deep on the heavy left, lifting to light on the hairline right. */}
                      <linearGradient id={ids.crescentGrad} x1="0" y1="0.2" x2="1" y2="0.8">
                        <stop offset="0%" stopColor={theme.deep} />
                        <stop offset="60%" stopColor={theme.mid} />
                        <stop offset="100%" stopColor={theme.light} />
                      </linearGradient>
                      <linearGradient id={ids.innerGrad} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={theme.light} />
                        <stop offset="100%" stopColor={theme.mid} />
                      </linearGradient>
                      <linearGradient id={ids.glint} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                        <stop offset="50%" stopColor="#fff" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                      </linearGradient>

                      {/* The crescent is revealed by a thick stroke sweeping round
                          the circle — progress is literally the logo being drawn. */}
                      <mask id={ids.sweepMask} maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120">
                        <g transform="rotate(-90 50 50)">
                          <motion.circle cx="50" cy="50" r="42" fill="none" stroke="#fff" strokeWidth="22" style={{ pathLength: sweep }} />
                        </g>
                      </mask>
                      <clipPath id={ids.crescentClip}>
                        <path d={CRESCENT} clipRule="evenodd" />
                      </clipPath>
                    </defs>

                    {/* Faint full crescent as a track for the sweep */}
                    <path d={CRESCENT} fillRule="evenodd" fill={theme.track} />

                    {/* The crescent, swept in, with a glint passing over it at the end */}
                    <g mask={`url(#${ids.sweepMask})`}>
                      <path d={CRESCENT} fillRule="evenodd" fill={`url(#${ids.crescentGrad})`} />
                    </g>
                    {!still && (
                      <g clipPath={`url(#${ids.crescentClip})`}>
                        <g transform="rotate(20 50 50)">
                        <motion.rect
                          x="-30"
                          y="-10"
                          width="24"
                          height="120"
                          fill={`url(#${ids.glint})`}
                          initial={{ x: -20 }}
                          animate={{ x: 150 }}
                          transition={{ duration: 0.8, ease: 'easeInOut', delay: 1.05 }}
                        />
                        </g>
                      </g>
                    )}

                      {/* Bars rise like towers, then the arrow shoots out of the curve. */}
                      {BARS.map((bar, i) => (
                        <motion.rect
                          key={bar.x}
                          x={bar.x}
                          y={bar.y}
                          width="8"
                          height={bar.h}
                          rx="1.5"
                          fill={`url(#${ids.crescentGrad})`}
                          style={{ originX: 0.5, originY: 1 }}
                          initial={{ scaleY: still ? 1 : 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.6, ease: EASE, delay: 0.25 + i * 0.12 }}
                        />
                      ))}
                      <motion.path
                        d={ARROW}
                        fill="none"
                        stroke={`url(#${ids.innerGrad})`}
                        strokeWidth="5"
                        strokeLinecap="round"
                        initial={{ pathLength: still ? 1 : 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.7, ease: DRAW_EASE, delay: 0.55 }}
                      />
                      <motion.path
                        d={ARROW_HEAD}
                        fill="none"
                        stroke={theme.light}
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ opacity: still ? 1 : 0, scale: still ? 1 : 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ originX: 1, originY: 0 }}
                        transition={{ duration: 0.35, ease: EASE, delay: 1.15 }}
                      />
                  </svg>

                  {/* Glowing tip riding the leading edge of the crescent sweep */}
                  {!still && (
                    <motion.div aria-hidden className="absolute inset-0" style={{ rotate: tipRotate, opacity: tipOpacity }}>
                      <span
                        className="absolute left-1/2 top-[6%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                        style={{ background: '#fff', boxShadow: `0 0 10px 3px ${theme.light}, 0 0 22px 6px ${theme.mid}` }}
                      />
                    </motion.div>
                  )}
                </>
              ) : (
                <LogoMark variant="intro" delay={0.1} className="absolute inset-0 h-full w-full" />
              )}
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
                    className={`inline-block ${realEstate ? 'text-zinc-900 dark:text-zinc-100' : i < 8 ? 'text-cs-blue' : 'text-cs-cyan'}`}
                    initial={still ? false : { y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.03 }}
                  >
                    {char === ' ' ? ' ' : char}
                  </motion.span>
                ))}
              </span>
              <motion.span
                className={`cs-meta ${realEstate ? theme.subtitleClass : 'text-cs-ink3'}`}
                initial={still ? false : { opacity: 0, letterSpacing: '0.04em' }}
                animate={{ opacity: 1, letterSpacing: '0.2em' }}
                transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              >
                {theme.subtitle}
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
