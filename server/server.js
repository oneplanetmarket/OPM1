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
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})