import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import './CarTypesSection.css';

const CarTypesSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(3);

    // Detectar tamaño de pantalla
    useEffect(() => {
        const updateItemsToShow = () => {
            const newItemsToShow = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
            setItemsToShow(newItemsToShow);

            // Ajustar currentSlide si excede el máximo permitido
            const maxSlide = Math.max(0, carTypes.length - newItemsToShow);
            setCurrentSlide(prev => Math.min(prev, maxSlide));
        };

        updateItemsToShow();
        window.addEventListener('resize', updateItemsToShow);

        return () => window.removeEventListener('resize', updateItemsToShow);
    }, []);

    const carTypes = [
        {
            id: 1,
            title: "Luxury Cars",
            description: "Magna aliqua unt enimd mini venia quis ullamco aliquip equats.",
            carImage: "🚗",
            bgColor: "white",
            textColor: "dark",
            featured: false
        },
        {
            id: 2,
            title: "SUVs & Pickups",
            description: "Magna aliqua unt enimd mini venia quis ullamco aliquip equats.",
            carImage: "🚙",
            bgColor: "white",
            textColor: "dark",
            featured: false
        },
        {
            id: 3,
            title: "Sports Cars",
            description: "Magna aliqua unt enimd mini venia quis ullamco aliquip equats.",
            carImage: "🏎️",
            bgColor: "white",
            textColor: "dark",
            featured: false
        },
        {
            id: 4,
            title: "Electric Vehicles",
            description: "Magna aliqua unt enimd mini venia quis ullamco aliquip equats.",
            carImage: "🔋",
            bgColor: "white",
            textColor: "dark",
            featured: false
        },
        {
            id: 5,
            title: "Classic Cars",
            description: "Magna aliqua unt enimd mini venia quis ullamco aliquip equats.",
            carImage: "🚘",
            bgColor: "white",
            textColor: "dark",
            featured: false
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => {
            const maxSlide = Math.max(0, carTypes.length - itemsToShow);
            return Math.min(prev + 1, maxSlide);
        });
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => Math.max(0, prev - 1));
    };

    // Calcular el offset en píxeles basado en el tamaño de pantalla
    const getOffsetPx = () => {
        if (typeof window === 'undefined') return 0;

        let cardWidth, gap;

        if (window.innerWidth <= 768) {
            cardWidth = 240;
            gap = 20;
        } else if (window.innerWidth <= 1024) {
            cardWidth = 260;
            gap = 20;
        } else {
            cardWidth = 280;
            gap = 20;
        }

        return currentSlide * (cardWidth + gap);
    };

    return (
        <section className="car-types-section">
            <div className="car-types-container">

                {/* Header */}
                <div className="section-header">
                    <span className="section-subtitle">Fixing Any Kind Of Vehicles At Cardan</span>
                    <h2 className="section-title">Types Of Cars We Repair</h2>
                    <div className="title-divider"></div>
                </div>

                {/* Car Types Carousel */}
                <div className="car-types-grid">
                    <div
                        className="carousel-wrapper"
                        style={{
                            transform: `translateX(-${getOffsetPx()}px)`
                        }}
                    >
                        {carTypes.map((carType, index) => (
                            <div
                                key={carType.id}
                                className={`car-type-card ${carType.featured ? 'featured-card' : ''}`}
                            >
                                <div className="car-illustration">
                                    <div className="car-icon">
                                        {carType.carImage === "🚗" && (
                                            <svg width="100" height="50" viewBox="0 0 120 60" fill="none">
                                                <rect x="10" y="25" width="80" height="20" rx="10" fill="#22C55E" stroke="#16A34A" strokeWidth="2" />
                                                <rect x="20" y="15" width="50" height="15" rx="7" fill="#22C55E" stroke="#16A34A" strokeWidth="2" />
                                                <circle cx="25" cy="50" r="8" fill="#374151" stroke="#1F2937" strokeWidth="2" />
                                                <circle cx="75" cy="50" r="8" fill="#374151" stroke="#1F2937" strokeWidth="2" />
                                                <circle cx="25" cy="50" r="4" fill="#6B7280" />
                                                <circle cx="75" cy="50" r="4" fill="#6B7280" />
                                            </svg>
                                        )}
                                        {carType.carImage === "🚙" && (
                                            <svg width="100" height="50" viewBox="0 0 120 60" fill="none">
                                                <rect x="5" y="20" width="90" height="25" rx="8" fill="#DC2626" stroke="#B91C1C" strokeWidth="2" />
                                                <rect x="15" y="10" width="60" height="20" rx="6" fill="#DC2626" stroke="#B91C1C" strokeWidth="2" />
                                                <rect x="75" y="25" width="15" height="15" rx="3" fill="#DC2626" stroke="#B91C1C" strokeWidth="2" />
                                                <circle cx="25" cy="50" r="8" fill="#374151" stroke="#1F2937" strokeWidth="2" />
                                                <circle cx="80" cy="50" r="8" fill="#374151" stroke="#1F2937" strokeWidth="2" />
                                                <circle cx="25" cy="50" r="4" fill="#6B7280" />
                                                <circle cx="80" cy="50" r="4" fill="#6B7280" />
                                            </svg>
                                        )}
                                        {carType.carImage === "🏎️" && (
                                            <svg width="100" height="50" viewBox="0 0 120 60" fill="none">
                                                <path d="M15 35 L25 25 L75 25 L90 35 L90 45 L15 45 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
                                                <path d="M25 25 L35 15 L65 15 L75 25" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
                                                <circle cx="30" cy="50" r="8" fill="#374151" stroke="#1F2937" strokeWidth="2" />
                                                <circle cx="75" cy="50" r="8" fill="#374151" stroke="#1F2937" strokeWidth="2" />
                                                <circle cx="30" cy="50" r="4" fill="#6B7280" />
                                                <circle cx="75" cy="50" r="4" fill="#6B7280" />
                                            </svg>
                                        )}
                                        {carType.carImage === "🔋" && (
                                            <svg width="100" height="50" viewBox="0 0 120 60" fill="none">
                                                <rect x="10" y="25" width="80" height="20" rx="10" fill="#10B981" stroke="#059669" strokeWidth="2" />
                                                <rect x="20" y="15" width="50" height="15" rx="7" fill="#10B981" stroke="#059669" strokeWidth="2" />
                                                <path d="M30 30 L35 25 L40 35 L45 25 L50 30" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <circle cx="25" cy="50" r="8" fill="#374151" stroke="#1F2937" strokeWidth="2" />
                                                <circle cx="75" cy="50" r="8" fill="#374151" stroke="#1F2937" strokeWidth="2" />
                                                <circle cx="25" cy="50" r="4" fill="#6B7280" />
                                                <circle cx="75" cy="50" r="4" fill="#6B7280" />
                                            </svg>
                                        )}
                                        {carType.carImage === "🚘" && (
                                            <svg width="100" height="50" viewBox="0 0 120 60" fill="none">
                                                <rect x="8" y="25" width="84" height="20" rx="10" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2" />
                                                <rect x="18" y="15" width="54" height="15" rx="7" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2" />
                                                <rect x="12" y="30" width="8" height="8" rx="2" fill="#FFFFFF" />
                                                <rect x="25" y="30" width="8" height="8" rx="2" fill="#FFFFFF" />
                                                <rect x="55" y="30" width="8" height="8" rx="2" fill="#FFFFFF" />
                                                <rect x="68" y="30" width="8" height="8" rx="2" fill="#FFFFFF" />
                                                <circle cx="25" cy="50" r="8" fill="#374151" stroke="#1F2937" strokeWidth="2" />
                                                <circle cx="75" cy="50" r="8" fill="#374151" stroke="#1F2937" strokeWidth="2" />
                                                <circle cx="25" cy="50" r="4" fill="#6B7280" />
                                                <circle cx="75" cy="50" r="4" fill="#6B7280" />
                                            </svg>
                                        )}
                                    </div>
                                </div>

                                <div className="card-content">
                                    <h3 className="card-title">{carType.title}</h3>
                                    <p className="card-description">{carType.description}</p>

                                    <button className="learn-more-btn">
                                        LEARN MORE
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                {carTypes.length > itemsToShow && (
                    <div className="navigation-controls">
                        <button
                            className={`nav-btn prev-btn ${currentSlide === 0 ? 'disabled' : ''}`}
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Indicadores de slide */}
                        <div className="slide-indicators">
                            {Array.from({ length: Math.max(0, carTypes.length - itemsToShow) + 1 }, (_, index) => (
                                <button
                                    key={index}
                                    className={`indicator ${currentSlide === index ? 'active' : ''}`}
                                    onClick={() => setCurrentSlide(index)}
                                />
                            ))}
                        </div>

                        <button
                            className={`nav-btn next-btn ${currentSlide >= Math.max(0, carTypes.length - itemsToShow) ? 'disabled' : ''}`}
                            onClick={nextSlide}
                            disabled={currentSlide >= Math.max(0, carTypes.length - itemsToShow)}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CarTypesSection;