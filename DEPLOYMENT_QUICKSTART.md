# 🚀 Quick Deployment Checklist

## ✅ What's Already Done

- ✅ Netlify configuration (`netlify.toml`) is set up
- ✅ Next.js plugin is configured
- ✅ Prisma postinstall script added to package.json
- ✅ Security headers configured

## 📋 What You Need to Do

### 1. Prepare Your Code
```bash
cd /Users/jaritgolf/Desktop/jaritgolf.com/jaritgolf.com:3001
git add .
git commit -m "Prepare for Netlify deployment"
git push
```

### 2. Set Up Database (Choose One)

**Option A: Neon (Free, Recommended)**
- Sign up at [neon.tech](https://neon.tech)
- Create project → Copy connection string

**Option B: Supabase (Free)**
- Sign up at [supabase.com](https://supabase.com)
- Create project → Settings → Database → Copy connection string

**After setup, run locally:**
```bash
npx prisma db push
```

### 3. Set Up Stripe
- Sign up at [stripe.com](https://stripe.com)
- Get API keys from Developers → API keys
- Create webhook (you'll update URL after deployment)

### 4. Deploy to Netlify
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select your repository
5. **Configure:**
   - Base directory: `jaritgolf.com:3001`
   - Build command: `npm run build`
   - Node version: `18`

### 5. Add Environment Variables
In Netlify dashboard → Site settings → Environment variables:

```
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_URL=https://your-site.netlify.app
```

### 6. After First Deployment
1. Update `NEXT_PUBLIC_URL` with your actual Netlify URL
2. Update Stripe webhook URL: `https://your-site.netlify.app/api/webhooks/stripe`
3. Redeploy if needed

## 📖 Full Guide
See `NETLIFY_DEPLOYMENT.md` for detailed instructions.

## 🆘 Common Issues

**Build fails?** Check that:
- All environment variables are set
- Database is accessible
- Node version is set to 18

**Database errors?** Run `npx prisma db push` locally first

**Stripe errors?** Verify all Stripe keys are correct

