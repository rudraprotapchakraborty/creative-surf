"use client";
import React, { useRef, useState } from "react";
import { BarChart2, LineChart, PenTool, DollarSign } from "lucide-react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const ImpactSection: React.FC = () => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true });

  const [activeItem, setActiveItem] = useState("actionable-analytics");

  const countValues = {
    clientSatisfaction: 98,
    revenue: 5,
    growth: 120,
    years: 10,
  };

  function AccordionImage({ activeItem }: { activeItem: string }) {
    const images: Record<string, string> = {
      "actionable-analytics": "/placeholder.svg?text=Actionable+Analytics",
      "data-empowerment": "/placeholder.svg?text=Data+Empowerment",
      "content-marketing": "/placeholder.svg?text=Content+Marketing",
      "sales-enablement": "/placeholder.svg?text=Sales+Enablement",
    };

    return (
      <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg shadow-indigo-700/40 border border-indigo-500/20">
        <Image
          src={images[activeItem] || "/placeholder.svg"}
          alt={activeItem}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-radial from-indigo-600/30 via-transparent to-transparent backdrop-blur-[2px] pointer-events-none" />
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 drop-shadow-[0_2px_10px_rgba(99,102,241,0.5)]"
        >
          Uncover The <span className="text-cyan-400">Impact</span> of Marketing on Revenue
        </motion.h2>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
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
            {
              value: countValues.growth,
              suffix: "%",
              label: "Average Growth",
            },
            {
              value: countValues.years,
              label: "Years Experience",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg shadow-cyan-700/30 border border-gray-700"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl font-bold text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                <CountUp end={stat.value} duration={2} />
                {stat.suffix || ""}
                {stat.prefix || ""}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Accordion + Image */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
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
                  "Our actionable analytics provide deep insights into your marketing performance, allowing you to make data-driven decisions that boost your ROI and drive growth.",
              },
              {
                value: "data-empowerment",
                icon: <LineChart className="h-6 w-6 text-cyan-400" />,
                title: "Data Empowerment",
                content:
                  "Empower your team with comprehensive data insights, enabling you to identify trends, optimize campaigns, and stay ahead of the competition.",
              },
              {
                value: "content-marketing",
                icon: <PenTool className="h-6 w-6 text-cyan-400" />,
                title: "Content Marketing",
                content:
                  "Our content marketing strategies help you create and distribute valuable, relevant content that attracts and engages your target audience, driving conversions and building brand loyalty.",
              },
              {
                value: "sales-enablement",
                icon: <DollarSign className="h-6 w-6 text-cyan-400" />,
                title: "Sales Enablement",
                content:
                  "Align your marketing and sales efforts with our sales enablement tools, providing your team with the resources they need to close deals more effectively and drive revenue growth.",
              },
            ].map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                onOpenChange={(isOpen) => isOpen && setActiveItem(item.value)}
                className="border border-gray-700 bg-gray-800/60 backdrop-blur-md rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-700/30"
              >
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white">
                  <div className="flex items-center gap-4">
                    <div className="bg-cyan-500/10 p-2 rounded-full border border-cyan-400/20">
                      {item.icon}
                    </div>
                    {item.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-300 mt-2">{item.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <AccordionImage activeItem={activeItem} />
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
