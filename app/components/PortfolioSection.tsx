"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ourWorks = [
  {
    title: "Global E-commerce Redesign",
    description: "Complete overhaul resulting in 43% conversion increase.",
    image: "/placeholder.svg?height=800&width=1200",
    tags: ["E-commerce", "UX Design"],
    link: "/case-studies/ecommerce-redesign",
  },
  {
    title: "Luxury Brand Campaign",
    description: "Integrated social campaign increasing engagement by 78%.",
    image: "/placeholder.svg?height=800&width=1200",
    tags: ["Social Media", "Strategy"],
    link: "/case-studies/luxury-social-campaign",
  },
  {
    title: "SaaS Marketing Website",
    description: "Conversion-focused site doubling qualified leads.",
    image: "/placeholder.svg?height=800&width=1200",
    tags: ["Web Dev", "Lead Gen"],
    link: "/case-studies/saas-marketing-website",
  },
  {
    title: "Fintech App Launch",
    description: "Strategy achieving 100k+ downloads in one month.",
    image: "/placeholder.svg?height=800&width=1200",
    tags: ["App Marketing", "Ads"],
    link: "/case-studies/fintech-app-launch",
  },
];

export default function PortfolioSection() {
  return (
    <section id="projects" className="relative py-32 bg-[#06080F] text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-4">
              Selected 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"> Works.</span>
            </h2>
            <p className="text-gray-400 max-w-md font-light text-lg">
              A glimpse into our recent collaborations and digital transformations.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
             <Link href="/case-studies" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
               View All Projects <ArrowUpRight className="w-4 h-4" />
             </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {ourWorks.map((work, idx) => (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="group relative flex flex-col gap-6"
            >
              <Link href={work.link} className="block overflow-hidden rounded-[2rem] bg-white/5 aspect-video relative border border-white/5">
                <Image 
                  src={work.image} 
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Overlay Badge */}
                <div className="absolute top-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                   <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-xl">
                      <ArrowUpRight className="w-5 h-5" />
                   </div>
                </div>
              </Link>
              
              <div className="px-2">
                <div className="flex gap-2 mb-3">
                  {work.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-white/[0.03] border border-white/10 text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-medium mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                  <Link href={work.link}>{work.title}</Link>
                </h3>
                <p className="text-gray-400 font-light">
                  {work.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
