import React, { useState } from 'react';
import { reviewService } from '../../services/reviewService';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationSystem from '../NotificationSystem/NotificationSystem';
import SuccessAnimation from '../SuccessAnimation/SuccessAnimation';
import './AddReviewForm.css';

const AddReviewForm = () => {
    const [formData, setFormData] = useState({
        reviewTitle: '',
        name: '',
        email: '',
        reviewContent: '',
        saveData: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { notifications, removeNotification, showSuccess, showError } = useNotifications();

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                return '';

            case 'email':
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return '';

            case 'reviewContent':
                if (!value.trim()) return 'Review content is required';
                if (value.trim().length < 10) return 'Review must be at least 10 characters';
                return '';

            case 'reviewTitle':
                if (value.trim() && value.trim().length < 3) return 'Title must be at least 3 characters';
                return '';

            default:
                return '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // Real-time validation for better UX
        if (touched[name] && type !== 'checkbox') {
            const error = validateField(name, newValue);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = ['name', 'email', 'reviewContent'];

        requiredFields.forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });

        // Validate optional title if provided
        if (formData.reviewTitle) {
            const titleError = validateField('reviewTitle', formData.reviewTitle);
            if (titleError) newErrors.reviewTitle = titleError;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            // Mark all fields as touched to show errors
            setTouched({
                reviewTitle: true,
                name: true,
                email: true,
                reviewContent: true
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare data for API
            const reviewData = {
                title: formData.reviewTitle,
                name: formData.name,
                email: formData.email,
                content: formData.reviewContent,
                rating: 5 // Default rating, you can add a rating input later
            };

            await reviewService.submitReview(reviewData);

            // Show animated success modal
            setShowSuccessModal(true);

            // Also show notification
            showSuccess(
                '¡Reseña enviada!', 
                `Gracias ${formData.name}, tu reseña ha sido publicada exitosamente.`,
                6000
            );

            setFormData({
                reviewTitle: '',
                name: '',
                email: '',
                reviewContent: '',
                saveData: false
            });
            setTouched({});
            setErrors({});

        } catch (error) {
            showError(
                'Error al enviar reseña', 
                'No pudimos publicar tu reseña. Por favor, intenta nuevamente.',
                8000
            );
            console.error('Error submitting review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = () => {
        return formData.name.trim() &&
            formData.email.trim() &&
            formData.reviewContent.trim() &&
            Object.keys(errors).every(key => !errors[key]);
    };

    return (
        <section className="add-review-form">
            <div className="container">
                <div className="form-wrapper">
                    <div className="form-header">
                        <h2 className="form-title">Add Your Review</h2>
                        <div className="decorative-line">
                            <div className="line-segment"></div>
                            <div className="line-segment"></div>
                            <div className="line-segment"></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="review-form" noValidate>
                        {/* Review Title */}
                        <div className="form-group full-width">
                            <input
                                type="text"
                                name="reviewTitle"
                                placeholder="Review Title"
                                value={formData.reviewTitle}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className={`form-input ${errors.reviewTitle ? 'error' : ''} ${touched.reviewTitle && !errors.reviewTitle && formData.reviewTitle ? 'success' : ''}`}
                            />
                            {errors.reviewTitle && touched.reviewTitle && (
                                <span className="error-message">{errors.reviewTitle}</span>
                            )}
                        </div>

                        {/* Name and Email Row */}
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name *"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`form-input ${errors.name ? 'error' : ''} ${touched.name && !errors.name && formData.name ? 'success' : ''}`}
                                    required
                                />
                                {errors.name && touched.name && (
                                    <span className="error-message">{errors.name}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email *"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`form-input ${errors.email ? 'error' : ''} ${touched.email && !errors.email && formData.email ? 'success' : ''}`}
                                    required
                                />
                                {errors.email && touched.email && (
                                    <span className="error-message">{errors.email}</span>
                                )}
                            </div>
                        </div>

                        {/* Review Content */}
                        <div className="form-group full-width">
                            <textarea
                                name="reviewContent"
                                placeholder="Write a Review *"
                                rows="6"
                                value={formData.reviewContent}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className={`form-textarea ${errors.reviewContent ? 'error' : ''} ${touched.reviewContent && !errors.reviewContent && formData.reviewContent ? 'success' : ''}`}
                                required
                            ></textarea>
                            {errors.reviewContent && touched.reviewContent && (
                                <span className="error-message">{errors.reviewContent}</span>
                            )}
                            <div className="character-count">
                                {formData.reviewContent.length} characters
                            </div>
                        </div>

                        {/* Save Data Checkbox */}
                        <div className="form-group full-width">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="saveData"
                                    checked={formData.saveData}
                                    onChange={handleInputChange}
                                    className="checkbox-input"
                                />
                                <span className="checkbox-custom"></span>
                                <span className="checkbox-text">
                                    Save my name, email, and website in this browser for the next time I comment.
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="form-actions">
                            <button
                                type="submit"
                                disabled={isSubmitting || !isFormValid()}
                                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        SENDING...
                                    </>
                                ) : (
                                    'SEND COMMENT'
                                )}
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
            
            {/* Notification System */}
            <NotificationSystem 
                notifications={notifications} 
                removeNotification={removeNotification} 
            />
            
            {/* Success Animation Modal */}
            <SuccessAnimation
                isVisible={showSuccessModal}
                title="¡Reseña Publicada con Éxito!"
                message={`¡Excelente ${formData.name || 'Usuario'}! Tu reseña ha sido publicada y ayudará a otros clientes. Gracias por compartir tu experiencia con nosotros.`}
                onClose={() => setShowSuccessModal(false)}
            />
        </section>
    );
};

export default AddReviewForm;