"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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

type ProjectCopy = { category: string; description: string };

export default function WebDev() {
  const t = useT(homeExtraMessages);
  const projects = PROJECT_META.map((meta, i) => ({
    ...meta,
    category: t(`webDev.projects.${i}.category`),
    description: t(`webDev.projects.${i}.description`),
  }));

  return (
    <section className="relative section-py section-px bg-flow-bg text-flow-text overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-25" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHead
          className="mb-16 sm:mb-20"
          label={t("webDev.badge")}
          heading={t("webDev.headingLine1")}
          accent={t("webDev.headingAccent")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, i) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 2) * 0.08 }}
              className="group relative flex flex-col overflow-hidden hairline-card"
            >
              {/* Browser chrome bar */}
              <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-flow-border bg-flow-cardSolid">
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-flow-textSoft/25" />
                  <span className="w-2.5 h-2.5 rounded-full bg-flow-textSoft/25" />
                  <span className="w-2.5 h-2.5 rounded-full bg-flow-textSoft/25" />
                </div>
                <div className="flex-1 min-w-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-flow-bg border border-flow-border text-[11px] text-flow-textSoft truncate">
                  <span className="truncate">{project.domain}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-flow-textSoft opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:text-aurora-1 transition-all duration-300" />
              </div>

              {/* Screenshot */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.name} website`}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl micro text-[10px] text-white bg-flow-text/90 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {t("webDev.ctaLabel")}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Details */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="micro text-[10px] px-2.5 py-1 rounded-md"
                    style={{ background: "rgb(var(--accent-1) / 0.08)", color: "rgb(var(--accent-2))" }}
                  >
                    {project.category}
                  </span>
                </div>
                <h3 className="display-sm text-flow-text text-lg mb-1.5 group-hover:text-aurora-1 transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="text-flow-textSoft text-sm leading-relaxed">{project.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
