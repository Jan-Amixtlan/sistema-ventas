import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Simulación de usuarios (en producción esto vendría de una base de datos)
    const users = [
        {
            id: 1,
            email: 'admin@empresa.com',
            password: 'admin123',
            role: 'admin',
            name: 'Administrador',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        },
        {
            id: 2,
            email: 'vendedor@empresa.com',
            password: 'vendedor123',
            role: 'vendedor',
            name: 'Juan Pérez',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
        }
    ];

    // Verificar si hay una sesión guardada al cargar la aplicación
    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error al cargar usuario guardado:', error);
                localStorage.removeItem('currentUser');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        setIsLoading(true);
        
        // Simulación de API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const foundUser = users.find(u => u.email === email && u.password === password);
                
                if (foundUser) {
                    const userWithoutPassword = { ...foundUser };
                    delete userWithoutPassword.password;
                    
                    setUser(userWithoutPassword);
                    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
                    setIsLoading(false);
                    resolve(userWithoutPassword);
                } else {
                    setIsLoading(false);
                    reject(new Error('Email o contraseña incorrectos'));
                }
            }, 1500);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    const isAdmin = () => {
        return user && user.role === 'admin';
    };

    const isAuthenticated = () => {
        return !!user;
    };

    const value = {
        user,
        login,
        logout,
        isAdmin,
        isAuthenticated,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
