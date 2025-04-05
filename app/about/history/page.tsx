import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "CreativeSurf History",
  description:
    "Learn about the journey and milestones of CreativeSurf from its founding to becoming a leading digital marketing agency.",
  path: "/about/history",
})

export default function HistoryPage() {
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
          <span className="text-gray-700 font-medium">CreativeSurf History</span>
        </div>

        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Our Journey</h1>
          <p className="text-xl text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            From a small team of passionate marketers to a leading digital marketing agency, discover the story behind
            CreativeSurf.
          </p>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=800&width=1600&text=CreativeSurf+History"
              alt="CreativeSurf History"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Timeline</h2>

          <div className="space-y-16">
            {/* 2019 - Founding */}
            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="bg-blue-600 text-white text-2xl font-bold rounded-lg p-4 text-center">2019</div>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-2xl font-bold mb-3">The Beginning</h3>
                <p className="text-gray-600 mb-4">
                  CreativeSurf was founded by a small team of digital marketing experts with a vision to help businesses
                  navigate the complex digital landscape. Starting with just 5 team members in a small office, we began
                  offering SEO and content marketing services to local businesses.
                </p>
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=800&text=Founding+Team"
                    alt="CreativeSurf Founding"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 2020 - Growth */}
            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="bg-blue-600 text-white text-2xl font-bold rounded-lg p-4 text-center">2020</div>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-2xl font-bold mb-3">Expansion & Innovation</h3>
                <p className="text-gray-600 mb-4">
                  Despite the global challenges, 2020 was a year of growth for CreativeSurf. We expanded our service
                  offerings to include web design and social media marketing. Our team doubled in size, and we moved to
                  a larger office space to accommodate our growing team.
                </p>
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=800&text=Growth+Phase"
                    alt="CreativeSurf Growth"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 2021 - Recognition */}
            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="bg-blue-600 text-white text-2xl font-bold rounded-lg p-4 text-center">2021</div>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-2xl font-bold mb-3">Industry Recognition</h3>
                <p className="text-gray-600 mb-4">
                  Our commitment to excellence was recognized as we won our first industry awards for outstanding
                  digital marketing campaigns. We launched our proprietary analytics platform, helping clients gain
                  deeper insights into their marketing performance.
                </p>
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=800&text=Award+Winning"
                    alt="CreativeSurf Awards"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 2022 - National Expansion */}
            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="bg-blue-600 text-white text-2xl font-bold rounded-lg p-4 text-center">2022</div>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-2xl font-bold mb-3">National Expansion</h3>
                <p className="text-gray-600 mb-4">
                  CreativeSurf expanded its reach nationally, opening offices in three major cities. We launched our
                  digital marketing academy, providing training and resources to help businesses and professionals
                  enhance their digital marketing skills.
                </p>
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=800&text=National+Expansion"
                    alt="CreativeSurf National Expansion"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 2023 - International Growth */}
            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="bg-blue-600 text-white text-2xl font-bold rounded-lg p-4 text-center">2023</div>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-2xl font-bold mb-3">International Growth</h3>
                <p className="text-gray-600 mb-4">
                  We took our first steps into international markets, establishing partnerships with agencies in Europe
                  and Asia. Our team grew to over 100 experts, and we introduced advanced AI-powered marketing solutions
                  to our service offerings.
                </p>
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=800&text=International+Growth"
                    alt="CreativeSurf International Growth"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 2024 - Present */}
            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="bg-blue-600 text-white text-2xl font-bold rounded-lg p-4 text-center">2024</div>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-2xl font-bold mb-3">Innovation & Future Focus</h3>
                <p className="text-gray-600 mb-4">
                  Today, CreativeSurf continues to innovate and lead in the digital marketing space. We've launched our
                  sustainability initiative, committed to reducing our environmental impact and helping clients develop
                  sustainable marketing practices. With a focus on emerging technologies like AI and the metaverse,
                  we're preparing our clients for the future of digital marketing.
                </p>
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=800&text=Present+Day"
                    alt="CreativeSurf Today"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Enduring Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3 text-blue-600">Innovation</h3>
              <p className="text-gray-600">
                From day one, we've been committed to staying at the forefront of digital marketing trends and
                technologies. This spirit of innovation continues to drive us forward.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3 text-blue-600">Client Success</h3>
              <p className="text-gray-600">
                Our clients' success has always been our primary measure of achievement. We're proud to have helped
                hundreds of businesses grow and thrive in the digital landscape.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3 text-blue-600">Community</h3>
              <p className="text-gray-600">
                We believe in giving back to the communities we serve. Throughout our history, we've maintained a
                commitment to community involvement and social responsibility.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Be Part of Our Future</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Join us as we continue to write the next chapters of the CreativeSurf story. Whether as a client, partner,
            or team member, there's a place for you in our journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-blue-700">
              <Link href="/about/careers">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

