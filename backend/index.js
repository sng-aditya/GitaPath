const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const gitaRouter = require('./routes/gita');

const app = express();

// Middleware
app.use(cors());
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
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Backend server started on http://0.0.0.0:${PORT}`);
  logger.info(`Access from network: http://10.30.161.230:${PORT}`);
});
