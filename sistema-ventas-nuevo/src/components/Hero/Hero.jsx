import React, { useState, useEffect } from "react";
import "./Hero.css";

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // AQUÍ PUEDES AGREGAR TUS RUTAS DE IMÁGENES
    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80", // Cambia por tu imagen 1
            title: "Revoluciona tu Sistema",
            highlight: "de Ventas",
            description: "Gestiona a tus vendedores, cotizaciones y reportes de manera eficiente con nuestro sistema integral.",
            primaryButton: "Comenzar Ahora",
            secondaryButton: "Ver Demo"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80", // Cambia por tu imagen 2
            title: "Controla cada Venta",
            highlight: "en Tiempo Real",
            description: "Monitorea el rendimiento de tu equipo de ventas y toma decisiones inteligentes basadas en datos.",
            primaryButton: "Ver Estadísticas",
            secondaryButton: "Solicitar Info"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Cambia por tu imagen 3
            title: "Aumenta tus Ventas",
            highlight: "hasta un 300%",
            description: "Con herramientas avanzadas de análisis y gestión, potencia el rendimiento de tu equipo comercial.",
            primaryButton: "Descubrir Más",
            secondaryButton: "Contactar"
        }
    ];

    // Auto-play del carrusel (cambia cada 5 segundos)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    // Funciones de navegación
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section id="home" className="hero-carousel">
            <div className="carousel-container">
                {/* Slides del Carrusel */}
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        <div className="hero-overlay">
                            <div className="hero-content">
                                <h1>
                                    {slide.title} <br />
                                    <span>{slide.highlight}</span>
                                </h1>
                                <p>{slide.description}</p>
                                <div className="hero-buttons">
                                    <button className="btn btn-primary">{slide.primaryButton}</button>
                                    <button className="btn btn-secondary">{slide.secondaryButton}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Botón Anterior */}
                <button className="carousel-nav carousel-prev" onClick={prevSlide}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                
                {/* Botón Siguiente */}
                <button className="carousel-nav carousel-next" onClick={nextSlide}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Indicadores (puntos) */}
                <div className="carousel-indicators">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
