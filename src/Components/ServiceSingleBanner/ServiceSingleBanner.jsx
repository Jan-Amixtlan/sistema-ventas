import React from 'react';
import './ServiceSingleBanner.css';

const ServiceSingleBanner = () => {
    return (
        <section className="service-single-banner">
            {/* Imagen de fondo con overlay */}
            <div className="banner-background">
                <div className="banner-overlay"></div>
            </div>

            {/* Contenido del banner */}
            <div className="banner-container">
                <div className="banner-content-left">
                    <div className="banner-badge-block">
                        <img src="https://pro-theme.com/html/cardan/assets/img/img-service-logo.png " alt="DealerRater Certified" className="banner-badge-logo" />
                        <div className="banner-badge-label">
                            <span className="badge-title">DealerRater</span>
                            <span className="badge-subtitle">CERTIFIED</span>
                            <span className="badge-desc">SERVICE CENTER</span>
                        </div>
                    </div>
                    <h2 className="banner-workshop">Cardan Workshop</h2>
                    <h1 className="banner-title">Engine or Transmission Mount Replacement</h1>
                    <div className="banner-address">
                        <span className="banner-address-icon">🧭</span>
                        <span>567 Little Lonsdale St, Melbourne VIC 3000, Australia</span>
                    </div>
                </div>
                <div className="banner-content-right">
                    <div className="banner-rating-block">
                        <div className="banner-stars">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="star">★</span>
                            ))}
                        </div>
                        <span className="banner-rating-label">Based on 24 Reviews</span>
                        <span className="banner-rating-score">4.2</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceSingleBanner;
