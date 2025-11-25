# 🚀 Netlify Deployment Guide

This guide will help you deploy your Next.js application to Netlify.

## Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Netlify Account** - Sign up at [netlify.com](https://www.netlify.com) (free tier is fine)
3. **Stripe Account** - For payment processing
4. **Database** - PostgreSQL database (recommended: [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app))

## Step 1: Prepare Your Repository

1. **Commit all changes:**
   ```bash
   cd /Users/jaritgolf/Desktop/jaritgolf.com/jaritgolf.com:3001
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push
   ```

## Step 2: Set Up Database

### Option A: Neon (Recommended - Free Tier)

1. Go to [neon.tech](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy your connection string (it will look like: `postgresql://user:password@host/database?sslmode=require`)
5. Save this - you'll need it for Netlify environment variables

### Option B: Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a free account and project
3. Go to Settings → Database
4. Copy the connection string under "Connection string" (URI format)
5. Save this for Netlify

### Option C: Railway

1. Go to [railway.app](https://railway.app)
2. Create a free account
3. Create a new PostgreSQL database
4. Copy the DATABASE_URL from the Variables tab
5. Save this for Netlify

### Initialize Database Schema

After setting up your database, run:

```bash
# In your local terminal
cd /Users/jaritgolf/Desktop/jaritgolf.com/jaritgolf.com:3001
npx prisma db push
```

This will create all the necessary tables in your database.

## Step 3: Set Up Stripe

1. Go to [stripe.com](https://stripe.com) and create an account
2. Navigate to **Developers** → **API keys**
3. Copy:
   - **Publishable key** (starts with `pk_`)
   - **Secret key** (starts with `sk_`) - click "Reveal test key"
4. For webhooks:
   - Go to **Developers** → **Webhooks**
   - Click "Add endpoint"
   - Endpoint URL: You'll set this after Netlify deployment
   - Select events: `checkout.session.completed`
   - Copy the **Signing secret** (starts with `whsec_`)

## Step 4: Deploy to Netlify

### Method 1: Deploy via Netlify Dashboard (Recommended)

1. **Go to Netlify:**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Sign in or create an account

2. **Import your site:**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub account
   - Select your repository
   - Select the branch (usually `main` or `master`)

3. **Configure build settings:**
   - **Base directory:** `jaritgolf.com:3001`
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` (or leave blank - Netlify Next.js plugin handles this)
   - **Node version:** `18` (or higher)

4. **Set environment variables:**
   Click "Show advanced" → "New variable" and add:
   
   ```
   DATABASE_URL=postgresql://user:password@host/database?sslmode=require
   STRIPE_SECRET_KEY=sk_test_... (your Stripe secret key)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (your Stripe publishable key)
   STRIPE_WEBHOOK_SECRET=whsec_... (from Stripe webhooks)
   NEXT_PUBLIC_URL=https://your-site-name.netlify.app (update after deployment)
   ```

   **Important:** After your first deployment, come back and update `NEXT_PUBLIC_URL` with your actual Netlify URL.

5. **Deploy:**
   - Click "Deploy site"
   - Wait for the build to complete (5-10 minutes)

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize the site:**
   ```bash
   cd /Users/jaritgolf/Desktop/jaritgolf.com/jaritgolf.com:3001
   netlify init
   ```
   - Follow the prompts
   - Choose "Create & configure a new site"
   - Select your team
   - Choose a site name

4. **Set environment variables:**
   ```bash
   netlify env:set DATABASE_URL "postgresql://user:password@host/database?sslmode=require"
   netlify env:set STRIPE_SECRET_KEY "sk_test_..."
   netlify env:set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY "pk_test_..."
   netlify env:set STRIPE_WEBHOOK_SECRET "whsec_..."
   ```

5. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

## Step 5: Configure Stripe Webhook

After your site is deployed:

1. **Get your Netlify URL:**
   - Go to your Netlify dashboard
   - Copy your site URL (e.g., `https://your-site-name.netlify.app`)

2. **Update Stripe webhook:**
   - Go to Stripe Dashboard → Developers → Webhooks
   - Click on your webhook endpoint
   - Update the endpoint URL to: `https://your-site-name.netlify.app/api/webhooks/stripe`
   - Save changes

3. **Update NEXT_PUBLIC_URL in Netlify:**
   - Go to Netlify Dashboard → Site settings → Environment variables
   - Update `NEXT_PUBLIC_URL` to your actual Netlify URL
   - Trigger a new deployment (Deploys → Trigger deploy)

## Step 6: Verify Deployment

1. Visit your Netlify URL
2. Check that the site loads correctly
3. Test the cart and checkout flow
4. Check Netlify function logs for any errors

## Troubleshooting

### Build Fails

**Issue:** Build fails with Prisma errors
- **Solution:** Make sure `DATABASE_URL` is set correctly
- Add `PRISMA_GENERATE_DATAPROXY = "true"` to build environment variables

**Issue:** Build fails with "module not found"
- **Solution:** Run `npm install` locally first, commit `package-lock.json`
- Check that all dependencies are in `package.json`, not just `devDependencies`

**Issue:** Build timeout
- **Solution:** Netlify free tier has 15-minute build limit
- Consider upgrading or optimizing your build

### Runtime Errors

**Issue:** Stripe errors
- **Solution:** Verify all Stripe environment variables are set
- Check that keys are for the correct environment (test vs live)

**Issue:** Database connection errors
- **Solution:** Verify `DATABASE_URL` is correct
- Check database allows connections from Netlify's IPs
- Ensure database has SSL enabled (use `?sslmode=require`)

**Issue:** Images not loading
- **Solution:** Check image paths start with `/` not relative paths
- Verify images are in `public/` directory

### Webhook Issues

**Issue:** Webhooks not working
- **Solution:** Verify webhook URL is correct in Stripe
- Check `STRIPE_WEBHOOK_SECRET` matches the signing secret
- View function logs in Netlify dashboard

## Environment Variables Checklist

Make sure these are all set in Netlify:

- ✅ `DATABASE_URL` - PostgreSQL connection string
- ✅ `STRIPE_SECRET_KEY` - Stripe secret key
- ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- ✅ `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- ✅ `NEXT_PUBLIC_URL` - Your Netlify site URL

## Custom Domain (Optional)

1. Go to Netlify Dashboard → Domain settings
2. Click "Add custom domain"
3. Follow the instructions to configure DNS
4. Netlify will provide DNS records to add to your domain registrar

## Going Live with Stripe

When ready for production:

1. Switch to Stripe Live mode
2. Get your live API keys from Stripe
3. Update environment variables in Netlify
4. Update webhook endpoint for live mode
5. Redeploy your site

## Additional Resources

- [Netlify Next.js Documentation](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Prisma on Netlify](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-netlify)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)

---

**Need Help?** Check the Netlify build logs in your dashboard for detailed error messages.

