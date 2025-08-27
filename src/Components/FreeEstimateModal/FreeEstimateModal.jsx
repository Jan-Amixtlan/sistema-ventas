import React, { useState } from 'react';
import { appointmentService } from '../../services/appointmentService';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationSystem from '../NotificationSystem/NotificationSystem';
import SuccessAnimation from '../SuccessAnimation/SuccessAnimation';
import './FreeEstimateModal.css';

const FreeEstimateModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        vehicleMake: '',
        vehicleModel: '',
        vehicleYear: '',
        serviceType: '',
        description: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { notifications, removeNotification, showSuccess, showError } = useNotifications();

    const serviceTypes = [
        'Cambio de aceite',
        'Servicio de frenos',
        'Reparación de motores',
        'Servicio de transmisión',
        'Aire acondicionado',
        'Servicio de llantas',
        'Reemplazo de batería',
        'Verificación de diagnóstico',
        'Sistema de escape',
        'Reparación de suspensión',
        'Otro'
    ];

    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 30; year--) {
        years.push(year);
    }

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
            // Create estimate request object
            const estimateData = {
                ...formData,
                requestType: 'free_estimate',
                vehicle: `${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel}`
            };

            await appointmentService.bookAppointment(estimateData);
            
            // Show success animation
            setShowSuccessModal(true);
            
            // Show notification
            showSuccess(
                '¡Cotización Solicitada!', 
                `Gracias ${formData.name}! Hemos recibido tu solicitud de cotización para tu ${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel}. Te contactaremos pronto.`,
                7000
            );
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                vehicleMake: '',
                vehicleModel: '',
                vehicleYear: '',
                serviceType: '',
                description: ''
            });
            
            // Close modal after success
            setTimeout(() => {
                onClose();
            }, 2000);
            
        } catch (error) {
            showError(
                'Error al solicitar cotización', 
                'No pudimos procesar tu solicitud. Por favor, intenta nuevamente.',
                8000
            );
            console.error('Error requesting estimate:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-overlay" onClick={handleOverlayClick}>
                <div className="estimate-modal">
                    <div className="modal-header">
                        <h2 className="modal-title">Solicite su presupuesto gratuito</h2>
                        <p className="modal-subtitle">
                            Complete el formulario a continuación y le enviaremos un presupuesto detallado
                        </p>
                        <button className="close-button" onClick={onClose}>
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="estimate-form">
                        {/* Personal Information */}
                        <div className="form-section">
                            <h3 className="section-title">Información del contacto</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Nombre Completo *"
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
                                        placeholder="Correo Electrónico *"
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
                                    type="tel"
                                    name="phone"
                                    placeholder="Número de Teléfono *"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    className="form-input"
                                />
                            </div>
                        </div>

                        {/* Vehicle Information */}
                        <div className="form-section">
                            <h3 className="section-title">Información del Vehículo</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="vehicleMake"
                                        placeholder="Marca del vehículo(por ejemplo, Toyota)*"
                                        value={formData.vehicleMake}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="vehicleModel"
                                        placeholder="Modelo del vehículo(por ejemplo, Camry) *"
                                        value={formData.vehicleModel}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <select
                                        name="vehicleYear"
                                        value={formData.vehicleYear}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="form-select"
                                    >
                                        <option value="">Seleccionar año *</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select
                                        name="serviceType"
                                        value={formData.serviceType}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="form-select"
                                    >
                                        <option value="">Seleccionar tipo de servicio *</option>
                                        {serviceTypes.map((service, index) => (
                                            <option key={index} value={service}>{service}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Service Description */}
                        <div className="form-section">
                            <h3 className="section-title">Detalles del servicio</h3>
                            <div className="form-group">
                                <textarea
                                    name="description"
                                    placeholder="Describa el problema o servicio necesario (Opcional)"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                    className="form-textarea"
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button 
                                type="button" 
                                onClick={onClose}
                                className="cancel-button"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        Getting Estimate...
                                    </>
                                ) : (
                                    'Obtener presupuesto gratuito'
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
                title="¡Cotización Solicitada Exitosamente!"
                message={`¡Perfecto ${formData.name}! Hemos recibido tu solicitud de cotización para tu ${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel}. Nuestro equipo revisará tu solicitud y te contactará pronto con una cotización detallada.`}
                onClose={() => setShowSuccessModal(false)}
            />
        </>
    );
};

export default FreeEstimateModal;
