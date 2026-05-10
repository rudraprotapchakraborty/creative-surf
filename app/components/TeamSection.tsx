"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { User, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import WaveBackdrop from "./WaveBackdrop";

const teamMembers = [
  { image: "https://i.ibb.co/PZTxMgTG/mehedee.jpg", name: "Mehedee", role: "Creative Director" },
  { image: "/placeholder.svg?height=400&width=400", name: "Rudra", role: "Web Developer" },
  { image: "/placeholder.svg?height=400&width=400", name: "Arnob", role: "Marketing Strategist" },
  { image: "/placeholder.svg?height=400&width=400", name: "Emon", role: "UI/UX Designer" },
  { image: "/placeholder.svg?height=400&width=400", name: "Anthony", role: "Animator" },
];

export default function TeamSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
    }, 1000);
  };

  return (
    <section className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-flow-bg text-flow-text overflow-hidden border-t border-flow-border">
      <WaveBackdrop id="team-wave" corner="tr" size="sm" opacity={0.4} />

      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-30" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-12 md:mb-16 lg:mb-20 flex flex-col items-start"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-aurora-2" />
            The Team
          </span>
          <h2 className="text-[2.25rem] sm:text-[3rem] md:text-5xl lg:text-[5.5rem] font-heading font-extrabold tracking-[-0.05em] mb-4 leading-[1.0]">
            Meet our<br className="hidden md:block" />
            <span className="text-aurora italic">visionaries.</span>
          </h2>
          <p className="text-flow-textSoft max-w-2xl font-normal text-lg">
            The creative minds driving digital transformation and excellence.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-32 h-32 md:w-36 md:h-36 mb-6">
                {/* Aurora glow ring */}
                <div className="absolute -inset-2 bg-aurora-grad rounded-full opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-500" />
                {/* Conic ring on hover */}
                <div className="absolute inset-0 rounded-full conic-ring" />
                <div className="relative flex items-center justify-center w-full h-full rounded-full overflow-hidden border border-flow-borderStrong bg-flow-cardSolid">
                  {member.image.includes("placeholder") ? (
                    <User
                      size={60}
                      className="text-flow-textSoft transition-transform duration-700 group-hover:scale-110"
                      strokeWidth={1}
                    />
                  ) : (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                </div>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-flow-text mb-1 tracking-tight">
                {member.name}
              </h3>
              <p className="text-sm text-flow-textSoft font-normal">{member.role}</p>
            </motion.div>
          ))}
        </div>

        {/* Join Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-28 max-w-xl mx-auto"
        >
          <div className="text-center mb-6">
            <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-flow-text mb-2 tracking-tight">
              Want to join the team?
            </h3>
            <p className="text-flow-textSoft font-normal">
              Leave your email and we'll keep you in the loop on new openings.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 glass border border-flow-border p-1.5 rounded-full focus-within:border-aurora-1/50 transition-colors"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent border-none text-flow-text placeholder:text-flow-textSoft shadow-none focus-visible:ring-0 h-12 px-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-aurora-grad text-white hover:opacity-90 rounded-full px-8 h-12 font-semibold transition-all shadow-aurora group"
            >
              {isSubmitting ? "Sending..." : (
                <span className="flex items-center gap-2">
                  Subscribe
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
