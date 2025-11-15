"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll-based transforms
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center text-center text-white min-h-screen overflow-hidden bg-black"
    >
      {/* Aurora Gradient Mist */}
      <motion.div
        className="absolute inset-0 -z-40"
        animate={{
          background: [
            "radial-gradient(circle at 25% 20%, rgba(0,255,255,0.25), transparent 70%), radial-gradient(circle at 75% 80%, rgba(0,255,255,0.15), transparent 70%)",
            "radial-gradient(circle at 30% 30%, rgba(0,200,255,0.25), transparent 70%), radial-gradient(circle at 70% 70%, rgba(0,180,255,0.15), transparent 70%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        style={{ opacity: bgOpacity }}
      />

      {/* Star Particles Layer */}
      <motion.div
        className="absolute inset-0 -z-30"
        animate={{ backgroundPosition: ["0px 0px", "300px 300px"] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(white 1px, transparent 1px), radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "140px 140px, 220px 220px",
          backgroundPosition: "0px 0px, 70px 70px",
          opacity: 0.35,
        }}
      />

      {/* Rotating Rings */}
      <motion.div
        className="absolute -z-20 w-[1400px] h-[1400px] rounded-full border border-cyan-400/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -z-20 w-[1000px] h-[1000px] rounded-full border border-cyan-300/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-5xl px-6"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-tight tracking-tight mb-6"
        >
          <span className="block bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,255,255,0.6)]">
            Powering the Future with
          </span>
          <TypeAnimation
            sequence={[
              "Next-Level Innovation",
              2000,
              "Intelligent Automation",
              2000,
              "Immersive Design",
              2000,
            ]}
            wrapper="span"
            speed={45}
            repeat={Infinity}
            className="block mt-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent font-semibold drop-shadow-[0_0_20px_rgba(0,255,255,0.6)]"
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
        >
          Experience a new era of technology with adaptive strategies,
          human-centered design, and AI-powered creativity.
        </motion.p>

        {/* Futuristic Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <Button className="relative rounded-full backdrop-blur-md bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 px-8 py-3 text-lg font-semibold shadow-[0_0_35px_rgba(0,255,255,0.7)] hover:shadow-[0_0_55px_rgba(0,255,255,0.9)] transition-all duration-300 hover:-translate-y-1 active:scale-95 overflow-hidden">
            <span className="relative z-10">Get Started</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </Button>

          <Button
            variant="outline"
            className="rounded-full bg-transparent border-2 border-cyan-400/70 text-cyan-300 px-8 py-3 text-lg font-semibold hover:bg-cyan-400 hover:text-white shadow-[0_0_25px_rgba(0,255,255,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            Explore More
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-gray-400 text-sm mb-3">Scroll to Discover</span>
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center shadow-[0_0_10px_rgba(0,255,255,0.6)]">
          <motion.div
            className="w-2 h-2 bg-cyan-400 rounded-full mt-2 shadow-[0_0_6px_rgba(0,255,255,0.6)]"
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
