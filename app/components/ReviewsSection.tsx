"use client";

import { motion } from "framer-motion";
import { Star, User, Quote } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import WaveBackdrop from "./WaveBackdrop";

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
  <div className="conic-ring relative w-[340px] md:w-[450px] shrink-0 p-8 md:p-10 rounded-3xl glass border border-flow-border flex flex-col justify-between transition-all duration-500 overflow-hidden hover:border-aurora-1/40">
    <div className="absolute -top-4 -right-4 opacity-10">
      <Quote className="w-32 h-32 text-aurora-1" strokeWidth={1.5} />
    </div>
    <div className="relative">
      <div className="flex gap-1 mb-8">
        {[...Array(5)].map((_, s) => (
          <Star
            key={s}
            className={cn(
              "h-5 w-5",
              s < review.rating ? "text-aurora-warm fill-aurora-warm" : "text-flow-borderStrong"
            )}
          />
        ))}
      </div>
      <p className="text-xl md:text-2xl font-normal text-flow-text/95 leading-relaxed mb-10">
        “{review.text}”
      </p>
    </div>

    <div className="relative flex items-center gap-4">
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full overflow-hidden border border-flow-borderStrong bg-flow-cardSolid">
        {review.avatar.includes("placeholder") ? (
          <User size={24} className="text-flow-textSoft" strokeWidth={1.5} />
        ) : (
          <Image src={review.avatar} alt={review.name} fill className="object-cover" />
        )}
      </div>
      <div className="text-left">
        <h4 className="font-heading font-extrabold text-flow-text tracking-tight">{review.name}</h4>
        <p className="text-sm text-flow-textSoft font-normal truncate max-w-[220px]">
          {review.position}, {review.company}
        </p>
      </div>
    </div>
  </div>
);

export default function ReviewsSection() {
  const marqueeItems = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <section className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-flow-bg text-flow-text overflow-hidden border-t border-flow-border">
      <WaveBackdrop id="rev-wave" corner="tr" size="sm" opacity={0.45} />

      <div className="container mx-auto px-6 max-w-7xl pt-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left mb-14 md:mb-20 lg:mb-24 flex flex-col items-start"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-aurora-1" />
            Client Testimonials
          </span>
          <h2 className="text-[2.25rem] sm:text-[3rem] md:text-5xl lg:text-[5.5rem] font-heading font-extrabold tracking-[-0.05em] mb-6 leading-[1.0]">
            Don't just take <br className="hidden md:block" />
            <span className="text-aurora italic">our word for it.</span>
          </h2>
        </motion.div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative w-full flex overflow-hidden group pb-10">
        <div className="absolute top-0 left-0 w-[15vw] h-full bg-gradient-to-r from-flow-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[15vw] h-full bg-gradient-to-l from-flow-bg to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity }}
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
