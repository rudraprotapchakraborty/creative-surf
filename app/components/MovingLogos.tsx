"use client";

import { motion, Variants } from "framer-motion";

type Logo = {
  name: string;
  src?: string;
};

const logos: Logo[] = [
  { src: "/bridgepoint.jpg", name: "Bridge Point" },
  { src: "/beeteam.jpeg", name: "Bee Team" },
  { src: "/icreation.jpeg", name: "iCreation" },
  { src: "/hm.jpeg", name: "HM Production" },
  { src: "/nextgen.png", name: "NextGen Development Properties" },
  { src: "/springfield.png", name: "Springfield" },
  { src: "/wedvisa.png", name: "Wedvisa" },
  { src: "/channel_i.png", name: "Channel I" },
  { src: "/apex-footwear-ltd--600.png", name: "Apex Footwear Ltd" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const MovingLogos = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="mx-auto max-w-5xl px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-5"
    >
      {logos.map((logo) => (
        <motion.div
          key={logo.name}
          variants={item}
          className="group conic-ring relative aspect-square rounded-2xl bg-white border border-flow-border shadow-soft flex items-center justify-center p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-aurora"
        >
          {logo.src ? (
            <img
              src={logo.src}
              alt={`${logo.name} logo`}
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="text-center text-xs sm:text-sm font-semibold text-flow-text leading-snug px-1 transition-transform duration-300 group-hover:scale-105">
              {logo.name}
            </span>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MovingLogos;
