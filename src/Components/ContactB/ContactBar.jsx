import React from 'react';
import { Phone, Mail, Settings } from 'lucide-react';
import logoIcon from '../../assets/icons/logo-icon.svg';
import './ContactBar.css';

const ContactBar = () => {
  return (
    <section className="contact-bar">
      <div className="contact-bar-container">
        
        {/* Schedule Expert Visit */}
        <div className="contact-item schedule-item">
          <div className="contact-icon schedule-icon">
            <img src={logoIcon} width="70" height="70" alt="Schedule Expert" />
          </div>
          <div className="contact-content">
            <h3 className="contact-title">Schedule Our Expert</h3>
            <p className="contact-subtitle">Visit Or Get A Quote</p>
          </div>
        </div>

        {/* Phone Contact */}
        <div className="contact-item phone-item">
          <div className="contact-icon phone-icon">
            <Phone size={20} />
          </div>
          <div className="contact-content">
            <span className="contact-label">Schedule a Visit</span>
            <a href="tel:8109204660" className="contact-link phone-link">
              (810) 920-4660
            </a>
          </div>
        </div>

        {/* Email Contact */}
        <div className="contact-item email-item">
          <div className="contact-icon email-icon">
            <Mail size={20} />
          </div>
          <div className="contact-content">
            <span className="contact-label">Need Help? Send us Email</span>
            <a href="mailto:repair@cardan.com" className="contact-link email-link">
              repair@cardan.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBar;