import React from 'react';
import './ServicesListBanner.css';

const ServicesListBanner = () => {
    return (
        <section className="services-list-banner">
            <div className="banner-bg">
                <div className="banner-overlay"></div>
            </div>
            <div className="banner-content">
                <h1 className="banner-title">All Services</h1>
                <div className="service-search-block">
                    <div className="service-search-title">Quickly find a service ...</div>
                    <form className="service-search-form" onSubmit={e => e.preventDefault()}>
                        <input
                            type="text"
                            className="service-search-input"
                            placeholder="Quickly find a service ..."
                        />
                        <button type="submit" className="service-search-btn">
                            <span role="img" aria-label="search">🔍</span>
                        </button>
                    </form>
                </div>
                <div className="banner-line"></div>
                <nav className="banner-breadcrumb">
                    <a href="/" className="breadcrumb-link">Home</a>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">Services</span>
                </nav>
            </div>
        </section>
    );
};

export default ServicesListBanner;
