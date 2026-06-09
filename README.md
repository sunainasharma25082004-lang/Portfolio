# Developer Portfolio (MERN Stack)

Full-stack developer portfolio built with **Next.js (Frontend)** + **Node.js + Express + MongoDB (Backend)**.

## Architecture

- **Frontend**: Next.js 16 (App Router) + Tailwind + Framer Motion + TypeScript
- **Backend**: Express.js + Mongoose + MongoDB (proper MERN backend)
- Contact form + Client reviews system with admin approval flow

## Features

- Beautiful responsive portfolio
- Working Contact Form (saves to MongoDB + optional email via Resend)
- Client Review / Testimonial system (users submit → admin approves → appears on site)
- Protected Admin Dashboard (`/admin?token=xxx`)
- Honeypot anti-spam protection
- IP + User-Agent logging

---

## Quick Start (Development)

### 1. Install all dependencies (root + backend)

```bash
# Root (Next.js)
npm install

# Backend (Express + Mongo)
cd backend
npm install
cd ..
```

### 2. Setup Environment Variables

**Backend** (most important):

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI, ADMIN_TOKEN, RESEND_API_KEY etc.
```

**Frontend** — create/edit `.env.local` in project root:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
# Optional: ADMIN_TOKEN=your_token   (only if you want to expose it to client)
```

### 3. Run both servers

```bash
# Terminal 1 - Backend (Express + MongoDB)
cd backend
npm run dev

# Terminal 2 - Frontend (Next.js)
npm run dev
```

Visit:
- Portfolio → http://localhost:3000
- Admin → http://localhost:3000/admin?token=YOUR_ADMIN_TOKEN

---

## Backend API (MERN)

Backend runs on port **5000** by default.

See full details in [backend/README.md](./backend/README.md)

Key endpoints:

| Method | Path                        | Auth     | Description                     |
|--------|-----------------------------|----------|---------------------------------|
| POST   | `/api/contact`              | Public   | Submit contact form             |
| POST   | `/api/reviews`              | Public   | Submit review (PENDING)         |
| GET    | `/api/reviews/approved`     | Public   | Get testimonials                |
| GET    | `/api/admin/messages`       | Token    | All contact messages            |
| GET    | `/api/admin/reviews`        | Token    | All reviews                     |
| PUT    | `/api/admin/reviews/:id`    | Token    | Approve or Reject               |
| DELETE | `/api/admin/reviews/:id`    | Token    | Delete review                   |

---

## Database (MongoDB)

- Use **MongoDB Atlas** (free tier recommended)
- Put your connection string in `backend/.env` as `MONGO_URI`

---

## Admin Panel

1. Set a strong `ADMIN_TOKEN` in `backend/.env`
2. Go to `http://localhost:3000/admin?token=your_token`
3. You can approve/reject/delete reviews from there

---

## Deployment

### Backend (Express)
Recommended platforms:
- **Render** (easiest)
- Railway
- Vercel (Node server)

Remember to set all env vars + update `ALLOWED_ORIGIN`.

### Frontend (Next.js)
- Vercel (recommended)
- Update `NEXT_PUBLIC_BACKEND_URL` to your deployed backend URL

---

## Tech Stack

**Frontend**
- Next.js 16 + TypeScript
- Tailwind CSS + shadcn/ui style
- Framer Motion

**Backend (MERN)**
- Node.js + Express
- MongoDB + Mongoose
- Resend (emails)
- CORS

---

## Migration Notes (from old Prisma version)

- Old SQLite + Prisma backend has been replaced with proper **Express + MongoDB**.
- All data is now stored in MongoDB.
- You can safely delete `prisma/`, `dev.db`, and remove Prisma from root `package.json` once you're happy.

---

Made with ❤️ for a proper full-stack MERN experience.
