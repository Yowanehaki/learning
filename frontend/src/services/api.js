const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const submitFeedback = async (feedbackData) => {
  try {
    // Test backend connection
    const testResponse = await fetch(`${API_URL}/test`);
    if (!testResponse.ok) {
      throw new Error('Backend connection failed');
    }

    // Konversi ratings ke angka dan validasi
    const ratings = {};
    Object.entries(feedbackData.ratings).forEach(([key, value]) => {
      // Mengabaikan rating personilBackup jika tidak ada rating
      if (key === 'personilBackup') {
        // jika nilai adalah 0, set ke null
        ratings[key] = value === 0 ? null : Number(value);
        // Validasi rating personilBackup
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
