# OPM - One Planet Market

## Overview

OPM (One Planet Market) is a full-stack e-commerce platform focused on sustainable and artisanal products. The application connects consumers with producers of traditional crafts, organic foods, and eco-friendly goods, promoting fair trade and environmental consciousness.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 19 with Vite for fast development and building
- **Styling**: Tailwind CSS v4 with custom themes and Google Fonts (Outfit, Poppins)
- **Routing**: React Router DOM v7 for client-side navigation
- **State Management**: React hooks with context (inferred from structure)
- **HTTP Client**: Axios for API communication
- **UI Components**: Lucide React for icons, React Hot Toast for notifications
- **Build Tool**: Vite with React plugin and Tailwind CSS integration

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with HTTP-only cookies
- **File Storage**: Cloudinary for image uploads
- **Payment Processing**: Stripe integration for online payments
- **File Upload**: Multer for handling multipart/form-data

## Key Components

### User Management
- **Registration/Login**: JWT-based authentication with bcrypt password hashing
- **Role-based Access**: Separate authentication for users and sellers
- **Session Management**: HTTP-only cookies for security

### Product Management
- **Product CRUD**: Full product lifecycle management
- **Image Handling**: Multiple image uploads via Cloudinary
- **Inventory Tracking**: Stock status management
- **Categories**: Organized product categorization (Carpets, Pottery, Textiles, etc.)

### Shopping Experience
- **Cart Management**: Persistent cart data stored in user profile
- **Address Management**: Multiple shipping addresses per user
- **Order Processing**: Support for both COD and Stripe payments
- **Producer Applications**: System for onboarding new producers

### Seller Dashboard
- **Product Management**: Add, edit, and manage product listings
- **Order Management**: View and process customer orders
- **Stock Control**: Update inventory levels

## Data Flow

1. **User Registration/Login**: Client sends credentials → Server validates → JWT token issued → Cookie set
2. **Product Browsing**: Client requests products → Server fetches from MongoDB → Returns product list
3. **Cart Operations**: Client updates cart → Server updates user's cart data in MongoDB
4. **Order Placement**: Client submits order → Server processes payment (Stripe/COD) → Order stored in MongoDB
5. **File Uploads**: Client uploads images → Multer processes → Cloudinary stores → URLs returned

## External Dependencies

### Third-Party Services
- **Cloudinary**: Image storage and processing
- **Stripe**: Payment processing and webhooks
- **MongoDB Atlas**: Database hosting (inferred from connection string)

### Key Libraries
- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router DOM
- **Backend**: Express, Mongoose, JWT, bcrypt, Multer, Stripe SDK
- **Development**: ESLint, Nodemon, PostCSS, Autoprefixer

## Deployment Strategy

### Frontend (Vercel)
- **Build**: Vite production build
- **Routing**: SPA routing with fallback to index.html
- **Environment**: Environment variables for API endpoints

### Backend (Vercel)
- **Runtime**: Node.js serverless functions
- **Configuration**: Vercel.json for routing and build settings
- **Environment Variables**: MongoDB URI, JWT secrets, Stripe keys, Cloudinary credentials

### Database
- **MongoDB**: Cloud-hosted with "greencart" database name
- **Collections**: Users, Products, Orders, Addresses, Producer Applications

### Security Considerations
- HTTP-only cookies for authentication
- CORS configuration for cross-origin requests
- Environment-based security settings (production vs development)
- Password hashing with bcrypt
- JWT token expiration (7 days)

### Payment Integration
- Stripe webhook endpoint for payment confirmation
- Support for both online payments and cash on delivery
- Tax calculation (2% added to orders)
- Order amount validation against product prices