# Dessert Addiction — Admin CMS Plan

This is a large scope change. Before I start I want to confirm the architecture and a few decisions, because some requirements conflict with the current stack.

## Architecture

Current stack: TanStack Start on Cloudflare Workers (SSR). I'll keep that and add:

- **Cloudflare KV** (`SITE_CONTENT`) — single JSON blob under key `site` holding all editable content (branding, hero, about, menu, gallery, contact, social, faq, policies, order-form settings, email settings, WhatsApp).
- **Cloudflare R2** (`SITE_IMAGES`) — uploaded images (logo, hero, product photos, gallery, about). Served via a `/api/images/:key` server route that streams from R2.
- **Server routes** under `src/routes/api/`:
  - `GET  /api/content` — public, returns merged content (KV + defaults).
  - `POST /api/content` — admin-only, replaces content blob.
  - `POST /api/upload-image` — admin-only, multipart upload to R2, returns `{ url, key }`.
  - `POST /api/admin/login` — checks env credentials, sets signed HttpOnly session cookie.
  - `POST /api/admin/logout`.
  - `POST /api/order` — public, validates + emails the enquiry.
- **Auth**: `ADMIN_USERNAME` + `ADMIN_PASSWORD` + `SESSION_SECRET` env vars. Encrypted cookie via TanStack `useSession`. Timing-safe password compare. `/admin` route is gated server-side.
- **wrangler.jsonc**: add commented `kv_namespaces` and `r2_buckets` blocks with placeholders for the IDs/bucket name and clear comments where to paste them.

## Public site changes

- New **Order Enquiry Form** section on the homepage (anchor `#order`) with the requested fields (name, phone, email, pickup/delivery, date, products list with quantities, notes, T&C checkbox with editable label + link to `/policies#terms`). Submits to `/api/order`. Loading / success / error states with toast.
- **Product cards**: replace "Email Enquiry" button with **Order** button. Clicking it smooth-scrolls to `#order` and appends `{ product, quantity: 1 }` to the form's product list (shared store via a small Zustand or React context, or simpler: a window event + URL hash). Customers can edit/remove rows and add more.
- Hero CTA "Chat on WhatsApp" stays; floating WhatsApp button keeps the generic message. Admin can edit WhatsApp number; ordering through WhatsApp is not offered.
- All content (branding, hero, about, menu, gallery, contact, social, faq, policies) is loaded from `GET /api/content` via a root loader, with the current hard-coded `src/content/site.ts` values used as defaults when KV is empty. Existing layout, card design, palette, and homepage menu remain unchanged.
- Social icons hide when their URL is empty.
- Logo from KV drives navbar, footer, and favicon (via `<link rel="icon">` in root head).

## Admin panel (`/admin`)

- Login screen when no session cookie. After login, a tabbed dashboard:
  Branding · Hero · About · Menu · Gallery · Contact · Social · WhatsApp · FAQ · Policies · Order Form · Email.
- Each tab edits a slice of the content JSON. Menu and Gallery support add / edit / delete / reorder (drag handles with up/down buttons for simplicity) and image upload (POSTs to `/api/upload-image`, stores returned URL on the item).
- Top bar: "Save changes" (POSTs whole content blob), "Logout", unsaved-changes indicator.
- Not linked anywhere on the public site.

## Email delivery

The spec says "enquiries sent via email" but doesn't specify a provider. **Question for you below** — I need to know which to wire up. Default recommendation: **Lovable Emails** (built-in, no external account). Admin sets the destination email in the Email tab.

## Secrets I'll need

- `ADMIN_USERNAME`, `ADMIN_PASSWORD` — admin login (you provide).
- `SESSION_SECRET` — I'll auto-generate.
- Email provider key — depends on your answer below.

KV namespace ID and R2 bucket name: you create them in Cloudflare and paste the IDs into `wrangler.jsonc` at the marked spots; until then the site falls back to default content and uploads will fail with a clear message.

## Out of scope / clarifications

- No multi-admin, no audit log, no draft/publish — single content blob, save = live.
- Reordering uses up/down buttons (drag-and-drop adds significant code; can upgrade later).
- Existing `/menu`, `/gallery`, `/about`, `/faq`, `/contact`, `/reviews`, `/policies` routes stay and read from the same content source.

## Questions before I build

1. **Email provider** for order enquiries — Lovable Emails (recommended), Resend, or just `mailto:` opening the customer's email client?
2. **Admin credentials** — do you have a username/password in mind, or should I prompt for them via the secrets form?
3. **Reviews** — admin editing for the reviews/testimonials section too? (not in your list, but it's currently hard-coded)
