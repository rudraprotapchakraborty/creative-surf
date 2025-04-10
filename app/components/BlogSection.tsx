import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react"; // You can replace with your icon component

const blogPosts = [
  {
    title: "10 SEO Strategies for 2025",
    excerpt: "Stay ahead of the curve with these cutting-edge SEO techniques for the coming year.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/blog/seo-strategies-2025",
  },
  {
    title: "The Power of Content Marketing",
    excerpt: "Discover how content marketing can transform your business and boost your online presence.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/blog/power-of-content-marketing",
  },
  {
    title: "Social Media Trends to Watch",
    excerpt: "Learn about the latest social media trends that are shaping digital marketing strategies.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/blog/social-media-trends",
  },
  {
    title: "Maximizing ROI with PPC Campaigns",
    excerpt: "Explore effective strategies to improve your pay-per-click campaigns and increase ROI.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/blog/maximizing-ppc-roi",
  },
];

const BlogSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Read from our blog</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link href={post.link} className="text-blue-600 hover:underline">
                  Read more
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/blog">
              Read more articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
