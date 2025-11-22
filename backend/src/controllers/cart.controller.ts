import { Request, Response } from 'express';
import Cart from '../models/cart.model';
import Product from '../models/product.model';

// Get cart by user or session
export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId, sessionId } = req.query;
    
    const query = userId ? { user: userId } : { sessionId };
    const cart = await Cart.findOne(query).populate('items.product');
    
    if (!cart) {
      return res.json({ success: true, data: { items: [] } });
    }
    
    res.json({ success: true, data: cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add item to cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, sessionId, productId, quantity, size } = req.body;
    
    // Get product to verify price
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    const query = userId ? { user: userId } : { sessionId };
    let cart = await Cart.findOne(query);
    
    if (!cart) {
      cart = new Cart({
        ...(userId ? { user: userId } : { sessionId }),
        items: []
      });
    }
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId && item.size === size
    );
    
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        size,
        price: product.price
      });
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json({ success: true, data: cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update cart item
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { cartId, itemId, quantity } = req.body;
    
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    
    const item = cart.items.find(item => item._id?.toString() === itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }
    
    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item._id?.toString() !== itemId);
    } else {
      item.quantity = quantity;
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json({ success: true, data: cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { cartId, itemId } = req.params;
    
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(item => item._id?.toString() !== itemId);
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json({ success: true, data: cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Clear cart
export const clearCart = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params;
    
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    
    cart.items = [];
    await cart.save();
    
    res.json({ success: true, message: 'Cart cleared', data: cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
