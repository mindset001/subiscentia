import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking admin status', error });
  }
};

// Alias for consistency
export const requireAdmin = adminMiddleware;