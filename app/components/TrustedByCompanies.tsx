"use client";

import React, { useRef, useEffect, useState } from "react";
import MovingLogos from "./MovingLogos";
import { motion, useScroll, useTransform } from "framer-motion";

// Simple seeded random number generator
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Generate particles with a fixed seed for consistency
const seed = 12345; // Fixed seed for deterministic random values
const random = mulberry32(seed);
const particles = Array.from({ length: 25 }, () => ({
  left: `${random() * 100}%`,
  top: `${random() * 100}%`,
  dx: (random() - 0.5) * 100,
  dy: (random() - 0.5) * 100,
  duration: 6 + random() * 4,
  size: random() > 0.5 ? "w-1 h-1" : "w-2 h-2",
  color: random() > 0.5 ? "bg-white/80" : "bg-cyan-400/70 blur-[1px]",
}));

const TrustedByCompanies: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scroll effects
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 0.8]);
  const headingY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const headingExit = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

  // Mouse parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set isClient to true and windowWidth after mounting
    setIsClient(true);
    setWindowWidth(window.innerWidth);

    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative z-10 w-full py-28 bg-black overflow-hidden"
    >
      {/* Layered Animated Background */}
      <motion.div
        className="absolute inset-0 -z-30"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(56,189,248,0.25) 0%, transparent 70%), radial-gradient(circle at 80% 70%, rgba(56,240,255,0.25) 0%, transparent 70%)",
          opacity: bgOpacity,
        }}
      />
      <motion.div
        className="absolute inset-0 -z-20"
        animate={{ backgroundPosition: ["0px 0px", "300px 300px"] }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(white 1px, transparent 1px), radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "120px 120px, 200px 200px",
          backgroundPosition: "0px 0px, 60px 60px",
          opacity: 0.2,
        }}
      />

      {/* Rotating Glow Rings */}
      <motion.div
        className="absolute -z-10 w-[1000px] h-[1000px] rounded-full border border-cyan-500/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -z-10 w-[1300px] h-[1300px] rounded-full border border-cyan-400/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: -360 }}
        transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Particle Field */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${p.size} ${p.color}`}
          style={{ left: p.left, top: p.top }}
          animate={{ x: [0, p.dx], y: [0, p.dy], opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Mouse spotlight glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100 + 50}% ${
            mousePos.y * 100 + 50
          }%, rgba(56,189,248,0.15), transparent 40%)`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">
        {/* Heading */}
        <motion.h2
          style={{ y: headingY, opacity: headingOpacity, scale: headingExit }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="px-4 text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 text-transparent bg-clip-text tracking-tight drop-shadow-2xl animate-gradient"
        >
          Trusted by{" "}
          <span className="text-cyan-300 drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]">
            50+
          </span>{" "}
          Global Brands
        </motion.h2>

        {/* Logos with Parallax Tilt */}
        <motion.div
          className="mt-14"
          style={{
            transform: isClient
              ? `perspective(1000px) rotateX(${
                  windowWidth > 640 ? mousePos.y * 10 : 0
                }deg) rotateY(${windowWidth > 640 ? mousePos.x * 10 : 0}deg)`
              : "perspective(1000px) rotateX(0deg) rotateY(0deg)", // Match initial client render
          }}
        >
          <MovingLogos />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-8 px-4 text-lg sm:text-xl text-gray-300 max-w-3xl tracking-wide font-medium"
        >
          We collaborate with forward-thinking companies shaping the next era of
          innovation.
        </motion.p>
      </div>
    </section>
  );
};

export default TrustedByCompanies;