"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { useT } from "@/lib/i18n";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { EASE, Kicker } from "./shared";

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="mb-6"><Kicker>{t("webDev.badge")}</Kicker></div>
            <h2 className="font-bold text-flow-text leading-tight" style={{ fontSize: "clamp(2.1rem,4vw,3.6rem)" }}>
              {t("webDev.headingLine1")}<br />
              <span className="text-aurora">{t("webDev.headingAccent")}</span>
            </h2>
          </div>
          <p className="text-flow-textSoft text-base max-w-xs leading-relaxed md:text-right">
            {t("webDev.intro")}
          </p>
        </motion.div>

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
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-flow-border glass transition-all duration-500 hover:-translate-y-1.5 hover:border-aurora-1/40 hover:shadow-aurora"
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
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-white bg-flow-text/90 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {t("webDev.ctaLabel")}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Details */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ background: "rgb(var(--accent-1) / 0.08)", color: "rgb(var(--accent-2))" }}
                  >
                    {project.category}
                  </span>
                </div>
                <h3 className="font-bold text-flow-text text-lg mb-1.5 group-hover:text-aurora-1 transition-colors duration-300">
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
