import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Routes
import contactRoutes from './routes/contactRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Middleware
import { protectAdmin } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ====================== MIDDLEWARE ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS - allow frontend
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

app.use(
  cors({
    origin: [allowedOrigin, 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  })
);

// ====================== DATABASE ======================
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error('❌ MONGO_URI is not defined in .env');
      process.exit(1);
    }

    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectDB();

// ====================== ROUTES ======================
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Backend API is running',
    version: '1.0.0',
    endpoints: {
      contact: 'POST /api/contact',
      reviews: 'POST /api/reviews | GET /api/reviews/approved',
      admin: 'GET /api/admin/messages?token=xxx | GET /api/admin/reviews?token=xxx',
    },
  });
});

// Public Routes
app.use('/api/contact', contactRoutes);
app.use('/api/reviews', reviewRoutes);

// Admin Routes (protected)
app.use('/api/admin', protectAdmin, adminRoutes);

// ====================== ERROR HANDLER ======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// ====================== START SERVER ======================
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📍 Allowed CORS origin: ${allowedOrigin}`);
});
