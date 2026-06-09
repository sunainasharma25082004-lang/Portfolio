# Portfolio Backend (MERN)

Separate Express + MongoDB backend for the developer portfolio.

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- Resend (for email notifications)
- CORS

## Features
- Contact form submissions (with honeypot + IP logging)
- Client review submissions (PENDING by default)
- Public approved reviews endpoint
- Admin panel APIs (approve/reject/delete reviews + view messages)

## Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your values in `.env`:
   - `MONGO_URI` (MongoDB Atlas recommended)
   - `ADMIN_TOKEN` (must match what you use in frontend)
   - `RESEND_API_KEY` (optional but recommended)
   - `OWNER_EMAIL`

3. **Run the backend**
   ```bash
   # Development (with nodemon)
   npm run dev

   # Production
   npm start
   ```

   Backend will run on **http://localhost:5000** by default.

## Connect with Frontend (Next.js)

In your Next.js `.env.local` (root), add:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

When you deploy:
- Deploy backend (Render, Railway, Vercel, etc.)
- Update `NEXT_PUBLIC_BACKEND_URL` to your deployed backend URL
- Update `ALLOWED_ORIGIN` in backend `.env`

## API Endpoints

### Public
| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| POST   | `/api/contact`            | Submit contact message          |
| POST   | `/api/reviews`            | Submit client review            |
| GET    | `/api/reviews/approved`   | Get approved reviews (public)   |

### Admin (require `?token=YOUR_ADMIN_TOKEN`)
| Method | Endpoint                       | Description                  |
|--------|--------------------------------|------------------------------|
| GET    | `/api/admin/messages`          | Get all contact messages     |
| GET    | `/api/admin/reviews`           | Get all reviews              |
| PUT    | `/api/admin/reviews/:id`       | Update status (APPROVED/REJECTED) |
| DELETE | `/api/admin/reviews/:id`       | Delete a review              |

## Admin Access
Visit your frontend admin page like before:
```
/admin?token=your_admin_token
```

The frontend will pass the token to backend APIs.

## Notes
- All reviews start as `PENDING` and only appear on the site after approval.
- Honeypot fields (`company` for contact, `website` for reviews) are supported.
- You can remove Prisma + SQLite completely once everything is migrated.

## Deploy Backend
Popular free options:
- Render.com (easiest for Node + Mongo)
- Railway.app
- Vercel (with some config)

Make sure to set all environment variables on your hosting platform.
