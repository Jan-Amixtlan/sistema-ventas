import React, { useState } from 'react';
import './WhyChooseUs.css';

const WhyChooseExact = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const services = [
        {
            id: 1,
            title: "Reliable & Fast Service",
            description: "Magna sed alique umt derit enimd mini venia",
            icon: "car-service"
        },
        {
            id: 2,
            title: "Right-Way Repairing",
            description: "Derit magna alique umts enimd mini dolor sed",
            icon: "repair-tools"
        },
        {
            id: 3,
            title: "Leading Auto Specialists",
            description: "Magna alique sed umt enimd dolor min venia",
            icon: "specialists"
        }
    ];

    const handleVideoPlay = () => {
        setIsVideoPlaying(!isVideoPlaying);
        console.log('Video play clicked');
    };

    const renderServiceIcon = (iconType) => {
        const baseIconStyle = {
            width: '40px',
            height: '40px'
        };

        switch (iconType) {
            case 'car-service':
                return (
                    <div className="service-icon car-service-icon" style={baseIconStyle}>
                        <div className="car-body"></div>
                        <div className="car-detail"></div>
                        <div className="wrench"></div>
                    </div>
                );
            case 'repair-tools':
                return (
                    <div className="service-icon repair-tools-icon" style={baseIconStyle}>
                        <div className="tool-1"></div>
                        <div className="tool-2"></div>
                        <div className="tool-handle"></div>
                    </div>
                );
            case 'specialists':
                return (
                    <div className="service-icon specialists-icon" style={baseIconStyle}>
                        <div className="tool-set">
                            <div className="tool"></div>
                            <div className="tool"></div>
                            <div className="tool"></div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="why-choose-exact">
            <div className="container">
                <div className="content-wrapper">
                    {/* Contenido de texto */}
                    <div className="text-content">
                        <p className="subtitle">Why Choose Cardan Repair Services</p>
                        <h2 className="main-title">
                            Master Technicians With<br />
                            Extensive Knowledge
                        </h2>
                        <div className="decorative-line"></div>

                        <p className="description">
                            Tempor incididunt labor sed dolore umt magna sed aliquay enim ad dolor minim
                            veniam quis nostrud exercitation ullamco laboris ex sed ipsum ea reprehen deritin
                            voluptate.
                        </p>

                        {/* Lista de servicios */}
                        <div className="services-list">
                            {services.map((service) => (
                                <div key={service.id} className="service-item">
                                    <div className="service-icon-wrapper">
                                        {renderServiceIcon(service.icon)}
                                    </div>
                                    <div className="service-content">
                                        <h3 className="service-title">{service.title}</h3>
                                        <div className="service-underline"></div>
                                        <p className="service-description">{service.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                    </div>

                    {/* Contenido visual */}
                    <div className="visual-content">
                        <div className="image-container">
                            <img
                                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&h=600&fit=crop&crop=face"
                                alt="Professional mechanic smiling"
                                className="mechanic-image"
                            />
                            <button
                                className="play-button"
                                onClick={handleVideoPlay}
                                aria-label="Play video"
                            >
                                <div className="play-icon">▶</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseExact;