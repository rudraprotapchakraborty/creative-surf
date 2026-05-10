"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import WaveBackdrop from "./WaveBackdrop";

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const pricingPlans = {
    monthly: [
      {
        title: "Basic",
        price: 1000,
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
        price: 1500,
        description: "Best for growing companies",
        highlight: "Most Popular",
        features: [
          "Product Photography",
          "Creative Visual Content (Up to 10)",
          "Copyright Content with SEO",
          "Media Buying on Demand ($50 free)",
          "Everything in Basic",
        ],
      },
      {
        title: "Premium",
        price: 1800,
        description: "For enterprise businesses",
        features: [
          "Website Development",
          "Creative Visual Content (Up to 15)",
          "Media Buying on Demand ($100 free)",
          "Content Writing (Up to 5)",
          "Everything in Standard",
        ],
      },
    ],
    yearly: [] as any[],
  };

  pricingPlans.yearly = pricingPlans.monthly.map((p) => ({
    ...p,
    price: Math.floor(p.price * 6 * 0.8),
  }));

  const activePlans = pricingPlans[billing];

  return (
    <section
      id="pricing"
      className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-flow-bg text-flow-text overflow-hidden border-t border-flow-border"
    >
      <WaveBackdrop id="price-wave" corner="tl" size="sm" opacity={0.45} />

      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-40" />

      <div className="container px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-12 md:mb-16 flex flex-col items-start"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-aurora-1" />
            Pricing
          </span>
          <h2 className="text-[2.25rem] sm:text-[3rem] md:text-5xl lg:text-[5.5rem] font-heading font-extrabold tracking-[-0.05em] mb-4 leading-[1.0]">
            Clear, transparent <br className="hidden md:block" />
            <span className="text-aurora italic">pricing.</span>
          </h2>
          <p className="text-flow-textSoft text-lg font-normal max-w-2xl">
            Choose your perfect package — crafted for modern businesses aiming for growth.
          </p>

          <div className="mt-10 inline-flex items-center glass border border-flow-border rounded-full p-1">
            {["monthly", "yearly"].map((mode) => (
              <button
                key={mode}
                onClick={() => setBilling(mode as "monthly" | "yearly")}
                className={`relative px-6 md:px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  billing === mode ? "text-white" : "text-flow-textSoft hover:text-flow-text"
                }`}
              >
                {billing === mode && (
                  <motion.span
                    layoutId="pricing-toggle"
                    className="absolute inset-0 bg-aurora-grad rounded-full shadow-aurora"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{mode === "monthly" ? "Monthly" : "Half-Yearly · 20% off"}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {activePlans.map((plan, idx) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col p-8 lg:p-10 rounded-3xl overflow-hidden ${
                plan.highlight
                  ? "bg-flow-cardSolid border border-transparent shadow-aurora gradient-border"
                  : "glass border border-flow-border conic-ring"
              }`}
            >
              {plan.highlight && (
                <span className="absolute inset-0 bg-aurora-soft opacity-80 pointer-events-none" />
              )}

              {plan.highlight && (
                <div className="absolute -top-3 right-6 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase rounded-full bg-aurora-grad text-white shadow-aurora">
                    <Sparkles className="w-3 h-3" />
                    {plan.highlight}
                  </span>
                </div>
              )}

              <div className="relative mb-8">
                <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-flow-text mb-2 tracking-tight">
                  {plan.title}
                </h3>
                <p className="text-sm text-flow-textSoft font-normal h-10">{plan.description}</p>
              </div>

              <div className="relative mb-8 flex items-baseline">
                <span className="text-[3.5rem] md:text-7xl font-heading font-extrabold tracking-[-0.05em] text-flow-text">
                  ${plan.price}
                </span>
                <span className="text-flow-textSoft ml-2 font-normal">
                  /{billing === "monthly" ? "mo" : "half-yr"}
                </span>
              </div>

              <ul className="relative flex-1 space-y-3.5 mb-8">
                {plan.features.map((feature: string) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-flow-text/85 font-normal leading-relaxed"
                  >
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-aurora-grad flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`shine relative w-full py-4 rounded-full font-semibold transition-all overflow-hidden ${
                  plan.highlight
                    ? "bg-aurora-grad text-white shadow-aurora hover:shadow-lg"
                    : "glass border border-flow-borderStrong text-flow-text hover:border-aurora-1/50"
                }`}
              >
                <span className="relative">Get Started</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
