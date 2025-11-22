const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const api = {
  // Products
  getProducts: async () => {
    const res = await fetch(`${API_BASE_URL}/products`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  getProduct: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    return res.json();
  },

  getProductById: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    return res.json();
  },

  createProduct: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateProduct: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteProduct: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  updateProductStock: async (id: string, stockQuantity: number) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}/stock`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ stockQuantity }),
    });
    return res.json();
  },

  publishProduct: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}/publish`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  unpublishProduct: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}/unpublish`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Upload
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/upload/single`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: formData,
    });
    return res.json();
  },

  uploadMultipleImages: async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/upload/multiple`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: formData,
    });
    return res.json();
  },

  deleteImage: async (publicId: string) => {
    const res = await fetch(`${API_BASE_URL}/upload/delete`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      body: JSON.stringify({ publicId }),
    });
    return res.json();
  },

  // Cart
  getCart: async (userId?: string, sessionId?: string) => {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    if (sessionId) params.append('sessionId', sessionId);
    
    const res = await fetch(`${API_BASE_URL}/cart?${params}`);
    return res.json();
  },

  addToCart: async (data: {
    userId?: string;
    sessionId?: string;
    productId: string;
    quantity: number;
    size: string;
  }) => {
    const res = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateCartItem: async (cartId: string, itemId: string, quantity: number) => {
    const res = await fetch(`${API_BASE_URL}/cart/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartId, itemId, quantity }),
    });
    return res.json();
  },

  removeFromCart: async (cartId: string, itemId: string) => {
    const res = await fetch(`${API_BASE_URL}/cart/${cartId}/item/${itemId}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  clearCart: async (cartId: string) => {
    const res = await fetch(`${API_BASE_URL}/cart/${cartId}/clear`, {
      method: 'DELETE',
    });
    return res.json();
  },

  // Orders
  createOrder: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getOrders: async () => {
    const res = await fetch(`${API_BASE_URL}/orders/my-orders`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  getAllOrders: async (page = 1, limit = 10, status?: string) => {
    const params = new URLSearchParams({ 
      page: page.toString(), 
      limit: limit.toString() 
    });
    if (status) params.append('status', status);
    
    const res = await fetch(`${API_BASE_URL}/orders/all?${params}`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  getOrderById: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  updateOrderStatus: async (id: string, status: string) => {
    const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    return res.json();
  },

  deleteOrder: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Newsletter
  subscribeNewsletter: async (email: string) => {
    const res = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return res.json();
  },

  getNewsletterSubscribers: async (page = 1, limit = 10) => {
    const params = new URLSearchParams({ 
      page: page.toString(), 
      limit: limit.toString()
    });
    const res = await fetch(`${API_BASE_URL}/newsletter/subscribers?${params}`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  unsubscribeNewsletter: async (email: string) => {
    const res = await fetch(`${API_BASE_URL}/newsletter/unsubscribe`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ email }),
    });
    return res.json();
  },

  // Customers
  getCustomers: async (page = 1, limit = 10, search = '') => {
    const params = new URLSearchParams({ 
      page: page.toString(), 
      limit: limit.toString(),
      ...(search && { search })
    });
    const res = await fetch(`${API_BASE_URL}/customers?${params}`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  getCustomerById: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/customers/${id}`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  getCustomerOrders: async (id: string, page = 1, limit = 10) => {
    const params = new URLSearchParams({ 
      page: page.toString(), 
      limit: limit.toString()
    });
    const res = await fetch(`${API_BASE_URL}/customers/${id}/orders?${params}`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  getCustomerMetrics: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/customers/${id}/metrics`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  updateCustomerNewsletter: async (id: string, newsletterSubscribed: boolean) => {
    const res = await fetch(`${API_BASE_URL}/customers/${id}/newsletter`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ newsletterSubscribed }),
    });
    return res.json();
  },

  // Analytics
  getAnalytics: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  getDashboardStats: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics/dashboard`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Auth
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  register: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
