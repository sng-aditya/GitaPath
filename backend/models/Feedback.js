const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  feedback: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);
