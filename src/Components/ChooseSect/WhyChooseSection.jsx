import React from 'react';
import { Clock, Wrench, Award } from 'lucide-react';
import logoIcon from '../../assets/icons/logo-icon.svg';
import './WhyChooseSection.css';

const WhyChooseSection = () => {
    const features = [
        {
            id: 1,
            title: "Reliable & Fast Service",
            description: "Magna aliqua unt enimd mini venia quis ullamco aliquip equats.",
            icon: <Clock size={24} />,
            color: "blue"
        },
        {
            id: 2,
            title: "Right-Way Repairing",
            description: "Magna aliqua unt enimd mini venia quis ullamco aliquip equats.",
            icon: <Wrench size={24} />,
            color: "red"
        },
        {
            id: 3,
            title: "Leading Auto Specialists",
            description: "Magna aliqua unt enimd mini venia quis ullamco aliquip equats.",
            icon: <Award size={24} />,
            color: "green"
        }
    ];

    return (
        <section className="why-choose-section">
            <div className="why-choose-container">

                {/* Left Side - Image with Overlay */}
                <div className="image-side">
                    <img
                        src="https://pro-theme.com/html/cardan/assets/img/img-why-choose.jpg"
                        alt="Professional mechanic using diagnostic tablet equipment"
                        className="hero-image"
                    />
                    <div className="image-overlay">
                        <div className="overlay-content">
                            <div className="company-logo">
                                <img src={logoIcon} width="100" height="100" alt="Cardan Logo" />
                            </div>
                            <h3 className="overlay-title">
                                Feeling uneasy about<br />
                                your vehicle?<br />
                                <span className="highlight">Cardan Can Help!</span>
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Right Side - Content */}
                <div className="content-side">
                    <div className="content-header">
                        <span className="section-subtitle">Why Choose Cardan Repair Services</span>
                        <h2 className="section-title">
                            Master Technicians With<br />
                            Extensive Knowledge
                        </h2>
                        <div className="title-divider"></div>
                    </div>

                    <p className="section-description">
                        Tempor incididunt labor sed dolore magna sed aliquay enim ad
                        minim veniam quis nostrud exercitation ullamco laboris ex sed
                        ipsum ea reprehen deritin voluptate.
                    </p>

                    <div className="features-list">
                        {features.map((feature) => (
                            <div key={feature.id} className="feature-item">
                                <div className={`feature-icon ${feature.color}`}>
                                    {feature.icon}
                                </div>
                                <div className="feature-content">
                                    <h4 className="feature-title">{feature.title}</h4>
                                    <p className="feature-description">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;