"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ourWorks = [
  {
    title: "Global E-commerce Redesign",
    description:
      "Complete overhaul of an international e-commerce platform resulting in 43% increase in conversions",
    image: "/placeholder.svg?height=1200&width=2000",
    tags: ["E-commerce", "UX Design", "Frontend Development"],
    link: "/case-studies/ecommerce-redesign",
    gradient: "from-cyan-500 via-blue-800 to-purple-700",
  },
  {
    title: "Luxury Brand Social Campaign",
    description:
      "Integrated social media campaign for a luxury fashion brand that increased engagement by 78%",
    image: "/placeholder.svg?height=1200&width=2000",
    tags: ["Social Media", "Content Creation", "Brand Strategy"],
    link: "/case-studies/luxury-social-campaign",
    gradient: "from-pink-500 via-purple-700 to-indigo-800",
  },
  {
    title: "SaaS Marketing Website",
    description:
      "Modern, conversion-focused website for a B2B SaaS company that doubled qualified lead generation",
    image: "/placeholder.svg?height=1200&width=2000",
    tags: ["Web Development", "SEO", "Lead Generation"],
    link: "/case-studies/saas-marketing-website",
    gradient: "from-indigo-500 via-blue-700 to-cyan-600",
  },
  {
    title: "Mobile App Launch Campaign",
    description:
      "Comprehensive marketing strategy for a fintech app launch that achieved 100,000+ downloads in first month",
    image: "/placeholder.svg?height=1200&width=2000",
    tags: ["App Marketing", "Digital Advertising", "Content Strategy"],
    link: "/case-studies/fintech-app-launch",
    gradient: "from-fuchsia-500 via-red-700 to-orange-600",
  },
];

export default function PortfolioSection() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Set up auto-slide
    timeoutRef.current = setInterval(() => {
      setIndex((prev) => (prev === ourWorks.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timeoutRef.current);
  }, []);

  useEffect(() => {
    // Generate particle positions only in client
    const particleData = [...Array(15)].map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      delay: Math.random() * 3,
    }));
    setParticles(particleData);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden mt-14">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className={cn(
            "absolute inset-0 transition-all duration-700",
            `bg-gradient-to-br ${ourWorks[index].gradient}`
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </AnimatePresence>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-white/30 backdrop-blur-sm"
          initial={{ x: p.x, y: p.y }}
          animate={{
            y: [p.y, p.y - 50],
            opacity: [1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}

      {/* Slide content */}
      <div className="relative h-full w-full flex flex-col items-center justify-center px-8 text-center text-white">
        <motion.div
          key={ourWorks[index].title}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {ourWorks[index].title}
          </motion.h2>
          <motion.p
            className="text-lg md:text-2xl text-gray-200 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {ourWorks[index].description}
          </motion.p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {ourWorks[index].tags.map((tag, i) => (
              <motion.span
                key={i}
                className="px-4 py-1 rounded-full border border-white/30 bg-white/10 text-sm backdrop-blur-sm hover:bg-white/20 transition"
                whileHover={{ scale: 1.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <Button
            asChild
            variant="outline"
            className="border-white text-black hover:bg-white hover:text-black rounded-full px-6 py-2"
          >
            <Link
              href={ourWorks[index].link}
              className="flex items-center gap-2"
            >
              View Project <ExternalLink className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Navigation */}
        <div className="absolute inset-x-0 bottom-10 flex items-center justify-between px-6 md:px-20">
          <motion.button
            onClick={() =>
              setIndex(index === 0 ? ourWorks.length - 1 : index - 1)
            }
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={() =>
              setIndex(index === ourWorks.length - 1 ? 0 : index + 1)
            }
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
