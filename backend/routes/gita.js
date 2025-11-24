const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const BASE = 'https://vedicscriptures.github.io';
const cache = new Map();

async function fetchAndCache(path) {
  if (cache.has(path)) return cache.get(path);
  const res = await fetch(BASE + path);
  const data = await res.json();
  cache.set(path, data);
  // simple TTL
  setTimeout(() => cache.delete(path), 1000 * 60 * 60);
  return data;
}

router.get('/chapters', async (req, res) => {
  try {
    const data = await fetchAndCache('/chapters');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

router.get('/chapter/:ch', async (req, res) => {
  try {
    const data = await fetchAndCache(`/chapter/${req.params.ch}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

router.get('/slok/:ch/:sl', async (req, res) => {
  try {
    const data = await fetchAndCache(`/slok/${req.params.ch}/${req.params.sl}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

// Verse counts for each chapter
const verseCounts = {
  1: 47, 2: 72, 3: 43, 4: 42, 5: 29, 6: 47, 7: 30, 8: 28,
  9: 34, 10: 42, 11: 55, 12: 20, 13: 34, 14: 27, 15: 20,
  16: 24, 17: 28, 18: 78
};

// Get specific verse by chapter and verse number
router.get('/:ch/:sl', async (req, res) => {
  try {
    const chapter = parseInt(req.params.ch);
    const verse = parseInt(req.params.sl);
    const data = await fetchAndCache(`/slok/${chapter}/${verse}`);
    res.json({ ...data, chapter, verse });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch verse' });
  }
});

// Get next verse
router.get('/next/:ch/:sl', async (req, res) => {
  const logger = require('../utils/logger');
  try {
    const originalChapter = parseInt(req.params.ch);
    const originalVerse = parseInt(req.params.sl);

    logger.info(`Next verse request: Chapter ${originalChapter}, Verse ${originalVerse}`, {
      service: 'gita-api',
      endpoint: '/next',
      params: { chapter: originalChapter, verse: originalVerse }
    });

    let chapter = originalChapter;
    let verse = originalVerse;

    // Move to next verse
    verse++;

    // If we've exceeded verses in current chapter, move to next chapter
    if (verse > verseCounts[chapter]) {
      chapter++;
      verse = 1;

      // If we've exceeded all chapters, stay at last verse
      if (chapter > 18) {
        chapter = 18;
        verse = verseCounts[18];
      }
    }

    logger.info(`Next verse calculated: Chapter ${chapter}, Verse ${verse}`, {
      service: 'gita-api',
      calculated: { chapter, verse }
    });

    const apiUrl = `/slok/${chapter}/${verse}`;
    logger.info(`Fetching from API: ${apiUrl}`, { service: 'gita-api' });

    const data = await fetchAndCache(apiUrl);

    const response = { ...data, chapter, verse };
    logger.info(`Next verse response prepared`, {
      service: 'gita-api',
      response: {
        hasSlok: !!data.slok,
        hasTransliteration: !!data.transliteration,
        chapter: response.chapter,
        verse: response.verse
      }
    });

    res.json(response);
  } catch (err) {
    logger.error(`Next verse error: ${err.message}`, {
      service: 'gita-api',
      error: err.stack,
      params: req.params
    });
    res.status(500).json({ error: 'Failed to fetch next verse', details: err.message });
  }
});

// Get previous verse
router.get('/previous/:ch/:sl', async (req, res) => {
  const logger = require('../utils/logger');
  try {
    const originalChapter = parseInt(req.params.ch);
    const originalVerse = parseInt(req.params.sl);

    logger.info(`Previous verse request: Chapter ${originalChapter}, Verse ${originalVerse}`, {
      service: 'gita-api',
      endpoint: '/previous',
      params: { chapter: originalChapter, verse: originalVerse }
    });

    let chapter = originalChapter;
    let verse = originalVerse;

    // Move to previous verse
    verse--;

    // If we've gone below 1, move to previous chapter's last verse
    if (verse < 1) {
      chapter--;

      // If we've gone below chapter 1, stay at first verse
      if (chapter < 1) {
        chapter = 1;
        verse = 1;
      } else {
        verse = verseCounts[chapter];
      }
    }

    logger.info(`Previous verse calculated: Chapter ${chapter}, Verse ${verse}`, {
      service: 'gita-api',
      calculated: { chapter, verse }
    });

    const apiUrl = `/slok/${chapter}/${verse}`;
    logger.info(`Fetching from API: ${apiUrl}`, { service: 'gita-api' });

    const data = await fetchAndCache(apiUrl);

    const response = { ...data, chapter, verse };
    logger.info(`Previous verse response prepared`, {
      service: 'gita-api',
      response: {
        hasSlok: !!data.slok,
        hasTransliteration: !!data.transliteration,
        chapter: response.chapter,
        verse: response.verse
      }
    });

    res.json(response);
  } catch (err) {
    logger.error(`Previous verse error: ${err.message}`, {
      service: 'gita-api',
      error: err.stack,
      params: req.params
    });
    res.status(500).json({ error: 'Failed to fetch previous verse', details: err.message });
  }
});

// Get random verse
router.get('/random', async (req, res) => {
  const logger = require('../utils/logger');
  try {
    const chapter = Math.floor(Math.random() * 18) + 1;
    const verse = Math.floor(Math.random() * verseCounts[chapter]) + 1;

    logger.info(`Random verse generated: Chapter ${chapter}, Verse ${verse}`, {
      service: 'gita-api',
      endpoint: '/random',
      generated: { chapter, verse }
    });

    const apiUrl = `/slok/${chapter}/${verse}`;
    logger.info(`Fetching random verse from API: ${apiUrl}`, { service: 'gita-api' });

    const data = await fetchAndCache(apiUrl);

    const response = { ...data, chapter, verse };
    logger.info(`Random verse response prepared`, {
      service: 'gita-api',
      response: {
        hasSlok: !!data.slok,
        hasTransliteration: !!data.transliteration,
        chapter: response.chapter,
        verse: response.verse
      }
    });

    res.json(response);
  } catch (err) {
    logger.error(`Random verse error: ${err.message}`, {
      service: 'gita-api',
      error: err.stack
    });
    res.status(500).json({ error: 'Failed to fetch random verse', details: err.message });
  }
});

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

// Optional auth middleware
async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const parts = authHeader.split(' ');
      if (parts.length === 2) {
        const token = parts[1];
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.id;
      }
    }
    next();
  } catch (err) {
    next();
  }
}

// Get Verse of the Day
router.get('/verse-of-day', optionalAuth, async (req, res) => {
  const logger = require('../utils/logger');
  try {
    const today = new Date().toISOString().split('T')[0];
    let seed = today;

    // If user is logged in, personalize the seed
    if (req.userId) {
      seed = `${req.userId}-${today}`;
    }

    // Simple hash function to get a deterministic number from string
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    hash = Math.abs(hash);

    // Determine Chapter
    const chapter = (hash % 18) + 1;

    // Determine Verse based on chapter's verse count
    // Re-hash for verse to avoid correlation
    const verseHash = (hash * 13) + chapter;
    const verse = (verseHash % verseCounts[chapter]) + 1;

    logger.info(`Verse of the day generated`, {
      date: today,
      userId: req.userId || 'public',
      chapter,
      verse
    });

    const apiUrl = `/slok/${chapter}/${verse}`;
    const data = await fetchAndCache(apiUrl);

    res.json({ ...data, chapter, verse });
  } catch (err) {
    logger.error(`Verse of the day error: ${err.message}`);
    res.status(500).json({ error: 'Failed to fetch verse of the day' });
  }
});

module.exports = router;
