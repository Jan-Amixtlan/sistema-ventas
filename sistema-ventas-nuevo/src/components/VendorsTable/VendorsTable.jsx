import React from 'react';
import './VendorsTable.css';

const VendorsTable = () => {
    const vendedoresData = [
        { id: 1, nombre: 'María Rodríguez', telefono: '555-0101', email: 'maria.rodriguez@empresa.com', activo: true, cotizaciones: 12, aprobadas: 7, rechazadas: 5, clientes: 25, ventasTotal: 190000 },
        { id: 2, nombre: 'Teresa Nazario', telefono: '555-0102', email: 'teresa.nazario@empresa.com', activo: true, cotizaciones: 10, aprobadas: 6, rechazadas: 4, clientes: 24, ventasTotal: 175000 },
        { id: 3, nombre: 'Elena Torres', telefono: '555-0103', email: 'elena.torres@empresa.com', activo: true, cotizaciones: 9, aprobadas: 5, rechazadas: 4, clientes: 23, ventasTotal: 165000 },
        { id: 4, nombre: 'Ricardo Jiménez', telefono: '555-0104', email: 'ricardo.jimenez@empresa.com', activo: true, cotizaciones: 8, aprobadas: 5, rechazadas: 3, clientes: 22, ventasTotal: 150000 },
        { id: 5, nombre: 'Laura Ramírez', telefono: '555-0105', email: 'laura.ramirez@empresa.com', activo: true, cotizaciones: 7, aprobadas: 4, rechazadas: 3, clientes: 21, ventasTotal: 140000 },
        { id: 6, nombre: 'Francisco Moreno', telefono: '555-0106', email: 'francisco.moreno@empresa.com', activo: true, cotizaciones: 8, aprobadas: 5, rechazadas: 3, clientes: 20, ventasTotal: 135000 },
        { id: 7, nombre: 'Carmen López', telefono: '555-0107', email: 'carmen.lopez@empresa.com', activo: true, cotizaciones: 9, aprobadas: 5, rechazadas: 4, clientes: 19, ventasTotal: 130000 },
        { id: 8, nombre: 'Sofia García', telefono: '555-0108', email: 'sofia.garcia@empresa.com', activo: true, cotizaciones: 6, aprobadas: 3, rechazadas: 3, clientes: 18, ventasTotal: 125000 },
        { id: 9, nombre: 'Manuel Castro', telefono: '555-0109', email: 'manuel.castro@empresa.com', activo: true, cotizaciones: 7, aprobadas: 4, rechazadas: 3, clientes: 17, ventasTotal: 120000 },
        { id: 10, nombre: 'Jorge Martín', telefono: '555-0110', email: 'jorge.martin@empresa.com', activo: true, cotizaciones: 8, aprobadas: 4, rechazadas: 4, clientes: 16, ventasTotal: 115000 },
        { id: 11, nombre: 'Carlos Méndez', telefono: '555-0111', email: 'carlos.mendez@empresa.com', activo: true, cotizaciones: 7, aprobadas: 4, rechazadas: 3, clientes: 15, ventasTotal: 110000 },
        { id: 12, nombre: 'Manuel Romero', telefono: '555-0112', email: 'manuel.romero@empresa.com', activo: true, cotizaciones: 6, aprobadas: 3, rechazadas: 3, clientes: 14, ventasTotal: 105000 },
        { id: 13, nombre: 'Patricia Gil', telefono: '555-0113', email: 'patricia.gil@empresa.com', activo: true, cotizaciones: 8, aprobadas: 4, rechazadas: 4, clientes: 13, ventasTotal: 100000 },
        { id: 14, nombre: 'Miguel Ángel Ruiz', telefono: '555-0114', email: 'miguel.ruiz@empresa.com', activo: true, cotizaciones: 7, aprobadas: 4, rechazadas: 3, clientes: 12, ventasTotal: 95000 },
        { id: 15, nombre: 'Antonio Molina', telefono: '555-0115', email: 'antonio.molina@empresa.com', activo: true, cotizaciones: 6, aprobadas: 3, rechazadas: 3, clientes: 11, ventasTotal: 90000 },
        { id: 16, nombre: 'Ana Vargas', telefono: '555-0116', email: 'ana.vargas@empresa.com', activo: true, cotizaciones: 8, aprobadas: 4, rechazadas: 4, clientes: 10, ventasTotal: 85000 },
        { id: 17, nombre: 'Diego Hernández', telefono: '555-0117', email: 'diego.hernandez@empresa.com', activo: true, cotizaciones: 7, aprobadas: 4, rechazadas: 3, clientes: 9, ventasTotal: 80000 },
        { id: 18, nombre: 'Isabel Díaz', telefono: '555-0118', email: 'isabel.diaz@empresa.com', activo: false, cotizaciones: 6, aprobadas: 3, rechazadas: 3, clientes: 8, ventasTotal: 75000 },
        { id: 19, nombre: 'Juan López', telefono: '555-0119', email: 'juan.lopez@empresa.com', activo: true, cotizaciones: 8, aprobadas: 4, rechazadas: 4, clientes: 7, ventasTotal: 70000 },
        { id: 20, nombre: 'Roberto Sánchez', telefono: '555-0120', email: 'roberto.sanchez@empresa.com', activo: false, cotizaciones: 6, aprobadas: 3, rechazadas: 3, clientes: 6, ventasTotal: 65000 }
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
