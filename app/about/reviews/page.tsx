import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Star, Quote } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "Client Reviews & Testimonials",
  description:
    "See what our clients have to say about working with Creative Surf. Read testimonials and reviews from businesses we've helped succeed.",
  path: "/about/reviews",
})

// Sample review data - in a real application, this would come from a database or API
const clientReviews = [
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
  {
    name: "Jennifer Lee",
    position: "Marketing Manager",
    company: "HealthTech Solutions",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "Creative Surf's SEO expertise has been invaluable to our company. Within six months of implementing their recommendations, our organic traffic increased by 120% and we saw a significant improvement in our search rankings for key industry terms. Their team is responsive, knowledgeable, and genuinely invested in our success.",
    rating: 5,
    date: "November 5, 2024",
  },
  {
    name: "Robert Martinez",
    position: "Founder",
    company: "Artisan Crafts Co.",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "As a small business owner, I was hesitant to invest in digital marketing, but Creative Surf made the process approachable and affordable. They took the time to understand my unique business needs and created a custom strategy that has helped me reach new customers and grow my business. Their personal touch and attention to detail sets them apart.",
    rating: 5,
    date: "October 18, 2024",
  },
]

// Calculate average rating
const averageRating = clientReviews.reduce((acc, review) => acc + review.rating, 0) / clientReviews.length

export default function ReviewsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-700 font-medium">Reviews</span>
        </div>

        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Client Reviews & Testimonials</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Don't just take our word for it. See what our clients have to say about working with Creative Surf.
          </p>

          {/* Rating Summary */}
          <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-8 w-8 ${i < Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <div className="text-3xl font-bold text-center mb-2">{averageRating.toFixed(1)} out of 5</div>
            <p className="text-gray-600 text-center">Based on {clientReviews.length} client reviews</p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {clientReviews.map((review, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 relative">
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6 bg-blue-600 text-white p-3 rounded-full shadow-lg">
                <Quote className="h-5 w-5" />
              </div>

              {/* Rating */}
              <div className="flex mb-4 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 italic mb-6">"{review.text}"</p>

              {/* Reviewer Info */}
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src={review.avatar || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold">{review.name}</h3>
                  <p className="text-sm text-gray-600">
                    {review.position}, {review.company}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="text-xs text-gray-500 mt-4 text-right">{review.date}</div>
            </div>
          ))}
        </div>

        {/* Industry Recognition */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Industry Recognition</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative h-24 mb-4">
                <Image
                  src="/placeholder.svg?height=100&width=200&text=Award+1"
                  alt="Digital Marketing Excellence Award"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold mb-1">Marketing Excellence</h3>
              <p className="text-sm text-gray-600">2024 Digital Innovation Awards</p>
            </div>
            <div className="text-center">
              <div className="relative h-24 mb-4">
                <Image
                  src="/placeholder.svg?height=100&width=200&text=Award+2"
                  alt="Best SEO Agency"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold mb-1">Best SEO Agency</h3>
              <p className="text-sm text-gray-600">2023 Digital Marketing Awards</p>
            </div>
            <div className="text-center">
              <div className="relative h-24 mb-4">
                <Image
                  src="/placeholder.svg?height=100&width=200&text=Award+3"
                  alt="Top Web Design Firm"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold mb-1">Top Web Design Firm</h3>
              <p className="text-sm text-gray-600">2023 Creative Excellence Awards</p>
            </div>
            <div className="text-center">
              <div className="relative h-24 mb-4">
                <Image
                  src="/placeholder.svg?height=100&width=200&text=Award+4"
                  alt="Best Place to Work"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold mb-1">Best Place to Work</h3>
              <p className="text-sm text-gray-600">2022 Employer Excellence Awards</p>
            </div>
          </div>
        </div>

        {/* Review Platforms */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Find Us On Review Platforms</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="relative h-16 mb-4">
                <Image
                  src="/placeholder.svg?height=60&width=200&text=Google+Reviews"
                  alt="Google Reviews"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">4.9 out of 5 based on 87 reviews</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://google.com" target="_blank" rel="noopener noreferrer">
                  Read Google Reviews
                </Link>
              </Button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="relative h-16 mb-4">
                <Image
                  src="/placeholder.svg?height=60&width=200&text=Clutch"
                  alt="Clutch"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">4.8 out of 5 based on 42 reviews</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://clutch.co" target="_blank" rel="noopener noreferrer">
                  Read Clutch Reviews
                </Link>
              </Button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="relative h-16 mb-4">
                <Image
                  src="/placeholder.svg?height=60&width=200&text=Trustpilot"
                  alt="Trustpilot"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <p className="text-gray-600 mb-4">4.7 out of 5 based on 63 reviews</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://trustpilot.com" target="_blank" rel="noopener noreferrer">
                  Read Trustpilot Reviews
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Results Like These?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Join our growing list of satisfied clients and see how Creative Surf can transform your digital presence.
          </p>
          <Button asChild variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

