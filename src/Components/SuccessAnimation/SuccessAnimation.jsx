import React, { useEffect } from 'react';
import './SuccessAnimation.css';

const SuccessAnimation = ({ isVisible, title, message, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            // Create confetti effect
            createConfetti();
        }
    }, [isVisible]);

    const createConfetti = () => {
        const colors = ['#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#8B5CF6'];
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
            confettiContainer.appendChild(confetti);
        }

        // Remove confetti after 5 seconds
        setTimeout(() => {
            if (document.body.contains(confettiContainer)) {
                document.body.removeChild(confettiContainer);
            }
        }, 5000);
    };

    if (!isVisible) return null;

    return (
        <div className="success-overlay" onClick={onClose}>
            <div className="success-modal" onClick={(e) => e.stopPropagation()}>
                <div className="success-animation">
                    <div className="success-checkmark">
                        <div className="check-icon">
                            <span className="icon-line line-tip"></span>
                            <span className="icon-line line-long"></span>
                            <div className="icon-circle"></div>
                            <div className="icon-fix"></div>
                        </div>
                    </div>
                    <div className="success-content">
                        <h2 className="success-title">{title}</h2>
                        <p className="success-message">{message}</p>
                        <button className="success-button" onClick={onClose}>
                            ¡Genial!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessAnimation;
