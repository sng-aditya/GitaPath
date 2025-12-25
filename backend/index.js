require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/mongodb');
const logger = require('./utils/logger');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const gitaRouter = require('./routes/gita');
const feedbackRouter = require('./routes/feedback');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/gita', gitaRouter);
app.use('/api/feedback', feedbackRouter);

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info(`Backend server started on port ${PORT}`);
});
