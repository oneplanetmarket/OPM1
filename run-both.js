#!/usr/bin/env node

const concurrently = require('concurrently');

const { result } = concurrently([
  {
    command: 'cd server && npm run server',
    name: 'backend',
    prefixColor: 'blue'
  },
  {
    command: 'cd client && npm run dev',
    name: 'frontend',
    prefixColor: 'green'
  }
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 3,
});

result.then(() => {
  console.log('All servers started successfully');
}).catch((err) => {
  console.error('Error starting servers:', err);
  process.exit(1);
});

console.log('🚀 Starting OPM development servers...');
console.log('Backend: http://localhost:4000');
console.log('Frontend: http://localhost:5000');