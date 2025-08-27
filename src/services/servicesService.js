import { apiService } from './api.js';

export const servicesService = {
    // Get all services
    async getServices() {
        try {
            const response = await apiService.get('/services');
            return response;
        } catch (error) {
            console.error('Error fetching services:', error);
            throw error;
        }
    },

    // Get single service by ID
    async getServiceById(id) {
        try {
            const response = await apiService.get(`/services/${id}`);
            return response;
        } catch (error) {
            console.error('Error fetching service:', error);
            throw error;
        }
    },

    // Create new service (admin)
    async createService(serviceData) {
        try {
            const response = await apiService.post('/services', serviceData);
            return response;
        } catch (error) {
            console.error('Error creating service:', error);
            throw error;
        }
    }
};
