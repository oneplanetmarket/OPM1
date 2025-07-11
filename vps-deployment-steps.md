# VPS Deployment Steps - FIXED

## Issue Identified
Your server is running on port 4001, but Nginx is configured for port 4000. This causes "site can't be reached" error.

## Solution 1: Fix Port Configuration (Recommended)

### Step 1: Stop Current Server
```bash
cd /var/www/OPMNEW
pm2 stop all
pm2 delete all
```

### Step 2: Use Fixed Production Server
```bash
# Copy the fixed server file
cp fix-production-server.js production-server.js

# Start fixed server on port 4000
pm2 start production-server.js --name omp-backend
```

### Step 3: Update Nginx (use port 4000)
```bash
sudo cp nginx-config.conf /etc/nginx/sites-available/oneplanetmarket.com
sudo ln -sf /etc/nginx/sites-available/oneplanetmarket.com /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

## Solution 2: Update Nginx for Port 4001

### Alternative: Update Nginx Config
```bash
# Use the updated nginx config for port 4001
sudo cp production-nginx.conf /etc/nginx/sites-available/oneplanetmarket.com
sudo ln -sf /etc/nginx/sites-available/oneplanetmarket.com /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

## Verification Steps

### Check Server Status
```bash
pm2 status
pm2 logs omp-backend
```

### Test Backend
```bash
curl http://localhost:4000/api/health
# Should return: {"status":"OK","message":"API is Working"}
```

### Test Frontend
```bash
curl -I http://localhost/
# Should return: HTTP/1.1 200 OK
```

## Common Issues

1. **Port Mismatch**: Server runs on different port than Nginx expects
2. **Firewall**: Ensure ports 80, 443 are open
3. **DNS**: Ensure domain points to your VPS IP
4. **PM2**: Check if process is actually running

## Final Check
Visit `http://oneplanetmarket.com` - should work now!

The key fix: **Server and Nginx must use the same port (4000).**