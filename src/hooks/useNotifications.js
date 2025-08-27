import { useState, useCallback } from 'react';

export const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((notification) => {
        const id = Date.now() + Math.random();
        const newNotification = {
            id,
            type: 'info',
            title: 'Notification',
            message: 'Something happened',
            duration: 5000,
            ...notification
        };

        setNotifications(prev => [...prev, newNotification]);
        return id;
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, []);

    const clearAllNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    // Convenience methods
    const showSuccess = useCallback((title, message, duration) => {
        return addNotification({
            type: 'success',
            title,
            message,
            duration
        });
    }, [addNotification]);

    const showError = useCallback((title, message, duration) => {
        return addNotification({
            type: 'error',
            title,
            message,
            duration: duration || 7000 // Errors stay longer
        });
    }, [addNotification]);

    const showWarning = useCallback((title, message, duration) => {
        return addNotification({
            type: 'warning',
            title,
            message,
            duration
        });
    }, [addNotification]);

    const showInfo = useCallback((title, message, duration) => {
        return addNotification({
            type: 'info',
            title,
            message,
            duration
        });
    }, [addNotification]);

    return {
        notifications,
        addNotification,
        removeNotification,
        clearAllNotifications,
        showSuccess,
        showError,
        showWarning,
        showInfo
    };
};
