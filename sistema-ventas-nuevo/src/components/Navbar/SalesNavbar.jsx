import React, { useState } from 'react';
import './SalesNavbar.css';

const SalesNavbar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleDropdown = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className="moaflip-navbar">
            <div className="navbar-container">

                {/* Logo */}
                <div className="navbar-logo">
                    <span className="logo-text">MOAFLIP</span>
                </div>

                {/* Navigation Menu */}
                <div className={`navbar-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="#" className="nav-link">Home</a>
                        </li>

                        {/* Dropdown - Comprar Webs */}
                        <li className="nav-item dropdown">
                            <button
                                className="nav-link dropdown-toggle"
                                onClick={() => toggleDropdown('comprar')}
                            >
                                Comprar Webs
                                <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className={`dropdown-menu ${activeDropdown === 'comprar' ? 'show' : ''}`}>
                                <a href="#" className="dropdown-item">Landing Pages</a>
                                <a href="#" className="dropdown-item">E-commerce</a>
                                <a href="#" className="dropdown-item">Corporativas</a>
                                <a href="#" className="dropdown-item">Portfolios</a>
                            </div>
                        </li>

                        {/* Dropdown - Vender Webs */}
                        <li className="nav-item dropdown">
                            <button
                                className="nav-link dropdown-toggle"
                                onClick={() => toggleDropdown('vender')}
                            >
                                Vender Webs
                                <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className={`dropdown-menu ${activeDropdown === 'vender' ? 'show' : ''}`}>
                                <a href="#" className="dropdown-item">Crear Perfil</a>
                                <a href="#" className="dropdown-item">Subir Plantillas</a>
                                <a href="#" className="dropdown-item">Gestionar Ventas</a>
                                <a href="#" className="dropdown-item">Analytics</a>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a href="#" className="nav-link">Contacto</a>
                        </li>
                    </ul>
                </div>

                {/* Right Side Actions */}
                <div className="navbar-actions">
                    {/* Language Selector */}
                    <div className="language-selector">
                        <span className="flag-icon">🇪🇸</span>
                        <span className="language-text">Español</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button className="btn btn-secondary">
                            TASA TU WEB
                        </button>

                        <button className="btn btn-primary">
                            <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            MI CUENTA
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default SalesNavbar;