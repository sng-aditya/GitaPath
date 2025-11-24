const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Password validation
    // Must be at least 8 characters, start with a letter, and contain alphanumeric characters
    const passwordRegex = /^[a-zA-Z](?=.*[a-zA-Z])(?=.*[0-9]).{7,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters, start with a letter, and contain both letters and numbers'
      });
    }

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create user
    const user = new User({ name, email, password });
    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });
    logger.info('User signup successful', { userId: user._id, email });
    res.json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    logger.error('Signup error:', { error: error.message, email: req.body.email });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      current_chapter: user.current_chapter,
      current_verse: user.current_verse,
      streak_count: user.streak_count,
      last_read_date: user.last_read_date
    };
    logger.info('User login successful', { userId: user._id, email });
    res.json({ token, user: userResponse });
  } catch (error) {
    logger.error('Login error:', { error: error.message, email: req.body.email });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Unauthorized' });

    const parts = auth.split(' ');
    if (parts.length !== 2) return res.status(401).json({ error: 'Unauthorized' });

    const token = parts[1];
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(payload.id).select('-password');

    if (!user) return res.status(404).json({ error: 'User not found' });

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      current_chapter: user.current_chapter,
      current_verse: user.current_verse,
      streak_count: user.streak_count,
      last_read_date: user.last_read_date
    };

    res.json({ user: userResponse });
  } catch (err) {
    logger.error('Auth me error:', err);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = router;
