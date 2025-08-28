import { useState, useEffect } from 'react';
import EditableTable from '../components/EditableTable/EditableTable.jsx';
import './Dashboard.css';

const Dashboard = () => {
    const [salesData, setSalesData] = useState({
        totalVendedores: 20,
        cotizacionesTotales: 156,
        cotizacionesAprobadas: 89,
        cotizacionesRechazadas: 67,
        dineroTotal: 2450000,
        metaMensual: 3000000
    });

    const [vendedores, setVendedores] = useState([
        { id: 1, nombre: 'Juan Pérez', activo: true, cotizaciones: 12, aprobadas: 8, rechazadas: 4, ventas: 125000, clientes: 15 },
        { id: 2, nombre: 'María García', activo: true, cotizaciones: 9, aprobadas: 6, rechazadas: 3, ventas: 98000, clientes: 12 },
        { id: 3, nombre: 'Carlos López', activo: true, cotizaciones: 15, aprobadas: 10, rechazadas: 5, ventas: 187000, clientes: 20 },
        { id: 4, nombre: 'Ana Martínez', activo: true, cotizaciones: 8, aprobadas: 5, rechazadas: 3, ventas: 76000, clientes: 10 },
        { id: 5, nombre: 'Luis Rodríguez', activo: false, cotizaciones: 6, aprobadas: 2, rechazadas: 4, ventas: 32000, clientes: 8 }
    ]);

    const [filtroActivo, setFiltroActivo] = useState('todos');
    const [ordenarPor, setOrdenarPor] = useState('ventas');

    const porcentajeAprobacion = ((salesData.cotizacionesAprobadas / salesData.cotizacionesTotales) * 100).toFixed(1);
    const porcentajeMeta = ((salesData.dineroTotal / salesData.metaMensual) * 100).toFixed(1);

    const vendedoresFiltrados = vendedores.filter(v => {
        if (filtroActivo === 'activos') return v.activo;
        if (filtroActivo === 'inactivos') return !v.activo;
        return true;
    }).sort((a, b) => {
        if (ordenarPor === 'ventas') return b.ventas - a.ventas;
        if (ordenarPor === 'cotizaciones') return b.cotizaciones - a.cotizaciones;
        if (ordenarPor === 'aprobadas') return b.aprobadas - a.aprobadas;
        return a.nombre.localeCompare(b.nombre);
    });

    return (
        <div id="dashboard" className="dashboard-container">
            <div className="dashboard-header">
                <h1>Dashboard de Ventas</h1>
                <p>Control total de tu equipo comercial</p>
            </div>

            {/* Métricas Principales */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-icon">👥</div>
                    <div className="metric-info">
                        <h3>{salesData.totalVendedores}</h3>
                        <p>Vendedores Totales</p>
                    </div>
                </div>
                
                <div className="metric-card">
                    <div className="metric-icon">📋</div>
                    <div className="metric-info">
                        <h3>{salesData.cotizacionesTotales}</h3>
                        <p>Cotizaciones Totales</p>
                    </div>
                </div>
                
                <div className="metric-card success">
                    <div className="metric-icon">✅</div>
                    <div className="metric-info">
                        <h3>{salesData.cotizacionesAprobadas}</h3>
                        <p>Aprobadas ({porcentajeAprobacion}%)</p>
                    </div>
                </div>
                
                <div className="metric-card danger">
                    <div className="metric-icon">❌</div>
                    <div className="metric-info">
                        <h3>{salesData.cotizacionesRechazadas}</h3>
                        <p>Rechazadas</p>
                    </div>
                </div>
                
                <div className="metric-card primary">
                    <div className="metric-icon">💰</div>
                    <div className="metric-info">
                        <h3>${salesData.dineroTotal.toLocaleString()}</h3>
                        <p>Total en Ventas</p>
                    </div>
                </div>
                
                <div className="metric-card">
                    <div className="metric-icon">🎯</div>
                    <div className="metric-info">
                        <h3>{porcentajeMeta}%</h3>
                        <p>Meta Mensual</p>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${Math.min(porcentajeMeta, 100)}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controles de Filtro */}
            <div className="dashboard-controls">
                <div className="filter-controls">
                    <select 
                        value={filtroActivo} 
                        onChange={(e) => setFiltroActivo(e.target.value)}
                        className="filter-select"
                    >
                        <option value="todos">Todos los Vendedores</option>
                        <option value="activos">Solo Activos</option>
                        <option value="inactivos">Solo Inactivos</option>
                    </select>

                    <select 
                        value={ordenarPor} 
                        onChange={(e) => setOrdenarPor(e.target.value)}
                        className="filter-select"
                    >
                        <option value="ventas">Ordenar por Ventas</option>
                        <option value="cotizaciones">Ordenar por Cotizaciones</option>
                        <option value="aprobadas">Ordenar por Aprobadas</option>
                        <option value="nombre">Ordenar por Nombre</option>
                    </select>
                </div>

                <button className="btn-export">Exportar a Excel</button>
            </div>

            {/* Tabla de Vendedores */}
            <div className="vendedores-table">
                <h2>Detalle por Vendedor</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Vendedor</th>
                                <th>Estado</th>
                                <th>Cotizaciones</th>
                                <th>Aprobadas</th>
                                <th>Rechazadas</th>
                                <th>% Aprobación</th>
                                <th>Clientes</th>
                                <th>Ventas</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendedoresFiltrados.map(vendedor => (
                                <tr key={vendedor.id} className={!vendedor.activo ? 'inactive' : ''}>
                                    <td className="vendedor-nombre">{vendedor.nombre}</td>
                                    <td>
                                        <span className={`status ${vendedor.activo ? 'active' : 'inactive'}`}>
                                            {vendedor.activo ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td>{vendedor.cotizaciones}</td>
                                    <td className="aprobadas">{vendedor.aprobadas}</td>
                                    <td className="rechazadas">{vendedor.rechazadas}</td>
                                    <td>{vendedor.cotizaciones > 0 ? ((vendedor.aprobadas / vendedor.cotizaciones) * 100).toFixed(1) + '%' : '0%'}</td>
                                    <td>{vendedor.clientes}</td>
                                    <td className="ventas">${vendedor.ventas.toLocaleString()}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-edit">✏️</button>
                                            <button className="btn-view">👁️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Resumen Final */}
            <div className="dashboard-summary">
                <div className="summary-card">
                    <h3>Resumen de Resultados</h3>
                    <div className="summary-grid">
                        <div className="summary-item">
                            <span>Total Cotizaciones:</span>
                            <strong>{salesData.cotizacionesTotales}</strong>
                        </div>
                        <div className="summary-item success">
                            <span>Aprobadas:</span>
                            <strong>{salesData.cotizacionesAprobadas} ({porcentajeAprobacion}%)</strong>
                        </div>
                        <div className="summary-item danger">
                            <span>Rechazadas:</span>
                            <strong>{salesData.cotizacionesRechazadas}</strong>
                        </div>
                        <div className="summary-item primary">
                            <span>Total en Dinero:</span>
                            <strong>${salesData.dineroTotal.toLocaleString()}</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabla Editable Estilo Excel */}
            <EditableTable />
        </div>
    );
};

export default Dashboard;
