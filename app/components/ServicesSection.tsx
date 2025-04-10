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
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
  {
    title: "Content Marketing",
    description:
      "Strategic content creation and distribution to attract and engage your target audience",
    icon: FileText,
    gradient: "bg-gradient-to-br from-orange-400 to-amber-600",
  },
  {
    title: "Video Editing",
    description:
      "Professional video production and post-production services for marketing and promotional content",
    icon: Video,
    gradient: "bg-gradient-to-br from-yellow-400 to-amber-600",
  },
  {
    title: "Website Development",
    description:
      "Custom website design and development using the latest technologies and best practices",
    icon: Globe,
    gradient: "bg-gradient-to-br from-pink-400 to-purple-600",
  },
  {
    title: "OVC/TVC",
    description:
      "Online and television commercial production to showcase your brand across multiple channels",
    icon: Tv,
    gradient: "bg-gradient-to-br from-purple-500 to-indigo-700",
  },
  {
    title: "SEO and Social Media Marketing",
    description:
      "Improve visibility in search engines and build engagement across social platforms",
    icon: Search,
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
  },
  {
    title: "Media Buying",
    description:
      "Strategic ad placement and campaign management to maximize your marketing ROI",
    icon: Target,
    gradient: "bg-gradient-to-br from-green-400 to-emerald-600",
  },
  {
    title: "Digital Branding",
    description:
      "Comprehensive brand strategy and identity development for the digital landscape",
    icon: Users,
    gradient: "bg-gradient-to-br from-teal-400 to-emerald-600",
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-14 bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Services We <span className="text-blue-600">Provide</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`absolute inset-0 ${service.gradient} opacity-90 transition-all duration-300`} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300" />
              <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center text-white text-center">
                <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  <service.icon className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                <p className="text-white/80 text-sm">{service.description}</p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent rounded-2xl opacity-0 group-hover:opacity-100 group-hover:border-white/30 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
