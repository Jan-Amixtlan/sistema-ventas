import React from 'react';
import { X, Wrench, Car, UserCheck, Award, CheckCircle } from 'lucide-react';
import './FeatureModal.css';

const FeatureModal = ({ feature, isOpen, onClose }) => {
    if (!isOpen || !feature) return null;

    const getIconComponent = (iconType) => {
        switch (iconType) {
            case 'wrench':
                return <Wrench size={60} />;
            case 'car':
                return <Car size={60} />;
            case 'user-check':
                return <UserCheck size={60} />;
            default:
                return <Award size={60} />;
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="feature-modal-overlay" onClick={handleOverlayClick}>
            <div className="feature-modal">
                <div className="modal-header">
                    <button 
                        className="modal-close-btn"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-content">
                    <div className="feature-modal-icon">
                        {getIconComponent(feature.icon_type)}
                    </div>

                    <h2 className="feature-modal-title">{feature.title}</h2>
                    
                    <p className="feature-modal-description">
                        {feature.detailed_description || feature.description}
                    </p>

                    {feature.benefits && feature.benefits.length > 0 && (
                        <div className="feature-benefits">
                            <h3 className="benefits-title">Benefits & Features:</h3>
                            <div className="benefits-list">
                                {feature.benefits.map((benefit, index) => (
                                    <div key={index} className="benefit-item">
                                        <CheckCircle size={20} className="check-icon" />
                                        <span>{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {feature.specifications && feature.specifications.length > 0 && (
                        <div className="feature-specifications">
                            <h3 className="specs-title">Specifications:</h3>
                            <div className="specs-grid">
                                {feature.specifications.map((spec, index) => (
                                    <div key={index} className="spec-item">
                                        <span className="spec-label">{spec.label}:</span>
                                        <span className="spec-value">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {feature.image_url && (
                        <div className="feature-image">
                            <img 
                                src={feature.image_url} 
                                alt={feature.title}
                                className="modal-feature-image"
                            />
                        </div>
                    )}

                    <div className="modal-actions">
                        <button className="modal-primary-btn" onClick={onClose}>
                            Learn More About Our Services
                        </button>
                        <button className="modal-secondary-btn" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureModal;
