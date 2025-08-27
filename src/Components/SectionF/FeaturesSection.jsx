import React, { useState, useEffect } from 'react';
import { Wrench, Car, UserCheck, ArrowRight } from 'lucide-react';
import { featuresService } from '../../services/featuresService.js';
import FeatureModal from '../FeatureModal/FeatureModal.jsx';
import './FeaturesSection.css';

const FeaturesSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fallback data en caso de que la API no esté disponible
    const fallbackFeatures = [
        {
            id: 1,
            icon_type: "wrench",
            title: "Modern Equipments",
            description: "Enim venia quis nostrud exercit ullamco laboris nsut aliquip com conseq reprehenderit.",
            detailed_description: "Our state-of-the-art automotive equipment ensures precision diagnostics and repairs. We use cutting-edge technology to provide the most accurate service for your vehicle.",
            benefits: [
                "Advanced diagnostic computers",
                "Precision alignment equipment", 
                "Latest brake testing systems",
                "Modern lift and hydraulic systems"
            ],
            specifications: [
                { label: "Diagnostic Accuracy", value: "99.9%" },
                { label: "Equipment Age", value: "< 2 Years" }
            ]
        },
        {
            id: 2,
            icon_type: "car",
            title: "Trusted Workshop",
            description: "Enim venia quis nostrud exercit ullamco laboris nsut aliquip com conseq reprehenderit.",
            detailed_description: "With over 15 years in the automotive industry, our workshop has built a reputation for reliability, quality, and customer satisfaction.",
            benefits: [
                "ASE certified technicians",
                "Quality guarantee on all work",
                "Transparent pricing",
                "Customer satisfaction guarantee"
            ],
            specifications: [
                { label: "Years in Business", value: "15+" },
                { label: "Customer Rating", value: "4.9/5" }
            ]
        },
        {
            id: 3,
            icon_type: "user-check",
            title: "Service Any Vehicle",
            description: "Enim venia quis nostrud exercit ullamco laboris nsut aliquip com conseq reprehenderit.",
            detailed_description: "From compact cars to luxury vehicles, trucks to motorcycles - our experienced team can handle any automotive service need with expertise and care.",
            benefits: [
                "All vehicle makes and models",
                "Import and domestic vehicles",
                "Classic car restoration",
                "Commercial vehicle service"
            ],
            specifications: [
                { label: "Vehicle Types", value: "All Makes" },
                { label: "Service Range", value: "Complete" }
            ]
        }
    ];

    // Cargar características desde la API
    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                setLoading(true);
                const data = await featuresService.getFeatures();
                setFeatures(data || fallbackFeatures);
            } catch (error) {
                console.error('Error loading features:', error);
                setError(error.message);
                // Usar datos de fallback si la API falla
                setFeatures(fallbackFeatures);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatures();
    }, []);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    useEffect(() => {
        if (isMobile) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % features.length);
            }, 4000);

            return () => clearInterval(interval);
        }
    }, [isMobile, features.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const handleReadMore = async (feature) => {
        try {
            // Intentar obtener detalles adicionales de la API
            const detailedFeature = await featuresService.getFeatureDetails(feature.id);
            setSelectedFeature({ ...feature, ...detailedFeature });
        } catch (error) {
            console.error('Error loading feature details:', error);
            // Usar los datos básicos si falla la carga de detalles
            setSelectedFeature(feature);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFeature(null);
    };

    const getIconComponent = (iconType) => {
        switch (iconType) {
            case 'wrench':
                return <Wrench size={40} />;
            case 'car':
                return <Car size={40} />;
            case 'user-check':
                return <UserCheck size={40} />;
            default:
                return <Wrench size={40} />;
        }
    };

    if (loading) {
        return (
            <section className="features-section">
                <div className="features-container">
                    <div className="features-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading features...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="features-section">
                <div className="features-container">
                    <div className={`features-wrapper ${isMobile ? 'mobile-carousel' : ''}`}>
                        {features.map((feature, index) => (
                            <div 
                                key={feature.id} 
                                className={`feature-card ${
                                    isMobile ? 
                                    (index === currentSlide ? 'active-slide' : 'hidden-slide') : 
                                    ''
                                }`}
                                style={isMobile ? { 
                                    transform: `translateX(${(index - currentSlide) * 100}%)` 
                                } : {}}
                            >
                                <div className="feature-icon">
                                    {getIconComponent(feature.icon_type)}
                                </div>
                                <div className="feature-content">
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-description">{feature.description}</p>
                                    <button 
                                        className="feature-link"
                                        onClick={() => handleReadMore(feature)}
                                        aria-label={`Read more about ${feature.title}`}
                                    >
                                        READ MORE
                                        <ArrowRight size={16} className="arrow-icon" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {isMobile && (
                        <div className="carousel-indicators">
                            {features.map((_, index) => (
                                <button
                                    key={index}
                                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <FeatureModal 
                feature={selectedFeature}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    );
};

export default FeaturesSection;