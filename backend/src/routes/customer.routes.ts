import express from 'express';
import {
  getAllCustomers,
  getCustomerDetails,
  updateCustomerNewsletter,
  getCustomerOrderHistory,
  getCustomerMetrics
} from '../controllers/customer.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

const router = express.Router();

// All routes are protected and admin-only
router.use(authMiddleware, adminMiddleware);

// Get all customers with pagination and search
router.get('/', getAllCustomers);

// Get detailed information about a specific customer
router.get('/:id', getCustomerDetails);

// Update customer's newsletter subscription status
router.patch('/:id/newsletter', updateCustomerNewsletter);

// Get customer's order history
router.get('/:id/orders', getCustomerOrderHistory);

// Get customer's metrics (total spent, average order value, etc.)
router.get('/:id/metrics', getCustomerMetrics);

export default router;