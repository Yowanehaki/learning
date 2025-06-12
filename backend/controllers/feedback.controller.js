const Feedback = require('../models/feedback.model');
const { FEEDBACK_MAPPING, ERROR_MESSAGES, RATING_RANGE } = require('../config/constants');
const { successResponse, errorResponse } = require('../utils/response.util');

const feedbackController = {
  // Submit feedback
  async submitFeedback(req, res) {
    try {
      const { IDForm, ratings, suggestions } = req.body;

      if (!IDForm) {
        return res.status(400).json(
          errorResponse(ERROR_MESSAGES.INVALID_ID_FORM)
        );
      }

      const feedbackItems = Object.entries(ratings).map(([key, value]) => {
        const mapping = FEEDBACK_MAPPING[key];
        
        if (value < RATING_RANGE.MIN || value > RATING_RANGE.MAX) {
          throw new Error(ERROR_MESSAGES.INVALID_RATING);
        }

        if (!mapping) {
          throw new Error(`Invalid feedback key: ${key}`);
        }

        return {
          IDCategory: mapping.category,
          IDDescription: mapping.description,
          value: value
        };
      });

      if (feedbackItems.length === 0) {
        return res.status(400).json(
          errorResponse(ERROR_MESSAGES.REQUIRED_FIELD)
        );
      }

      const feedback = new Feedback({
        IDForm,
        feedbackItems,
        suggestions
      });

      await feedback.save();

      res.status(201).json(
        successResponse('Feedback berhasil disimpan', feedback)
      );

    } catch (error) {
      res.status(500).json(
        errorResponse('Gagal menyimpan feedback', error.message)
      );
    }
  },

  // Get feedback by ID
  async getFeedbackById(req, res) {
    try {
      const feedback = await Feedback.findOne({ IDForm: req.params.id });
      
      if (!feedback) {
        return res.status(404).json(
          errorResponse(ERROR_MESSAGES.FEEDBACK_NOT_FOUND)
        );
      }

      res.json(successResponse('Feedback ditemukan', feedback));

    } catch (error) {
      res.status(500).json(
        errorResponse(ERROR_MESSAGES.DB_CONNECTION_ERROR, error.message)
      );
    }
  },

  // Get all feedbacks with pagination
  async getAllFeedbacks(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const feedbacks = await Feedback.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Feedback.countDocuments();
      
      res.json(successResponse('Data feedback berhasil diambil', {
        feedbacks,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }));

    } catch (error) {
      res.status(500).json(
        errorResponse(ERROR_MESSAGES.DB_CONNECTION_ERROR, error.message)
      );
    }
  },

  // Get feedback statistics by category
  async getFeedbackStats(req, res) {
    try {
      const stats = await Feedback.aggregate([
        { $unwind: '$feedbackItems' },
        {
          $group: {
            _id: '$feedbackItems.IDCategory',
            averageRating: { $avg: '$feedbackItems.value' },
            totalFeedbacks: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);

      res.json(successResponse('Statistik feedback berhasil diambil', stats));

    } catch (error) {
      res.status(500).json(
        errorResponse('Gagal mengambil statistik feedback', error.message)
      );
    }
  },

  // Get feedback by category
  async getFeedbackByCategory(req, res) {
    try {
      const categoryId = parseInt(req.params.categoryId);
      
      const feedbacks = await Feedback.find({
        'feedbackItems.IDCategory': categoryId
      });

      res.json(successResponse(
        `Feedback untuk kategori ${categoryId} berhasil diambil`,
        feedbacks
      ));

    } catch (error) {
      res.status(500).json(
        errorResponse('Gagal mengambil feedback berdasarkan kategori', error.message)
      );
    }
  }
};

module.exports = feedbackController;