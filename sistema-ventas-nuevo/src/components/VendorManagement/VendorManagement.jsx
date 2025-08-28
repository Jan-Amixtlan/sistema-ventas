import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './VendorManagement.css';

const VendorManagement = () => {
    const { user, isAdmin } = useAuth();
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingVendor, setEditingVendor] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    // Datos de ejemplo de vendedores
    const initialVendors = [
        {
            id: 1,
            name: 'María Rodríguez',
            email: 'maria.rodriguez@empresa.com',
            phone: '+1 (555) 123-4567',
            ventas: 42000,
            region: 'Norte',
            fechaIngreso: '2023-01-15',
            status: 'activo',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b887?w=150'
        },
        {
            id: 2,
            name: 'Teresa Nazario',
            email: 'teresa.nazario@empresa.com',
            phone: '+1 (555) 234-5678',
            ventas: 41500,
            region: 'Sur',
            fechaIngreso: '2022-11-20',
            status: 'activo',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
        },
        {
            id: 3,
            name: 'Elena Torres',
            email: 'elena.torres@empresa.com',
            phone: '+1 (555) 345-6789',
            ventas: 40800,
            region: 'Este',
            fechaIngreso: '2023-03-10',
            status: 'activo',
            avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150'
        },
        {
            id: 4,
            name: 'Ricardo Jiménez',
            email: 'ricardo.jimenez@empresa.com',
            phone: '+1 (555) 456-7890',
            ventas: 39200,
            region: 'Oeste',
            fechaIngreso: '2022-08-05',
            status: 'inactivo',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        },
        {
            id: 5,
            name: 'Laura Ramírez',
            email: 'laura.ramirez@empresa.com',
            phone: '+1 (555) 567-8901',
            ventas: 38700,
            region: 'Centro',
            fechaIngreso: '2023-02-28',
            status: 'activo',
            avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150'
        }
    ];

    useEffect(() => {
        // Simular carga de datos
        setTimeout(() => {
            setVendors(initialVendors);
            setLoading(false);
        }, 1000);
    }, []);

    const handleEdit = (vendor) => {
        setEditingVendor({ ...vendor });
    };

    const handleSave = () => {
        setVendors(vendors.map(v => 
            v.id === editingVendor.id ? editingVendor : v
        ));
        setEditingVendor(null);
    };

    const handleCancel = () => {
        setEditingVendor(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este vendedor?')) {
            setVendors(vendors.filter(v => v.id !== id));
        }
    };

    const handleDownloadCSV = () => {
        const csvContent = [
            ['Nombre', 'Email', 'Teléfono', 'Ventas', 'Región', 'Fecha Ingreso', 'Estado'],
            ...vendors.map(v => [
                v.name,
                v.email,
                v.phone,
                v.ventas,
                v.region,
                v.fechaIngreso,
                v.status
            ])
        ].map(row => row.join(',')).join('\\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'vendedores.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleAddVendor = (newVendor) => {
        const vendor = {
            ...newVendor,
            id: Math.max(...vendors.map(v => v.id)) + 1,
            ventas: 0,
            fechaIngreso: new Date().toISOString().split('T')[0]
        };
        setVendors([...vendors, vendor]);
        setShowAddForm(false);
    };

    if (!isAdmin()) {
        return (
            <div className="access-denied">
                <h2>Acceso Denegado</h2>
                <p>No tienes permisos para acceder a esta sección.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Cargando vendedores...</p>
            </div>
        );
    }

    return (
        <div className="vendor-management">
            <div className="management-header">
                <div className="header-info">
                    <h1>Gestión de Vendedores</h1>
                    <p>Administra tu equipo de ventas</p>
                </div>
                <div className="header-actions">
                    <button 
                        className="btn btn-secondary"
                        onClick={handleDownloadCSV}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7,10 12,15 17,10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Descargar CSV
                    </button>
                    <button 
                        className="btn btn-primary"
                        onClick={() => setShowAddForm(true)}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Agregar Vendedor
                    </button>
                </div>
            </div>

            <div className="vendors-grid">
                {vendors.map(vendor => (
                    <div key={vendor.id} className={`vendor-card ${vendor.status}`}>
                        <div className="vendor-avatar">
                            <img src={vendor.avatar} alt={vendor.name} />
                            <div className={`status-badge ${vendor.status}`}>
                                {vendor.status === 'activo' ? 'Activo' : 'Inactivo'}
                            </div>
                        </div>

                        <div className="vendor-info">
                            <h3>{vendor.name}</h3>
                            <p className="vendor-email">{vendor.email}</p>
                            <p className="vendor-phone">{vendor.phone}</p>
                            
                            <div className="vendor-stats">
                                <div className="stat">
                                    <span className="stat-label">Ventas</span>
                                    <span className="stat-value">${vendor.ventas.toLocaleString()}</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Región</span>
                                    <span className="stat-value">{vendor.region}</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Ingreso</span>
                                    <span className="stat-value">{new Date(vendor.fechaIngreso).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="vendor-actions">
                            <button 
                                className="action-btn edit"
                                onClick={() => handleEdit(vendor)}
                                title="Editar"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                            <button 
                                className="action-btn delete"
                                onClick={() => handleDelete(vendor.id)}
                                title="Eliminar"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="3,6 5,6 21,6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Edición */}
            {editingVendor && (
                <EditVendorModal
                    vendor={editingVendor}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onChange={setEditingVendor}
                />
            )}

            {/* Modal de Agregar */}
            {showAddForm && (
                <AddVendorModal
                    onAdd={handleAddVendor}
                    onCancel={() => setShowAddForm(false)}
                />
            )}
        </div>
    );
};

// Modal para editar vendedor
const EditVendorModal = ({ vendor, onSave, onCancel, onChange }) => {
    const handleInputChange = (field, value) => {
        onChange({ ...vendor, [field]: value });
    };

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Editar Vendedor</h2>
                    <button className="close-btn" onClick={onCancel}>×</button>
                </div>
                
                <div className="modal-body">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input
                                type="text"
                                value={vendor.name}
                                onChange={e => handleInputChange('name', e.target.value)}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={vendor.email}
                                onChange={e => handleInputChange('email', e.target.value)}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Teléfono</label>
                            <input
                                type="tel"
                                value={vendor.phone}
                                onChange={e => handleInputChange('phone', e.target.value)}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Región</label>
                            <select
                                value={vendor.region}
                                onChange={e => handleInputChange('region', e.target.value)}
                            >
                                <option value="Norte">Norte</option>
                                <option value="Sur">Sur</option>
                                <option value="Este">Este</option>
                                <option value="Oeste">Oeste</option>
                                <option value="Centro">Centro</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label>Estado</label>
                            <select
                                value={vendor.status}
                                onChange={e => handleInputChange('status', e.target.value)}
                            >
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={onSave}>
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
};

// Modal para agregar vendedor
const AddVendorModal = ({ onAdd, onCancel }) => {
    const [newVendor, setNewVendor] = useState({
        name: '',
        email: '',
        phone: '',
        region: 'Norte',
        status: 'activo',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newVendor.name && newVendor.email && newVendor.phone) {
            onAdd(newVendor);
        }
    };

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Agregar Vendedor</h2>
                    <button className="close-btn" onClick={onCancel}>×</button>
                </div>
                
                <form onSubmit={handleSubmit} className="modal-body">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Nombre *</label>
                            <input
                                type="text"
                                value={newVendor.name}
                                onChange={e => setNewVendor({...newVendor, name: e.target.value})}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                value={newVendor.email}
                                onChange={e => setNewVendor({...newVendor, email: e.target.value})}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Teléfono *</label>
                            <input
                                type="tel"
                                value={newVendor.phone}
                                onChange={e => setNewVendor({...newVendor, phone: e.target.value})}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Región</label>
                            <select
                                value={newVendor.region}
                                onChange={e => setNewVendor({...newVendor, region: e.target.value})}
                            >
                                <option value="Norte">Norte</option>
                                <option value="Sur">Sur</option>
                                <option value="Este">Este</option>
                                <option value="Oeste">Oeste</option>
                                <option value="Centro">Centro</option>
                            </select>
                        </div>
                    </div>
                </form>
                
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                        Agregar Vendedor
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorManagement;
