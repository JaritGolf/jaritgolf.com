# 🎨 Visual Testing Deployment Guide

This guide shows you how to deploy your site to Netlify **just for visual testing** without setting up a database or Stripe.

## ✅ What Works Without Database/Stripe

- ✅ All homepage visuals and animations
- ✅ All product page visuals
- ✅ Navigation and layout
- ✅ Cart UI (displays items, but checkout won't work)
- ✅ All scroll animations and interactions

## ⚠️ What Won't Work

- ❌ Adding items to cart (uses localStorage, so might work locally but not persist)
- ❌ Checkout functionality
- ❌ Payment processing
- ❌ Order creation/management

## 🚀 Quick Deploy for Visual Testing

### Step 1: Set Placeholder Environment Variables

When deploying to Netlify, you can use placeholder values just to get the build to work:

#### In Netlify Dashboard → Environment Variables:

```
DATABASE_URL=postgresql://placeholder:placeholder@placeholder.placeholder.com/placeholder?sslmode=require
STRIPE_SECRET_KEY=sk_live_NOT_A_REAL_KEY_FOR_VISUAL_TESTING_ONLY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_NOT_A_REAL_KEY_FOR_VISUAL_TESTING_ONLY
STRIPE_WEBHOOK_SECRET=whsec_NOT_A_REAL_SECRET_FOR_VISUAL_TESTING_ONLY
NEXT_PUBLIC_URL=https://your-site-name.netlify.app
```

**Note:** These are just placeholder values. They'll allow the site to build, but checkout/payment features won't work.

### Step 2: Deploy Settings

**Base directory:** `jaritgolf.com:3001`  
**Build command:** `npm run build`  
**Publish directory:** `.next` (or leave blank)  
**Node version:** `18`

### Step 3: Disable Prisma Generation (Optional)

If you want to skip Prisma entirely for visual testing, you can modify the build command:

**Build command:** `SKIP_PRISMA_GENERATE=true npm run build`

But you'll also need to comment out Prisma imports in your code, so it's easier to just use placeholder values.

## 🔧 Making It Work Better for Visual Testing

If you want to make the site more resilient to missing services, you can:

### Option 1: Make Stripe Optional (Recommended)

Update `lib/stripe.ts` to handle missing keys gracefully:

```typescript
// Only initialize if key exists
export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
      typescript: true,
    })
  : null;

// Update functions to return early if stripe is null
export async function createCheckoutSession(...) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }
  // ... rest of function
}
```

### Option 2: Add Feature Flags

Add environment variables to disable features:

```
ENABLE_CHECKOUT=false
ENABLE_DATABASE=false
```

Then check these flags before initializing services.

## 📝 Summary

**For visual testing, you can:**

1. ✅ Deploy to Netlify with placeholder env vars
2. ✅ View and test all visual elements
3. ✅ Test animations and interactions
4. ✅ Share the site URL for visual feedback

**You don't need:**
- ❌ Real database
- ❌ Real Stripe account
- ❌ Payment processing

**Just remember:**
- Cart/checkout buttons won't actually work
- You'll see errors in the console if you try to use payment features
- But all the visuals will render perfectly!

## 🎯 Next Steps

Once you're happy with the visuals:

1. Set up a real database (Neon, Supabase, etc.)
2. Set up Stripe account
3. Replace placeholder env vars with real values
4. Redeploy

---

**Ready to deploy?** Follow the steps in `NETLIFY_DEPLOYMENT.md` but use placeholder environment variables instead of real ones!

