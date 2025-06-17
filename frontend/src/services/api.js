const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const submitFeedback = async (feedbackData) => {
  try {
    // Test connection first
    const testResponse = await fetch(`${API_URL}/test`);
    if (!testResponse.ok) {
      throw new Error('Backend connection failed');
    }

    // Convert ratings to numbers and validate
    const ratings = {};
    Object.entries(feedbackData.ratings).forEach(([key, value]) => {
      // Handle personilBackup specially
      if (key === 'personilBackup') {
        // If not rated, set to null instead of 0
        ratings[key] = value === 0 ? null : Number(value);
        // Only validate if a rating was provided
        if (ratings[key] !== null && (isNaN(ratings[key]) || ratings[key] < 1 || ratings[key] > 5)) {
          throw new Error('Invalid rating value for Backup Personnel');
        }
        return;
      }

      // Handle all other ratings
      ratings[key] = Number(value);
      if (isNaN(ratings[key]) || ratings[key] < 1 || ratings[key] > 5) {
        throw new Error(`Invalid rating value for ${key}`);
      }
    });

    console.log('Submitting to:', `${API_URL}/feedback`);
    console.log('Data:', { ratings, suggestions: feedbackData.suggestions });

    const response = await fetch(`${API_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        ratings,
        suggestions: feedbackData.suggestions 
      }),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit feedback');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
