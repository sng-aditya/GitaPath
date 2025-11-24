# AWS Elastic Beanstalk Deployment Guide

## Prerequisites
1. AWS Account
2. AWS CLI installed and configured
3. EB CLI installed: `pip install awsebcli`

## Deployment Steps

### 1. Initialize Elastic Beanstalk (One-time setup)
```bash
cd backend
eb init
```
- Select your region
- Choose "Create new application" → Name it "GitaPath" or similar
- Select platform: Node.js
- Select the latest Node.js version
- Choose not to use CodeCommit
- Setup SSH if you want (optional)

### 2. Create Environment
```bash
eb create gitapath-env
```
- This will create and deploy your application
- Wait for the deployment to complete (5-10 minutes)

### 3. Set Environment Variables
```bash
eb setenv MONGODB_URL="your-mongodb-connection-string" JWT_SECRET="your-jwt-secret"
```

Or set them in AWS Console:
- Go to Elastic Beanstalk → Your Environment → Configuration → Software
- Add environment properties:
  - `MONGODB_URL`: Your MongoDB Atlas connection string
  - `JWT_SECRET`: Your secret key
  - `NODE_ENV`: production

### 4. Deploy Updates
After making changes:
```bash
cd backend
eb deploy
```

### 5. View Your Application
```bash
eb open
```
This will open your deployed application in a browser.

### 6. Check Logs
```bash
eb logs
```

## Important Notes
- Your backend will be available at: `http://gitapath-env.eba-xxxxxxxx.region.elasticbeanstalk.com`
- Update the frontend `VITE_API_BASE_URL` with this URL
- Make sure MongoDB allows connections from AWS (add 0.0.0.0/0 to IP whitelist or the EB security group)

## Monitoring
- Access AWS Console → Elastic Beanstalk → Your environment
- Monitor health, logs, and metrics

## Scaling
- Go to Configuration → Capacity
- Enable auto-scaling if needed

## Cost Optimization
- Use t2.micro or t3.micro for low traffic
- Enable auto-scaling to save costs during low usage
