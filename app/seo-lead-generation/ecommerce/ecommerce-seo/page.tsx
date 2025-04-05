import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  LineChart,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

export default function EcommerceSEOPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Ecommerce SEO Services That Drive Revenue</h1>
              <p className="text-xl mb-8 text-blue-100">
                Increase organic traffic, boost product visibility, and grow your online store's revenue with our
                data-driven ecommerce SEO strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-blue-50">
                  <Link href="/proposal">
                    Get a Custom Strategy <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="#case-studies">View Our Results</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Ecommerce SEO Dashboard"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white text-blue-900 p-4 rounded-lg shadow-lg">
                  <p className="font-bold text-xl">+187%</p>
                  <p className="text-sm">Avg. Organic Traffic Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">93%</p>
              <p className="text-gray-700">of online experiences begin with search engines</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">44%</p>
              <p className="text-gray-700">of shoppers start their product search on Google</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">35%</p>
              <p className="text-gray-700">higher conversion rates from organic search</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">$1.8T</p>
              <p className="text-gray-700">global ecommerce sales influenced by search</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Ecommerce SEO Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our ecommerce SEO services are designed to increase your online store's visibility, drive qualified
              traffic, and boost your conversion rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <ShoppingCart className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Product Page Optimization</h3>
                <p className="text-gray-600 mb-4">
                  Optimize your product pages with targeted keywords, enhanced descriptions, and structured data to
                  improve visibility and click-through rates.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Keyword-rich product titles and descriptions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Schema markup for rich snippets</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Image optimization with alt text</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <LineChart className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Category Page Optimization</h3>
                <p className="text-gray-600 mb-4">
                  Structure and optimize category pages to rank for competitive keywords and provide an excellent user
                  experience that drives conversions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Strategic category hierarchy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Optimized category descriptions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Internal linking structure</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Technical SEO for Ecommerce</h3>
                <p className="text-gray-600 mb-4">
                  Resolve technical issues that prevent search engines from properly crawling and indexing your
                  ecommerce site to improve rankings.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Site speed optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Mobile-friendly improvements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Duplicate content resolution</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <Users className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Content Marketing for Ecommerce</h3>
                <p className="text-gray-600 mb-4">
                  Create valuable content that attracts potential customers at every stage of the buying journey and
                  builds your brand authority.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Buying guides and product comparisons</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Blog content targeting top-of-funnel keywords</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>FAQ and knowledge base development</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <Star className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Review & Reputation Management</h3>
                <p className="text-gray-600 mb-4">
                  Leverage customer reviews to improve your search visibility and conversion rates while building trust
                  with potential customers.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Review generation strategies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Review schema implementation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Reputation monitoring and management</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <Zap className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Conversion Rate Optimization</h3>
                <p className="text-gray-600 mb-4">
                  Turn more visitors into customers with data-driven CRO strategies specifically designed for ecommerce
                  websites.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>User experience improvements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>A/B testing of product pages</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Checkout optimization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Ecommerce SEO Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology to deliver results for your ecommerce store.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-blue-50 rounded-lg p-6 h-full">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Comprehensive Audit</h3>
                <p className="text-gray-600">
                  We analyze your current ecommerce SEO performance, identify issues, and uncover opportunities for
                  growth.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ChevronRight className="h-8 w-8 text-blue-300" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-blue-50 rounded-lg p-6 h-full">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Strategy Development</h3>
                <p className="text-gray-600">
                  We create a customized ecommerce SEO strategy based on your specific products, market, and business
                  goals.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ChevronRight className="h-8 w-8 text-blue-300" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-blue-50 rounded-lg p-6 h-full">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Implementation</h3>
                <p className="text-gray-600">
                  Our team executes the strategy, optimizing your product pages, technical structure, and content.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ChevronRight className="h-8 w-8 text-blue-300" />
              </div>
            </div>

            <div>
              <div className="bg-blue-50 rounded-lg p-6 h-full">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                  4
                </div>
                <h3 className="text-xl font-bold mb-2">Monitoring & Optimization</h3>
                <p className="text-gray-600">
                  We continuously track performance, make data-driven adjustments, and scale successful strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Expertise */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ecommerce Platform Expertise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We have specialized experience optimizing SEO for all major ecommerce platforms.
            </p>
          </div>

          <Tabs defaultValue="shopify" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="shopify">Shopify</TabsTrigger>
              <TabsTrigger value="woocommerce">WooCommerce</TabsTrigger>
              <TabsTrigger value="magento">Magento</TabsTrigger>
              <TabsTrigger value="bigcommerce">BigCommerce</TabsTrigger>
            </TabsList>
            <TabsContent value="shopify" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt="Shopify SEO"
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold mb-3">Shopify SEO Expertise</h3>
                      <p className="text-gray-600 mb-4">
                        Our team has deep expertise in optimizing Shopify stores for search engines, working around
                        platform limitations and leveraging its strengths.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>URL structure optimization</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>App recommendations for SEO enhancement</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Theme optimization for speed and SEO</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="woocommerce" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt="WooCommerce SEO"
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold mb-3">WooCommerce SEO Expertise</h3>
                      <p className="text-gray-600 mb-4">
                        We leverage the flexibility of WordPress and WooCommerce to create highly optimized ecommerce
                        stores with excellent search visibility.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>WordPress SEO plugin configuration</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Custom taxonomy optimization</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Performance optimization for WooCommerce</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="magento" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt="Magento SEO"
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold mb-3">Magento SEO Expertise</h3>
                      <p className="text-gray-600 mb-4">
                        Our specialists understand the complexities of Magento and Adobe Commerce, optimizing enterprise
                        ecommerce sites for maximum search visibility.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Complex catalog optimization</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Layered navigation SEO</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Enterprise-level technical SEO</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bigcommerce" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt="BigCommerce SEO"
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold mb-3">BigCommerce SEO Expertise</h3>
                      <p className="text-gray-600 mb-4">
                        We maximize the built-in SEO features of BigCommerce while implementing advanced strategies to
                        outrank competitors.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>BigCommerce SEO settings optimization</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Stencil theme optimization</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Multi-channel selling optimization</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ecommerce SEO Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we've helped ecommerce businesses increase their organic traffic and revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Fashion Retailer Case Study"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Fashion Retailer
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">213% Increase in Organic Traffic</h3>
                <p className="text-gray-600 mb-4">
                  We helped a fashion ecommerce store overcome a Google algorithm update and achieve record-breaking
                  organic traffic and sales.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Results:</p>
                    <p className="font-medium">+189% Revenue Growth</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/case-studies/fashion-retailer">
                      Read Case Study <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Home Goods Store Case Study"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Home Goods
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">157% Increase in Organic Conversions</h3>
                <p className="text-gray-600 mb-4">
                  Our product page optimization strategy helped this home goods retailer dramatically increase their
                  conversion rate from organic traffic.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Results:</p>
                    <p className="font-medium">+142% Organic Revenue</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/case-studies/home-goods">
                      Read Case Study <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Electronics Store Case Study"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Electronics
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">278% Increase in Keyword Rankings</h3>
                <p className="text-gray-600 mb-4">
                  We helped this electronics retailer dominate competitive product keywords and significantly increase
                  their organic visibility.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Results:</p>
                    <p className="font-medium">+203% Organic Traffic</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/case-studies/electronics-store">
                      Read Case Study <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Button asChild>
              <Link href="/case-studies">
                View All Case Studies <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from ecommerce businesses that have transformed their organic search performance with our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Creative Surf's ecommerce SEO services have been transformative for our online store. Our organic
                  traffic has increased by 187% and our revenue from organic search has more than doubled in just 6
                  months."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <p className="font-bold">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Marketing Director, Fashion Retailer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "We were struggling with technical SEO issues that were preventing our products from ranking. The team
                  at Creative Surf identified and fixed these issues, resulting in a 142% increase in organic traffic
                  and a significant boost in sales."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <p className="font-bold">Michael Chen</p>
                    <p className="text-sm text-gray-500">CEO, Electronics Ecommerce</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "The product page optimization strategy implemented by Creative Surf has dramatically improved our
                  conversion rates. We're now seeing a 35% higher conversion rate from organic traffic compared to our
                  paid channels."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <p className="font-bold">Jessica Martinez</p>
                    <p className="text-sm text-gray-500">Ecommerce Manager, Home Goods</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about ecommerce SEO services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">How long does it take to see results from ecommerce SEO?</h3>
                  <p className="text-gray-600">
                    While some improvements can be seen within weeks, significant results from ecommerce SEO typically
                    take 3-6 months. Technical fixes may show quicker results, while content and link building
                    strategies take longer to impact rankings. We provide monthly reports to track progress throughout
                    the process.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">How is ecommerce SEO different from regular SEO services?</h3>
                  <p className="text-gray-600">
                    Ecommerce SEO focuses specifically on product and category pages, schema markup for products,
                    managing duplicate content issues common in ecommerce sites, and optimizing for commercial intent
                    keywords. It also addresses ecommerce-specific challenges like faceted navigation and inventory
                    changes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Do you work with all ecommerce platforms?</h3>
                  <p className="text-gray-600">
                    Yes, we have experience optimizing SEO for all major ecommerce platforms including Shopify,
                    WooCommerce, Magento, BigCommerce, and custom-built ecommerce sites. Each platform has unique SEO
                    challenges and opportunities that our specialists are trained to address.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">How much does ecommerce SEO cost?</h3>
                  <p className="text-gray-600">
                    Our ecommerce SEO services start at $2,500 per month, with pricing based on your store size, current
                    SEO status, competition level, and goals. We offer customized packages to fit different budgets and
                    needs. Contact us for a personalized quote based on your specific requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Should I invest in SEO or PPC for my ecommerce store?</h3>
                  <p className="text-gray-600">
                    Ideally, a balanced approach using both SEO and PPC yields the best results. SEO provides long-term,
                    sustainable traffic with higher conversion rates and lower cost-per-acquisition over time, while PPC
                    delivers immediate visibility and is excellent for promotions and new product launches.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">What metrics do you track for ecommerce SEO success?</h3>
                  <p className="text-gray-600">
                    We track organic traffic, keyword rankings, organic conversion rate, revenue from organic search,
                    average order value from organic visitors, product page visibility, and return on investment. Our
                    comprehensive reporting shows how these metrics improve over time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your Ecommerce Store?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get a customized ecommerce SEO strategy that drives more traffic, increases conversions, and grows your
            revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-blue-50">
              <Link href="/proposal">
                Get a Custom Strategy <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

