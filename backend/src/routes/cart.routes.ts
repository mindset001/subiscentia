import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cart.controller';

const router = express.Router();

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update', updateCartItem);
router.delete('/:cartId/item/:itemId', removeFromCart);
router.delete('/:cartId/clear', clearCart);

export default router;
