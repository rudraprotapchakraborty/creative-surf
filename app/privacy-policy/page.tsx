import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Creative Surf's website and services.",
  path: "/privacy-policy",
})

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-flow-bg min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-flow-textSoft mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-flow-textSoft font-medium">Privacy Policy</span>
        </div>

        <div className="bg-flow-surface rounded-xl shadow-md p-8 md:p-12 border border-flow-border">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-flow-text">Privacy Policy</h1>
          <p className="text-flow-textSoft mb-8">Last Updated: June 2026</p>

          <div className="prose max-w-none text-flow-textSoft space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                Creative Surf ("Company", "we", "our", or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website, use our services, or communicate with us.
              </p>
              <p className="leading-relaxed mt-2">
                By using our website and services, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">2. Information We Collect</h2>
              <p className="leading-relaxed font-semibold text-flow-text">
                Personal Information
              </p>
              <p className="leading-relaxed mt-1">
                We may collect information that you voluntarily provide, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company name</li>
                <li>Business website</li>
                <li>Marketing goals and project requirements</li>
                <li>Billing information</li>
              </ul>
              <p className="leading-relaxed font-semibold text-flow-text mt-4">
                Automatically Collected Information
              </p>
              <p className="leading-relaxed mt-1">
                When you visit our website, we may automatically collect:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Pages visited</li>
                <li>Referring website</li>
                <li>Session duration</li>
                <li>Analytics data</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">3. How We Use Your Information</h2>
              <p className="leading-relaxed">
                We use collected information to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Provide marketing services</li>
                <li>Respond to inquiries</li>
                <li>Schedule consultations</li>
                <li>Process payments</li>
                <li>Improve our website and services</li>
                <li>Send service updates</li>
                <li>Deliver reports and campaign insights</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and abuse</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">4. Marketing Communications</h2>
              <p className="leading-relaxed">
                We may send promotional emails, newsletters, and service updates. You may unsubscribe at any time using the unsubscribe link contained in our emails.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">5. Third-Party Services</h2>
              <p className="leading-relaxed">
                We may use third-party providers including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Meta (Facebook & Instagram)</li>
                <li>Google</li>
                <li>TikTok</li>
                <li>LinkedIn</li>
                <li>Analytics platforms</li>
                <li>CRM systems</li>
                <li>Payment processors</li>
                <li>Email marketing providers</li>
              </ul>
              <p className="leading-relaxed mt-2">
                These providers maintain their own privacy policies and practices.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">6. Data Sharing</h2>
              <p className="leading-relaxed">
                We do not sell personal information.
              </p>
              <p className="leading-relaxed mt-2">
                We may share information with:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Service providers assisting our operations</li>
                <li>Advertising platforms when managing campaigns</li>
                <li>Legal authorities when required by law</li>
                <li>Business successors in the event of a merger, acquisition, or sale</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">7. Data Security</h2>
              <p className="leading-relaxed">
                We implement reasonable administrative, technical, and organizational safeguards designed to protect personal information. However, no internet transmission or storage system can be guaranteed to be 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">8. Data Retention</h2>
              <p className="leading-relaxed">
                We retain information only for as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce agreements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">9. Your Rights</h2>
              <p className="leading-relaxed">
                Depending on your location, you may have rights to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of data</li>
                <li>Restrict processing</li>
                <li>Object to processing</li>
                <li>Request data portability</li>
              </ul>
              <p className="leading-relaxed mt-2">
                To exercise these rights, contact us using the information below.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">10. Cookies</h2>
              <p className="leading-relaxed">
                Our website may use cookies and similar technologies to improve user experience, analyze traffic, and support advertising efforts.
              </p>
              <p className="leading-relaxed mt-2">
                You can control cookies through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">11. Children's Privacy</h2>
              <p className="leading-relaxed">
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from minors.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">12. International Data Transfers</h2>
              <p className="leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. By using our services, you consent to such transfers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-flow-text mt-8 mb-4">13. Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy periodically. Updates become effective immediately upon posting on this page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
