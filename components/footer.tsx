"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";

function FloatingShape({ position, color }: { position: [number, number, number]; color: string }) {
  const mesh = useRef<any>();
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.getElapsedTime() / 2;
      mesh.current.rotation.y = clock.getElapsedTime() / 3;
      mesh.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.05);
    }
  });
  return (
    <mesh ref={mesh} position={position}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.15} emissive={color} emissiveIntensity={0.2} />
    </mesh>
  );
}

export function Footer() {
  return (
    <footer className="relative w-full h-[700px] text-white overflow-hidden">
      {/* 3D Background */}
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade />
        <FloatingShape position={[-3, 1, -5]} color="#06b6d4" />
        <FloatingShape position={[3, -1, -6]} color="#d946ef" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl z-10 flex flex-col items-center justify-center text-center px-6">
        {/* Aurora Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-500/20"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent 
          bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 drop-shadow-[0_0_15px_#00f6ff]"
        >
          Let’s Build Something Unreal
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 text-lg text-gray-300 max-w-2xl"
        >
          Combining creativity, strategy, and technology to shape the future of your brand.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 relative"
        >
          <Link
            href="/contact"
            className="relative px-8 py-4 rounded-full text-lg font-semibold text-white 
            bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 
            shadow-[0_0_20px_rgba(0,200,255,0.6)] overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
            {/* shimmer sweep */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </Link>
        </motion.div>

        {/* Social Icons */}
        <div className="flex gap-8 mt-10">
          {[Facebook, Twitter, Linkedin, Youtube, Instagram].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ y: -4, scale: 1.2 }}
              className="relative text-gray-300 hover:text-cyan-400 transition drop-shadow-[0_0_6px_#00eaff]"
            >
              <Icon size={26} />
              {/* underline wave */}
              <motion.span
                className="absolute left-0 right-0 -bottom-2 h-[2px] bg-gradient-to-r from-sky-400 to-cyan-500 rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="w-40 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mt-10"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        />

        {/* Bottom Text */}
        <p className="mt-6 text-sm text-gray-400">
          © {new Date().getFullYear()} Creative Surf. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
