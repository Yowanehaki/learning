const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');
const { validateFeedback } = require('../middleware/validate.middleware');

// Submit feedback route
router.post('/submit', validateFeedback, feedbackController.submitFeedback);

// Get specific feedback by ID
router.get('/form/:id', feedbackController.getFeedbackById);

// Get all feedbacks
router.get('/all', feedbackController.getAllFeedbacks);

// Get feedback statistics
router.get('/stats', feedbackController.getFeedbackStats);

// Get feedback by category
router.get('/category/:categoryId', feedbackController.getFeedbackByCategory);

// Export categories and descriptions
router.get('/metadata', async (req, res) => {
  try {
    const Category = require('../models/category.model');
    const Description = require('../models/description.model');
    
    const categories = await Category.find({});
    const descriptions = await Description.find({});
    
    res.json({
      success: true,
      data: {
        categories,
        descriptions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil metadata',
      error: error.message
    });
  }
});

// Handle 404 for feedback routes
router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Feedback endpoint tidak ditemukan'
  });
});

module.exports = router;