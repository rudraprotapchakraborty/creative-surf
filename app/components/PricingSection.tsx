"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingPlans = {
  monthly: [
    {
      title: "Basic",
      price: 390,
      description: "Perfect for small businesses",
      gradient: "from-cyan-500 to-cyan-500",
      border: "border-gray-200",
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
      gradient: "from-cyan-600 to-purple-600",
      border: "border-cyan-600 border-2",
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
      gradient: "from-purple-600 to-pink-600",
      border: "border-gray-200",
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
  yearly: [
    {
      ...this?.monthly?.[0],
      price: 390 * 12 * 0.8, // 20% off
    },
    {
      ...this?.monthly?.[1],
      price: 490 * 12 * 0.8,
    },
    {
      ...this?.monthly?.[2],
      price: 650 * 12 * 0.8,
    },
  ],
};

const PricingSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const MotionWrapper = ({ children, ...props }) => {
    if (isMobile) return <div {...props}>{children}</div>;
    return <motion.div {...props}>{children}</motion.div>;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <MotionWrapper
          className="text-4xl md:text-5xl font-bold mb-4 text-center text-white"
          initial={!isMobile ? { opacity: 0, y: -20 } : undefined}
          whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our <span className="text-cyan-400">Pricing</span> Plans
        </MotionWrapper>
        <MotionWrapper
          className="text-xl text-white/80 text-center mb-8"
          initial={!isMobile ? { opacity: 0, y: 20 } : undefined}
          whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Choose the perfect plan for your business needs
        </MotionWrapper>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-full p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-2 rounded-full font-medium transition ${
                billing === "monthly"
                  ? "bg-cyan-600 text-white"
                  : "text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-4 py-2 rounded-full font-medium transition ${
                billing === "yearly"
                  ? "bg-cyan-600 text-white"
                  : "text-white"
              }`}
            >
              Yearly <span className="text-xs">(20% OFF)</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto ">
          {pricingPlans["monthly"].map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={!isMobile ? { opacity: 0, y: 40 } : undefined}
              whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Hover Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500`}
              ></div>

              {/* Card */}
              <div
                className={`relative bg-gradient-to-b from-gray-900 via-gray-800 to-black ${plan.border} rounded-2xl shadow-xl p-8 transition-transform duration-500 hover:-translate-y-1 flex flex-col h-full`}
              >
                {/* Highlight Badge */}
                {plan.highlight && (
                  <div className="absolute top-0 right-0 bg-cyan-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold z-10">
                    {plan.highlight}
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <h3
                    className={`inline-block bg-gradient-to-r ${plan.gradient} text-white rounded-full px-6 py-2 text-xl font-semibold mb-4`}
                  >
                    {plan.title}
                  </h3>
                  <div className="text-4xl font-bold mb-2 text-white/80">
                    ${billing === "monthly" ? plan.price : Math.floor(plan.price * 12 * 0.8)}
                    <span className="text-lg text-white/80">/mo</span>
                  </div>
                  <p className="text-white/80">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-white/80"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                        </motion.div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <Button
                  aria-label={`Select ${plan.title} plan`}
                  className={`w-full bg-gradient-to-r ${plan.gradient} hover:brightness-110`}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
