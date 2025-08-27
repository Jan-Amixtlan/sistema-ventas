import { apiService } from './api.js';

export const technicianService = {
    // Get all technicians
    async getTechnicians() {
        try {
            const response = await apiService.get('/technicians');
            return response;
        } catch (error) {
            console.error('Error fetching technicians:', error);
            throw error;
        }
    },

    // Get single technician by ID
    async getTechnicianById(id) {
        try {
            const response = await apiService.get(`/technicians/${id}`);
            return response;
        } catch (error) {
            console.error('Error fetching technician:', error);
            throw error;
        }
    }
};
