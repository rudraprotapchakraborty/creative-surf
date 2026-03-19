"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = reviews.length - 1;
      if (nextIndex >= reviews.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section className="relative py-32 bg-[#06080F] text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-20 flex flex-col items-center"
        >
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-cyan-400 mb-6">
            Client Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
            Don't just take our word for it.
          </h2>
        </motion.div>

        <div className="relative h-[400px] sm:h-[300px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full max-w-3xl mx-auto"
            >
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-[2rem] p-8 md:p-12 text-center flex flex-col items-center">
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, s) => (
                    <Star
                      key={s}
                      className={cn(
                        "h-5 w-5",
                        s < reviews[index].rating ? "text-cyan-400 fill-cyan-400" : "text-gray-600"
                      )}
                    />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-light text-gray-200 leading-relaxed mb-10 max-w-2xl">
                  "{reviews[index].text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                    <Image src={reviews[index].avatar} alt={reviews[index].name} fill className="object-cover" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-white">{reviews[index].name}</h4>
                    <p className="text-sm text-gray-400 truncate max-w-[200px]">{reviews[index].position}, {reviews[index].company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12 z-10 relative">
           <button
             onClick={() => paginate(-1)}
             className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
           >
             <ChevronLeft className="w-5 h-5" />
           </button>
           <div className="flex gap-2">
             {reviews.map((_, i) => (
               <button
                 key={i}
                 onClick={() => {
                   setDirection(i > index ? 1 : -1);
                   setIndex(i);
                 }}
                 className={cn(
                   "w-2.5 h-2.5 rounded-full transition-all duration-300",
                   i === index ? "bg-cyan-400 w-8" : "bg-white/20 hover:bg-white/40"
                 )}
               />
             ))}
           </div>
           <button
             onClick={() => paginate(1)}
             className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
           >
             <ChevronRight className="w-5 h-5" />
           </button>
        </div>
      </div>
    </section>
  );
}
