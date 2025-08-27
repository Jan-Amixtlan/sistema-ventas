import { apiService } from './api.js';

export const newsletterService = {
    // Subscribe to newsletter
    async subscribe(email) {
        try {
            const response = await apiService.post('/newsletter/subscribe', { email });
            return response;
        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            throw error;
        }
    }
};
