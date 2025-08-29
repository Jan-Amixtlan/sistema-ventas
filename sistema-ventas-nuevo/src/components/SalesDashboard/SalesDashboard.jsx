import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import EditableTable from '../EditableTable/EditableTable.jsx';
import './SalesDashboard.css';

const SalesDashboard = () => {
    const [animationKey, setAnimationKey] = useState(0);
    const [selectedPeriod, setSelectedPeriod] = useState('2024');
    
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
    const [vistaActiva, setVistaActiva] = useState('equipo');
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState('semana');

    // Datos para el gráfico de barras - Ventas por Vendedor
    const salesByVendor = [
        { name: 'María Rodríguez', ventas: 42000 },
        { name: 'Teresa Nazario', ventas: 41500 },
        { name: 'Elena Torres', ventas: 40800 },
        { name: 'Ricardo Jiménez', ventas: 39200 },
        { name: 'Laura Ramírez', ventas: 38700 },
        { name: 'Francisco Moreno', ventas: 37400 },
        { name: 'Carmen López', ventas: 36100 },
        { name: 'Sofia García', ventas: 33200 },
        { name: 'Manuel Castro', ventas: 32800 },
        { name: 'Jorge Martín', ventas: 31900 },
        { name: 'Carlos Méndez', ventas: 30400 },
        { name: 'Manuel Romero', ventas: 29700 },
        { name: 'Patricia Gil', ventas: 28200 },
        { name: 'Miguel Ángel Ruiz', ventas: 27800 },
        { name: 'Antonio Molina', ventas: 26900 },
        { name: 'Ana Vargas', ventas: 26100 },
        { name: 'Diego Hernández', ventas: 25400 },
        { name: 'Isabel Díaz', ventas: 23800 },
        { name: 'Juan López', ventas: 22200 },
        { name: 'Roberto Sánchez', ventas: 21000 }
    ];

    // Datos para el gráfico de líneas - Forecast vs Real
    const forecastData = [
        { mes: 'Ene', real: 28000, forecast: 25000 },
        { mes: 'Feb', real: 32000, forecast: 30000 },
        { mes: 'Mar', real: 35000, forecast: 33000 },
        { mes: 'Abr', real: 38000, forecast: 37000 },
        { mes: 'May', real: 42000, forecast: 40000 },
        { mes: 'Jun', real: 45000, forecast: 44000 },
        { mes: 'Jul', real: 48000, forecast: 47000 },
        { mes: 'Ago', real: 52000, forecast: 50000 },
        { mes: 'Sep', real: 55000, forecast: 54000 },
        { mes: 'Oct', real: 58000, forecast: 57000 },
        { mes: 'Nov', real: 62000, forecast: 60000 },
        { mes: 'Dic', real: 68000, forecast: 65000 }
    ];

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

    // Trigger animation on mount
    useEffect(() => {
        const timer = setTimeout(() => setAnimationKey(1), 100);
        return () => clearTimeout(timer);
    }, []);

    // Custom tooltip para el gráfico de barras
    const CustomBarTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <h4 className="tooltip-title">{label}</h4>
                    <div className="tooltip-content">
                        <div className="tooltip-value">
                            <span className="tooltip-label">Ventas:</span>
                            <span className="tooltip-amount">${payload[0].value.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    // Custom tooltip para el gráfico de líneas
    const CustomLineTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <h4 className="tooltip-title">{label}</h4>
                    <div className="tooltip-content">
                        {payload.map((entry, index) => (
                            <div key={index} className="tooltip-value">
                                <span className="tooltip-label">{entry.name}:</span>
                                <span className="tooltip-amount">${entry.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="sales-dashboard-container">
            <div className="dashboard-header">
                <h1>Dashboard de Ventas</h1>
                <p>Control total de tu equipo comercial</p>
            </div>

            {/* Vista Selector */}
            <div className="view-selector-container">
                <div className="view-buttons">
                    <button 
                        className={`view-btn ${vistaActiva === 'equipo' ? 'active' : ''}`}
                        onClick={() => setVistaActiva('equipo')}
                    >
                        Vista de Equipo
                    </button>
                    <button 
                        className={`view-btn ${vistaActiva === 'individual' ? 'active' : ''}`}
                        onClick={() => setVistaActiva('individual')}
                    >
                        Vista Individual
                    </button>
                    <button 
                        className={`view-btn ${vistaActiva === 'forecast' ? 'active' : ''}`}
                        onClick={() => setVistaActiva('forecast')}
                    >
                        Forecast
                    </button>
                </div>
                <div className="period-selector">
                    <label htmlFor="periodo">Período:</label>
                    <select 
                        id="periodo" 
                        value={periodoSeleccionado} 
                        onChange={(e) => setPeriodoSeleccionado(e.target.value)}
                        className="period-select"
                    >
                        <option value="semana">Esta Semana</option>
                        <option value="mes">Este Mes</option>
                        <option value="trimestre">Este Trimestre</option>
                        <option value="año">Este Año</option>
                    </select>
                </div>
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
                        <p>Pending</p>
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

            {/* Charts Grid */}
            <div className="charts-grid">

                {/* Gráfico de Barras - Ventas por Vendedor */}
                <div className="chart-card bar-chart-card">
                    <div className="chart-header">
                        <div className="chart-title-section">
                            <h3 className="chart-title">Distribución de Ventas por Vendedor</h3>
                            <p className="chart-subtitle">Top 20 vendedores del año</p>
                        </div>
                        <div className="chart-legend">
                            <div className="legend-item">
                                <div className="legend-color primary"></div>
                                <span>Ventas por Vendedor</span>
                            </div>
                        </div>
                    </div>

                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                data={salesByVendor}
                                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                key={animationKey}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 11, fill: '#6B7280' }}
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                    interval={0}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                />
                                <Tooltip content={<CustomBarTooltip />} />
                                <Bar
                                    dataKey="ventas"
                                    fill="#2563EB"
                                    radius={[4, 4, 0, 0]}
                                    animationDuration={1500}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-stats">
                        <div className="stat-item">
                            <span className="stat-value">$42,000</span>
                            <span className="stat-label">Top Vendedor</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">$31,425</span>
                            <span className="stat-label">Promedio</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">20</span>
                            <span className="stat-label">Vendedores</span>
                        </div>
                    </div>
                </div>

                {/* Gráfico de Líneas - Forecast vs Real */}
                <div className="chart-card line-chart-card">
                    <div className="chart-header">
                        <div className="chart-title-section">
                            <h3 className="chart-title">Forecast de Ventas vs Real</h3>
                            <p className="chart-subtitle">Comparación mensual proyectado vs real</p>
                        </div>
                        <div className="chart-legend">
                            <div className="legend-item">
                                <div className="legend-color success"></div>
                                <span>Ventas Reales</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color primary dashed"></div>
                                <span>Forecast</span>
                            </div>
                        </div>
                    </div>

                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart
                                data={forecastData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                                key={animationKey}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="mes"
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                />
                                <Tooltip content={<CustomLineTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="real"
                                    stroke="#10B981"
                                    strokeWidth={3}
                                    dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                                    activeDot={{ r: 7, stroke: '#10B981', strokeWidth: 2 }}
                                    name="Ventas Reales"
                                    animationDuration={2000}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="forecast"
                                    stroke="#2563EB"
                                    strokeWidth={3}
                                    strokeDasharray="8 8"
                                    dot={{ fill: '#2563EB', strokeWidth: 2, r: 5 }}
                                    activeDot={{ r: 7, stroke: '#2563EB', strokeWidth: 2 }}
                                    name="Forecast"
                                    animationDuration={2000}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-stats">
                        <div className="stat-item success">
                            <span className="stat-value">+8.2%</span>
                            <span className="stat-label">vs Forecast</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">$68k</span>
                            <span className="stat-label">Dic (Pico)</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">94.5%</span>
                            <span className="stat-label">Precisión</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controles de Filtro */}
           

            {/* Tabla de Vendedores */}
            

            {/* Resumen Final */}
            
            {/* Tabla Editable Estilo Excel */}
       
        </div>
    );
};

export default SalesDashboard;
