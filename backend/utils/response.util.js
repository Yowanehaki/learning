const mongoose = require('mongoose');

const feedbackItemSchema = new mongoose.Schema({
  IDCategory: {
    type: Number,
    required: true,
    ref: 'Category'
  },
  IDDescription: {
    type: Number,
    required: true,
    ref: 'Description'
  },
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
});

const feedbackSchema = new mongoose.Schema({
  IDForm: {
    type: String,
    required: true,
    unique: true
  },
  feedbackItems: [feedbackItemSchema],
  suggestions: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Menambahkan index untuk meningkatkan performa query
feedbackSchema.index({ IDForm: 1 });
feedbackSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Feedback', feedbackSchema);