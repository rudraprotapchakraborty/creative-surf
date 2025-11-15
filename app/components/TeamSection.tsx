"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const teamMembers = [
  { image: "https://i.ibb.co/PZTxMgTG/mehedee.jpg", name: "Mehedee", role: "Creative Director" },
  { image: "/placeholder.svg", name: "Rudra", role: "Web Developer" },
  { image: "/placeholder.svg", name: "Arnob", role: "Marketing Strategist" },
  { image: "/placeholder.svg", name: "Emon", role: "UI/UX Designer" },
  { image: "/placeholder.svg", name: "Anthony", role: "Animator" },
];

export default function TeamSection() {
  const ref = useRef(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const cardsY = useTransform(scrollYProgress, [0, 0.4], [100, 0]);

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
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* Background Neon Grid */}
      <motion.div
        className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]"
        style={{ scale: bgScale }}
      />

      {/* Morphing Gradient Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background:
              i % 2 === 0
                ? "radial-gradient(circle, rgba(0,255,255,0.25), transparent)"
                : "radial-gradient(circle, rgba(0,150,255,0.25), transparent)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Small floating particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Title */}
      <motion.h2
        className="text-center text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-700 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,255,255,0.6)]"
        style={{ y: titleY }}
      >
        Meet Our Visionaries
      </motion.h2>

      {/* Team Cards */}
      <motion.div
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-6"
        style={{ y: cardsY }}
      >
        {teamMembers.map((member, i) => (
          <TiltCard key={i} member={member} delay={i * 0.15} />
        ))}
      </motion.div>

      {/* Email Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="mt-16 flex flex-col sm:flex-row gap-4 bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-full shadow-lg shadow-cyan-500/20 w-full max-w-xl relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Light sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
        <Input
          type="email"
          placeholder="Enter your email"
          className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus-visible:ring-0 focus-visible:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-125 text-white rounded-full px-6"
        >
          {isSubmitting ? "Processing..." : "Join Us"}
        </Button>
      </motion.form>
    </section>
  );
}

const TiltCard = ({ member, delay }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - rect.left - rect.width / 2;
    const yPos = e.clientY - rect.top - rect.height / 2;
    x.set(xPos / 15);
    y.set(-yPos / 15);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX: y, rotateY: x }}
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay }}
      viewport={{ once: true }}
      className="relative group p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg shadow-cyan-500/10 cursor-pointer overflow-hidden"
    >
      {/* Holographic scan */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100"
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-cyan-400/40 group-hover:border-blue-400/40 transition-colors duration-500">
        <Image
          src={member.image}
          alt={member.name}
          width={128}
          height={128}
          className="object-cover"
        />
      </div>
      <h3 className="mt-4 text-lg font-bold text-white">{member.name}</h3>
      <p className="text-sm text-gray-300">{member.role}</p>
    </motion.div>
  );
};
