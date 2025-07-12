#!/bin/bash

echo "Finding and fixing OPM project location..."

# Find the project directory
PROJECT_DIR=""
for dir in "/root/OPMNEW" "/var/www/OPMNEW" "/home/*/OPMNEW" "/opt/OPMNEW" "~/OPMNEW"; do
    if [ -d "$dir" ]; then
        PROJECT_DIR="$dir"
        echo "Found project at: $PROJECT_DIR"
        break
    fi
done

# If not found, search for it
if [ -z "$PROJECT_DIR" ]; then
    echo "Searching for OPMNEW directory..."
    FOUND_DIR=$(find / -name "OPMNEW" -type d 2>/dev/null | head -1)
    if [ -n "$FOUND_DIR" ]; then
        PROJECT_DIR="$FOUND_DIR"
        echo "Found project at: $PROJECT_DIR"
    else
        echo "ERROR: OPMNEW directory not found anywhere!"
        echo "Please check if the project was uploaded correctly"
        exit 1
    fi
fi

# Create nginx config with correct path
echo "Creating nginx configuration for path: $PROJECT_DIR"
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
        root $PROJECT_DIR/client/dist;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files \$uri =404;
    }
    
    # Frontend - React app
    location / {
        root $PROJECT_DIR/client/dist;
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
sudo chmod 755 $(dirname $PROJECT_DIR) 2>/dev/null || true
sudo chmod -R 755 $PROJECT_DIR/client/dist/ 2>/dev/null || true

# Test nginx config
sudo nginx -t && sudo systemctl reload nginx

# Start PM2 from correct directory
cd $PROJECT_DIR
pm2 stop all 2>/dev/null || true
pm2 start server/server.js --name omp-backend
pm2 save

echo "Setup complete!"
echo "Project directory: $PROJECT_DIR"
echo "Testing site..."
curl -I http://oneplanetmarket.com