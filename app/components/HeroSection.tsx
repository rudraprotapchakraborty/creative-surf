"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    },
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center px-6 pt-32 pb-24 bg-[#06080F] text-white overflow-hidden selection:bg-cyan-500/30">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#06080F] to-[#06080F] pointer-events-none" />
      
      {/* Soft Center Glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center flex flex-col items-center max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8 hidden sm:block">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-cyan-200 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Premium Digital Solutions
            </span>
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants} className="mb-6 space-y-2 md:space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
              Transform Your
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Digital Presence
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl font-light leading-relaxed mb-10">
            We help modern businesses create meaningful connections through fluid design, 
            strong branding, and high-performance digital strategy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium text-lg overflow-hidden transition-transform"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start a Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-lg text-white border border-white/20 hover:border-white/40 backdrop-blur-sm transition-colors"
            >
              View Our Work
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating Abstract Elements */}
        <motion.div
           animate={{ 
             y: [-10, 10, -10],
             rotateZ: [0, 2, 0]
           }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           className="hidden xl:flex absolute left-0 top-1/4 p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl flex-col gap-2"
        >
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 mb-2 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-cyan-400" />
          </div>
          <p className="text-sm font-medium text-white/80">Strategy</p>
          <p className="text-xs text-white/50">Data-driven growth</p>
        </motion.div>

        <motion.div
           animate={{ 
             y: [10, -10, 10],
             rotateZ: [0, -2, 0]
           }}
           transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="hidden xl:flex absolute right-0 top-1/3 p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl flex-col items-end gap-2 text-right"
        >
           <div className="w-12 h-12 rounded-xl bg-purple-500/20 mb-2 flex items-center justify-center">
             <span className="text-purple-400 font-mono font-bold">{"</>"}</span>
           </div>
           <p className="text-sm font-medium text-white/80">Engineering</p>
           <p className="text-xs text-white/50">Scalable & fluid</p>
        </motion.div>

      </div>
    </section>
  );
}
