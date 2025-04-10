import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Importing motion
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // Adjust the breakpoint if necessary
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Define MotionWrapper here to be used within PricingSection
    const MotionWrapper = ({ children, ...props }) => {
        if (isMobile) {
            return <div {...props}>{children}</div>; // Render normal div on mobile
        }
        return <motion.div {...props}>{children}</motion.div>; // Render motion div on larger screens
    };

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <MotionWrapper
                    className="text-4xl md:text-5xl font-bold mb-4 text-center"
                    initial={!isMobile ? { opacity: 0, y: -20 } : undefined}
                    whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
                    transition={!isMobile ? { duration: 0.5 } : undefined}
                    viewport={!isMobile ? { once: true } : undefined}
                >
                    Our Monthly <span className="text-blue-600">Pricing</span>
                </MotionWrapper>
                <MotionWrapper
                    className="text-xl text-gray-600 text-center mb-12"
                    initial={!isMobile ? { opacity: 0, y: 20 } : undefined}
                    whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
                    transition={!isMobile ? { duration: 0.5, delay: 0.2 } : undefined}
                    viewport={!isMobile ? { once: true } : undefined}
                >
                    Choose the perfect plan for your business needs
                </MotionWrapper>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Basic Plan */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative bg-white border border-gray-200 rounded-2xl shadow-lg p-8 transition-transform duration-500 hover:-translate-y-1 flex flex-col h-full">
                            <div className="text-center mb-8">
                                <h3 className="inline-block bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-full px-6 py-2 text-xl font-semibold mb-4">
                                    Basic
                                </h3>
                                <div className="text-4xl font-bold mb-2">
                                    $390<span className="text-lg text-gray-600">/mo</span>
                                </div>
                                <p className="text-gray-600">Perfect for small businesses</p>
                            </div>

                            <div className="flex-grow">
                                <ul className="space-y-4 mb-8">
                                    {["Business Development", "Campaign Marketing", "Creative Visual Content (Up to 7)", "Series Content (Product/Service)", "Animated Motion Video/GIF", "Social Media Management", "Media Buying on Demand"].map((feature) => (
                                        <li key={feature} className="flex items-center text-gray-700">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                                Get Started
                            </Button>
                        </div>
                    </div>

                    {/* Standard Plan */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative bg-white border-2 border-blue-600 rounded-2xl shadow-xl p-8 transition-transform duration-500 hover:-translate-y-1 flex flex-col h-full">
                            <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
                                POPULAR
                            </div>
                            <div className="text-center mb-8">
                                <h3 className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-6 py-2 text-xl font-semibold mb-4">
                                    Standard
                                </h3>
                                <div className="text-4xl font-bold mb-2">
                                    $490<span className="text-lg text-gray-600">/mo</span>
                                </div>
                                <p className="text-gray-600">Best for growing companies</p>
                            </div>

                            <div className="flex-grow">
                                <ul className="space-y-4 mb-8">
                                    {["Business Development", "Campaign Marketing", "Product Photography", "Creative Visual Content (Up to 10)", "Series Content (Product/Service)", "Animated Motion Video/GIF", "Social Media Management", "Copyright Content with SEO", "Media Buying on Demand ($50 free)"].map((feature) => (
                                        <li key={feature} className="flex items-center text-gray-700">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                Get Started
                            </Button>
                        </div>
                    </div>

                    {/* Premium Plan */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative bg-white border border-gray-200 rounded-2xl shadow-lg p-8 transition-transform duration-500 hover:-translate-y-1 flex flex-col h-full">
                            <div className="text-center mb-8">
                                <h3 className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-6 py-2 text-xl font-semibold mb-4">
                                    Premium
                                </h3>
                                <div className="text-4xl font-bold mb-2">
                                    $650<span className="text-lg text-gray-600">/mo</span>
                                </div>
                                <p className="text-gray-600">For enterprise businesses</p>
                            </div>

                            <div className="flex-grow">
                                <ul className="space-y-4 mb-8">
                                    {["Business Development", "Campaign Marketing", "Product Photography", "Creative Visual Content (Up to 15)", "Series Content (Product/Service)", "Website Development", "Animated Motion Video", "Social Media Management", "Copyright Content with SEO", "Media Buying on Demand ($100 free)", "Content Writing (Up to 5)"].map((feature) => (
                                        <li key={feature} className="flex items-center text-gray-700">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
