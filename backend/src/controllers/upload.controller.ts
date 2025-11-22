import { Request, Response } from 'express';
import { uploadToCloudinary, uploadMultipleToCloudinary, deleteFromCloudinary } from '../config/cloudinary';

// Upload single image
export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const imageUrl = await uploadToCloudinary(req.file.buffer, 'subi-scentia/products');

    res.status(200).json({
      success: true,
      data: { url: imageUrl },
      message: 'Image uploaded successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: error.message,
    });
  }
};

// Upload multiple images
export const uploadMultipleImages = async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const imageUrls = await uploadMultipleToCloudinary(req.files, 'subi-scentia/products');

    res.status(200).json({
      success: true,
      data: { urls: imageUrls },
      message: `${imageUrls.length} images uploaded successfully`,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error uploading images',
      error: error.message,
    });
  }
};

// Delete image
export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'Image URL is required' });
    }

    await deleteFromCloudinary(imageUrl);

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error deleting image',
      error: error.message,
    });
  }
};
