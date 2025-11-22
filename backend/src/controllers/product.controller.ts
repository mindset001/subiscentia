import { Request, Response } from 'express';
import Product from '../models/product.model';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Check if request is from admin by looking at user role in request
    const isAdmin = (req as any).user?.role === 'admin';
    console.log('User:', (req as any).user);
    console.log('Is Admin:', isAdmin);
    
    // If admin, show all products. Otherwise, show only published products
    const filter = isAdmin ? {} : { isPublished: true };
    console.log('Filter:', filter);
    
    const products = await Product.find(filter);
    console.log('Products found:', products.length);
    
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    res.status(500).json({ success: false, message: 'Error fetching products', error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, data: product, message: 'Product created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating product', error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching product', error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, data: product, message: 'Product updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating product', error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting product', error });
  }
};

export const updateProductStock = async (req: Request, res: Response) => {
  try {
    const { stockQuantity } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stockQuantity },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, data: product, message: 'Stock updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating stock', error });
  }
};

export const publishProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isPublished: true, publishedAt: new Date() },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, data: product, message: 'Product published successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error publishing product', error });
  }
};

export const unpublishProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isPublished: false },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, data: product, message: 'Product unpublished successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error unpublishing product', error });
  }
};