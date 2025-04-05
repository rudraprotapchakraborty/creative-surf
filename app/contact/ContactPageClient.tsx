"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Toaster, toast } from "react-hot-toast"
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react"
import { submitContactForm } from "./actions"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ContactPageClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      await submitContactForm(values)
      toast.success("Message sent successfully! We'll get back to you soon.")
      form.reset()
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster position="top-right" />

      {/* Hero Section */}
      <div className="bg-[#051C2C] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Have questions or ready to start your next project? Get in touch with our team and we'll be happy to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-8 order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                            className="transition-all duration-200 hover:border-blue-400 focus:border-blue-600"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@company.com"
                            {...field}
                            className="transition-all duration-200 hover:border-blue-400 focus:border-blue-600"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(000) 000-0000"
                            {...field}
                            className="transition-all duration-200 hover:border-blue-400 focus:border-blue-600"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="How can we help you?"
                            {...field}
                            className="transition-all duration-200 hover:border-blue-400 focus:border-blue-600"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project or inquiry..."
                          className="resize-none min-h-[150px] transition-all duration-200 hover:border-blue-400 focus:border-blue-600"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Information */}
          <div className="order-1 md:order-2">
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Our Location</h3>
                    <p className="text-gray-600">
                      123 Marketing Avenue
                      <br />
                      San Francisco, CA 94105
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone Number</h3>
                    <p className="text-gray-600">
                      <a href="tel:+18882569448" className="hover:text-blue-600">
                        (888) 256-9448
                      </a>
                      <br />
                      <span className="text-sm">Monday to Friday, 9am to 6pm PST</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Address</h3>
                    <p className="text-gray-600">
                      <a href="mailto:info@creativesurf.com" className="hover:text-blue-600">
                        info@creativesurf.com
                      </a>
                      <br />
                      <a href="mailto:support@creativesurf.com" className="hover:text-blue-600">
                        support@creativesurf.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Opening Hours</h3>
                    <div className="text-gray-600 grid grid-cols-2 gap-x-4">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                      <span>Saturday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-gray-100 hover:bg-blue-100 p-3 rounded-full transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5 text-gray-600 hover:text-blue-600" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 hover:bg-blue-100 p-3 rounded-full transition-colors duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5 text-gray-600 hover:text-blue-600" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 hover:bg-blue-100 p-3 rounded-full transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5 text-gray-600 hover:text-blue-600" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 hover:bg-blue-100 p-3 rounded-full transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-gray-600 hover:text-blue-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Map */}
      <div className="w-full mt-16">
        <div className="container mx-auto px-4 mb-6">
          <h2 className="text-3xl font-bold">Find Us</h2>
          <p className="text-gray-600 mt-2">Visit our office at 123 Marketing Avenue, San Francisco, CA 94105</p>
        </div>
        <div className="w-full h-[400px] md:h-[500px] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0968173775!2d-122.40058672393407!3d37.78992871159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807ded297e89%3A0x9cdf304c4c6c1ba!2sSan%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1710211234567!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Creative Surf Office Location"
            className="absolute inset-0"
          ></iframe>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">How quickly can you respond to my inquiry?</h3>
              <p className="text-gray-600">
                We typically respond to all inquiries within 24 business hours. For urgent matters, please call our
                customer service line.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Do you offer free consultations?</h3>
              <p className="text-gray-600">
                Yes! We offer a free 30-minute consultation to discuss your project needs and how we can help your
                business grow.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">What information should I prepare before contacting you?</h3>
              <p className="text-gray-600">
                Having details about your business goals, target audience, timeline, and budget will help us provide you
                with the most relevant information.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Do you work with international clients?</h3>
              <p className="text-gray-600">
                We work with clients worldwide and have experience navigating different markets and cultural
                considerations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

