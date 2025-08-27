import React from 'react';
import './AutoDiagnosticServices.css';

const AutoDiagnosticServices = () => {
    const services = [
        {
            id: 1,
            title: "Vehicle Diagnostics",
            price: "$79.99",
            image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop",
            description: "Incididunt ut labore sed dolore magna aliquay enim veniam quis nostrud exercitas tion ullamco laboris nisi ut aliquip ex ea reprehen deritn voluptate.",
            inspections: [
                "Cupping on tires Inspection",
                "Defroster is not working Inspection",
                "Door does not lock or open Inspection",
                "Electrical components not working",
                "Starter Light is on Inspection",
                "Battery is dead Inspection",
                "Battery will not hold a charge Inspection",
                "Brake Pedal is hard to push Inspection"
            ]
        },
        {
            id: 2,
            title: "Exhaust System",
            price: "$149.00",
            image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop",
            description: "Incididunt ut labore sed dolore magna aliquay enim veniam quis nostrud exercitas tion ullamco laboris nisi ut aliquip ex ea reprehen deritn voluptate.",
            inspections: [
                "Cupping on tires Inspection",
                "Defroster is not working Inspection",
                "Door does not lock or open Inspection",
                "Electrical components not working",
                "Battery Light is on Inspection",
                "Battery is dead Inspection",
                "Battery will not hold a charge Inspection",
                "Brake Pedal is hard to push Inspection"
            ]
        },
        {
            id: 3,
            title: "Clutch & Transmission",
            price: "$55.80",
            image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop",
            description: "Incididunt ut labore sed dolore magna aliquay enim veniam quis nostrud exercitas tion ullamco laboris nisi ut aliquip ex ea reprehen deritn voluptate.",
            inspections: [
                "Cupping on tires Inspection",
                "Defroster is not working Inspection",
                "Door does not lock or open Inspection",
                "Electrical components not working",
                "Battery Light is on Inspection",
                "Battery is dead Inspection",
                "Battery will not hold a charge Inspection",
                "Brake Pedal is hard to push Inspection"
            ]
        }
    ];

    const renderCarIcon = () => (
        <svg className="car-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 6H4L2 4h15l-4 2zM4 11h16l-1 6H5l-1-6z" />
        </svg>
    );

    const renderCheckIcon = () => (
        <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
    );

    return (
        <section className="auto-diagnostic-services">
            <div className="container">
                {services.map((service, index) => (
                    <div key={service.id} className={`service-item ${index % 2 === 1 ? 'reverse' : ''}`}>
                        {/* Imagen */}
                        <div className="service-image">
                            <img src={service.image} alt={service.title} />
                        </div>

                        {/* Contenido */}
                        <div className="service-content">
                            <div className="service-header">
                                <div className="service-icon">
                                    {renderCarIcon()}
                                </div>
                                <div className="service-info">
                                    <h3 className="service-title">{service.title}</h3>
                                    <p className="service-price">
                                        <span className="price-label">Auto diagnostic services starts from</span>
                                        <span className="price-amount">{service.price}</span>
                                    </p>
                                </div>
                            </div>

                            <p className="service-description">{service.description}</p>

                            <div className="inspections-grid">
                                {service.inspections.map((inspection, idx) => (
                                    <div key={idx} className="inspection-item">
                                        {renderCheckIcon()}
                                        <span>{inspection}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Sección Engine (Under the Hood) */}
                <div className="engine-service-section reverse">
                    <div className="engine-service-content">
                        <div className="engine-info">
                            <div className="engine-header">
                                <div className="engine-icon">
                                    {renderCarIcon()}
                                </div>
                                <div className="engine-details">
                                    <h3 className="engine-title">Engine (Under the Hood)</h3>
                                    <p className="engine-price">
                                        <span className="price-label">Auto diagnostic services starts from </span>
                                        <span className="price-amount">$208.00</span>
                                    </p>
                                </div>
                            </div>

                            <p className="engine-description">
                                Incididunt ut labore sed dolore magna aliquay enim veniam quis nostrud
                                exercitas tion ullamco laboris nisi ut aliquip ex ea reprehen deritin
                                voluptate.
                            </p>

                            <div className="engine-inspections">
                                <div className="inspections-column">
                                    <div className="inspection-item">
                                        {renderCheckIcon()}
                                        <span>Cupping on tires Inspection</span>
                                    </div>
                                    <div className="inspection-item">
                                        {renderCheckIcon()}
                                        <span>Defroster is not working Inspection</span>
                                    </div>
                                    <div className="inspection-item">
                                        {renderCheckIcon()}
                                        <span>Door does not lock or open Inspection</span>
                                    </div>
                                    <div className="inspection-item">
                                        {renderCheckIcon()}
                                        <span>Electrical components not working</span>
                                    </div>
                                </div>
                                <div className="inspections-column">
                                    <div className="inspection-item">
                                        {renderCheckIcon()}
                                        <span>Battery Light is on Inspection</span>
                                    </div>
                                    <div className="inspection-item">
                                        {renderCheckIcon()}
                                        <span>Battery is dead Inspection</span>
                                    </div>
                                    <div className="inspection-item">
                                        {renderCheckIcon()}
                                        <span>Battery will not hold a charge Inspection</span>
                                    </div>
                                    <div className="inspection-item">
                                        {renderCheckIcon()}
                                        <span>Brake Pedal is hard to push Inspection</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="engine-image">
                            <img
                                src="https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=300&fit=crop"
                                alt="Engine Under the Hood"
                            />
                        </div>
                    </div>
                </div>

                {/* Botón Load More Services */}
                <div className="load-more-section">
                    <button className="load-more-button" onClick={() => console.log('Load more services clicked')}>
                        LOAD MORE SERVICES ►
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AutoDiagnosticServices;
