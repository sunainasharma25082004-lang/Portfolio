import express from 'express';
import ContactMessage from '../models/ContactMessage.js';
import Review from '../models/Review.js';

const router = express.Router();

// GET /api/admin/messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    res.json(messages);
  } catch (error) {
    console.error('Admin messages error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
});

// GET /api/admin/reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    res.json(reviews);
  } catch (error) {
    console.error('Admin reviews error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
});

// PUT /api/admin/reviews/:id  (approve or reject)
router.put('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'APPROVED' | 'REJECTED'

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const updated = await Review.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ success: true, review: updated });
  } catch (error) {
    console.error('Update review status error:', error);
    res.status(500).json({ success: false, message: 'Failed to update review' });
  }
});

// DELETE /api/admin/reviews/:id
router.delete('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Review.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete review' });
  }
});

// Optional: delete contact message
router.delete('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ContactMessage.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete message' });
  }
});

export default router;
