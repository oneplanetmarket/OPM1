const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting VPS Deployment Setup...');

// Check if environment variables are set
if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI environment variable is not set');
    console.log('Please set your MongoDB connection string:');
    console.log('export MONGODB_URI="mongodb://your-connection-string"');
    process.exit(1);
}

// Kill existing processes
console.log('🔄 Stopping existing processes...');
exec('pkill -f "node.*4000" 2>/dev/null', (error) => {
    if (error) {
        console.log('✅ No existing processes found');
    } else {
        console.log('✅ Stopped existing processes');
    }
    
    // Build frontend
    console.log('🔨 Building frontend...');
    exec('cd client && npm run build', (error, stdout, stderr) => {
        if (error) {
            console.error('❌ Frontend build failed:', error);
            process.exit(1);
        }
        
        console.log('✅ Frontend built successfully');
        
        // Start server
        console.log('🚀 Starting server...');
        const server = require('./server/server.js');
        
        console.log('✅ Server started successfully');
        console.log('📝 Server is running and ready for production');
    });
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Received SIGINT, shutting down gracefully...');
    process.exit(0);
});