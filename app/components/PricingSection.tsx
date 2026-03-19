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
    <section id="pricing" className="relative py-32 bg-[#06080F] text-white overflow-hidden border-t border-white/[0.05]">
      
      <div className="container px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
            Clear, Transparent Pricing.
          </h2>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
            Choose your perfect package — crafted for modern businesses aiming for growth.
          </p>

          <div className="mt-10 inline-flex items-center bg-white/[0.03] rounded-full p-1 border border-white/[0.08]">
            {["monthly", "yearly"].map((mode) => (
              <button
                key={mode}
                onClick={() => setBilling(mode as "monthly" | "yearly")}
                className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  billing === mode
                    ? "bg-white text-black shadow-md"
                    : "text-gray-400 hover:text-white"
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
              className={`relative flex flex-col p-8 rounded-[2rem] bg-white/[0.02] border transition-colors duration-300 ${
                plan.highlight 
                  ? "border-cyan-500/30 hover:border-cyan-500/50" 
                  : "border-white/[0.05] hover:border-white/[0.1]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-400 text-black px-4 py-1 text-xs font-semibold rounded-full tracking-wide">
                  {plan.highlight}
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-medium text-white mb-2">{plan.title}</h3>
                <p className="text-sm text-gray-400 font-light h-10">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline">
                <span className="text-5xl font-medium tracking-tight text-white">${plan.price}</span>
                <span className="text-gray-500 ml-2 font-light">
                  /{billing === "monthly" ? "mo" : "half-yr"}
                </span>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-300 font-light leading-relaxed">
                    <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-full font-medium transition-colors ${
                plan.highlight
                  ? "bg-cyan-400 text-black hover:bg-cyan-300"
                  : "bg-white/10 text-white hover:bg-white/20"
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
