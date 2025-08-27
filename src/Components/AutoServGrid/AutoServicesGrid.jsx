import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AutoServicesGrid.css';

const AutoServicesGrid = () => {
    const navigate = useNavigate();
    const services = [
        {
            id: 1,
            title: "Vehicle Diagnostic",
            price: "$79.99",
            image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop",
            description: "Complete diagnostic analysis of your vehicle's systems"
        },
        {
            id: 2,
            title: "Engine (Under Hood)",
            price: "$79.99",
            image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=300&fit=crop",
            description: "Professional engine inspection and maintenance"
        },
        {
            id: 3,
            title: "AC And Heating",
            price: "$79.99",
            image: "https://images.unsplash.com/photo-1632823471820-581ffe7a4531?w=400&h=300&fit=crop",
            description: "Air conditioning and heating system service"
        },
        {
            id: 4,
            title: "Belts And Brakes",
            price: "$79.99",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
            description: "Belt replacement and brake system maintenance"
        },
        {
            id: 5,
            title: "Exhaust Systems",
            price: "$79.99",
            image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop",
            description: "Exhaust system repair and replacement"
        },
        {
            id: 6,
            title: "Lights And Ignition",
            price: "$79.99",
            image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&h=300&fit=crop",
            description: "Lighting system and ignition service"
        },
        {
            id: 7,
            title: "Clutch Transmission",
            price: "$79.99",
            image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop",
            description: "Clutch and transmission system maintenance"
        },
        {
            id: 8,
            title: "Wheels Alignment",
            price: "$79.99",
            image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop",
            description: "Professional wheel alignment service"
        },
        {
            id: 9,
            title: "Auto Fuel System",
            price: "$79.99",
            image: "https://images.unsplash.com/photo-1632823469444-437bda7c6157?w=400&h=300&fit=crop",
            description: "Fuel system cleaning and maintenance"
        }
    ];

    const handleServiceClick = (service) => {
        navigate('/services-single');
    };

    return (
        <section className="auto-services-grid">
            <div className="container">
                <div className="services-grid">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="service-card"
                        >
                            <div className="card-image">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="service-image"
                                />
                                <div className="image-overlay"></div>
                                <button
                                    className="card-plus-btn"
                                    onClick={() => handleServiceClick(service)}
                                    aria-label="Ver servicio"
                                >
                                    <span className="plus-icon">+</span>
                                </button>
                            </div>

                            <div className="card-content card-content-static">
                                <div className="card-content-row">
                                    <div>
                                        <h3 className="service-title">{service.title}</h3>
                                        <span className="price-label">Starting from <span className="price-amount">{service.price}</span></span>
                                    </div>
                                    <button
                                        className="card-arrow-btn"
                                        onClick={() => handleServiceClick(service)}
                                        aria-label="Ver servicio"
                                    >
                                        
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AutoServicesGrid;