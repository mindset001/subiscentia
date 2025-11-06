import { Request, Response } from 'express';
import Order from '../models/order.model';
import Product from '../models/product.model';
import User from '../models/user.model';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const currentDate = new Date();
    const thirtyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 30));

    // Get total revenue, orders, and customers
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });

    // Get recent orders
    const recentOrders = await Order.find()
      .populate('user', 'email firstName lastName')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get sales trend for last 30 days
    const salesTrend = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
          paymentStatus: 'paid'
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get sales by collection
    const salesByCollection = await Order.aggregate([
      {
        $unwind: '$products'
      },
      {
        $lookup: {
          from: 'products',
          localField: 'products.product',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $unwind: '$productDetails'
      },
      {
        $group: {
          _id: '$productDetails.collection',
          totalSales: { $sum: { $multiply: ['$products.quantity', '$products.price'] } },
          totalOrders: { $sum: 1 }
        }
      }
    ]);

    // Get top products
    const topProducts = await Order.aggregate([
      {
        $unwind: '$products'
      },
      {
        $group: {
          _id: '$products.product',
          totalQuantity: { $sum: '$products.quantity' },
          totalRevenue: { $sum: { $multiply: ['$products.quantity', '$products.price'] } }
        }
      },
      {
        $sort: { totalRevenue: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $unwind: '$productDetails'
      }
    ]);

    res.json({
      overview: {
        totalRevenue: totalRevenue[0]?.total || 0,
        totalOrders,
        totalCustomers
      },
      recentOrders,
      salesTrend,
      salesByCollection,
      topProducts
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error });
  }
};