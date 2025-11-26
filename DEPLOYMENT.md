# Frontend Deployment Guide

Quick guide for deploying the Smart Farmer frontend to Vercel or Netlify.

## Prerequisites

- Backend deployed on Render (see backend DEPLOYMENT.md)
- GitHub repository with frontend code
- Vercel or Netlify account

## Option 1: Deploy to Vercel (Recommended)

### Step 1: Update Environment Variables

The `.env.production` file is already configured. Update the backend URL if different:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### Step 3: Deploy on Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `smart-farmer-frontend` (if monorepo) or leave empty
   - **Build Command**: `pnpm build` (or `npm run build`)
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com/api`
6. Click **"Deploy"**

### Step 4: Update Backend CORS

After deployment, add your Vercel URL to backend CORS settings:

1. Go to Render dashboard
2. Open your backend service
3. Go to **Environment** tab
4. Update `CORS_ALLOWED_ORIGINS`:
   ```
   https://your-app.vercel.app,http://localhost:5173
   ```
5. Save and redeploy backend

## Option 2: Deploy to Netlify

### Step 1: Same as Vercel - Update Environment Variables

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### Step 3: Deploy on Netlify

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub and select repository
4. Configure:
   - **Base directory**: `smart-farmer-frontend` (if monorepo)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com/api`
6. Click **"Deploy site"**

### Step 4: Update Backend CORS

Same as Vercel - add your Netlify URL to backend CORS settings.

## Verify Deployment

1. Visit your deployed URL
2. Open browser console (F12)
3. Check for any API errors
4. Test all pages and features

## Troubleshooting

**404 on page refresh**: The `vercel.json` and `netlify.toml` files handle SPA routing.

**API calls failing**: Check CORS settings in backend and ensure `VITE_API_URL` is correct.

**Build fails**: Check that all dependencies are in `package.json` and build command is correct.

## Custom Domain (Optional)

Both Vercel and Netlify support custom domains on free tier:

**Vercel**: Settings → Domains → Add Domain
**Netlify**: Site settings → Domain management → Add custom domain

---

Your app is now live! 🎉
