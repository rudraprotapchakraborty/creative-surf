"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function ContactContent() {
  const ref = useRef(null)
  const { scrollY } = useScroll({ container: ref })

  const yBackground = useTransform(scrollY, [0, 500], [0, 200])
  const yParticles = useTransform(scrollY, [0, 500], [0, -150])
  const yText = useTransform(scrollY, [0, 300], [0, -80])

  return (
    <main
      ref={ref}
      className="flex flex-col min-h-screen bg-gray-950 text-white overflow-hidden"
    >
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Gradient background */}
        <motion.div
          style={{ y: yBackground }}
          className="absolute inset-0 bg-gradient-to-b from-blue-900 via-indigo-900 to-gray-950"
        />

        {/* Animated particles */}
        <motion.div
          style={{ y: yParticles }}
          className="absolute inset-0 overflow-hidden"
        >
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [-20, -200],
                x: [0, (Math.random() - 0.5) * 300],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>

        {/* Hero text */}
        <motion.div
          style={{ y: yText }}
          className="relative z-10 text-center px-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg"
          >
            Let’s Connect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-xl mt-6 text-gray-200 max-w-2xl mx-auto"
          >
            Have a bold idea? We're ready to bring it to life with creativity,
            technology, and innovation.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 shadow-lg border border-white/10"
          >
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-cyan-400">Address</h3>
                <p>
                  Dhaka
                  <br />
                  Bangladesh
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-cyan-400">Email</h3>
                <p>contact@creativesurfagency.com</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-cyan-400">Phone</h3>
                <p>+880 1988-467099</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-cyan-400">Hours</h3>
                <p>
                  Mon–Fri: 9am – 6pm
                  <br />
                  Sat–Sun: Closed
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:col-span-2 backdrop-blur-lg bg-white/5 rounded-2xl p-8 shadow-lg border border-white/10"
          >
            <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="subject" className="text-sm mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message" className="text-sm mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-cyan-500/50 transition"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
