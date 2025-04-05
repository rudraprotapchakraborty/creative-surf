import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Our Services | Creative Surf",
  description:
    "Explore our comprehensive range of creative and digital marketing services designed to elevate your brand.",
}

export default function ServicesPage() {
  const services = [
    {
      title: "Brand Strategy",
      description:
        "We develop comprehensive brand strategies that define your unique position in the market and connect with your target audience.",
      icon: "/icons/strategy.svg",
    },
    {
      title: "Web Design & Development",
      description:
        "Custom websites that combine stunning visuals with seamless functionality to create memorable digital experiences.",
      icon: "/icons/web-design.svg",
    },
    {
      title: "Digital Marketing",
      description:
        "Data-driven marketing campaigns across multiple channels to increase your visibility and drive conversions.",
      icon: "/icons/digital-marketing.svg",
    },
    {
      title: "Content Creation",
      description: "Engaging content that tells your story and resonates with your audience across all platforms.",
      icon: "/icons/content.svg",
    },
    {
      title: "Social Media Management",
      description: "Strategic social media presence that builds community and strengthens your brand voice.",
      icon: "/icons/social-media.svg",
    },
    {
      title: "SEO Optimization",
      description: "Technical and content optimization to improve your search rankings and drive organic traffic.",
      icon: "/icons/seo.svg",
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Our Services</h1>
            <p className="text-xl text-blue-100 mb-8">
              Comprehensive creative solutions tailored to elevate your brand and achieve your business goals
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Image
                    src={service.icon || "/placeholder.svg?height=40&width=40"}
                    alt={service.title}
                    width={40}
                    height={40}
                    className="text-blue-600"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200"></div>

              {/* Timeline items */}
              {[
                {
                  step: "Discovery",
                  description:
                    "We begin by understanding your business, goals, and target audience to create a strategic foundation.",
                },
                {
                  step: "Strategy",
                  description:
                    "Based on our findings, we develop a tailored strategy that aligns with your objectives and market position.",
                },
                {
                  step: "Creation",
                  description: "Our creative team brings the strategy to life through compelling design and content.",
                },
                {
                  step: "Implementation",
                  description: "We execute the plan across all relevant channels and platforms with precision.",
                },
                {
                  step: "Optimization",
                  description:
                    "Through continuous monitoring and analysis, we refine our approach to maximize results.",
                },
              ].map((item, index) => (
                <div key={index} className="relative mb-12">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:order-1"}`}>
                      <h3 className="text-2xl font-bold mb-2">
                        {index + 1}. {item.step}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    <div className="absolute left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Brand?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's collaborate to create something extraordinary that drives real results for your business.
          </p>
          <button className="bg-white text-blue-900 hover:bg-blue-100 transition-colors duration-300 font-bold py-3 px-8 rounded-full text-lg">
            Get in Touch
          </button>
        </div>
      </section>
    </main>
  )
}

