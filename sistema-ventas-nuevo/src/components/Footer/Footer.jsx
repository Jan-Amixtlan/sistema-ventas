import React from 'react';
import {
    Facebook,
    Twitter,
    Linkedin,
    Video,
    MessageCircle,
    Phone,
    Clock,
    Mail
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const services = [
        'Car Oil Change',
        'Purchase Inspection',
        'Auto Diagnostics',
        'Battery Problems',
        'Clutch & Brakes',
        'Engine Repair',
        'Filters & Exhaust'
    ];

    const companyLinks = [
        'About Cardan',
        'Fleet Maintenance',
        'Get a Career',
        'Service Areas',
        'Free Estimates',
        'Schedule Inspection',
        'Our Partners'
    ];

    const socialLinks = [
        { icon: <Facebook size={18} />, href: '#facebook', name: 'Facebook' },
        { icon: <Twitter size={18} />, href: '#twitter', name: 'Twitter' },
        { icon: <div className="google-plus">G+</div>, href: '#google', name: 'Google+' },
        { icon: <Linkedin size={18} />, href: '#linkedin', name: 'LinkedIn' },
        { icon: <Video size={18} />, href: '#vimeo', name: 'Vimeo' }
    ];

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    {/* Company Info Section */}
                    <div className="footer-section company-info">
                        <div className="footer-logo">
                            <div className="logo-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <rect width="40" height="40" rx="8" fill="#F59E0B" />
                                    <path d="M12 20h16M20 12v16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="16" cy="16" r="2" fill="white" />
                                    <circle cx="24" cy="24" r="2" fill="white" />
                                </svg>
                            </div>
                            <div className="logo-text">
                                <h2>CARDAN</h2>
                                <span>Auto Repair Services</span>
                            </div>
                        </div>

                        <p className="company-description">
                            Emoó tempor incididunt sed labore enim ad minim ips veniam quis nosts exercitation ullamco.
                        </p>

                        <div className="divider"></div>

                        <div className="contact-info">
                            <div className="contact-item">
                                <MessageCircle className="contact-icon" size={24} />
                                <div>
                                    <span className="contact-label">Talk With Our Experts</span>
                                    <span className="contact-value">(810) 920-4660</span>
                                </div>
                            </div>
                        </div>

                        <div className="social-links">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="social-link"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services Section */}
                    <div className="footer-section">
                        <h3 className="section-title">
                            CARDAN SERVICES
                            <div className="title-divider"></div>
                        </h3>
                        <ul className="footer-links">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <a href={`#${service.toLowerCase().replace(/\s+/g, '-')}`}>
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About Company Section */}
                    <div className="footer-section">
                        <h3 className="section-title">
                            ABOUT COMPANY
                            <div className="title-divider"></div>
                        </h3>
                        <ul className="footer-links">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="footer-section contact-section">
                        <h3 className="section-title">
                            GET IN TOUCH
                            <div className="title-divider"></div>
                        </h3>

                        <div className="contact-items">
                            <div className="contact-item">
                                <div className="contact-icon-wrapper">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <span className="contact-label">For Repair Support</span>
                                    <span className="contact-value">+1 (810) 799 4660 | 5560</span>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon-wrapper">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <span className="contact-label">The Working Hours</span>
                                    <span className="contact-value">Mon - Sat 9am to 7pm</span>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon-wrapper">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <span className="contact-label">Send Us Email</span>
                                    <span className="contact-value">repair@my-domain.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="footer-bottom">
                    <div className="copyright">
                        <span>(c) 2020 <strong>CARDAN</strong> - Auto Repair Services. All rights reserved.</span>
                        <a href="#terms" className="terms-link">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;