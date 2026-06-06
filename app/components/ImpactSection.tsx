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

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const accordionItems = [
  { value: "actionable-analytics", icon: BarChart2, title: "Actionable Analytics",  content: "Gain deep insights to refine campaigns and boost ROI with precision targeting at every stage." },
  { value: "data-empowerment",     icon: LineChart,  title: "Data Empowerment",      content: "Empower your teams with accessible, real-time data so every decision is backed by evidence." },
  { value: "content-marketing",    icon: PenTool,    title: "Content Marketing",     content: "Targeted content strategies that attract the right audience, convert leads, and build loyalty." },
  { value: "sales-enablement",     icon: DollarSign, title: "Sales Enablement",      content: "Align sales and marketing into one seamless engine that accelerates deal closures." },
];

export default function ImpactSection() {
  const [activeItem, setActiveItem] = useState("actionable-analytics");

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
                Measurable Outcomes
              </span>
              <h2
                className="font-bold text-flow-text leading-tight mb-5"
                style={{ fontSize: "clamp(2rem,3.5vw,3.25rem)" }}
              >
                Data that drives<br />
                <span className="text-aurora-shimmer">results.</span>
              </h2>
              <p className="text-flow-textSoft text-base leading-relaxed max-w-lg mb-8">
                We engineer success through observable metrics. Our strategies align with your
                business objectives to deliver undeniable, measurable impact — every single time.
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {[
                  { label: "Higher Retention",      color: "rgb(var(--accent-1))" },
                  { label: "Faster Time-to-Market", color: "rgb(var(--accent-2))" },
                  { label: "Better ROAS",            color: "rgb(var(--accent-3))" },
                ].map(({ label, color }) => (
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
