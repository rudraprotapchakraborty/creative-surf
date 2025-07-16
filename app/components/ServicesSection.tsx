"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  PenTool,
  FileText,
  Video,
  Globe,
  Tv,
  Search,
  Target,
  Users,
} from "lucide-react";

const services = [
  {
    title: "Graphics Design",
    description:
      "Professional design services for print and digital media including logos, branding materials, and marketing collateral",
    icon: PenTool,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    title: "Content Marketing",
    description:
      "Strategic content creation and distribution to attract and engage your target audience",
    icon: FileText,
    gradient: "from-orange-400 to-amber-600",
  },
  {
    title: "Video Editing",
    description:
      "Professional video production and post-production services for marketing and promotional content",
    icon: Video,
    gradient: "from-yellow-400 to-amber-600",
  },
  {
    title: "Website Development",
    description:
      "Custom website design and development using the latest technologies and best practices",
    icon: Globe,
    gradient: "from-pink-400 to-purple-600",
  },
  {
    title: "OVC/TVC",
    description:
      "Online and television commercial production to showcase your brand across multiple channels",
    icon: Tv,
    gradient: "from-purple-500 to-indigo-700",
  },
  {
    title: "SEO and Social Media Marketing",
    description:
      "Improve visibility in search engines and build engagement across social platforms",
    icon: Search,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    title: "Media Buying",
    description:
      "Strategic ad placement and campaign management to maximize your marketing ROI",
    icon: Target,
    gradient: "from-green-400 to-emerald-600",
  },
  {
    title: "Digital Branding",
    description:
      "Comprehensive brand strategy and identity development for the digital landscape",
    icon: Users,
    gradient: "from-teal-400 to-emerald-600",
  },
];

const cardVariants = {
  offscreen: { y: 60, opacity: 0, scale: 0.8 },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.35,
      duration: 0.8,
    },
  },
};

const ServicesSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-6 text-center max-w-7xl">
        <motion.h2
          className="text-5xl text-cyan-400 font-extrabold mb-20 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Services We <span className="text-white">Provide</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map(({ title, description, icon: Icon, gradient }, i) => (
            <motion.div
              key={title}
              className="relative rounded-3xl bg-gradient-to-br shadow-2xl shadow-cyan-700/30 p-8 cursor-pointer select-none"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95, rotate: -1 }}
              style={{
                backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                "--tw-gradient-from": `var(--tw-color-${gradient.split(" ")[0]})`,
                "--tw-gradient-to": `var(--tw-color-${gradient.split(" ")[2]})`,
              } as React.CSSProperties}
            >
              {/* Neon glowing blur behind icon */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full filter blur-3xl opacity-40"
                style={{
                  background:
                    `radial-gradient(circle at center, rgba(255,255,255,0.6), transparent 60%)`,
                }}
              />

              <div className="relative flex flex-col items-center gap-6 text-white">
                <div
                  className={`p-5 rounded-full bg-gradient-to-br ${gradient} shadow-lg shadow-${gradient
                    .split(" ")[1]
                    .replace(/-/, "")}/70 transition-transform duration-300 group-hover:scale-125`}
                >
                  <Icon className="h-14 w-14 drop-shadow-xl" />
                </div>
                <h3 className="text-3xl font-extrabold tracking-wide drop-shadow-md">
                  {title}
                </h3>
                <p className="text-white/80 max-w-xs leading-relaxed tracking-wide drop-shadow-sm">
                  {description}
                </p>
              </div>

              {/* Fancy 3D border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
