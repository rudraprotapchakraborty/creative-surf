import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Users, Heart, GraduationCap, Clock, MapPin } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "Career Opportunities at Creative Surf",
  description:
    "Explore exciting career opportunities at Creative Surf. Join our team of digital marketing experts and help shape the future of digital innovation.",
  path: "/about/careers",
})

// Sample job openings - in a real application, this would come from a database or API
const jobOpenings = [
  {
    title: "Senior SEO Specialist",
    department: "Digital Marketing",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    description:
      "We're looking for an experienced SEO specialist to develop and implement comprehensive SEO strategies for our clients across various industries.",
    requirements: [
      "5+ years of experience in SEO",
      "Strong analytical skills and experience with SEO tools",
      "Knowledge of technical SEO, on-page optimization, and link building",
      "Experience with Google Analytics and Google Search Console",
      "Excellent communication and client management skills",
    ],
  },
  {
    title: "Web Developer",
    department: "UX & Interactive",
    location: "Remote",
    type: "Full-time",
    description:
      "Join our development team to create responsive, user-friendly websites and web applications for our clients using the latest technologies.",
    requirements: [
      "3+ years of experience in web development",
      "Proficiency in HTML, CSS, JavaScript, and React",
      "Experience with Next.js and other modern frameworks",
      "Understanding of UI/UX principles",
      "Strong problem-solving skills and attention to detail",
    ],
  },
  {
    title: "Social Media Manager",
    department: "Content Marketing",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    description:
      "We're seeking a creative and strategic social media manager to develop and execute social media campaigns for our diverse client base.",
    requirements: [
      "3+ years of experience in social media management",
      "Experience with social media advertising and analytics",
      "Strong content creation and copywriting skills",
      "Knowledge of social media trends and best practices",
      "Excellent organizational and time management skills",
    ],
  },
  {
    title: "Digital Marketing Intern",
    department: "Digital Marketing",
    location: "San Francisco, CA (On-site)",
    type: "Internship (3-6 months)",
    description:
      "Gain hands-on experience in digital marketing while working alongside our team of experts on real client projects.",
    requirements: [
      "Currently pursuing a degree in Marketing, Communications, or related field",
      "Basic understanding of digital marketing concepts",
      "Strong written and verbal communication skills",
      "Eagerness to learn and grow in the digital marketing field",
      "Proficiency in Microsoft Office and Google Workspace",
    ],
  },
]

// Benefits information
const benefits = [
  {
    icon: Heart,
    title: "Comprehensive Health Benefits",
    description:
      "Medical, dental, and vision coverage for you and your dependents, with company contributions to premiums.",
  },
  {
    icon: Clock,
    title: "Flexible Work Arrangements",
    description: "Hybrid work options, flexible hours, and generous PTO policy to help you maintain work-life balance.",
  },
  {
    icon: GraduationCap,
    title: "Professional Development",
    description: "Ongoing training, conference attendance, certification support, and education reimbursement.",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description:
      "Work with a diverse team of experts in a supportive environment that values creativity and innovation.",
  },
]

// Employee testimonials
const testimonials = [
  {
    name: "Alex Chen",
    position: "Senior SEO Specialist",
    years: "4 years at Creative Surf",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "Working at Creative Surf has been the highlight of my career. The collaborative environment, challenging projects, and opportunities for growth have helped me develop both professionally and personally.",
  },
  {
    name: "Sarah Johnson",
    position: "Web Developer",
    years: "2 years at Creative Surf",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "I love the culture at Creative Surf. We're encouraged to experiment with new technologies and approaches, and there's a real emphasis on continuous learning and professional development.",
  },
  {
    name: "Michael Rodriguez",
    position: "Content Marketing Manager",
    years: "3 years at Creative Surf",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "The work-life balance at Creative Surf is unmatched. The flexible work arrangements allow me to be productive while still having time for my personal life and family.",
  },
]

export default function CareersPage() {
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
          <span className="text-gray-700 font-medium">Career</span>
        </div>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
              <p className="text-xl text-gray-600 mb-6">
                At Creative Surf, we're building a team of passionate, creative, and innovative professionals who are
                dedicated to delivering exceptional results for our clients.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                If you're looking for a dynamic work environment where your ideas are valued and your career can
                flourish, we'd love to hear from you.
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="#current-openings">View Current Openings</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=800&width=600&text=Team+Collaboration"
                alt="Creative Surf Team Collaboration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Culture Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Culture</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Company+Culture"
                alt="Creative Surf Company Culture"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">What Makes Us Different</h3>
              <p className="text-gray-600 mb-4">
                At Creative Surf, we believe that our people are our greatest asset. We've built a culture that values
                creativity, collaboration, and continuous learning. We're committed to creating an inclusive environment
                where diverse perspectives are welcomed and celebrated.
              </p>
              <p className="text-gray-600 mb-4">
                Our team members are encouraged to think outside the box, take ownership of their work, and contribute
                to the company's growth and success. We believe in maintaining a healthy work-life balance and providing
                the support and resources our team needs to thrive.
              </p>
              <div className="flex items-center text-blue-600">
                <Users className="h-5 w-5 mr-2" />
                <span className="font-medium">Join a team that values your unique perspective and talents</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Benefits & Perks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-xl font-bold mb-3">Additional Perks</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-1 rounded-full mr-2 mt-1">
                  <ChevronRight className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-gray-700">401(k) with company match</span>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-1 rounded-full mr-2 mt-1">
                  <ChevronRight className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-gray-700">Paid parental leave</span>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-1 rounded-full mr-2 mt-1">
                  <ChevronRight className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-gray-700">Wellness program</span>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-1 rounded-full mr-2 mt-1">
                  <ChevronRight className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-gray-700">Company-sponsored events</span>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-1 rounded-full mr-2 mt-1">
                  <ChevronRight className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-gray-700">Remote work options</span>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-1 rounded-full mr-2 mt-1">
                  <ChevronRight className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-gray-700">Professional development budget</span>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                    <p className="text-xs text-blue-600">{testimonial.years}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Openings Section */}
        <div id="current-openings" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 text-center">Current Openings</h2>
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <p className="text-blue-600">{job.department}</p>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0">
                    <div className="flex items-center mr-4">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600">{job.location}</span>
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {job.type}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {job.requirements.map((req, reqIndex) => (
                      <li key={reqIndex}>{req}</li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="w-full md:w-auto">
                  <Link href={`/about/careers/${job.title.toLowerCase().replace(/\s+/g, "-")}`}>Apply Now</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Application Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Application</h3>
              <p className="text-gray-600">
                Submit your resume and cover letter through our online application system.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Initial Interview</h3>
              <p className="text-gray-600">
                A phone or video interview with our HR team to discuss your experience and goals.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Skills Assessment</h3>
              <p className="text-gray-600">
                Complete a skills assessment or project relevant to the position you're applying for.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Final Interview</h3>
              <p className="text-gray-600">
                Meet with the team you'll be working with to ensure a good fit for both parties.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See the Right Fit?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. Send us your resume, and we'll keep you in
            mind for future opportunities.
          </p>
          <Button asChild variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/contact?subject=Career Inquiry">Send Us Your Resume</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

