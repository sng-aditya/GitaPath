const express = require('express');
const router = express.Router();
const { dbRun, dbGet, dbAll } = require('../db/sqlite');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
    
    const parts = authHeader.split(' ');
    if (parts.length !== 2) return res.status(401).json({ error: 'Unauthorized' });
    
    const token = parts[1];
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

// POST /api/user/progress
router.post('/progress', auth, async (req, res) => {
  try {
    const { chapter, verse } = req.body;
    if (!chapter || !verse) {
      return res.status(400).json({ error: 'Chapter and verse are required' });
    }

    await dbRun(
      'UPDATE users SET current_chapter = ?, current_verse = ?, last_read_date = CURRENT_TIMESTAMP WHERE id = ?',
      [chapter, verse, req.userId]
    );

    res.json({ ok: true });
  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/user/progress
router.get('/progress', auth, async (req, res) => {
  try {
    const user = await dbGet(
      'SELECT current_chapter, current_verse, streak_count, last_read_date FROM users WHERE id = ?',
      [req.userId]
    );
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json({ progress: user });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/user/bookmark/:ch/:sl
router.post('/bookmark/:ch/:sl', auth, async (req, res) => {
  try {
    const ch = parseInt(req.params.ch, 10);
    const sl = parseInt(req.params.sl, 10);

    if (!ch || !sl) {
      return res.status(400).json({ error: 'Invalid chapter or verse' });
    }

    // Check if bookmark already exists
    const existing = await dbGet(
      'SELECT id FROM bookmarks WHERE user_id = ? AND chapter = ? AND verse = ?',
      [req.userId, ch, sl]
    );

    if (existing) {
      return res.status(400).json({ error: 'Verse already bookmarked' });
    }

    await dbRun(
      'INSERT INTO bookmarks (user_id, chapter, verse) VALUES (?, ?, ?)',
      [req.userId, ch, sl]
    );

    res.json({ ok: true });
  } catch (error) {
    console.error('Bookmark error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/user/bookmarks
router.get('/bookmarks', auth, async (req, res) => {
  try {
    const bookmarks = await dbAll(
      'SELECT id, chapter, verse, created_at FROM bookmarks WHERE user_id = ? ORDER BY created_at DESC',
      [req.userId]
    );
    
    res.json({ bookmarks });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/user/bookmarks - Clear all bookmarks
router.delete('/bookmarks', auth, async (req, res) => {
  try {
    await dbRun(
      'DELETE FROM bookmarks WHERE user_id = ?',
      [req.userId]
    );
    
    res.json({ message: 'All bookmarks cleared successfully' });
  } catch (error) {
    console.error('Clear bookmarks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/user/bookmark/:chapter/:verse - Remove specific bookmark
router.delete('/bookmark/:chapter/:verse', auth, async (req, res) => {
  try {
    const { chapter, verse } = req.params;
    
    await dbRun(
      'DELETE FROM bookmarks WHERE user_id = ? AND chapter = ? AND verse = ?',
      [req.userId, chapter, verse]
    );
    
    res.json({ message: 'Bookmark removed successfully' });
  } catch (error) {
    console.error('Remove bookmark error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
