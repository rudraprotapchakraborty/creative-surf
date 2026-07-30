"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { useT } from "@/lib/i18n"
import { aboutMessages } from "@/lib/i18n/messages/about"

/** Names and photos are fixed; roles and bios come from the dictionary. */
const TEAM_META = [
  { name: "Alex Johnson", image: "/placeholder.svg?height=300&width=300" },
  { name: "Sarah Chen", image: "/placeholder.svg?height=300&width=300" },
  { name: "Marcus Williams", image: "/placeholder.svg?height=300&width=300" },
  { name: "Priya Patel", image: "/placeholder.svg?height=300&width=300" },
]

export default function AboutPage() {
  const t = useT(aboutMessages)

  const teamMembers = TEAM_META.map((member, i) => ({
    ...member,
    role: t(`team.members.${i}.role`),
    bio: t(`team.members.${i}.bio`),
  }))

  const values = t.raw<{ title: string; description: string }[]>("values.items", [])

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
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">{t("hero.title")}</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-flow-surface">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">{t("story.title")}</h2>
            <p className="text-flow-textSoft mb-4">{t("story.p1")}</p>
            <p className="text-flow-textSoft mb-4">{t("story.p2")}</p>
            <p className="text-flow-textSoft">{t("story.p3")}</p>
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
              alt={t("story.imageAlt")}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-flow-bg">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-bold mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t("values.title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-flow-surface p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-flow-textSoft">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-flow-surface">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t("team.title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="text-center bg-flow-bg p-6 rounded-2xl shadow-md hover:shadow-2xl transition-transform hover:-translate-y-2"
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
                <p className="text-flow-textSoft text-sm">{member.bio}</p>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("cta.title")}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-200">
            {t("cta.body")}
          </p>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-900 font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:bg-blue-100 transition-colors"
          >
            {t("cta.button")}
          </motion.button>
        </motion.div>
      </section>
    </main>
  )
}
