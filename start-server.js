const { exec } = require('child_process');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './server/.env' });

console.log('🚀 Starting OPM Production Server...');

// Check MongoDB connection
if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables');
    process.exit(1);
}

// Kill existing processes on port 4000
console.log('🔄 Checking for existing processes...');
exec('pgrep -f "node.*4000" | xargs kill -9 2>/dev/null', (error) => {
    if (error) {
        console.log('✅ No existing processes found');
    } else {
        console.log('✅ Stopped existing processes');
    }
    
    // Start server after a short delay
    setTimeout(async () => {
        console.log('🚀 Starting server...');
        require('./server/server.js');
    }, 1000);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Shutting down gracefully...');
    process.exit(0);
});