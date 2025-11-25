# 🎨 Deploy for Visual Testing Only

## Quick Answer: No, you don't need database or Stripe for visuals!

For **visual testing only**, you can deploy with minimal environment variables.

## ✅ What You Need to Deploy

**Minimum required environment variables in Netlify:**

```
NEXT_PUBLIC_URL=https://your-site-name.netlify.app
DATABASE_URL=postgresql://placeholder:placeholder@placeholder.placeholder.com/placeholder
STRIPE_SECRET_KEY=sk_live_NOT_A_REAL_KEY_FOR_VISUAL_TESTING_ONLY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_NOT_A_REAL_KEY_FOR_VISUAL_TESTING_ONLY
STRIPE_WEBHOOK_SECRET=whsec_NOT_A_REAL_SECRET_FOR_VISUAL_TESTING_ONLY
```

**Note:** These are just placeholder values. The site will build and display, but checkout won't work.

## 📦 What Works

- ✅ All visual elements and styling
- ✅ All animations and scroll effects
- ✅ Navigation and layout
- ✅ Product pages
- ✅ Cart UI (visual only)
- ✅ All homepage sections

## ⚠️ What Won't Work

- ❌ Adding items to cart (might work locally with localStorage)
- ❌ Checkout functionality
- ❌ Payment processing
- ❌ Saving orders

## 🚀 Quick Deploy Steps

1. **Deploy to Netlify:**
   - Connect your GitHub repo
   - Base directory: `jaritgolf.com:3001`
   - Build command: `npm run build`

2. **Add Environment Variables:**
   - Use the placeholder values above
   - Update `NEXT_PUBLIC_URL` after first deployment

3. **Deploy!**
   - The site will build successfully
   - All visuals will work
   - You can share the URL for feedback

## 🎯 When You're Ready for Full Functionality

Replace placeholder values with:
- Real database connection string (Neon, Supabase, etc.)
- Real Stripe API keys
- Real Stripe webhook secret

See `NETLIFY_DEPLOYMENT.md` for full setup instructions.

---

**TL;DR:** Use placeholder env vars → Deploy → Test visuals → Add real services later when needed!

