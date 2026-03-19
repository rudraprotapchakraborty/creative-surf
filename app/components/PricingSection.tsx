"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const pricingPlans = {
    monthly: [
      {
        title: "Basic",
        price: 390,
        description: "Perfect for small businesses",
        features: [
          "Business Development",
          "Campaign Marketing",
          "Creative Visual Content (Up to 7)",
          "Series Content",
          "Animated Motion Video",
          "Social Media Management",
          "Media Buying on Demand",
        ],
      },
      {
        title: "Standard",
        price: 490,
        description: "Best for growing companies",
        highlight: "Popular",
        features: [
          "Product Photography",
          "Creative Visual Content (Up to 10)",
          "Copyright Content with SEO",
          "Media Buying on Demand ($50 free)",
          "Everything in Basic"
        ],
      },
      {
        title: "Premium",
        price: 650,
        description: "For enterprise businesses",
        features: [
          "Website Development",
          "Creative Visual Content (Up to 15)",
          "Media Buying on Demand ($100 free)",
          "Content Writing (Up to 5)",
          "Everything in Standard"
        ],
      },
    ],
    yearly: [] as any[],
  };

  pricingPlans.yearly = pricingPlans.monthly.map((p) => ({
    ...p,
    price: Math.floor(p.price * 6 * 0.8), // Assuming half-yearly pricing originally implies this calculation
  }));

  const activePlans = pricingPlans[billing];

  return (
    <section id="pricing" className="relative py-32 bg-flow-card text-flow-text overflow-hidden border-t border-flow-border">
      {/* Sharp Vector Waves */}
      <div className="absolute top-0 left-0 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] max-w-[1000px] max-h-[1000px] pointer-events-none z-0 overflow-hidden transform -scale-x-100 opacity-40">
        <motion.svg 
          viewBox="0 0 500 500" 
          preserveAspectRatio="xMidYMax slice"
          className="absolute top-0 left-0 w-full h-full object-cover origin-top-left"
        >
          <path d="M 500,500 L 0,500 C 100,400 150,300 300,350 C 400,380 450,200 500,100 Z" className="fill-flow-blob3 transition-colors" />
          <path d="M 500,500 L 50,500 C 150,450 250,350 350,400 C 420,430 480,250 500,150 Z" className="fill-flow-blob2 transition-colors" />
        </motion.svg>
      </div>
      <div className="container px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-left mb-16 flex flex-col items-start"
        >
          <h2 className="text-[3.5rem] sm:text-[4.5rem] md:text-7xl lg:text-[6.5rem] font-heading font-extrabold tracking-[-0.04em] mb-4 leading-[1.05]">
            Clear, Transparent <br className="hidden md:block"/> Pricing.
          </h2>
          <p className="text-flow-text/70 text-lg font-normal max-w-2xl">
            Choose your perfect package — crafted for modern businesses aiming for growth.
          </p>

          <div className="mt-10 inline-flex items-center bg-flow-bg rounded-sm p-1 border border-flow-border">
            {["monthly", "yearly"].map((mode) => (
              <button
                key={mode}
                onClick={() => setBilling(mode as "monthly" | "yearly")}
                className={`px-8 py-2.5 rounded-sm text-sm font-semibold transition-all duration-300 ${
                  billing === mode
                    ? "bg-flow-card text-flow-text shadow-sm border border-flow-border"
                    : "text-flow-text/60 hover:text-flow-text"
                }`}
              >
                {mode === "monthly" ? "Monthly" : "Half-Yearly (20% OFF)"}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activePlans.map((plan, idx) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative flex flex-col p-8 rounded-sm bg-flow-card border transition-colors duration-300 hover:shadow-sm ${
                plan.highlight 
                  ? "border-flow-green shadow-sm" 
                  : "border-flow-border hover:border-flow-text/20"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-flow-green text-white px-4 py-1 text-xs font-bold rounded-sm tracking-wide shadow-sm">
                  {plan.highlight}
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-3xl font-heading font-extrabold text-flow-text mb-2 tracking-tight">{plan.title}</h3>
                <p className="text-sm text-flow-text/60 font-normal h-10">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline">
                <span className="text-6xl md:text-7xl font-heading font-extrabold tracking-[-0.04em] text-flow-text">${plan.price}</span>
                <span className="text-flow-text/50 ml-2 font-normal">
                  /{billing === "monthly" ? "mo" : "half-yr"}
                </span>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-flow-text/80 font-normal leading-relaxed">
                    <Check className="w-5 h-5 text-flow-green shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-sm font-semibold transition-colors ${
                plan.highlight
                  ? "bg-flow-green text-white hover:bg-flow-buttonHover"
                  : "bg-flow-bg text-flow-text border border-flow-border hover:bg-flow-border"
              }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
