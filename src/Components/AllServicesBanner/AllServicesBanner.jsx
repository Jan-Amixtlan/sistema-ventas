import React from 'react';
import './AllServicesBanner.css';

const AllServicesBanner = () => {
    return (
        <section className="all-services-banner">
            {/* Imagen de fondo con overlay */}
            <div className="banner-background">
                <div className="banner-overlay"></div>
            </div>

            {/* Contenido del banner */}
            <div className="banner-container">
                <div className="banner-content">
                    {/* Título principal */}
                    <h1 className="banner-title">All Services</h1>

                    {/* Línea decorativa */}
                    <div className="decorative-line"></div>

                    {/* Breadcrumb */}
                    <nav className="breadcrumb">
                        <a href="/" className="breadcrumb-link">Home</a>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">What We Do</span>
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default AllServicesBanner;