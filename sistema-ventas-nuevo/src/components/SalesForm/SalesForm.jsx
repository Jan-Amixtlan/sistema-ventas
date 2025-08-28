import React, { useState, useEffect } from 'react';
import './SalesForm.css';

const SalesForm = ({ isOpen, onClose, onSave, vendors }) => {
    const [formData, setFormData] = useState({
        vendorId: '',
        clientName: '',
        product: '',
        amount: '',
        commission: '',
        saleDate: new Date().toISOString().split('T')[0],
        status: 'completada',
        notes: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const productos = [
        'Software CRM',
        'Licencias Microsoft',
        'Hosting Web',
        'Desarrollo Web',
        'Consultoría IT',
        'Soporte Técnico',
        'Marketing Digital',
        'E-commerce',
        'Capacitación',
        'Otros'
    ];

    useEffect(() => {
        if (isOpen) {
            // Reset form when modal opens
            setFormData({
                vendorId: '',
                clientName: '',
                product: '',
                amount: '',
                commission: '',
                saleDate: new Date().toISOString().split('T')[0],
                status: 'completada',
                notes: ''
            });
            setError('');
        }
    }, [isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Auto-calculate commission (10% by default)
        if (name === 'amount' && value) {
            const amount = parseFloat(value);
            if (!isNaN(amount)) {
                setFormData(prev => ({
                    ...prev,
                    amount: value,
                    commission: (amount * 0.1).toFixed(2)
                }));
            }
        }
        
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validation
        if (!formData.vendorId || !formData.clientName || !formData.product || !formData.amount) {
            setError('Por favor, complete todos los campos obligatorios');
            setIsLoading(false);
            return;
        }

        const amount = parseFloat(formData.amount);
        if (isNaN(amount) || amount <= 0) {
            setError('El monto debe ser un número válido mayor a 0');
            setIsLoading(false);
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const saleData = {
                ...formData,
                id: Date.now(),
                amount: parseFloat(formData.amount),
                commission: parseFloat(formData.commission),
                createdAt: new Date().toISOString()
            };

            onSave(saleData);
            onClose();
        } catch (err) {
            setError('Error al registrar la venta. Intente nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="sales-form-overlay" onClick={handleOverlayClick}>
            <div className="sales-form-modal">
                <div className="sales-form-header">
                    <h2>Registrar Nueva Venta</h2>
                    <button 
                        className="close-button" 
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="sales-form-body">
                    <div className="form-grid">
                        {/* Vendedor */}
                        <div className="form-group">
                            <label htmlFor="vendorId">Vendedor *</label>
                            <select
                                id="vendorId"
                                name="vendorId"
                                value={formData.vendorId}
                                onChange={handleInputChange}
                                required
                                disabled={isLoading}
                            >
                                <option value="">Seleccione un vendedor</option>
                                {vendors.map(vendor => (
                                    <option key={vendor.id} value={vendor.id}>
                                        {vendor.name} - {vendor.region}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Cliente */}
                        <div className="form-group">
                            <label htmlFor="clientName">Nombre del Cliente *</label>
                            <input
                                type="text"
                                id="clientName"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleInputChange}
                                placeholder="Ej: Empresa ABC S.A."
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Producto */}
                        <div className="form-group">
                            <label htmlFor="product">Producto/Servicio *</label>
                            <select
                                id="product"
                                name="product"
                                value={formData.product}
                                onChange={handleInputChange}
                                required
                                disabled={isLoading}
                            >
                                <option value="">Seleccione un producto</option>
                                {productos.map(producto => (
                                    <option key={producto} value={producto}>
                                        {producto}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Monto */}
                        <div className="form-group">
                            <label htmlFor="amount">Monto de la Venta *</label>
                            <div className="input-with-currency">
                                <span className="currency-symbol">$</span>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Comisión */}
                        <div className="form-group">
                            <label htmlFor="commission">Comisión (10%)</label>
                            <div className="input-with-currency">
                                <span className="currency-symbol">$</span>
                                <input
                                    type="number"
                                    id="commission"
                                    name="commission"
                                    value={formData.commission}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    disabled={isLoading}
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Fecha */}
                        <div className="form-group">
                            <label htmlFor="saleDate">Fecha de la Venta</label>
                            <input
                                type="date"
                                id="saleDate"
                                name="saleDate"
                                value={formData.saleDate}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Estado */}
                        <div className="form-group">
                            <label htmlFor="status">Estado</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            >
                                <option value="completada">Completada</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="cancelada">Cancelada</option>
                            </select>
                        </div>

                        {/* Notas */}
                        <div className="form-group full-width">
                            <label htmlFor="notes">Notas Adicionales</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                placeholder="Información adicional sobre la venta..."
                                rows="3"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="error-message">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                            {error}
                        </div>
                    )}

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="btn btn-cancel"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="loading-spinner"></div>
                                    Registrando...
                                </>
                            ) : (
                                <>
                                    
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SalesForm;
