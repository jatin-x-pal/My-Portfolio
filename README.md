# Cinematic Portfolio (Next.js)

A one-page portfolio built with Next.js App Router and a cinematic amber/blue visual direction.

## Sections

- Hero
- About
- Projects
- Skills
- Testimonials
- Contact (direct links + working form)

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Contact Form Setup (Resend)

1. Copy `.env.example` to `.env.local`.
2. Fill in:
   - `RESEND_API_KEY`
   - `CONTACT_FROM_EMAIL`
   - `CONTACT_TO_EMAIL`
3. Restart the dev server.

The form posts to `POST /api/contact` and includes:
- input validation
- honeypot spam protection (`website` field)
- in-memory per-IP rate limit (5 requests per minute)

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.

## Replace Placeholder Content

Update project/testimonial data and social links in:

- `src/app/page.tsx`
