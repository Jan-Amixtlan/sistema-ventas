import { apiService } from './api.js';

export const contactService = {
    // Send contact form
    async sendContactForm(contactData) {
        try {
            const response = await apiService.post('/contact', contactData);
            return response;
        } catch (error) {
            console.error('Error sending contact form:', error);
            throw error;
        }
    },

    
    // Get all contact messages (admin)
    async getContactMessages() {
        try {
            const response = await apiService.get('/contact');
            return response;
        } catch (error) {
            console.error('Error fetching contact messages:', error);
            throw error;
        }
    }
};
