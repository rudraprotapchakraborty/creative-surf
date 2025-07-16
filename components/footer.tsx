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
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  return (
    <footer className="bg-[#051C2C] text-white overflow-x-hidden select-none">
      {/* Stats Section */}
      <div className="container mx-auto px-6 py-14 border-b border-gray-800">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 w-full max-w-5xl">
            {[
              { value: "24M+", label: "LEADS DRIVEN FOR CLIENTS" },
              { value: "$10M+", label: "REVENUE DRIVEN FOR CLIENTS" },
              { value: "1M+", label: "HOURS OF EXPERTISE" },
              { value: "100+", label: "EXPERTS ON STAFF" },
            ].map(({ value, label }, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center lg:items-start text-center lg:text-left animate-fade-in"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="text-3xl font-extrabold tracking-tight">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-gray-400 leading-snug">
                  {label.split(" ").map((word, i) => (
                    <span key={i}>
                      {word}
                      {i !== label.split(" ").length - 1 ? " " : ""}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-[380px] bg-cyan-700 bg-opacity-90 rounded-2xl p-6 shadow-lg backdrop-blur-sm transition hover:bg-cyan-600 duration-300">
            <Toaster position="bottom-center" />
            <h3 className="text-xl font-semibold mb-5 tracking-wide">Discover how we can help your business grow</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                if (!email.trim()) {
                  toast.error("Please enter your email")
                  return
                }

                setIsLoading(true)
                try {
                  await subscribeToNewsletter(email.trim())
                  toast.success("Thanks for subscribing!")
                  setEmail("")
                  window.location.href = `/proposal?email=${encodeURIComponent(email.trim())}`
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Something went wrong")
                  setIsLoading(false)
                }
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-white text-gray-900 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 flex-grow transition"
                disabled={isLoading}
                required
                aria-label="Email"
              />
              <Button
                type="submit"
                className="whitespace-nowrap bg-cyan-900 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-400 rounded-lg transition flex items-center justify-center"
                disabled={isLoading}
                aria-live="polite"
              >
                {isLoading ? (
                  <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-5 w-5 mr-2"></div>
                ) : null}
                {isLoading ? "Processing..." : "Send Me a Proposal!"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo and Contact Section */}
          <div className="space-y-6">
            <Image
              src="/logo.png"
              alt="logo"
              width={150}
              height={50}
              className="opacity-90 hover:opacity-100 transition"
              priority
            />
            <div>
              <h3 className="font-semibold text-lg mb-1">Ready to speak with a marketing expert?</h3>
              <p className="text-gray-300 mb-2">Give us a ring</p>
              <Link
                href="tel:888-256-9448"
                className="text-cyan-400 font-bold text-2xl hover:text-cyan-300 transition"
              >
                888-256-9448
              </Link>
            </div>
          </div>

          {/* Services Column */}
          <FooterColumn title="SERVICES" items={services.map((s) => ({ title: s, link: `/services/${s.toLowerCase().replace(/\s+/g, "-")}` }))} />

          {/* Knowledge Base Column */}
          <FooterColumn title="KNOWLEDGEBASE" items={knowledgebase} />

          {/* Explore Column */}
          <FooterColumn title="EXPLORE" items={explore} />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-8 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-gray-400 text-sm select-text">PROUDLY BROUGHT TO YOU BY CREATIVE SURF</p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 text-gray-400 text-sm select-text">
            <span>© Creative Surf 2019-{new Date().getFullYear()}</span>
            <Link href="/sitemap" className="hover:text-white transition">Sitemap</Link>
            <Link href="/privacy-terms" className="hover:text-white transition">Privacy & Terms of Use</Link>
          </div>

          <div className="flex gap-6 justify-center md:justify-start mt-3 md:mt-0 text-gray-400">
            {[Facebook, Twitter, Linkedin, Youtube, Instagram].map((Icon, i) => (
              <Link href="#" key={i} className="hover:text-white transition">
                <Icon size={22} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .loader {
          border-top-color: #1e40af; /* cyan-900 */
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease forwards;
        }
      `}</style>
    </footer>
  )
}

function FooterColumn({
  title,
  items,
}: {
  title: string
  items: { title: string; link: string }[]
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-6 tracking-wide">{title}</h3>
      <ul className="space-y-4">
        {items.map(({ title, link }, i) => (
          <li key={i}>
            <Link
              href={link}
              className="text-gray-300 hover:text-white transition duration-200 ease-in-out"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
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
