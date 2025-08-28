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
    const [vistaActiva, setVistaActiva] = useState('equipo');
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState('semana');

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

};

export default Dashboard;
