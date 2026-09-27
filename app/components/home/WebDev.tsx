"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { useT } from "@/lib/i18n";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { EASE, SectionHead } from "./shared";

/** Live URLs and screenshots are facts, not copy — only category/description translate. */
const PROJECT_META = [
  { name: "Bee Team Studios", domain: "beeteamltd.com", url: "https://www.beeteamltd.com/", image: "/work-beeteam.jpg" },
  { name: "Sirius A Marketing", domain: "sirius-a-marketing.vercel.app", url: "https://sirius-a-marketing.vercel.app/", image: "/work-sirius.jpg" },
  { name: "Nami Moon", domain: "nami-moon.vercel.app", url: "https://nami-moon.vercel.app/", image: "/work-namimoon.jpg" },
  { name: "Spring Field Developments", domain: "springfield-developments.vercel.app", url: "https://springfield-developments.vercel.app/", image: "/work-springfield.jpg" },
];

type Project = (typeof PROJECT_META)[number] & { category: string; description: string };

/**
 * One project, framed as a browser window. On a fine pointer the "visit" badge
 * follows the cursor around the screenshot, so the whole shot reads as the
 * link rather than a small button in one corner.
 */
function ProjectCard({ project, index, total, ctaLabel }: { project: Project; index: number; total: number; ctaLabel: string }) {
  const still = useReducedMotion() ?? false;
  const bx = useSpring(useMotionValue(0), { stiffness: 320, damping: 28, mass: 0.4 });
  const by = useSpring(useMotionValue(0), { stiffness: 320, damping: 28, mass: 0.4 });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || still) return;
    const r = e.currentTarget.getBoundingClientRect();
    bx.set(e.clientX - r.left);
    by.set(e.clientY - r.top);
  };

  const onPointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    // Start the badge under the cursor instead of flying in from a corner.
    bx.jump(e.clientX - r.left);
    by.jump(e.clientY - r.top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 2) * 0.1 }}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring group relative flex flex-col overflow-hidden hairline-card transition-[transform,border-color] duration-500 hover:-translate-y-1.5"
      >
        {/* Browser chrome bar */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-flow-border bg-flow-cardSolid">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-flow-textSoft/25 transition-colors duration-300 group-hover:bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-flow-textSoft/25 transition-colors duration-300 delay-75 group-hover:bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-flow-textSoft/25 transition-colors duration-300 delay-150 group-hover:bg-[#28c840]" />
          </div>
          <div className="flex-1 min-w-0 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-flow-bg border border-flow-border text-[11px] text-flow-textSoft">
            <span aria-hidden className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="truncate">{project.domain}</span>
          </div>
          <span className="micro text-[10px] text-flow-textSoft/60 tabular-nums flex-shrink-0">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Screenshot */}
        <div
          className="relative aspect-[16/10] overflow-hidden bg-flow-surface"
          onPointerMove={onPointerMove}
          onPointerEnter={onPointerEnter}
        >
          <Image
            src={project.image}
            alt={`${project.name} website`}
            fill
            className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Cursor badge (fine pointers) */}
          {/* The outer span only moves; the inner one centres itself on the
              cursor and scales in. Keeping them apart stops the spring's
              transform from overwriting the centring and scale. */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 hidden md:block"
            style={{ x: bx, y: by }}
          >
            <span
              className="inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 micro text-[10px] text-white opacity-0 scale-75 transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:scale-100 shadow-[0_12px_30px_-10px_rgb(0_0_0/0.5)]"
              style={{ background: "linear-gradient(105deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
            >
              {ctaLabel}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </motion.span>

          {/* Touch fallback: a fixed badge, since there's no cursor to follow. */}
          <span className="md:hidden absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl micro text-[10px] text-white bg-flow-text/85">
            {ctaLabel}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Details */}
        <div className="flex items-start justify-between gap-6 p-5 sm:p-6">
          <div className="min-w-0">
            <span
              className="micro inline-block text-[10px] px-2.5 py-1 rounded-md mb-2.5"
              style={{ background: "rgb(var(--accent-1) / 0.08)", color: "rgb(var(--accent-2))" }}
            >
              {project.category}
            </span>
            <h3 className="display-sm text-flow-text text-lg sm:text-xl mb-1.5 group-hover:text-aurora-1 transition-colors duration-300">
              {project.name}
            </h3>
            <p className="text-flow-textSoft text-sm leading-relaxed">{project.description}</p>
          </div>
          <span className="mt-1 grid place-items-center w-10 h-10 flex-shrink-0 rounded-full border border-flow-border text-flow-textSoft transition-all duration-300 group-hover:border-transparent group-hover:bg-aurora-grad group-hover:text-white">
            <ArrowUpRight className="w-4 h-4 rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </span>
        </div>
      </a>
    </motion.div>
  );
}

export default function WebDev() {
  const t = useT(homeExtraMessages);
  const projects: Project[] = PROJECT_META.map((meta, i) => ({
    ...meta,
    category: t(`webDev.projects.${i}.category`),
    description: t(`webDev.projects.${i}.description`),
  }));

  return (
    <section id="projects" className="relative section-py section-px bg-flow-bg text-flow-text overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-25" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHead
          align="split"
          className="mb-14 sm:mb-20"
          label={t("webDev.badge")}
          heading={t("webDev.headingLine1")}
          accent={t("webDev.headingAccent")}
          subline={t("webDev.intro")}
        />

        {/* Two columns, the right one dropped half a card — an editorial
            stagger instead of a spreadsheet grid. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:pb-20">
          {projects.map((project, i) => (
            <div key={project.name} className={i % 2 === 1 ? "md:translate-y-20" : undefined}>
              <ProjectCard project={project} index={i} total={projects.length} ctaLabel={t("webDev.ctaLabel")} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
