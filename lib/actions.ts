'use server'

import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'
import { headers } from 'next/headers'

export type SubmitResult = 
  | { success: true; message: string }
  | { success: false; message: string; errors?: Record<string, string> };

export type SubmitReviewResult =
  | { success: true; message: string }
  | { success: false; message: string; errors?: Record<string, string> };

export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'sunainasharma25082004@gmail.com';

// ====================== CONTACT ======================
export async function submitContactMessage(formData: FormData): Promise<SubmitResult> {
  try {
    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim().toLowerCase();
    const subject = (formData.get('subject') as string)?.trim();
    const message = (formData.get('message') as string)?.trim();
    const company = (formData.get('company') as string)?.trim() || '';

    if (!name || !email || !subject || !message) {
      return { success: false, message: 'All fields are required' };
    }

    // Honeypot: if company filled, silently accept (bot)
    if (company.length > 0) {
      return { success: true, message: 'Message received. Thank you!' };
    }

    // Capture real client info
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               headersList.get('x-real-ip') ||
               'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
        ip,
        userAgent,
      },
    });

    // Send email notification (non-blocking)
    sendContactEmailNotification({ name, email, subject, message }).catch(console.error);

    return {
      success: true,
      message: 'Thank you! Your message has been received. I will get back to you soon.',
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again or email me directly.',
    };
  }
}

async function sendContactEmailNotification(data: { name: string; email: string; subject: string; message: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('📧 [Contact] New message (Resend not configured):', data);
    return;
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
  } catch (error) {
    console.error('Failed to send contact email via Resend:', error);
  }
}

// ====================== REVIEWS ======================
export async function submitReview(formData: FormData): Promise<SubmitReviewResult> {
  try {
    const name = (formData.get('name') as string)?.trim();
    const position = (formData.get('position') as string)?.trim();
    const ratingStr = formData.get('rating') as string;
    const reviewText = (formData.get('review') as string)?.trim();
    const email = (formData.get('email') as string)?.trim().toLowerCase() || null;
    const website = (formData.get('website') as string)?.trim() || '';

    if (!name || !position || !ratingStr || !reviewText) {
      return { success: false, message: 'Name, position, rating and review are required' };
    }

    const rating = Number(ratingStr);
    if (rating < 1 || rating > 5) {
      return { success: false, message: 'Rating must be between 1 and 5' };
    }

    // Honeypot
    if (website.length > 0) {
      return { success: true, message: 'Thank you for your feedback!' };
    }

    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               headersList.get('x-real-ip') ||
               'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    const savedReview = await prisma.review.create({
      data: {
        name,
        position,
        rating,
        review: reviewText,
        email,
        status: 'PENDING',
        ip,
        userAgent,
      },
    });

    // Optional email notification
    sendReviewEmailNotification(savedReview).catch(console.error);

    return {
      success: true,
      message: 'Thank you! Your review has been submitted and is awaiting approval.',
    };
  } catch (error) {
    console.error('Review submission error:', error);
    return {
      success: false,
      message: 'Failed to submit review. Please try again.',
    };
  }
}

async function sendReviewEmailNotification(review: any) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'Portfolio Reviews <onboarding@resend.dev>',
      to: OWNER_EMAIL,
      subject: `⭐ New ${review.rating}-star review from ${review.name}`,
      html: `
        <p><strong>${review.name}</strong> (${review.position}) left a <strong>${review.rating}★</strong> review:</p>
        <blockquote style="background:#f8f8f8;padding:12px;border-radius:8px;">${review.review}</blockquote>
        <p>Status: <strong>PENDING</strong>. Please approve it from the admin panel.</p>
      `,
    });
  } catch (e) {
    console.log('Review email notification failed (non-critical)');
  }
}

// Get approved reviews (used in Testimonials) - Server Action
export async function getApprovedReviews() {
  try {
    const approvedReviews = await prisma.review.findMany({
      where: { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    // Map to match what the frontend expects (compatible with old Mongo shape)
    return approvedReviews.map((r) => ({
      _id: r.id.toString(),
      name: r.name,
      position: r.position,
      rating: r.rating,
      review: r.review,
      email: r.email,
      status: r.status,
      createdAt: r.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching approved reviews:', error);
    return [];
  }
}

// ====================== ADMIN ACTIONS (Server Actions) ======================

export async function setReviewStatus(id: string, status: ReviewStatus, token: string) {
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
    return { success: false };
  }

  try {
    const reviewId = parseInt(id, 10);
    if (isNaN(reviewId)) return { success: false };

    await prisma.review.update({
      where: { id: reviewId },
      data: { status },
    });

    return { success: true };
  } catch (error) {
    console.error('setReviewStatus error:', error);
    return { success: false };
  }
}

export async function deleteReview(id: string, token: string) {
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
    return { success: false };
  }

  try {
    const reviewId = parseInt(id, 10);
    if (isNaN(reviewId)) return { success: false };

    await prisma.review.delete({
      where: { id: reviewId },
    });

    return { success: true };
  } catch (error) {
    console.error('deleteReview error:', error);
    return { success: false };
  }
}

// For admin dashboard - fetch all (protected by token check on page + actions)
export async function getAllReviewsForAdmin(token: string) {
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
    return [];
  }

  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return reviews.map((r) => ({
      _id: r.id.toString(),
      name: r.name,
      position: r.position,
      rating: r.rating,
      review: r.review,
      email: r.email,
      status: r.status,
      createdAt: r.createdAt.toISOString(),
      ip: r.ip,
      userAgent: r.userAgent,
    }));
  } catch {
    return [];
  }
}

export async function getAllMessagesForAdmin(token: string) {
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
    return [];
  }

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return messages.map((m) => ({
      _id: m.id.toString(),
      name: m.name,
      email: m.email,
      subject: m.subject,
      message: m.message,
      createdAt: m.createdAt.toISOString(),
      ip: m.ip,
      userAgent: m.userAgent,
    }));
  } catch {
    return [];
  }
}
