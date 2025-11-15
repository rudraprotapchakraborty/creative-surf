"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "10 SEO Strategies for 2025",
    excerpt: "Next-gen SEO hacks that will dominate the algorithm battlefield.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/blog/seo-strategies-2025",
  },
  {
    title: "The Power of Content Marketing",
    excerpt: "Harness the narrative. Build empires with words & visuals.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/blog/power-of-content-marketing",
  },
  {
    title: "Social Media Trends to Watch",
    excerpt: "Social’s new frontier — immersive, AI-driven, and unfiltered.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/blog/social-media-trends",
  },
  {
    title: "Maximizing ROI with PPC Campaigns",
    excerpt: "AI bidding, intent mapping, and creative rotations to rule PPC.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/blog/maximizing-ppc-roi",
  },
];

const BlogSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [100, -200]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section ref={ref} className="relative min-h-screen py-32 overflow-hidden bg-black text-white">
      {/* Bluish Holographic Grid Background */}
      <motion.div
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,_#00ffff,_transparent_60%)] opacity-20"
        style={{ scale: bgScale }}
      />
      <motion.div className="absolute inset-0 -z-10" style={{ opacity: glowOpacity }}>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(0,255,255,0.08)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </motion.div>

      {/* Floating bluish particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        {/* Bluish Futuristic Title */}
        <motion.h2
          className="text-center text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-20"
          style={{ y: titleY }}
        >
          ✦ Insights from the Future ✦
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {blogPosts.map((post, index) => (
            <TiltCard key={index} {...post} delay={index * 0.15} />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Button
            asChild
            className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-white rounded-full px-8 py-4 text-lg shadow-lg shadow-cyan-500/30 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
          >
            <Link href="/blog" className="flex items-center gap-2">
              Explore All Articles <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

// Tilt Card with full bluish theme and aligned "Read More"
const TiltCard = ({ title, excerpt, image, link, delay }: any) => {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - rect.left - rect.width / 2;
    const yPos = e.clientY - rect.top - rect.height / 2;
    x.set(xPos / 20);
    y.set(-yPos / 20);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX: y, rotateY: x }}
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay }}
      viewport={{ once: true }}
      className="relative group"
    >
      <Card className="bg-white/5 border border-cyan-400/20 backdrop-blur-xl overflow-hidden rounded-3xl shadow-lg hover:shadow-cyan-500/40 transition-shadow duration-500 flex flex-col h-full">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Glow sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
            animate={hovered ? { x: ["-100%", "100%"] } : {}}
            transition={{ duration: 1 }}
          />
          <Image src={image} alt={title} width={400} height={250} className="w-full h-52 object-cover" />
          <div className="p-6 flex flex-col flex-1 justify-between">
            <div>
              <h3 className="text-xl text-white font-bold mb-2">{title}</h3>
              <p className="text-gray-300 text-sm mb-4">{excerpt}</p>
            </div>
            <Link
              href={link}
              className="mt-auto inline-flex items-center text-cyan-400 hover:text-blue-300 font-medium"
            >
              Read More <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogSection;
