import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import producerRouter from './routes/producerRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import newsletterRouter from './routes/newsletterRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Find available port starting from 4000
const findAvailablePort = async (startPort) => {
    return new Promise((resolve) => {
        import('net').then(net => {
            const server = net.createServer();
            
            server.listen(startPort, () => {
                const port = server.address().port;
                server.close(() => resolve(port));
            });
            
            server.on('error', () => {
                findAvailablePort(startPort + 1).then(resolve);
            });
        });
    });
};

const port = process.env.PORT || 4000;

await connectDB()
await connectCloudinary()

// Allow multiple origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5000',
  'https://your-app.replit.app',
  process.env.FRONTEND_URL || 'http://localhost:5000'
]

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in our allowed origins or if it's a replit.app domain
    if (allowedOrigins.includes(origin) || origin.includes('.replit.app')) {
      return callback(null, true);
    }
    
    return callback(null, true); // Allow all origins for deployment
  },
  credentials: true
}));

// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// API routes
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/producer', producerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)
app.use('/api/newsletter', newsletterRouter)

// Health check endpoint
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'API is Working' }));

// Serve React app for all other routes
app.get('*', (req, res) => {
  try {
    const filePath = path.join(__dirname, '../client/dist/index.html');
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Internal Server Error');
      }
    });
  } catch (error) {
    console.error('Catch-all route error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start server with port conflict handling
const startServer = async () => {
    try {
        const availablePort = await findAvailablePort(port);
        const server = app.listen(availablePort, '0.0.0.0', ()=>{
            console.log(`Server is running on http://0.0.0.0:${availablePort}`)
            console.log(`Local access: http://localhost:${availablePort}`)
        });
        
        // Handle server errors
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${availablePort} is already in use. Trying next port...`);
                startServer();
            } else {
                console.error('Server error:', err);
                process.exit(1);
            }
        });
        
        return server;
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Start the server
startServer().then(server => {
    // Graceful shutdown handlers
    process.on('SIGTERM', () => {
        console.log('SIGTERM received, shutting down gracefully');
        server.close(() => {
            console.log('Server closed');
            process.exit(0);
        });
    });

    process.on('SIGINT', () => {
        console.log('SIGINT received, shutting down gracefully');
        server.close(() => {
            console.log('Server closed');
            process.exit(0);
        });
    });
});