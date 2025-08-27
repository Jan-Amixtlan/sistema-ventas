import React from 'react';
import { CheckCircle, ArrowRight, Award } from 'lucide-react';
import './ServicesSection.css';

const ServicesSection = () => {
    const serviceChecks = [
        '75 Point Safety Inspection',
        'ABS Light is on Inspection',
        'AC is not working Inspection',
        'Adjust Windshield Washer Jets',
        'Air filter is clogged Inspection',
        'Air is not coming out Inspection',
        '75 Point Safety Inspection',
        'ABS Light is on Inspection',
        'AC is not working Inspection',
        'Adjust Windshield Washer Jets',
        'Air filter is clogged Inspection',
        'Air is not coming out Inspection'
    ];

    return (
        <section className="services-section">
            <div className="services-container">

                {/* Header */}
                <div className="services-header">
                    <span className="section-subtitle">We Promise To Give Best Maintenance</span>
                    <h2 className="section-title">Vehicle Services We Perform</h2>
                    <div className="title-divider"></div>
                </div>

                {/* Main Content */}
                <div className="services-content">

                    {/* Left Side - Image */}
                    <div className="services-image">
                        <img
                            src="https://pro-theme.com/html/cardan/assets/img/img-service-media.jpg"
                            alt="Professional mechanic performing vehicle diagnostics"
                            className="service-img"
                        />
                    </div>

                    {/* Right Side - Content */}
                    <div className="services-info">

                        {/* Service Header */}
                        <div className="service-header">
                            <div className="service-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <rect width="48" height="48" rx="12" fill="#2563EB" fillOpacity="0.1" />
                                    <path d="M24 16v16M16 24h16" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="20" cy="20" r="2" fill="#2563EB" />
                                    <circle cx="28" cy="28" r="2" fill="#2563EB" />
                                </svg>
                            </div>

                            <div className="service-title-section">
                                <h3 className="service-title">Vehicle Diagnostics</h3>
                                <div className="service-price-section">
                                    <span className="service-description">Auto diagnostic services starts from</span>
                                    <span className="service-price">$79.99</span>
                                </div>
                            </div>

                            <div className="guarantee-badge">
                                <Award className="badge-icon" size={20} />
                                <div className="badge-text">
                                    <span className="badge-title">BEST QUALITY</span>
                                    <span className="badge-subtitle">GUARANTEE</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="service-description-text">
                            Incididunt ut labore sed dolore magna aliquay enim veniam quis
                            nostrud exercitas tion ullamco laboris nisl ut aliquip ex ea
                            reprehen deritin voluptate.
                        </p>

                        {/* Service Checklist */}
                        <div className="service-checklist">
                            <div className="checklist-grid">
                                {serviceChecks.map((check, index) => (
                                    <div key={index} className="check-item">
                                        <CheckCircle className="check-icon" size={16} />
                                        <span className="check-text">{check}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="service-cta">
                            <button className="view-services-btn">
                                VIEW ALL SERVICES
                                <ArrowRight className="btn-icon" size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;