"use client"

import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react"
import { useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { subscribeToNewsletter } from "@/app/actions"

export function Footer() {
  const [website, setWebsite] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  return (
    <footer className="bg-[#051C2C] text-white overflow-x-hidden">
      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12 border-b border-gray-800">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-12 flex-grow w-full">
            <div className="space-y-1 text-center lg:text-left">
              <div className="text-2xl lg:text-3xl font-bold">24M+</div>
              <div className="text-xs lg:text-sm uppercase tracking-wider">
                LEADS DRIVEN
                <br />
                FOR CLIENTS
              </div>
            </div>
            <div className="space-y-1 text-center lg:text-left">
              <div className="text-2xl lg:text-3xl font-bold">$10M+</div>
              <div className="text-xs lg:text-sm uppercase tracking-wider">
                REVENUE DRIVEN
                <br />
                FOR CLIENTS
              </div>
            </div>
            <div className="space-y-1 text-center lg:text-left">
              <div className="text-2xl lg:text-3xl font-bold">1M+</div>
              <div className="text-xs lg:text-sm uppercase tracking-wider">
                HOURS OF
                <br />
                EXPERTISE
              </div>
            </div>
            <div className="space-y-1 text-center lg:text-left">
              <div className="text-2xl lg:text-3xl font-bold">100+</div>
              <div className="text-xs lg:text-sm uppercase tracking-wider">
                EXPERTS
                <br />
                ON STAFF
              </div>
            </div>
          </div>
          <div className="w-full lg:w-auto bg-blue-600 rounded-xl p-4 sm:p-6">
            <Toaster position="bottom-center" />
            <h3 className="text-xl font-bold mb-4">Discover how we can help your business grow</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const email = formData.get("email") as string

                if (!email) {
                  toast.error("Please enter your email")
                  return
                }

                setIsLoading(true)
                try {
                  await subscribeToNewsletter(email)
                  toast.success("Thanks for subscribing!")
                  setWebsite("")

                  // Redirect to proposal page with email prefilled
                  window.location.href = `/proposal?email=${encodeURIComponent(email)}`
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Something went wrong")
                  setIsLoading(false)
                }
              }}
              className="flex flex-col sm:flex-row gap-2 w-full"
            >
              <Input
                type="text"
                name="email"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Enter your email"
                className="bg-white text-black flex-grow"
                disabled={isLoading}
              />
              <Button type="submit" className="whitespace-nowrap bg-blue-700 hover:bg-blue-800" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Send Me a Proposal!"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo and Contact Section */}
          <div className="lg:col-span-1">
            <Image src="/placeholder.svg" alt="WebFX Logo" width={150} height={50} className="mb-6" />
            <div className="space-y-2">
              <h3 className="font-semibold">Ready to speak with a marketing expert?</h3>
              <p>Give us a ring</p>
              <Link
                href="tel:888-256-9448"
                className="inline-block text-2xl font-bold text-blue-400 hover:text-blue-300"
              >
                888-256-9448
              </Link>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">SERVICES</h3>
            <ul className="space-y-3">
              {services.map((service, index) => {
                // Generate route based on service name
                const route = `/services/${service.toLowerCase().replace(/\s+/g, "-")}`

                return (
                  <li key={index}>
                    <Link href={route} className="text-gray-300 hover:text-white">
                      {service}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Knowledge Base Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">KNOWLEDGEBASE</h3>
            <ul className="space-y-3">
              {knowledgebase.map((item, index) => (
                <li key={index}>
                  <Link href={item.link} className="text-gray-300 hover:text-white">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">EXPLORE</h3>
            <ul className="space-y-3">
              {explore.map((item, index) => (
                <li key={index}>
                  <Link href={item.link} className="text-gray-300 hover:text-white">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left flex-wrap">
            <div>
              <p className="text-sm">PROUDLY BROUGHT TO YOU BY CREATIVE SURF</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="text-sm">
                <span className="text-gray-400">© Creative Surf 2019-{new Date().getFullYear()}</span>
                <Link href="/sitemap" className="ml-4 text-gray-300 hover:text-white">
                  Sitemap
                </Link>
                <Link href="/privacy-terms" className="ml-4 text-gray-300 hover:text-white">
                  Privacy & Terms of Use
                </Link>
              </div>
              <div className="flex gap-4 justify-center md:justify-start mt-4 sm:mt-0">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Facebook size={20} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Twitter size={20} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Linkedin size={20} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Youtube size={20} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Instagram size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const services = [
  "Digital Marketing Services",
  "SEO Services",
  "PPC Services",
  "Content Marketing Services",
  "Social Media Services",
  "Web Design Services",
  "Digital Advertising Services",
]

const knowledgebase = [
  { title: "Digital Marketing", link: "#" },
  { title: "SEO", link: "#" },
  { title: "PPC", link: "#" },
  { title: "Content Marketing", link: "#" },
  { title: "Social Media", link: "#" },
  { title: "Web Design", link: "#" },
  { title: "Blog", link: "/blog" },
]

const explore = [
  { title: "Digital Marketing Trends", link: "#" },
  { title: "Generative Engine Optimization", link: "#" },
  { title: "Case Studies", link: "/case-studies" },
  { title: "SEO in Digital Marketing", link: "#" },
  { title: "SEO vs. SEM", link: "#" },
  { title: "Return on Ad Spend", link: "#" },
  { title: "Contact Us", link: "/contact" },
]

