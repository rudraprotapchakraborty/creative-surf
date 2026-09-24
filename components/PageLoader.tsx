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

/* ------------------------------------------------------------------ *
 * The mark — a vector rebuild of the brand logo (public/logo.png): a
 * crescent "C" wrapped around a breaking-wave "S". Drawn in a 100-unit box.
 * ------------------------------------------------------------------ */

/**
 * Crescent: a disc minus an offset disc, so the band is thick on the left and
 * tapers to a hairline on the right — the same weight shift as the logo.
 */
const CRESCENT =
  'M4 50a46 46 0 1 0 92 0a46 46 0 1 0 -92 0Z M18 48a38 38 0 1 0 76 0a38 38 0 1 0 -76 0Z';

/** The inner wave: lip curling over at the top, sweeping down into an S. */
const WAVE_S = 'M73 37C71 26 52 21 45 31C38 41 49 49 58 53C68 58 71 71 59 77C52 81 44 80 37 75';

/** Real-estate mark (public/logo2.png): rising bars and an arrow off the curve. */
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

  // One progress value drives the crescent sweep, its glowing tip and the
  // counter, so they can never drift out of step.
  const progress = useMotionValue(0);
  const percent = useTransform(progress, (v) => `${Math.round(v)}`);
  const sweep = useTransform(progress, [0, 100], [0, 1]);
  const tipRotate = useTransform(progress, [0, 100], [0, 360]);
  const tipOpacity = useTransform(progress, [0, 4, 94, 100], [0, 1, 1, 0]);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    setLoading(true);
    progress.set(still ? 100 : 0);
    const run = still
      ? undefined
      : animate(progress, 100, { duration: (INTRO_MS - 250) / 1000, ease: [0.45, 0, 0.2, 1] });
    const timeout = setTimeout(() => setLoading(false), INTRO_MS);
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
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ y: 0 }}
          // The whole stage lifts away like a wave drawing back off the beach.
          exit={still ? { opacity: 0 } : { y: '-110%' }}
          transition={{ duration: still ? 0.3 : 0.85, ease: CURTAIN_EASE }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#f3f9fd] dark:bg-[#03121d]" />

          {/* Wave-shaped trailing edge — visible only while the curtain lifts. */}
          <svg
            aria-hidden
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="absolute left-0 top-full w-full h-[12vh] -mt-px fill-[#f3f9fd] dark:fill-[#03121d]"
          >
            <path d="M0 0 H1440 V40 C1200 120 960 10 720 60 C480 110 240 20 0 80 Z" />
          </svg>

          {/* Drifting light */}
          <motion.div
            aria-hidden
            className="absolute rounded-full"
            style={{
              width: '60vmax',
              height: '60vmax',
              top: '-20vmax',
              left: '-18vmax',
              background: `radial-gradient(circle, ${theme.glowA}, transparent 62%)`,
              filter: 'blur(40px)',
            }}
            animate={still ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute rounded-full"
            style={{
              width: '55vmax',
              height: '55vmax',
              bottom: '-22vmax',
              right: '-16vmax',
              background: `radial-gradient(circle, ${theme.glowB}, transparent 62%)`,
              filter: 'blur(40px)',
            }}
            animate={still ? undefined : { x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.35] dark:opacity-[0.18]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(2,132,199,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(2,132,199,0.08) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(circle at 50% 45%, black, transparent 65%)',
              WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black, transparent 65%)',
            }}
          />

          {/* Stage — fades up and away slightly ahead of the curtain. */}
          <motion.div
            className="relative h-full flex flex-col items-center justify-center gap-7"
            exit={{ opacity: 0, y: -24, scale: 0.97 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="relative w-36 h-36 md:w-44 md:h-44">
              {/* Soft pulse behind the mark */}
              <motion.div
                aria-hidden
                className="absolute inset-[8%] rounded-full"
                style={{ background: `radial-gradient(circle, ${theme.glowA}, transparent 70%)` }}
                animate={still ? undefined : { scale: [0.92, 1.12, 0.92], opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />

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

                {realEstate ? (
                  <>
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
                  </>
                ) : (
                  <>
                    {/* The S — a soft wide underlay for body, a crisp line on top. */}
                    <motion.path
                      d={WAVE_S}
                      fill="none"
                      stroke={theme.light}
                      strokeOpacity="0.35"
                      strokeWidth="13"
                      strokeLinecap="round"
                      initial={{ pathLength: still ? 1 : 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, ease: DRAW_EASE, delay: 0.3 }}
                    />
                    <motion.path
                      d={WAVE_S}
                      fill="none"
                      stroke={`url(#${ids.innerGrad})`}
                      strokeWidth="7.5"
                      strokeLinecap="round"
                      initial={{ pathLength: still ? 1 : 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, ease: DRAW_EASE, delay: 0.3 }}
                    />
                    {/* Spray off the lip once the wave has formed */}
                    {[
                      { cx: 80, cy: 31, r: 1.8, d: 1.0 },
                      { cx: 84, cy: 38, r: 1.2, d: 1.08 },
                      { cx: 78, cy: 24, r: 1, d: 1.14 },
                    ].map((drop) => (
                      <motion.circle
                        key={`${drop.cx}-${drop.cy}`}
                        cx={drop.cx}
                        cy={drop.cy}
                        r={drop.r}
                        fill={theme.light}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={still ? { opacity: 1, scale: 1 } : { opacity: [0, 1, 0.8], scale: [0, 1.3, 1] }}
                        style={{ originX: 0.5, originY: 0.5 }}
                        transition={{ duration: 0.5, ease: EASE, delay: drop.d }}
                      />
                    ))}
                  </>
                )}
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
            </div>

            {/* Wordmark — letters rise out of a mask one after another. */}
            <div className="flex flex-col items-center gap-2">
              <span
                className="flex overflow-hidden text-2xl md:text-[1.75rem] font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                aria-hidden
              >
                {title.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={still ? false : { y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.03 }}
                  >
                    {char === ' ' ? ' ' : char}
                  </motion.span>
                ))}
              </span>
              <motion.span
                className={`text-[10px] uppercase font-bold ${theme.subtitleClass}`}
                initial={still ? false : { opacity: 0, letterSpacing: '0.15em' }}
                animate={{ opacity: 1, letterSpacing: '0.42em' }}
                transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              >
                {theme.subtitle}
              </motion.span>
            </div>

            {/* Counter */}
            <motion.div
              className="flex items-baseline gap-0.5 tabular-nums text-xs font-semibold text-zinc-500 dark:text-zinc-400"
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
