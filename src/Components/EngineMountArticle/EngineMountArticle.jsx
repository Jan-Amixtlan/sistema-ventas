import React, { useState, useEffect } from 'react';
import './EngineMountArticle.css';

const EngineMountArticle = () => {
    const [activeSection, setActiveSection] = useState('');
    const [isSticky, setIsSticky] = useState(false);

    const engineMountTypes = [
        "Monturas de caucho en sistema estándar",
        "Montaje de autocomponentes del motor estándar",
        "Elementos de fijación tempron resistente",
        "Cárter delantero estándar de alta resistencia"
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleGetServices = () => {
        console.log('Get Services clicked');
    };

    const renderLocationIcon = () => (
        <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );

    const renderPhoneIcon = () => (
        <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
    );

    const renderClockIcon = () => (
        <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
            <polyline points="12,6 12,12 16,14" strokeWidth={2} />
        </svg>
    );

    const renderEmailIcon = () => (
        <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );

    return (
        <div className="engine-mount-article">
            <div className="container">
                <div className="article-layout">
                    {/* Contenido principal del artículo */}
                    <article className="article-content">
                        {/* Imagen principal y título */}
                        <div className="article-header">
                            <div className="header-images">
                                <img
                                    src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop"
                                    alt="Female mechanic working on car engine"
                                    className="main-image"
                                />
                                <div className="map-widget">
                                    <div className="map-placeholder">
                                        <div className="map-pin"></div>
                                        <span>Location Map</span>
                                    </div>
                                </div>
                            </div>

                            <h1 className="article-title">What is the Engine Mount in car?</h1>

                            <p className="article-intro">
                                Magna aliqua umt enimd mini venia quis ulamco aliquip commodo cons
                                equat duis aute irue derit lorem ipsum dolor sit amet. Consectetur
                                adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                magna aliqua sed ullamco laboris. Lorem ipsum dolor sit amet ell
                                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna sed ullam enim ad minim veniam quis nostrud.
                            </p>

                            <p className="article-description">
                                Exercitation ullamco labore nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa qui officia deserunt.
                            </p>
                        </div>

                        {/* Imágenes secundarias */}
                        <div className="secondary-images">
                            <img
                                src="https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=300&h=200&fit=crop"
                                alt="Engine compartment view"
                                className="secondary-image"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=300&h=200&fit=crop"
                                alt="Mechanic working"
                                className="secondary-image"
                            />
                        </div>

                        {/* Tipos de monturas */}
                        <section className="article-section" id="types">
                            <h2 className="section-title">Types of Engine Mounts That You Must Know</h2>
                            <p className="section-description">
                                Mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error
                                sit voluptatem accusantium doloremque laudantium. Totam rem aperiam
                                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
                                vitae dicta sunt explicabo.
                            </p>

                            <ul className="mount-types-list">
                                {engineMountTypes.map((type, index) => (
                                    <li key={index} className="mount-type-item">
                                        <span className="type-marker"></span>
                                        {type}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Importancia del servicio */}
                        <section className="article-section" id="importance">
                            <h2 className="section-title">How important is this service?</h2>
                            <p className="section-description">
                                Lorem ipsum magna voluptatem quia voluptas sit aspernatur aut odit aut
                                fugit, sed quia consequr ur magni dolores eos qui ratione voluptatem sequi
                                nesciunt. Neque porro quisquam est, quid dolorem ipsum quia dolor sit
                                amet consectetur adipisci velit sed quia eius.
                            </p>
                        </section>

                        {/* CTA final */}
                        <section className="article-cta">
                            <div className="cta-content">
                                <div className="cta-illustration">
                                    <div className="car-illustration">
                                        <div className="car-body"></div>
                                        <div className="car-wheels">
                                            <div className="wheel"></div>
                                            <div className="wheel"></div>
                                        </div>
                                        <div className="repair-tools">
                                            <div className="tool"></div>
                                            <div className="tool"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cta-text">
                                    <h3 className="cta-title">Fast & Easy Car Service at your Place</h3>
                                    <p className="cta-description">
                                        We guarantee if you come at Cardan,
                                        your warranty will stay intact, right
                                        place to repair.
                                    </p>
                                    <button className="cta-button" onClick={handleGetServices}>
                                        GET SERVICES
                                    </button>
                                </div>
                            </div>
                        </section>
                    </article>

                    {/* Sidebar de contacto */}
                    <aside className={`contact-sidebar ${isSticky ? 'sticky' : ''}`}>
                        <div className="sidebar-content">
                            <h2 className="sidebar-title">Contact Details</h2>

                            <div className="contact-item">
                                <div className="contact-icon-wrapper">
                                    {renderLocationIcon()}
                                </div>
                                <div className="contact-info">
                                    <h3 className="info-title">HeadOffice Address</h3>
                                    <p className="info-text">
                                        354 Oakridge Lane,<br />
                                        Camden NJ 08102 - USA
                                    </p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon-wrapper">
                                    {renderPhoneIcon()}
                                </div>
                                <div className="contact-info">
                                    <h3 className="info-title">For Rental Support</h3>
                                    <p className="info-text">+(610) 799 4680 / 5660</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon-wrapper">
                                    {renderClockIcon()}
                                </div>
                                <div className="contact-info">
                                    <h3 className="info-title">The Office Hours</h3>
                                    <p className="info-text">Mon - Sat 8am to 7pm</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon-wrapper">
                                    {renderEmailIcon()}
                                </div>
                                <div className="contact-info">
                                    <h3 className="info-title">Send Us Email</h3>
                                    <p className="info-text">repair@my-domain.net</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default EngineMountArticle;