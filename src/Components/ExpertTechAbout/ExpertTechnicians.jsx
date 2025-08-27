import React, { useState } from 'react';
import './ExpertTechnicians.css';

const ExpertTechnicians = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const technicians = [
        {
            id: 1,
            name: "Mark Dennis",
            position: "Chief Executive Officer",
            image: "https://pro-theme.com/html/cardan/assets/img/team-1.jpg"
        },
        {
            id: 2,
            name: "William Benson",
            position: "Workshop Manager",
            image: "https://pro-theme.com/html/cardan/assets/img/team-2.jpg"
        },
        {
            id: 3,
            name: "James Anderson",
            position: "Senior Technician",
            image: "https://pro-theme.com/html/cardan/assets/img/team-3.jpg"
        },
        {
            id: 4,
            name: "Amelia Grace",
            position: "Senior Technician",
            image: "https://pro-theme.com/html/cardan/assets/img/team-4.jpg"
        },
        {
            id: 5,
            name: "Robert Johnson",
            position: "Lead Mechanic",
            image: "https://pro-theme.com/html/cardan/assets/img/team-1.jpg"
        },
        {
            id: 6,
            name: "Sarah Wilson",
            position: "Auto Diagnostics Expert",
            image: "https://pro-theme.com/html/cardan/assets/img/team-2.jpg"
        }
    ];

    const slidesToShow = 4;
    const maxSlide = Math.max(0, technicians.length - slidesToShow);

    const nextSlide = () => {
        setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => prev <= 0 ? maxSlide : prev - 1);
    };

    const goToSlide = (index) => {
        setCurrentSlide(Math.min(index, maxSlide));
    };

    return (
        <section className="technicians-section">
            <div className="container">
                {/* Header */}
                <div className="section-header">
                    <div className="header-content">
                        <p className="subtitle">Cardan Is Leader In Auto Repair</p>
                        <h2 className="main-title">Our Expert Technicians</h2>
                        <div className="decorative-line"></div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="navigation-controls">
                        <button
                            className="nav-button prev-button"
                            onClick={prevSlide}
                            aria-label="Previous technicians"
                        >
                            ←
                        </button>
                        <button
                            className="nav-button next-button"
                            onClick={nextSlide}
                            aria-label="Next technicians"
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div className="carousel-container">
                    <div className="carousel-wrapper">
                        <div
                            className="carousel-track"
                            style={{
                                transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`
                            }}
                        >
                            {technicians.map((tech) => (
                                <div key={tech.id} className="technician-card">
                                    <div className="card-image">
                                        <img
                                            src={tech.image}
                                            alt={tech.name}
                                            className="technician-photo"
                                        />
                                    </div>
                                    <div className="card-content">
                                        <h3 className="technician-name">{tech.name}</h3>
                                        <p className="technician-position">{tech.position}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dots indicator */}
                <div className="carousel-dots">
                    {Array.from({ length: maxSlide + 1 }, (_, index) => (
                        <button
                            key={index}
                            className={`dot ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExpertTechnicians;