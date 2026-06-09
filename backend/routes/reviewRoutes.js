import express from 'express';
import Review from '../models/Review.js';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'aarav.sharma.dev@gmail.com';

// POST /api/reviews - Submit new review (always PENDING)
router.post('/', async (req, res) => {
  try {
    const { name, position, rating, review, email, website } = req.body;

    if (!name || !position || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: 'Name, position, rating and review are required',
      });
    }

    // Honeypot
    if (website && website.length > 0) {
      return res.json({ success: true, message: 'Thank you for your feedback!' });
    }

    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
               req.headers['x-real-ip'] || 
               req.ip || 
               'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    const savedReview = await Review.create({
      name: name.trim(),
      position: position.trim(),
      rating: Number(rating),
      review: review.trim(),
      email: email ? email.trim().toLowerCase() : null,
      ip,
      userAgent,
      status: 'PENDING',
    });

    console.log(`⭐ New review submitted (id: ${savedReview._id}) from ${name}`);

    // Optional email notification to owner
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey && OWNER_EMAIL) {
      try {
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: 'Portfolio Reviews <onboarding@resend.dev>',
          to: OWNER_EMAIL,
          subject: `⭐ New ${savedReview.rating}-star review from ${savedReview.name}`,
          html: `
            <p><strong>${savedReview.name}</strong> (${savedReview.position}) left a <strong>${savedReview.rating}★</strong> review:</p>
            <blockquote style="background:#f8f8f8;padding:12px;border-radius:8px;">${savedReview.review}</blockquote>
            <p>Status: <strong>PENDING</strong>. Please approve it from the admin panel.</p>
          `,
        });
      } catch (e) {
        console.log('Review email notification failed (non-critical)');
      }
    }

    return res.json({
      success: true,
      message: 'Thank you! Your review has been submitted and is awaiting approval.',
    });
  } catch (error) {
    console.error('Review submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit review. Please try again.',
    });
  }
});

// GET /api/reviews/approved - Public endpoint for testimonials
router.get('/approved', async (req, res) => {
  try {
    const approvedReviews = await Review.find({ status: 'APPROVED' })
      .sort({ createdAt: -1 })
      .lean();

    return res.json(approvedReviews);
  } catch (error) {
    console.error('Error fetching approved reviews:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
});

export default router;
