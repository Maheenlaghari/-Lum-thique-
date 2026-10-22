# Aesthetique

A premium, editorial-style luxury skincare storefront built with Next.js, React and Tailwind CSS. The UI is fully built and driven by a single data layer, so it only needs a backend to go live.

> Theme provided by **undiegravity**

---

## Table of Contents
- [Features](#features)
- [Pages and Routes](#pages-and-routes)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Customizing Content](#customizing-content)
- [Backend Integration](#backend-integration)
- [API Endpoints](#api-endpoints)

---

## Features

**Storefront**
- Responsive layout from mobile to ultra-wide screens
- Desktop navigation with a slide-out drawer on tablet and mobile
- Hero showcase with two cards flush side by side
- Product marquee with direct navigation and quick-add
- "Inspired by Nature" editorial section with staggered photography
- Best-Sellers section: staggered 4-column grid with pastel cards, bag icon and name/price rows
- "Skin Care 2024" editorial collage with guide notes
- Seasonal skincare tips spotlight with model metadata pills
- Full-bleed lifestyle banner and a six-column footer with a brand watermark

**Commerce**
- Shop page with instant category filtering and white product cards
- Product detail pages with a multi-angle gallery, formulations and accordions
- Client-side shopping bag: drawer, image thumbnails, quantity stepper, promo codes and live subtotal
- Checkout page with a success screen, ready to connect to a backend
- Contact page with an inquiry form and showroom details

**Engineering**
- Data-driven content from one typed source
- Strict TypeScript and ESLint setup, with no UI library bloat

---

## Pages and Routes

| Route | Description |
| --- | --- |
| `/` | Home: hero, marquee, nature, best-sellers, editorial collage, tips, banner |
| `/shop` | Full catalog with category filters |
| `/product/[id]` | Product detail page |
| `/checkout` | Checkout form |
| `/checkout/success` | Order confirmation |
| `/about` | Brand story |
| `/contact` | Contact and inquiry form |
| `/api/v1/checkout` | Checkout API route (placeholder handler) |

---

## Tech Stack

| Technology | Version |
| --- | --- |
| Next.js | 16.4.2 |
| React / React DOM | 19.3.0 |
| Tailwind CSS | 4 |
| TypeScript | 5 |
| Lucide React | 1.x |

---

## Getting Started

**Prerequisites:** Node.js 20 or later.

```bash
# Install dependencies
npm install

# Start the dev server at http://localhost:3000
npm run dev

# Create a production build
npm run build

# Run the production build
npm start

# Lint
npm run lint
```

---

## Project Structure

```text
app/            Routes (home, shop, product, checkout, about, contact, api)
components/     UI sections (Header, HeroCards, BestSellers, EditorialCollage, CartDrawer, ...)
context/        CartContext: shopping bag state
data/           siteData.ts: all content, products and image paths
types/          Shared TypeScript types (site.ts)
public/assets/  Product and editorial images
```

---

## Customizing Content

All copy, products and images come from [`data/siteData.ts`](data/siteData.ts), typed by [`types/site.ts`](types/site.ts).

- **Images:** place files in `public/assets/` and reference them as `/assets/<file>`.
- **Products:** edit `allProducts`, `bestSellers` and `carouselProducts`.
- **Editorial collage:** edit the `editorial` block (`largeImage`, `topSecondaryImage`, `bottomSquareImage`, `bottomWideImageLeft`, `bottomWideImage`).

---

## Backend Integration

The frontend reads from `siteData`. To go live, replace those imports with `fetch` calls to the endpoints below, which keep the same shapes as the types in `types/site.ts`. The cart is held client-side in `CartContext`, so persisting it only requires pointing the cart actions at the cart endpoints.

---

## API Endpoints

Planned contract for a backend. Only `POST /api/v1/checkout` exists as a route in this repo.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/v1/site/header` | Navigation links and announcement text |
| GET | `/api/v1/hero/cards` | Hero cards, badges and media |
| GET | `/api/v1/products` | Catalog with category filtering |
| GET | `/api/v1/products/:id` | Product detail, reviews and pricing |
| GET | `/api/v1/products/featured` | Marquee recommendations |
| GET | `/api/v1/products/bestsellers` | Best-seller products and card colors |
| GET | `/api/v1/editorial/nature` | Nature section copy and media |
| GET | `/api/v1/editorial/skincare2024` | Editorial collage content and quotes |
| GET | `/api/v1/tips/seasonal` | Seasonal tips and spotlight product |
| POST | `/api/v1/contact` | Submit an inquiry or consultation request |
| POST | `/api/v1/cart/items` | Add an item to the cart |
| GET | `/api/v1/cart` | Get cart items and subtotal |
| DELETE | `/api/v1/cart/items/:id` | Remove an item from the cart |
| POST | `/api/v1/checkout` | Process order, address and payment |
| GET | `/api/v1/site/footer` | Footer columns, policy links and statement |
