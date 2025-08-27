import React, { createContext, useContext, useState, useEffect } from 'react';
import { servicesService } from '../services/servicesService';

const ServicesContext = createContext();

export const useServices = () => {
    const context = useContext(ServicesContext);
    if (!context) {
        throw new Error('useServices must be used within a ServicesProvider');
    }
    return context;
};

export const ServicesProvider = ({ children }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchServices = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await servicesService.getServices();
            setServices(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching services:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const value = {
        services,
        loading,
        error,
        refetchServices: fetchServices
    };

    return (
        <ServicesContext.Provider value={value}>
            {children}
        </ServicesContext.Provider>
    );
};
