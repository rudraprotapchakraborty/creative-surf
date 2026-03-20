"use client";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function ContactContent() {
  return (
    <main className="min-h-screen bg-flow-bg text-flow-text pt-32 pb-24 px-6 overflow-hidden">
      
      {/* Background blobs for aesthetic */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-flow-green/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-flow-text/5 blur-[100px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/4" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-left mb-20 max-w-3xl"
        >
          <h1 className="text-[3rem] sm:text-[4.5rem] md:text-6xl lg:text-[6.5rem] font-heading font-extrabold tracking-[-0.04em] mb-6 leading-[1.05]">
            Let's build <br className="hidden md:block"/>something great.
          </h1>
          <p className="text-xl text-flow-text/70 font-normal">
            Have a bold idea? We're ready to bring it to life with creativity, technology, and sheer innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 bg-flow-card border border-flow-border rounded-sm p-8 md:p-12 shadow-sm"
          >
            <h2 className="text-3xl font-heading font-extrabold mb-8 tracking-tight">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold text-flow-text/80">Name</label>
                  <Input 
                    id="name" 
                    placeholder="Jane Doe" 
                    className="h-12 bg-flow-bg border-flow-border text-flow-text focus-visible:ring-flow-green/20"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-flow-text/80">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="jane@example.com" 
                    className="h-12 bg-flow-bg border-flow-border text-flow-text focus-visible:ring-flow-green/20"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-semibold text-flow-text/80">Subject</label>
                <Input 
                  id="subject" 
                  placeholder="How can we help you?" 
                  className="h-12 bg-flow-bg border-flow-border text-flow-text focus-visible:ring-flow-green/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-flow-text/80">Message</label>
                <textarea 
                  id="message" 
                  rows={6}
                  placeholder="Tell us about your project..."
                  className="w-full rounded-sm px-4 py-3 bg-flow-bg border border-flow-border text-flow-text placeholder:text-flow-text/50 focus:outline-none focus:ring-2 focus:ring-flow-green/20 resize-none transition-all shadow-sm"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full md:w-auto px-10 h-12 rounded-sm bg-flow-green text-white hover:bg-flow-buttonHover font-semibold transition-colors shadow-sm text-base mt-4"
              >
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-8"
          >
            <div className="bg-flow-card border border-flow-border rounded-sm p-8 shadow-sm">
              <h3 className="text-xl font-heading font-extrabold mb-6 tracking-tight">Contact Info</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-flow-bg border border-flow-border flex-shrink-0">
                    <MapPin className="w-5 h-5 text-flow-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-flow-text mb-1">Address</h4>
                    <p className="text-flow-text/70 text-sm leading-relaxed">Dhaka<br/>Bangladesh</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-flow-bg border border-flow-border flex-shrink-0">
                    <Mail className="w-5 h-5 text-flow-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-flow-text mb-1">Email</h4>
                    <p className="text-flow-text/70 text-sm leading-relaxed">contact@creativesurf.agency</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-flow-bg border border-flow-border flex-shrink-0">
                    <Phone className="w-5 h-5 text-flow-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-flow-text mb-1">Phone</h4>
                    <p className="text-flow-text/70 text-sm leading-relaxed">+880 1988-467099</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-flow-bg border border-flow-border flex-shrink-0">
                    <Clock className="w-5 h-5 text-flow-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-flow-text mb-1">Hours</h4>
                    <p className="text-flow-text/70 text-sm leading-relaxed">Mon–Fri: 9am – 6pm<br/>Sat–Sun: Closed</p>
                  </div>
                </div>

              </div>
            </div>
            
          </motion.div>

        </div>
      </div>
    </main>
  );
}
