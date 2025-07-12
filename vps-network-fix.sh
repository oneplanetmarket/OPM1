#!/bin/bash

echo "=== VPS Network Configuration Fix ==="
echo "VPS IP: 31.97.150.246"
echo "Domain: oneplanetmarket.com"
echo ""

# 1. Check and fix firewall
echo "1. Checking firewall..."
sudo ufw status
echo "Opening required ports..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 4000/tcp
sudo ufw --force enable

# 2. Check if VPS provider has additional firewall
echo ""
echo "2. Testing direct IP access..."
curl -I http://31.97.150.246 --connect-timeout 10

# 3. Check nginx configuration
echo ""
echo "3. Checking nginx configuration..."
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl status nginx --no-pager

# 4. Check DNS resolution
echo ""
echo "4. Checking DNS resolution..."
nslookup oneplanetmarket.com
dig oneplanetmarket.com +short

# 5. Test from multiple locations
echo ""
echo "5. Testing connectivity..."
echo "Testing localhost..."
curl -I http://localhost --connect-timeout 5
echo "Testing 127.0.0.1..."
curl -I http://127.0.0.1 --connect-timeout 5
echo "Testing external IP..."
curl -I http://31.97.150.246 --connect-timeout 10

# 6. Check what's actually running
echo ""
echo "6. Checking running services..."
sudo ss -tlnp | grep :80
sudo ss -tlnp | grep :4000

# 7. Check logs
echo ""
echo "7. Recent nginx logs..."
sudo tail -5 /var/log/nginx/access.log
sudo tail -5 /var/log/nginx/error.log

echo ""
echo "=== Fix Complete ==="
echo "If IP access still fails, contact your VPS provider about firewall rules"
echo "If DNS doesn't resolve, update your domain's A record to point to 31.97.150.246"