"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { cn } from "@/lib/utils";
import { Reveal, SectionIntro } from "@/app/components/editorial";

/** Live URLs and screenshots are facts, not copy — only category/description translate. */
const PROJECTS = [
  { name: "Bee Team Studios", domain: "beeteamltd.com", url: "https://www.beeteamltd.com/", image: "/work-beeteam.webp" },
  { name: "Sirius A Marketing", domain: "sirius-a-marketing.vercel.app", url: "https://sirius-a-marketing.vercel.app/", image: "/work-sirius.webp" },
  { name: "Nami Moon", domain: "nami-moon.vercel.app", url: "https://nami-moon.vercel.app/", image: "/work-namimoon.webp" },
  { name: "Spring Field Developments", domain: "springfield-developments.vercel.app", url: "https://springfield-developments.vercel.app/", image: "/work-springfield.webp" },
];

/**
 * Placement on the 12-column grid, by index: big–small, then small–big, each
 * pair stepped down, so the eye zigzags through the spread rather than
 * scanning four equal tiles. Every frame keeps the screenshots' own 16:10 —
 * cropping a website to portrait cuts its type off and reads as a bug.
 */
const LAYOUT = [
  { cell: "lg:col-span-7", sizes: "(min-width: 1024px) 56vw, 85vw" },
  { cell: "lg:col-span-5 lg:col-start-8 lg:mt-32", sizes: "(min-width: 1024px) 40vw, 85vw" },
  { cell: "lg:col-span-5 lg:mt-16", sizes: "(min-width: 1024px) 40vw, 85vw" },
  { cell: "lg:col-span-7 lg:col-start-6 lg:mt-40", sizes: "(min-width: 1024px) 56vw, 85vw" },
];

type Project = (typeof PROJECTS)[number] & { category: string; description: string };

/**
 * One project. On a mouse, a "Visit" tag follows the cursor over the image
 * so the whole picture reads as the link. It is positioned with CSS custom
 * properties written straight to the element, so tracking the pointer never
 * re-renders React.
 */
function ProjectFigure({
  project,
  index,
  layout,
  ctaLabel,
}: {
  project: Project;
  index: number;
  layout: (typeof LAYOUT)[number];
  ctaLabel: string;
}) {
  const frameRef = React.useRef<HTMLSpanElement>(null);

  const track = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <Reveal
      as="li"
      delay={(index % 2) * 0.08}
      className={cn("w-[78vw] shrink-0 snap-start sm:w-[58vw] lg:w-auto", layout.cell)}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="cs-focus group block rounded-lg"
      >
        <span
          ref={frameRef}
          onPointerMove={track}
          onPointerEnter={track}
          // The "Visit live site" tag is this image's cursor; the site cursor steps aside.
          data-cursor="none"
          className="relative block aspect-[16/10] overflow-hidden rounded-lg bg-cs-sunken ring-1 ring-inset ring-cs-ink/[0.06]"
        >
          <Image
            src={project.image}
            alt=""
            fill
            sizes={layout.sizes}
            className="object-cover object-top transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] motion-reduce:transition-none"
          />

          {/* Cursor tag (mouse) */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 hidden md:block"
            style={{ transform: "translate3d(var(--x, 50%), var(--y, 50%), 0)" }}
          >
            <span className="cs-meta inline-flex -translate-x-1/2 -translate-y-1/2 scale-75 items-center gap-1.5 whitespace-nowrap rounded-full bg-cs-ink px-3.5 py-2 text-cs-bg opacity-0 shadow-[0_12px_30px_-12px_rgb(0_0_0/0.5)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100">
              {ctaLabel}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </span>

          {/* Keyboard focus and touch get a fixed tag instead. */}
          <span
            aria-hidden
            className="cs-meta absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-cs-ink/85 px-3 py-1.5 text-cs-bg backdrop-blur-sm md:opacity-0 md:group-focus-visible:opacity-100"
          >
            {ctaLabel}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </span>

        <span className="mt-5 grid grid-cols-[auto_1fr] gap-x-4">
          <span className="cs-meta pt-[0.35rem] tabular-nums text-cs-ink3">{String(index + 1).padStart(2, "0")}</span>
          <span className="min-w-0">
            <span className="cs-meta block text-cs-ink3">{project.category}</span>
            <span className="mt-2 flex items-baseline gap-2 text-[1.375rem] font-medium leading-tight tracking-[-0.03em] text-cs-ink">
              <span className="cs-underline">{project.name}</span>
              <span className="sr-only">({ctaLabel}, opens in a new tab)</span>
            </span>
            <span className="mt-2 block max-w-[30rem] text-[15px] leading-relaxed text-cs-ink2">{project.description}</span>
            <span className="cs-meta mt-3 block truncate text-cs-ink3 normal-case tracking-normal">{project.domain}</span>
          </span>
        </span>
      </a>
    </Reveal>
  );
}

export default function Work() {
  const t = useT(homeExtraMessages);
  const projects: Project[] = PROJECTS.map((meta, i) => ({
    ...meta,
    category: t(`webDev.projects.${i}.category`),
    description: t(`webDev.projects.${i}.description`),
  }));

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-16 bg-cs-bg pb-24 md:pb-32 xl:pb-40">
      <div className="cs-container">
        <SectionIntro
          id="work-title"
          index="02"
          label={t("sections.work")}
          line={t("webDev.headingLine1")}
          accent={t("webDev.headingAccent")}
          lede={t("webDev.intro")}
        />
      </div>

      {/* Phones and tablets: a swipeable strip that bleeds off the right edge,
          so the next project is always peeking. Desktop: the spread. */}
      <div className="mt-12 sm:mt-16 lg:mx-auto lg:mt-24 lg:max-w-[86rem] lg:px-12">
        <ul className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-4 no-scrollbar sm:scroll-px-8 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0 lg:overflow-visible lg:px-0 lg:pb-0">
          {projects.map((project, i) => (
            <ProjectFigure
              key={project.name}
              project={project}
              index={i}
              layout={LAYOUT[i]}
              ctaLabel={t("webDev.ctaLabel")}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
