# Hide Haven — Full Project Instructions

This document describes every file in the project, its purpose, and how it connects to
other files. Use this as a reference for future development.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Directory Tree](#directory-tree)
3. [Frontend (Next.js)](#frontend-nextjs)
4. [Backend (PHP REST API)](#backend-php-rest-api)
5. [Database](#database)
6. [Environment Variables](#environment-variables)
7. [Architecture & Data Flow](#architecture--data-flow)
8. [Deployment Notes](#deployment-notes)

---

## Project Overview

- **Brand:** Hide Haven — handcrafted full-grain leather goods in Bangladesh.
- **Frontend:** Next.js 14 (App Router) + TypeScript + plain CSS.
- **Backend:** Minimal PHP REST API (no framework) connecting to a shared MySQL database.
- **Domains:**
  - Frontend: https://hidehaven.me
  - API: https://api.hidehaven.me
- **Database:** `hidehave_database2` (MariaDB) — contains products, orders, hero images, banners, etc.
- **Source of truth for schema:** `hidehave_database2.sql` (the SQL dump).

---

## Directory Tree

```
project-root/
├── .env.local                    # Frontend env (NEXT_PUBLIC_API_BASE_URL)
├── .gitignore                    # Ignores node_modules, backend/, .env.local
├── app/
│   ├── globals.css               # All CSS (home, header/footer, shop, cart, responsive + all new pages)
│   ├── layout.tsx                # Root layout — wraps Providers, sets metadata/SEO
│   ├── page.tsx                  # Home page — hero, categories, customer favorites grid
│   ├── cart/
│   │   └── page.tsx              # Cart page (client) — localStorage cart, checkout form, order submission
│   ├── collections/
│   │   └── page.tsx              # Collections page (client) — category tabs, product grid, wishlist
│   ├── wishlist/
│   │   └── page.tsx              # Wishlist page (client) — saved items from localStorage
│   ├── artisans/
│   │   └── page.tsx              # Artisans page — brand story, craftsmanship, philosophy
│   ├── care-kits/
│   │   └── page.tsx              # Care Kits page — product kits, care tips, benefits
│   ├── shop/
│   │   ├── page.tsx              # Shop page — dynamic hero banner from #1 bestseller API data + ShopContent
│   │   ├── ShopContent.tsx       # Client component — search, category filter, sort, pagination
│   │   └── [slug]/
│   │       ├── page.tsx          # Product detail page (server) — API fetch, gallery, pricing, metadata
│   │       ├── ProductDetailClient.tsx  # Client component — add-to-cart, wishlist, quantity
│   │       ├── ProductDetailColors.tsx  # Client component — color swatch selector
│   │       └── ProductDetailGallery.tsx # Client component — thumbnail image gallery interaction
│   ├── lib/
│   │   └── api.ts                # Shared API lib — types, fetch helpers, URL resolvers
│   └── components/
│       ├── Header.tsx            # Site header (client) — search navigation, cart/wishlist counts from context
│       ├── Footer.tsx            # Site footer — links, newsletter signup
│       ├── CartContext.tsx       # Cart React context + localStorage persistence
│       ├── WishlistContext.tsx   # Wishlist React context + localStorage persistence
│       └── Providers.tsx         # Client wrapper combining CartProvider + WishlistProvider
├── backend/                      # PHP REST API (upload to api.hidehaven.me)
│   ├── .env.example              # Example env config
│   ├── README.md                 # API docs
│   ├── public/
│   │   ├── index.php             # Entry point — routes requests to controllers
│   │   └── .htaccess             # Rewrite all requests to index.php
│   └── src/
│       ├── bootstrap.php         # CORS, timezone, env loading
│       ├── db.php                # PDO connection + media_url helper
│       ├── env.php               # Minimal .env parser
│       ├── response.php          # json_response() helper
│       └── controllers/
│           ├── HeroController.php    # GET /api/hero-images
│           ├── BannerController.php  # GET /api/banners
│           ├── ProductController.php # GET /api/products, GET /api/products/{slug}
│           └── OrderController.php   # POST /api/orders
├── public/
│   └── images/                   # Static images — header icons, asset SVGs, shop images
├── database_schema_full.md       # Human-readable DB schema (slightly outdated)
├── hidehave_database2.sql        # Actual SQL dump (source of truth)
├── next.config.js                # Next.js config — reactStrictMode: true
├── package.json                  # Dependencies — next, react, react-dom, typescript
├── server.js                     # Custom Node.js HTTP server for production
└── tsconfig.json                 # TypeScript config — ES2017, bundler module resolution
```

---

## Frontend (Next.js)

### `app/layout.tsx`
- Root layout component. Wraps all pages in `<html>` and `<body>`.
- Imports `globals.css` so all styles are global.
- Sets `<title>` and `<meta>` for SEO.

### `app/page.tsx` — Home Page
- **Type:** Server Component (async function).
- **Purpose:** Renders hero banner, category grid, customer favorites product grid, trust section.
- **Data fetching (3 parallel calls):**
  - `GET /api/hero-images` → first active hero image.
  - `GET /api/banners` → first active banner text.
  - `GET /api/products?is_bestseller=1&limit=4` → featured products.
- **Environment variables used:**
  - `NEXT_PUBLIC_API_BASE_URL` (defaults to `https://api.hidehaven.me`).
  - `NEXT_PUBLIC_MEDIA_BASE_URL` (defaults to `https://hidehaven.me`).
- **Fallback:** If API calls fail, falls back to hardcoded `fallbackHero` and `fallbackProducts` arrays from local `/images/` assets.
- **Key helpers:**
  - `resolveImageUrl(path)` — prepends `MEDIA_BASE_URL` if path is relative.
  - `formatPrice(value)` — formats as `BDT X,XXX`.
  - `fetchJson<T>(path)` — generic fetch wrapper, returns `null` on error.

### `app/shop/page.tsx` — Shop Page
- **Type:** Server Component (async function).
- **Purpose:** Product catalog with sidebar filters, toolbar, product grid, pagination.
- **Data fetching:** `GET /api/products?is_bestseller=1&limit=12`.
- **Fallback:** Same pattern as home page — falls back to hardcoded products from `/images/shop/` when API is down.
- **Sidebar:** Static for now (categories and price range — not yet connected to API).
- **Pagination:** Static UI (buttons 1, 2, …, 12 — not yet wired to API pagination).

### `app/cart/page.tsx` — Cart Page
- **Type:** Client-like render (no async data fetching yet — currently client-rendered).
- **Purpose:** Displays cart items with quantity controls, order summary, promo code input, and "You may also love" recommendations.
- **Empty state toggle:** Controlled by `const hasItems = true/false`. When `false`, renders an empty-cart hero card with a CTA to `/shop`.
- **Future:** Should fetch cart from backend or localStorage and wire checkout to `POST /api/orders`.

### `app/collections/page.tsx` — Collections Placeholder
- Minimal placeholder page. Ready for category-based filtering or landing pages.

### `app/components/Header.tsx`
- **Props:**
  - `active?: "collections" | "bestsellers" | "artisans" | "care-kits"` — highlights the active nav link with orange underline.
  - `searchPlaceholder?: string` — custom placeholder (default: "Search premium leather…").
  - `cartCount?: number` — if provided, shows `Cart (N)`.
- **Navigation:** Logo links to `/`. Collections → `/collections`, Bestsellers → `/shop`, Artisans → `/artisans`, Care Kits → `/care-kits`.
- **Cart button** → links to `/cart` (an `<a>` tag, not a `<button>`).

### `app/components/Footer.tsx`
- Static footer with brand info, quick links, customer support columns, newsletter input, and copyright.

### `app/globals.css`
- **Single CSS file** — no CSS modules, no Tailwind.
- Contains styles for:
  - CSS custom properties (colors, shadows, borders).
  - Reset + base typography.
  - Site header (`.site-header`) and footer (`.site-footer`).
  - Home page: hero, buttons, category grid, product grid, trust section, reviews.
  - Shop page: breadcrumbs, hero, sidebar, toolbar, grid, cards, pagination, benefits.
  - Cart page: items grid, order summary, promo, support, recommendations, empty state.
  - Responsive breakpoints: 1100px (tablet) and 720px (mobile).

### Config Files

- **`next.config.js`:** Minimal — `reactStrictMode: true`.
- **`tsconfig.json`:** ES2017 target, strict mode, bundler module resolution, JSX preserve, Next.js plugin.
- **`package.json`:** Only `next`, `react`, `react-dom`, and TypeScript dev deps.
- **`server.js`:** Custom Node.js HTTP server (`node server.js`) for production — loads Next.js handler on configurable `PORT` (default 3000).

---

## Backend (PHP REST API)

All backend files are in the `backend/` directory, which is gitignored from the frontend repo.

### `backend/public/index.php` — Router
- Entry point. All requests are rewritten to this file via `.htaccess`.
- **Request flow:**
  1. `require __DIR__ . '/src/bootstrap.php'` (loads env, CORS, DB).
  2. Parse `$_SERVER['REQUEST_METHOD']` and `$_SERVER['REQUEST_URI']`.
  3. Match path against known routes, require the corresponding controller, call its function.
  4. If no route matches, return `404` JSON.
- **Routes:**
  - `GET /api/health` → inline response `{"status":"ok"}`.
  - `GET /api/hero-images` → `HeroController.php::hero_index()`.
  - `GET /api/banners` → `BannerController.php::banner_index()`.
  - `GET /api/products` → `ProductController.php::product_index()`.
  - `GET /api/products/{slug}` → `ProductController.php::product_show($slug)`.
  - `POST /api/orders` → `OrderController.php::order_store()`.

### `backend/public/.htaccess`
- Enables `RewriteEngine On`.
- Rewrites all requests to `index.php` so clean URLs work.

### `backend/src/bootstrap.php`
- Loads `env.php`, `response.php`, `db.php`.
- Calls `env_load()` to parse the `.env` file.
- Sets timezone from `APP_TIMEZONE` env var.
- Handles CORS:
  - Reads `CORS_ORIGINS` from env (comma-separated).
  - If the request `Origin` matches, sets `Access-Control-Allow-Origin` header.
  - Allows `GET, POST, OPTIONS` methods and `Content-Type, Authorization` headers.
  - Returns `204` for preflight `OPTIONS` requests.
- Sets `Content-Type: application/json`.

### `backend/src/env.php`
- `env_load(string $path)` — reads a `.env` file, parses `KEY=VALUE` lines into `$_ENV`.
- `env(string $key, ?string $default)` — reads `$_ENV[$key] ?? $_SERVER[$key] ?? $default`.

### `backend/src/db.php`
- `db(): PDO` — singleton PDO connection using `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS` from env.
- `media_url(?string $path): ?string` — converts a relative path (e.g. `/uploads/products/…`) to a full URL using `MEDIA_BASE_URL` from env. Used by controllers to return absolute image URLs.

### `backend/src/response.php`
- `json_response($data, int $status = 200)` — sets HTTP status code, outputs JSON, exits.

### `backend/src/controllers/HeroController.php`
- **`hero_index()`**:
  - Queries `hero_images` WHERE `active = 1 AND deleted_at IS NULL`, ordered by `sort_order`.
  - For each row, adds `image_full_url` by calling `media_url(image_path)`.
  - Returns `{"data": [...]}`.

### `backend/src/controllers/BannerController.php`
- **`banner_index()`**:
  - Queries `banners` WHERE `active = 1`, ordered by `sort_order`.
  - Returns `{"data": [...]}`.

### `backend/src/controllers/ProductController.php`
- **`product_index()`**:
  - Supports query params: `search`, `category`, `type`, `is_bestseller`, `is_featured`, `is_new`, `on_sale`, `sort` (`price_asc|price_desc|newest|sort_order`), `page`, `limit` (max 50).
  - Uses prepared statements with bound parameters for safety.
  - Returns:
    ```json
    {
      "data": [ {...}, ... ],
      "meta": { "page": 1, "limit": 12, "total": 28 }
    }
    ```
  - Each product row gets `image_full_url` via `media_url(image_url)`.
- **`product_show(string $slug)`**:
  - Queries a single product by `slug` (URL-friendly name).
  - Also queries `product_media` for the product's gallery images.
  - Returns:
    ```json
    {
      "data": { ... },
      "media": [ { "full_url": "...", ... } ]
    }
    ```
  - Returns `404` if slug not found.

### `backend/src/controllers/OrderController.php`
- **`order_store()`**:
  - Expects JSON body with `name`, `phone`, `address` (required), `email`, `delivery_area` (`dhaka`/`outside`), `note`, `delivery_fee`, and `items` array.
  - Validates required fields and item structure.
  - Calculates `subtotal` and `total`.
  - Uses a database transaction:
    1. Insert into `orders` with status `pending`.
    2. Insert each item into `order_items`.
  - Rolls back on failure.
  - Returns `201` with order ID and totals.

---

## Database

- **Name:** `hidehave_database2`
- **Engine:** MariaDB 11.4.10 via `localhost:3306`.
- **Frontend credentials:** Not used in frontend (all DB access is via the backend API).
- **Backend credentials:** Stored in `backend/.env` (gitignored).
- **Source of truth:** `hidehave_database2.sql` (the full SQL dump).
- **Schema reference doc:** `database_schema_full.md` (human-readable, may be slightly behind the SQL dump).

### Key Tables Used by API

| Table | Used by | Purpose |
|---|---|---|
| `hero_images` | HeroController | Home page hero slides |
| `banners` | BannerController | Home page banner/caption text |
| `products` | ProductController | Shop catalog + home page favorites |
| `product_media` | ProductController | Product gallery images (via slug endpoint) |
| `orders` | OrderController | Order creation |
| `order_items` | OrderController | Line items within each order |

---

## Environment Variables

### Frontend (`.env.local` — gitignored)

| Variable | Default | Notes |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | `https://api.hidehaven.me` | API server URL |
| `NEXT_PUBLIC_MEDIA_BASE_URL` | `https://hidehaven.me` | Image asset host |

### Backend (`backend/.env` — not committed)

| Variable | Example | Notes |
|---|---|---|
| `APP_ENV` | `production` | `local` or `production` |
| `APP_URL` | `https://api.hidehaven.me` | Used for self-referencing URLs |
| `APP_TIMEZONE` | `Asia/Dhaka` | PHP timezone |
| `DB_HOST` | `localhost` | MySQL host |
| `DB_PORT` | `3306` | MySQL port |
| `DB_NAME` | `hidehave_database2` | Database name |
| `DB_USER` | `hidehave_admin2` | Database user |
| `DB_PASS` | `TGK0aSS6vkWj` | Database password |
| `MEDIA_BASE_URL` | `https://hidehaven.me` | Base URL for image paths stored in DB |
| `CORS_ORIGINS` | `https://hidehaven.me,http://localhost:3000` | Comma-separated allowed origins |

---

## Change Tracking System

The project uses a **Context Manager agent** to automatically track and document every change made by agents. This ensures the context chain is never broken.

- **Agent file:** `context-manager.agent.md` (user-level, roams with VS Code settings)
- **Global instruction:** `.github/copilot-instructions.md` — mandates that all agents invoke the Context Manager after every change.
- **How it works:** After any agent creates, modifies, or deletes files, it MUST invoke the Context Manager as a subagent. The Context Manager detects all changes using `git diff`, reads the changed files, updates `instructions.md` (Directory Tree, descriptions, affected sections), and appends a dated entry to the **Change Log**.
- **Critical rule:** If the Context Manager is skipped after a change, future agents will have stale context. See `.github/copilot-instructions.md` for the full mandate.

---

## Architecture & Data Flow
      │
      ▼
  ┌─────────────────────────────────┐
  │      hidehaven.me (Next.js)     │
  │  ┌───────────────────────────┐  │
  │  │  Server Components        │  │
  │  │  fetch(API_BASE_URL + ...)│  │
  │  └──────────┬────────────────┘  │
  └─────────────┼───────────────────┘
                │ HTTPS
                ▼
  ┌─────────────────────────────────┐
  │  api.hidehaven.me (PHP API)     │
  │  public/index.php (router)      │
  │       │                         │
  │  ┌────┴──────────────┐          │
  │  │ Controllers       │          │
  │  │ ┌──────────────┐  │          │
  │  │ │ Hero/Banner  │  │          │
  │  │ │ Product      │  │          │
  │  │ │ Order        │  │          │
  │  │ └──────┬───────┘  │          │
  │  └────────┼──────────┘          │
  │           │                     │
  │  ┌────────┴──────────┐          │
  │  │ db.php (PDO)      │          │
  │  └────────┬──────────┘          │
  └───────────┼─────────────────────┘
              │
              ▼
  ┌─────────────────────────────────┐
  │  MySQL: hidehave_database2      │
  │  Tables: products, orders,      │
  │  hero_images, banners, etc.     │
  └─────────────────────────────────┘
```

### Key Design Decisions

1. **Frontend never touches DB credentials.** All DB access goes through the PHP API.
2. **Fallback data.** Every page has hardcoded fallback content so the site works visually even if the API is offline during development.
3. **Image URLs.** The API returns `image_full_url` (absolute URL via `MEDIA_BASE_URL`). The frontend prefers this, but falls back to `resolveImageUrl(path)` for local assets.
4. **CSS-only styling.** No Tailwind, no CSS-in-JS — all styles are in a single `globals.css` with CSS custom properties for theming.
5. **Server Components for data.** Initial data fetches happen in Server Components (`async` functions). Future interactive features (filter, search, pagination) should use client-side fetch with `useEffect` or a data fetching library.

---

## Deployment Notes

### Frontend (hidehaven.me)
1. Build: `npm run build`
2. Start: `node server.js` (or `npm start` which runs `node server.js`)
3. Set `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_MEDIA_BASE_URL` in the production environment.
4. Ensure `.env.local` is **not** committed (already gitignored).

### Backend (api.hidehaven.me)
1. Upload the `backend/` directory to the server. The domain's document root should point to `backend/public`.
2. Copy `backend/.env.example` to `backend/.env` and update with production values.
3. Ensure `.htaccess` with `RewriteEngine On` is present in the document root (critical for route handling).
4. Verify PHP has `pdo_mysql` and `mbstring` extensions enabled.
5. Verify that `backend/public/index.php` paths match the server folder structure:
   - If `index.php` is in the document root directly: use `require __DIR__ . '/src/bootstrap.php';`
   - If `index.php` is inside `public/`: use `require __DIR__ . '/../src/bootstrap.php';`
6. Test: `curl https://api.hidehaven.me/api/health` → `{"status":"ok"}`

### Common Deployment Issues
- **404 from LiteSpeed:** Document root not set to the folder containing `index.php` and `.htaccess`.
- **Composer openssl error:** PHP openssl extension missing — not required for this project (no Composer needed).
- **CORB/image blocking:** Ensure `MEDIA_BASE_URL` points to the frontend domain (hidehaven.me), not the API domain.
- **Frontend API timeout:** If the API is slow, the Next.js build may timeout during static generation. Use `cache: "no-store"` or configure `revalidate` timing.

---

## ✅ Completed Integrations

The following features from the original Future Development Notes have been implemented:

- ✅ **Cart persistence:** Cart items are stored in `localStorage` via `CartContext`. Checkout sends data to `POST /api/orders` with full validation.
- ✅ **Client-side filtering:** Shop page (`ShopContent.tsx`) supports category filter, search, sort (price, newest, default), and pagination via API.
- ✅ **Product detail page:** `app/shop/[slug]/page.tsx` fetches `GET /api/products/{slug}`, renders gallery, colors, pricing, and actions.
- ✅ **Wishlist:** Heart icon on product cards adds/removes items from `localStorage` via `WishlistContext`. Dedicated wishlist page at `/wishlist`.
- ✅ **Search:** Header search input navigates to `/shop?search=...` with results loaded via API.
- ✅ **Collections page:** Rewritten with category tabs, product grid, wishlist, and add-to-cart.
- ✅ **Artisans page:** Brand story page at `/artisans` with craftsmanship pillars and philosophy.
- ✅ **Care Kits page:** Product kits page at `/care-kits` with care tips and benefits.

## Future Development Notes

- **Auth:** Admin login routes are not implemented. Use the existing `admin_users` and `admin_activity_log` tables for future admin panel.

---

## Change Log

*New entries are added here whenever changes are made. Each entry documents what changed, when, and why.*

### 2026-05-23 — Full Frontend-Backend Integration
- Created `app/lib/api.ts` with shared types, fetch helpers, and API functions.
- Created `CartContext.tsx` and `WishlistContext.tsx` with localStorage persistence.
- Created `app/shop/[slug]/page.tsx` (product detail) with gallery, pricing, colors, client add-to-cart.
- Created `app/shop/ShopContent.tsx` with client-side filtering, search, sort, and pagination.
- Created `app/wishlist/page.tsx`, `app/artisans/page.tsx`, `app/care-kits/page.tsx`.
- Rewrote `app/cart/page.tsx` with localStorage cart, delivery area selector, checkout form, order submission via API.
- Rewrote `app/collections/page.tsx` with category tabs and API integration.
- Updated `Header.tsx` to client component with real-time cart/wishlist counts and search navigation.
- Updated `layout.tsx` with providers and SEO metadata.
- Updated all pages to use shared API lib and link to product detail pages.
- Added comprehensive new CSS for all new pages and responsive breakpoints.

### 2026-05-23 — Bug Fixes & Dynamic Hero Banner
- **Files changed:**
  - `app/shop/[slug]/page.tsx` — **Modified** — removed inline onClick handlers (server component cannot have them)
  - `app/shop/[slug]/ProductDetailColors.tsx` — **Created** — client component for color swatch selection
  - `app/shop/[slug]/ProductDetailGallery.tsx` — **Created** — client component for thumbnail image gallery interaction
  - `app/shop/page.tsx` — **Modified** — hero banner now dynamically renders the #1 bestseller product from API
- **Summary:** Fixed a 500 error on product detail pages caused by passing `onClick` handlers from a Server Component to DOM elements. Extracted thumbnail gallery and color swatch selectors into dedicated Client Components. Updated the shop page hero section to dynamically show the top bestseller product (image, badge, name, description, price, detail link) fetched from the API, with the next two bestsellers as side cards. Falls back to hardcoded content when API data is unavailable.

### 2026-05-23 — Cart Toast, Delivery Fee, COD Policy & Out-of-Stock Guard
- **Files changed:**
  - `app/components/CartContext.tsx` — **Modified** — added toast notification system; shows item name and total cart count on every add-to-cart, auto-dismisses after 3 seconds
  - `app/cart/page.tsx` — **Modified** — Dhaka delivery fee changed from free to BDT 60; added cash-on-delivery info and cancellation policy message in checkout form
  - `app/shop/ShopContent.tsx` — **Modified** — added stock check to add-to-cart buttons; out-of-stock items show "Out of Stock" badge and have disabled buttons
  - `app/collections/page.tsx` — **Modified** — same out-of-stock guard applied
  - `app/globals.css` — **Modified** — added styles for cart toast (slide-up animation), checkout info panel, out-of-stock badge
- **Summary:** Three improvements: (1) Cart toast notification appears on every add-to-cart showing product name and updated item count. (2) Dhaka delivery fee updated to BDT 60 (was free), and checkout form now explains cash-on-delivery with cancellation policy (pay only delivery charge). (3) Out-of-stock products can no longer be added to cart — buttons are disabled and an "Out of Stock" badge is shown on product cards.
