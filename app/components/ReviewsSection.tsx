"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Sarah Johnson",
    position: "Marketing Director",
    company: "TechVision Inc.",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "Working with Creative Surf transformed our digital presence completely. Our conversion rates increased by 45%.",
    rating: 5,
    date: "March 15, 2025",
  },
  {
    name: "Michael Chen",
    position: "CEO",
    company: "Innovate Solutions",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "They developed our brand identity, built our website, and executed a launch campaign that got us featured in major publications.",
    rating: 5,
    date: "February 3, 2025",
  },
  {
    name: "Emily Rodriguez",
    position: "E-commerce Manager",
    company: "StyleHouse Boutique",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "Our online sales have increased by 78% since working with them. Their seasonal launch campaign was stunning.",
    rating: 5,
    date: "January 22, 2025",
  },
];

export default function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const prev = () => setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* Background gradient orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/30 blur-3xl"
        animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-[-200px] w-[600px] h-[600px] rounded-full bg-blue-500/30 blur-3xl"
        animate={{ x: [0, -40, 40, 0], y: [0, 60, -60, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      {/* Content wrapper */}
      <div className="relative w-full max-w-6xl px-6 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-700 bg-clip-text text-transparent drop-shadow-lg mb-16"
        >
          What Our Clients Say
        </motion.h2>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                style={{ rotateX, rotateY }}
                className="w-full flex-shrink-0 px-4"
              >
                <motion.div
                  className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl flex flex-col items-center text-center hover:shadow-cyan-500/30 transition-all duration-500"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, s) => (
                      <Star
                        key={s}
                        className={cn(
                          "h-6 w-6",
                          s < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-xl text-gray-200 italic mb-8 max-w-3xl">“{review.text}”</p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400">
                      <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold">{review.name}</h4>
                      <div className="text-cyan-400">{review.position}</div>
                      <div className="text-gray-400 text-sm">{review.company}</div>
                    </div>
                  </div>
                  <div className="mt-6 text-sm text-gray-400">{review.date}</div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition"
            >
              <ChevronLeft className="h-6 w-6 text-cyan-400" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={next}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition"
            >
              <ChevronRight className="h-6 w-6 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-3 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={cn(
                "h-3 w-3 rounded-full transition-all",
                i === index ? "bg-cyan-400 w-6" : "bg-gray-500 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
