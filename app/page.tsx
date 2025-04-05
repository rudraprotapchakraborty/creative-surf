"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  BarChart2,
  LineChart,
  PenTool,
  DollarSign,
  ArrowRight,
  Search,
  Target,
  FileText,
  Video,
  Globe,
  Tv,
  Users,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Star,
  Quote,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { TypeAnimation } from "react-type-animation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"

const services = [
  {
    title: "Graphics Design",
    description:
      "Professional design services for print and digital media including logos, branding materials, and marketing collateral",
    icon: PenTool,
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
  {
    title: "Content Marketing",
    description: "Strategic content creation and distribution to attract and engage your target audience",
    icon: FileText,
    gradient: "bg-gradient-to-br from-orange-400 to-amber-600",
  },
  {
    title: "Video Editing",
    description: "Professional video production and post-production services for marketing and promotional content",
    icon: Video,
    gradient: "bg-gradient-to-br from-yellow-400 to-amber-600",
  },
  {
    title: "Website Development",
    description: "Custom website design and development using the latest technologies and best practices",
    icon: Globe,
    gradient: "bg-gradient-to-br from-pink-400 to-purple-600",
  },
  {
    title: "OVC/TVC",
    description: "Online and television commercial production to showcase your brand across multiple channels",
    icon: Tv,
    gradient: "bg-gradient-to-br from-purple-500 to-indigo-700",
  },
  {
    title: "SEO and Social Media Marketing",
    description: "Improve visibility in search engines and build engagement across social platforms",
    icon: Search,
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
  },
  {
    title: "Media Buying",
    description: "Strategic ad placement and campaign management to maximize your marketing ROI",
    icon: Target,
    gradient: "bg-gradient-to-br from-green-400 to-emerald-600",
  },
  {
    title: "Digital Branding",
    description: "Comprehensive brand strategy and identity development for the digital landscape",
    icon: Users,
    gradient: "bg-gradient-to-br from-teal-400 to-emerald-600",
  },
]

const metrics = [
  { value: "100%", label: "Client Satisfaction" },
  { value: "$500M+", label: "Revenue Generated" },
  { value: "30%", label: "Average Growth" },
  { value: "10", label: "Years Experience" },
]

const teamMembers = [
  {
    image: "/placeholder.svg",
    bgColor: "bg-[#FEF9C3]", // Yellow pastel
  },
  {
    image: "/placeholder.svg",
    bgColor: "bg-[#DCF5E6]", // Green pastel
  },
  {
    image: "/placeholder.svg",
    bgColor: "bg-[#D5F5F6]", // Mint pastel
  },
  {
    image: "/placeholder.svg",
    bgColor: "bg-[#DBEAFE]", // Blue pastel
  },
  {
    image: "/placeholder.svg",
    bgColor: "bg-[#FCE7F3]", // Pink pastel
  },
]

const blogPosts = [
  {
    title: "10 SEO Strategies for 2025",
    excerpt: "Stay ahead of the curve with these cutting-edge SEO techniques for the coming year.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/blog/seo-strategies-2025",
  },
  {
    title: "The Power of Content Marketing",
    excerpt: "Discover how content marketing can transform your business and boost your online presence.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/blog/power-of-content-marketing",
  },
  {
    title: "Social Media Trends to Watch",
    excerpt: "Learn about the latest social media trends that are shaping digital marketing strategies.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/blog/social-media-trends",
  },
  {
    title: "Maximizing ROI with PPC Campaigns",
    excerpt: "Explore effective strategies to improve your pay-per-click campaigns and increase ROI.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/blog/maximizing-ppc-roi",
  },
]

const companyLogos = [
  { src: "/placeholder.svg", alt: "Microsoft" },
  { src: "/placeholder.svg", alt: "Google" },
  { src: "/placeholder.svg", alt: "Amazon" },
  { src: "/placeholder.svg", alt: "Apple" },
  { src: "/placeholder.svg", alt: "Netflix" },
  { src: "/placeholder.svg", alt: "Meta" },
  { src: "/placeholder.svg", alt: "IBM" },
  { src: "/placeholder.svg", alt: "Oracle" },
  { src: "/placeholder.svg", alt: "Salesforce" },
  { src: "/placeholder.svg", alt: "Adobe" },
]

const ourWorks = [
  {
    title: "Global E-commerce Redesign",
    description: "Complete overhaul of an international e-commerce platform resulting in 43% increase in conversions",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["E-commerce", "UX Design", "Frontend Development"],
    link: "/case-studies/ecommerce-redesign",
  },
  {
    title: "Luxury Brand Social Campaign",
    description: "Integrated social media campaign for a luxury fashion brand that increased engagement by 78%",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["Social Media", "Content Creation", "Brand Strategy"],
    link: "/case-studies/luxury-social-campaign",
  },
  {
    title: "SaaS Marketing Website",
    description: "Modern, conversion-focused website for a B2B SaaS company that doubled qualified lead generation",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["Web Development", "SEO", "Lead Generation"],
    link: "/case-studies/saas-marketing-website",
  },
  {
    title: "Mobile App Launch Campaign",
    description:
      "Comprehensive marketing strategy for a fintech app launch that achieved 100,000+ downloads in first month",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["App Marketing", "Digital Advertising", "Content Strategy"],
    link: "/case-studies/fintech-app-launch",
  },
]

const reviews = [
  {
    name: "Sarah Johnson",
    position: "Marketing Director",
    company: "TechVision Inc.",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "Working with Creative Surf transformed our digital presence completely. Their strategic approach to our marketing challenges delivered measurable results within just three months. Our conversion rates increased by 45% and our social media engagement doubled.",
    rating: 5,
    date: "March 15, 2025",
  },
  {
    name: "Michael Chen",
    position: "CEO",
    company: "Innovate Solutions",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "As a startup founder, I needed an agency that could handle all aspects of our marketing while I focused on product development. Creative Surf exceeded my expectations in every way. They developed our brand identity, built our website, and executed a launch campaign that got us featured in major industry publications. Their work directly contributed to our successful Series A funding.",
    rating: 5,
    date: "February 3, 2025",
  },
  {
    name: "Emily Rodriguez",
    position: "E-commerce Manager",
    company: "StyleHouse Boutique",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "Our online sales have increased by 78% since we started working with Creative Surf. Their understanding of e-commerce trends and consumer behavior is exceptional. The product photography and social media campaigns they created for our seasonal collection launch were stunning and highly effective. They're always one step ahead with innovative ideas.",
    rating: 5,
    date: "January 22, 2025",
  },
  {
    name: "David Wilson",
    position: "Operations Director",
    company: "Global Logistics Partners",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "In a B2B industry like ours, finding an agency that understands the nuances of our market was challenging until we found Creative Surf. They revamped our lead generation strategy and created content that actually resonates with our target clients. Their data-driven approach and regular reporting make it easy to see the ROI on our marketing spend.",
    rating: 4,
    date: "December 10, 2024",
  },
]

function AccordionImage({ activeItem }) {
  const images = {
    "actionable-analytics": "/placeholder.svg?text=Actionable+Analytics",
    "data-empowerment": "/placeholder.svg?text=Data+Empowerment",
    "content-marketing": "/placeholder.svg?text=Content+Marketing",
    "sales-enablement": "/placeholder.svg?text=Sales+Enablement",
  }

  return (
    <div className="relative h-[400px] bg-gray-200 rounded-lg overflow-hidden">
      <Image src={images[activeItem] || "/placeholder.svg"} alt={activeItem} layout="fill" objectFit="cover" />
    </div>
  )
}

export default function Page() {
  const isMobile = useMobile()
  const [activeItem, setActiveItem] = React.useState("actionable-analytics")
  const [currentWorkIndex, setCurrentWorkIndex] = React.useState(0)
  const [currentReviewIndex, setCurrentReviewIndex] = React.useState(0)
  const maxWorkIndex = ourWorks.length - 1
  const maxReviewIndex = reviews.length - 1

  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const statsRef = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [countValues, setCountValues] = useState({
    clientSatisfaction: 0,
    revenue: 0,
    growth: 0,
    years: 0,
  })

  const nextWork = () => {
    setCurrentWorkIndex((prev) => (prev === maxWorkIndex ? 0 : prev + 1))
  }

  const prevWork = () => {
    setCurrentWorkIndex((prev) => (prev === 0 ? maxWorkIndex : prev - 1))
  }

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev === maxReviewIndex ? 0 : prev + 1))
  }

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev === 0 ? maxReviewIndex : prev - 1))
  }

  // Auto-advance carousel every 5 seconds
  React.useEffect(() => {
    const workTimer = setInterval(() => {
      nextWork()
    }, 5000)

    return () => clearInterval(workTimer)
  }, [])

  // Auto-advance reviews every 7 seconds
  React.useEffect(() => {
    const reviewTimer = setInterval(() => {
      nextReview()
    }, 7000)

    return () => clearInterval(reviewTimer)
  }, [])

  // Animation for statistics
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)

          // Client Satisfaction: 0% -> 100% (2 seconds)
          let clientSatisfaction = 0
          const clientInterval = setInterval(() => {
            clientSatisfaction += 5
            setCountValues((prev) => ({ ...prev, clientSatisfaction }))
            if (clientSatisfaction >= 100) clearInterval(clientInterval)
          }, 100)

          // Revenue: $0M -> $500M (2 seconds)
          let revenue = 0
          const revenueInterval = setInterval(() => {
            revenue += 25
            setCountValues((prev) => ({ ...prev, revenue }))
            if (revenue >= 500) clearInterval(revenueInterval)
          }, 100)

          // Growth: 0% -> 30% (2 seconds)
          let growth = 0
          const growthInterval = setInterval(() => {
            growth += 1.5
            setCountValues((prev) => ({ ...prev, growth }))
            if (growth >= 30) clearInterval(growthInterval)
          }, 100)

          // Years: 0 -> 10 (2 seconds)
          let years = 0
          const yearsInterval = setInterval(() => {
            years += 0.5
            setCountValues((prev) => ({ ...prev, years: Math.floor(years) }))
            if (years >= 10) clearInterval(yearsInterval)
          }, 100)
        }
      },
      { threshold: 0.3 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [hasAnimated])

  // Conditional wrapper for motion components
  const MotionWrapper = ({ children, ...props }) => {
    if (isMobile) {
      return <div {...props}>{children}</div>
    }
    return <motion.div {...props}>{children}</motion.div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-white to-blue-100 text-gray-800 py-8 relative overflow-hidden min-h-[300px] md:min-h-[350px] lg:min-h-[400px]">
        <div className="absolute inset-0 z-0 bg-dot-pattern"></div>
        <div className="container mx-auto px-6 py-6 md:py-12 mb-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
                <span className="block bg-gradient-to-r from-blue-500 via-fuchsia-500 to-cyan-500 text-transparent bg-clip-text mb-2 leading-relaxed text-nowrap">
                  Unlock Revenue Growth By
                </span>
                <TypeAnimation
                  sequence={["Digital Marketing", 2000, "SEO & Lead Generation", 2000, "UX & Interactive", 2000]}
                  wrapper="span"
                  speed={50}
                  repeat={Number.POSITIVE_INFINITY}
                  className="block text-blue-400 bg-gradient-to-r from-blue-500 via-fuchsia-500 to-cyan-500 text-transparent bg-clip-text leading-relaxed"
                />
              </h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                <Button
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Get a proposal
                </Button>
              </div>
            </div>

            <div className="w-full md:w-1/2 h-full flex items-center justify-center">
              <div className="relative w-full h-[180px] md:h-[240px] lg:h-[280px]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20943545-CE8NfTg9GBeEIOnIVPadYdmnUJn7Pm.png"
                  alt="Digital Marketing Illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services We Provide */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <MotionWrapper
            className="text-4xl md:text-5xl font-bold mb-12"
            initial={!isMobile ? { opacity: 0, y: -20 } : undefined}
            whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
            transition={!isMobile ? { duration: 0.5 } : undefined}
            viewport={!isMobile ? { once: true } : undefined}
          >
            Services We <span className="text-blue-600">Provide</span>
          </MotionWrapper>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative h-64 rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className={`absolute inset-0 ${service.gradient} opacity-90 transition-all duration-300`}></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></div>
                <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center">
                  <div className="text-white mb-4 transform transition-transform duration-300 group-hover:scale-110">
                    <service.icon className="h-12 w-12" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-white transition-all duration-300 group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-sm flex-grow transition-all duration-300 group-hover:text-white">
                    {service.description}
                  </p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent opacity-0 group-hover:opacity-100 group-hover:border-white/30 rounded-xl transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Uncover The Impact of Marketing on Revenue</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12" ref={statsRef}>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{countValues.clientSatisfaction}%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">${countValues.revenue}M+</div>
              <div className="text-gray-600">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{countValues.growth}%</div>
              <div className="text-gray-600">Average Growth</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{countValues.years}</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <Accordion type="single" collapsible className="w-full" defaultValue="actionable-analytics">
              <AccordionItem
                value="actionable-analytics"
                onOpenChange={(isOpen) => isOpen && setActiveItem("actionable-analytics")}
              >
                <AccordionTrigger className="text-left text-xl font-semibold">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <BarChart2 className="h-6 w-6 text-blue-600" />
                    </div>
                    Actionable Analytics
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 mt-2">
                    Our actionable analytics provide deep insights into your marketing performance, allowing you to make
                    data-driven decisions that boost your ROI and drive growth.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="data-empowerment"
                onOpenChange={(isOpen) => isOpen && setActiveItem("data-empowerment")}
              >
                <AccordionTrigger className="text-left text-xl font-semibold">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <LineChart className="h-6 w-6 text-blue-600" />
                    </div>
                    Data Empowerment
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 mt-2">
                    Empower your team with comprehensive data insights, enabling you to identify trends, optimize
                    campaigns, and stay ahead of the competition.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="content-marketing"
                onOpenChange={(isOpen) => isOpen && setActiveItem("content-marketing")}
              >
                <AccordionTrigger className="text-left text-xl font-semibold">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <PenTool className="h-6 w-6 text-blue-600" />
                    </div>
                    Content Marketing
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 mt-2">
                    Our content marketing strategies help you create and distribute valuable, relevant content that
                    attracts and engages your target audience, driving conversions and building brand loyalty.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="sales-enablement"
                onOpenChange={(isOpen) => isOpen && setActiveItem("sales-enablement")}
              >
                <AccordionTrigger className="text-left text-xl font-semibold">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <DollarSign className="h-6 w-6 text-blue-600" />
                    </div>
                    Sales Enablement
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 mt-2">
                    Align your marketing and sales efforts with our sales enablement tools, providing your team with the
                    resources they need to close deals more effectively and drive revenue growth.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <AccordionImage activeItem={activeItem} />
          </div>
        </div>
      </section>

      {/* Company Logo Marquee */}
      <section className="py-16 overflow-hidden bg-gray-50">
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Trusted by <span className="text-blue-600">Industry Leaders</span>
          </h2>
        </div>

        <div className="logo-marquee-container group">
          <div className="logo-marquee">
            {companyLogos.map((logo, index) => (
              <div key={`primary-${index}`} className="mx-8 flex items-center justify-center h-20 w-40">
                <Image
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  width={160}
                  height={80}
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
            {companyLogos.map((logo, index) => (
              <div key={`duplicate-${index}`} className="mx-8 flex items-center justify-center h-20 w-40">
                <Image
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  width={160}
                  height={80}
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .logo-marquee-container {
            position: relative;
            width: 100%;
            overflow: hidden;
          }
          
          .logo-marquee {
            display: flex;
            width: fit-content;
            animation: scroll 30s linear infinite;
          }
          
          .group:hover .logo-marquee {
            animation-play-state: paused;
          }
          
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </section>

      {/* Monthly Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <MotionWrapper
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            initial={!isMobile ? { opacity: 0, y: -20 } : undefined}
            whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
            transition={!isMobile ? { duration: 0.5 } : undefined}
            viewport={!isMobile ? { once: true } : undefined}
          >
            Our Monthly <span className="text-blue-600">Pricing</span>
          </MotionWrapper>
          <MotionWrapper
            className="text-xl text-gray-600 text-center mb-12"
            initial={!isMobile ? { opacity: 0, y: 20 } : undefined}
            whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
            transition={!isMobile ? { duration: 0.5, delay: 0.2 } : undefined}
            viewport={!isMobile ? { once: true } : undefined}
          >
            Choose the perfect plan for your business needs
          </MotionWrapper>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Basic Plan */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-white border border-gray-200 rounded-2xl shadow-lg p-8 transition-transform duration-500 hover:-translate-y-1 flex flex-col h-full">
                <div className="text-center mb-8">
                  <h3 className="inline-block bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-full px-6 py-2 text-xl font-semibold mb-4">
                    Basic
                  </h3>
                  <div className="text-4xl font-bold mb-2">
                    $390<span className="text-lg text-gray-600">/mo</span>
                  </div>
                  <p className="text-gray-600">Perfect for small businesses</p>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Business Development
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Campaign Marketing
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Creative Visual Content (Up to 7)
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Series Content (Product/Service)
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Animated Motion Video/GIF
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Social Media Management
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Media Buying on Demand
                    </li>
                  </ul>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Standard Plan */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-white border-2 border-blue-600 rounded-2xl shadow-xl p-8 transition-transform duration-500 hover:-translate-y-1 flex flex-col h-full">
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
                  POPULAR
                </div>
                <div className="text-center mb-8">
                  <h3 className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-6 py-2 text-xl font-semibold mb-4">
                    Standard
                  </h3>
                  <div className="text-4xl font-bold mb-2">
                    $490<span className="text-lg text-gray-600">/mo</span>
                  </div>
                  <p className="text-gray-600">Best for growing companies</p>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Business Development
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Campaign Marketing
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Product Photography
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Creative Visual Content (Up to 10)
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Series Content (Product/Service)
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Animated Motion Video/GIF
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Social Media Management
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Copyright Content with SEO
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Media Buying on Demand ($50 free)
                    </li>
                  </ul>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-white border border-gray-200 rounded-2xl shadow-lg p-8 transition-transform duration-500 hover:-translate-y-1 flex flex-col h-full">
                <div className="text-center mb-8">
                  <h3 className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-6 py-2 text-xl font-semibold mb-4">
                    Premium
                  </h3>
                  <div className="text-4xl font-bold mb-2">
                    $650<span className="text-lg text-gray-600">/mo</span>
                  </div>
                  <p className="text-gray-600">For enterprise businesses</p>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Business Development
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Campaign Marketing
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Product Photography
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Creative Visual Content (Up to 15)
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Series Content (Product/Service)
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Website Development
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Animated Motion Video
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Social Media Management
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Copyright Content with SEO
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Media Buying on Demand ($100 free)
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                      Content Writing (Up to 5)
                    </li>
                  </ul>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Works Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <MotionWrapper
            initial={!isMobile ? { opacity: 0, y: 30 } : undefined}
            whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
            transition={!isMobile ? { duration: 0.5 } : undefined}
            viewport={!isMobile ? { once: true } : undefined}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Our <span className="text-blue-600">Works</span>
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              Explore our portfolio of successful projects and creative solutions
            </p>
          </MotionWrapper>

          <div className="relative max-w-6xl mx-auto">
            {/* Carousel Navigation */}
            <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
              <button
                onClick={prevWork}
                className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Previous work"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>

            <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
              <button
                onClick={nextWork}
                className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Next work"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Carousel Content */}
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentWorkIndex * 100}%)` }}
              >
                {ourWorks.map((work, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="relative">
                      <div className="relative aspect-[16/9] w-full">
                        <Image src={work.image || "/placeholder.svg"} alt={work.title} fill className="object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
                        <div className="max-w-3xl">
                          <h3 className="text-3xl font-bold mb-2">{work.title}</h3>
                          <p className="text-lg text-gray-200 mb-4">{work.description}</p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {work.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="bg-blue-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Button
                            asChild
                            variant="outline"
                            className="border-white bg-white text-black hover:bg-white hover:text-blue-600 transition-colors duration-300"
                          >
                            <Link href={work.link} className="flex items-center gap-2">
                              View Project <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {ourWorks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentWorkIndex(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    currentWorkIndex === index ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-gray-600">Industry Awards</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why People Love Us Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 pt-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why People <span className="text-blue-600">Love Us</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear what our clients have to say about their experience working with Creative Surf and the results we've
              delivered for their businesses.
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            {/* Review Navigation */}
            <div className="absolute top-1/2 left-0 md:-left-12 lg:-left-16 z-10 transform -translate-y-1/2">
              <button
                onClick={prevReview}
                className="bg-white hover:bg-gray-100 text-gray-800 p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>

            <div className="absolute top-1/2 right-0 md:-right-12 lg:-right-16 z-10 transform -translate-y-1/2">
              <button
                onClick={nextReview}
                className="bg-white hover:bg-gray-100 text-gray-800 p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>

            {/* Reviews Carousel */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
              >
                {reviews.map((review, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="mx-auto max-w-4xl">
                      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 pt-14 mt-8 relative">
                        {/* Quote Icon */}
                        <div className="absolute -top-8 left-6 bg-blue-600 text-white p-4 rounded-full shadow-lg">
                          <Quote className="h-6 w-6" />
                        </div>

                        {/* Star Rating */}
                        <div className="flex mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-6 w-6 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="ml-2 text-gray-600 font-medium">{review.rating}.0</span>
                        </div>

                        {/* Review Content */}
                        <div className="min-h-[150px]">
                          <p className="text-xl text-gray-700 italic mb-8 leading-relaxed">"{review.text}"</p>
                        </div>

                        {/* Reviewer Info */}
                        <div className="flex items-center">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-600">
                            <Image
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{review.name}</h4>
                            <div className="text-blue-600">{review.position}</div>
                            <div className="text-gray-500 text-sm">{review.company}</div>
                          </div>
                        </div>

                        {/* Review Metadata */}
                        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
                          <div>Verified Client</div>
                          <div>{review.date}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReviewIndex(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    currentReviewIndex === index ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400",
                  )}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Review Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">97%</div>
              <div className="text-gray-600">Repeat Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">48hrs</div>
              <div className="text-gray-600">Response Time</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
              <Link href="/proposal">Join Our Happy Clients</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Meet Creative Surf Section */}
      <section className="bg-[#F8FAFC] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Team Images */}
            <div className="flex justify-center -space-x-4 mb-8">
              {teamMembers.map((member, index) => (
                <div key={index} className={`relative rounded-full w-24 h-24 border-4 border-white ${member.bgColor}`}>
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt=""
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1E293B]">Meet Creative Surf</h2>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-[#1E293B] mb-12">
              Your world-class, tech-enabled marketing agency with over{" "}
              <span className="text-blue-600 border-b-4 border-blue-600">3 million</span> hours of combined expertise.
            </p>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!email.trim()) return

                setIsSubmitting(true)
                // Redirect to proposal page with email prefilled
                router.push(`/proposal?email=${encodeURIComponent(email)}`)
              }}
              className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow text-base sm:text-lg h-12"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-base sm:text-lg h-12 px-4 sm:px-8"
              >
                {isSubmitting ? (
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
                  "Get a free proposal"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Read from our blog</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link href={post.link} className="text-blue-600 hover:underline">
                    Read more
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/blog">
                Read more articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

