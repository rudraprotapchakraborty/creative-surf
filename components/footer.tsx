"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Linkedin, Instagram, ArrowUpRight, Mail, Phone } from "lucide-react";
import MouseParticles from "./MouseParticles";

export function Footer() {
  return (
    <footer id="contact" className="relative w-full bg-flow-card text-flow-text pt-32 pb-12 overflow-hidden border-t border-flow-border">
      <MouseParticles />
      
      {/* Soft Background Accent */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#7DD3FC]/20 blur-[120px] rounded-full pointer-events-none translate-x-1/4 translate-y-1/4" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          
          {/* Main CTA & Brand */}
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-[-0.04em] mb-6 leading-[1.05]"
            >
              Let's Build Something <span className="text-flow-green">Unreal.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-flow-text/70 text-lg font-normal mb-10 max-w-md"
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
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-sm text-lg font-semibold text-white bg-flow-green hover:bg-flow-buttonHover transition-colors shadow-sm"
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
              className="flex flex-col gap-4 text-flow-text/80 font-semibold"
            >
              <a href="mailto:contact@creativesurf.agency" className="flex items-center gap-3 hover:text-flow-green transition-colors">
                <Mail className="w-5 h-5 text-flow-green" />
                contact@creativesurf.agency
              </a>
              <a href="https://wa.me/8801988467099" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-flow-green transition-colors">
                <Phone className="w-5 h-5 text-flow-green" />
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
              <a href="https://www.linkedin.com/company/creative-surf-agency/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 rounded-sm bg-flow-bg border border-flow-border hover:bg-flow-card hover:border-flow-text/20 hover:shadow-sm transition-all group">
                <Linkedin size={24} strokeWidth={2} className="text-flow-text/60 group-hover:text-flow-green transition-colors" />
              </a>
              <a href="https://www.instagram.com/creative.surf.agency/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 rounded-sm bg-flow-bg border border-flow-border hover:bg-flow-card hover:border-flow-text/20 hover:shadow-sm transition-all group">
                <Instagram size={24} strokeWidth={2} className="text-flow-text/60 group-hover:text-flow-green transition-colors" />
              </a>
              <a href="https://www.facebook.com/creative.surf.agency/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 rounded-sm bg-flow-bg border border-flow-border hover:bg-flow-card hover:border-flow-text/20 hover:shadow-sm transition-all group">
                <Facebook size={24} strokeWidth={2} className="text-flow-text/60 group-hover:text-flow-green transition-colors" />
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
          className="pt-8 border-t border-flow-border flex justify-center items-center"
        >
          <p className="text-sm text-flow-text/50 font-medium text-center">
            © {new Date().getFullYear()} Creative Surf. All Rights Reserved.
          </p>
        </motion.div>

      </div>
    </footer>
  );
}
