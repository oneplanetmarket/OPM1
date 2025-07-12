#!/bin/bash

echo "=== Fixing 502 Bad Gateway Error ==="
echo "This means nginx can't connect to your Node.js backend"
echo ""

# 1. Find the project directory
echo "1. Finding project directory..."
PROJECT_DIR=""
for dir in "/root/OPMNEW" "/var/www/OPMNEW" "/home/*/OPMNEW" "/opt/OPMNEW" "$(pwd)"; do
    if [ -d "$dir" ] && [ -f "$dir/server/server.js" ]; then
        PROJECT_DIR="$dir"
        echo "Found project at: $PROJECT_DIR"
        break
    fi
done

if [ -z "$PROJECT_DIR" ]; then
    echo "ERROR: Project directory not found. Searching..."
    FOUND_DIR=$(find / -name "server.js" -path "*/server/server.js" 2>/dev/null | head -1)
    if [ -n "$FOUND_DIR" ]; then
        PROJECT_DIR="$(dirname $(dirname $FOUND_DIR))"
        echo "Found project at: $PROJECT_DIR"
    else
        echo "ERROR: Project not found. Please upload your project files."
        exit 1
    fi
fi

# 2. Stop any existing processes
echo ""
echo "2. Stopping existing processes..."
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true
pkill -f "node.*server" 2>/dev/null || true
pkill -f "npm.*dev" 2>/dev/null || true

# 3. Check if Node.js is installed
echo ""
echo "3. Checking Node.js installation..."
node --version || echo "Node.js not found"
npm --version || echo "npm not found"

# 4. Install dependencies
echo ""
echo "4. Installing dependencies..."
cd "$PROJECT_DIR"
npm install

# 5. Check if .env file exists
echo ""
echo "5. Checking environment variables..."
if [ ! -f "$PROJECT_DIR/server/.env" ]; then
    echo "Creating .env file..."
    cat > "$PROJECT_DIR/server/.env" << 'EOF'
PORT=4000
NODE_ENV=production
DATABASE_URL=mongodb://localhost:27017/greencart
JWT_SECRET=your-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
STRIPE_SECRET_KEY=your-stripe-secret
EOF
fi

# 6. Start the backend server
echo ""
echo "6. Starting backend server..."
cd "$PROJECT_DIR"
pm2 start server/server.js --name "opm-backend" --watch

# 7. Check if backend is running
echo ""
echo "7. Checking backend status..."
sleep 3
curl -I http://localhost:4000 --connect-timeout 5
pm2 status

# 8. Test nginx proxy
echo ""
echo "8. Testing nginx proxy..."
curl -I http://localhost --connect-timeout 5

echo ""
echo "=== Fix Complete ==="
echo "Backend should now be running on port 4000"
echo "Test: curl -I http://localhost:4000"
echo "If still 502, check: pm2 logs omp-backend"