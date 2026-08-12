import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName = '',
      lastName = '',
      companyName = '',
      email = '',
      socialUrl = '',
      services = [],
      comments = '',
      howDidYouHear = '',
      name = `${firstName} ${lastName}`.trim() || body.name || '',
      message = comments || body.message || '',
      subject = body.subject || (services.length ? `Inquiry: ${Array.isArray(services) ? services.join(', ') : services}` : 'Website Inquiry')
    } = body

    if ((!firstName && !name) || !email) {
      return NextResponse.json({ error: 'First name and email are required.' }, { status: 400 })
    }

    // 1. Persist to MongoDB
    try {
      const db = await getDb()
      await db.collection('contact_submissions').insertOne({
        firstName,
        lastName,
        name,
        companyName,
        email,
        socialUrl,
        services,
        comments,
        message,
        howDidYouHear,
        subject,
        createdAt: new Date(),
        read: false,
      })
    } catch (dbErr) {
      console.warn('MongoDB submission failed or not configured, logging submission payload:', dbErr)
      console.log('Submission payload:', { firstName, lastName, companyName, email, socialUrl, services, comments, howDidYouHear })
    }

    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'creativesurfcs@gmail.com'

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; rounded: 12px;">
        <h2 style="color: #111; margin-bottom: 5px;">🌊 New Lead Submission</h2>
        <p style="color: #666; font-size: 14px; margin-top: 0;">Creative Surf Website Contact Form</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Company:</strong> ${companyName || 'N/A'}</p>
        <p><strong>Social Media URL:</strong> ${socialUrl || 'N/A'}</p>
        <p><strong>Services Interested:</strong> ${Array.isArray(services) ? services.join(', ') : services}</p>
        <p><strong>Comments / Requirements:</strong> ${comments || message || 'N/A'}</p>
        <p><strong>How Did They Hear About Us:</strong> ${howDidYouHear || 'N/A'}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #888;">Sent automatically from Creative Surf Website</p>
      </div>
    `

    // 2. Dispatch via Resend API (If RESEND_API_KEY is present)
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Creative Surf Contact Form <onboarding@resend.dev>',
            to: [notificationEmail],
            reply_to: email,
            subject: `[New Lead] ${name} — ${subject}`,
            html: htmlBody,
          }),
        })
        const resendData = await resendRes.json()
        console.log('Resend email dispatched:', resendData)
      } catch (resendErr) {
        console.error('Failed to send email via Resend API:', resendErr)
      }
    }

    // 3. Dispatch via SMTP / Nodemailer (If SMTP_HOST is present)
    else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })

        await transporter.sendMail({
          from: `"Creative Surf Leads" <${process.env.SMTP_USER}>`,
          to: notificationEmail,
          replyTo: email,
          subject: `[New Lead] ${name} — ${subject}`,
          html: htmlBody,
        })
        console.log(`SMTP email notification dispatched successfully to ${notificationEmail}`)
      } catch (emailErr) {
        console.error('Failed to send email notification via SMTP:', emailErr)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact submission error:', err)
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}
