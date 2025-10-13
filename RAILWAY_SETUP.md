# 🚂 Railway Deployment Setup

## Environment Variables to Set in Railway Dashboard

```
MONGODB_URL=mongodb+srv://vedicapp321:vedicapp321@cluster0.gdwindt.mongodb.net/gitapath?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=gitapath_dev_secret_2024_secure_key_12345
NODE_ENV=production
FRONTEND_URL=https://gitapath.netlify.app
```

## Railway Configuration

The `railway.json` file is configured to:
- Build from the `backend/` directory
- Run `npm install` in backend folder
- Start with `npm start` from backend folder

## Deployment Steps

1. ✅ Repository pushed to GitHub
2. ✅ Railway.json configured for backend deployment
3. ⏳ Set environment variables in Railway dashboard
4. ⏳ Deploy from GitHub repository

## Frontend Build

To build frontend for manual deployment:

```bash
cd frontend
npm install
npm run build
```

Upload the `dist/` folder to Netlify with environment variable:
```
VITE_API_BASE_URL=https://your-railway-app.up.railway.app
```