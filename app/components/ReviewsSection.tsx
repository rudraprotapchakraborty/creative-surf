"use client";

import { motion } from "framer-motion";
import { Star, User, Quote } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const reviews = [
  {
    name: "Sarah Johnson",
    position: "Marketing Director",
    company: "TechVision Inc.",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "Working with Creative Surf transformed our digital presence completely. Our conversion rates increased by 45% in just three months.",
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, s) => (
        <Star
          key={s}
          className={cn("h-4 w-4", s < rating ? "text-aurora-warm fill-aurora-warm" : "text-flow-border")}
        />
      ))}
    </div>
  );
}

const ReviewCard = ({ review }: { review: (typeof reviews)[0] }) => (
  <div className="relative w-[280px] sm:w-[320px] md:w-[420px] shrink-0 p-5 sm:p-7 md:p-9 rounded-2xl glass border border-flow-border flex flex-col justify-between overflow-hidden hover:border-aurora-1/40 transition-colors duration-300">
    <div className="absolute -top-3 -right-3 opacity-[0.07]">
      <Quote className="w-24 h-24 text-aurora-1" strokeWidth={1.5} />
    </div>
    <div className="relative">
      <StarRating rating={review.rating} />
      <p className="text-base text-flow-text/90 leading-relaxed mt-5 mb-7">
        "{review.text}"
      </p>
    </div>
    <div className="relative flex items-center gap-3">
      <div className="flex items-center justify-center w-11 h-11 rounded-full overflow-hidden border border-flow-borderStrong bg-flow-cardSolid flex-shrink-0">
        {review.avatar.includes("placeholder") ? (
          <User size={20} className="text-flow-textSoft" strokeWidth={1.5} />
        ) : (
          <Image src={review.avatar} alt={review.name} fill className="object-cover" />
        )}
      </div>
      <div>
        <h4 className="font-bold text-flow-text text-sm">{review.name}</h4>
        <p className="text-xs text-flow-textSoft truncate max-w-[200px]">
          {review.position}, {review.company}
        </p>
      </div>
    </div>
  </div>
);

export default function ReviewsSection() {
  const marqueeItems = [...reviews, ...reviews, ...reviews, ...reviews];
  const featured = reviews[2];

  return (
    <section className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-flow-surface text-flow-text overflow-hidden border-t border-flow-border">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-30" />

      {/* Section header */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10 mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-aurora-1" />
            Client Testimonials
          </span>
          <h2
            className="font-bold text-flow-text leading-tight"
            style={{ fontSize: "clamp(2rem,3.5vw,3.25rem)" }}
          >
            Don't just take<br />
            <span className="text-aurora">our word for it.</span>
          </h2>
        </motion.div>
      </div>

      {/* Featured pull quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="container mx-auto px-6 max-w-3xl text-center mb-16 md:mb-20 relative z-10"
      >
        <div
          className="font-black leading-none mb-3 select-none"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", color: "rgb(var(--accent-1) / 0.12)" }}
        >
          "
        </div>
        <blockquote
          className="font-semibold text-flow-text/85 leading-snug mb-8 -mt-4 md:-mt-8"
          style={{ fontSize: "clamp(1rem, 2.2vw, 1.6rem)" }}
        >
          {featured.text}
        </blockquote>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          className="h-px w-16 mx-auto mb-6 origin-center bg-aurora-1/40"
        />

        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-flow-cardSolid border border-flow-borderStrong flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-flow-textSoft" strokeWidth={1.5} />
          </div>
          <div className="text-left">
            <div className="font-bold text-flow-text text-sm">{featured.name}</div>
            <div className="text-xs text-flow-textSoft">
              {featured.position}, {featured.company}
            </div>
          </div>
          <StarRating rating={featured.rating} />
        </div>
      </motion.div>

      {/* Scrolling marquee */}
      <div className="relative w-full flex overflow-hidden pb-4">
        <div className="absolute top-0 left-0 w-[12vw] h-full bg-gradient-to-r from-flow-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[12vw] h-full bg-gradient-to-l from-flow-surface to-transparent z-10 pointer-events-none" />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 55, ease: "linear", repeat: Infinity }}
          className="flex gap-5 md:gap-6 px-4"
        >
          {marqueeItems.map((review, idx) => (
            <ReviewCard key={idx} review={review} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
