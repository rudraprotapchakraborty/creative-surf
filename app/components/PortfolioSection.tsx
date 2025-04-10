import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Utility to conditionally apply classes

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
];

const PortfolioSection = () => {
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0);

  const prevWork = () => {
    setCurrentWorkIndex((prev) => (prev === 0 ? ourWorks.length - 1 : prev - 1));
  };

  const nextWork = () => {
    setCurrentWorkIndex((prev) => (prev === ourWorks.length - 1 ? 0 : prev + 1));
  };

  // Define MotionWrapper component for mobile and desktop handling
  const MotionWrapper = ({ children, ...props }) => {
    return <motion.div {...props}>{children}</motion.div>;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <MotionWrapper
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
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
                      <Image
                        src={work.image || "/placeholder.svg"}
                        alt={work.title}
                        fill
                        className="object-cover"
                      />
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
                  currentWorkIndex === index ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"
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
  );
};

export default PortfolioSection;
