import React from 'react';
import { Play, CheckCircle2, Award, Users, Clock } from 'lucide-react';
import './AboutSection.css';

const AboutSection = () => {
    const features = [
        'Top rated excellent reviews from customers',
        'We provide new offers & promotions',
        'Expert technicians always at service for vehicles',
        'Get our lifetime guarantee service works',
        'Offering 1500+ services locations around USA'
    ];

    return (
        <section className="about-section">
            <div className="about-container">

                {/* Left Side - Images Grid */}
                <div className="images-grid">
                    <div className="main-image-container">
                        <img
                            src="https://pro-theme.com/html/cardan/assets/img/img-about-1.jpg"
                            alt="Professional mechanic working on car engine in modern garage"
                            className="main-image"
                        />
                        <div className="play-overlay">
                            <button className="play-btn">
                                <Play size={28} fill="white" />
                            </button>
                        </div>
                    </div>

                    <div className="stats-grid">
                        <div className="experience-card">
                            <Award className="card-icon" size={36} />
                            <div className="big-number">27</div>
                            <div className="card-text">
                                <span>Years of</span>
                                <span>Experience</span>
                            </div>
                            <div className="card-subtitle">Industry Leader</div>
                        </div>

                        <div className="secondary-images">
                        
                            <img
                                src="https://pro-theme.com/html/cardan/assets/img/img-about-3.jpg"
                                alt="Mechanic servicing vehicle suspension and maintenance"
                                className="small-image"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side - Content */}
                <div className="content-area">
                    <div className="content-header">
                        <span className="badge">About Cardan Repair Services</span>
                        <h2 className="main-title">
                            We're Committed To
                            <span className="highlight-text"> AutoRepair</span>
                            <br />Meets The Quality Standards
                        </h2>
                        <div className="accent-line"></div>
                    </div>

                    <p className="description">
                        Kiusmod tempor incididunt ut labore sed dolore magnas aliquay enim ad
                        minim veniam quis nostrud exercitation ullamco laboris nisut aliquip ex sed
                        ipsum ea reprehen deritin voluptate.
                    </p>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-row">
                                <div className="check-wrapper">
                                    <CheckCircle2 size={18} />
                                </div>
                                <span className="feature-text">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="stats-row">
                        <div className="stat-item">
                            <Users className="stat-icon" size={24} />
                            <div className="stat-content">
                                <div className="stat-number">15K+</div>
                                <div className="stat-label">Happy Customers</div>
                            </div>
                        </div>
                        <div className="stat-item">
                            <Clock className="stat-icon" size={24} />
                            <div className="stat-content">
                                <div className="stat-number">24/7</div>
                                <div className="stat-label">Support Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;