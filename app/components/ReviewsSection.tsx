import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink, Star, Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Utility to conditionally apply classes

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
];

const ReviewsSection = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
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
                  currentReviewIndex === index ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"
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
  );
};

export default ReviewsSection;
