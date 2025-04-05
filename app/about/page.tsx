import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us | Creative Surf",
  description: "Learn about Creative Surf, our mission, values, and the talented team behind our creative agency.",
}

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

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 to-blue-800 py-16">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">About Creative Surf</h1>
            <p className="text-xl text-blue-100 mb-8">
              We're a team of passionate creatives dedicated to helping brands make waves in their industries
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
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
            </div>
            <div className="md:w-1/2">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Creative Surf team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Creativity",
                description: "We approach every challenge with fresh thinking and innovative solutions.",
              },
              {
                title: "Collaboration",
                description: "We believe the best work happens when diverse perspectives come together.",
              },
              { title: "Excellence", description: "We hold ourselves to the highest standards in everything we do." },
              { title: "Authenticity", description: "We value honesty and transparency in all our relationships." },
              { title: "Growth", description: "We're committed to continuous learning and improvement." },
              { title: "Impact", description: "We measure our success by the results we deliver for our clients." },
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Create Something Amazing Together</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ready to take your brand to the next level? We'd love to hear about your project.
          </p>
          <button className="bg-white text-blue-900 hover:bg-blue-100 transition-colors duration-300 font-bold py-3 px-8 rounded-full text-lg">
            Get in Touch
          </button>
        </div>
      </section>
    </main>
  )
}

