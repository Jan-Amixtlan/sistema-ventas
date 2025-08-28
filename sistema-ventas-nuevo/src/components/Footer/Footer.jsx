import React, { useState } from 'react';
import '../Footer/Footer.css';

const SalesFooter = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        empresa: '',
        telefono: '',
        servicio: 'Branding',
        mensaje: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            console.log('Formulario enviado:', formData);
            setIsSubmitting(false);
            setFormData({
                nombre: '',
                email: '',
                empresa: '',
                telefono: '',
                servicio: 'Branding',
                mensaje: ''
            });
        }, 2000);
    };

    return (
        <footer id="contacto" className="sales-footer">
            {/* Background Effects */}
            <div className="footer-background">
                <div className="bg-overlay"></div>
                <div className="bg-particles">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className={`particle particle-${i + 1}`}></div>
                    ))}
                </div>
                <div className="bg-grid"></div>
            </div>

            <div className="footer-container">

                {/* Contact Form Section */}
                <div className="contact-section">
                    <h2 className="section-title">CONTÁCTANOS</h2>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    placeholder="Nombre completo"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="correo@empresa.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="empresa"
                                    value={formData.empresa}
                                    onChange={handleInputChange}
                                    placeholder="Nombre de empresa"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    placeholder="(33) 1234-5678"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <select
                                name="servicio"
                                value={formData.servicio}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">¿Qué servicio te interesa?</option>
                                <option value="Sistema de Ventas">Diseño Web</option>
                                <option value="CRM">Diseño Gráfico</option>
                                <option value="Dashboard">UX/UI</option>
                                <option value="Consultoría">Experiencial</option>
                                <option value="Capacitación">Logotipo</option>
                                <option value="Marca">Recursos de Marca</option>
                                <option value="Decks">Decks</option>
                                <option value="Otros">Otros</option>

                            </select>
                        </div>

                        <div className="form-group">
                            <textarea
                                name="mensaje"
                                value={formData.mensaje}
                                onChange={handleInputChange}
                                placeholder="Cuéntanos sobre tu empresa y qué necesidades tienes..."
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="loading-spinner"></div>
                                    Enviando...
                                </>
                            ) : (
                                'Enviar'
                            )}
                        </button>
                    </form>
                </div>

                {/* Company Info Section */}
                <div className="info-section">
                    <p className="contact-intro">
                        En <strong>Osdems Digital</strong> será un placer atenderte;
                        escríbenos por cualquiera de nuestros medios:
                    </p>

                    <div className="contact-info">
                        <div className="contact-phones">
                            <div className="phone-item">
                                <svg className="phone-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+52 33 2622 5912</span>
                            </div>

                            <div className="phone-item">
                                <svg className="phone-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span>+52 33 1174 4584</span>
                            </div>

                            <div className="phone-item">
                                <svg className="phone-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+52 33 1822 4312</span>
                            </div>
                        </div>

                        <div className="email-item">
                            <svg className="email-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>hello@osdemsdigital.com</span>
                        </div>

                        <div className="address-item">
                            <svg className="address-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div className="address-details">
                                <span>Blvd. Puerto de Hierro</span>
                                <span>5153 Fracc. Plaza</span>
                                <span>Andares Zapopan, Jalisco</span>
                                <span>45116 Piso 2</span>
                            </div>
                        </div>
                    </div>

                    <div className="social-links">
                        <a href="#" className="social-link facebook">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>

                        <a href="#" className="social-link instagram">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.185-1.549-.737-.954-.737-2.436 0-3.391.737-.954 1.888-1.549 3.185-1.549s2.448.595 3.185 1.549c.737.955.737 2.437 0 3.391-.737.954-1.888 1.549-3.185 1.549zm7.718 0c-1.297 0-2.448-.596-3.185-1.549-.737-.954-.737-2.436 0-3.391.737-.954 1.888-1.549 3.185-1.549s2.448.595 3.185 1.549c.737.955.737 2.437 0 3.391-.737.954-1.888 1.549-3.185 1.549z" />
                            </svg>
                        </a>

                        <a href="#" className="social-link youtube">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>

                        <a href="#" className="social-link tiktok">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Menu and Schedule Section */}
                <div className="menu-schedule-section">
                    {/* Navigation Menu */}
                    <div className="navigation-menu">
                        <h3 className="menu-title">MENÚ</h3>
                        <nav className="menu-links">
                            <a href="#" className="menu-link">Home</a>
                            <a href="#" className="menu-link">Services</a>
                            <a href="#" className="menu-link">About Us</a>
                            <a href="#" className="menu-link">Digital Trends</a>
                            <a href="#" className="menu-link">Premium</a>
                            <a href="#" className="menu-link">Product Branding</a>
                        </nav>
                    </div>

                    {/* Business Hours */}
                    <div className="business-hours">
                        <h3 className="hours-title">HORARIO DE OFICINA</h3>
                        <div className="schedule">
                            <span className="days">Lunes - Sábado</span>
                            <span className="time">08:00 AM a 7:00 PM</span>
                        </div>

                        <div className="payment-methods">
                            <div className="payment-cards">
                                <div className="card visa">VISA</div>
                                <div className="card mastercard">MasterCard</div>
                                <div className="card amex">American Express</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default SalesFooter;