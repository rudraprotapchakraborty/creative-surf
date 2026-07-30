import type { Metadata } from "next"
import Image from "next/image"
import { getTranslator } from "@/lib/i18n/server"
import { servicesMessages } from "@/lib/i18n/messages/services"

const SERVICE_ICONS = [
  "/icons/strategy.svg",
  "/icons/web-design.svg",
  "/icons/digital-marketing.svg",
  "/icons/content.svg",
  "/icons/social-media.svg",
  "/icons/seo.svg",
]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(servicesMessages)
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default async function ServicesPage() {
  const t = await getTranslator(servicesMessages)

  const services = t
    .raw<{ title: string; description: string }[]>("items", [])
    .map((service, i) => ({ ...service, icon: SERVICE_ICONS[i] }))

  const process = t.raw<{ step: string; description: string }[]>("process", [])

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{t("hero.title")}</h1>
            <p className="text-xl text-blue-100 mb-8">{t("hero.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-flow-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("offerTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-flow-surface rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl"
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
                <p className="text-flow-textSoft">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-flow-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("processTitle")}</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200"></div>

              {/* Timeline items */}
              {process.map((item, index) => (
                <div key={index} className="relative mb-12">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:order-1"}`}>
                      <h3 className="text-2xl font-bold mb-2">
                        {index + 1}. {item.step}
                      </h3>
                      <p className="text-flow-textSoft">{item.description}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("cta.title")}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{t("cta.body")}</p>
          <button className="bg-white text-blue-900 hover:bg-blue-100 transition-colors duration-300 font-bold py-3 px-8 rounded-full text-lg">
            {t("cta.button")}
          </button>
        </div>
      </section>
    </main>
  )
}
