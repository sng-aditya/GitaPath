const mongoose = require('mongoose');
const logger = require('../utils/logger');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL || process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState;
    logger.info(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    // Do not exit process in serverless environment
    throw error;
  }
};

module.exports = connectDB;