# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### Build Cache Errors

**Error:** `Cannot find module './682.js'` or similar webpack module errors

**Cause:** Corrupted or stale Next.js build cache

**Solution:**
```bash
cd /Users/jaritgolf/Desktop/jaritgolf.com/jaritgolf.com:3001
rm -rf .next
npm run build
npm run dev
```

### Port Already in Use

**Error:** `Port 3001 is already in use`

**Solution:**
```bash
# Find and kill the process
lsof -ti:3001 | xargs kill -9

# Or use a different port
npm run dev -- -p 3002
```

### Module Not Found Errors

**Error:** `Module not found: Can't resolve '...'`

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors During Build

**Error:** Type errors during build

**Solution:**
```bash
# Clean build and check types
rm -rf .next
npm run build
```

### Development Server Issues

**If the dev server hangs or doesn't respond:**

1. Stop the server (Ctrl+C)
2. Clean cache: `rm -rf .next`
3. Restart: `npm run dev`

### Font Loading Issues

**If fonts don't load:**

1. Check that fonts exist in `public/fonts/`
2. Verify font paths in `globals.css` are correct
3. Clear browser cache
4. Check browser console for 404 errors

### Environment Variable Issues

**Error:** `process.env.STRIPE_SECRET_KEY is not defined`

**Solution:**
1. Create `.env.local` file in project root
2. Add required environment variables
3. Restart dev server

---

**Need more help?** Check the specific error message and search for it in the Netlify build logs or terminal output.

