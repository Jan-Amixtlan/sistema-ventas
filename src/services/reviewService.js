import { apiService } from './api.js';

export const reviewService = {
    // Submit a review
    async submitReview(reviewData) {
        try {
            const response = await apiService.post('/reviews', reviewData);
            return response;
        } catch (error) {
            console.error('Error submitting review:', error);
            throw error;
        }
    },

    // Get all reviews
    async getReviews() {
        try {
            const response = await apiService.get('/reviews');
            return response;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    },

    // Get reviews for a specific service
    async getServiceReviews(serviceId) {
        try {
            const response = await apiService.get(`/reviews/service/${serviceId}`);
            return response;
        } catch (error) {
            console.error('Error fetching service reviews:', error);
            throw error;
        }
    }
};
