# VPS Deployment Issue Solutions

## ✅ Fixed Issues

### 1. PM2 ecosystem.config.js Error
**Problem:** `[PM2][ERROR] File ecosystem.config.js not found`
**Solution:** Created `ecosystem.config.js` file with proper PM2 configuration.

### 2. Port Already in Use Error
**Problem:** `Error: listen EADDRINUSE: address already in use 0.0.0.0:4000`
**Solution:** Added automatic port detection and process cleanup.

## 🚀 Deployment Options

### Option 1: Simple Deployment (Recommended)
```bash
./vps-deploy.sh
```

### Option 2: PM2 Deployment
```bash
npm run pm2:start
```

### Option 3: Manual Deployment
```bash
# 1. Stop existing processes
pkill -f "node.*server"

# 2. Build frontend
cd client && npm run build && cd ..

# 3. Start server
node server/server.js
```

## 📋 Environment Variables Required

Create these environment variables in your VPS:

```bash
export MONGODB_URI="mongodb+srv://your-connection-string"
export JWT_SECRET="your-jwt-secret"
export CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
export CLOUDINARY_API_KEY="your-cloudinary-api-key"
export CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

## 🔧 Server Features

- **Automatic Port Detection**: Finds available ports starting from 4000
- **Graceful Shutdown**: Handles SIGTERM and SIGINT signals
- **Process Cleanup**: Kills existing processes before starting
- **Error Handling**: Comprehensive error handling and logging
- **Static File Serving**: Serves React frontend from single server

## 📝 Files Created

1. `ecosystem.config.js` - PM2 configuration
2. `vps-deploy.sh` - Deployment script
3. `production-start.js` - Production server starter
4. `start-server.js` - Alternative server starter
5. `README-VPS.md` - Detailed deployment guide

## 🎯 Next Steps

1. Set your environment variables
2. Run `./vps-deploy.sh` 
3. Your server will be available on port 4000 or higher
4. Use PM2 for production process management (optional)

Your OPM application is now ready for VPS deployment!