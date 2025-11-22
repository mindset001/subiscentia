import { v2 as cloudinary } from 'cloudinary';
import { Request } from 'express';
import multer from 'multer';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer to use memory storage
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  },
});

// Upload image to Cloudinary
export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder: string = 'subi-scentia'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { width: 1000, height: 1000, crop: 'limit' },
          { quality: 'auto' },
          { fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error('Upload failed'));
        }
      }
    );

    const readableStream = Readable.from(fileBuffer);
    readableStream.pipe(uploadStream);
  });
};

// Upload multiple images
export const uploadMultipleToCloudinary = async (
  files: Express.Multer.File[],
  folder: string = 'subi-scentia'
): Promise<string[]> => {
  const uploadPromises = files.map((file) =>
    uploadToCloudinary(file.buffer, folder)
  );
  return Promise.all(uploadPromises);
};

// Delete image from Cloudinary
export const deleteFromCloudinary = async (imageUrl: string): Promise<void> => {
  try {
    // Extract public_id from URL
    const parts = imageUrl.split('/');
    const filename = parts[parts.length - 1];
    const publicId = `subi-scentia/${filename.split('.')[0]}`;
    
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

export default cloudinary;
