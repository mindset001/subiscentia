import express from 'express';
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} from '../controllers/order.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/admin.middleware';

const router = express.Router();

// Protected customer routes
router.post('/', authenticate, createOrder);
router.get('/my-orders', authenticate, getUserOrders);

// Admin routes
router.get('/all', authenticate, requireAdmin, getAllOrders);
router.get('/:id', authenticate, requireAdmin, getOrderById);
router.patch('/:id/status', authenticate, requireAdmin, updateOrderStatus);
router.delete('/:id', authenticate, requireAdmin, deleteOrder);

export default router;