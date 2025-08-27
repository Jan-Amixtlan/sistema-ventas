import React, { useState } from 'react';
import { appointmentService } from '../../services/appointmentService';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationSystem from '../NotificationSystem/NotificationSystem';
import SuccessAnimation from '../SuccessAnimation/SuccessAnimation';
import './AppointmentForm.css';

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { notifications, removeNotification, showSuccess, showError } = useNotifications();

    const services = [
        'Oil Change',
        'Brake Inspection',
        'Engine Diagnostic',
        'Tire Installation',
        'Battery Replacement',
        'AC Repair',
        'Transmission Service',
        'General Maintenance'
    ];

    const timeSlots = [
        '09:00', '10:00', '11:00', '12:00',
        '14:00', '15:00', '16:00', '17:00'
    ];

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
            await appointmentService.bookAppointment(formData);
            
            // Show animated success modal
            setShowSuccessModal(true);
            
            // Also show notification
            showSuccess(
                '¡Cita agendada exitosamente!', 
                `Hola ${formData.name}, tu cita para ${formData.service} el ${formData.date} a las ${formData.time} ha sido confirmada.`,
                7000
            );
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                service: '',
                date: '',
                time: '',
                message: ''
            });
            
        } catch (error) {
            showError(
                'Error al agendar cita', 
                'No pudimos agendar tu cita. Por favor, intenta nuevamente o llámanos directamente.',
                8000
            );
            console.error('Error booking appointment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get tomorrow's date as minimum date
    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    return (
        <section className="appointment-form-section">
            <div className="appointment-container">
                <div className="appointment-content">
                    <div className="appointment-header">
                        <h2 className="appointment-title">Schedule Your Appointment</h2>
                        <p className="appointment-subtitle">
                            Book a convenient time for your vehicle service. We'll take care of the rest!
                        </p>
                        <div className="decorative-line">
                            <div className="line-segment"></div>
                            <div className="line-segment"></div>
                            <div className="line-segment"></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="appointment-form">
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name *"
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
                                    placeholder="Email Address *"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number *"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    className="form-select"
                                >
                                    <option value="">Select Service *</option>
                                    {services.map((service, index) => (
                                        <option key={index} value={service}>{service}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    min={getTomorrowDate()}
                                    required
                                    disabled={isSubmitting}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <select
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    className="form-select"
                                >
                                    <option value="">Select Time *</option>
                                    {timeSlots.map((time, index) => (
                                        <option key={index} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <textarea
                                name="message"
                                placeholder="Additional Information (Optional)"
                                rows="4"
                                value={formData.message}
                                onChange={handleInputChange}
                                disabled={isSubmitting}
                                className="form-textarea"
                            ></textarea>
                        </div>

                        <div className="form-actions">
                            <button 
                                type="submit" 
                                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        BOOKING...
                                    </>
                                ) : (
                                    'BOOK APPOINTMENT'
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
                title="¡Cita Agendada Exitosamente!"
                message={`¡Perfecto ${formData.name}! Tu cita para ${formData.service} ha sido confirmada para el ${formData.date} a las ${formData.time}. Te enviaremos un recordatorio por email.`}
                onClose={() => setShowSuccessModal(false)}
            />
        </section>
    );
};

export default AppointmentForm;
