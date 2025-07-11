const { exec } = require('child_process');

// Kill any existing processes on port 4000
exec('pkill -f "node.*4000" 2>/dev/null', (error) => {
    if (error) {
        console.log('No existing processes found on port 4000');
    } else {
        console.log('Stopped existing processes on port 4000');
    }
    
    // Wait a moment then start the server
    setTimeout(() => {
        console.log('Starting OPM server...');
        require('./server/server.js');
    }, 2000);
});