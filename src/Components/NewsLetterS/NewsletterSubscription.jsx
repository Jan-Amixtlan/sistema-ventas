import React, { useState } from 'react';
import { newsletterService } from '../../services/newsletterService';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationSystem from '../NotificationSystem/NotificationSystem';
import SuccessAnimation from '../SuccessAnimation/SuccessAnimation';
import './NewsletterSubscription.css';

const NewsletterSubscription = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { notifications, removeNotification, showSuccess, showError } = useNotifications();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await newsletterService.subscribe(email);
            
            // Show animated success modal
            setShowSuccessModal(true);
            
            // Also show notification
            showSuccess(
                '¡Suscripción exitosa!', 
                `¡Gracias! Te hemos suscrito a nuestro newsletter. Recibirás las últimas noticias en ${email}`,
                6000
            );
            
            // Reset form
            setEmail('');
            
        } catch (error) {
            showError(
                'Error en suscripción', 
                'No pudimos suscribirte al newsletter. Por favor, intenta nuevamente.',
                8000
            );
            console.error('Error subscribing to newsletter:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <section className="newsletter-section">
            {/* Elementos decorativos de fondo */}
            <div className="background-elements">
                <div className="wave-shape"></div>
                <div className="geometric-shapes">
                    <div className="shape-container">
                        <div className="triangle-shape"></div>
                        <div className="polygon-shape"></div>
                        <div className="number-badge">1</div>
                    </div>
                </div>
            </div>

            <div className="newsletter-container">
                <div className="newsletter-content">
                    {/* Texto del newsletter */}
                    <div className="newsletter-text">
                        <h2 className="newsletter-title">Suscripción al boletín informativo</h2>
                        <p className="newsletter-subtitle">
                            Reciba las últimas noticias y actualizaciones de automóviles directamente en su bandeja de entrada
                        </p>
                    </div>

                    {/* Formulario de suscripción */}
                    <form className="newsletter-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="email"
                                className="email-input"
                                placeholder="Escribe tu correo electrónico..."
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            <button type="submit" className="subscribe-btn" disabled={isSubmitting}>
                                {isSubmitting ? 'SUSCRIBIRSE...' : 'SUSCRIBIR →'}
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
                title="¡Suscripción Exitosa!"
                message={`¡Excelente! Te hemos suscrito al newsletter. Recibirás las últimas noticias y ofertas especiales directamente en tu correo: ${email}`}
                onClose={() => setShowSuccessModal(false)}
            />
        </section>
    );
};

export default NewsletterSubscription;