# Deployment Guide - Vercel

This guide will help you deploy the JavaScript for React educational website to Vercel.

## Prerequisites

- [Vercel account](https://vercel.com/signup) (free)
- Git installed on your machine
- GitHub account (recommended but optional)

## Changes Made for Vercel Deployment

The following files have been added/updated to prepare for Vercel deployment:

### 1. `vercel.json`
Configures Vercel deployment settings:
- **Rewrites**: Ensures React Router works properly (SPA fallback)
- **Build Command**: Uses `pnpm run build`
- **Output Directory**: `dist` (Vite's default)
- **Install Command**: Uses `pnpm install`
- **Framework**: Vite detection

### 2. `.gitignore`
Excludes unnecessary files from version control:
- node_modules
- dist folder
- .env files
- editor configs
- Vercel files

### 3. `package.json`
Updated with:
- `"type": "module"` - Fixes ES module warnings
- Better project name: `js-for-react`
- Description added

## Deployment Methods

You have two options for deploying to Vercel:

---

## Option 1: Deploy via GitHub (Recommended)

This method enables automatic deployments when you push changes.

### Step 1: Initialize Git Repository

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: JS for React educational website"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository (e.g., `js-for-react-learning`)
3. **Don't** initialize with README (we already have code)

### Step 3: Push to GitHub

```bash
# Add remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/js-for-react-learning.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Vite settings
5. Click **"Deploy"**

**Vercel will automatically:**
- Detect it's a Vite project
- Use `pnpm` (it detects pnpm-lock.yaml)
- Build with `pnpm run build`
- Deploy the `dist` folder
- Set up automatic deployments on every push

---

## Option 2: Deploy via Vercel CLI (Quick Deploy)

Deploy directly without GitHub integration.

### Step 1: Install Vercel CLI

```bash
pnpm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
# From project root directory
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → js-for-react (or your preferred name)
- **Directory?** → ./ (current directory)
- **Override settings?** → No (Vercel auto-detects Vite)

### Step 4: Deploy to Production

```bash
vercel --prod
```

---

## Post-Deployment

### Your Deployed URLs

After deployment, you'll receive:
- **Preview URL**: `https://your-project-xyz.vercel.app` (for staging)
- **Production URL**: `https://your-project.vercel.app`

### Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables (If Needed)

If you add API keys later:
1. Go to **"Settings"** → **"Environment Variables"**
2. Add your variables
3. Redeploy for changes to take effect

---

## Automatic Deployments (GitHub Method)

When using GitHub integration:

- **Push to `main`** → Automatic production deployment
- **Pull requests** → Automatic preview deployments
- **Comments on PRs** → Preview URLs automatically added

---

## Troubleshooting

### Issue: Routes Don't Work (404 on Refresh)

**Solution:** The `vercel.json` file handles this with SPA rewrites. Make sure it exists.

### Issue: Build Fails

**Check:**
```bash
# Test build locally
pnpm run build

# Test preview locally
pnpm run preview
```

### Issue: Styles Don't Load

**Check:** Ensure `index.css` is imported in `main.jsx` (already done)

### Issue: pnpm Not Detected

Vercel should auto-detect `pnpm-lock.yaml`. If not:
1. Go to project **Settings** → **General**
2. Set **Install Command**: `pnpm install`

---

## Updating Your Deployment

### With GitHub (Automatic)

```bash
# Make changes
git add .
git commit -m "Update content"
git push
```

Vercel automatically deploys!

### With CLI (Manual)

```bash
vercel --prod
```

---

## Performance Optimizations (Already Included)

✅ Vite build optimization
✅ Code splitting
✅ Asset optimization
✅ Tailwind CSS purging
✅ React production build

---

## Monitoring Your Site

### Vercel Dashboard Features

- **Analytics**: View page views and performance
- **Logs**: Check build and runtime logs
- **Deployments**: See deployment history
- **Speed Insights**: Monitor Core Web Vitals (paid feature)

---

## Cost

- **Free Tier**: Perfect for this project
  - Unlimited deployments
  - 100 GB bandwidth/month
  - Automatic HTTPS
  - Global CDN

---

## Security Notes

✅ HTTPS automatically enabled
✅ Environment variables encrypted
✅ DDoS protection included
✅ No sensitive data in repository (use .gitignore)

---

## Next Steps After Deployment

1. Test all routes: `/`, `/topic/variables`, `/topic/functions`, etc.
2. Test dark/light mode toggle
3. Test code execution features
4. Test on mobile devices
5. Share your deployed URL! 🎉

---

## Example Deployment URLs

Your site will be available at:
- `https://js-for-react.vercel.app`
- `https://js-for-react-git-main-yourusername.vercel.app`

---

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

## Quick Deploy Checklist

- [x] `vercel.json` created
- [x] `.gitignore` created
- [x] `package.json` updated with type: "module"
- [ ] Git repository initialized
- [ ] Code pushed to GitHub (if using GitHub method)
- [ ] Deployed to Vercel
- [ ] Tested all routes
- [ ] Shared with students! 🚀

---

**Ready to deploy?** Choose your method above and follow the steps!
