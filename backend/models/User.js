const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  current_chapter: {
    type: Number,
    default: 1
  },
  current_verse: {
    type: Number,
    default: 1
  },
  last_chapter: {
    type: Number,
    default: null
  },
  last_verse: {
    type: Number,
    default: null
  },
  last_read_date: {
    type: Date,
    default: null
  },
  streak_count: {
    type: Number,
    default: 0
  },
  total_verses_read: {
    type: Number,
    default: 0
  },
  daily_verse_date: {
    type: String,
    default: null
  },
  daily_verse_chapter: {
    type: Number,
    default: null
  },
  daily_verse_verse: {
    type: Number,
    default: null
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);