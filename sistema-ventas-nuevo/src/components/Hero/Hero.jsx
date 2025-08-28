import React from "react";
import "./Hero.css";

const Hero = () => {
    return (
        <section id="home" className="hero-section">
            <div className="hero-container">
                {/* Header Principal */}
                <div className="hero-header">
                    <h1 className="hero-title">
                        Sistema de Ventas
                        <span className="hero-highlight"> Inteligente</span>
                    </h1>
                    <p className="hero-subtitle">
                        Gestiona, controla y potencia tu equipo de ventas con herramientas avanzadas de análisis y reportes en tiempo real
                    </p>
                </div>

                {/* Características Principales */}
                <div className="hero-features">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7v10c0 5.55 3.84 10 9 9s9-4.65 9-10V7l-10-5z"/>
                                <path d="M8 11l2 2 4-4"/>
                            </svg>
                        </div>
                        <h3>Gestión Segura</h3>
                        <p>Control total sobre tus vendedores, cotizaciones y procesos de venta con máxima seguridad</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 3v18h18"/>
                                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                            </svg>
                        </div>
                        <h3>Análisis en Tiempo Real</h3>
                        <p>Monitorea el rendimiento de tu equipo y toma decisiones inteligentes basadas en datos actuales</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
                            </svg>
                        </div>
                        <h3>Automatización</h3>
                        <p>Automatiza procesos repetitivos y aumenta la productividad de tu equipo comercial</p>
                    </div>
                </div>

                {/* Estadísticas */}
                <div className="hero-stats">
                    <div className="stat-item">
                        <div className="stat-number">300%</div>
                        <div className="stat-label">Aumento en Ventas</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">Monitoreo Continuo</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">99.9%</div>
                        <div className="stat-label">Disponibilidad</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">500+</div>
                        <div className="stat-label">Empresas Confían</div>
                    </div>
                </div>

                {/* Botones de Acción */}
                <div className="hero-actions">
                    <button className="btn btn-primary">
                        <span>Comenzar Ahora</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </button>
                    <button className="btn btn-secondary">
                        <span>Ver Demo</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="5,3 19,12 5,21"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
