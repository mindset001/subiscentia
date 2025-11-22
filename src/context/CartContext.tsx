'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';

interface CartItem {
  _id?: string;
  product: any;
  quantity: number;
  size: string;
  price: number;
}

interface Cart {
  _id?: string;
  items: CartItem[];
}

interface CartContextType {
  cart: Cart;
  loading: boolean;
  addToCart: (productId: string, quantity: number, size: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({ items: [] });
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');

  // Generate or get session ID
  useEffect(() => {
    let id = localStorage.getItem('sessionId');
    if (!id) {
      id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('sessionId', id);
    }
    setSessionId(id);
    loadCart(id);
  }, []);

  const loadCart = async (sessionId: string) => {
    try {
      setLoading(true);
      const response = await api.getCart(undefined, sessionId);
      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number, size: string) => {
    try {
      setLoading(true);
      const response = await api.addToCart({
        sessionId,
        productId,
        quantity,
        size,
      });
      
      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      setLoading(true);
      if (!cart._id) return;
      
      const response = await api.updateCartItem(cart._id, itemId, quantity);
      
      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      setLoading(true);
      if (!cart._id) return;
      
      const response = await api.removeFromCart(cart._id, itemId);
      
      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error removing item:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      if (!cart._id) return;
      
      const response = await api.clearCart(cart._id);
      
      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
