import { apiService } from './api.js';

export const appointmentService = {
    // Book new appointment
    async bookAppointment(appointmentData) {
        try {
            const response = await apiService.post('/appointments', appointmentData);
            return response;
        } catch (error) {
            console.error('Error booking appointment:', error);
            throw error;
        }
    },

    // Get appointments (admin)
    async getAppointments() {
        try {
            const response = await apiService.get('/appointments');
            return response;
        } catch (error) {
            console.error('Error fetching appointments:', error);
            throw error;
        }
    },

    // Update appointment status
    async updateAppointmentStatus(id, status) {
        try {
            const response = await apiService.put(`/appointments/${id}/status`, { status });
            return response;
        } catch (error) {
            console.error('Error updating appointment status:', error);
            throw error;
        }
    },

    // Cancel appointment
    async cancelAppointment(id) {
        try {
            const response = await apiService.delete(`/appointments/${id}`);
            return response;
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            throw error;
        }
    }
};
