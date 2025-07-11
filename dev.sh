#!/bin/bash

# OPM Development Environment Starter
echo "🚀 Starting OPM Development Environment..."

# Start backend server in the background
cd server && node server.js &
SERVER_PID=$!

# Wait a moment for server to start
sleep 3

# Start frontend development server
cd ../client && npx vite &
CLIENT_PID=$!

# Handle cleanup
cleanup() {
    echo "Shutting down servers..."
    kill $SERVER_PID 2>/dev/null
    kill $CLIENT_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait $SERVER_PID
wait $CLIENT_PID