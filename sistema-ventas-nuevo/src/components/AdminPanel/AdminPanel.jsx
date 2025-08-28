import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import VendorManagement from '../VendorManagement/VendorManagement';
import SalesDashboard from '../SalesDashboard/SalesDashboard';
import SalesControl from '../SalesControl/SalesControl';    
import EditableTable from '../EditableTable/EditableTable';
import './AdminPanel.css';

const AdminPanel = () => {
    
    const { isAuthenticated, isAdmin } = useAuth();
    const [currentView, setCurrentView] = useState('dashboard');

    if (!isAuthenticated()) {
        return (
            <div className="access-required">
                <h2>Acceso Requerido</h2>
                <p>Debes iniciar sesión para acceder al panel administrativo.</p>
            </div>
        );
    }

    if (!isAdmin()) {
        return (
            <div className="access-denied">
                <h2>Acceso Denegado</h2>
                <p>No tienes permisos de administrador para acceder a esta sección.</p>
            </div>
        );
    }

    const renderCurrentView = () => {
        switch (currentView) {
            case 'dashboard':
                return <SalesDashboard />;
            case 'vendors':
                return <VendorManagement />;
            case 'salesControl':
                return <SalesControl />;
            case 'reports':
                return <ReportsView />;
            case 'settings':
                return <SettingsView />;
            case 'table':
                return <EditableTable />;   
            default:
                return <SalesDashboard />;
        }
    };

    return (
        <div className="admin-panel">
            <AdminNavbar 
                currentView={currentView}
                onViewChange={setCurrentView}
            />
            <div className="admin-content">
                {renderCurrentView()}
            </div>
        </div>
    );
};

// Componente placeholder para Reportes
const ReportsView = () => {
    return (
        <div className="placeholder-view">
            <div className="placeholder-content">
                <div className="placeholder-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                </div>
                <h2>Reportes Avanzados</h2>
                <p>Análisis detallados de ventas, rendimiento y métricas clave próximamente disponibles.</p>
                
                <div className="coming-soon-features">
                    <div className="feature-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                            <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                        </svg>
                        <span>Reportes de Ventas por Período</span>
                    </div>
                    <div className="feature-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        </svg>
                        <span>Análisis de Rendimiento Individual</span>
                    </div>
                    <div className="feature-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        <span>Proyecciones Financieras</span>
                    </div>
                    <div className="feature-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-.448 1 1 1 1-.448-1-1-1-1 1 1zM3 12c.552 0 1-.448 1-1s-.448-1-1-1-.448 1 1 1 1-.448-1-1-1-1 1 1zM12 21c.552 0 1-.448 1-1s-.448-1-1-1-.448 1 1 1 1-.448-1-1-1-1 1 1zM12 3c.552 0 1-.448 1-1s-.448-1-1-1-.448 1 1 1 1-.448-1-1-1-1 1 1z"></path>
                        </svg>
                        <span>Comparativas Regionales</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Componente placeholder para Configuración
const SettingsView = () => {
    return (
        <div className="placeholder-view">
            <div className="placeholder-content">
                <div className="placeholder-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                </div>
                <h2>Configuración del Sistema</h2>
                <p>Personaliza y configura los parámetros del sistema según tus necesidades.</p>
                
                <div className="coming-soon-features">
                    <div className="feature-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <path d="M20 8v6M23 11h-6"></path>
                        </svg>
                        <span>Gestión de Usuarios</span>
                    </div>
                    <div className="feature-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <circle cx="12" cy="16" r="1"></circle>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span>Configuración de Seguridad</span>
                    </div>
                    <div className="feature-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14,2 14,8 20,8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10,9 9,9 8,9"></polyline>
                        </svg>
                        <span>Respaldos y Exportación</span>
                    </div>
                    <div className="feature-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
                        </svg>
                        <span>Métricas del Sistema</span>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

<SalesControl />


export default AdminPanel;
