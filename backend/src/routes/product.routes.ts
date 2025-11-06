import express from 'express';
import { getAllProducts, createProduct, getProductById } from '../controllers/product.controller';

const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Create a new product
router.post('/', createProduct);

// Get a specific product
router.get('/:id', getProductById);

export default router;