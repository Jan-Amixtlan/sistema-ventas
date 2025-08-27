import { apiService } from './api.js';

export const statsService = {
    // Get statistics
    async getStats() {
        try {
            const response = await apiService.get('/stats');
            return response;
        } catch (error) {
            console.error('Error fetching stats:', error);
            throw error;
        }
    }
};
