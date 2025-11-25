# Git Repository Setup for S2

A new git repository has been initialized in this directory for deployment to Netlify.

## Current Status

✅ Git repository initialized
✅ All files added to git
✅ Initial commit created
✅ Branch set to `main`

## Next Steps: Connect to GitHub

### Option 1: Create a New GitHub Repository (Recommended)

1. **Go to GitHub:**
   - Visit [github.com](https://github.com)
   - Sign in to your account

2. **Create a new repository:**
   - Click the "+" icon in the top right
   - Select "New repository"
   - Repository name: `jaritgolf-s2` (or any name you prefer)
   - Description: "S2 website for Netlify deployment"
   - Choose **Public** or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (we already have files)
   - Click "Create repository"

3. **Connect your local repository:**
   ```bash
   cd /Users/jaritgolf/Desktop/jaritgolf.com/jaritgolf.com:3001
   
   git remote add origin https://github.com/YOUR_USERNAME/jaritgolf-s2.git
   git push -u origin main
   ```
   
   Replace `YOUR_USERNAME` with your actual GitHub username.

### Option 2: Using GitHub CLI (if installed)

```bash
cd /Users/jaritgolf/Desktop/jaritgolf.com/jaritgolf.com:3001
gh repo create jaritgolf-s2 --public --source=. --remote=origin --push
```

## After Connecting to GitHub

Once your code is on GitHub, you can:

1. **Deploy to Netlify:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your `jaritgolf-s2` repository
   - Configure build settings (see `NETLIFY_DEPLOYMENT.md`)

## Useful Git Commands

**Check status:**
```bash
git status
```

**Add and commit changes:**
```bash
git add .
git commit -m "Your commit message"
```

**Push to GitHub:**
```bash
git push
```

**View commit history:**
```bash
git log --oneline
```

## Important Notes

- The `.gitignore` file is configured to exclude:
  - `node_modules/`
  - `.env` files (environment variables)
  - Build artifacts (`.next/`, `out/`, etc.)
  - OS files (`.DS_Store`)
  
- **Never commit** your `.env` file or any files containing secrets!
- Environment variables will be set directly in Netlify (see `NETLIFY_DEPLOYMENT.md`)

## Troubleshooting

**If you get "repository not found" error:**
- Check that you used the correct GitHub username
- Verify the repository exists on GitHub
- Make sure you're authenticated: `gh auth login` (if using GitHub CLI)

**If you get authentication errors:**
- You may need to use a Personal Access Token instead of password
- Or use SSH: `git remote set-url origin git@github.com:YOUR_USERNAME/jaritgolf-s2.git`

---

**Ready to deploy?** Follow the steps in `NETLIFY_DEPLOYMENT.md` after pushing to GitHub!

