import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "Privacy & Terms of Use",
  description: "Privacy policy and terms of use for Creative Surf marketing agency services.",
  path: "/privacy-terms",
})

export default function PrivacyTermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-700 font-medium">Privacy & Terms of Use</span>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Privacy Policy & Terms of Use</h1>
          <p className="text-gray-600 mb-8">Last Updated: March 12, 2025</p>

          <div className="prose max-w-none text-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">1. Introduction</h2>
            <p>
              Welcome to Creative Surf ("we," "our," or "us"). We are committed to protecting your privacy and providing
              a safe online experience. This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or use our services.
            </p>
            <p>
              By accessing or using our services, you agree to this Privacy Policy and our Terms of Use. If you do not
              agree with our policies and practices, please do not use our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">2.1 Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Register for an account</li>
              <li>Sign up for our newsletter</li>
              <li>Request a proposal or consultation</li>
              <li>Fill out a contact form</li>
              <li>Participate in surveys or contests</li>
              <li>Engage with us on social media</li>
            </ul>
            <p>
              This information may include your name, email address, phone number, company name, job title, and any
              other information you choose to provide.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">2.2 Automatically Collected Information</h3>
            <p>
              When you visit our website, we may automatically collect certain information about your device and usage
              patterns. This includes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Pages you view</li>
              <li>Time and date of your visit</li>
              <li>Time spent on pages</li>
              <li>Other statistics</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">3. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative information, such as updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Deliver personalized content and recommendations</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Protect against harmful or unlawful activity</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">4. Cookies and Similar Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and hold certain
              information. Cookies are files with a small amount of data that may include an anonymous unique
              identifier.
            </p>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
              if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
            <p>We use the following types of cookies:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Essential Cookies:</strong> Required for the operation of our website
              </li>
              <li>
                <strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count visitors and see how
                they move around our website
              </li>
              <li>
                <strong>Functionality Cookies:</strong> Enable us to personalize content
              </li>
              <li>
                <strong>Targeting Cookies:</strong> Record your visit to our website, the pages you visit, and the links
                you follow
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">5. Data Sharing and Disclosure</h2>
            <p>We may share your information in the following situations:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>With Service Providers:</strong> We may share your information with third-party vendors, service
                providers, contractors, or agents who perform services for us.
              </li>
              <li>
                <strong>Business Transfers:</strong> We may share or transfer your information in connection with, or
                during negotiations of, any merger, sale of company assets, financing, or acquisition.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may disclose your information for any other purpose with your
                consent.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in
                response to valid requests by public authorities.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal
              information. However, please be aware that no method of transmission over the internet or electronic
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">7. Your Data Protection Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>The right to access your personal information</li>
              <li>The right to rectify inaccurate personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to restrict processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>

            <div className="border-t border-gray-200 my-12 pt-12">
              <h1 className="text-3xl font-bold mb-8 text-gray-900">Terms of Use</h1>

              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using our website and services, you agree to be bound by these Terms of Use and all
                applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
                using or accessing our services.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on Creative Surf's website for
                personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of
                title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on Creative Surf's website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
              <p>
                This license shall automatically terminate if you violate any of these restrictions and may be
                terminated by Creative Surf at any time.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">3. Disclaimer</h2>
              <p>
                The materials on Creative Surf's website are provided on an 'as is' basis. Creative Surf makes no
                warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of merchantability, fitness for a particular
                purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p>
                Further, Creative Surf does not warrant or make any representations concerning the accuracy, likely
                results, or reliability of the use of the materials on its website or otherwise relating to such
                materials or on any sites linked to this site.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">4. Limitations</h2>
              <p>
                In no event shall Creative Surf or its suppliers be liable for any damages (including, without
                limitation, damages for loss of data or profit, or due to business interruption) arising out of the use
                or inability to use the materials on Creative Surf's website, even if Creative Surf or a Creative Surf
                authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on Creative Surf's website could include technical, typographical, or
                photographic errors. Creative Surf does not warrant that any of the materials on its website are
                accurate, complete, or current. Creative Surf may make changes to the materials contained on its website
                at any time without notice.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">6. Links</h2>
              <p>
                Creative Surf has not reviewed all of the sites linked to its website and is not responsible for the
                contents of any such linked site. The inclusion of any link does not imply endorsement by Creative Surf
                of the site. Use of any such linked website is at the user's own risk.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">7. Modifications</h2>
              <p>
                Creative Surf may revise these Terms of Use for its website at any time without notice. By using this
                website, you are agreeing to be bound by the then current version of these Terms of Use.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the United
                States and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or Terms of Use, please contact us at:</p>
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <p>
                <strong>Creative Surf</strong>
              </p>
              <p>123 Marketing Avenue</p>
              <p>San Francisco, CA 94105</p>
              <p>Email: privacy@creativesurf.com</p>
              <p>Phone: (888) 256-9448</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

