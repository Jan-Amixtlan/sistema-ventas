import React, { useState } from 'react';
import { contactService } from '../../services/contactService';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationSystem from '../NotificationSystem/NotificationSystem';
import SuccessAnimation from '../SuccessAnimation/SuccessAnimation';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { notifications, removeNotification, showSuccess, showError } = useNotifications();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await contactService.sendContactForm(formData);
            
            // Show animated success modal
            setShowSuccessModal(true);
            
            // Also show notification
            showSuccess(
                '¡Mensaje enviado!', 
                `Gracias ${formData.name}, hemos recibido tu mensaje y te responderemos pronto.`,
                6000
            );
            
            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

        } catch (error) {
            showError(
                'Error al enviar mensaje', 
                'No pudimos enviar tu mensaje. Por favor, intenta nuevamente.',
                8000
            );
            console.error('Error sending contact form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderLocationIcon = () => (
        <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );

    const renderPhoneIcon = () => (
        <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
    );

    const renderClockIcon = () => (
        <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
            <polyline points="12,6 12,12 16,14" strokeWidth={2} />
        </svg>
    );

    const renderEmailIcon = () => (
        <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );

    return (
        <section className="contact-form-section">
            <div className="container">
                <div className="contact-wrapper">
                    {/* Contact Details */}
                    <div className="contact-details">
                        <h2 className="details-title">Contact Details</h2>

                        <div className="contact-item">
                            <div className="icon-wrapper">
                                {renderLocationIcon()}
                            </div>
                            <div className="contact-info">
                                <h3 className="info-title">HeadOffice Address</h3>
                                <p className="info-text">
                                    354 Oakridge Lane, Camden<br />
                                    NJ 08102 - USA
                                </p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="icon-wrapper">
                                {renderPhoneIcon()}
                            </div>
                            <div className="contact-info">
                                <h3 className="info-title">For Rental Support</h3>
                                <p className="info-text">+1(610) 799 4680 / 5660</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="icon-wrapper">
                                {renderClockIcon()}
                            </div>
                            <div className="contact-info">
                                <h3 className="info-title">The Office Hours</h3>
                                <p className="info-text">Mon - Sat 8am to 7pm</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="icon-wrapper">
                                {renderEmailIcon()}
                            </div>
                            <div className="contact-info">
                                <h3 className="info-title">Send Us Email</h3>
                                <p className="info-text">repair@my-domain.net</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form">
                        <h2 className="form-title">Send a Message</h2>
                        <div className="decorative-line"></div>

                        <p className="form-note">
                            Your email address will not be published. Required fields are marked with *
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name *"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email *"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                    className="form-textarea"
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                            </button>
                        </form>
                    </div>
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
                title="¡Mensaje Enviado Exitosamente!"
                message={`Hola ${formData.name || 'Usuario'}, hemos recibido tu mensaje. Nuestro equipo se pondrá en contacto contigo muy pronto. ¡Gracias por confiar en nosotros!`}
                onClose={() => setShowSuccessModal(false)}
            />
        </section>
    );
};

export default ContactForm;