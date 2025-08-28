import React from 'react';
import './VendorsTable.css';

const VendorsTable = () => {
    const vendedoresData = [
        { id: 1, nombre: 'Juan Pérez', telefono: '555-0101', email: 'juan@empresa.com', activo: true, cotizaciones: 12, aprobadas: 8, rechazadas: 4, clientes: 15, ventasTotal: 125000 },
        { id: 2, nombre: 'María García', telefono: '555-0102', email: 'maria@empresa.com', activo: true, cotizaciones: 9, aprobadas: 6, rechazadas: 3, clientes: 12, ventasTotal: 98000 },
        { id: 3, nombre: 'Carlos López', telefono: '555-0103', email: 'carlos@empresa.com', activo: true, cotizaciones: 15, aprobadas: 10, rechazadas: 5, clientes: 20, ventasTotal: 187000 },
        { id: 4, nombre: 'Ana Martínez', telefono: '555-0104', email: 'ana@empresa.com', activo: true, cotizaciones: 8, aprobadas: 5, rechazadas: 3, clientes: 10, ventasTotal: 76000 },
        { id: 5, nombre: 'Luis Rodríguez', telefono: '555-0105', email: 'luis@empresa.com', activo: false, cotizaciones: 6, aprobadas: 2, rechazadas: 4, clientes: 8, ventasTotal: 32000 },
        { id: 6, nombre: 'Elena Sánchez', telefono: '555-0106', email: 'elena@empresa.com', activo: true, cotizaciones: 11, aprobadas: 7, rechazadas: 4, clientes: 14, ventasTotal: 110000 },
        { id: 7, nombre: 'Roberto Torres', telefono: '555-0107', email: 'roberto@empresa.com', activo: true, cotizaciones: 13, aprobadas: 9, rechazadas: 4, clientes: 18, ventasTotal: 156000 },
        { id: 8, nombre: 'Carmen Flores', telefono: '555-0108', email: 'carmen@empresa.com', activo: true, cotizaciones: 10, aprobadas: 6, rechazadas: 4, clientes: 13, ventasTotal: 92000 },
        { id: 9, nombre: 'Diego Herrera', telefono: '555-0109', email: 'diego@empresa.com', activo: false, cotizaciones: 7, aprobadas: 3, rechazadas: 4, clientes: 9, ventasTotal: 45000 },
        { id: 10, nombre: 'Patricia Vega', telefono: '555-0110', email: 'patricia@empresa.com', activo: true, cotizaciones: 14, aprobadas: 11, rechazadas: 3, clientes: 22, ventasTotal: 198000 }
    ];

    // Calcular estadísticas
    const totales = {
        cotizaciones: vendedoresData.reduce((sum, v) => sum + v.cotizaciones, 0),
        aprobadas: vendedoresData.reduce((sum, v) => sum + v.aprobadas, 0),
        rechazadas: vendedoresData.reduce((sum, v) => sum + v.rechazadas, 0),
        clientes: vendedoresData.reduce((sum, v) => sum + v.clientes, 0),
        ventasTotal: vendedoresData.reduce((sum, v) => sum + v.ventasTotal, 0)
    };

    const calcularPorcentajeExito = (aprobadas, cotizaciones) => {
        return cotizaciones > 0 ? ((aprobadas / cotizaciones) * 100).toFixed(1) : 0;
    };

    return (
        <div className="vendors-table-container">
            <div className="vendors-header">
                <div className="header-content">
                    <h2 className="vendors-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        Control de Vendedores
                    </h2>
                    <p className="vendors-subtitle">Resumen del desempeño del equipo de ventas</p>
                </div>
                
                <div className="vendors-summary">
                    <div className="summary-item">
                        <span className="summary-number">{vendedoresData.length}</span>
                        <span className="summary-label">Vendedores</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-number">{totales.cotizaciones}</span>
                        <span className="summary-label">Cotizaciones</span>
                    </div>
                    <div className="summary-item success">
                        <span className="summary-number">{totales.aprobadas}</span>
                        <span className="summary-label">Aprobadas</span>
                    </div>
                    <div className="summary-item primary">
                        <span className="summary-number">${totales.ventasTotal.toLocaleString()}</span>
                        <span className="summary-label">Ventas Total</span>
                    </div>
                </div>
            </div>

            <div className="vendors-table-wrapper">
                <table className="vendors-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Contacto</th>
                            <th>Estado</th>
                            <th>Cotizaciones</th>
                            <th>Aprobadas</th>
                            <th>% Éxito</th>
                            <th>Ventas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendedoresData.map((vendedor) => (
                            <tr key={vendedor.id} className={!vendedor.activo ? 'inactive-row' : ''}>
                                <td className="id-cell">{vendedor.id}</td>
                                <td className="name-cell">
                                    <div className="vendor-info">
                                        <span className="vendor-name">{vendedor.nombre}</span>
                                        <span className="vendor-email">{vendedor.email}</span>
                                    </div>
                                </td>
                                <td className="contact-cell">{vendedor.telefono}</td>
                                <td className="status-cell">
                                    <span className={`status-badge ${vendedor.activo ? 'active' : 'inactive'}`}>
                                        {vendedor.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className="number-cell">{vendedor.cotizaciones}</td>
                                <td className="number-cell success">{vendedor.aprobadas}</td>
                                <td className="percentage-cell">
                                    <span className="percentage-value">
                                        {calcularPorcentajeExito(vendedor.aprobadas, vendedor.cotizaciones)}%
                                    </span>
                                </td>
                                <td className="money-cell">
                                    ${vendedor.ventasTotal.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VendorsTable;
