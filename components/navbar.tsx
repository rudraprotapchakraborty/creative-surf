"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import LoadingBar from "react-top-loading-bar";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [stars, setStars] = React.useState<{ left: number; top: number }[]>([]);
  const [mounted, setMounted] = React.useState(false);

  const router = useRouter();
  const scrollY = useMotionValue(0);
  const navHeight = useTransform(scrollY, [0, 150], ["80px", "64px"]);

  React.useEffect(() => {
    setMounted(true);

    const s = Array.from({ length: 12 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
    setStars(s);

    const onScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  const menuItems = [
    { title: "Services", href: "/services" },
    { title: "About", href: "/about" },
    { title: "Blog", href: "/blog" },
  ];

  return (
    <>
      <LoadingBar
        color="#00e6ff"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      {/* FIX 1 — ADD pointer-events-none AND isolate */}
      <motion.header
        style={{ height: navHeight }}
        className="
          fixed top-4 left-1/2 -translate-x-1/2 
          z-[1000] w-[92%] 
          pointer-events-none 
          isolate
        "
      >
        {/* FIX 2 — pointer-events-auto on real nav */}
        <motion.nav
          className="
            relative px-8 py-3 flex justify-between items-center 
            rounded-full border border-cyan-400/20 
            bg-gradient-to-r from-cyan-900/20 via-blue-900/10 to-purple-900/20 
            backdrop-blur-2xl shadow-[0_0_40px_rgba(0,200,255,0.25)]
            pointer-events-auto
            overflow-visible
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* FIX 3 — ALL background layers MUST BE pointer-events-none */}
          <motion.div
            className="
              absolute inset-0 pointer-events-none 
              bg-[radial-gradient(circle_at_top_left,rgba(0,255,255,0.15),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(100,0,255,0.15),transparent_60%)]
            "
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div className="absolute inset-0 pointer-events-none">
            {stars.map((s, i) => (
              <motion.div
                key={i}
                className="absolute w-[2px] h-[2px] bg-cyan-300 rounded-full shadow-[0_0_6px_#00f6ff]"
                style={{ left: `${s.left}%`, top: `${s.top}%` }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 3,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </motion.div>

          {/* Logo */}
          <Link href="/" className="pointer-events-auto">
            <motion.img
              src="/logo.png"
              alt="Logo"
              className="w-12 h-12 drop-shadow-[0_0_12px_#00eaff]"
              whileHover={{ scale: 1.15, rotate: 8 }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 relative z-10 pointer-events-auto">
            {menuItems.map((item) => (
              <motion.button
                key={item.title}
                onClick={() => router.push(item.href)}
                className="relative text-white font-medium tracking-wide text-lg group"
                whileHover={{ scale: 1.15, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.title}
                <motion.span
                  className="absolute left-0 bottom-[-6px] h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            asChild
            className="hidden md:block rounded-full px-6 py-2 text-lg font-semibold bg-gradient-to-r 
                from-sky-400 via-cyan-500 to-blue-600 text-white shadow-[0_0_25px_rgba(0,255,255,0.5)]
                pointer-events-auto"
          >
            <Link href="/contact">Get Started</Link>
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-white z-10 pointer-events-auto"
          >
            <Menu size={30} />
          </button>
        </motion.nav>

        {/* Mobile Menu — unchanged */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-3xl flex flex-col items-center justify-center space-y-8 z-[2000] pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                className="absolute top-6 right-6 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={36} />
              </button>

              {menuItems.map((item, i) => (
                <motion.button
                  key={item.title}
                  onClick={() => router.push(item.href)}
                  className="text-white text-3xl font-bold hover:text-cyan-400"
                >
                  {item.title}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
