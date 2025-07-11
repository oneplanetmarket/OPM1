# Complete VPS Deployment Guide for OPM

## The Problem
Your site shows "can't be reached" because:
1. Only frontend static files are served by Nginx
2. Node.js backend server is not running
3. API calls from frontend fail (no backend to handle them)

## The Solution

### Step 1: Upload Files to VPS
```bash
# Upload your project to /var/www/OPMNEW/
scp -r your-project-folder/ user@your-vps:/var/www/OPMNEW/
```

### Step 2: Install Dependencies
```bash
cd /var/www/OPMNEW
npm install
cd client && npm install
cd ../server && npm install
```

### Step 3: Run Setup Script
```bash
cd /var/www/OPMNEW
chmod +x vps-setup.sh
sudo ./vps-setup.sh
```

### Step 4: Update Nginx Configuration
Replace your current Nginx config with:
```bash
sudo cp nginx-config.conf /etc/nginx/sites-available/oneplanetmarket.com
sudo ln -sf /etc/nginx/sites-available/oneplanetmarket.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## What This Fixes

✅ **Backend Server**: PM2 runs Node.js server on port 4000  
✅ **API Routing**: Nginx proxies `/api/*` to backend  
✅ **Frontend**: Nginx serves React build files  
✅ **Domain**: Configured for oneplanetmarket.com  
✅ **CORS**: Updated to allow your domain  

## Key Configuration Changes

1. **Client/.env**: Set `VITE_BACKEND_URL=https://oneplanetmarket.com`
2. **Server CORS**: Added your domain to allowed origins
3. **Nginx**: Proxies API calls to Node.js backend
4. **PM2**: Manages backend server process

## Commands to Check Status

```bash
# Check PM2 status
pm2 status

# Check PM2 logs
pm2 logs omp-backend

# Check Nginx status
sudo systemctl status nginx

# Check if backend is running
curl http://localhost:4000/api/health
```

## Common Issues

**Issue**: Still can't reach site  
**Solution**: Check firewall settings, ensure ports 80/443 are open

**Issue**: API calls fail  
**Solution**: Check PM2 logs, ensure backend is running

**Issue**: Frontend loads but API errors  
**Solution**: Check CORS settings in server.js

Your site should now work at https://oneplanetmarket.com with both frontend and backend functioning!