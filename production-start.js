const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 OPM Production Server Starting...');

// Check if .env file exists
const envPath = path.join(__dirname, 'server', '.env');
if (!fs.existsSync(envPath)) {
    console.error('❌ .env file not found at server/.env');
    console.log('Please create server/.env with required environment variables');
    process.exit(1);
}

// Load environment variables
require('dotenv').config({ path: envPath });

// Check required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars.join(', '));
    process.exit(1);
}

// Kill existing processes
console.log('🔄 Stopping existing processes...');
exec('pkill -f "node.*server" 2>/dev/null || true', (error) => {
    console.log('✅ Cleaned up existing processes');
    
    // Build frontend first
    console.log('🔨 Building frontend...');
    exec('cd client && npm run build', (error, stdout, stderr) => {
        if (error) {
            console.error('❌ Frontend build failed:', error.message);
            process.exit(1);
        }
        
        console.log('✅ Frontend built successfully');
        
        // Start server
        console.log('🚀 Starting server...');
        setTimeout(() => {
            require('./server/server.js');
        }, 1000);
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM, shutting down...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Received SIGINT, shutting down...');
    process.exit(0);
});