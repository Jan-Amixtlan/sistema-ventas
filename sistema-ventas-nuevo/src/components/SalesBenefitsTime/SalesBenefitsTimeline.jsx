import React, { useState, useEffect } from 'react';
import './SalesBenefitsTimeline.css';

const SalesBenefitsTimeline = () => {
    const [animatedBars, setAnimatedBars] = useState(false);
    const [visibleCards, setVisibleCards] = useState([]);

    // Datos de beneficios
    const benefits = [
        {
            id: 1,
            title: "Mayor Previsibilidad",
            description: "Anticipe tendencias y tome decisiones basadas en datos precisos",
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            color: "primary"
        },
        {
            id: 2,
            title: "Enfoque en Metas",
            description: "Mantenga a su equipo enfocado en los objetivos clave",
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "success"
        },
        {
            id: 3,
            title: "Ahorro de Tiempo",
            description: "Automatice reportes y reduzca tareas manuales en un 70%",
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "primary"
        },
        {
            id: 4,
            title: "ROI Comprobado",
            description: "Aumente sus ventas entre 15% y 25% en el primer año",
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            color: "orange"
        }
    ];

    // Datos del cronograma
    const timeline = [
        {
            id: 1,
            phase: "Análisis y Planificación",
            duration: 2,
            weeks: "2 semanas",
            color: "primary",
            percentage: 20
        },
        {
            id: 2,
            phase: "Desarrollo",
            duration: 4,
            weeks: "4 semanas",
            color: "success",
            percentage: 40
        },
        {
            id: 3,
            phase: "Pruebas",
            duration: 2,
            weeks: "2 semanas",
            color: "orange",
            percentage: 20
        },
        {
            id: 4,
            phase: "Implementación",
            duration: 1,
            weeks: "1 semana",
            color: "primary",
            percentage: 10
        },
        {
            id: 5,
            phase: "Capacitación",
            duration: 1,
            weeks: "1 semana",
            color: "success",
            percentage: 10
        }
    ];

    // Animación de tarjetas de beneficios
    useEffect(() => {
        const timer = setTimeout(() => {
            benefits.forEach((_, index) => {
                setTimeout(() => {
                    setVisibleCards(prev => [...prev, index]);
                }, index * 200);
            });
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    // Animación de barras del cronograma
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedBars(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    // Función para abrir WhatsApp Web específicamente
    const handleSolicitarDemo = () => {
        const phoneNumber = '3326225912'; // Número con código de país México (+52)
        const message = encodeURIComponent(
            '¡Hola! Me interesa solicitar una demo del Sistema de Forecast de Ventas. ¿Podrían proporcionarme más información sobre los beneficios y la implementación?'
        );
        // Usar web.whatsapp.com para forzar WhatsApp Web
        const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
        window.open(whatsappWebUrl, '_blank');
    };

    return (
        <div className="sales-benefits-timeline">

            {/* Sección de Beneficios */}
            <section className="benefits-section">
                <div className="section-header">
                    <div className="header-badge">
                        <svg className="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Resultados Garantizados</span>
                    </div>

                    <h2 className="section-title">
                        Beneficios del Sistema de Forecast de Ventas
                    </h2>

                    <p className="section-subtitle">
                        Maximice la eficiencia de su equipo comercial con nuestra solución integral
                    </p>
                </div>

                <div className="benefits-grid">
                    {benefits.map((benefit, index) => (
                        <div
                            key={benefit.id}
                            className={`benefit-card ${benefit.color} ${visibleCards.includes(index) ? 'visible' : ''}`}
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <div className="card-header">
                                <div className={`card-icon ${benefit.color}`}>
                                    {benefit.icon}
                                </div>
                                <h3 className="card-title">{benefit.title}</h3>
                            </div>

                            <p className="card-description">{benefit.description}</p>

                            <div className="card-hover-effect">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sección de Cronograma */}
            <section className="timeline-section">
                <div className="section-header">
                    <div className="header-badge">
                        <svg className="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Proceso Optimizado</span>
                    </div>

                    <h2 className="section-title">
                        Cronograma de Implementación
                    </h2>

                    <p className="section-subtitle">
                        Proceso estructurado para una implementación exitosa
                    </p>
                </div>

                <div className="timeline-container">
                    <div className="timeline-grid">
                        {timeline.map((item, index) => (
                            <div
                                key={item.id}
                                className="timeline-item"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="timeline-content">
                                    <div className="timeline-label">
                                        <h4 className="phase-title">{item.phase}</h4>
                                    </div>

                                    <div className="timeline-bar-container">
                                        <div className="timeline-bar-background">
                                            <div
                                                className={`timeline-bar ${item.color} ${animatedBars ? 'animated' : ''}`}
                                                style={{
                                                    width: animatedBars ? `${item.percentage}%` : '0%',
                                                    animationDelay: `${index * 0.2}s`
                                                }}
                                            ></div>
                                        </div>

                                        <div className="timeline-duration">
                                            <span className="duration-text">{item.weeks}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tiempo Total */}
                    <div className="total-time">
                        <div className="total-time-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="total-time-text">
                            Tiempo total de desarrollo: <strong>10 semanas</strong>
                        </span>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section">
                <div className="cta-container">
                    <div className="cta-content">
                        <h3 className="cta-title">¿Listo para transformar sus ventas?</h3>
                        <p className="cta-subtitle">Comience su implementación hoy mismo</p>
                    </div>

                    <div className="cta-actions">
                        <button className="cta-btn primary" onClick={handleSolicitarDemo}>
                            <span>Solicitar Demo</span>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <button className="cta-btn secondary">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Más Información
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SalesBenefitsTimeline;