const express = require('express');
const router = express.Router();
const { dbRun, dbGet } = require('../db/sqlite');
const bcrypt = require('bcryptjs');
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

    // Check if user already exists
    const existing = await dbGet('SELECT id FROM users WHERE email = ?', [email]);
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create user
    const result = await dbRun(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, hash]
    );

    // Generate token
    const token = jwt.sign({ id: result.id }, JWT_SECRET, { expiresIn: '30d' });
    logger.info('User signup successful', { userId: result.id, email });
    res.json({ token, user: { id: result.id, name, email } });
  } catch (error) {
    logger.error('Signup error:', { error: error.message, email });
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
    const user = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '30d' });
    const { password_hash, ...userWithoutPassword } = user;
    logger.info('User login successful', { userId: user.id, email });
    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    logger.error('Login error:', { error: error.message, email });
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
    
    const user = await dbGet(
      'SELECT id, name, email, current_chapter, current_verse, streak_count, last_read_date FROM users WHERE id = ?',
      [payload.id]
    );
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json({ user });
  } catch (err) {
    console.error('Auth me error:', err);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = router;
