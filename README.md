# Developer Portfolio

Modern full-stack developer portfolio built with **Next.js 16 (App Router)** + **Prisma + PostgreSQL**.

> The old separate Express + Mongo backend has been consolidated into the Next.js app for much simpler deployment.

## Architecture (Production Ready)

- **Frontend + Backend**: Single Next.js app (App Router + Server Actions + API Routes)
- **Database**: Prisma + PostgreSQL (perfect for Render)
- Contact form + Client reviews (with admin approval)
- Protected Admin Dashboard (`/admin?token=xxx`)
- Email notifications via Resend (optional but recommended)
- Honeypot anti-spam + basic logging

## Features

- Beautiful responsive portfolio (mobile-first)
- Working Contact Form (saved to DB + email notification)
- Client Review system (submit → pending → admin approve → live on site)
- Admin panel for managing messages & reviews
- Production-ready setup for **Render**

---

## Local Development

```bash
npm install
```

### Environment

```bash
cp .env.example .env.local
```

Fill the important ones:

```env
DATABASE_URL="postgresql://..."     # Use local Postgres or Neon/Supabase for local
RESEND_API_KEY=...
OWNER_EMAIL=your@email.com
ADMIN_TOKEN=your-strong-random-token
```

### Run

```bash
npm run dev
```

Admin: `http://localhost:3000/admin?token=YOUR_ADMIN_TOKEN`

> Note: After switching to Postgres, run `npm run db:migrate` (or `npx prisma migrate dev`) once.

---

## Deploy to Render (Recommended - Very Easy)

This project includes a `render.yaml` Blueprint so you can deploy in minutes.

### Steps:

1. **Push your code** to GitHub (make sure `render.yaml`, `.env.example`, updated `package.json` are committed).

2. Go to [Render Dashboard → Blueprints](https://dashboard.render.com/blueprints) and connect your GitHub repo.

3. Render will detect `render.yaml` and create:
   - A **Web Service** (your Next.js app)
   - A **free PostgreSQL** database
   - Automatically injects `DATABASE_URL`

4. **After first deploy**, go to your web service → **Environment** and add these secrets:
   - `RESEND_API_KEY`
   - `OWNER_EMAIL`
   - `ADMIN_TOKEN` (generate a strong one)

5. Trigger a manual deploy (or push a commit). On build it will run:
   - `prisma generate`
   - `prisma migrate deploy`
   - `next build`

6. Your site will be live at `https://your-service.onrender.com`

7. Access admin: `https://your-service.onrender.com/admin?token=YOUR_ADMIN_TOKEN`

### One-command friendly

Because of `render.yaml` + `postinstall` + correct build script, deploying is now very reliable.

---

## Environment Variables (Production)

See the well-commented [.env.example](.env.example) file.

### Required variables:

| Variable          | Required     | Description |
|-------------------|--------------|-----------|
| `DATABASE_URL`    | Yes          | PostgreSQL connection (auto-provided by Render when using `render.yaml`) |
| `OWNER_EMAIL`     | Yes          | Email where contact form & new reviews are sent |
| `ADMIN_TOKEN`     | Yes          | Secret token for admin access (`/admin?token=...`) |
| `RESEND_API_KEY`  | Recommended  | For sending email notifications (fallback to console if missing) |

**How to generate a strong ADMIN_TOKEN:**
- Windows (PowerShell): `[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))`
- Or use any password generator (32+ characters recommended)

---

## Useful Commands

```bash
npm run build                 # Production build (runs prisma migrate deploy)
npm run db:studio             # Browse your database
npm run db:migrate:deploy     # Apply migrations (done automatically on Render build)
```

---

## Admin Panel

1. Set a strong `ADMIN_TOKEN`
2. Visit `https://your-site.onrender.com/admin?token=your_token`

You can approve/reject/delete reviews and view all contact messages.

---

## Notes / Cleanup

- The old `backend/` folder (Express + Mongoose + Mongo) is kept only for reference. Everything now runs inside the Next.js app using Prisma + PostgreSQL.
- Old `dev.db` (SQLite) is no longer used.
- All data (contacts + reviews) now lives in PostgreSQL.

---

## Tech Stack

**Next.js 16** • TypeScript • **Prisma** • **PostgreSQL** • Tailwind • Framer Motion • Resend • Render

Ready for easy production deployment on Render! 🚀
- CORS

---

## Migration Notes (from old Prisma version)

- Old SQLite + Prisma backend has been replaced with proper **Express + MongoDB**.
- All data is now stored in MongoDB.
- You can safely delete `prisma/`, `dev.db`, and remove Prisma from root `package.json` once you're happy.

---

Made with ❤️ for a proper full-stack MERN experience.
