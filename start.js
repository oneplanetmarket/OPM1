const { spawn } = require('child_process');
const path = require('path');

// Start the backend server
const server = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit'
});

console.log('🚀 OPM Backend started on port 4000');
console.log('Visit http://localhost:4000 to access the API');

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