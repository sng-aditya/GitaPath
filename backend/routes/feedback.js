const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

// Optional auth middleware - gets userId if logged in, but doesn't require it
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
        // If token is invalid, just continue without userId
        next();
    }
}

// POST /api/feedback - Submit feedback
router.post('/', optionalAuth, async (req, res) => {
    try {
        const { name, email, feedback } = req.body;

        // Validate required fields
        if (!name || !feedback) {
            return res.status(400).json({ error: 'Name and feedback are required' });
        }

        // Validate feedback length
        if (feedback.length > 2000) {
            return res.status(400).json({ error: 'Feedback must be less than 2000 characters' });
        }

        // Create feedback
        const newFeedback = await Feedback.create({
            name: name.trim(),
            email: email ? email.trim() : undefined,
            userId: req.userId || null,
            feedback: feedback.trim()
        });

        logger.info('Feedback submitted', {
            feedbackId: newFeedback._id,
            userId: req.userId || 'anonymous',
            name: name
        });

        res.json({
            ok: true,
            message: 'Thank you for your feedback!'
        });
    } catch (error) {
        logger.error('Feedback submission error:', { error: error.message });
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
