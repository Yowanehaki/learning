const mongoose = require('mongoose');

const descriptionSchema = new mongoose.Schema({
  IDDescription: {
    type: Number,
    required: true,
    unique: true
  },
  Description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Description', descriptionSchema);