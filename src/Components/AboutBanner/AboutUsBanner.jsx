import React from 'react';
import './AboutUsBanner.css';

const AboutUsBanner = () => {
    return (
        <section className="about-banner">
            {/* Imagen de fondo con overlay */}
            <div className="banner-background">
                <div className="banner-overlay"></div>
            </div>

            {/* Contenido del banner */}
            <div className="banner-container">
                <div className="banner-content">
                    {/* Título principal */}
                    <h1 className="banner-title">About Us</h1>

                    {/* Línea decorativa */}
                    <div className="decorative-line"></div>

                    {/* Breadcrumb */}
                    <nav className="breadcrumb">
                        <a href="/" className="breadcrumb-link">Home</a>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">About Us</span>
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default AboutUsBanner;