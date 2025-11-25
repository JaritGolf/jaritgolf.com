<!-- b707630a-eb89-421c-9ddc-8e48a94b34f1 4aa64b1e-d9e7-4546-b6a2-212a52d9fa94 -->
# Speed Machine Website - Complete Build Plan

## Technology Stack

- **Frontend**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Database**: PostgreSQL (via Supabase or Vercel Postgres)
- **Payments**: Stripe Checkout & Payment Intents
- **Deployment**: Netlify (with Next.js adapter)
- **Font**: Electromagnetic Lungs.otf (custom font)
- **Text**: use content.json
- **Most Important Thing**: Scroll-Based Interactions
## Project Structure

```
/
├── app/
│   ├── layout.tsx (root layout with font loading)
│   ├── page.tsx (homepage)
│   ├── product/
│   │   └── page.tsx (product page)
│   ├── cart/
│   │   └── page.tsx (cart page)
│   ├── checkout/
│   │   └── page.tsx (checkout page)
│   ├── api/
│   │   ├── cart/
│   │   │   └── route.ts (cart operations)
│   │   ├── checkout/
│   │   │   └── route.ts (Stripe checkout session)
│   │   ├── webhooks/
│   │   │   └── stripe/
│   │   │       └── route.ts (Stripe webhook handler)
│   │   └── orders/
│   │       └── route.ts (order management)
│   └── components/
│       ├── Hero.tsx (homepage hero with stacked text)
│       ├── ScrollSection.tsx (reusable scroll container)
│       ├── HorizontalScroll.tsx (horizontal scroll component)
│       ├── ProductCard.tsx
│       ├── Cart.tsx
│       └── ... (other components)
├── lib/
│   ├── db.ts (database connection)
│   ├── stripe.ts (Stripe client)
│   └── utils.ts
├── public/
│   ├── fonts/
│   │   └── ElectromagneticLungs.otf
│   └── images/ (optimized product images)
├── types/
│   └── index.ts (TypeScript types)
└── prisma/
    └── schema.prisma (database schema)
```

## Implementation Details

### 1. Project Setup & Configuration

- Initialize Next.js 14 with TypeScript
- Configure Tailwind CSS with custom theme
- Set up custom font loading for Electromagnetic Lungs
- Configure image optimization for product photos/videos
- Set up environment variables (.env.local)
- Configure Netlify adapter for deployment

### 2. Database Schema (Prisma)

- **Product**: id, name, price, description, images, specs
- **Order**: id, customerEmail, customerName, total, status, stripeSessionId, createdAt
- **OrderItem**: id, orderId, productId, quantity, price
- **Cart**: session-based (cookies/localStorage)

### 3. Homepage Components

**Hero Section** (`app/components/Hero.tsx`)

- Full-screen centered hero
- "MAKE MORE PUTTS" text stacked vertically
- Large typography using Electromagnetic Lungs font
- Scroll-triggered animations

**Problem Section** (`app/components/ProblemSection.tsx`)

- Three cards with scroll-reveal animations
- Parallax effects on scroll

**Solution Section** (`app/components/SolutionSection.tsx`)

- Value prop cards with hover effects
- Horizontal scroll container for cards

**Features Grid** (`app/components/FeaturesGrid.tsx`)

- 6-feature grid layout
- Scroll-linked animations

**Success Metrics** (`app/components/SuccessMetrics.tsx`)

- Animated stat counters on scroll into view
- Card-based layout

**Training Philosophy** (`app/components/TrainingPhilosophy.tsx`)

- Three philosophy cards
- Scroll-triggered content reveals

**CTA Section** (`app/components/CTASection.tsx`)

- Dual button layout
- Smooth scroll to product page

### 4. Interactive Scroll Elements

**HorizontalScroll Component** (`app/components/HorizontalScroll.tsx`)

- Native scroll-based horizontal scrolling
- Smooth momentum scrolling
- Intersection Observer for trigger points

**ScrollSection Component** (`app/components/ScrollSection.tsx`)

- Reusable wrapper for scroll-linked animations
- Parallax effects
- Fade-in/scale animations on scroll

### 5. Product Page

**Product Hero** (`app/product/page.tsx`)

- Full-width side product photo
- Price display ($499)
- Add to Cart button
- Find Demo Location button

**Product Details** (`app/components/ProductDetails.tsx`)

- Specs cards with icons
- Sticky sidebar for add to cart

**Training Programs** (`app/components/TrainingPrograms.tsx`)

- Three program cards
- Expandable details

### 6. E-commerce Functionality

**Cart System** (`app/cart/page.tsx`)

- Session-based cart (cookies)
- Quantity updates
- Remove items
- Proceed to checkout

**Checkout Flow** (`app/checkout/page.tsx`)

- Customer information form
- Stripe Checkout integration
- Order confirmation

**API Routes**:

- `POST /api/cart` - Add/update cart items
- `GET /api/cart` - Retrieve cart
- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/webhooks/stripe` - Handle Stripe webhooks
- `GET /api/orders` - Retrieve orders (admin)

### 7. Stripe Integration

**Checkout Session** (`lib/stripe.ts`)

- Create checkout session with product details
- Handle success/cancel URLs
- Store order metadata

**Webhook Handler** (`app/api/webhooks/stripe/route.ts`)

- Verify webhook signatures
- Handle payment_intent.succeeded
- Create order records in database
- Send confirmation emails (future enhancement)

### 8. Order Fulfillment

**Order Management** (`app/api/orders/route.ts`)

- Create orders from Stripe webhooks
- Retrieve orders by email/session
- Order status tracking

**Admin Dashboard** (Future phase)

- View all orders
- Update fulfillment status
- Export order data

### 9. Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized images for all screen sizes
- Video lazy loading

### 10. Asset Optimization

- Convert .MOV videos to web-optimized formats (MP4/WebM)
- Optimize JPEG images (WebP fallbacks)
- Implement Next.js Image component
- Lazy load videos below fold

## Key Features

1. **Scroll-Based Interactions**:

   - Horizontal scrolling sections
   - Parallax effects
   - Scroll-triggered animations
   - Native scroll momentum

2. **Performance**:

   - Image optimization
   - Code splitting
   - Lazy loading
   - Font optimization

3. **E-commerce**:

   - Secure Stripe payments
   - Order tracking
   - Email confirmations (via Stripe)
   - Cart persistence

4. **User Experience**:

   - Smooth animations
   - Loading states
   - Error handling
   - Mobile optimization

### To-dos

- [ ] Initialize Next.js 14 project with TypeScript, Tailwind CSS, and configure custom font (Electromagnetic Lungs.otf)
- [ ] Set up Prisma with PostgreSQL schema for Products, Orders, and OrderItems tables
- [ ] Build homepage hero section with 'MAKE MORE PUTTS' stacked text using custom font
- [ ] Create reusable scroll-based components (HorizontalScroll, ScrollSection) with native scroll integration
- [ ] Build all homepage sections (Problem, Solution, Features, Success Metrics, Training Philosophy, CTA) with scroll animations
- [ ] Create product page with full-width product photo, details section, and training programs
- [ ] Implement cart functionality with session-based storage and cart page UI
- [ ] Set up Stripe checkout session creation and payment processing
- [ ] Create Stripe webhook handler to process payments and create orders in database
- [ ] Ensure all pages and components are fully responsive across all screen sizes
- [ ] Optimize images and videos, implement lazy loading, and set up Next.js Image components