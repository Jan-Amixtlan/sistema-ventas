import React, { useState, useEffect } from 'react';
import './NotificationSystem.css';

const NotificationSystem = ({ notifications, removeNotification }) => {
    if (!notifications || notifications.length === 0) {
        return null;
    }

    return (
        <div className="notification-container">
            {notifications.map((notification) => (
                <Notification
                    key={notification.id}
                    notification={notification}
                    onRemove={removeNotification}
                />
            ))}
        </div>
    );
};

const Notification = ({ notification, onRemove }) => {
    const { id, type, title, message, duration = 5000 } = notification;

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onRemove(id);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [id, duration, onRemove]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            case 'warning':
                return '⚠️';
            case 'info':
                return 'ℹ️';
            default:
                return '✅';
        }
    };

    return (
        <div className={`notification notification--${type}`}>
            <div className="notification__content">
                <div className="notification__icon">
                    {getIcon()}
                </div>
                <div className="notification__text">
                    <div className="notification__title">{title}</div>
                    <div className="notification__message">{message}</div>
                </div>
                <button 
                    className="notification__close"
                    onClick={() => onRemove(id)}
                    aria-label="Close notification"
                >
                    ×
                </button>
            </div>
            <div className="notification__progress"></div>
        </div>
    );
};

export default NotificationSystem;
