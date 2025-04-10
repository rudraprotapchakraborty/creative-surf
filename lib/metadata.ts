import type { Metadata } from "next"

type MetadataProps = {
  title?: string
  description?: string
  image?: string
  path?: string
  icons?: Metadata["icons"] // ✅ Added icons support
}

export function generateMetadata({
  title,
  description,
  image,
  path,
  icons,
}: MetadataProps): Metadata {
  const siteName = "Creative Surf"
  const defaultTitle = "Creative Surf | Digital Marketing Agency"
  const defaultDescription =
    "Creative Surf is a leading digital marketing agency specializing in SEO, content marketing, and social media strategies to drive revenue growth for businesses."
  const defaultImage = "/og-image.jpg" // Replace with your default OG image
  const baseUrl = "https://www.creativesurf.com" // Replace with your actual domain

  const metaTitle = title ? `${title} | ${siteName}` : defaultTitle
  const metaDescription = description || defaultDescription
  const metaImage = image || defaultImage
  const url = path ? `${baseUrl}${path}` : baseUrl

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      url: url,
      siteName: siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
  }
}
