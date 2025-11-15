"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        "Series Content (Product/Service)",
        "Animated Motion Video/GIF",
        "Social Media Management",
        "Media Buying on Demand",
      ],
    },
    {
      title: "Standard",
      price: 490,
      description: "Best for growing companies",
      highlight: "POPULAR",
      features: [
        "Business Development",
        "Campaign Marketing",
        "Product Photography",
        "Creative Visual Content (Up to 10)",
        "Series Content (Product/Service)",
        "Animated Motion Video/GIF",
        "Social Media Management",
        "Copyright Content with SEO",
        "Media Buying on Demand ($50 free)",
      ],
    },
    {
      title: "Premium",
      price: 650,
      description: "For enterprise businesses",
      features: [
        "Business Development",
        "Campaign Marketing",
        "Product Photography",
        "Creative Visual Content (Up to 15)",
        "Series Content (Product/Service)",
        "Website Development",
        "Animated Motion Video",
        "Social Media Management",
        "Copyright Content with SEO",
        "Media Buying on Demand ($100 free)",
        "Content Writing (Up to 5)",
      ],
    },
  ],
  yearly: [],
};

pricingPlans.yearly = pricingPlans.monthly.map((p) => ({
  ...p,
  price: p.price * 6 * 0.8,
}));

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Neon grid */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "perspective(800px) rotateX(60deg)",
        }}
        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-40 h-40 rounded-full bg-cyan-500/20 blur-3xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, 60, 0],
            x: [0, 40, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Particle trails */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-12 rounded-full bg-gradient-to-b from-cyan-400 to-transparent opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["-20vh", "120vh"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="container relative z-10 px-6 max-w-7xl text-center">
        {/* Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Ultimate Pricing Plans
        </motion.h1>
        <p className="text-gray-300 mt-4 text-lg">
          Choose your perfect package — crafted for modern businesses
        </p>

        {/* Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="relative flex items-center bg-white/10 rounded-full p-1 backdrop-blur-lg border border-white/20">
            {["monthly", "yearly"].map((mode) => (
              <button
                key={mode}
                onClick={() => setBilling(mode as "monthly" | "yearly")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  billing === mode
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                    : "text-gray-300"
                }`}
              >
                {mode === "monthly" ? "Monthly" : "Half-Yearly (20% OFF)"}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {pricingPlans[billing].map((plan) => (
            <motion.div
              key={plan.title}
              className="relative group p-8 rounded-3xl backdrop-blur-xl border border-white/20 bg-white/5 shadow-[0_0_30px_rgba(0,255,255,0.1)] transition-all flex flex-col justify-between"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-2xl"
                transition={{ duration: 0.4 }}
              />
              {plan.highlight && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 text-xs rounded-full shadow-md">
                  {plan.highlight}
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
                <div className="mt-4 text-5xl font-extrabold text-white">
                  ${Math.floor(plan.price)}
                  <span className="text-lg text-gray-400">
                    /{billing === "monthly" ? "mo" : "half-yr"}
                  </span>
                </div>
                <p className="text-gray-300 mt-2">{plan.description}</p>
                <ul className="mt-6 space-y-3 text-left">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-gray-200">
                      <CheckCircle2 className="text-cyan-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="mt-8 w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-125 text-white font-semibold py-3 rounded-full shadow-lg transition-all">
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
