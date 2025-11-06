import express from 'express';
import {
  subscribe,
  unsubscribe,
  getSubscribers
} from '../controllers/newsletter.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);

// Admin routes
router.get('/subscribers', authMiddleware, getSubscribers);

export default router;