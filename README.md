# MONETIQ

A premium digital-product marketplace built with Next.js 16, TypeScript, Tailwind CSS, Supabase (auth + orders) and Cashfree (payments).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your keys
npm run dev
```

## Environment variables

See `.env.example`. You need:

- **Supabase** — create a project, run `supabase/schema.sql` in the SQL editor, then copy your project URL, anon key and service role key into `.env.local`.
- **Cashfree** — create a merchant account, get your sandbox (then production) Client ID and Client Secret, and set `CASHFREE_ENV=sandbox` while testing. In the Cashfree dashboard, point a webhook at `https://your-domain.com/api/cashfree/webhook`.
- `NEXT_PUBLIC_SITE_URL` — your deployed domain, used to build the Cashfree return URL.

The site runs and builds without any of these set — auth and payment screens will show a clear "not configured yet" message instead of crashing, so you can deploy first and wire up credentials after.

## What's real vs. what needs your input

- **Product artwork** — `/public/products/*.svg` are placeholder graphics generated for this build (no product photos were supplied). Swap them for real images before launch; `lib/products.ts` is the single place product data lives.
- **Legal pages** (`/terms`, `/privacy`, `/refund-policy`) — contain `[bracketed placeholders]` for your business name, address and support email. Fill these in; no legal entity details were invented.
- **Cashfree & Supabase** — the integration code is complete and follows the documented secure flow (server creates the order, webhook verifies payment, purchases are only granted after a `PAID` status is confirmed server-side). These haven't been tested against live Cashfree/Supabase endpoints in this environment — do a full sandbox test after adding your keys.
- **Contact form** — validates input and opens a pre-filled email in the user's mail client. No backend email-sending service is wired up (none was requested), so nothing is faked as "sent" server-side.

## Project structure

```
app/              routes (App Router)
components/       shared UI
lib/              product data, cart/wishlist/auth state, Supabase clients
public/products/  product artwork (placeholders — replace with real images)
supabase/         SQL schema for the orders table
```

## Build

```bash
npm run build
```

Verified passing with no TypeScript, lint, or build errors.
