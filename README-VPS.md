# VPS Deployment Guide for OPM

## Quick Start

1. **Set Environment Variables:**
```bash
export MONGODB_URI="mongodb://your-connection-string"
export JWT_SECRET="your-jwt-secret"
export CLOUDINARY_NAME="your-cloudinary-name"
export CLOUDINARY_API_KEY="your-cloudinary-api-key"
export CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

2. **Deploy with PM2:**
```bash
npm run production
```

3. **Alternative - Simple Start:**
```bash
node deploy-vps.js
```

## Available Commands

- `npm start` - Start server directly
- `npm run build` - Build frontend only
- `npm run pm2:start` - Start with PM2
- `npm run pm2:stop` - Stop PM2 process
- `npm run pm2:restart` - Restart PM2 process
- `npm run pm2:logs` - View PM2 logs

## Troubleshooting

### Port Already in Use Error
The server automatically finds available ports starting from 4000.

### PM2 ecosystem.config.js Error
The `ecosystem.config.js` file is now included in the project.

### MongoDB Connection Error
Make sure `MONGODB_URI` environment variable is set correctly.

## Environment Variables Required

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `CLOUDINARY_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret