"use server"

import { z } from "zod"

// Import nodemailer (uncomment when ready to send emails)
// import nodemailer from 'nodemailer'

const formSchema = z.object({
  workEmail: z.string().email(),
  fullName: z.string(),
  website: z.string().url(),
  company: z.string(),
  phone: z.string(),
  budget: z.string(),
  comments: z.string(),
})

export async function submitProposal(data: z.infer<typeof formSchema>) {
  const result = formSchema.safeParse(data)

  if (!result.success) {
    throw new Error("Invalid form data")
  }

  // Log the proposal data for debugging
  console.log("Proposal submitted:", result.data)

  try {
    // Simulate a delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // ===== NODEMAILER CONFIGURATION (UNCOMMENT WHEN READY) =====
    // NOTE: Make sure to create a .env file in the root of your project with the following variables:
    // EMAIL_SERVER_HOST=smtp.example.com
    // EMAIL_SERVER_PORT=587
    // EMAIL_SERVER_SECURE=false
    // EMAIL_SERVER_USER=user@example.com
    // EMAIL_SERVER_PASSWORD=password
    // EMAIL_FROM=noreply@creativesurf.com
    // EMAIL_TO=proposals@creativesurf.com
    /*
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
      secure: process.env.EMAIL_SERVER_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    // Format the email content
    const emailContent = `
      <h1>New Proposal Request</h1>
      <p><strong>Name:</strong> ${result.data.fullName}</p>
      <p><strong>Email:</strong> ${result.data.workEmail}</p>
      <p><strong>Company:</strong> ${result.data.company}</p>
      <p><strong>Website:</strong> ${result.data.website}</p>
      <p><strong>Phone:</strong> ${result.data.phone}</p>
      <p><strong>Budget:</strong> ${result.data.budget}</p>
      <p><strong>Comments:</strong> ${result.data.comments}</p>
    `

    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Proposal Request from ${result.data.fullName} at ${result.data.company}`,
      html: emailContent,
    })

    console.log('Email sent successfully')
    */
    // ===== END NODEMAILER CONFIGURATION =====

    return { success: true }
  } catch (error) {
    console.error("Error submitting proposal:", error)
    throw new Error("Failed to submit proposal. Please try again.")
  }
}

