import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateMetadata({
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  path: "/404",
})

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </div>
  )
}

