# ChinarShop Deployment Guide

## 🚀 Complete Deployment Setup

This guide will help you deploy your ChinarShop application with:
- **Backend**: Render (Node.js/Express)
- **Frontend**: Vercel (React/Vite)
- **Admin Panel**: Vercel (React/Vite)
- **Image Storage**: Cloudinary

## 📋 Prerequisites

1. **Cloudinary Account**: [Sign up here](https://cloudinary.com/)
2. **Render Account**: [Sign up here](https://render.com/)
3. **Vercel Account**: [Sign up here](https://vercel.com/)
4. **MongoDB Atlas**: [Sign up here](https://www.mongodb.com/atlas)

## 🔧 Step 1: Cloudinary Setup

1. **Create Cloudinary Account**:
   - Go to [Cloudinary Dashboard](https://cloudinary.com/console)
   - Note down your:
     - Cloud Name
     - API Key
     - API Secret

2. **Configure Cloudinary**:
   - Your images will be stored in the `chinar-shop` folder
   - Images are automatically optimized (500x500px, various formats)
   - 10MB file size limit per image

## 🗄️ Step 2: MongoDB Atlas Setup

1. **Create Database**:
   - Create a new cluster in MongoDB Atlas
   - Create a database named `chinarShop`
   - Get your connection string

2. **Environment Variables Needed**:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chinarShop?retryWrites=true&w=majority
   JWT_SECRET=your_secure_jwt_secret_here
   ```

## 🖥️ Step 3: Deploy Backend to Render

### 3.1 Create Render Service

1. **Connect Repository**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder as root directory

2. **Configure Service**:
   ```
   Name: chinar-shop-backend
   Environment: Node
   Build Command: npm install
   Start Command: node index.js
   ```

3. **Set Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   BASE_URL=https://chinar-shop-backend.onrender.com
   ```

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://chinar-shop-backend.onrender.com`

### 3.2 Alternative: Use render.yaml

Your project already has a `render.yaml` file configured. You can:
1. Push your code to GitHub
2. In Render, select "Blueprint" instead of "Web Service"
3. Render will automatically use your `render.yaml` configuration

## 🌐 Step 4: Deploy Frontend to Vercel

### 4.1 Create Vercel Project

1. **Connect Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `FRONTEND` folder as root directory

2. **Configure Project**:
   ```
   Framework Preset: Vite
   Root Directory: FRONTEND
   Build Command: npm run build
   Output Directory: dist
   ```

3. **Set Environment Variables**:
   ```
   VITE_API_BASE_URL=https://chinar-shop-backend.onrender.com
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your frontend URL

## 👨‍💼 Step 5: Deploy Admin Panel to Vercel

### 5.1 Create Second Vercel Project

1. **Connect Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import the same GitHub repository
   - Select the `admin` folder as root directory

2. **Configure Project**:
   ```
   Framework Preset: Vite
   Root Directory: admin
   Build Command: npm run build
   Output Directory: dist
   ```

3. **Set Environment Variables**:
   ```
   VITE_API_BASE_URL=https://chinar-shop-backend.onrender.com
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your admin panel URL

## 🔧 Step 6: Fix Dependencies (Important!)

Before deploying, run this command in your backend directory:

```bash
cd backend
npm install --legacy-peer-deps
```

This fixes the Cloudinary dependency conflict we resolved earlier.

## 📱 Step 7: Test Your Deployment

### 7.1 Test Backend
- Visit: `https://chinar-shop-backend.onrender.com/allproducts`
- Should return JSON with your products

### 7.2 Test Frontend
- Visit your frontend Vercel URL
- Check if products load from the backend
- Test user registration/login

### 7.3 Test Admin Panel
- Visit your admin Vercel URL
- Test product upload (should use Cloudinary)
- Test adding/removing products

## 🎯 Step 8: Production URLs

After deployment, you'll have:

- **Backend API**: `https://chinar-shop-backend.onrender.com`
- **Frontend**: `https://your-frontend-name.vercel.app`
- **Admin Panel**: `https://your-admin-name.vercel.app`

## 🔒 Security Notes

1. **Environment Variables**: Never commit `.env` files to Git
2. **JWT Secret**: Use a strong, random JWT secret
3. **MongoDB**: Use strong passwords and IP whitelisting
4. **Cloudinary**: Keep your API secret secure

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Your backend already has CORS enabled
   - If issues persist, check your frontend URLs

2. **Image Upload Issues**:
   - Verify Cloudinary environment variables
   - Check file size limits (10MB max)

3. **Database Connection**:
   - Verify MongoDB connection string
   - Check IP whitelist in MongoDB Atlas

4. **Build Failures**:
   - Run `npm install --legacy-peer-deps` in backend
   - Check Node.js version compatibility

## 📊 Monitoring

- **Render**: Monitor backend performance and logs
- **Vercel**: Monitor frontend builds and performance
- **Cloudinary**: Monitor image storage and bandwidth usage
- **MongoDB Atlas**: Monitor database performance

## 🎉 You're Done!

Your ChinarShop application is now fully deployed with:
- ✅ Scalable backend on Render
- ✅ Fast frontend on Vercel
- ✅ Admin panel on Vercel
- ✅ Cloudinary image storage
- ✅ MongoDB database
- ✅ Production-ready configuration

Happy selling! 🛍️