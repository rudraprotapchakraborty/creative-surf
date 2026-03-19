"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <section className="relative py-32 bg-[#06080F] text-white overflow-hidden border-t border-white/[0.05]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
            Meet Our Visionaries
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
            The creative minds driving digital transformation and excellence.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-32 h-32 md:w-36 md:h-36 mb-6 rounded-full overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors duration-500">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">{member.name}</h3>
              <p className="text-sm text-gray-400 font-light">{member.role}</p>
            </motion.div>
          ))}
        </div>

        {/* Join Us Form */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4 }}
           className="mt-28 max-w-lg mx-auto"
        >
          <div className="text-center mb-6">
             <h3 className="text-2xl font-medium text-white mb-2">Want to join the team?</h3>
             <p className="text-gray-400 font-light text-sm">Leave your email and we'll keep you in the loop on new openings.</p>
          </div>
          
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 bg-white/[0.03] border border-white/[0.08] p-1.5 rounded-full focus-within:border-white/20 transition-colors"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent border-none text-white placeholder:text-gray-500 shadow-none focus-visible:ring-0 h-10 md:h-12 px-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black hover:bg-gray-200 rounded-full px-8 h-10 md:h-12 font-medium transition-colors"
            >
              {isSubmitting ? "Sending..." : "Subscribe"}
            </Button>
          </form>
        </motion.div>
        
      </div>
    </section>
  );
}
