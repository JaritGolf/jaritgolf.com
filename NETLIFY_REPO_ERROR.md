# 🔧 Netlify Repository Access Error

## Error Message
```
Error checking out repo.
```

This means Netlify cannot access your GitHub repository.

## Common Causes & Solutions

### 1. Repository is Private
If your repository is private, Netlify needs explicit access.

**Solution:**
1. Go to Netlify Dashboard → Site settings → Build & deploy
2. Check if there's a "Manage repository access" or "Configure repository" option
3. Re-authorize Netlify to access your GitHub account
4. Make sure the repository is selected correctly

### 2. GitHub Authorization Expired
Your GitHub authorization with Netlify may have expired or been revoked.

**Solution:**
1. Go to Netlify Dashboard → Site settings → Build & deploy
2. Click "Link to a different repository" or "Configure repository"
3. Re-authenticate with GitHub
4. Select your repository: `JaritGolf/jaritgolf.com`

### 3. Repository Not Found
Netlify might be looking for the wrong repository.

**Solution:**
1. Verify the repository exists: https://github.com/JaritGolf/jaritgolf.com
2. Check the repository name is correct in Netlify settings
3. Make sure you have access to the repository

### 4. Temporary GitHub/Netlify Issue
Sometimes this is just a temporary service issue.

**Solution:**
1. Wait a few minutes and try deploying again
2. Check Netlify status: https://www.netlifystatus.com/
3. Check GitHub status: https://www.githubstatus.com/

### 5. Repository Branch Issue
The default branch might have changed.

**Solution:**
1. Go to Netlify Dashboard → Site settings → Build & deploy
2. Check "Production branch" is set to `main`
3. Verify the branch exists on GitHub

## Quick Fix Steps

1. **Re-link the repository:**
   - Go to Netlify Dashboard
   - Site settings → Build & deploy
   - Click "Link to a different repository"
   - Re-authenticate and select your repo

2. **Check repository visibility:**
   - Go to GitHub: https://github.com/JaritGolf/jaritgolf.com/settings
   - Make sure it's either:
     - **Public** (Netlify can always access)
     - **Private** with Netlify authorized (check Netlify app permissions)

3. **Verify Netlify has access:**
   - Go to GitHub → Settings → Applications → Authorized OAuth Apps
   - Find "Netlify"
   - Make sure it has access to your repositories

## Alternative: Deploy via Netlify CLI

If web deployment continues to fail, you can deploy via CLI:

```bash
cd /Users/jaritgolf/Desktop/jaritgolf.com/jaritgolf.com:3001
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

This bypasses the repository checkout issue.

---

**Most likely fix:** Re-link the repository in Netlify dashboard and re-authenticate with GitHub.

