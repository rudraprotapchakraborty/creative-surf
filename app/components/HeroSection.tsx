"use client";

import { Button } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white py-24 overflow-hidden min-h-[520px]">
      {/* Animated subtle starry background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-radial from-indigo-700 via-transparent to-transparent opacity-40"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 -z-20 bg-gradient-radial from-blue-800 via-transparent to-transparent opacity-30"
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16">
          {/* Text Section */}
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight ">
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-700 to-purple-800 bg-clip-text text-transparent">
                Unlock Revenue Growth By
              </span>
              <TypeAnimation
                sequence={[
                  "Digital Marketing",
                  2500,
                  "SEO & Lead Generation",
                  2500,
                  "UX & Interactive",
                  2500,
                ]}
                wrapper="span"
                speed={45}
                repeat={Infinity}
                className="block mt-3 bg-gradient-to-r from-cyan-400 via-purple-700 to-purple-800 bg-clip-text text-transparent font-semibold drop-shadow-md"
              />
            </h1>

            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <Button
                className="rounded-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 shadow-lg shadow-cyan-700/60 hover:shadow-cyan-900/80 transition-transform transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-2 bg-gray-900 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white shadow-md shadow-cyan-700/40 transition-transform transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
              >
                Get a Proposal
              </Button>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center relative"
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            whileHover={{ scale: 1.05, rotate: 3, transition: { duration: 0.4 } }}
          >
            <div className="relative w-full max-w-lg h-[320px] md:h-[360px] lg:h-[400px] drop-shadow-[0_20px_30px_rgba(99,102,241,0.7)] rounded-3xl overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20943545-CE8NfTg9GBeEIOnIVPadYdmnUJn7Pm.png"
                alt="Digital Marketing Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Neon glow behind image */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-72 h-40 rounded-xl filter blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(129, 140, 248, 0.6), transparent 70%)",
                zIndex: -1,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
