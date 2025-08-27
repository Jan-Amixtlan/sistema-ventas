import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const testimonials = [
        {
            id: 1,
            title: "Satisfied With The Workshop Facilities At Cardan Auto Repair Workshop",
            text: "At dolore magna aliqua unt enim ad mini veniam quis ulamco aliquip commodo da consequat duis aute irue derit voluptate cillum dolore afugiat.",
            name: "Donald H. James",
            role: "Car Owner Repair",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
            rating: 5
        },
        {
            id: 2,
            title: "Satisfied With The Workshop Facilities At Cardan Auto Repair Workshop",
            text: "At dolore magna aliqua unt enim ad mini veniam quis ulamco aliquip commodo da consequat duis aute irue derit voluptate cillum dolore afugiat.",
            name: "Donald H. James",
            role: "Car Owner Repair",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
            rating: 5
        },
        {
            id: 3,
            title: "Professional Service and Excellent Customer Support Experience",
            text: "At dolore magna aliqua unt enim ad mini veniam quis ulamco aliquip commodo da consequat duis aute irue derit voluptate cillum dolore afugiat.",
            name: "Sarah M. Wilson",
            role: "Car Owner Repair",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
            rating: 5
        },
        {
            id: 4,
            title: "Professional Service and Excellent Customer Support Experience",
            text: "At dolore magna aliqua unt enim ad mini veniam quis ulamco aliquip commodo da consequat duis aute irue derit voluptate cillum dolore afugiat.",
            name: "Sarah M. Wilson",
            role: "Car Owner Repair",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
            rating: 5
        }
    ];

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 2));
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, testimonials.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 2));
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + Math.ceil(testimonials.length / 2)) % Math.ceil(testimonials.length / 2));
        setIsAutoPlaying(false);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    const getCurrentTestimonials = () => {
        const startIndex = currentSlide * 2;
        return testimonials.slice(startIndex, startIndex + 2);
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                size={16}
                className={`star ${index < rating ? 'filled' : ''}`}
                fill={index < rating ? '#F59E0B' : 'none'}
                stroke={index < rating ? '#F59E0B' : '#D1D5DB'}
            />
        ));
    };

    return (
        <section className="testimonials-section">
            <div className="testimonials-container">

                {/* Header */}
                <div className="testimonials-header">
                    <span className="section-subtitle">We Promise You To Give Best Repair Services</span>
                    <h2 className="section-title">Nicest Words From Customers</h2>
                    <div className="title-divider"></div>
                </div>

                {/* Testimonials */}
                <div className="testimonials-wrapper">
                    <div className="testimonials-grid">
                        {getCurrentTestimonials().map((testimonial) => (
                            <div key={testimonial.id} className="testimonial-card">
                                <div className="testimonial-content">
                                    <h3 className="testimonial-title">{testimonial.title}</h3>
                                    <p className="testimonial-text">{testimonial.text}</p>

                                    <div className="testimonial-author">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="author-avatar"
                                        />
                                        <div className="author-info">
                                            <h4 className="author-name">{testimonial.name}</h4>
                                            <span className="author-role">{testimonial.role}</span>
                                            <div className="rating">
                                                {renderStars(testimonial.rating)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="testimonials-navigation">
                    <button className="nav-btn prev-btn" onClick={prevSlide}>
                        <ChevronLeft size={20} />
                    </button>

                    <div className="slide-indicators">
                        {[...Array(Math.ceil(testimonials.length / 2))].map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${currentSlide === index ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>

                    <button className="nav-btn next-btn" onClick={nextSlide}>
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;