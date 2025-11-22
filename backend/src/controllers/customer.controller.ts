import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user.model';
import Order from '../models/order.model';

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    
    // Build search query
    const searchQuery = search 
      ? {
          role: 'customer',
          $or: [
            { email: { $regex: search, $options: 'i' } },
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } }
          ]
        }
      : { role: 'customer' };

    // Get customers with their orders count and total spent
    const customers = await User.aggregate([
      { $match: searchQuery },
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'user',
          as: 'orders'
        }
      },
      {
        $project: {
          _id: 1,
          email: 1,
          firstName: 1,
          lastName: 1,
          newsletterSubscribed: 1,
          createdAt: 1,
          ordersCount: { $size: '$orders' },
          totalSpent: {
            $sum: {
              $map: {
                input: '$orders',
                as: 'order',
                in: { $cond: [{ $eq: ['$$order.paymentStatus', 'paid'] }, '$$order.totalAmount', 0] }
              }
            }
          },
          lastOrder: { $max: '$orders.createdAt' }
        }
      },
      { $sort: { createdAt: -1 } },
      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) }
    ]);

    // Get total count for pagination
    const total = await User.countDocuments(searchQuery);

    res.json({
      success: true,
      data: customers,
      pagination: {
        total,
        pages: Math.ceil(total / Number(limit)),
        currentPage: Number(page),
        perPage: Number(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching customers', error });
  }
};

export const getCustomerDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Get customer details with orders
    const customerDetails = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'user',
          as: 'orders'
        }
      },
      {
        $project: {
          _id: 1,
          email: 1,
          firstName: 1,
          lastName: 1,
          newsletterSubscribed: 1,
          createdAt: 1,
          ordersCount: { $size: '$orders' },
          totalSpent: {
            $sum: {
              $map: {
                input: '$orders',
                as: 'order',
                in: { $cond: [{ $eq: ['$$order.paymentStatus', 'paid'] }, '$$order.totalAmount', 0] }
              }
            }
          },
          lastOrder: { $max: '$orders.createdAt' },
          orders: {
            $map: {
              input: '$orders',
              as: 'order',
              in: {
                _id: '$$order._id',
                totalAmount: '$$order.totalAmount',
                status: '$$order.status',
                paymentStatus: '$$order.paymentStatus',
                createdAt: '$$order.createdAt'
              }
            }
          }
        }
      }
    ]);

    if (!customerDetails[0]) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    res.json({ success: true, data: customerDetails[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching customer details', error });
  }
};

export const updateCustomerNewsletter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { newsletterSubscribed } = req.body;

    const customer = await User.findByIdAndUpdate(
      id,
      { newsletterSubscribed },
      { new: true }
    ).select('-password');

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    res.json({ success: true, data: customer, message: 'Newsletter status updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating customer newsletter status', error });
  }
};

export const getCustomerOrderHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const orders = await Order.find({ user: id })
      .populate('products.product')
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Order.countDocuments({ user: id });

    res.json({
      success: true,
      data: orders,
      pagination: {
        total,
        pages: Math.ceil(total / Number(limit)),
        currentPage: Number(page),
        perPage: Number(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching customer order history', error });
  }
};

export const getCustomerMetrics = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const metrics = await Order.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: {
            $sum: { $cond: [{ $eq: ['$paymentStatus', 'paid'] }, '$totalAmount', 0] }
          },
          averageOrderValue: { $avg: '$totalAmount' },
          lastOrderDate: { $max: '$createdAt' }
        }
      },
      {
        $project: {
          _id: 0,
          totalOrders: 1,
          totalSpent: 1,
          averageOrderValue: 1,
          lastOrderDate: 1
        }
      }
    ]);

    res.json({
      success: true,
      data: metrics[0] || {
        totalOrders: 0,
        totalSpent: 0,
        averageOrderValue: 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching customer metrics', error });
  }
};