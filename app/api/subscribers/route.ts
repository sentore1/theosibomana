import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const { name, email, type } = await req.json()

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  const subjects: Record<string, string> = {
    tour: 'New Book Interest Registration',
    newsletter: 'New Newsletter Subscriber',
    contact: 'New Contact Message',
  }

  try {
    // Notify site owner
    await transporter.sendMail({
      from: `"Theogene Sibomana Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: subjects[type] ?? 'New Submission',
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Type:</strong> ${type}</p>`,
    })

    // Confirm to subscriber
    await transporter.sendMail({
      from: `"Theogene Sibomana" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: type === 'newsletter' ? 'Welcome to Theogene Sibomana\'s Newsletter!' : 'Thank you for your interest!',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#4b5320">Thank you, ${name}!</h2>
          ${type === 'newsletter'
            ? `<p>You're now subscribed to Theogene Sibomana's monthly ideas and insights on leadership, wealth creation and personal growth.</p>`
            : `<p>Thank you for registering your interest in Theogene Sibomana's books. We will be in touch shortly.</p>`
          }
          <p style="color:#888;font-size:13px">— Theogene Sibomana | Ideas. Leadership. Impact.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Email error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
