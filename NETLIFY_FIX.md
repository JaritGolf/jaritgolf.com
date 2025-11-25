# 🔧 Netlify Build Error Fix

## Problem
```
Base directory does not exist: /opt/build/repo/jaritgolf.com:3001
```

## Solution

The base directory setting in Netlify should be **empty** because all your files are already at the root of the repository.

### Steps to Fix:

1. **Go to your Netlify Dashboard:**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Select your site

2. **Go to Site Settings:**
   - Click "Site settings" in the top navigation
   - Click "Build & deploy" in the left sidebar
   - Click "Build settings" or "Edit settings"

3. **Update Build Settings:**
   - **Base directory:** Leave this **EMPTY** (not `jaritgolf.com:3001`)
   - **Build command:** `npm run build`
   - **Publish directory:** Leave empty or set to `.next` (Netlify Next.js plugin handles this)
   - **Node version:** `18`

4. **Save and Redeploy:**
   - Click "Save"
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Clear cache and deploy site"

## Why This Happened

Your git repository root (`/Users/jaritgolf/Desktop/jaritgolf.com/jaritgolf.com:3001`) is already the site root. When Netlify clones the repo, it looks for files at `/opt/build/repo/`, not at `/opt/build/repo/jaritgolf.com:3001/`.

All your files (package.json, netlify.toml, app/, public/, etc.) are at the root level of the repository, so no base directory is needed.

---

**After fixing this, your site should build successfully!** 🚀

