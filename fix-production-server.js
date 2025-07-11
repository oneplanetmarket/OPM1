// Fixed production server that uses port 4000 consistently
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './server/configs/db.js';
import 'dotenv/config';
import userRouter from './server/routes/userRoute.js';
import sellerRouter from './server/routes/sellerRoute.js';
import connectCloudinary from './server/configs/cloudinary.js';
import productRouter from './server/routes/productRoute.js';
import producerRouter from './server/routes/producerRoute.js';
import cartRouter from './server/routes/cartRoute.js';
import addressRouter from './server/routes/addressRoute.js';
import orderRouter from './server/routes/orderRoute.js';
import newsletterRouter from './server/routes/newsletterRoute.js';
import { stripeWebhooks } from './server/controllers/orderController.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000; // Fixed port for production

await connectDB();
await connectCloudinary();

// CORS configuration
const allowedOrigins = [
  'https://oneplanetmarket.com',
  'http://oneplanetmarket.com',
  'https://www.oneplanetmarket.com',
  'http://www.oneplanetmarket.com'
];

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // Allow all origins for deployment
  },
  credentials: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'client/dist')));

// API routes
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/producer', producerRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/newsletter', newsletterRouter);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'API is Working' }));

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start server
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Production server running on http://0.0.0.0:${port}`);
});

// Graceful shutdown
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