import express from 'express';
import { uploadImage, uploadMultipleImages, deleteImage } from '../controllers/upload.controller';
import { upload } from '../config/cloudinary';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/admin.middleware';

const router = express.Router();

// Admin only routes - upload images
router.post('/single', authenticate, requireAdmin, upload.single('image'), uploadImage);
router.post('/multiple', authenticate, requireAdmin, upload.array('images', 10), uploadMultipleImages);
router.delete('/delete', authenticate, requireAdmin, deleteImage);

export default router;
