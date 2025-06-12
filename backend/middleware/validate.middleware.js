const { ERROR_MESSAGES, RATING_RANGE } = require('../config/constants');

const validateFeedback = (req, res, next) => {
  try {
    const { IDForm, ratings, suggestions } = req.body;

    // Validate IDForm
    if (!IDForm || typeof IDForm !== 'string') {
      return res.status(400).json({
        success: false,
        message: ERROR_MESSAGES.INVALID_ID_FORM
      });
    }

    // Validate ratings object
    if (!ratings || typeof ratings !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Rating harus berupa object'
      });
    }

    // Validate each rating value
    for (const [key, value] of Object.entries(ratings)) {
      if (typeof value !== 'number' || 
          value < RATING_RANGE.MIN || 
          value > RATING_RANGE.MAX) {
        return res.status(400).json({
          success: false,
          message: `${ERROR_MESSAGES.INVALID_RATING} untuk ${key}`
        });
      }
    }

    // Validate suggestions (optional)
    if (suggestions && typeof suggestions !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Saran harus berupa text'
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Validation error',
      error: error.message
    });
  }
};

module.exports = {
  validateFeedback
};