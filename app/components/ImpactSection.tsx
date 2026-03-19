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

const ImpactSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState("actionable-analytics");

  const countValues = {
    clientSatisfaction: 98,
    revenue: 5,
    growth: 120,
    years: 10,
  };

  return (
    <section className="relative bg-[#06080F] text-white py-32 overflow-hidden border-t border-white/[0.05]">
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row gap-20 items-center">
        
        {/* Left Side: Stats Grid */}
        <div className="w-full lg:w-1/2">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="grid grid-cols-2 gap-4"
          >
            {[
              { value: countValues.clientSatisfaction, suffix: "%", label: "Client Satisfaction", color: "text-cyan-400" },
              { value: countValues.revenue, prefix: "$", suffix: "M+", label: "Revenue Generated", color: "text-blue-400" },
              { value: countValues.growth, suffix: "%", label: "Average Growth", color: "text-purple-400" },
              { value: countValues.years, label: "Years Experience", color: "text-white" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 md:p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors flex flex-col justify-center items-center text-center aspect-square"
              >
                <div className={`text-5xl md:text-6xl font-medium tracking-tight mb-3 ${stat.color}`}>
                  {stat.prefix || ""}
                  <CountUp end={stat.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                  {stat.suffix || ""}
                </div>
                <div className="text-gray-400 font-light text-sm md:text-base max-w-[120px] leading-tight">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Side: Accordion */}
        <div className="w-full lg:w-1/2">
           <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
           >
             <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
               Data that drives <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">results.</span>
             </h2>
             <p className="text-gray-400 font-light text-lg mb-10 leading-relaxed max-w-lg">
               We believe in engineering success through observable metrics. Our strategies align with your business objectives to deliver undeniable impact.
             </p>

             <Accordion
               type="single"
               collapsible
               defaultValue="actionable-analytics"
               className="w-full"
             >
               {[
                 {
                   value: "actionable-analytics",
                   icon: <BarChart2 className="w-5 h-5" />,
                   title: "Actionable Analytics",
                   content: "Gain deep insights to refine campaigns and boost ROI with precision.",
                 },
                 {
                   value: "data-empowerment",
                   icon: <LineChart className="w-5 h-5" />,
                   title: "Data Empowerment",
                   content: "Empower teams with accessible data to make confident decisions.",
                 },
                 {
                   value: "content-marketing",
                   icon: <PenTool className="w-5 h-5" />,
                   title: "Content Marketing",
                   content: "Targeted content strategies that convert and build loyalty.",
                 },
                 {
                   value: "sales-enablement",
                   icon: <DollarSign className="w-5 h-5" />,
                   title: "Sales Enablement",
                   content: "Align sales & marketing to accelerate deal closures.",
                 },
               ].map((item) => (
                 <AccordionItem
                   key={item.value}
                   value={item.value}
                   className="border-b border-white/[0.05] py-2"
                 >
                   <AccordionTrigger
                     onClick={() => setActiveItem(item.value)}
                     className="hover:no-underline text-lg font-medium text-white/90 hover:text-white transition-colors"
                   >
                     <div className="flex items-center gap-4">
                       <div className={`p-2 rounded-lg transition-colors duration-300 ${activeItem === item.value ? 'bg-cyan-500/10 text-cyan-400' : 'bg-white/[0.05] text-gray-400'}`}>
                         {item.icon}
                       </div>
                       {item.title}
                     </div>
                   </AccordionTrigger>
                   <AccordionContent className="text-gray-400 font-light leading-relaxed pl-14 pb-4">
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
