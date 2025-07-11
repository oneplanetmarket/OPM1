#!/bin/bash

echo "Starting OPM development servers..."

# Start server in background from root directory
(cd server && npm run server) &
SERVER_PID=$!

# Start client in background from root directory
(cd client && npm run dev) &
CLIENT_PID=$!

# Function to cleanup background processes
cleanup() {
    echo "Shutting down servers..."
    kill $SERVER_PID $CLIENT_PID 2>/dev/null
    exit
}

# Trap cleanup function on exit
trap cleanup EXIT

# Wait for both processes
wait $SERVER_PID $CLIENT_PID