"use client";

import React, { useState } from "react";
import { BarChart2, LineChart, PenTool, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import WaveBackdrop from "./WaveBackdrop";

const ImpactSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState("actionable-analytics");

  const countValues = {
    clientSatisfaction: 98,
    revenue: 5,
    growth: 120,
    years: 10,
  };

  const stats = [
    { value: countValues.clientSatisfaction, suffix: "%", label: "Client Satisfaction" },
    { value: countValues.revenue, prefix: "$", suffix: "M+", label: "Revenue Generated" },
    { value: countValues.growth, suffix: "%", label: "Average Growth" },
    { value: countValues.years, suffix: "+", label: "Years Experience" },
  ];

  return (
    <section className="relative bg-flow-bg text-flow-text py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden border-t border-flow-border">
      <WaveBackdrop id="impact-wave" corner="bl" size="sm" opacity={0.55} />

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aurora-blob aurora-1 w-[35vw] h-[35vw] top-[5vh] -right-[10vw] opacity-30 animate-aurora" />
      </div>

      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-20 items-center">
        {/* Stats Grid */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="conic-ring relative p-6 md:p-8 rounded-2xl glass border border-flow-border flex flex-col justify-center items-center text-center aspect-square overflow-hidden"
              >
                <span className="absolute inset-0 bg-aurora-soft opacity-30" />
                <div className="relative text-[2.5rem] md:text-6xl lg:text-7xl font-heading font-extrabold tracking-[-0.04em] mb-3 text-aurora">
                  {stat.prefix || ""}
                  <CountUp end={stat.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                  {stat.suffix || ""}
                </div>
                <div className="relative text-flow-textSoft font-medium text-sm md:text-base max-w-[140px] leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: Accordion */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-aurora-1" />
              Measurable Outcomes
            </span>
            <h2 className="text-[2.25rem] sm:text-[3rem] md:text-5xl lg:text-[5.5rem] font-heading font-extrabold tracking-[-0.05em] mb-8 leading-[1.0]">
              Data that drives
              <br className="hidden md:block" />
              <span className="text-aurora-shimmer italic inline-block relative mt-2">results.</span>
            </h2>
            <p className="text-flow-textSoft font-normal text-lg mb-10 leading-relaxed max-w-lg">
              We engineer success through observable metrics. Our strategies align with your
              business objectives to deliver undeniable impact.
            </p>

            <Accordion
              type="single"
              collapsible
              defaultValue="actionable-analytics"
              className="w-full"
            >
              {[
                { value: "actionable-analytics", icon: <BarChart2 className="w-5 h-5" />, title: "Actionable Analytics", content: "Gain deep insights to refine campaigns and boost ROI with precision." },
                { value: "data-empowerment", icon: <LineChart className="w-5 h-5" />, title: "Data Empowerment", content: "Empower teams with accessible data to make confident decisions." },
                { value: "content-marketing", icon: <PenTool className="w-5 h-5" />, title: "Content Marketing", content: "Targeted content strategies that convert and build loyalty." },
                { value: "sales-enablement", icon: <DollarSign className="w-5 h-5" />, title: "Sales Enablement", content: "Align sales & marketing to accelerate deal closures." },
              ].map((item) => (
                <AccordionItem key={item.value} value={item.value} className="border-b border-flow-border py-2">
                  <AccordionTrigger
                    onClick={() => setActiveItem(item.value)}
                    className="hover:no-underline text-lg font-medium text-flow-text transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl transition-all duration-500 border ${
                          activeItem === item.value
                            ? "bg-aurora-grad border-transparent text-white shadow-aurora"
                            : "bg-flow-cardSolid border-flow-border text-flow-textSoft"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span className={`transition-colors ${activeItem === item.value ? "text-flow-text font-bold" : "text-flow-textSoft font-normal"}`}>
                        {item.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-flow-textSoft font-normal leading-relaxed pl-16 pb-4">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
