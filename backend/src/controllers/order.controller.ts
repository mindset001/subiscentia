import { Request, Response } from 'express';
import Order from '../models/order.model';
import User from '../models/user.model';

export const createOrder = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const orderData = req.body;

    const order = new Order({
      ...orderData,
      user: userId
    });

    await order.save();

    // Update user's orders array
    await User.findByIdAndUpdate(userId, {
      $push: { orders: order._id }
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const orders = await Order.find({ user: userId })
      .populate('products.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = status ? { status } : {};

    const orders = await Order.find(query)
      .populate('user', 'email firstName lastName')
      .populate('products.product')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      total,
      pages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('products.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
};