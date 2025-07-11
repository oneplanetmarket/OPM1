import express from 'express';
import Newsletter from '../models/Newsletter.js';

const router = express.Router();

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.json({ success: false, message: 'Email is required' });
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.json({ success: false, message: 'Email already subscribed to newsletter' });
    }

    // Create new subscriber
    const subscriber = new Newsletter({ email });
    await subscriber.save();

    res.json({ success: true, message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.json({ success: false, message: 'Failed to subscribe to newsletter' });
  }
});

// Get all subscribers (for admin use)
router.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ isActive: true }).sort({ subscribedAt: -1 });
    res.json({ success: true, subscribers });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.json({ success: false, message: 'Failed to fetch subscribers' });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.json({ success: false, message: 'Email is required' });
    }

    await Newsletter.findOneAndUpdate(
      { email },
      { isActive: false },
      { new: true }
    );

    res.json({ success: true, message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.json({ success: false, message: 'Failed to unsubscribe from newsletter' });
  }
});

export default router;