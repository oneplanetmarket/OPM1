#!/bin/bash

echo "🚀 OPM VPS Deployment Script"
echo "============================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for required commands
echo "🔍 Checking requirements..."
if ! command_exists node; then
    echo "❌ Node.js is not installed"
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ Requirements check passed"

# Check environment variables
echo "🔍 Checking environment variables..."
if [ -z "$MONGODB_URI" ]; then
    echo "⚠️  MONGODB_URI not found in environment"
    echo "Please set it with: export MONGODB_URI='your-mongodb-connection-string'"
fi

if [ -z "$JWT_SECRET" ]; then
    echo "⚠️  JWT_SECRET not found in environment"
    echo "Please set it with: export JWT_SECRET='your-jwt-secret'"
fi

# Kill existing processes
echo "🔄 Stopping existing processes..."
pkill -f "node.*server" 2>/dev/null || echo "No existing processes found"
pkill -f "node.*4000" 2>/dev/null || echo "No processes on port 4000"

# Wait for processes to stop
sleep 2

# Build frontend
echo "🔨 Building frontend..."
cd client
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi
cd ..

echo "✅ Frontend build completed"

# Start server
echo "🚀 Starting server..."
export NODE_ENV=production
node server/server.js &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Check if server is running
if kill -0 $SERVER_PID 2>/dev/null; then
    echo "✅ Server started successfully (PID: $SERVER_PID)"
    echo "🌐 Server should be accessible on port 4000 or higher"
    echo "📝 Use 'kill $SERVER_PID' to stop the server"
else
    echo "❌ Server failed to start"
    exit 1
fi

# Keep script running
wait $SERVER_PID