"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import LoadingBar from "react-top-loading-bar"
// Import the trackEvent function at the top of the file
import { trackEvent } from "@/lib/analytics"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeItem, setActiveItem] = React.useState<string | null>(null)
  const [activeDesktopMenu, setActiveDesktopMenu] = React.useState<string | null>(null)
  const [progress, setProgress] = React.useState(0)
  const router = useRouter()

  const menuItems = [
    {
      title: "Digital Marketing",
      href: "/digital-marketing",
      sections: [
        {
          title: "Digital Intelligence",
          href: "/digital-marketing/digital-intelligence",
          items: [
            {
              name: "Web Channel Call Tracking",
              href: "/digital-marketing/digital-intelligence/web-channel-call-tracking",
            },
            { name: "SEO Reporting & Forecasting", href: "/digital-marketing/digital-intelligence/seo-reporting" },
            {
              name: "Channel Attribution & Forecasting",
              href: "/digital-marketing/digital-intelligence/channel-attribution",
            },
            {
              name: "Digital Marketing Competitor Analysis",
              href: "/digital-marketing/digital-intelligence/competitor-analysis",
            },
            { name: "Private Equity Due Diligence", href: "/digital-marketing/digital-intelligence/private-equity" },
            { name: "Revenue Operations", href: "/digital-marketing/digital-intelligence/revenue-operations" },
          ],
        },
        {
          title: "Conversion",
          href: "/digital-marketing/conversion",
          items: [
            { name: "Conversion Rate Optimization", href: "/digital-marketing/conversion/cro" },
            { name: "User Experience Testing", href: "/digital-marketing/conversion/ux-testing" },
            { name: "Landing Pages & Funnels", href: "/digital-marketing/conversion/landing-pages" },
            { name: "Online Review Acceleration", href: "/digital-marketing/conversion/online-reviews" },
            {
              name: "Channel Partner Sales Pipeline Management",
              href: "/digital-marketing/conversion/channel-partner",
            },
            { name: "Website Personalization", href: "/digital-marketing/conversion/website-personalization" },
          ],
        },
        {
          title: "Marketing Automation",
          href: "/digital-marketing/marketing-automation",
          items: [
            { name: "Account-Based Marketing Services", href: "/digital-marketing/marketing-automation/abm" },
            { name: "Lead Nurture Email Marketing", href: "/digital-marketing/marketing-automation/lead-nurture" },
            { name: "Email Marketing Management", href: "/digital-marketing/marketing-automation/email-marketing" },
            { name: "Salesforce Marketing Automation", href: "/digital-marketing/marketing-automation/salesforce" },
          ],
        },
        {
          title: "Commerce Platforms",
          href: "/digital-marketing/commerce-platforms",
          items: [
            { name: "SEO for Amazon", href: "/digital-marketing/commerce-platforms/amazon-seo" },
            {
              name: "Advertising Management for Amazon",
              href: "/digital-marketing/commerce-platforms/amazon-advertising",
            },
            { name: "Shopify Optimization Services", href: "/digital-marketing/commerce-platforms/shopify" },
            {
              name: "Facebook Marketplace for Business",
              href: "/digital-marketing/commerce-platforms/facebook-marketplace",
            },
            {
              name: "Influencer Marketing Services",
              href: "/digital-marketing/commerce-platforms/influencer-marketing",
            },
          ],
        },
      ],
    },
    {
      title: "SEO & Lead Generation",
      href: "/seo-lead-generation",
      sections: [
        {
          title: "Organic Search",
          href: "/seo-lead-generation/organic-search",
          items: [
            { name: "SEO Services", href: "/seo-lead-generation/organic-search/seo-services" },
            { name: "Enterprise SEO Services", href: "/seo-lead-generation/organic-search/enterprise-seo" },
            { name: "Digital Marketing Services", href: "/seo-lead-generation/organic-search/digital-marketing" },
            { name: "Local SEO Services", href: "/seo-lead-generation/organic-search/local-seo" },
            {
              name: "Google Local Services Ads Management",
              href: "/seo-lead-generation/organic-search/google-local-services",
            },
            { name: "SEO Audits", href: "/seo-lead-generation/organic-search/seo-audits" },
            {
              name: "Generative Engine & Chat Optimization",
              href: "/seo-lead-generation/organic-search/generative-engine-optimization",
            },
          ],
        },
        {
          title: "Digital Advertising",
          href: "/seo-lead-generation/digital-advertising",
          items: [
            { name: "PPC Management Services", href: "/seo-lead-generation/digital-advertising/ppc-management" },
            {
              name: "Enterprise PPC Management Services",
              href: "/seo-lead-generation/digital-advertising/enterprise-ppc",
            },
            {
              name: "Social Media Advertising",
              href: "/seo-lead-generation/digital-advertising/social-media-advertising",
            },
            {
              name: "Enterprise Social Media Advertising",
              href: "/seo-lead-generation/digital-advertising/enterprise-social-media",
            },
            {
              name: "Programmatic Advertising Services",
              href: "/seo-lead-generation/digital-advertising/programmatic-advertising",
            },
            { name: "Addressable Geofencing Services", href: "/seo-lead-generation/digital-advertising/geofencing" },
          ],
        },
        {
          title: "Ecommerce",
          href: "/seo-lead-generation/ecommerce",
          items: [
            { name: "Ecommerce SEO Services", href: "/seo-lead-generation/ecommerce/ecommerce-seo" },
            { name: "Ecommerce PPC Services", href: "/seo-lead-generation/ecommerce/ecommerce-ppc" },
            {
              name: "Ecommerce Social Media Advertising",
              href: "/seo-lead-generation/ecommerce/ecommerce-social-media",
            },
            { name: "B2B Ecommerce Enablement", href: "/seo-lead-generation/ecommerce/b2b-ecommerce" },
            { name: "Shopping Feed Automation", href: "/seo-lead-generation/ecommerce/shopping-feed" },
            {
              name: "Ecommerce Digital Marketing Services",
              href: "/seo-lead-generation/ecommerce/ecommerce-digital-marketing",
            },
          ],
        },
        {
          title: "Learn",
          href: "/seo-lead-generation/learn",
          items: [
            { name: "Our SEO Results", href: "/seo-lead-generation/learn/seo-results" },
            { name: "Our SEO Case Studies", href: "/seo-lead-generation/learn/seo-case-studies" },
            { name: "What Is an SEO Company?", href: "/seo-lead-generation/learn/what-is-an-seo-company" },
            { name: "Who Are the Best SEO Companies?", href: "/seo-lead-generation/learn/best-seo-companies" },
            { name: "SEO Guide for Marketing Managers", href: "/seo-lead-generation/learn/seo-guide" },
            { name: "What Is Digital Marketing?", href: "/seo-lead-generation/learn/what-is-digital-marketing" },
            { name: "Best Digital Marketing Tools", href: "/seo-lead-generation/learn/digital-marketing-tools" },
          ],
        },
      ],
    },
    {
      title: "UX & Interactive",
      href: "/ux-interactive",
      sections: [
        {
          title: "Design",
          href: "/ux-interactive/design",
          items: [
            { name: "Website Design", href: "/ux-interactive/design/website-design" },
            { name: "Website Redesign", href: "/ux-interactive/design/website-redesign" },
            { name: "Rapid Web Design", href: "/ux-interactive/design/rapid-web-design" },
            { name: "Social Media Design", href: "/ux-interactive/design/social-media-design" },
            { name: "Ecommerce Website Design", href: "/ux-interactive/design/ecommerce-design" },
            { name: "Email Marketing Testing & Design", href: "/ux-interactive/design/email-design" },
          ],
        },
        {
          title: "Content Marketing",
          href: "/ux-interactive/content-marketing",
          items: [
            { name: "SEO Copywriting", href: "/ux-interactive/content-marketing/seo-copywriting" },
            { name: "Content Marketing Services", href: "/ux-interactive/content-marketing/content-services" },
            { name: "Social Media Management", href: "/ux-interactive/content-marketing/social-media-management" },
            { name: "Infographics & Motion Graphics", href: "/ux-interactive/content-marketing/infographics" },
            { name: "Web Video Production Services", href: "/ux-interactive/content-marketing/video-production" },
            { name: "YouTube Advertising", href: "/ux-interactive/content-marketing/youtube-advertising" },
          ],
        },
        {
          title: "Development",
          href: "/ux-interactive/development",
          items: [
            { name: "Digital Experience Development", href: "/ux-interactive/development/digital-experience" },
            { name: "Shopify Ecommerce Development", href: "/ux-interactive/development/shopify" },
            { name: "Web Infrastructure & Maintenance", href: "/ux-interactive/development/web-infrastructure" },
            { name: "Content Management Systems", href: "/ux-interactive/development/cms" },
            { name: "AI & GPT Integration", href: "/ux-interactive/development/ai-integration" },
          ],
        },
        {
          title: "Challenges We Solve",
          href: "/ux-interactive/challenges",
          items: [
            { name: "My Website Doesn't Drive Leads", href: "/ux-interactive/challenges/website-leads" },
            { name: "My Website Traffic Is Going Down", href: "/ux-interactive/challenges/traffic-decline" },
            { name: "My Website Doesn't Convert", href: "/ux-interactive/challenges/conversion-issues" },
            { name: "My Website Isn't Driving ROI", href: "/ux-interactive/challenges/roi-problems" },
          ],
        },
      ],
    },
    {
      title: "Who We Are",
      href: "/about",
      sections: [
        {
          title: "Who We Are",
          href: "/about",
          items: [
            { name: "Our Approach", href: "/about/approach" },
            { name: "About Us", href: "/about" },
            { name: "Career", href: "/about/careers" },
            { name: "Contact Info", href: "/contact" },
            { name: "Reviews", href: "/about/reviews" },
            { name: "Awards", href: "/about/awards" },
          ],
        },
        {
          title: "Community Impact",
          href: "/about/community-impact",
          items: [
            { name: "Company Values", href: "/about/values" },
            { name: "Community Impact", href: "/about/community-impact" },
            { name: "FXBuilds", href: "/about/fx-builds" },
            { name: "Equality at WebFX", href: "/about/equality" },
            { name: "STEMFX Program", href: "/about/stem-program" },
            { name: "CreativeSurf History", href: "/about/history" },
          ],
        },
        {
          title: "Pricing Guides",
          href: "/about/pricing",
          items: [
            { name: "How Much Should a Website Cost?", href: "/about/pricing/website-cost" },
            { name: "How Much Does PPC Cost?", href: "/about/pricing/ppc-cost" },
            { name: "Email Marketing Pricing", href: "/about/pricing/email-marketing" },
            { name: "Social Media Pricing", href: "/about/pricing/social-media" },
            { name: "How Much Does SEO Cost?", href: "/about/pricing/seo-cost" },
            { name: "Local SEO Pricing", href: "/about/pricing/local-seo" },
          ],
        },
        {
          title: "Content Library",
          href: "/blog",
          items: [
            { name: "Our Blog", href: "/blog" },
            { name: "SEO Checker Report", href: "/tools/seo-checker" },
            { name: "Free Keyword Suggestion Tool", href: "/tools/keyword-suggestion" },
            { name: "Fix Your Funnel", href: "/tools/fix-funnel" },
            { name: "FAQFox", href: "/tools/faq-fox" },
            { name: "View All Tools", href: "/tools" },
          ],
        },
      ],
    },
  ]

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !(event.target as Element).closest(".desktop-menu") &&
        !(event.target as Element).closest(".mobile-menu-trigger") &&
        !(event.target as Element).closest(".mobile-menu-content") &&
        !(event.target as Element).closest(".mobile-menu-close")
      ) {
        setActiveDesktopMenu(null)
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  // Update the handleNavigation function to track page navigation
  const handleNavigation = (href: string, itemName?: string) => {
    setProgress(30)

    // Track the navigation event
    if (itemName) {
      trackEvent("menu_click", "navigation", `Menu Item: ${itemName}`)
    }

    router.push(href)
    setTimeout(() => setProgress(100), 500) // Simulate loading completion
  }

  return (
    <>
      <LoadingBar color="#0066CC" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <header className="sticky top-0 border-b bg-white z-[1000] shadow-md">
        <nav className="container mx-auto px-4 py-4 overflow-x-auto scrollbar-hide bg-white">
          <div className="flex items-center justify-between min-w-max">
            {/* Logo */}
            <Link href="/" onClick={() => handleNavigation("/")} className="text-2xl font-bold flex items-center">
              <span className="text-[#051C2C]">Creative</span>
              <span className="text-blue-600">Surf</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-8">
              <div className="flex items-center space-x-1 xl:space-x-4">
                {menuItems.map((item) => (
                  <div key={item.title} className="desktop-menu relative">
                    <button
                      className={cn(
                        "flex items-center space-x-1 px-4 py-2 whitespace-nowrap text-lg font-semibold",
                        activeDesktopMenu === item.title ? "text-blue-600" : "",
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveDesktopMenu(activeDesktopMenu === item.title ? null : item.title)
                      }}
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          activeDesktopMenu === item.title ? "rotate-180" : "",
                        )}
                      />
                    </button>

                    {/* Desktop Megamenu */}
                    {activeDesktopMenu === item.title && (
                      <div className="fixed left-0 right-0 mt-2 bg-white border-b shadow-lg py-6 z-[1000]">
                        <div className="container mx-auto px-4">
                          <div className="grid grid-cols-4 gap-4">
                            {item.sections.map((section) => (
                              <div key={section.title}>
                                <h3 className="font-medium mb-2">
                                  <Link
                                    href={section.href}
                                    onClick={() => {
                                      handleNavigation(section.href, section.title)
                                      setActiveDesktopMenu(null)
                                    }}
                                    className="hover:text-blue-600"
                                  >
                                    {section.title}
                                  </Link>
                                </h3>
                                <ul className="space-y-1">
                                  {section.items.map((subItem) => (
                                    <li key={subItem.name}>
                                      <Link
                                        href={subItem.href}
                                        onClick={() => {
                                          handleNavigation(subItem.href, subItem.name)
                                          setActiveDesktopMenu(null)
                                        }}
                                        className="text-sm text-gray-600 hover:text-blue-600"
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop CTA */}
            <Button
              asChild
              className="hidden lg:flex bg-blue-600 hover:bg-blue-800 px-4 py-1 text-base lg:text-lg whitespace-nowrap mr-2"
            >
              <Link href="/proposal" onClick={() => handleNavigation("/proposal")}>
                Get a Proposal
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden mobile-menu-trigger">
                <Button variant="ghost" size="icon">
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-md p-0" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col h-full mobile-menu-content">
                  <SheetHeader className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <Link
                        href="/"
                        onClick={() => {
                          handleNavigation("/")
                          setMobileMenuOpen(false)
                        }}
                        className="text-2xl font-bold flex items-center"
                      >
                        <span className="text-[#051C2C]">Creative</span>
                        <span className="text-blue-600">Surf</span>
                      </Link>
                    </div>
                  </SheetHeader>
                  <div className="flex-1 overflow-auto">
                    <div className="divide-y">
                      {menuItems.map((item) => (
                        <div key={item.title} className="py-4 px-6">
                          <div className="flex items-center justify-between w-full">
                            <Link
                              href={item.href}
                              onClick={() => {
                                handleNavigation(item.href, item.title)
                                setMobileMenuOpen(false)
                              }}
                              className={cn(
                                "text-lg font-semibold",
                                activeItem === item.title ? "text-blue-600" : "text-gray-900",
                              )}
                            >
                              {item.title}
                            </Link>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveItem(activeItem === item.title ? null : item.title)
                              }}
                              className="p-1"
                            >
                              <ChevronRight
                                className={cn(
                                  "h-5 w-5 transition-transform duration-200",
                                  activeItem === item.title ? "rotate-90" : "",
                                )}
                              />
                            </button>
                          </div>
                          {activeItem === item.title && (
                            <div className="mt-2 ml-4 space-y-4">
                              {item.sections.map((section) => (
                                <div key={section.title}>
                                  <h4 className="font-semibold text-base text-gray-900 mb-1">
                                    <Link
                                      href={section.href}
                                      onClick={() => {
                                        handleNavigation(section.href, section.title)
                                        setMobileMenuOpen(false)
                                      }}
                                      className="hover:text-blue-600"
                                    >
                                      {section.title}
                                    </Link>
                                  </h4>
                                  <ul className="space-y-1">
                                    {section.items.map((subItem) => (
                                      <li key={subItem.name}>
                                        <Link
                                          href={subItem.href}
                                          onClick={() => {
                                            handleNavigation(subItem.href, subItem.name)
                                            setMobileMenuOpen(false)
                                          }}
                                          className="block text-sm text-gray-600 hover:text-blue-600"
                                        >
                                          {subItem.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border-t">
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-800">
                      <Link
                        href="/proposal"
                        onClick={() => {
                          handleNavigation("/proposal")
                          setMobileMenuOpen(false)
                        }}
                      >
                        Get a Proposal
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </header>
    </>
  )
}

