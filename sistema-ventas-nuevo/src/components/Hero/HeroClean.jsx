import React, { useState, useEffect } from "react";
import "./HeroProfessional.css";

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Función para abrir WhatsApp Web
    const handleComenzarAhora = () => {
        console.log('Botón clickeado - abriendo WhatsApp'); // Debug
        const phoneNumber = '7761243832'; // Número sin código de país
        const message = encodeURIComponent(
            '¡Hola! Me interesa comenzar con el Sistema de Ventas. ¿Podrían ayudarme a implementar las estrategias de ventas efectivas en mi empresa?'
        );
        
        // Detectar si es dispositivo móvil
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Para dispositivos móviles: usar wa.me que abre la app nativa
            const mobileUrl = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
            const fallbackUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            
            // Intentar abrir la app nativa primero
            window.location.href = mobileUrl;
            
            // Fallback si la app no está instalada
            setTimeout(() => {
                window.open(fallbackUrl, '_blank');
            }, 2000);
            
        } else {
            // Para computadoras: usar WhatsApp Web
            const webUrl = `https://web.whatsapp.com/send?phone=52${phoneNumber}&text=${message}`;
            const fallbackUrl = `https://wa.me/52${phoneNumber}?text=${message}`;
            
            try {
                // Intentar WhatsApp Web primero
                const webWindow = window.open(webUrl, '_blank', 'noopener,noreferrer');
                
                // Si no se puede abrir WhatsApp Web, usar fallback
                if (!webWindow || webWindow.closed || typeof webWindow.closed == 'undefined') {
                    window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
                }
            } catch (error) {
                // Si hay error, usar el fallback
                window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
            }
        }
    };

    // Función para navegar al dashboard
    const handleVerDashboard = () => {
        console.log('Botón Ver Dashboard clickeado - navegando al dashboard'); // Debug
        const dashboardElement = document.getElementById('dashboard');
        if (dashboardElement) {
            dashboardElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            console.warn('Elemento dashboard no encontrado');
        }
    };

    // Función para redirigir a página web
    const handleConocerMas = () => {
        console.log('Botón Conocer Más clickeado - redirigiendo a página web'); // Debug
        const websiteUrl = 'https://osdemsdigital.com'; // URL de la página web
        console.log('URL generada:', websiteUrl); // Debug
        window.open(websiteUrl, '_blank');
    };

    // Datos profesionales para ventas
    const slides = [
        {
            id: 1,
            title: "Impulse su Crecimiento",
            subtitle: "con Estrategias de Ventas Efectivas",
            description: "Optimice sus procesos comerciales con herramientas profesionales de gestión de ventas, análisis de mercado y seguimiento de clientes para maximizar sus resultados.",
            primaryButton: "Comenzar Ahora",
            secondaryButton: "Conocer Más",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2125&q=80",
            stats: [
                { number: "300%", label: "Aumento en Ventas", icon: "📈" },
                { number: "24/7", label: "Soporte Técnico", icon: "🛠️" },
                { number: "99%", label: "Satisfacción Cliente", icon: "⭐" }
            ]
        },
        {
            id: 2,
            title: "Gestión Inteligente",
            subtitle: "de su Pipeline Comercial",
            description: "Controle cada etapa de su proceso de ventas con reportes detallados, métricas clave y análisis predictivo que le permitirán tomar decisiones estratégicas informadas.",
            primaryButton: "Ver Dashboard",
            secondaryButton: "Solicitar Demo",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80",
            stats: [
                { number: "85%", label: "Tasa de Conversión", icon: "🎯" },
                { number: "Real-time", label: "Reportes", icon: "📊" },
                { number: "50+", label: "Métricas Clave", icon: "📋" }
            ]
        },
        {
            id: 3,
            title: "Resultados Medibles",
            subtitle: "y Crecimiento Sostenible",
            description: "Implemente soluciones escalables que se adapten al crecimiento de su empresa, con herramientas de automatización y análisis avanzado para optimizar su ROI.",
            primaryButton: "Solicitar Consulta",
            secondaryButton: "Cotizar",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            stats: [
                { number: "5X", label: "ROI Promedio", icon: "💼" },
                { number: "$2M+", label: "Ventas Generadas", icon: "💰" },
                { number: "1000+", label: "Clientes Satisfechos", icon: "🏆" }
            ]
        }
    ];

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000); // Cambiar slides cada 8 segundos (más lento)

        return () => clearInterval(timer);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section id="home" className="hero-professional">
            {/* Background Image with Overlay */}
            <div className="hero-background">
                <div className="hero-overlay"></div>
                <img 
                    src={slides[currentSlide].image} 
                    alt="Background" 
                    className="hero-bg-image"
                />
            </div>

            {/* Main Content */}
            <div className="hero-container">
                <div className="hero-content">
                    {/* Left Content */}
                    <div className="hero-text">
                        <div className="hero-badge">
                            <span>Soluciones Empresariales</span>
                        </div>
                        
                        <h1 className="hero-title">
                            {slides[currentSlide].title}
                            <span className="hero-subtitle">
                                {slides[currentSlide].subtitle}
                            </span>
                        </h1>
                        
                        <p className="hero-description">
                            {slides[currentSlide].description}
                        </p>

                        {/* Action Buttons */}
                        <div className="hero-actions">
                            <button className="btn btn-primary" 
                                onClick={slides[currentSlide].primaryButton === "Ver Dashboard" ? handleVerDashboard : handleComenzarAhora}>
                                {slides[currentSlide].primaryButton}
                            </button>
                            <button className="btn btn-secondary" 
                                onClick={slides[currentSlide].secondaryButton === "Conocer Más" ? handleConocerMas : handleComenzarAhora}>
                                {slides[currentSlide].secondaryButton}
                            </button>
                        </div>

                        {/* Statistics */}
                        <div className="hero-stats">
                            {slides[currentSlide].stats.map((stat, index) => (
                                <div key={index} className="stat-item">
                                    <div className="stat-icon">{stat.icon}</div>
                                    <div className="stat-content">
                                        <div className="stat-number">{stat.number}</div>
                                        <div className="stat-label">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Visual Element */}
                    <div className="hero-visual">
                        <div className="visual-card">
                            <div className="card-header">
                                <h3>Panel de Control</h3>
                                <div className="status-indicator">
                                    <span className="status-dot"></span>
                                    Sistema Activo
                                </div>
                            </div>
                            
                            <div className="metrics-grid">
                                <div className="metric-item">
                                    <div className="metric-value">$1.2M</div>
                                    <div className="metric-label">Ventas del Mes</div>
                                    <div className="metric-trend positive">+15%</div>
                                </div>
                                <div className="metric-item">
                                    <div className="metric-value">247</div>
                                    <div className="metric-label">Leads Activos</div>
                                    <div className="metric-trend positive">+8%</div>
                                </div>
                                <div className="metric-item">
                                    <div className="metric-value">89%</div>
                                    <div className="metric-label">Tasa Conversión</div>
                                    <div className="metric-trend positive">+3%</div>
                                </div>
                                <div className="metric-item">
                                    <div className="metric-value">156</div>
                                    <div className="metric-label">Clientes Nuevos</div>
                                    <div className="metric-trend positive">+22%</div>
                                </div>
                            </div>

                            <div className="progress-section">
                                <div className="progress-header">
                                    <span>Objetivo Mensual</span>
                                    <span>78%</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{width: '78%'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide Navigation */}
                <div className="hero-navigation">
                    <button className="nav-btn prev" onClick={prevSlide}>
                        ‹
                    </button>
                    
                    <div className="slide-indicators">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>
                    
                    <button className="nav-btn next" onClick={nextSlide}>
                        ›
                    </button>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="decorative-elements">
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
            </div>
        </section>
    );
};

export default Hero;
