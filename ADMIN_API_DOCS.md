# Admin API Documentation

## Overview
All admin APIs are protected and require authentication with admin role.

### Authentication
All admin endpoints require:
- `Authorization: Bearer <token>` header
- User must have `role: 'admin'`

---

## Products API

### GET /api/products
**Public** - Get all products
```typescript
Response: {
  success: true,
  data: Product[]
}
```

### GET /api/products/:id
**Public** - Get single product
```typescript
Response: {
  success: true,
  data: Product
}
```

### POST /api/products
**Admin Only** - Create new product
```typescript
Body: {
  name: string,
  description: string,
  price: number,
  category: string,
  images: string[],
  stockQuantity: number,
  sizes?: Array<{ label: string, price: number }>
}

Response: {
  success: true,
  data: Product,
  message: "Product created successfully"
}
```

### PUT /api/products/:id
**Admin Only** - Update product
```typescript
Body: Partial<Product>

Response: {
  success: true,
  data: Product,
  message: "Product updated successfully"
}
```

### DELETE /api/products/:id
**Admin Only** - Delete product
```typescript
Response: {
  success: true,
  message: "Product deleted successfully"
}
```

### PATCH /api/products/:id/stock
**Admin Only** - Update product stock
```typescript
Body: { stockQuantity: number }

Response: {
  success: true,
  data: Product,
  message: "Stock updated successfully"
}
```

---

## Orders API

### GET /api/orders/all
**Admin Only** - Get all orders with pagination
```typescript
Query: {
  page?: number,
  limit?: number,
  status?: string
}

Response: {
  success: true,
  data: Order[],
  pagination: {
    total: number,
    pages: number,
    currentPage: number,
    perPage: number
  }
}
```

### GET /api/orders/:id
**Admin Only** - Get single order
```typescript
Response: {
  success: true,
  data: Order
}
```

### PATCH /api/orders/:id/status
**Admin Only** - Update order status
```typescript
Body: { status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' }

Response: {
  success: true,
  data: Order,
  message: "Order status updated successfully"
}
```

### DELETE /api/orders/:id
**Admin Only** - Delete order
```typescript
Response: {
  success: true,
  message: "Order deleted successfully"
}
```

### POST /api/orders
**Authenticated** - Create new order (customer)
```typescript
Body: {
  products: Array<{
    product: string,
    quantity: number,
    price: number
  }>,
  totalAmount: number,
  shippingAddress: object,
  paymentMethod: string
}

Response: {
  success: true,
  data: Order,
  message: "Order created successfully"
}
```

### GET /api/orders/my-orders
**Authenticated** - Get user's orders
```typescript
Response: {
  success: true,
  data: Order[]
}
```

---

## Customers API

### GET /api/customers
**Admin Only** - Get all customers with pagination
```typescript
Query: {
  page?: number,
  limit?: number,
  search?: string
}

Response: {
  success: true,
  data: Customer[],
  pagination: {
    total: number,
    pages: number,
    currentPage: number,
    perPage: number
  }
}

Customer includes:
- _id, email, firstName, lastName, name
- ordersCount: number
- totalSpent: number
- lastOrder: date
```

### GET /api/customers/:id
**Admin Only** - Get customer details
```typescript
Response: {
  success: true,
  data: {
    ...Customer,
    orders: Order[]
  }
}
```

### GET /api/customers/:id/orders
**Admin Only** - Get customer order history
```typescript
Query: { page?: number, limit?: number }

Response: {
  success: true,
  data: Order[],
  pagination: { total, pages, currentPage, perPage }
}
```

### GET /api/customers/:id/metrics
**Admin Only** - Get customer metrics
```typescript
Response: {
  success: true,
  data: {
    totalOrders: number,
    totalSpent: number,
    averageOrderValue: number,
    lastOrderDate: date
  }
}
```

### PATCH /api/customers/:id/newsletter
**Admin Only** - Update newsletter subscription
```typescript
Body: { newsletterSubscribed: boolean }

Response: {
  success: true,
  data: Customer,
  message: "Newsletter status updated successfully"
}
```

---

## Analytics API

### GET /api/analytics/dashboard
**Admin Only** - Get dashboard statistics
```typescript
Response: {
  success: true,
  data: {
    overview: {
      totalRevenue: number,
      totalOrders: number,
      totalCustomers: number
    },
    recentOrders: Order[],
    salesTrend: Array<{
      _id: string (date),
      revenue: number,
      orders: number
    }>,
    salesByCollection: Array<{
      _id: string (collection),
      totalSales: number,
      totalOrders: number
    }>,
    topProducts: Array<{
      _id: string,
      totalQuantity: number,
      totalRevenue: number,
      productDetails: Product
    }>
  }
}
```

---

## Frontend API Helper Usage

```typescript
import { api } from '@/lib/api';

// Products
const products = await api.getProducts();
const product = await api.getProduct(id);
const newProduct = await api.createProduct(data);
const updated = await api.updateProduct(id, data);
await api.deleteProduct(id);
await api.updateProductStock(id, quantity);

// Orders
const allOrders = await api.getAllOrders(page, limit, status);
const order = await api.getOrderById(id);
await api.updateOrderStatus(id, status);
await api.deleteOrder(id);

// Customers
const customers = await api.getCustomers(page, limit, search);
const customer = await api.getCustomerById(id);
const orders = await api.getCustomerOrders(id, page, limit);
const metrics = await api.getCustomerMetrics(id);
await api.updateCustomerNewsletter(id, subscribed);

// Analytics
const analytics = await api.getAnalytics();
const stats = await api.getDashboardStats();
```

---

## Admin Credentials

```
Email: admin@subiscentia.com
Password: Admin@2025!
```

Run `npm run create-admin` in backend to create admin user.

---

## Notes

- All responses include `success: true/false` flag
- Error responses include `message` field
- Pagination is consistent across all list endpoints
- All authenticated routes require valid JWT token
- Token expires after 24 hours
