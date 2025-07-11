#!/bin/bash

echo "Setting up OPM on VPS..."

# Create necessary directories
mkdir -p /var/www/OPMNEW/logs

# Stop any existing processes
sudo pkill -f "node.*server" 2>/dev/null || true
sudo pkill -f "node.*4000" 2>/dev/null || true

# Install PM2 globally if not installed
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
fi

# Build frontend with production environment
echo "Building frontend..."
cd /var/www/OPMNEW/client
npm run build

# Start backend server with PM2
echo "Starting backend server..."
cd /var/www/OPMNEW/server
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save
pm2 startup

# Copy and enable Nginx configuration
echo "Configuring Nginx..."
sudo cp /var/www/OPMNEW/nginx-config.conf /etc/nginx/sites-available/oneplanetmarket.com
sudo ln -sf /etc/nginx/sites-available/oneplanetmarket.com /etc/nginx/sites-enabled/

# Remove default nginx site
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
sudo nginx -t && sudo systemctl reload nginx

echo "Setup complete!"
echo "Backend: http://localhost:4000"
echo "Frontend: https://oneplanetmarket.com"
echo "Check PM2 status: pm2 status"
echo "Check PM2 logs: pm2 logs opm-backend"