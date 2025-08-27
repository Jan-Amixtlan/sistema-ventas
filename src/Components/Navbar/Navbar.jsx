import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navItems = [
        { name: 'HOME', to: '/' },
        { name: 'ABOUT', to: '/about' },
        {
            name: 'SERVICES',
            to: '/services',
            submenu: [
                { name: 'Services Grid', to: '/services/grid' },
                { name: 'Services List', to: '/services/list' },
                { name: 'Services Single', to: '/services/single' }
            ]
        },
        { name: 'CONTACT', to: '/contact' }
    ];
    const getActiveLink = () => {
        if (location.pathname === '/' || location.pathname === '') return 'HOME';
        if (location.pathname.includes('about')) return 'ABOUT';
        if (location.pathname.includes('services')) return 'SERVICES';
        if (location.pathname.includes('contact')) return 'CONTACT';
        return '';
    };
    const activeLink = getActiveLink();
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
                    <img src="https://raw.githubusercontent.com/Jan-Amixtlan/prueba-tecnica-frontend/refs/heads/main/public/logo.png" alt="CARDAN Logo" className="logo-img" />
                </Link>

                {/* Desktop Navigation */}
                <div className="navbar-menu desktop-menu">
                    {navItems.map((item) => (
                        item.submenu ? (
                            <div key={item.name} className="nav-link nav-dropdown">
                                <span>{item.name}</span>
                                <div className="dropdown-content">
                                    {item.submenu.map((sub) => (
                                        <Link
                                            key={sub.name}
                                            to={sub.to}
                                            className="dropdown-link"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={item.name}
                                to={item.to}
                                className={`nav-link ${activeLink === item.name ? 'active' : ''}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        )
                    ))}
                </div>

                {/* Contact Button */}
                <div className="navbar-contact">
                    <MessageCircle className="contact-icon" size={20} />
                    <div className="contact-info">
                        <span className="contact-text">Talk With Our Experts</span>
                        <span className="contact-phone">(810) 920-0664</span>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
                {navItems.map((item) => (
                    item.submenu ? (
                        <div key={item.name} className="mobile-nav-link nav-dropdown">
                            <span>{item.name}</span>
                            <div className="dropdown-content">
                                {item.submenu.map((sub) => (
                                    <Link
                                        key={sub.name}
                                        to={sub.to}
                                        className="dropdown-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {sub.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Link
                            key={item.name}
                            to={item.to}
                            className={`mobile-nav-link ${activeLink === item.name ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    )
                ))}
                <div className="mobile-contact">
                    <span className="mobile-contact-text">Talk With Our Experts</span>
                    <span className="mobile-contact-phone">(810) 920-0664</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;