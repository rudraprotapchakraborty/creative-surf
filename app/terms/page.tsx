import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "Terms of Service",
  description: "Terms of Service for Creative Surf's website and services.",
  path: "/terms",
})

export default function TermsPage() {
  return (
    <div className="bg-flow-bg min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-flow-textSoft mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-flow-textSoft font-medium">Terms of Service</span>
        </div>

        <div className="bg-flow-surface rounded-xl shadow-md p-8 md:p-12 border border-flow-border">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-flow-text">Terms of Service</h1>
          <p className="text-flow-textSoft mb-8">Last Updated: June 2026</p>

          <div className="prose max-w-none text-flow-textSoft space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">1. Agreement</h2>
              <p className="leading-relaxed">
                These Terms of Service ("Terms") govern your access to and use of Creative Surf's website and services.
              </p>
              <p className="leading-relaxed mt-2">
                By accessing our website or engaging our services, you agree to be bound by these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">2. Services</h2>
              <p className="leading-relaxed">
                Creative Surf provides digital marketing and consulting services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Meta Advertising</li>
                <li>Google Advertising</li>
                <li>TikTok Advertising</li>
                <li>Lead Generation</li>
                <li>SEO Services</li>
                <li>Social Media Management</li>
                <li>Marketing Consulting</li>
                <li>Conversion Optimization</li>
              </ul>
              <p className="leading-relaxed mt-2">
                Services may be modified, expanded, or discontinued at our discretion.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">3. Client Responsibilities</h2>
              <p className="leading-relaxed">
                Clients agree to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Provide accurate information</li>
                <li>Supply necessary account access</li>
                <li>Respond to requests in a timely manner</li>
                <li>Maintain ownership of advertising accounts unless otherwise agreed</li>
                <li>Comply with platform policies and applicable laws</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">4. Fees and Payments</h2>
              <p className="leading-relaxed">
                All fees are outlined in service agreements, proposals, or invoices.
              </p>
              <p className="leading-relaxed mt-2 font-medium text-flow-text">
                Payments:
              </p>
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>Are due according to the agreed schedule</li>
                <li>May be non-refundable unless stated otherwise</li>
                <li>Do not include advertising spend unless specifically noted</li>
              </ul>
              <p className="leading-relaxed mt-2">
                Late payments may result in suspension of services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">5. Advertising Platforms</h2>
              <p className="leading-relaxed">
                Campaign performance depends on numerous factors outside our control, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Market conditions</li>
                <li>Competition</li>
                <li>Platform algorithms</li>
                <li>Product-market fit</li>
                <li>Client offer quality</li>
              </ul>
              <p className="leading-relaxed mt-2">
                We do not guarantee specific results, revenue, leads, sales, ROAS, rankings, or advertising outcomes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">6. Intellectual Property</h2>
              <p className="leading-relaxed">
                All content, branding, logos, website materials, frameworks, and proprietary methodologies remain the property of Creative Surf unless otherwise agreed in writing.
              </p>
              <p className="leading-relaxed mt-2">
                Clients retain ownership of their own trademarks, content, and business assets.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">7. Confidentiality</h2>
              <p className="leading-relaxed">
                Both parties agree to keep confidential information private and not disclose such information to third parties without consent, except where required by law.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">8. Limitation of Liability</h2>
              <p className="leading-relaxed">
                To the maximum extent permitted by law:
              </p>
              <p className="leading-relaxed mt-2">
                Creative Surf shall not be liable for indirect, incidental, special, consequential, or punitive damages, including lost profits, lost revenue, business interruption, or data loss.
              </p>
              <p className="leading-relaxed mt-2">
                Our total liability shall not exceed the amount paid by the client during the three months preceding the claim.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">9. No Guarantees</h2>
              <p className="leading-relaxed">
                Marketing and advertising involve risk.
              </p>
              <p className="leading-relaxed mt-2">
                While we strive to improve performance and generate positive outcomes, we do not guarantee:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Specific lead volumes</li>
                <li>Revenue targets</li>
                <li>Search rankings</li>
                <li>Conversion rates</li>
                <li>Advertising approval</li>
                <li>Platform account stability</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">10. Termination</h2>
              <p className="leading-relaxed">
                Either party may terminate services according to the terms of the applicable service agreement.
              </p>
              <p className="leading-relaxed mt-2 font-medium text-flow-text">
                Upon termination:
              </p>
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>Outstanding fees remain payable</li>
                <li>Access to proprietary resources may be revoked</li>
                <li>Campaign management services will cease</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">11. Third-Party Platforms</h2>
              <p className="leading-relaxed">
                Clients acknowledge that services may involve third-party platforms such as Meta, Google, TikTok, LinkedIn, and other providers.
              </p>
              <p className="leading-relaxed mt-2 font-medium text-flow-text">
                Creative Surf is not responsible for:
              </p>
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>Platform outages</li>
                <li>Account suspensions</li>
                <li>Policy changes</li>
                <li>Platform-imposed restrictions</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">12. Indemnification</h2>
              <p className="leading-relaxed">
                Clients agree to indemnify and hold Creative Surf harmless from claims, damages, liabilities, and expenses arising from their products, services, advertising content, or violations of law.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">13. Governing Law</h2>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of England and Wales.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">14. Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to modify these Terms at any time. Continued use of our website or services constitutes acceptance of updated Terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
