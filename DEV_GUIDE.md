# Subi Scentia - Development Guide

## Quick Start

### 1. Install Dependencies

```powershell
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Setup Environment Variables

Backend `.env` file is already created at `backend/.env`
Frontend `.env.local` file is already created at `.env.local`

### 3. Start MongoDB

Make sure MongoDB is running on your local machine:
```powershell
# If you have MongoDB installed locally
mongod
```

Or use MongoDB Atlas and update the `MONGODB_URI` in `backend/.env`

### 4. Start Development Servers

**Option A: Start Both Servers at Once (Recommended)**
```powershell
.\start-dev.ps1
```

**Option B: Start Servers Separately**

Terminal 1 - Backend:
```powershell
cd backend
npm run dev
```

Terminal 2 - Frontend:
```powershell
npm run dev
```

## Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## Features Implemented

### Backend (Express/Node.js/MongoDB)
✅ Database configuration
✅ User authentication (JWT)
✅ Product management
✅ Order management
✅ Cart functionality
✅ Customer management
✅ Newsletter subscriptions
✅ Analytics endpoints

### Frontend (Next.js/React)
✅ Complete UI for all pages
✅ Cart context for global state
✅ API integration utilities
✅ Custom font system (Sephir, Sackers, Circular)

## API Endpoints

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get product by ID
- POST `/api/products` - Create product (Admin)
- PUT `/api/products/:id` - Update product (Admin)
- DELETE `/api/products/:id` - Delete product (Admin)

### Cart
- GET `/api/cart` - Get cart by user/session
- POST `/api/cart/add` - Add item to cart
- PUT `/api/cart/update` - Update cart item
- DELETE `/api/cart/:cartId/item/:itemId` - Remove item
- DELETE `/api/cart/:cartId/clear` - Clear cart

### Orders
- GET `/api/orders` - Get all orders
- GET `/api/orders/:id` - Get order by ID
- POST `/api/orders` - Create order
- PUT `/api/orders/:id/status` - Update order status

### Newsletter
- POST `/api/newsletter/subscribe` - Subscribe to newsletter

### Auth
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### Customers
- GET `/api/customers` - Get all customers
- GET `/api/customers/:id` - Get customer by ID

### Analytics
- GET `/api/analytics` - Get analytics data

## Next Steps

1. ✅ Backend setup complete
2. ✅ Frontend cart integration ready
3. 🔄 Add product data to database
4. 🔄 Test cart functionality
5. 🔄 Implement checkout flow
6. 🔄 Add payment integration (Stripe/PayPal)
7. 🔄 Add authentication UI (Login/Register pages)
8. 🔄 Add image upload for admin
9. 🔄 Deploy to production

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `backend/.env`
- Try MongoDB Compass to verify connection

### Port Already in Use
```powershell
# Find and kill process on port 3000 or 5000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module Not Found Errors
```powershell
# Clear and reinstall dependencies
rm -r node_modules
npm install
```
