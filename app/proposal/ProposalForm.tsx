"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"
import { Toaster, toast } from "react-hot-toast"
import { submitProposal } from "./actions"
import { useSearchParams } from "next/navigation"
// Import the trackEvent and trackConversion functions at the top of the file
import { trackEvent, trackConversion } from "@/lib/analytics"

const formSchema = z.object({
  workEmail: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  website: z.string().url("Invalid website URL"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  budget: z.string().min(1, "Please select a budget"),
  comments: z.string(),
})

export default function ProposalForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const searchParams = useSearchParams()
  const emailFromURL = searchParams.get("email")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workEmail: "",
      fullName: "",
      website: "",
      company: "",
      phone: "",
      budget: "",
      comments: "",
    },
  })
  
  useEffect(() => {
    if (emailFromURL) {
      form.setValue("workEmail", emailFromURL)
    }
  }, [emailFromURL, form])
  

  // Update the onSubmit function to track form submissions
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      await submitProposal(values)

      // Track the form submission event
      trackEvent("form_submit", "proposal", "Proposal Form Submitted")

      // Track conversion
      trackConversion("proposal_submit", "Proposal Form", 1)

      toast.success("Proposal submitted successfully!")
      form.reset()
    } catch (error) {
      toast.error("Failed to submit proposal. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#051C2C] via-[#0A2A42] to-[#051C2C] py-16 relative overflow-hidden">
      <Toaster position="top-right" />
      <div className="absolute inset-0">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-[#1E3A8A]/20 to-transparent animate-rotate-slow" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-[#1E3A8A]/10 to-transparent animate-rotate-slow-reverse" />
      </div>
      <div className="relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Request a FREE Proposal Now!</h1>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="workEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Work Email Address <span className="text-red-500">*</span>
                          </FormLabel>
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
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            First and Last Name <span className="text-red-500">*</span>
                          </FormLabel>
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
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Website <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com"
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
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Company <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your company name"
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
                          <FormLabel>
                            Phone Number <span className="text-red-500">*</span>
                          </FormLabel>
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
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Project Budget <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="transition-all duration-200 hover:border-blue-400 focus:border-blue-600">
                                <SelectValue placeholder="Select project budget" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                              <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                              <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                              <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
                              <SelectItem value="50000+">$50,000+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comments or Questions</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project..."
                            className="resize-none transition-all duration-200 hover:border-blue-400 focus:border-blue-600"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 transition-all duration-200 hover:scale-[1.02]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Get My Custom Quote"}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Info Section */}
            <div className="text-white lg:sticky lg:top-24 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#89CFF0]">Ready to grow your revenue?</h2>
              <p className="text-xl mb-12">
                Just <span className="font-semibold">fill in the form</span>, and let our experts handle the rest.
                Here&apos;s what will happen next:
              </p>

              <div className="space-y-12">
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#89CFF0] flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Get to know your business</h3>
                    <p className="text-gray-300">
                      From our first conversation, we begin researching your business, competitors, and industry.
                      We&apos;ll audit your site to craft a fully customized proposal.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#89CFF0] flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Put together your flight plan</h3>
                    <p className="text-gray-300">
                      Based on their research, your strategist will compile personalized recommendations for how your
                      business can drive more revenue online.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#89CFF0] flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Prepare for takeoff</h3>
                    <p className="text-gray-300">
                      Your flight plan will include pricing, timelines, a detailed view of what a partnership with
                      Creative Surf would look like, and how we&apos;ll help your business grow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

