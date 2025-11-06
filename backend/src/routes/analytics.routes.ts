import express from 'express';
import { getDashboardStats } from '../controllers/analytics.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

const router = express.Router();

// Admin only routes
router.get('/dashboard', authMiddleware, adminMiddleware, getDashboardStats);

export default router;