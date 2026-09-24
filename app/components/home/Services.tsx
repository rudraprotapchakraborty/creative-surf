"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";
import { servicesMessages } from "@/lib/i18n/messages/services";
import { SERVICES } from "@/app/services/catalog";
import { EASE, SectionHead } from "./shared";

type ServiceCopy = { title: string; description: string; tags: string[] };

/**
 * A compact index of what we do. The /services page carries the full cards;
 * here each service is a single slim row, so the homepage points the way
 * rather than repeating that page. The list and copy come from the services
 * messages, so the two can never advertise different services.
 */
export default function Services() {
  const t = useT(homeMessages);
  const ts = useT(servicesMessages);

  const services = ts
    .raw<ServiceCopy[]>("items", [])
    .slice(0, SERVICES.length)
    .map((service, i) => ({ ...service, ...SERVICES[i] }));

  return (
    <section id="services" className="relative section-py section-px bg-flow-bg text-flow-text overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHead
          className="mb-12 sm:mb-14"
          label={t("services.badge")}
          heading={t("services.headingLine1")}
          accent={t("services.headingAccent")}
        />

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 border-t border-flow-border md:border-t-0">
          {services.map(({ title, tags, icon: Icon, slug }, i) => (
            <motion.li
              key={slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE, delay: (i % 3) * 0.06 }}
              className={`border-b border-flow-border ${i < 2 ? "md:border-t" : ""}`}
            >
              <Link
                href={`/services/${slug}`}
                className="focus-ring group relative flex items-center gap-4 overflow-hidden px-2 sm:px-3 py-4 rounded-lg"
              >
                {/* Hover wash — sweeps in from the left behind the row. */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                  style={{ background: "linear-gradient(90deg, rgb(var(--accent-1) / 0.08), transparent)" }}
                />

                <span className="relative micro w-6 text-flow-textSoft/50 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span
                  className="relative grid place-items-center w-9 h-9 flex-shrink-0 rounded-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                  style={{ background: "rgb(var(--accent-1) / 0.1)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "rgb(var(--accent-1))" }} />
                </span>

                <span className="relative min-w-0 flex-1">
                  <span className="block display-sm text-[0.98rem] sm:text-base text-flow-text transition-colors duration-300 group-hover:text-aurora-1 truncate">
                    {title}
                  </span>
                  <span className="block text-xs text-flow-textSoft truncate">{tags.join(" · ")}</span>
                </span>

                <ArrowUpRight className="relative w-4 h-4 flex-shrink-0 text-flow-textSoft transition-all duration-300 group-hover:text-aurora-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="mt-8 flex justify-center"
        >
          <Link
            href="/services"
            className="focus-ring group inline-flex items-center gap-2 micro text-flow-text hover:text-aurora-1 transition-colors"
          >
            {ts("viewAll")}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
