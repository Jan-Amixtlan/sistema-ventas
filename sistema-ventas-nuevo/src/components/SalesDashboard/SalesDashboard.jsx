import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import './SalesDashboard.css';

const SalesDashboard = () => {
    const [animationKey, setAnimationKey] = useState(0);
    const [selectedPeriod, setSelectedPeriod] = useState('2024');

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
                                <span
                                    className="tooltip-dot"
                                    style={{ backgroundColor: entry.color }}
                                ></span>
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
        <div className="sales-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <div className="header-content">
                    <h1 className="dashboard-title">Dashboard de Ventas</h1>
                    <p className="dashboard-subtitle">Análisis de rendimiento y proyecciones</p>
                </div>
                <div className="header-actions">
                    <div className="period-selector">
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="period-select"
                        >
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </select>
                    </div>
                    <button className="refresh-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Actualizar
                    </button>
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

            {/* Summary Cards */}
            <div className="summary-cards">
                <div className="summary-card primary">
                    <div className="card-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Ventas Totales</h4>
                        <p className="card-value">$628,500</p>
                        <p className="card-change positive">+12.5% vs mes anterior</p>
                    </div>
                </div>

                <div className="summary-card success">
                    <div className="card-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Meta Alcanzada</h4>
                        <p className="card-value">108.2%</p>
                        <p className="card-change positive">Superamos la meta</p>
                    </div>
                </div>

                <div className="summary-card orange">
                    <div className="card-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Vendedores Activos</h4>
                        <p className="card-value">20</p>
                        <p className="card-change">Promedio: $31,425</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesDashboard;