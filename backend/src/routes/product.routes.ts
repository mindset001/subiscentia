import express from 'express';
import { 
  getAllProducts, 
  createProduct, 
  getProductById, 
  updateProduct, 
  deleteProduct,
  updateProductStock,
  publishProduct,
  unpublishProduct
} from '../controllers/product.controller';
import { authenticate, optionalAuth } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/admin.middleware';

const router = express.Router();

// Public routes (with optional auth to detect admin users)
router.get('/', optionalAuth, getAllProducts);
router.get('/:id', getProductById);

// Admin only routes
router.post('/', authenticate, requireAdmin, createProduct);
router.put('/:id', authenticate, requireAdmin, updateProduct);
router.delete('/:id', authenticate, requireAdmin, deleteProduct);
router.patch('/:id/stock', authenticate, requireAdmin, updateProductStock);
router.put('/:id/publish', authenticate, requireAdmin, publishProduct);
router.put('/:id/unpublish', authenticate, requireAdmin, unpublishProduct);

export default router;