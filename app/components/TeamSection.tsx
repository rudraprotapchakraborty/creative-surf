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
    <section className="relative py-32 bg-flow-card text-flow-text overflow-hidden border-t border-flow-border">
      {/* Sharp Vector Waves */}
      <div className="absolute top-0 right-0 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] max-w-[1000px] max-h-[1000px] pointer-events-none z-0 overflow-hidden opacity-30">
        <motion.svg 
          viewBox="0 0 500 500" 
          preserveAspectRatio="xMidYMax slice"
          className="absolute top-0 right-0 w-full h-full object-cover origin-top-right"
        >
          <path d="M 500,500 L 0,500 C 100,400 150,300 300,350 C 400,380 450,200 500,100 Z" className="fill-flow-blob3 transition-colors" />
          <path d="M 500,500 L 50,500 C 150,450 250,350 350,400 C 420,430 480,250 500,150 Z" className="fill-flow-blob2 transition-colors" />
        </motion.svg>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-left mb-20 flex flex-col items-start"
        >
          <h2 className="text-[3.5rem] sm:text-[4.5rem] md:text-7xl lg:text-[6.5rem] font-heading font-extrabold tracking-[-0.04em] mb-4 leading-[1.05]">
            Meet Our<br className="hidden md:block"/>Visionaries
          </h2>
          <p className="text-flow-text/70 max-w-2xl font-normal text-lg">
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
              <div className="relative w-32 h-32 md:w-36 md:h-36 mb-6 rounded-full overflow-hidden border border-flow-border group-hover:border-flow-text/30 transition-colors duration-500">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-heading font-extrabold text-flow-text mb-1 tracking-tight">{member.name}</h3>
              <p className="text-sm text-flow-text/60 font-normal">{member.role}</p>
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
             <h3 className="text-3xl font-heading font-extrabold text-flow-text mb-2 tracking-tight">Want to join the team?</h3>
             <p className="text-flow-text/70 font-normal text-sm">Leave your email and we'll keep you in the loop on new openings.</p>
          </div>
          
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 bg-flow-card border border-flow-border p-1.5 rounded-sm focus-within:border-flow-green/50 transition-colors shadow-sm"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent border-none text-flow-text placeholder:text-flow-text/50 shadow-none focus-visible:ring-0 h-10 md:h-12 px-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-flow-green text-white hover:bg-flow-buttonHover rounded-sm px-8 h-10 md:h-12 font-semibold transition-colors shadow-sm"
            >
              {isSubmitting ? "Sending..." : "Subscribe"}
            </Button>
          </form>
        </motion.div>
        
      </div>
    </section>
  );
}
