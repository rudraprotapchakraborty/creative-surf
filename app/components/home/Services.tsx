"use client";

import { motion } from "framer-motion";
import {
  PenTool, FileText, Video, Globe, Search, Target, Users, ArrowUpRight,
} from "lucide-react";

import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";
import { EASE, Kicker } from "./shared";

const SERVICE_ICONS = [PenTool, FileText, Video, Globe, Search, Target, Users];

/** Bento spans, keyed by index — index 0 is the hero card of the grid. */
const SPANS = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
];

type ServiceCopy = { title: string; description: string; tags: string[] };

export default function Services() {
  const t = useT(homeMessages);

  const services = t
    .raw<ServiceCopy[]>("services.items", [])
    .map((service, i) => ({ ...service, icon: SERVICE_ICONS[i] ?? PenTool, span: SPANS[i] ?? "lg:col-span-1" }));

  return (
    <section id="services" className="relative section-py section-px bg-flow-bg text-flow-text overflow-hidden">
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
            <div className="mb-6"><Kicker>{t("services.badge")}</Kicker></div>
            <h2 className="font-bold text-flow-text leading-tight" style={{ fontSize: "clamp(2.1rem,4vw,3.6rem)" }}>
              {t("services.headingLine1")}<br />
              <span className="text-aurora">{t("services.headingAccent")}</span>
            </h2>
          </div>
          <p className="text-flow-textSoft text-base max-w-xs leading-relaxed md:text-right">
            {t("services.intro")}
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(15rem,auto)] lg:auto-rows-[minmax(13rem,auto)] gap-4 sm:gap-5">
          {services.map(({ title, description, icon: Icon, tags, span }, i) => {
            const featured = i === 0;
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.06 }}
                className={`group relative overflow-hidden rounded-3xl border border-flow-border p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:border-aurora-1/40 hover:shadow-aurora ${span} ${
                  featured ? "bg-aurora-soft" : "glass"
                }`}
              >
                {/* Watermark number */}
                <span
                  className="absolute top-4 right-5 font-black leading-none select-none pointer-events-none"
                  style={{ fontSize: featured ? "5rem" : "3rem", color: "rgb(var(--accent-1) / 0.08)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div
                  className={`relative flex-shrink-0 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                    featured ? "w-14 h-14" : "w-11 h-11"
                  }`}
                  style={{ background: "rgb(var(--accent-1) / 0.12)", border: "1px solid rgb(var(--accent-1) / 0.22)" }}
                >
                  <Icon className={featured ? "w-6 h-6" : "w-5 h-5"} style={{ color: "rgb(var(--accent-1))" }} />
                </div>

                <div className="relative mt-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <h3
                      className="font-bold text-flow-text group-hover:text-aurora-1 transition-colors duration-300"
                      style={{ fontSize: featured ? "1.5rem" : "1.1rem" }}
                    >
                      {title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-aurora-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                  </div>
                  <p className={`text-flow-textSoft leading-relaxed ${featured ? "text-sm sm:text-[0.95rem] max-w-sm" : "text-xs sm:text-sm line-clamp-2"}`}>
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {tags.slice(0, featured ? 3 : 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: "rgb(var(--accent-1) / 0.08)", color: "rgb(var(--accent-2))" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
