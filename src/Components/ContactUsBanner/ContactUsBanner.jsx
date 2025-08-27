import React from 'react';
import './ContactUsBanner.css';

const ContactUsBanner = () => {
    return (
        <section className="contact-banner">
            {/* Imagen de fondo con overlay */}
            <div className="banner-background">
                <div className="banner-overlay"></div>
            </div>

            {/* Contenido del banner */}
            <div className="banner-container">
                <div className="banner-content">
                    {/* Título principal */}
                    <h1 className="banner-title">Contact Us</h1>

                    {/* Línea decorativa */}
                    <div className="decorative-line"></div>

                    {/* Breadcrumb */}
                    <nav className="breadcrumb">
                        <a href="/" className="breadcrumb-link">Home</a>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">Contact Us</span>
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default ContactUsBanner;