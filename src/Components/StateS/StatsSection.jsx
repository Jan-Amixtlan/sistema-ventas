import React, { useState, useEffect, useRef } from 'react';
import { Car, Building2, Users, UserCheck } from 'lucide-react';
import { statsService } from '../../services/statsService';
import './StatsSection.css';

const StatsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [counters, setCounters] = useState({
        vehicles: 0,
        workshops: 0,
        customers: 0,
        technicians: 0
    });
    const [stats, setStats] = useState([
        {
            id: 'vehicles',
            icon: <Car size={32} />,
            finalNumber: 900,
            label: 'VEHICLES REPAIRED',
            suffix: '+',
            color: '#F59E0B'
        },
        {
            id: 'workshops',
            icon: <Building2 size={32} />,
            finalNumber: 45,
            label: 'WORKSHOP NETWORK',
            suffix: '+',
            color: '#EF4444'
        },
        {
            id: 'customers',
            icon: <Users size={32} />,
            finalNumber: 680,
            label: 'HAPPY CUSTOMERS',
            suffix: '+',
            color: '#F59E0B'
        },
        {
            id: 'technicians',
            icon: <UserCheck size={32} />,
            finalNumber: 27,
            label: 'EXPERT TECHNICIANS',
            suffix: '+',
            color: '#06B6D4'
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const sectionRef = useRef(null);

    // Load stats from API
    useEffect(() => {
        const loadStats = async () => {
            setIsLoading(true);
            try {
                const apiStats = await statsService.getStats();
                
                // Update stats with API data
                setStats(prevStats => prevStats.map(stat => {
                    switch (stat.id) {
                        case 'vehicles':
                            return { ...stat, finalNumber: apiStats.vehiclesRepaired || stat.finalNumber };
                        case 'workshops':
                            return { ...stat, finalNumber: apiStats.workshops || stat.finalNumber };
                        case 'customers':
                            return { ...stat, finalNumber: apiStats.customers || stat.finalNumber };
                        case 'technicians':
                            return { ...stat, finalNumber: apiStats.technicians || stat.finalNumber };
                        default:
                            return stat;
                    }
                }));
            } catch (error) {
                console.log('Using default stats due to API error:', error);
                // Keep default values on error
            } finally {
                setIsLoading(false);
            }
        };

        loadStats();
    }, []);

    // Intersection Observer to trigger animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.3
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Counter animation
    useEffect(() => {
        if (!isVisible) return;

        const animateCounters = () => {
            stats.forEach((stat) => {
                let startTimestamp = null;
                const duration = 2000;

                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

                    const currentCount = Math.floor(progress * stat.finalNumber);

                    setCounters(prev => ({
                        ...prev,
                        [stat.id]: currentCount
                    }));

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    }
                };

                requestAnimationFrame(step);
            });
        };

        const timer = setTimeout(animateCounters, 300);
        return () => clearTimeout(timer);
    }, [isVisible]);

    return (
        <section className="stats-section" ref={sectionRef}>
            <div className="stats-container">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.id}
                            className={`stat-item ${isVisible ? 'animate' : ''}`}
                            style={{ '--delay': `${index * 0.2}s` }}
                        >
                            <div className="stat-icon-wrapper">
                                <div
                                    className="stat-icon"
                                    style={{ '--icon-color': stat.color }}
                                >
                                    {stat.icon}
                                </div>
                            </div>

                            <div className="stat-content">
                                <div className="stat-number">
                                    {counters[stat.id]}{stat.suffix}
                                </div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Angular bottom shape */}
            <div className="stats-shape">
                <svg
                    viewBox="0 0 1200 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shape-svg"
                >
                    <path
                        d="M0 0L1200 0L1200 60L0 100V0Z"
                        fill="url(#statsGradient)"
                    />
                    <defs>
                        <linearGradient id="statsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0F4C75" />
                            <stop offset="50%" stopColor="#2563EB" />
                            <stop offset="100%" stopColor="#0F4C75" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </section>
    );
};

export default StatsSection;