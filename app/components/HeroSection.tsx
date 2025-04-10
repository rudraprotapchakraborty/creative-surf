"use client";

import { Button } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-white to-blue-100 text-gray-800 py-12 md:py-20 overflow-hidden min-h-[400px]">
      <div className="absolute inset-0 z-0 bg-dot-pattern opacity-30 animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Section */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              <span className="block bg-gradient-to-r from-blue-600 via-fuchsia-500 to-cyan-500 text-transparent bg-clip-text">
                Unlock Revenue Growth By
              </span>
              <TypeAnimation
                sequence={[
                  "Digital Marketing",
                  2000,
                  "SEO & Lead Generation",
                  2000,
                  "UX & Interactive",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="block text-blue-400 bg-gradient-to-r from-blue-600 via-fuchsia-500 to-cyan-500 text-transparent bg-clip-text mt-2"
              />
            </h1>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-lg">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out shadow-md"
              >
                Get a proposal
              </Button>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative w-full h-[200px] md:h-[260px] lg:h-[320px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20943545-CE8NfTg9GBeEIOnIVPadYdmnUJn7Pm.png"
                alt="Digital Marketing Illustration"
                fill
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
