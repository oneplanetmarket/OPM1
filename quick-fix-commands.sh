#!/bin/bash

echo "Quick fix for VPS deployment"

# Check if project moved successfully
if [ -d "/var/www/OPMNEW" ]; then
    echo "Project found at /var/www/OPMNEW"
    PROJECT_PATH="/var/www/OPMNEW"
else
    echo "Project still at /root/OPMNEW"
    PROJECT_PATH="/root/OPMNEW"
fi

# Create nginx config directly
echo "Creating nginx configuration..."
sudo tee /etc/nginx/sites-available/oneplanetmarket.com > /dev/null <<EOF
server {
    listen 80;
    server_name oneplanetmarket.com www.oneplanetmarket.com;
    
    # API routes - proxy to Node.js backend
    location /api/ {
        proxy_pass http://localhost:4000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # Stripe webhook endpoint
    location /stripe {
        proxy_pass http://localhost:4000/stripe;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # Static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        root $PROJECT_PATH/client/dist;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files \$uri =404;
    }
    
    # Frontend - React app
    location / {
        root $PROJECT_PATH/client/dist;
        try_files \$uri \$uri/ /index.html;
    }
    
    # Error pages
    error_page 404 /index.html;
    error_page 500 502 503 504 /index.html;
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/oneplanetmarket.com /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Fix permissions
sudo chown -R www-data:www-data $PROJECT_PATH/client/dist/ 2>/dev/null || sudo chown -R apache:apache $PROJECT_PATH/client/dist/ 2>/dev/null || sudo chmod -R 755 $PROJECT_PATH/client/dist/

# Test and reload nginx
sudo nginx -t && sudo systemctl reload nginx

echo "Configuration complete!"
echo "Project path: $PROJECT_PATH"
echo "Test with: curl -I http://oneplanetmarket.com"