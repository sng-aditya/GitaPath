const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Bookmark = require('../models/Bookmark');
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

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Update streak logic
    const today = new Date();
    const lastRead = user.last_read_date ? new Date(user.last_read_date) : null;
    const daysDiff = lastRead ? Math.floor((today - lastRead) / (1000 * 60 * 60 * 24)) : 0;
    
    let newStreak = user.streak_count || 0;
    if (daysDiff === 1) {
      newStreak += 1;
    } else if (daysDiff > 1) {
      newStreak = 1;
    } else if (daysDiff === 0) {
      // Same day, don't change streak
    }

    await User.findByIdAndUpdate(req.userId, {
      current_chapter: chapter,
      current_verse: verse,
      last_chapter: user.current_chapter || chapter,
      last_verse: user.current_verse || verse,
      last_read_date: today,
      streak_count: newStreak,
      $inc: { total_verses_read: 1 }
    });

    res.json({ ok: true, streak: newStreak });
  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/user/progress
router.get('/progress', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('current_chapter current_verse last_chapter last_verse streak_count last_read_date total_verses_read');
    
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
    const { slok, translation } = req.body;

    if (!ch || !sl) {
      return res.status(400).json({ error: 'Invalid chapter or verse' });
    }

    // Check if bookmark already exists
    const existing = await Bookmark.findOne({ userId: req.userId, chapter: ch, verse: sl });

    if (existing) {
      return res.status(400).json({ error: 'Verse already bookmarked' });
    }

    await Bookmark.create({ 
      userId: req.userId, 
      chapter: ch, 
      verse: sl,
      slok: slok || '',
      translation: translation || ''
    });

    res.json({ ok: true });
  } catch (error) {
    console.error('Bookmark error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/user/bookmarks
router.get('/bookmarks', auth, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.userId })
      .select('chapter verse createdAt')
      .sort({ createdAt: -1 });
    
    res.json({ bookmarks });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/user/bookmarks - Clear all bookmarks
router.delete('/bookmarks', auth, async (req, res) => {
  try {
    await Bookmark.deleteMany({ userId: req.userId });
    
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
    
    await Bookmark.deleteOne({ userId: req.userId, chapter: parseInt(chapter), verse: parseInt(verse) });
    
    res.json({ message: 'Bookmark removed successfully' });
  } catch (error) {
    console.error('Remove bookmark error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/user/verse-of-day - Get daily verse for user (consistent per day)
router.get('/verse-of-day', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const today = new Date().toDateString();
    
    // Check if user already has today's verse
    if (user.daily_verse_date === today && user.daily_verse_chapter && user.daily_verse_verse) {
      return res.json({ 
        chapter: user.daily_verse_chapter, 
        verse: user.daily_verse_verse, 
        date: today 
      });
    }

    // Generate consistent daily verse using user ID + date as seed
    const seed = user._id.toString() + today;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    const verseCounts = {
      1: 47, 2: 72, 3: 43, 4: 42, 5: 29, 6: 47, 7: 30, 8: 28,
      9: 34, 10: 42, 11: 55, 12: 20, 13: 34, 14: 27, 15: 20,
      16: 24, 17: 28, 18: 78
    };
    
    const chapter = (Math.abs(hash) % 18) + 1;
    const verse = (Math.abs(hash >> 8) % verseCounts[chapter]) + 1;
    
    // Save today's verse to user
    await User.findByIdAndUpdate(req.userId, {
      daily_verse_date: today,
      daily_verse_chapter: chapter,
      daily_verse_verse: verse
    });
    
    res.json({ chapter, verse, date: today });
  } catch (error) {
    console.error('Verse of day error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/user/verse-of-day/global - Get global daily verse (same for all users)
router.get('/verse-of-day/global', async (req, res) => {
  try {
    const today = new Date().toDateString();
    
    // Generate consistent daily verse for all users using just the date
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      const char = today.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    const verseCounts = {
      1: 47, 2: 72, 3: 43, 4: 42, 5: 29, 6: 47, 7: 30, 8: 28,
      9: 34, 10: 42, 11: 55, 12: 20, 13: 34, 14: 27, 15: 20,
      16: 24, 17: 28, 18: 78
    };
    
    const chapter = (Math.abs(hash) % 18) + 1;
    const verse = (Math.abs(hash >> 8) % verseCounts[chapter]) + 1;
    
    res.json({ chapter, verse, date: today });
  } catch (error) {
    console.error('Global verse of day error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
