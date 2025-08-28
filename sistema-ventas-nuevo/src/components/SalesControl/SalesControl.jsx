import React, { useState, useMemo } from 'react';
import './SalesControl.css';

const SalesControl = () => {
    const [salespeople, setSalespeople] = useState([
        {
            id: 1,
            nombre: "Juan Pérez",
            telefono: "555-0101",
            email: "juan@empresa.com",
            estado: "Activo",
            cotizaciones: 12,
            aprobadas: 8,
            rechazadas: 4,
            clientes: 15,
            ventasTotal: 125000
        },
        {
            id: 2,
            nombre: "María García",
            telefono: "555-0102",
            email: "maria@empresa.com",
            estado: "Activo",
            cotizaciones: 9,
            aprobadas: 6,
            rechazadas: 3,
            clientes: 12,
            ventasTotal: 98000
        },
        {
            id: 3,
            nombre: "Carlos López",
            telefono: "555-0103",
            email: "carlos@empresa.com",
            estado: "Activo",
            cotizaciones: 15,
            aprobadas: 10,
            rechazadas: 5,
            clientes: 20,
            ventasTotal: 187000
        },
        {
            id: 4,
            nombre: "Ana Martínez",
            telefono: "555-0104",
            email: "ana@empresa.com",
            estado: "Activo",
            cotizaciones: 8,
            aprobadas: 5,
            rechazadas: 3,
            clientes: 10,
            ventasTotal: 76000
        },
        {
            id: 5,
            nombre: "Luis Rodríguez",
            telefono: "555-0105",
            email: "luis@empresa.com",
            estado: "Inactivo",
            cotizaciones: 6,
            aprobadas: 2,
            rechazadas: 4,
            clientes: 8,
            ventasTotal: 45000
        },
        {
            id: 6,
            nombre: "Elena Sánchez",
            telefono: "555-0106",
            email: "elena@empresa.com",
            estado: "Activo",
            cotizaciones: 11,
            aprobadas: 7,
            rechazadas: 4,
            clientes: 14,
            ventasTotal: 110000
        },
        {
            id: 7,
            nombre: "Roberto Torres",
            telefono: "555-0107",
            email: "roberto@empresa.com",
            estado: "Activo",
            cotizaciones: 13,
            aprobadas: 9,
            rechazadas: 4,
            clientes: 16,
            ventasTotal: 156000
        },
        {
            id: 8,
            nombre: "Carmen Flores",
            telefono: "555-0108",
            email: "carmen@empresa.com",
            estado: "Activo",
            cotizaciones: 10,
            aprobadas: 6,
            rechazadas: 4,
            clientes: 13,
            ventasTotal: 92000
        },
        {
            id: 9,
            nombre: "Diego Herrera",
            telefono: "555-0109",
            email: "diego@empresa.com",
            estado: "Inactivo",
            cotizaciones: 4,
            aprobadas: 1,
            rechazadas: 3,
            clientes: 5,
            ventasTotal: 32000
        },
        {
            id: 10,
            nombre: "Patricia Vega",
            telefono: "555-0110",
            email: "patricia@empresa.com",
            estado: "Activo",
            cotizaciones: 14,
            aprobadas: 11,
            rechazadas: 3,
            clientes: 22,
            ventasTotal: 198000
        }
    ]);

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Calcular estadísticas
    const statistics = useMemo(() => {
        const totalCotizaciones = salespeople.reduce((sum, person) => sum + person.cotizaciones, 0);
        const totalAprobadas = salespeople.reduce((sum, person) => sum + person.aprobadas, 0);
        const totalRechazadas = salespeople.reduce((sum, person) => sum + person.rechazadas, 0);
        const totalVentas = salespeople.reduce((sum, person) => sum + person.ventasTotal, 0);
        const porcentajeExito = totalCotizaciones > 0 ? ((totalAprobadas / totalCotizaciones) * 100).toFixed(1) : 0;

        return {
            totalCotizaciones,
            totalAprobadas,
            totalRechazadas,
            totalVentas,
            porcentajeExito
        };
    }, [salespeople]);

    // Función para calcular porcentaje de éxito individual
    const calcularPorcentajeExito = (aprobadas, cotizaciones) => {
        return cotizaciones > 0 ? ((aprobadas / cotizaciones) * 100).toFixed(1) : 0;
    };

    // Función para eliminar vendedor
    const eliminarVendedor = (id) => {
        if (window.confirm('¿Está seguro de eliminar este vendedor?')) {
            setSalespeople(prev => prev.filter(person => person.id !== id));
        }
    };

    // Función para ordenar
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Datos ordenados
    const sortedSalespeople = useMemo(() => {
        if (!sortConfig.key) return salespeople;

        return [...salespeople].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // Calcular porcentaje de éxito si es necesario
            if (sortConfig.key === 'porcentajeExito') {
                aValue = parseFloat(calcularPorcentajeExito(a.aprobadas, a.cotizaciones));
                bValue = parseFloat(calcularPorcentajeExito(b.aprobadas, b.cotizaciones));
            }

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [salespeople, sortConfig]);

    return (
        <div className="sales-control">
            {/* Header */}
            <div className="control-header">
                <div className="header-content">
                    <h1 className="header-title">Control de Vendedores</h1>
                    <p className="header-subtitle">Gestión y seguimiento del equipo comercial</p>
                </div>
            </div>

            {/* Table Container */}
            <div className="table-container">
                <div className="table-wrapper">
                    <table className="sales-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('id')} className="sortable">
                                    ID
                                    {sortConfig.key === 'id' && (
                                        <span className="sort-indicator">
                                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                                <th onClick={() => handleSort('nombre')} className="sortable">
                                    Nombre
                                    {sortConfig.key === 'nombre' && (
                                        <span className="sort-indicator">
                                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th onClick={() => handleSort('estado')} className="sortable">
                                    Estado
                                    {sortConfig.key === 'estado' && (
                                        <span className="sort-indicator">
                                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                                <th onClick={() => handleSort('cotizaciones')} className="sortable">
                                    Cotizaciones
                                    {sortConfig.key === 'cotizaciones' && (
                                        <span className="sort-indicator">
                                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                                <th onClick={() => handleSort('aprobadas')} className="sortable">
                                    Aprobadas
                                    {sortConfig.key === 'aprobadas' && (
                                        <span className="sort-indicator">
                                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                                <th onClick={() => handleSort('rechazadas')} className="sortable">
                                    Rechazadas
                                    {sortConfig.key === 'rechazadas' && (
                                        <span className="sort-indicator">
                                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                                <th onClick={() => handleSort('porcentajeExito')} className="sortable">
                                    % Éxito
                                    {sortConfig.key === 'porcentajeExito' && (
                                        <span className="sort-indicator">
                                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                                <th onClick={() => handleSort('clientes')} className="sortable">
                                    Clientes
                                    {sortConfig.key === 'clientes' && (
                                        <span className="sort-indicator">
                                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                                <th onClick={() => handleSort('ventasTotal')} className="sortable">
                                    Ventas Total
                                    {sortConfig.key === 'ventasTotal' && (
                                        <span className="sort-indicator">
                                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedSalespeople.map((person) => (
                                <tr key={person.id} className={person.estado === 'Inactivo' ? 'inactive-row' : ''}>
                                    <td>{person.id}</td>
                                    <td className="name-cell">{person.nombre}</td>
                                    <td>{person.telefono}</td>
                                    <td className="email-cell">{person.email}</td>
                                    <td>
                                        <span className={`status-badge ${person.estado === 'Activo' ? 'active' : 'inactive'}`}>
                                            {person.estado}
                                        </span>
                                    </td>
                                    <td className="number-cell">{person.cotizaciones}</td>
                                    <td className="number-cell success">{person.aprobadas}</td>
                                    <td className="number-cell danger">{person.rechazadas}</td>
                                    <td className="percentage-cell">
                                        {calcularPorcentajeExito(person.aprobadas, person.cotizaciones)}%
                                    </td>
                                    <td className="number-cell">{person.clientes}</td>
                                    <td className="money-cell">${person.ventasTotal.toLocaleString()}</td>
                                    <td className="actions-cell">
                                        <button
                                            className="delete-btn"
                                            onClick={() => eliminarVendedor(person.id)}
                                            title="Eliminar vendedor"
                                        >
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="totals-row">
                                <td colSpan={2}><strong>TOTALES</strong></td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td className="total-number">{statistics.totalCotizaciones}</td>
                                <td className="total-number success">{statistics.totalAprobadas}</td>
                                <td className="total-number danger">{statistics.totalRechazadas}</td>
                                <td className="total-percentage">{statistics.porcentajeExito}%</td>
                                <td>-</td>
                                <td className="total-money">${statistics.totalVentas.toLocaleString()}</td>
                                <td>-</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Statistics Summary */}
            <div className="statistics-summary">
                <div className="summary-card">
                    <h3 className="summary-title">Resumen General</h3>
                    <div className="summary-stats">
                        <div className="stat-item">
                            <span className="stat-label">Total Cotizaciones:</span>
                            <span className="stat-value primary">{statistics.totalCotizaciones}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Aprobadas:</span>
                            <span className="stat-value success">
                                {statistics.totalAprobadas} ({statistics.porcentajeExito}%)
                            </span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Rechazadas:</span>
                            <span className="stat-value danger">{statistics.totalRechazadas}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Total en Ventas:</span>
                            <span className="stat-value primary">${statistics.totalVentas.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesControl;