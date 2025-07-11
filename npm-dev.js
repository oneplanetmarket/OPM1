#!/usr/bin/env node

// This script serves as a replacement for 'npm run dev'
// It executes the existing dev executable
const { spawn } = require('child_process');
const path = require('path');

// Execute the existing dev script
const devProcess = spawn('node', ['dev'], {
  cwd: __dirname,
  stdio: 'inherit'
});

// Handle process exit
devProcess.on('exit', (code) => {
  process.exit(code);
});

// Handle cleanup
process.on('SIGINT', () => {
  devProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  devProcess.kill('SIGTERM');
});