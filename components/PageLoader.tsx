'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// ── Wave glyph (🌊) — main site. Outer = silhouette the water fills, inner = barrel curl.
// Artwork adapted from Twemoji (https://github.com/jdecked/twemoji) — CC-BY 4.0. viewBox 0 0 36 36.
const WAVE_BODY =
  'M35.988 25.193c0-2.146-2.754-2.334-4-1.119-2.994 2.919-7.402 4.012-13.298 2.861-10.25-2-10.341-14.014-3.333-17.441 3.791-1.854 8.289.341 9.999 1.655 1.488 1.143 4.334 2.66 4.185.752C29.223 7.839 21.262-.86 10.595 4.64-.071 10.14 0 22.553 0 24.803v7.25C0 34.262 1.814 36 4.023 36h28C34.232 36 36 34.262 36 32.053c0 0-.004-6.854-.012-6.86z';
const WAVE_DETAILS = [
  'M33.398 23.678c-7.562 4.875-20.062-.438-18.375-8.062 1.479-6.684 9.419-4.763 11.225-3.861 1.806.902.713-3.889-3.475-5.327C17.1 4.48 10.156 4.893 7.961 14.678c-1.5 6.687 1.438 16.062 12.719 16.187 11.281.125 12.718-7.187 12.718-7.187z',
];

// ── Building glyph — real-estate section. Stepped towers + a grid of windows. viewBox 0 0 36 36.
const BUILDING_BODY =
  'M4 36 L4 23 L9 23 L9 7 Q9 6 10 6 L20 6 Q21 6 21 7 L21 16 L31 16 L31 36 Z';
const BUILDING_DETAILS = [
  'M12 12 h3', 'M12 16 h3', 'M12 20 h3', 'M12 24 h3',
  'M16 12 h2', 'M16 16 h2', 'M16 20 h2', 'M16 24 h2',
  'M24 21 h3', 'M24 25 h3', 'M24 29 h3',
  'M6 27 h1.5', 'M6 31 h1.5',
];

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(true), 0);
    const timeout = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  // Real-estate section runs on a dark theme + gold accent; everywhere else is the light wave.
  const realEstate = pathname.startsWith('/real-estate');

  const theme = realEstate
    ? {
        body: BUILDING_BODY,
        details: BUILDING_DETAILS,
        bodyStroke: 1.3,
        detailStroke: 1,
        grad: ['#F5D78E', '#D4A843', '#B8892A'],
        backdrop: '#03121d',
        glow: 'radial-gradient(circle at 30% 30%, rgba(212,168,67,0.20), transparent 50%), radial-gradient(circle at 70% 70%, rgba(184,137,42,0.16), transparent 60%)',
        outline: '#e8eef5',
        title: '#f4f7fb',
        accent: '#E8C57A',
        track: 'rgba(212,168,67,0.18)',
      }
    : {
        body: WAVE_BODY,
        details: WAVE_DETAILS,
        bodyStroke: 1.5,
        detailStroke: 1.3,
        grad: ['#7DD3FC', '#0EA5E9', '#0066A2'],
        backdrop: '#f3f9fd',
        glow: 'radial-gradient(circle at 30% 30%, rgba(14,165,233,0.18), transparent 50%), radial-gradient(circle at 70% 70%, rgba(0,102,162,0.16), transparent 60%)',
        outline: '#0b2540',
        title: '#18181b',
        accent: '#0EA5E9',
        track: 'rgba(2,132,199,0.15)',
      };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none overflow-hidden"
        >
          {/* Backdrop */}
          <div className="absolute inset-0" style={{ background: theme.backdrop }} />
          <div aria-hidden className="absolute inset-0" style={{ background: theme.glow }} />

          <div className="relative flex flex-col items-center gap-6">
            {/* Animated mark — fills with brand colour bottom to top */}
            <div className="relative w-28 h-28 md:w-32 md:h-32">
              {/* Filled icon, clipped by a rising animated surface */}
              <svg viewBox="0 0 36 36" className="absolute inset-0 w-full h-full">
                <defs>
                  <clipPath id="loader-fill-clip">
                    <motion.path
                      d="M 0 18 Q 9 14 18 18 T 36 18 T 54 18 T 72 18 L 72 80 L 0 80 Z"
                      initial={{ x: 0, y: 26 }}
                      animate={{ x: [0, -18], y: [26, -22] }}
                      transition={{
                        x: { repeat: Infinity, repeatType: 'loop', duration: 1.2, ease: 'linear' },
                        y: { duration: 1.5, ease: 'easeInOut' },
                      }}
                    />
                  </clipPath>
                  <linearGradient id="loader-fill-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.grad[0]} />
                    <stop offset="55%" stopColor={theme.grad[1]} />
                    <stop offset="100%" stopColor={theme.grad[2]} />
                  </linearGradient>
                </defs>

                <path
                  clipPath="url(#loader-fill-clip)"
                  fill="url(#loader-fill-grad)"
                  d={theme.body}
                />
              </svg>

              {/* Outline + interior detail on top */}
              <svg
                viewBox="0 0 36 36"
                className="absolute inset-0 w-full h-full"
                fill="none"
                stroke={theme.outline}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={theme.body} strokeWidth={theme.bodyStroke} />
                {theme.details.map((d) => (
                  <path key={d} d={d} strokeWidth={theme.detailStroke} />
                ))}
              </svg>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span
                className="text-2xl font-bold tracking-tight"
                style={{ color: theme.title }}
              >
                Creative Surf
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.4em] font-bold"
                style={{ color: theme.accent }}
              >
                {realEstate ? 'Real Estate' : 'Digital Marketing'}
              </span>
            </div>

            <div
              className="relative w-32 h-[3px] rounded-full overflow-hidden"
              style={{ background: theme.track }}
            >
              <motion.span
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-y-0 left-0 w-1/2 rounded-full"
                style={{
                  background: `linear-gradient(to right, transparent, ${theme.accent}, transparent)`,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
