# ChinarShop Deployment Guide

This guide will help you deploy the ChinarShop e-commerce project to Render (Backend) and Vercel (Frontend & Admin).

## Project Structure

```
ChinarShop/
├── backend/          # Node.js + Express + MongoDB backend
├── FRONTEND/         # React frontend for customers
└── admin/            # React admin panel
```

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- Render account
- Vercel account
- Git repository

## Backend Deployment (Render)

### 1. Environment Variables Setup

Create a `.env` file in the `backend/` directory:

```env
PORT=10000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=production
BASE_URL=https://your-backend-name.onrender.com
```

### 2. Deploy to Render

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `chinar-shop-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Port**: `10000`

6. Add environment variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secure JWT secret
   - `BASE_URL`: Your Render service URL

7. Click "Create Web Service"

### 3. Update Frontend & Admin Environment Variables

After backend deployment, update the environment variables in your frontend and admin projects:

```env
VITE_API_BASE_URL=https://your-backend-name.onrender.com
```

## Frontend Deployment (Vercel)

### 1. Environment Variables

Create a `.env.local` file in the `FRONTEND/` directory:

```env
VITE_API_BASE_URL=https://your-backend-name.onrender.com
```

### 2. Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to `FRONTEND/` directory
3. Run: `vercel`
4. Follow the prompts:
   - Link to existing project or create new
   - Set project name
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Set environment variables

## Admin Panel Deployment (Vercel)

### 1. Environment Variables

Create a `.env.local` file in the `admin/` directory:

```env
VITE_API_BASE_URL=https://your-backend-name.onrender.com
```

### 2. Deploy to Vercel

1. Navigate to `admin/` directory
2. Run: `vercel`
3. Follow the same prompts as frontend

## Environment Variables Reference

### Backend (.env)
```env
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_secure_secret_key
NODE_ENV=production
BASE_URL=https://your-backend-name.onrender.com
```

### Frontend & Admin (.env.local)
```env
VITE_API_BASE_URL=https://your-backend-name.onrender.com
```

## Important Notes

1. **CORS**: The backend is configured to allow CORS from any origin. In production, you may want to restrict this to your specific domains.

2. **Image Uploads**: Images are stored locally in the backend. For production, consider using cloud storage (AWS S3, Cloudinary, etc.).

3. **Database**: Ensure your MongoDB Atlas cluster is accessible from Render's IP addresses.

4. **Security**: 
   - Use strong JWT secrets
   - Consider implementing rate limiting
   - Add input validation
   - Use HTTPS in production

## Troubleshooting

### Common Issues

1. **Build Failures**: Ensure all dependencies are in package.json
2. **Environment Variables**: Double-check variable names and values
3. **CORS Errors**: Verify backend CORS configuration
4. **Database Connection**: Check MongoDB connection string and network access

### Logs

- **Render**: Check service logs in the Render dashboard
- **Vercel**: Check deployment logs in the Vercel dashboard

## Post-Deployment

1. Test all API endpoints
2. Verify image uploads work
3. Test user authentication
4. Check cart functionality
5. Test admin panel features

## Support

If you encounter issues:
1. Check the logs in your deployment platforms
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed
4. Check network connectivity between services
