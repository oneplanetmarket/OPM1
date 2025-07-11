#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Start the backend server
const server = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit'
});

// Add a small delay to ensure server starts first
setTimeout(() => {
  // Start the frontend development server
  const client = spawn('npx', ['vite'], {
    cwd: path.join(__dirname, 'client'),
    stdio: 'inherit'
  });

  // Handle cleanup
  const cleanup = () => {
    server.kill('SIGTERM');
    client.kill('SIGTERM');
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  
  client.on('exit', cleanup);
  server.on('exit', cleanup);
}, 1000);

console.log('Starting OPM development servers...');
console.log('Backend server starting on port 4000');
console.log('Frontend server starting on port 5000');