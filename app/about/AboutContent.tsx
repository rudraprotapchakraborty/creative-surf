"use client"
import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & Creative Director",
      bio: "With over 15 years of experience in design and branding, Alex founded Creative Surf with a vision to help brands make meaningful connections.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Sarah Chen",
      role: "Head of Digital Strategy",
      bio: "Sarah brings her expertise in digital marketing and analytics to develop data-driven strategies that deliver measurable results.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Marcus Williams",
      role: "Lead Web Developer",
      bio: "Marcus combines technical expertise with creative problem-solving to build websites that are both beautiful and functional.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Priya Patel",
      role: "Content Strategist",
      bio: "Priya crafts compelling narratives that resonate with audiences and strengthen brand identities across all platforms.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const values = [
    { title: "Creativity", description: "We approach every challenge with fresh thinking and innovative solutions." },
    { title: "Collaboration", description: "We believe the best work happens when diverse perspectives come together." },
    { title: "Excellence", description: "We hold ourselves to the highest standards in everything we do." },
    { title: "Authenticity", description: "We value honesty and transparency in all our relationships." },
    { title: "Growth", description: "We're committed to continuous learning and improvement." },
    { title: "Impact", description: "We measure our success by the results we deliver for our clients." },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-blue-900 via-indigo-900 to-black text-white">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>
        <motion.div
          className="container mx-auto px-6 relative z-10 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">About Creative Surf</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            We're a team of passionate creatives dedicated to helping brands make waves in their industries
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2015, Creative Surf began with a simple mission: to create authentic brand experiences that
              resonate with audiences and drive meaningful results.
            </p>
            <p className="text-gray-700 mb-4">
              What started as a small team of three has grown into a diverse collective of strategists, designers,
              developers, and content creators united by our passion for creative excellence.
            </p>
            <p className="text-gray-700">
              Today, we're proud to partner with brands across industries, from emerging startups to established
              enterprises, helping them navigate the ever-changing digital landscape and connect with their audiences
              in authentic ways.
            </p>
          </motion.div>
          <motion.div
            className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="Creative Surf team"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-bold mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="text-center bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-2xl transition-transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-800 via-indigo-800 to-blue-900 text-white text-center relative overflow-hidden">
        <motion.div
          className="container mx-auto px-6 relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Create Something Amazing Together</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-200">
            Ready to take your brand to the next level? We'd love to hear about your project.
          </p>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-900 font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:bg-blue-100 transition-colors"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </section>
    </main>
  )
}
