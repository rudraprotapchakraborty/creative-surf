"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

import { caseStudies as ourWorks } from "../case-studies/caseStudiesData";
import WaveBackdrop from "./WaveBackdrop";

const WorkCard = ({ work, idx }: { work: any; idx: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col gap-6 w-full ${idx % 2 !== 0 ? "md:mt-40" : ""}`}
    >
      <Link
        href={work.link}
        className="block overflow-hidden rounded-3xl bg-flow-cardSolid aspect-[4/5] md:aspect-square relative border border-flow-border"
      >
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src={work.image}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
        </motion.div>

        {/* Subtle ocean wash on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-aurora-1/15 via-transparent to-aurora-3/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-flow-text/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />

        {/* Hover badge */}
        <div className="absolute top-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10 pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-aurora-grad flex items-center justify-center text-white shadow-aurora">
            <ArrowUpRight className="w-6 h-6" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title peek */}
        <div className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-10 pointer-events-none">
          <span className="inline-block px-3 py-1 rounded-full glass-strong text-xs font-bold uppercase tracking-[0.15em] text-white">
            View Case Study
          </span>
        </div>
      </Link>

      <div className="px-2">
        <div className="flex flex-wrap gap-2 mb-4">
          {work.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-bold tracking-wide uppercase rounded-full glass border border-flow-border text-aurora-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-3xl lg:text-4xl font-heading font-extrabold mb-3 text-flow-text tracking-tight transition-colors">
          <Link href={work.link} className="hover:text-aurora-1 transition-colors">
            {work.title}
          </Link>
        </h3>
        <p className="text-flow-textSoft font-normal text-lg leading-relaxed">
          {work.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function PortfolioSection() {
  return (
    <section
      id="projects"
      className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-flow-bg text-flow-text overflow-hidden border-t border-flow-border"
    >
      <WaveBackdrop id="port-wave" corner="bl" size="md" opacity={0.5} />

      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-30" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-aurora-1" />
              Featured Work
            </span>
            <h2 className="text-[2.25rem] sm:text-[3rem] md:text-5xl lg:text-[5.5rem] font-heading font-extrabold tracking-[-0.05em] mb-4 leading-[1.0]">
              Selected
              <br className="hidden md:block" />
              <span className="text-aurora-shimmer italic">works.</span>
            </h2>
            <p className="text-flow-textSoft max-w-md font-normal text-lg md:text-xl mt-6">
              A glimpse into our recent collaborations and digital transformations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-flow-border text-flow-text hover:border-aurora-1/50 transition-all font-semibold"
            >
              View All Projects
              <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-24 mt-20">
          {ourWorks.map((work, idx) => (
            <WorkCard key={work.title} work={work} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
