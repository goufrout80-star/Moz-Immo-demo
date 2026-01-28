// ============================================
// EMAIL INTEGRATION
// ============================================

const ADMIN_EMAIL = 'contact@mozimmo.com'

export interface EmailData {
  to?: string
  from: string
  subject: string
  body: string
  replyTo?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface BookingFormData {
  name: string
  email: string
  phone?: string
  itemType: 'villa' | 'car' | 'experience' | 'service'
  itemName: string
  checkIn?: string
  checkOut?: string
  guests?: number
  specialRequests?: string
}

// Email sending function - DEMO: logs to console
// FUTURE: Replace with actual email service (SendGrid, Resend, etc.)
export async function sendEmail(data: EmailData): Promise<{ success: boolean; messageId?: string }> {
  const emailPayload = {
    to: data.to || ADMIN_EMAIL,
    from: data.from,
    subject: data.subject,
    body: data.body,
    replyTo: data.replyTo || data.from,
    timestamp: new Date().toISOString(),
  }

  // DEMO: Log email to console
  console.log('📧 Email sent:', emailPayload)

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  return {
    success: true,
    messageId: `demo_${Date.now()}`,
  }
}

// Contact form submission
export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean }> {
  const emailBody = `
New Contact Form Submission
===========================

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

Subject: ${data.subject}

Message:
${data.message}

---
Submitted at: ${new Date().toLocaleString()}
  `.trim()

  return sendEmail({
    from: data.email,
    subject: `[Contact] ${data.subject}`,
    body: emailBody,
    replyTo: data.email,
  })
}

// Booking request submission
export async function sendBookingEmail(data: BookingFormData): Promise<{ success: boolean }> {
  const emailBody = `
New Booking Request
===================

Guest Information:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}

Booking Details:
- Type: ${data.itemType.charAt(0).toUpperCase() + data.itemType.slice(1)}
- Item: ${data.itemName}
${data.checkIn ? `- Check-in: ${data.checkIn}` : ''}
${data.checkOut ? `- Check-out: ${data.checkOut}` : ''}
${data.guests ? `- Guests: ${data.guests}` : ''}

Special Requests:
${data.specialRequests || 'None'}

---
Submitted at: ${new Date().toLocaleString()}
  `.trim()

  return sendEmail({
    from: data.email,
    subject: `[Booking] ${data.itemType}: ${data.itemName}`,
    body: emailBody,
    replyTo: data.email,
  })
}

// Newsletter subscription
export async function subscribeNewsletter(email: string): Promise<{ success: boolean }> {
  // DEMO: Log subscription
  console.log('📰 Newsletter subscription:', email)

  // FUTURE: Integrate with Mailchimp API
  // const response = await fetch('https://api.mailchimp.com/...', {
  //   method: 'POST',
  //   body: JSON.stringify({ email_address: email, status: 'subscribed' }),
  // })

  await new Promise(resolve => setTimeout(resolve, 300))

  return { success: true }
}

// Send confirmation email to guest
export async function sendConfirmationEmail(
  email: string,
  type: string,
  details: Record<string, string>
): Promise<{ success: boolean }> {
  const emailBody = `
Thank you for your inquiry!
===========================

Dear ${details.name || 'Guest'},

We have received your ${type} request and our team will get back to you within 24 hours.

Request Details:
${Object.entries(details)
  .map(([key, value]) => `- ${key}: ${value}`)
  .join('\n')}

If you have any urgent questions, please don't hesitate to contact us via WhatsApp.

Warm regards,
The Moz Immo Team

---
This is an automated message from Moz Immo.
  `.trim()

  return sendEmail({
    to: email,
    from: ADMIN_EMAIL,
    subject: `Moz Immo - Your ${type} Request Confirmation`,
    body: emailBody,
  })
}
