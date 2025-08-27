import React, { useState } from 'react';
import './ServiceReviews.css';

const ServiceReviews = () => {
    const [expandedReplies, setExpandedReplies] = useState({});
    const [replyForms, setReplyForms] = useState({});
    const [newReplyText, setNewReplyText] = useState({});

    const reviews = [
        {
            id: 1,
            customerName: "Donald James",
            customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 4.5,
            publishedDate: "7 January 2021",
            title: "Satisfied With The Workshop Facilities Cardan Workshop",
            content: "Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis ation ullamco laboris nisi ut aliquip ex ea comodo consequat. Duis aute irur enderit luptate velit es cillum dolore eu fugiat nulla pariatur.",
            replies: [
                {
                    id: 11,
                    replierName: "Sarah James",
                    replierAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop&crop=face",
                    replyToService: "Engine or transmission Mount Replacement",
                    content: "Labore aet dolore magna aliqua. Ut enim adm minim veniam quis ullamco laboris nisi ut aliquip ex eatsc comod consequat. Duis aute irur enderit luptate velit es cillum dolore."
                }
            ]
        },
        {
            id: 2,
            customerName: "Donald James",
            customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 4.5,
            publishedDate: "7 January 2021",
            title: "Satisfied With The Workshop Facilities Cardan Workshop",
            content: "Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis ation ullamco laboris nisi ut aliquip ex ea comodo consequat. Duis aute irur enderit luptate velit es cillum dolore eu fugiat nulla pariatur.",
            replies: []
        }
    ];

    const handleReplyToggle = (reviewId) => {
        setReplyForms(prev => ({
            ...prev,
            [reviewId]: !prev[reviewId]
        }));
    };

    const handleReplySubmit = (reviewId) => {
        const replyText = newReplyText[reviewId];
        if (replyText && replyText.trim()) {
            console.log(`Reply to review ${reviewId}: ${replyText}`);
            setNewReplyText(prev => ({ ...prev, [reviewId]: '' }));
            setReplyForms(prev => ({ ...prev, [reviewId]: false }));
        }
    };

    const handleReplyChange = (reviewId, text) => {
        setNewReplyText(prev => ({ ...prev, [reviewId]: text }));
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="star-rating">
                {[...Array(fullStars)].map((_, index) => (
                    <span key={`full-${index}`} className="star filled">★</span>
                ))}
                {hasHalfStar && <span className="star half-filled">★</span>}
                {[...Array(emptyStars)].map((_, index) => (
                    <span key={`empty-${index}`} className="star empty">☆</span>
                ))}
            </div>
        );
    };

    return (
        <section className="service-reviews">
            <div className="container">
                <div className="reviews-header">
                    <h2 className="reviews-title">Service Reviews</h2>
                    <div className="decorative-line">
                        <div className="line-segment"></div>
                        <div className="line-segment"></div>
                        <div className="line-segment"></div>
                    </div>
                </div>

                <div className="reviews-list">
                    {reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            {/* Main Review */}
                            <div className="review-main">
                                <div className="review-header">
                                    <div className="customer-info">
                                        <img
                                            src={review.customerAvatar}
                                            alt={review.customerName}
                                            className="customer-avatar"
                                        />
                                        <div className="customer-details">
                                            <h3 className="customer-name">{review.customerName}</h3>
                                            <div className="rating-info">
                                                {renderStars(review.rating)}
                                                <span className="rating-text">
                                                    Rating: <strong>{review.rating} / 5.0</strong>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="publish-date">
                                        <span className="date-label">Published</span>
                                        <span className="date-value">{review.publishedDate}</span>
                                    </div>
                                </div>

                                <div className="review-content">
                                    <h4 className="review-title">"{review.title}"</h4>
                                    <p className="review-text">{review.content}</p>
                                </div>

                                <div className="review-actions">
                                    <button
                                        className="reply-button"
                                        onClick={() => handleReplyToggle(review.id)}
                                    >
                                        REPLY ›
                                    </button>
                                </div>

                                {/* Reply Form */}
                                {replyForms[review.id] && (
                                    <div className="reply-form">
                                        <textarea
                                            placeholder="Write your reply..."
                                            value={newReplyText[review.id] || ''}
                                            onChange={(e) => handleReplyChange(review.id, e.target.value)}
                                            className="reply-textarea"
                                            rows="3"
                                        />
                                        <div className="reply-form-actions">
                                            <button
                                                className="submit-reply-button"
                                                onClick={() => handleReplySubmit(review.id)}
                                                disabled={!newReplyText[review.id]?.trim()}
                                            >
                                                Submit Reply
                                            </button>
                                            <button
                                                className="cancel-reply-button"
                                                onClick={() => handleReplyToggle(review.id)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Replies */}
                            {review.replies && review.replies.length > 0 && (
                                <div className="replies-section">
                                    {review.replies.map((reply) => (
                                        <div key={reply.id} className="reply-item">
                                            <div className="reply-header">
                                                <img
                                                    src={reply.replierAvatar}
                                                    alt={reply.replierName}
                                                    className="replier-avatar"
                                                />
                                                <div className="reply-info">
                                                    <h4 className="replier-name">{reply.replierName}</h4>
                                                    <p className="reply-context">
                                                        Reply from <span className="service-reference">"{reply.replyToService}"</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="reply-content">
                                                <p className="reply-text">{reply.content}</p>
                                            </div>

                                            <div className="reply-actions">
                                                <button className="reply-button secondary">
                                                    REPLY ›
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="load-more-section">
                    <button className="load-more-button">
                        Load More Reviews
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ServiceReviews;