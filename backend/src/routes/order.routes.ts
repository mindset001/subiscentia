import express from 'express';
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} from '../controllers/order.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Protected customer routes
router.post('/', authMiddleware, createOrder);
router.get('/my-orders', authMiddleware, getUserOrders);

// Admin routes
router.get('/all', authMiddleware, getAllOrders);
router.patch('/:id/status', authMiddleware, updateOrderStatus);

export default router;