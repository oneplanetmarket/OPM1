const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Building OPM for production...');

// Build the frontend if not already built
const distPath = path.join(__dirname, 'client', 'dist');
if (!fs.existsSync(distPath)) {
  console.log('Building frontend...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Frontend build complete!');
}

// Start the backend server
const server = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit'
});

console.log('🚀 OPM Production server started');
console.log('Backend API: http://localhost:4000');
console.log('Frontend App: http://localhost:4000');

// Handle cleanup
process.on('SIGINT', () => {
  server.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  server.kill();
  process.exit(0);
});

server.on('exit', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});