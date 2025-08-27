import { FileText, Settings, Car, ArrowRight } from 'lucide-react';
import './ProcessSteps.css';

const ProcessSteps = () => {
    const steps = [
        {
            id: 1,
            number: "01",
            title: "Get a Free Quote",
            description: "Best thing about Antek is to earn some extra revenue on their equipments.",
            icon: <FileText size={32} />
        },
        {
            id: 2,
            number: "02",
            title: "Book Car Inspection",
            description: "Best thing about Antek is to earn some extra revenue on their equipments.",
            icon: <Settings size={32} />,
            featured: true
        },
        {
            id: 3,
            number: "03",
            title: "Get Your Car Fixed",
            description: "Best thing about Antek is to earn some extra revenue on their equipments.",
            icon: <Car size={32} />
        }
    ];

    return (
        <section className="process-steps">
            <div className="process-container">

                {/* Header */}
                <div className="process-header">
                    <span className="process-subtitle">Book An Appointment With Easy Steps</span>
                    <h2 className="process-title">Get Car Repair In Easy Steps</h2>
                    <div className="title-divider"></div>
                </div>

                {/* Steps */}
                <div className="steps-container">
                    <div className="steps-grid">
                        {steps.map((step, index) => (
                            <div key={step.id} className="step-wrapper">
                                <div className={`step-item ${step.featured ? 'step-featured' : ''}`}>

                                    {/* Step Number */}
                                    <div className="step-number">
                                        {step.number}
                                    </div>

                                    {/* Step Icon */}
                                    <div className={`step-icon ${step.featured ? 'icon-featured' : ''}`}>
                                        {step.icon}
                                    </div>

                                    {/* Step Content */}
                                    <div className="step-content">
                                        <h3 className="step-title">{step.title}</h3>
                                        <p className="step-description">{step.description}</p>
                                    </div>
                                </div>

                                {/* Connector Line */}
                                {index < steps.length - 1 && (
                                    <div className="step-connector">
                                        <div className="connector-line"></div>
                                        <div className="connector-dot"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="process-cta">
                    <button className="cta-btn primary-btn">
                        LEARN MORE
                        <ArrowRight size={18} />
                    </button>
                    <button className="cta-btn secondary-btn">
                        GET AN ESTIMATE
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProcessSteps;