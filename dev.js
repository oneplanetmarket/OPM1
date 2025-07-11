#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting OPM Development Environment...');

// Start backend server
const server = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit'
});

// Wait a moment for server to start, then start frontend
setTimeout(() => {
  const frontend = spawn('npx', ['vite'], {
    cwd: path.join(__dirname, 'client'),
    stdio: 'inherit'
  });

  // Handle cleanup
  const cleanup = () => {
    server.kill('SIGTERM');
    frontend.kill('SIGTERM');
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  
  frontend.on('exit', cleanup);
  server.on('exit', cleanup);
}, 2000);

console.log('Backend API: http://localhost:4000');
console.log('Frontend App: http://localhost:5173');