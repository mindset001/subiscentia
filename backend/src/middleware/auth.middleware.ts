import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    // @ts-ignore
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

// Optional auth - doesn't fail if no token
export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
      // @ts-ignore
      req.user = decoded;
    }
    
    next();
  } catch (error) {
    // Continue without auth if token is invalid
    next();
  }
};

// Alias for consistency
export const authenticate = authMiddleware;