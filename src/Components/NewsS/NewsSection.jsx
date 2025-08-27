
import React, { useState } from 'react';
import './NewsSection.css';

const NewsSection = () => {
    const newsArticles = [
        {
            id: 1,
            category: "AUTO REPAIR",
            image: "https://pro-theme.com/html/cardan/assets/img/blog-1.jpg",
            title: "Generator Components Which You Should Know",
            excerpt: "Magna aliqua umt enimd mini venia quis ulamco aliquip commodo cons equat duis aute irue derit...",
            author: "Smith Henry",
            date: "January 31, 2021"
        },
        {
            id: 2,
            category: "MAINTENANCE",
            image: "https://pro-theme.com/html/cardan/assets/img/blog-2.jpg",
            title: "We Do Auto Repair And Inspection Commitment",
            excerpt: "Magna aliqua umt enimd mini venia quis ulamco aliquip commodo cons equat duis aute irue derit...",
            author: "Smith Henry",
            date: "January 31, 2021"
        },
        {
            id: 3,
            category: "CAR ENGINE",
            image: "https://pro-theme.com/html/cardan/assets/img/blog-3.jpg",
            title: "Inadequate Engine Oil Will Cause Damage The Parts",
            excerpt: "Magna aliqua umt enimd mini venia quis ulamco aliquip commodo cons equat duis aute irue derit...",
            author: "Smith Henry",
            date: "January 31, 2021"
        }
    ];

    // Estado para carrusel móvil
    const [current, setCurrent] = useState(0);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 480;
    const handlePrev = () => setCurrent((prev) => (prev - 1 + newsArticles.length) % newsArticles.length);
    const handleNext = () => setCurrent((prev) => (prev + 1) % newsArticles.length);

    return (
        <section className="news-section">
            <div className="container">
                {/* Header */}
                <div className="header">
                    <div className="header-content">
                        <div className="badge">CARDAN IS LEADER IN AUTO REPAIR</div>
                        <h2 className="title">OUR RECENT PROJECTS</h2>
                        <div className="decorative-line"></div>
                    </div>

                    <button className="read-more-btn">
                        READ MORE NEWS →
                    </button>
                </div>

                {/* Carrusel en móvil, grid en desktop */}
                <div className={isMobile ? "news-carousel" : "news-grid"}>
                    {isMobile ? (
                        <>
                            <article key={newsArticles[current].id} className="news-card">
                                <div className="card-image">
                                    <img
                                        src={newsArticles[current].image}
                                        alt={newsArticles[current].title}
                                    />
                                    <div className="category-badge">
                                        {newsArticles[current].category}
                                    </div>
                                </div>
                                <div className="card-content">
                                    <div className="meta-info">
                                        <span className="date">{newsArticles[current].date}</span>
                                        <span className="author">
                                            By <span className="author-name">{newsArticles[current].author}</span>
                                        </span>
                                    </div>
                                    <h3 className="card-title">{newsArticles[current].title}</h3>
                                    <p className="excerpt">{newsArticles[current].excerpt}</p>
                                    <button className="card-read-more">
                                        READ MORE →
                                    </button>
                                </div>
                            </article>
                            <div className="news-carousel-nav">
                                <button className="carousel-btn" onClick={handlePrev}>&lt;</button>
                                <div className="carousel-indicators">
                                    {newsArticles.map((_, idx) => (
                                        <span key={idx} className={current === idx ? "carousel-indicator active" : "carousel-indicator"}></span>
                                    ))}
                                </div>
                                <button className="carousel-btn" onClick={handleNext}>&gt;</button>
                            </div>
                        </>
                    ) : (
                        newsArticles.map((article) => (
                            <article key={article.id} className="news-card">
                                <div className="card-image">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                    />
                                    <div className="category-badge">
                                        {article.category}
                                    </div>
                                </div>
                                <div className="card-content">
                                    <div className="meta-info">
                                        <span className="date">{article.date}</span>
                                        <span className="author">
                                            By <span className="author-name">{article.author}</span>
                                        </span>
                                    </div>
                                    <h3 className="card-title">{article.title}</h3>
                                    <p className="excerpt">{article.excerpt}</p>
                                    <button className="card-read-more">
                                        READ MORE →
                                    </button>
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default NewsSection;