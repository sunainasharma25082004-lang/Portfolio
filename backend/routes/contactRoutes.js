import express from 'express';
import ContactMessage from '../models/ContactMessage.js';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'aarav.sharma.dev@gmail.com';

// Helper to send email notification (same as before)
async function sendContactEmailNotification(data) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log('📧 [Contact] New message (Resend not configured):', {
      from: data.email,
      subject: data.subject,
    });
    return { sent: false, reason: 'no_api_key' };
  }

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: `Portfolio Contact <onboarding@resend.dev>`,
      to: OWNER_EMAIL,
      replyTo: data.email,
      subject: `[Portfolio] ${data.subject}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111827; margin-bottom: 8px;">New message from your portfolio</h2>
          <p style="color: #6b7280; margin-bottom: 24px;">Someone reached out via the contact form.</p>
          
          <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <p style="margin: 0 0 12px;"><strong>From:</strong> ${data.name} &lt;${data.email}&gt;</p>
            <p style="margin: 0 0 12px;"><strong>Subject:</strong> ${data.subject}</p>
            <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; margin: 0; color: #374151;">${data.message}</p>
          </div>

          <p style="color: #9ca3af; font-size: 13px;">
            View all messages in your admin dashboard.
          </p>
        </div>
      `,
    });

    return { sent: true };
  } catch (error) {
    console.error('Failed to send contact email via Resend:', error);
    return { sent: false, reason: 'send_failed' };
  }
}

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, company } = req.body;

    // Basic validation (you can improve with zod in future)
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Honeypot check
    if (company && company.length > 0) {
      return res.json({ success: true, message: 'Message received. Thank you!' });
    }

    // Get IP and user agent
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
               req.headers['x-real-ip'] || 
               req.ip || 
               'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Save to MongoDB
    const savedMessage = await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      ip,
      userAgent,
    });

    // Send email (non-blocking for response)
    sendContactEmailNotification({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    }).catch(console.error);

    console.log(`✅ Contact message saved (id: ${savedMessage._id}) from ${email}`);

    return res.json({
      success: true,
      message: 'Thank you! Your message has been received. I will get back to you soon.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again or email me directly.',
    });
  }
});

export default router;
