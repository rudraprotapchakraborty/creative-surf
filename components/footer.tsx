"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Linkedin, Instagram, ArrowUpRight, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="relative w-full bg-[#06080F] text-white pt-32 pb-12 overflow-hidden border-t border-white/[0.05]">
      
      {/* Soft Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          
          {/* Main CTA & Brand */}
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-medium tracking-tight mb-6"
            >
              Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Unreal.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-gray-400 text-lg font-light mb-10 max-w-md"
            >
              Combining creativity, strategy, and technology to shape the future of your brand.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link
                href="mailto:contact@creativesurf.agency"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-medium text-black bg-white hover:bg-gray-200 transition-colors"
              >
                Start a Project <ArrowUpRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-6 lg:items-end w-full lg:w-auto mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-4 text-gray-300 font-light"
            >
              <a href="mailto:contact@creativesurf.agency" className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                <Mail className="w-5 h-5 text-gray-500" />
                contact@creativesurf.agency
              </a>
              <a href="https://wa.me/8801988467099" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                <Phone className="w-5 h-5 text-gray-500" />
                +880 1988-467099
              </a>
            </motion.div>

            {/* Social Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 grid grid-cols-3 gap-4 w-full"
            >
              <a href="https://www.linkedin.com/company/creative-surf-agency/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all group">
                <Linkedin size={24} strokeWidth={1.5} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </a>
              <a href="https://www.instagram.com/creative.surf.agency/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all group">
                <Instagram size={24} strokeWidth={1.5} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </a>
              <a href="https://www.facebook.com/creative.surf.agency/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all group">
                <Facebook size={24} strokeWidth={1.5} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </a>
            </motion.div>
          </div>

        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-8 border-t border-white/[0.05] flex justify-center items-center"
        >
          <p className="text-sm text-gray-500 font-light text-center">
            © {new Date().getFullYear()} Creative Surf. All Rights Reserved.
          </p>
        </motion.div>

      </div>
    </footer>
  );
}
