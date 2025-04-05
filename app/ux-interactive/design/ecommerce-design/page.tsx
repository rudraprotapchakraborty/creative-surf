import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, ShoppingCart, Palette, Code, BarChart, CreditCard, Users } from "lucide-react"

export default function EcommerceDesignPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Ecommerce Website Design That Converts</h1>
              <p className="text-xl mb-8">
                Transform your online store with custom ecommerce design that drives sales, enhances user experience,
                and builds brand loyalty.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                  <Link href="/proposal">Get a Free Proposal</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
                  <Link href="/portfolio">View Our Portfolio</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Ecommerce Website Design"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <p className="text-3xl md:text-4xl font-bold text-blue-600">35%</p>
              <p className="text-gray-600">Average Conversion Rate Increase</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <p className="text-3xl md:text-4xl font-bold text-blue-600">500+</p>
              <p className="text-gray-600">Ecommerce Sites Launched</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <p className="text-3xl md:text-4xl font-bold text-blue-600">42%</p>
              <p className="text-gray-600">Cart Abandonment Reduction</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <p className="text-3xl md:text-4xl font-bold text-blue-600">98%</p>
              <p className="text-gray-600">Client Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Makes Our Ecommerce Design Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 text-blue-600">
                  <ShoppingCart size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">Conversion-Focused Design</h3>
                <p className="text-gray-600">
                  We design with your bottom line in mind, optimizing every element to guide visitors toward purchase.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 text-blue-600">
                  <Palette size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">Custom Brand Experience</h3>
                <p className="text-gray-600">
                  Your ecommerce site will stand out with unique design that reflects your brand identity and values.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 text-blue-600">
                  <Code size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">Technical Excellence</h3>
                <p className="text-gray-600">
                  Built with clean code and best practices for speed, security, and seamless functionality.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 text-blue-600">
                  <BarChart size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">Data-Driven Decisions</h3>
                <p className="text-gray-600">
                  We use analytics and user behavior insights to inform design choices that maximize results.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 text-blue-600">
                  <CreditCard size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">Optimized Checkout Flow</h3>
                <p className="text-gray-600">
                  Streamlined checkout process designed to reduce abandonment and increase completed purchases.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 text-blue-600">
                  <Users size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">User-Centric Approach</h3>
                <p className="text-gray-600">
                  Every design decision is made with your customers' needs and preferences in mind.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Ecommerce Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 mt-2">Discovery & Strategy</h3>
              <p className="text-gray-600">
                We analyze your business goals, target audience, and competitors to develop a strategic roadmap for your
                ecommerce site.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 mt-2">UX Design & Wireframing</h3>
              <p className="text-gray-600">
                We create the blueprint for your site with user flows, information architecture, and wireframes focused
                on conversion.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 mt-2">Visual Design</h3>
              <p className="text-gray-600">
                Our designers craft a stunning visual identity that aligns with your brand and appeals to your target
                customers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                4
              </div>
              <h3 className="text-xl font-bold mb-3 mt-2">Development & Launch</h3>
              <p className="text-gray-600">
                We build your site with clean code, integrate payment gateways and shipping solutions, and launch with
                thorough testing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Expertise */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Ecommerce Platform Expertise</h2>
          <Tabs defaultValue="shopify" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="shopify">Shopify</TabsTrigger>
              <TabsTrigger value="woocommerce">WooCommerce</TabsTrigger>
              <TabsTrigger value="magento">Magento</TabsTrigger>
              <TabsTrigger value="bigcommerce">BigCommerce</TabsTrigger>
            </TabsList>
            <TabsContent value="shopify" className="p-6 bg-white rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Shopify Expertise</h3>
                  <p className="mb-4">
                    Our team specializes in creating custom Shopify stores that stand out from templates while
                    leveraging the platform's robust features.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Custom theme development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>App integration and customization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Migration from other platforms</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Shopify Plus enterprise solutions</span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-[250px]">
                  <Image
                    src="/placeholder.svg?height=250&width=400"
                    alt="Shopify Expertise"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="woocommerce" className="p-6 bg-white rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">WooCommerce Expertise</h3>
                  <p className="mb-4">
                    We build flexible, scalable WooCommerce stores on WordPress that give you complete control over your
                    ecommerce business.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Custom WordPress + WooCommerce development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Extension development and integration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Performance optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Custom payment gateway integration</span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-[250px]">
                  <Image
                    src="/placeholder.svg?height=250&width=400"
                    alt="WooCommerce Expertise"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="magento" className="p-6 bg-white rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Magento Expertise</h3>
                  <p className="mb-4">
                    Our Magento certified developers create powerful, enterprise-grade ecommerce solutions for complex
                    business requirements.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Magento 2 implementation and migration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Custom module development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>B2B ecommerce solutions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Multi-store and international setup</span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-[250px]">
                  <Image
                    src="/placeholder.svg?height=250&width=400"
                    alt="Magento Expertise"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="bigcommerce" className="p-6 bg-white rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">BigCommerce Expertise</h3>
                  <p className="mb-4">
                    We create custom BigCommerce stores that combine the platform's reliability with unique designs that
                    drive sales.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Custom theme development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Stencil framework customization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Headless commerce implementation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Third-party integrations</span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-[250px]">
                  <Image
                    src="/placeholder.svg?height=250&width=400"
                    alt="BigCommerce Expertise"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Ecommerce Portfolio</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Take a look at some of our recent ecommerce website design projects and the results they've achieved.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden border-0 shadow-md">
                <div className="relative h-[250px]">
                  <Image
                    src={`/placeholder.svg?height=250&width=400&text=Case+Study+${item}`}
                    alt={`Ecommerce Case Study ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Client Name {item}</h3>
                  <p className="text-gray-600 mb-4">
                    {item === 1
                      ? "Fashion retailer saw 45% increase in mobile conversions"
                      : item === 2
                        ? "Home goods store achieved 3x revenue growth"
                        : "B2B supplier streamlined ordering process"}
                  </p>
                  <Button variant="outline" className="w-full">
                    View Case Study
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/portfolio">View Full Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                company: "Fashion Boutique Owner",
                quote:
                  "Creative Surf transformed our online store into a beautiful, high-converting website that perfectly represents our brand. Sales increased by 40% in the first three months!",
              },
              {
                name: "Michael Chen",
                company: "Electronics Retailer",
                quote:
                  "The team at Creative Surf understood our complex product catalog and created an intuitive shopping experience that our customers love. Our cart abandonment rate dropped significantly.",
              },
              {
                name: "Jessica Williams",
                company: "Handmade Goods Marketplace",
                quote:
                  "Working with Creative Surf was the best decision we made for our business. They created a custom marketplace that showcases our artisans' work beautifully and makes purchasing simple.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How long does it take to design and build an ecommerce website?",
                answer:
                  "The timeline varies based on complexity, but most ecommerce projects take 8-12 weeks from discovery to launch. Simple stores may be completed faster, while complex enterprise solutions may take longer.",
              },
              {
                question: "How much does an ecommerce website design cost?",
                answer:
                  "Our ecommerce design services start at $15,000, with the final investment depending on your specific requirements, platform choice, and custom functionality needs. We provide detailed proposals with transparent pricing.",
              },
              {
                question: "Do you provide ongoing support after launch?",
                answer:
                  "Yes, we offer various support and maintenance packages to keep your store running smoothly. These include technical support, security updates, performance optimization, and feature enhancements.",
              },
              {
                question: "Can you help migrate my existing store to a new platform?",
                answer:
                  "Absolutely. We have extensive experience migrating stores between platforms while preserving SEO value, customer accounts, order history, and product data. We ensure a smooth transition with minimal disruption.",
              },
              {
                question: "Do you integrate with third-party services and apps?",
                answer:
                  "Yes, we integrate with payment gateways, shipping providers, ERP systems, CRM platforms, marketing tools, and other business systems to create a cohesive ecommerce ecosystem.",
              },
              {
                question: "Will my ecommerce site be mobile-friendly?",
                answer:
                  "Definitely. All our ecommerce designs are fully responsive and optimized for all devices. We put special emphasis on the mobile shopping experience, as it accounts for a growing percentage of ecommerce sales.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Online Store?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Let's create an ecommerce experience that drives sales, delights your customers, and grows your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              <Link href="/proposal">Get a Free Proposal</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

