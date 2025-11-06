import { Request, Response } from 'express';
import Newsletter from '../models/newsletter.model';

export const subscribe = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Check if email already exists
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.subscribed) {
        return res.status(400).json({ message: 'Email already subscribed' });
      }
      // If previously unsubscribed, resubscribe
      existing.subscribed = true;
      await existing.save();
      return res.json({ message: 'Successfully resubscribed to newsletter' });
    }

    // Create new subscription
    const subscription = new Newsletter({ email });
    await subscription.save();

    res.status(201).json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    res.status(500).json({ message: 'Error subscribing to newsletter', error });
  }
};

export const unsubscribe = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const subscription = await Newsletter.findOne({ email });
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    subscription.subscribed = false;
    await subscription.save();

    res.json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    res.status(500).json({ message: 'Error unsubscribing from newsletter', error });
  }
};

export const getSubscribers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const subscribers = await Newsletter.find({ subscribed: true })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Newsletter.countDocuments({ subscribed: true });

    res.json({
      subscribers,
      total,
      pages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscribers', error });
  }
};