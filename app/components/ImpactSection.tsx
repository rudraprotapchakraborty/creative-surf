"use client";

import React, { useState } from "react";
import { BarChart2, LineChart, PenTool, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Stable accordion identities + icons; titles and bodies come from the dictionary. */
const ACCORDION_META = [
  { value: "actionable-analytics", icon: BarChart2 },
  { value: "data-empowerment", icon: LineChart },
  { value: "content-marketing", icon: PenTool },
  { value: "sales-enablement", icon: DollarSign },
];

const PILL_COLORS = ["rgb(var(--accent-1))", "rgb(var(--accent-2))", "rgb(var(--accent-3))"];

export default function ImpactSection() {
  const t = useT(homeMessages);
  const [activeItem, setActiveItem] = useState("actionable-analytics");

  const accordionItems = ACCORDION_META.map((meta, i) => ({
    ...meta,
    title: t(`impact.accordion.${i}.title`),
    content: t(`impact.accordion.${i}.content`),
  }));

  return (
    <section className="relative overflow-hidden border-t border-flow-border">
      <div className="bg-flow-bg py-20 sm:py-24 md:py-28 lg:py-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-start">

            {/* Left */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-1 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-aurora-1" />
                {t("impact.badge")}
              </span>
              <h2
                className="font-bold text-flow-text leading-tight mb-5"
                style={{ fontSize: "clamp(2rem,3.5vw,3.25rem)" }}
              >
                {t("impact.headingLine1")}<br />
                <span className="text-aurora-shimmer">{t("impact.headingAccent")}</span>
              </h2>
              <p className="text-flow-textSoft text-base leading-relaxed max-w-lg mb-8">
                {t("impact.body")}
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {t.list("impact.pills").map((label, i) => ({ label, color: PILL_COLORS[i] })).map(({ label, color }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-sm text-flow-textSoft font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — accordion */}
            <motion.div
              className="lg:w-1/2 w-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Accordion
                type="single"
                collapsible
                defaultValue="actionable-analytics"
                className="w-full"
              >
                {accordionItems.map(({ value, icon: Icon, title, content }) => {
                  const isActive = activeItem === value;
                  return (
                    <AccordionItem
                      key={value}
                      value={value}
                      className="border-b border-flow-border py-2"
                    >
                      <AccordionTrigger
                        onClick={() => setActiveItem(value)}
                        className="hover:no-underline text-base font-medium text-flow-text transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-xl transition-all duration-500 border ${
                              isActive
                                ? "bg-aurora-grad border-transparent text-white shadow-aurora"
                                : "bg-flow-cardSolid border-flow-border text-flow-textSoft"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span
                            className={`transition-colors ${
                              isActive ? "text-flow-text font-bold" : "text-flow-textSoft"
                            }`}
                          >
                            {title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-flow-textSoft text-[0.95rem] leading-relaxed pl-16 pb-4">
                        {content}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
