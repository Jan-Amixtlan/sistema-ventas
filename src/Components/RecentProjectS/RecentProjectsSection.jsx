import React, { useState } from 'react';
import { ZoomIn, ExternalLink } from 'lucide-react';
import './RecentProjectsSection.css';

const RecentProjectsSection = () => {
    const [hoveredProject, setHoveredProject] = useState(null);

    const projects = [
        {
            id: 1,
            title: "Engine Diagnostics",
            category: "Engine Repair",
            image: "https://pro-theme.com/html/cardan/assets/img/img-project-1.jpg",
            description: "Advanced diagnostic work on luxury vehicle"
        },
        {
            id: 2,
            title: "Precision Tools",
            category: "Equipment",
            image: "https://pro-theme.com/html/cardan/assets/img/img-project-2.jpg",
            description: "Professional automotive repair tools in action"
        },
        {
            id: 3,
            title: "Tire Services",
            category: "Maintenance",
            image: "https://pro-theme.com/html/cardan/assets/img/img-project-3.jpg",
            description: "Complete tire replacement and balancing service"
        },
        {
            id: 4,
            title: "Under Hood",
            category: "Inspection",
            image: "https://pro-theme.com/html/cardan/assets/img/img-project-4.jpg",
            description: "Comprehensive engine inspection and repair"
        },
        {
            id: 5,
            title: "Exhaust System",
            category: "Repair",
            image: "https://pro-theme.com/html/cardan/assets/img/img-project-5.jpg",
            description: "Professional exhaust system maintenance"
        },
        {
            id: 6,
            title: "Team Expert",
            category: "Service",
            image: "https://pro-theme.com/html/cardan/assets/img/img-project-6.jpg",
            description: "Experienced mechanic providing quality service"
        },
        {
            id: 7,
            title: "Brake Service",
            category: "Safety",
            image: "http://pro-theme.com/html/cardan/assets/img/img-project-7.jpg",
            description: "Professional brake system inspection and repair"
        },
        {
            id: 8,
            title: "Customer Care",
            category: "Service",
            image: "https://pro-theme.com/html/cardan/assets/img/img-project-8.jpg",
            description: "Excellent customer service and consultation"
        }
    ];

    return (
        <section className="recent-projects-section">
            <div className="projects-container">

                {/* Header */}
                <div className="projects-header">
                    <span className="section-subtitle">Cardan Is Leader In Auto Repair</span>
                    <h2 className="section-title">Our Recent Projects</h2>
                    <div className="title-divider"></div>
                </div>

                {/* Projects Grid */}
                <div className="projects-grid">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="project-item"
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            <div className="project-image-wrapper">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="project-image"
                                />

                                {/* Overlay */}
                                <div className={`project-overlay ${hoveredProject === project.id ? 'active' : ''}`}>
                                    <div className="overlay-content">
                                        <span className="project-category">{project.category}</span>
                                        <h3 className="project-title">{project.title}</h3>
                                        <p className="project-description">{project.description}</p>

                                        <div className="project-actions">
                                            <button className="action-btn zoom-btn">
                                                <ZoomIn size={18} />
                                            </button>
                                            <button className="action-btn link-btn">
                                                <ExternalLink size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentProjectsSection;