# 🛒 E-Commerce Frontend — Next.js + Tailwind CSS

A full-featured storefront and admin dashboard built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Firebase Authentication** — designed to consume the [ecommerce-api](https://github.com/him512350/ecommerce-api) NestJS backend.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [1. Create the Project](#1-create-the-project)
- [2. Install Dependencies](#2-install-dependencies)
- [3. Environment Variables](#3-environment-variables)
- [4. Directory Structure (MVC Pattern)](#4-directory-structure-mvc-pattern)
- [5. Routing Map](#5-routing-map)
- [6. API Reference Summary](#6-api-reference-summary)
- [7. Auth Strategy](#7-auth-strategy)
- [8. Development Workflow](#8-development-workflow)
- [9. Key Implementation Notes](#9-key-implementation-notes)
- [10. Scripts Reference](#10-scripts-reference)

---

## Prerequisites

| Requirement | Version |
|---|---|
| Node.js | >= 18.17.0 |
| npm | >= 9.x |
| Backend API running | `http://localhost:3000/api/v1` |
| Firebase project | Auth enabled (Email/Google) |

---

## 1. Create the Project

```bash
# Scaffold Next.js 14 with App Router, TypeScript, Tailwind, ESLint
npx create-next-app@latest ecommerce-frontend \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

# Enter the project directory
cd ecommerce-frontend
```

---

## 2. Install Dependencies

### Core Runtime Dependencies

```bash
npm install \
  firebase \
  axios \
  @tanstack/react-query \
  @tanstack/react-query-devtools \
  zustand \
  react-hook-form \
  @hookform/resolvers \
  zod \
  react-hot-toast \
  lucide-react \
  clsx \
  tailwind-merge \
  @stripe/stripe-js \
  @stripe/react-stripe-js \
  next-themes \
  swiper \
  react-image-gallery \
  date-fns
```

### Dev Dependencies

```bash
npm install -D \
  @types/node \
  @types/react \
  @types/react-dom \
  prettier \
  prettier-plugin-tailwindcss \
  eslint-config-prettier
```

### Full install (copy-paste single command)

```bash
npm install firebase axios @tanstack/react-query @tanstack/react-query-devtools zustand react-hook-form @hookform/resolvers zod react-hot-toast lucide-react clsx tailwind-merge @stripe/stripe-js @stripe/react-stripe-js next-themes swiper react-image-gallery date-fns && npm install -D prettier prettier-plugin-tailwindcss eslint-config-prettier
```

---

## 3. Environment Variables

Create a `.env.local` file in the project root:

```env
# ── Backend API ───────────────────────────────────────────────────────────────
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1

# ── Firebase ──────────────────────────────────────────────────────────────────
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# ── Stripe ────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# ── App ───────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_NAME=MyShop
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

---

## 4. Directory Structure (MVC Pattern)

This project follows a **Model–View–Controller** pattern adapted for Next.js App Router. Models are TypeScript types/schemas, Views are React Server/Client components, and Controllers are route handlers, server actions, and service functions.

```
ecommerce-frontend/
├── public/                          # Static assets
│   ├── images/
│   └── icons/
│
├── src/
│   │
│   ├── app/                         # 📁 Next.js App Router (Views + Route Controllers)
│   │   │
│   │   ├── (auth)/                  # Route group — authentication pages (no layout header)
│   │   │   ├── login/
│   │   │   │   └── page.tsx         # /login — Firebase email/Google sign-in
│   │   │   └── register/
│   │   │       └── page.tsx         # /register — Sign-up + profile sync
│   │   │
│   │   ├── (shop)/                  # Route group — customer-facing storefront
│   │   │   ├── layout.tsx           # Shared layout: Navbar + Footer
│   │   │   ├── page.tsx             # / — Home page (featured, categories, promotions)
│   │   │   │
│   │   │   ├── products/
│   │   │   │   ├── page.tsx         # /products — Browse + filter + paginate
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx     # /products/[slug] — Product detail + reviews
│   │   │   │
│   │   │   ├── categories/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx     # /categories/[id] — Category product listing
│   │   │   │
│   │   │   ├── search/
│   │   │   │   └── page.tsx         # /search?q=... — Full-text search results + facets
│   │   │   │
│   │   │   ├── cart/
│   │   │   │   └── page.tsx         # /cart — Cart summary, coupon, shipping, points
│   │   │   │
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx         # /checkout — Address, payment (Stripe Elements)
│   │   │   │
│   │   │   └── order-confirmation/
│   │   │       └── [orderId]/
│   │   │           └── page.tsx     # /order-confirmation/[id] — Post-purchase summary
│   │   │
│   │   ├── (account)/               # Route group — authenticated account pages
│   │   │   ├── layout.tsx           # Account sidebar layout
│   │   │   ├── account/
│   │   │   │   └── page.tsx         # /account — Profile overview
│   │   │   ├── account/orders/
│   │   │   │   ├── page.tsx         # /account/orders — Order history list
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx     # /account/orders/[id] — Order detail
│   │   │   ├── account/addresses/
│   │   │   │   └── page.tsx         # /account/addresses — Manage addresses
│   │   │   └── account/points/
│   │   │       └── page.tsx         # /account/points — Points balance + history
│   │   │
│   │   ├── (admin)/                 # Route group — admin dashboard (role-gated)
│   │   │   ├── layout.tsx           # Admin sidebar + topbar layout
│   │   │   ├── admin/
│   │   │   │   └── page.tsx         # /admin — Dashboard overview + stats
│   │   │   ├── admin/products/
│   │   │   │   ├── page.tsx         # /admin/products — Product list + search
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx     # /admin/products/new — Create product form
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx     # /admin/products/[id] — Edit product
│   │   │   ├── admin/categories/
│   │   │   │   └── page.tsx         # /admin/categories — Category CRUD
│   │   │   ├── admin/orders/
│   │   │   │   ├── page.tsx         # /admin/orders — All orders + status filter
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx     # /admin/orders/[id] — Order detail + status update
│   │   │   ├── admin/users/
│   │   │   │   └── page.tsx         # /admin/users — User list
│   │   │   ├── admin/inventory/
│   │   │   │   └── page.tsx         # /admin/inventory — Stock management
│   │   │   ├── admin/coupons/
│   │   │   │   └── page.tsx         # /admin/coupons — Coupon CRUD
│   │   │   ├── admin/promotions/
│   │   │   │   └── page.tsx         # /admin/promotions — Promotion engine rules
│   │   │   └── admin/shipping/
│   │   │       └── page.tsx         # /admin/shipping — Shipping zones + methods
│   │   │
│   │   ├── api/                     # Next.js Route Handlers (server-side proxy / webhooks)
│   │   │   └── health/
│   │   │       └── route.ts         # GET /api/health — frontend health check
│   │   │
│   │   ├── layout.tsx               # Root layout — Providers wrapper
│   │   ├── not-found.tsx            # Global 404 page
│   │   ├── error.tsx                # Global error boundary
│   │   └── globals.css              # Tailwind base + CSS variables
│   │
│   ├── components/                  # 📁 Reusable UI Components (View layer)
│   │   │
│   │   ├── ui/                      # Primitive / atomic components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── Select.tsx
│   │   │   └── Toast.tsx
│   │   │
│   │   ├── layout/                  # Page structure components
│   │   │   ├── Navbar.tsx           # Top navigation + cart icon + auth menu
│   │   │   ├── Footer.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── AccountSidebar.tsx
│   │   │
│   │   ├── products/                # Product-domain components
│   │   │   ├── ProductCard.tsx      # Grid card with image, price, rating
│   │   │   ├── ProductGrid.tsx      # Responsive grid wrapper
│   │   │   ├── ProductFilter.tsx    # Sidebar filters (category, price, type)
│   │   │   ├── ProductImageGallery.tsx
│   │   │   ├── ProductVariantSelector.tsx
│   │   │   ├── ProductReviews.tsx
│   │   │   └── AddToCartButton.tsx
│   │   │
│   │   ├── cart/                    # Cart components
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx      # Subtotal, discount, shipping, total
│   │   │   ├── CouponInput.tsx
│   │   │   ├── ShippingMethodSelector.tsx
│   │   │   └── PointsRedemption.tsx
│   │   │
│   │   ├── checkout/                # Checkout components
│   │   │   ├── AddressForm.tsx
│   │   │   ├── AddressSelector.tsx
│   │   │   └── StripePaymentForm.tsx
│   │   │
│   │   ├── orders/                  # Order components
│   │   │   ├── OrderCard.tsx
│   │   │   ├── OrderStatusBadge.tsx
│   │   │   └── OrderItemList.tsx
│   │   │
│   │   ├── auth/                    # Auth components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── GoogleSignInButton.tsx
│   │   │
│   │   ├── search/                  # Search components
│   │   │   ├── SearchBar.tsx        # Autocomplete search input
│   │   │   └── SearchFacets.tsx     # Category/price/type facet filters
│   │   │
│   │   └── home/                    # Homepage sections
│   │       ├── HeroBanner.tsx
│   │       ├── FeaturedProducts.tsx
│   │       ├── CategoryGrid.tsx
│   │       └── PromoBanner.tsx
│   │
│   ├── lib/                         # 📁 Model + Controller: API clients, Firebase, utilities
│   │   │
│   │   ├── api/                     # API service layer (Controller: data fetching)
│   │   │   ├── client.ts            # Axios instance with Firebase token interceptor
│   │   │   ├── auth.api.ts          # GET /auth/me, POST /auth/sync
│   │   │   ├── products.api.ts      # CRUD + slug + query
│   │   │   ├── categories.api.ts    # CRUD categories
│   │   │   ├── cart.api.ts          # Cart, coupon, shipping, points endpoints
│   │   │   ├── orders.api.ts        # Create order, list, get by ID
│   │   │   ├── payments.api.ts      # Create Stripe PaymentIntent
│   │   │   ├── users.api.ts         # Profile, addresses
│   │   │   ├── reviews.api.ts       # Submit + list reviews
│   │   │   ├── search.api.ts        # Search + suggest
│   │   │   ├── inventory.api.ts     # Admin: stock levels
│   │   │   ├── coupons.api.ts       # Admin: coupon CRUD
│   │   │   ├── promotions.api.ts    # Admin: promotion rules
│   │   │   ├── shipping.api.ts      # Admin: zones + methods
│   │   │   └── points.api.ts        # Points balance + history
│   │   │
│   │   ├── firebase/                # Firebase SDK setup
│   │   │   ├── config.ts            # initializeApp with env vars
│   │   │   └── auth.ts              # signIn, signOut, onAuthStateChanged helpers
│   │   │
│   │   ├── hooks/                   # React Query + Zustand hooks (Controller)
│   │   │   ├── useAuth.ts           # Firebase auth state + backend user sync
│   │   │   ├── useProducts.ts       # useQuery: product list, single product
│   │   │   ├── useCategories.ts
│   │   │   ├── useCart.ts           # useQuery + useMutation for all cart ops
│   │   │   ├── useOrders.ts
│   │   │   ├── useSearch.ts         # Debounced search + suggestions
│   │   │   ├── useReviews.ts
│   │   │   ├── usePoints.ts
│   │   │   └── useAddresses.ts
│   │   │
│   │   ├── store/                   # Zustand global state (Model)
│   │   │   ├── useAuthStore.ts      # { user, firebaseUser, isLoading }
│   │   │   └── useCartStore.ts      # Optimistic cart state + item count
│   │   │
│   │   ├── types/                   # TypeScript types/interfaces (Model)
│   │   │   ├── product.types.ts     # Product, ProductVariant, ProductImage, BundleConfig
│   │   │   ├── category.types.ts    # Category (tree structure)
│   │   │   ├── cart.types.ts        # Cart, CartItem, CartPricing
│   │   │   ├── order.types.ts       # Order, OrderItem, OrderStatus, PaymentStatus
│   │   │   ├── user.types.ts        # User, Address, UserRole
│   │   │   ├── review.types.ts      # Review
│   │   │   ├── coupon.types.ts      # Coupon, CouponType
│   │   │   ├── promotion.types.ts   # Promotion, PromotionCondition, PromotionAction
│   │   │   ├── shipping.types.ts    # ShippingMethod, ShippingZone, ShippingRate
│   │   │   ├── points.types.ts      # UserPoints, PointsTransaction
│   │   │   ├── search.types.ts      # SearchResult, SearchFacets, Suggestion
│   │   │   └── api.types.ts         # Shared: PaginatedResponse, ApiResponse<T>
│   │   │
│   │   ├── schemas/                 # Zod validation schemas (Model)
│   │   │   ├── auth.schema.ts       # loginSchema, registerSchema
│   │   │   ├── address.schema.ts    # addressSchema
│   │   │   ├── checkout.schema.ts   # checkoutSchema
│   │   │   ├── review.schema.ts     # reviewSchema
│   │   │   └── product.schema.ts    # Admin: createProductSchema, updateProductSchema
│   │   │
│   │   └── utils/                   # Pure utility functions
│   │       ├── currency.ts          # formatCurrency(amount, currency?)
│   │       ├── cn.ts                # clsx + tailwind-merge helper
│   │       ├── slug.ts              # generateSlug(name)
│   │       └── date.ts              # formatDate(date)
│   │
│   ├── providers/                   # 📁 React Context Providers
│   │   ├── QueryProvider.tsx        # TanStack Query client + devtools
│   │   ├── AuthProvider.tsx         # Firebase onAuthStateChanged → sync to backend
│   │   ├── ThemeProvider.tsx        # next-themes dark/light mode
│   │   └── StripeProvider.tsx       # Stripe Elements wrapper
│   │
│   └── middleware.ts                # Next.js middleware — protect /account/* and /admin/*
│
├── .env.local                       # Environment variables (not committed)
├── .env.example                     # Template for environment variables
├── .gitignore
├── next.config.ts                   # Image domains, redirects
├── tailwind.config.ts               # Theme tokens, font, colors
├── tsconfig.json
├── postcss.config.js
├── prettier.config.js
├── eslint.config.mjs
└── README.md
```

---

## 5. Routing Map

| URL Pattern | Component / Page | Auth Required | Role |
|---|---|---|---|
| `/` | Home page | No | — |
| `/login` | Login page | No | — |
| `/register` | Register page | No | — |
| `/products` | Product listing | No | — |
| `/products/[slug]` | Product detail | No | — |
| `/categories/[id]` | Category listing | No | — |
| `/search` | Search results | No | — |
| `/cart` | Cart page | Yes | Customer |
| `/checkout` | Checkout + payment | Yes | Customer |
| `/order-confirmation/[id]` | Order success | Yes | Customer |
| `/account` | Profile overview | Yes | Customer |
| `/account/orders` | Order history | Yes | Customer |
| `/account/orders/[id]` | Order detail | Yes | Customer |
| `/account/addresses` | Address manager | Yes | Customer |
| `/account/points` | Points & rewards | Yes | Customer |
| `/admin` | Admin dashboard | Yes | Admin/SuperAdmin |
| `/admin/products` | Product list | Yes | Admin/SuperAdmin |
| `/admin/products/new` | Create product | Yes | Admin/SuperAdmin |
| `/admin/products/[id]` | Edit product | Yes | Admin/SuperAdmin |
| `/admin/categories` | Category CRUD | Yes | Admin/SuperAdmin |
| `/admin/orders` | All orders | Yes | Admin/SuperAdmin |
| `/admin/orders/[id]` | Order + status | Yes | Admin/SuperAdmin |
| `/admin/users` | User list | Yes | Admin/SuperAdmin |
| `/admin/inventory` | Stock manager | Yes | Admin/SuperAdmin |
| `/admin/coupons` | Coupon manager | Yes | Admin/SuperAdmin |
| `/admin/promotions` | Promotion rules | Yes | Admin/SuperAdmin |
| `/admin/shipping` | Shipping config | Yes | Admin/SuperAdmin |

---

## 6. API Reference Summary

All requests to the backend are prefixed with `/api/v1`. The backend runs on port `3000` by default.

### Authentication

The backend uses **Firebase Authentication**. Every protected request must include the Firebase ID token:

```
Authorization: Bearer <firebase_id_token>
```

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/auth/me` | Get current user (auto-provisions on first login) |
| `POST` | `/auth/sync` | Sync profile (name, phone, birthday) after registration |

### Products

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/products` | List products (query: `q`, `categoryId`, `minPrice`, `maxPrice`, `productType`, `isFeatured`, `sortBy`, `page`, `limit`) | No |
| `GET` | `/products/:id` | Get product by UUID | No |
| `GET` | `/products/slug/:slug` | Get product by slug | No |
| `POST` | `/products` | Create product | Admin |
| `PATCH` | `/products/:id` | Update product | Admin |
| `DELETE` | `/products/:id` | Soft-delete product | Admin |

### Categories

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/categories` | List all top-level categories with children | No |
| `GET` | `/categories/:id` | Get single category | No |
| `POST` | `/categories` | Create category | Admin |
| `PATCH` | `/categories/:id` | Update category | Admin |
| `DELETE` | `/categories/:id` | Delete category | Admin |

### Search

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/search?q=...` | Full-text search with facets (`sortBy`, `minPrice`, `maxPrice`, `categoryId`, `productType`, `isFeatured`) | No |
| `GET` | `/search/suggest?q=...` | Autocomplete suggestions (min 2 chars) | No |

### Cart

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/cart?country=HK` | Get cart with live pricing + shipping options | Yes |
| `POST` | `/cart/items` | Add item (`productId`, `variantId?`, `quantity`) | Yes |
| `PATCH` | `/cart/items/:itemId` | Update quantity (0 = remove) | Yes |
| `DELETE` | `/cart/items/:itemId` | Remove item | Yes |
| `DELETE` | `/cart` | Clear entire cart | Yes |
| `POST` | `/cart/coupon` | Apply coupon code | Yes |
| `DELETE` | `/cart/coupon` | Remove coupon | Yes |
| `POST` | `/cart/shipping` | Select shipping method | Yes |
| `DELETE` | `/cart/shipping` | Clear shipping selection | Yes |
| `POST` | `/cart/points` | Redeem loyalty points | Yes |
| `DELETE` | `/cart/points` | Cancel points redemption | Yes |

### Orders

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/orders` | Create order from cart (checkout) | Yes |
| `GET` | `/orders` | List current user's orders | Yes |
| `GET` | `/orders/:id` | Get order detail | Yes |
| `GET` | `/orders/admin` | List all orders (admin) | Admin |
| `PATCH` | `/orders/:id/status` | Update order status | Admin |

### Payments

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/payments/create-intent` | Create Stripe PaymentIntent for an order | Yes |
| `POST` | `/payments/webhook/stripe` | Stripe webhook (no JWT — signature verified) | No |

### Users

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/users/me` | Get own profile | Yes |
| `PATCH` | `/users/me` | Update own profile | Yes |
| `GET` | `/users` | List all users | Admin |
| `GET` | `/users/:id` | Get user by ID | Admin |
| `DELETE` | `/users/:id` | Soft-delete user | Admin |
| `POST` | `/users/me/addresses` | Add address | Yes |
| `GET` | `/users/me/addresses` | List own addresses | Yes |
| `DELETE` | `/users/me/addresses/:addressId` | Delete address | Yes |

### Reviews

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/reviews` | Submit review (`productId`, `rating`, `title`, `body`) | Yes |
| `GET` | `/reviews/products/:productId` | List reviews for a product | No |
| `DELETE` | `/reviews/:id` | Delete review (own or admin) | Yes |

### Points

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/points/me` | Get balance + transaction history | Yes |
| `GET` | `/points/config` | Get points earn/redeem config | Yes |
| `GET` | `/points/admin` | Admin: all user points | Admin |

### Inventory

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/inventory` | List inventory (by product/variant) | Admin |
| `PATCH` | `/inventory/:id` | Update stock quantity | Admin |

### Coupons

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/coupons` | List all coupons | Admin |
| `POST` | `/coupons` | Create coupon | Admin |
| `PATCH` | `/coupons/:id` | Update coupon | Admin |
| `DELETE` | `/coupons/:id` | Delete coupon | Admin |

### Shipping (Admin)

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/shipping/zones` | List zones | Admin |
| `POST` | `/shipping/zones` | Create zone | Admin |
| `GET` | `/shipping/methods` | List methods | Admin |
| `POST` | `/shipping/methods` | Create method | Admin |

---

## 7. Auth Strategy

Authentication follows this exact flow:

```
User signs in via Firebase (Email or Google)
        ↓
Firebase returns ID Token (JWT, ~1 hour TTL)
        ↓
Frontend sends: GET /api/v1/auth/me
  Header: Authorization: Bearer <firebase_id_token>
        ↓
Backend (FirebaseAuthGuard) verifies token via Firebase Admin SDK
  → On first login: creates user row in DB automatically
  → Attaches user entity to request
        ↓
Backend returns our DB user (with role, points, tier, etc.)
        ↓
Zustand authStore stores { firebaseUser, backendUser }
        ↓
Axios interceptor auto-attaches token to every request
  (token refreshed automatically by Firebase SDK)
```

### Role-Based Access

The backend defines three roles:

| Role | Value | Capabilities |
|---|---|---|
| Customer | `customer` | Cart, orders, profile, reviews, points |
| Admin | `admin` | + Product/category/coupon/order management |
| Super Admin | `super_admin` | + User management, all admin features |

The Next.js **middleware** (`src/middleware.ts`) reads the user's role from the Zustand store (via cookies) to protect `/admin/*` routes client-side. The backend enforces roles server-side on every request regardless.

---

## 8. Development Workflow

### Start development server

```bash
# Make sure backend is running on port 3000 first
npm run dev
# Frontend will be available at http://localhost:3001
```

### Configure port (optional)

Add to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -p 3001"
  }
}
```

### Type check

```bash
npx tsc --noEmit
```

### Lint + format

```bash
npm run lint
npx prettier --write .
```

---

## 9. Key Implementation Notes

### Axios Client with Firebase Token Interceptor

`src/lib/api/client.ts` must automatically attach the Firebase ID token to every request:

```typescript
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async (config) => {
  const user = getAuth().currentUser;
  if (user) {
    const token = await user.getIdToken(); // auto-refreshes if expired
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

### Backend Response Envelope

The backend wraps all responses in a `ResponseInterceptor`. Expect this shape:

```typescript
// Success
{ success: true, data: T, meta?: PaginationMeta }

// Error
{ success: false, message: string, statusCode: number }
```

Configure your Axios response interceptor to unwrap `data` automatically.

### Cart Country Code

The cart API requires a `country` query param (ISO 3166-1 alpha-2) to calculate applicable shipping rates. Default to `'HK'` as the backend is configured for Hong Kong. Pass the user's selected country from their shipping address.

### Stripe Payment Flow

1. User proceeds to checkout → call `POST /orders` to create the order
2. Call `POST /payments/create-intent` with `{ orderId }` → get `clientSecret`
3. Mount Stripe Elements with the `clientSecret`
4. User completes payment → Stripe fires webhook to `/payments/webhook/stripe`
5. Webhook updates order `paymentStatus` to `paid` and triggers email notifications

### Product Types

The backend supports three product types:

| Type | Description | Frontend handling |
|---|---|---|
| `simple` | Single SKU, no variants | Show price + Add to cart |
| `variable` | Multiple variants (size/color/etc.) | Show variant selector first |
| `bundle` | Grouped products (fixed/flexible/stepped) | Show bundle group selector |

### Search Autocomplete

Use the `/search/suggest` endpoint for the search bar dropdown. It requires a minimum of 2 characters and is cached on the backend for 30 seconds. Debounce client-side by 300ms to avoid excess requests.

### Points System

Users earn points on purchases based on admin-configured earn rates. Points can be redeemed during checkout via `POST /cart/points`. The exchange rate and max redemption per order are set in `/points/config`.

### Pagination

All list endpoints accept `page` (default: 1) and `limit` (default: 10). The response includes:

```typescript
interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

---

## 10. Scripts Reference

| Command | Description |
|---|---|
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | TypeScript type checking |
| `npx prettier --write .` | Format all files |

---

## Notes

- The backend Swagger documentation is available at `http://localhost:3000/docs` in development mode — use it to inspect exact request/response shapes for each endpoint.
- Image uploads handled by the backend's `/upload` module — use the returned URL in product `images` when creating/updating products.
- Birthday coupons are issued automatically by the backend cron — no frontend action required beyond collecting the user's `birthday` during profile sync.
- The backend CORS is configured to allow `http://localhost:3001` — ensure your dev server runs on that port.
