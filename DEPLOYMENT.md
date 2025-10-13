# GitaPath Deployment Guide

## 🚀 Railway Backend Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "MongoDB migration complete"
git push origin main
```

### 2. Railway Setup
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select the `backend` folder as root directory
4. Set environment variables:
   ```
   MONGODB_URL=mongodb+srv://vedicapp321:vedicapp321@cluster0.gdwindt.mongodb.net/gitapath?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=gitapath_dev_secret_2024_secure_key_12345
   NODE_ENV=production
   FRONTEND_URL=https://gitapath.netlify.app
   ```
5. Deploy

## 🌐 Netlify Frontend Deployment

### 1. Netlify Setup
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: `frontend`
4. Environment variables:
   ```
   VITE_API_BASE_URL=https://gitapath-production.up.railway.app
   ```
5. Deploy

### 2. Custom Domain (Optional)
- Add custom domain in Netlify settings
- Update CORS in backend if using custom domain

## ✅ Deployment Checklist

- [x] Removed test files and SQLite dependencies
- [x] Created Railway configuration (`railway.json`)
- [x] Created Netlify configuration (`netlify.toml`)
- [x] Added proper `.gitignore` files
- [x] Configured environment variables
- [x] Removed hardcoded IPs and hosts
- [x] MongoDB connection tested and working

## 🔧 Post-Deployment

1. Test all API endpoints
2. Verify user registration/login
3. Test bookmark functionality
4. Check reading progress tracking
5. Verify verse of the day feature

Your GitaPath application is now ready for production deployment!