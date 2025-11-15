"use client";

import React, { useRef, useState, useEffect } from "react";
import { BarChart2, LineChart, PenTool, DollarSign } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ImpactSection: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [activeItem, setActiveItem] = useState("actionable-analytics");

  const countValues = {
    clientSatisfaction: 98,
    revenue: 5,
    growth: 120,
    years: 10,
  };

  // Scroll transforms
  const titleScale = useTransform(scrollYProgress, [0, 0.25], [0.7, 1.2]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const statsOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const statsScale = useTransform(scrollYProgress, [0, 0.35], [0.8, 1]);
  const accordionY = useTransform(scrollYProgress, [0, 0.45], [80, 0]);

  // --- FIX: CLIENT-ONLY PARTICLES ---
  const [particles, setParticles] = useState<
    { left: string; top: string; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 25 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 3,
    }));

    setParticles(generated);
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-black text-white py-28 overflow-hidden"
    >
      {/* Blue Aurora Background */}
      <motion.div
        className="absolute inset-0 -z-20"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 40%, rgba(0,255,255,0.15) 0%, transparent 70%), radial-gradient(ellipse at 80% 60%, rgba(56,189,248,0.15) 0%, transparent 70%)",
            "radial-gradient(ellipse at 30% 50%, rgba(56,189,248,0.15) 0%, transparent 70%), radial-gradient(ellipse at 70% 50%, rgba(0,255,255,0.15) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Floating upward cyan particles (client-side only) */}
      <div className="absolute inset-0 -z-10">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-cyan-400/50 rounded-full"
            style={{ left: p.left, top: p.top }}
            animate={{
              y: [0, -60],
              opacity: [0.2, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Title */}
        <motion.h2
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="text-5xl md:text-7xl font-extrabold text-center mb-20 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent tracking-tight"
        >
          Marketing Impact.
          <span className="block text-3xl md:text-4xl font-light text-white/60">
            Data That Drives Results
          </span>
        </motion.h2>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20"
          style={{ opacity: statsOpacity, scale: statsScale }}
        >
          {[
            {
              value: countValues.clientSatisfaction,
              suffix: "%",
              label: "Client Satisfaction",
            },
            {
              value: countValues.revenue,
              prefix: "$",
              suffix: "M+",
              label: "Revenue Generated",
            },
            { value: countValues.growth, suffix: "%", label: "Average Growth" },
            { value: countValues.years, label: "Years Experience" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg text-center hover:shadow-cyan-500/40 transition-all duration-300"
              whileHover={{ scale: 1.08, rotateX: 6, rotateY: -6 }}
            >
              <div className="text-5xl font-bold text-cyan-400 mb-3">
                {stat.prefix || ""}
                <CountUp end={stat.value} duration={2.5} />
                {stat.suffix || ""}
              </div>
              <div className="text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Accordion */}
        <motion.div className="max-w-3xl mx-auto space-y-5" style={{ y: accordionY }}>
          <Accordion
            type="single"
            collapsible
            defaultValue="actionable-analytics"
            className="space-y-4"
          >
            {[
              {
                value: "actionable-analytics",
                icon: <BarChart2 className="h-6 w-6 text-cyan-400" />,
                title: "Actionable Analytics",
                content:
                  "Gain deep, actionable insights to refine campaigns and boost ROI with precision.",
              },
              {
                value: "data-empowerment",
                icon: <LineChart className="h-6 w-6 text-cyan-400" />,
                title: "Data Empowerment",
                content:
                  "Empower teams with accessible, meaningful data to make confident, informed decisions.",
              },
              {
                value: "content-marketing",
                icon: <PenTool className="h-6 w-6 text-cyan-400" />,
                title: "Content Marketing",
                content:
                  "Engaging, targeted content strategies that convert and build brand loyalty.",
              },
              {
                value: "sales-enablement",
                icon: <DollarSign className="h-6 w-6 text-cyan-400" />,
                title: "Sales Enablement",
                content:
                  "Align sales & marketing with tools to accelerate deal closures and revenue growth.",
              },
            ].map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="border border-white/10 bg-white/5 backdrop-blur-lg rounded-xl p-4 hover:border-cyan-400/40 transition-all duration-300"
              >
                <AccordionTrigger
                  onClick={() => setActiveItem(item.value)}
                  className="flex items-center gap-4 text-lg font-semibold"
                >
                  <motion.div
                    className="bg-cyan-500/20 p-2 rounded-full border border-cyan-400/30"
                    whileHover={{ scale: 1.2, rotate: 8 }}
                  >
                    {item.icon}
                  </motion.div>
                  {item.title}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-white/70 mt-2 leading-relaxed">{item.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
