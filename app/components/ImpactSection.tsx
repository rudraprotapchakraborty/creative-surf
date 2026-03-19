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
    <section className="relative bg-flow-card text-flow-text py-32 overflow-hidden border-t border-flow-border">
      
      {/* Sharp Vector Waves */}
      <div className="absolute bottom-0 left-0 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] max-w-[1000px] max-h-[1000px] pointer-events-none z-0 overflow-hidden transform -scale-x-100 opacity-40">
        <motion.svg 
          viewBox="0 0 500 500" 
          preserveAspectRatio="xMidYMax slice"
          className="absolute bottom-0 left-0 w-full h-full object-cover origin-bottom-left"
        >
          <path d="M 500,500 L 0,500 C 100,400 150,300 300,350 C 400,380 450,200 500,100 Z" className="fill-flow-blob3 transition-colors" />
          <path d="M 500,500 L 50,500 C 150,450 250,350 350,400 C 420,430 480,250 500,150 Z" className="fill-flow-blob1 transition-colors" />
        </motion.svg>
      </div>
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
              { value: countValues.clientSatisfaction, suffix: "%", label: "Client Satisfaction" },
              { value: countValues.revenue, prefix: "$", suffix: "M+", label: "Revenue Generated" },
              { value: countValues.growth, suffix: "%", label: "Average Growth" },
              { value: countValues.years, label: "Years Experience" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 md:p-8 rounded-sm bg-flow-bg border border-flow-border hover:shadow-sm transition-shadow flex flex-col justify-center items-center text-center aspect-square"
              >
                <div className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-[-0.04em] mb-3 text-flow-green">
                  {stat.prefix || ""}
                  <CountUp end={stat.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                  {stat.suffix || ""}
                </div>
                <div className="text-flow-text/70 font-normal text-sm md:text-base max-w-[120px] leading-tight">{stat.label}</div>
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
             <h2 className="text-[3.5rem] sm:text-[4.5rem] md:text-7xl lg:text-[6.5rem] font-heading font-extrabold tracking-[-0.04em] mb-8 leading-[1.05]">
               Data that drives 
               <br className="hidden md:block"/>
               <span className="text-flow-green inline-block relative mt-2">
                 results.
                 <motion.svg 
                   initial={{ pathLength: 0, opacity: 0 }}
                   whileInView={{ pathLength: 1, opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                   viewBox="0 0 200 24" 
                   className="absolute -bottom-1 md:-bottom-2 left-0 w-[105%] h-auto text-flow-text z-[-1] opacity-60" 
                   fill="none" 
                   stroke="currentColor" 
                   strokeLinecap="round" 
                   strokeLinejoin="round"
                 >
                   <path d="M 5,8 Q 60,0 110,10 T 195,6" strokeWidth="8" />
                   <path d="M 10,16 Q 70,8 120,18 T 190,14" strokeWidth="6" />
                 </motion.svg>
               </span>
             </h2>
             <p className="text-flow-text/70 font-normal text-lg mb-10 leading-relaxed max-w-lg">
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
                   className="border-b border-flow-border py-2"
                 >
                   <AccordionTrigger
                     onClick={() => setActiveItem(item.value)}
                     className="hover:no-underline text-lg font-medium text-flow-text hover:text-flow-green transition-colors"
                   >
                     <div className="flex items-center gap-4">
                       <div className={`p-3 rounded-sm transition-colors duration-300 border ${activeItem === item.value ? 'bg-flow-green border-transparent text-white shadow-sm' : 'bg-flow-card border-flow-border text-flow-text/50 group-hover:bg-flow-green/10 group-hover:text-flow-green'}`}>
                         {item.icon}
                       </div>
                       <span className={`transition-colors ${activeItem === item.value ? 'text-flow-green font-bold' : 'text-flow-text/80 font-normal'}`}>{item.title}</span>
                     </div>
                   </AccordionTrigger>
                   <AccordionContent className="text-flow-text/70 font-normal leading-relaxed pl-16 pb-4">
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
