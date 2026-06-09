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

### Required variables (Render pe):

| Variable            | Required     | Kya hai? |
|---------------------|--------------|----------|
| `DATABASE_URL`      | Yes          | Postgres DB ka connection string (Render auto deta hai agar DB linked ho) |
| `OWNER_EMAIL`       | Yes          | Contact form aur reviews kahan bhejni hain (tumhara email) |
| `ADMIN_TOKEN`       | Yes          | Admin panel access ke liye secret token (`/admin?token=...`) |
| `RESEND_API_KEY`    | Recommended  | Email bhejne ke liye (Resend.com se lo, warna console mein log hoga) |

**ADMIN_TOKEN kaise banao (Windows):**
PowerShell mein ye command chalaao:
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Ya koi bhi strong random string (kam se kam 20-30 characters).

---

## Render Dashboard mein kya set karna hai (Manual Setup)

Agar tum **render.yaml** use nahi kar rahe ho aur service manually bana rahe ho, to ye exact values daalo:

### Build Command:
```
npm install && npm run build
```

### Start Command:
```
npm run start
```

### Pre-deploy Command (agar field dikhe to):
```
npx prisma migrate deploy
```

### Environment Variables (ye add karo):

1. **DATABASE_URL**  
   → Ye sabse important hai. Exact steps neeche diye hain. Service ka naam tumhare render.yaml ke hisaab se `sunaina-portfolio-db` hai.

**Super simple steps to get DATABASE_URL (copy-paste ye steps):**

1. Render dashboard kholo (https://dashboard.render.com).
2. Left side mein services ki list dekho. Ek service "sunaina-portfolio-db" hona chahiye (ye Postgres database hai, icon alag hoga).
3. Agar nahi dikh raha, to neeche "Blueprint apply" wala section dekho.
4. "sunaina-portfolio-db" pe click karo.
5. Upar tabs mein **Connect** naam ka tab dhundo aur click karo.
6. "Internal Database URL" likha hoga – uske saamne copy button (📋) pe click karo.
7. Poora string copy ho jayega (shuru hota hai postgres:// se).
8. Ab wapas apne web service "sunaina-portfolio" pe jao.
9. Left side **Environment** tab pe jao.
10. "Add Environment Variable" pe click.
11. Key mein likho: `DATABASE_URL`
12. Value mein jo link copy kiya tha, pura paste kar do.
13. Save kar do.

Agar "sunaina-portfolio-db" service hi nahi ban raha, to pehle code push karo GitHub pe, phir Blueprints section mein jaake apna repo select karke "Apply" karo render.yaml ka. DB khud ban jayega.  
   Agar DB linked hai to Render khud set kar deta hai.

2. **RESEND_API_KEY**  
   → Tumhara Resend API key (https://resend.com se lo)

3. **OWNER_EMAIL**  
   → `sunainasharma25082004@gmail.com`

4. **ADMIN_TOKEN**  
   → Upar wala strong token jo tune banaya

5. **NODE_ENV** (optional lekin achha hai)  
   → `production`

**Sabse best tarika:** `render.yaml` file use karo (Blueprint). Usme sab auto ho jata hai.

---

## Useful Commands

```bash
npm run build                 # Production build (prisma generate + next build)
npm run db:studio             # Browse your database
npm run db:migrate:deploy     # Apply migrations manually if needed
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
