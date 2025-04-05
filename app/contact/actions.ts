"use server"

import { z } from "zod"

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(5),
  message: z.string().min(10),
})

export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
  const result = contactFormSchema.safeParse(data)

  if (!result.success) {
    throw new Error("Invalid form data")
  }

  // Log the contact form data for debugging
  console.log("Contact form submitted:", result.data)

  try {
    // Simulate a delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real application, you would send an email or store the contact form data
    // For example, using nodemailer similar to the proposal form

    return { success: true }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    throw new Error("Failed to submit contact form. Please try again.")
  }
}

