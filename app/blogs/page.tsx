"use client";

import { motion } from "framer-motion";

export default function BlogsPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-flow-bg text-flow-text px-6"
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-lg"
      >
        <span className="inline-flex items-center gap-2 mb-8">
          <span className="w-5 h-[2px]" style={{ background: "rgb(var(--accent-1))" }} />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.3em]"
            style={{ color: "rgb(var(--accent-1))" }}
          >
            Creative Surf · Blogs
          </span>
        </span>

        <h1
          className="font-bold leading-tight mb-5"
          style={{ fontSize: "clamp(2rem, 3.8vw, 3.8rem)" }}
        >
          Coming
          <br />
          <span style={{ color: "rgb(var(--accent-1))" }}>Soon.</span>
        </h1>

        <p className="text-flow-textSoft text-base leading-relaxed">
          We're working on something great. Check back soon for insights,
          case studies, and stories from the Creative Surf team.
        </p>
      </motion.div>
    </main>
  );
}
