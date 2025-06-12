const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  IDCategory: {
    type: Number,
    required: true,
    unique: true
  },
  Category: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);