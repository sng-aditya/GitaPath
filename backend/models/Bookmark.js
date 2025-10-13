const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chapter: {
    type: Number,
    required: true
  },
  verse: {
    type: Number,
    required: true
  },
  slok: {
    type: String,
    required: true
  },
  translation: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

bookmarkSchema.index({ userId: 1, chapter: 1, verse: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);