import { apiService } from './api.js';

export const featuresService = {
    // Get all features
    async getFeatures() {
        try {
            const response = await apiService.get('/features');
            return response;
        } catch (error) {
            console.error('Error fetching features:', error);
            throw error;
        }
    },

    // Get single feature by ID
    async getFeatureById(id) {
        try {
            const response = await apiService.get(`/features/${id}`);
            return response;
        } catch (error) {
            console.error('Error fetching feature:', error);
            throw error;
        }
    },

    // Get feature details/content by ID
    async getFeatureDetails(id) {
        try {
            const response = await apiService.get(`/features/${id}/details`);
            return response;
        } catch (error) {
            console.error('Error fetching feature details:', error);
            throw error;
        }
    }
};
