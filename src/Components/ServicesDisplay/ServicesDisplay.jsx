import React, { useState, useEffect } from 'react';
import { servicesService } from '../../services/servicesService';
import { useApi } from '../../hooks/useApi';
import './ServicesDisplay.css';

const ServicesDisplay = ({ displayType = 'grid' }) => {
    const [services, setServices] = useState([]);
    const { loading, error, execute } = useApi();

    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await execute(() => servicesService.getServices());
                setServices(data);
            } catch (err) {
                console.error('Error loading services:', err);
            }
        };

        loadServices();
    }, [execute]);

    if (loading) {
        return (
            <div className="services-loading">
                <div className="loading-spinner"></div>
                <p>Loading services...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="services-error">
                <p>Error loading services: {error}</p>
                <button onClick={() => window.location.reload()}>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className={`services-display ${displayType}`}>
            <div className="container">
                <div className="services-header">
                    <h2>Our Services</h2>
                    <p>Professional automotive services you can trust</p>
                </div>

                <div className={`services-${displayType}`}>
                    {services.length > 0 ? (
                        services.map(service => (
                            <div key={service.id} className="service-item">
                                <div className="service-image">
                                    <img 
                                        src={service.image || '/api/placeholder/300/200'} 
                                        alt={service.name}
                                        onError={(e) => {
                                            e.target.src = '/api/placeholder/300/200';
                                        }}
                                    />
                                </div>
                                <div className="service-content">
                                    <h3 className="service-title">{service.name}</h3>
                                    <p className="service-description">{service.description}</p>
                                    <div className="service-meta">
                                        <span className="service-price">
                                            ${service.price}
                                        </span>
                                        <span className="service-duration">
                                            {service.duration || '1-2 hours'}
                                        </span>
                                    </div>
                                    <button className="service-button">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-services">
                            <p>No services available at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServicesDisplay;
