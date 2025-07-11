#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('Starting OPM development servers...');

// Start server
const server = spawn('npm', ['run', 'server'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit'
});

// Start client
const client = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: 'inherit'
});

// Handle cleanup
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  server.kill();
  client.kill();
  process.exit();
});

server.on('close', (code) => {
  console.log(`Server exited with code ${code}`);
  client.kill();
});

client.on('close', (code) => {
  console.log(`Client exited with code ${code}`);
  server.kill();
});