"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const plans = {
  monthly: [
    {
      title: "Basic",
      price: 1000,
      description: "Perfect for small businesses ready to grow their digital presence.",
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
      description: "The complete package — our most popular choice for scaling brands.",
      highlight: true,
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
      description: "Full-service digital marketing for enterprise businesses.",
      features: [
        "Website Development",
        "Creative Visual Content (Up to 15)",
        "Media Buying on Demand ($100 free)",
        "Content Writing (Up to 5)",
        "Everything in Standard",
      ],
    },
  ],
} as const;

type Billing = "monthly" | "yearly";

export default function PricingSection() {
  const [billing, setBilling] = useState<Billing>("monthly");

  const activePlans = billing === "monthly"
    ? plans.monthly
    : plans.monthly.map((p) => ({ ...p, price: Math.floor(p.price * 6 * 0.8) }));

  return (
    <section
      id="pricing"
      className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-flow-bg text-flow-text overflow-hidden border-t border-flow-border"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-40" />

      <div className="container px-6 max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-start"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-aurora-1" />
            Pricing
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 w-full">
            <h2
              className="font-bold text-flow-text leading-tight"
              style={{ fontSize: "clamp(2rem,3.5vw,3.25rem)" }}
            >
              Clear, transparent<br />
              <span className="text-aurora">pricing.</span>
            </h2>
            <p className="text-flow-textSoft text-base max-w-sm lg:text-right leading-relaxed">
              No hidden fees. No surprises. Pick the package that matches where you are — and where you're going.
            </p>
          </div>

          {/* Billing toggle */}
          <div className="mt-10 inline-flex items-center glass border border-flow-border rounded-full p-1">
            {(["monthly", "yearly"] as Billing[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setBilling(mode)}
                className={`relative px-4 sm:px-6 md:px-8 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
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
                <span className="relative">
                  {mode === "monthly"
                    ? "Monthly"
                    : <><span className="sm:hidden">6-Month · 20% off</span><span className="hidden sm:inline">Half-Yearly · 20% off</span></>}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          <AnimatePresence mode="wait">
            {activePlans.map((plan, idx) => {
              const isHighlight = "highlight" in plan && plan.highlight;
              return (
                <motion.div
                  key={`${plan.title}-${billing}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.08, duration: 0.5, ease: EASE }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className={`relative flex flex-col rounded-3xl overflow-hidden ${
                    isHighlight
                      ? "bg-flow-text"
                      : "glass border border-flow-border"
                  }`}
                >
                  {/* Aurora glow inside dark card */}
                  {isHighlight && (
                    <>
                      <div
                        className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                        style={{ background: "rgb(var(--accent-2) / 0.25)" }}
                      />
                      <div
                        className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full blur-3xl pointer-events-none"
                        style={{ background: "rgb(var(--accent-1) / 0.20)" }}
                      />
                    </>
                  )}

                  {/* Popular badge */}
                  {isHighlight && (
                    <div className="relative z-10 flex justify-center pt-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase rounded-full bg-aurora-grad text-white shadow-aurora">
                        <Sparkles className="w-3 h-3" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className={`relative z-10 flex flex-col flex-1 p-8 lg:p-10 ${isHighlight ? "pt-5" : ""}`}>
                    {/* Plan name + desc */}
                    <div className="mb-7">
                      <h3
                        className={`text-xl font-bold mb-2 ${
                          isHighlight ? "text-flow-bg" : "text-flow-text"
                        }`}
                      >
                        {plan.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${
                          isHighlight ? "text-flow-bg/60" : "text-flow-textSoft"
                        }`}
                      >
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-8 flex items-baseline gap-1">
                      <span
                        className={`text-5xl md:text-6xl font-bold tabular-nums ${
                          isHighlight ? "text-flow-bg" : "text-flow-text"
                        }`}
                      >
                        ${plan.price}
                      </span>
                      <span
                        className={`text-sm ml-1 ${
                          isHighlight ? "text-flow-bg/50" : "text-flow-textSoft"
                        }`}
                      >
                        /{billing === "monthly" ? "mo" : "half-yr"}
                      </span>
                    </div>

                    {/* Divider */}
                    <div
                      className="w-full h-px mb-7"
                      style={{
                        background: isHighlight
                          ? "rgb(var(--flow-bg) / 0.12)"
                          : "var(--flow-border)",
                      }}
                    />

                    {/* Features */}
                    <ul className="flex-1 space-y-3.5 mb-8">
                      {plan.features.map((feature: string) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span
                            className={`shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                              isHighlight ? "bg-aurora-grad" : "bg-aurora-grad"
                            }`}
                          >
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </span>
                          <span
                            className={`text-sm leading-relaxed ${
                              isHighlight ? "text-flow-bg/80" : "text-flow-text/85"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all ${
                        isHighlight
                          ? "bg-flow-bg text-flow-text hover:opacity-90"
                          : "bg-aurora-grad text-white shadow-aurora hover:opacity-90"
                      }`}
                    >
                      Get Started
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-flow-textSoft/60 mt-10"
        >
          All plans include a dedicated account manager. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}
