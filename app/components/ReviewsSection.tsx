"use client";

import { motion } from "framer-motion";
import { Star, User } from "lucide-react";
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
  },
  {
    name: "Michael Chen",
    position: "CEO",
    company: "Innovate Solutions",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "They developed our brand identity, built our website, and executed a campaign that got us featured in major publications.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    position: "E-commerce Manager",
    company: "StyleHouse Boutique",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "Our online sales have increased by 78% since working with them. Their seasonal launch campaign was absolutely stunning.",
    rating: 5,
  },
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <div className="w-[350px] md:w-[450px] shrink-0 p-8 md:p-10 rounded-sm bg-flow-card border border-flow-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-500">
    <div>
      <div className="flex gap-1 mb-8">
        {[...Array(5)].map((_, s) => (
          <Star
            key={s}
            className={cn(
              "h-5 w-5",
              s < review.rating ? "text-[#F5B041] fill-[#F5B041]" : "text-gray-200"
            )}
          />
        ))}
      </div>
      <p className="text-xl md:text-2xl font-normal text-flow-text/90 leading-relaxed mb-10">
        "{review.text}"
      </p>
    </div>
    
    <div className="flex items-center gap-4">
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full overflow-hidden border border-flow-border bg-flow-border/10">
        {review.avatar.includes("placeholder") ? (
          <User size={24} className="text-flow-text/40 transition-transform duration-500 hover:scale-110" strokeWidth={1.5} />
        ) : (
          <Image src={review.avatar} alt={review.name} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
        )}
      </div>
      <div className="text-left">
        <h4 className="font-heading font-extrabold text-flow-text tracking-tight">{review.name}</h4>
        <p className="text-sm text-flow-text/60 font-normal truncate max-w-[200px]">{review.position}, {review.company}</p>
      </div>
    </div>
  </div>
);

export default function ReviewsSection() {
  // We duplicate the array multiple times to ensure enough long content for a seamless infinite scroll even on ultra-wide monitors.
  const marqueeItems = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <section className="relative py-32 bg-flow-bg text-flow-text overflow-hidden border-t border-flow-border">
      
      {/* Sharp Vector Waves */}
      <div className="absolute top-0 right-0 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] max-w-[1000px] max-h-[1000px] pointer-events-none z-0 overflow-hidden transform opacity-40">
        <motion.svg 
          viewBox="0 0 500 500" 
          preserveAspectRatio="xMidYMax slice"
          className="absolute top-0 right-0 w-full h-full object-cover origin-top-right"
        >
          <path d="M 500,500 L 0,500 C 100,400 150,300 300,350 C 400,380 450,200 500,100 Z" className="fill-flow-blob3 transition-colors" />
          <path d="M 500,500 L 50,500 C 150,450 250,350 350,400 C 420,430 480,250 500,150 Z" className="fill-flow-blob2 transition-colors" />
        </motion.svg>
      </div>

      <div className="container mx-auto px-6 max-w-7xl pt-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-left mb-24 flex flex-col items-start relative z-10"
        >
          <span className="px-5 py-2 rounded-[2rem] bg-flow-card border border-flow-border shadow-sm text-sm font-semibold text-flow-green mb-8">
            Client Testimonials
          </span>
          <h2 className="text-[2.75rem] sm:text-[3.5rem] md:text-6xl lg:text-[6.5rem] font-heading font-extrabold tracking-[-0.04em] mb-6 leading-[1.05]">
            Don't just take <br className="hidden md:block"/>our word for it.
          </h2>
        </motion.div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative w-full flex overflow-hidden group pb-10">
         {/* Gradient Masks for fading edges */}
         <div className="absolute top-0 left-0 w-[15vw] h-full bg-gradient-to-r from-flow-bg to-transparent z-10 pointer-events-none" />
         <div className="absolute top-0 right-0 w-[15vw] h-full bg-gradient-to-l from-flow-bg to-transparent z-10 pointer-events-none" />
         
         <motion.div
           animate={{ x: ["0%", "-50%"] }}
           transition={{ duration: 40, ease: "linear", repeat: Infinity }}
           className="flex gap-6 md:gap-8 px-4"
         >
           {marqueeItems.map((review, idx) => (
             <ReviewCard key={idx} review={review} />
           ))}
         </motion.div>
      </div>

    </section>
  );
}
