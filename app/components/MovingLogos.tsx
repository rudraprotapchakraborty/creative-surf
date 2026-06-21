"use client";

import { motion } from "framer-motion";

const logos = [
  { src: "/waffletime.jpg",  name: "Waffle Time" },
  { src: "/zafenity.jpg",    name: "Zafenity" },
  { src: "/ghuddy.jpg",      name: "Ghuddy" },
  { src: "/namimoon.jpg",    name: "Nami Moon" },
  { src: "/kudos.jpg",       name: "Kudos" },
  { src: "/masalaking.jpg",  name: "Masala King" },
  { src: "/bridgepoint.jpg", name: "Bridge Point" },
  { src: "/beeteam.jpeg",    name: "Bee Team" },
  { src: "/icreation.jpeg",  name: "iCreation" },
  { src: "/hm.jpeg",         name: "HM Production" },
  { src: "/nextgen.png",     name: "NextGen" },
  { src: "/springfield.png", name: "Springfield" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
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
          key={logo.src}
          variants={item}
          className="group conic-ring relative aspect-square rounded-2xl bg-white border border-flow-border shadow-soft flex items-center justify-center p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-aurora"
        >
          <img
            src={logo.src}
            alt={`${logo.name} logo`}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MovingLogos;
