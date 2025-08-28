import { useState, useRef, useEffect } from 'react';
import './EditableTable.css';

const EditableTable = () => {
    const [vendedoresData, setVendedoresData] = useState([
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
    ]);

    const [editingCell, setEditingCell] = useState({ row: null, column: null });
    const [tempValue, setTempValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newVendedor, setNewVendedor] = useState({
        nombre: '',
        telefono: '',
        email: '',
        activo: true,
        cotizaciones: 0,
        aprobadas: 0,
        rechazadas: 0,
        clientes: 0,
        ventasTotal: 0
    });
    const inputRef = useRef(null);

    // Calcular totales
    const totales = {
        cotizaciones: vendedoresData.reduce((sum, v) => sum + v.cotizaciones, 0),
        aprobadas: vendedoresData.reduce((sum, v) => sum + v.aprobadas, 0),
        rechazadas: vendedoresData.reduce((sum, v) => sum + v.rechazadas, 0),
        clientes: vendedoresData.reduce((sum, v) => sum + v.clientes, 0),
        ventasTotal: vendedoresData.reduce((sum, v) => sum + v.ventasTotal, 0)
    };

    useEffect(() => {
        if (editingCell.row !== null && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [editingCell]);

    const startEditing = (rowIndex, column, currentValue) => {
        setEditingCell({ row: rowIndex, column });
        setTempValue(currentValue.toString());
    };

    const cancelEditing = () => {
        setEditingCell({ row: null, column: null });
        setTempValue('');
    };

    const saveEdit = () => {
        if (editingCell.row !== null && editingCell.column !== null) {
            const newData = [...vendedoresData];
            const field = editingCell.column;
            
            // Validar y convertir el valor según el tipo de campo
            let newValue = tempValue;
            if (['cotizaciones', 'aprobadas', 'rechazadas', 'clientes', 'ventasTotal'].includes(field)) {
                newValue = parseInt(tempValue) || 0;
            } else if (field === 'activo') {
                newValue = tempValue.toLowerCase() === 'true' || tempValue === '1';
            }

            newData[editingCell.row][field] = newValue;
            setVendedoresData(newData);
            cancelEditing();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEditing();
        }
    };

    const agregarVendedor = () => {
        setShowModal(true);
    };

    const cerrarModal = () => {
        setShowModal(false);
        setNewVendedor({
            nombre: '',
            telefono: '',
            email: '',
            activo: true,
            cotizaciones: 0,
            aprobadas: 0,
            rechazadas: 0,
            clientes: 0,
            ventasTotal: 0
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewVendedor(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : 
                   ['cotizaciones', 'aprobadas', 'rechazadas', 'clientes', 'ventasTotal'].includes(name) 
                   ? (parseInt(value) || 0) : value
        }));
    };

    const guardarVendedor = (e) => {
        e.preventDefault();
        
        // Validaciones básicas
        if (!newVendedor.nombre.trim()) {
            alert('El nombre es requerido');
            return;
        }
        if (!newVendedor.email.trim()) {
            alert('El email es requerido');
            return;
        }
        if (!newVendedor.telefono.trim()) {
            alert('El teléfono es requerido');
            return;
        }

        const nuevoId = Math.max(...vendedoresData.map(v => v.id)) + 1;
        const vendedorCompleto = {
            ...newVendedor,
            id: nuevoId
        };
        
        setVendedoresData([...vendedoresData, vendedorCompleto]);
        cerrarModal();
    };

    const eliminarVendedor = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este vendedor?')) {
            setVendedoresData(vendedoresData.filter(v => v.id !== id));
        }
    };

    const exportarACSV = () => {
        // Encabezados completos con TODA la información de la tabla
        const headers = [
            'ID',
            'Nombre',
            'Email', 
            'Teléfono',
            'Estado',
            'Cotizaciones',
            'Aprobadas',
            'Rechazadas',
            'Clientes',
            'Ventas Totales (USD)',
            'Región',
            'Fecha de Ingreso',
            '% Éxito'
        ];
        
        // Regiones predefinidas para asignar consistentemente
        const regiones = ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'];
        
        // Fechas de ingreso predefinidas para cada vendedor
        const fechasIngreso = [
            '14/01/2023', // Juan Pérez
            '19/11/2022', // María García  
            '09/03/2023', // Carlos López
            '04/08/2022', // Ana Martínez
            '27/02/2023', // Luis Rodríguez
            '15/05/2022', // Elena Sánchez
            '08/09/2023', // Roberto Torres
            '22/01/2023', // Carmen Flores
            '11/07/2022', // Diego Herrera
            '03/12/2022'  // Patricia Vega
        ];
        
        // Función para calcular porcentaje de éxito
        const calcularPorcentajeExito = (aprobadas, cotizaciones) => {
            return cotizaciones > 0 ? ((aprobadas / cotizaciones) * 100).toFixed(1) + '%' : '0%';
        };
        
        // Función para escapar campos que contienen comas o caracteres especiales
        const escapeField = (field) => {
            const fieldStr = String(field);
            if (fieldStr.includes(',') || fieldStr.includes(';') || fieldStr.includes('"') || fieldStr.includes('\n')) {
                return `"${fieldStr.replace(/"/g, '""')}"`;
            }
            return fieldStr;
        };
        
        // Crear filas de datos con TODA la información del EditableTable
        const dataRows = vendedoresData.map((vendedor, index) => [
            escapeField(vendedor.id),
            escapeField(vendedor.nombre),
            escapeField(vendedor.email),
            escapeField(vendedor.telefono),
            escapeField(vendedor.activo ? 'Activo' : 'Inactivo'),
            escapeField(vendedor.cotizaciones),
            escapeField(vendedor.aprobadas),
            escapeField(vendedor.rechazadas),
            escapeField(vendedor.clientes),
            escapeField(`$${vendedor.ventasTotal.toLocaleString()}`),
            escapeField(regiones[index % regiones.length]),
            escapeField(fechasIngreso[index] || new Date().toLocaleDateString('es-MX')),
            escapeField(calcularPorcentajeExito(vendedor.aprobadas, vendedor.cotizaciones))
        ]);

        // Construir CSV usando comas como separador
        const csvRows = [
            // Encabezados escapados
            headers.map(h => escapeField(h)).join(','),
            // Datos completos de vendedores
            ...dataRows.map(row => row.join(','))
        ];
        
        const csvContent = csvRows.join('\r\n');
        
        // BOM para UTF-8 y compatibilidad perfecta con Excel
        const BOM = '\uFEFF';
        const blob = new Blob([BOM + csvContent], { 
            type: 'text/csv;charset=utf-8;' 
        });
        
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `Vendedores_Completo_${new Date().toISOString().split('T')[0].replace(/-/g, '')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const renderEditableCell = (value, rowIndex, column) => {
        const isEditing = editingCell.row === rowIndex && editingCell.column === column;
        
        if (isEditing) {
            return (
                <input
                    ref={inputRef}
                    type={['cotizaciones', 'aprobadas', 'rechazadas', 'clientes', 'ventasTotal'].includes(column) ? 'number' : 'text'}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={saveEdit}
                    className="cell-input"
                />
            );
        }

        return (
            <span
                className="editable-cell"
                onClick={() => startEditing(rowIndex, column, value)}
            >
                {column === 'ventasTotal' ? `$${value.toLocaleString()}` :
                 column === 'activo' ? (value ? 'Activo' : 'Inactivo') :
                 value}
            </span>
        );
    };

    return (
        <div className="editable-table-container">
            <div className="table-header">
                <div className="table-title">
                    <h2>Control de Vendedores - Estilo Excel</h2>
                    <p>Haz clic en cualquier celda para editarla. Presiona Enter para guardar o Escape para cancelar.</p>
                </div>
                <div className="table-actions">
                    <button className="btn-add" onClick={agregarVendedor}>
                        ➕ Agregar Vendedor
                    </button>
                    <button className="btn-export" onClick={exportarACSV}>
                        📊 Exportar CSV
                    </button>
                </div>
            </div>

            <div className="table-wrapper">
                <table className="excel-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Estado</th>
                            <th>Cotizaciones</th>
                            <th>Aprobadas</th>
                            <th>Rechazadas</th>
                            <th>% Éxito</th>
                            <th>Clientes</th>
                            <th>Ventas Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendedoresData.map((vendedor, index) => (
                            <tr key={vendedor.id} className={!vendedor.activo ? 'inactive-row' : ''}>
                                <td className="id-cell">{vendedor.id}</td>
                                <td>{renderEditableCell(vendedor.nombre, index, 'nombre')}</td>
                                <td>{renderEditableCell(vendedor.telefono, index, 'telefono')}</td>
                                <td>{renderEditableCell(vendedor.email, index, 'email')}</td>
                                <td>
                                    <span className={`status-badge ${vendedor.activo ? 'active' : 'inactive'}`}>
                                        {renderEditableCell(vendedor.activo, index, 'activo')}
                                    </span>
                                </td>
                                <td className="number-cell">{renderEditableCell(vendedor.cotizaciones, index, 'cotizaciones')}</td>
                                <td className="number-cell success">{renderEditableCell(vendedor.aprobadas, index, 'aprobadas')}</td>
                                <td className="number-cell danger">{renderEditableCell(vendedor.rechazadas, index, 'rechazadas')}</td>
                                <td className="percentage-cell">
                                    {vendedor.cotizaciones > 0 ? 
                                        `${((vendedor.aprobadas / vendedor.cotizaciones) * 100).toFixed(1)}%` : 
                                        '0%'
                                    }
                                </td>
                                <td className="number-cell">{renderEditableCell(vendedor.clientes, index, 'clientes')}</td>
                                <td className="currency-cell">{renderEditableCell(vendedor.ventasTotal, index, 'ventasTotal')}</td>
                                <td className="actions-cell">
                                    <button 
                                        className="btn-delete"
                                        onClick={() => eliminarVendedor(vendedor.id)}
                                        title="Eliminar vendedor"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="totals-row">
                            <td colSpan="5"><strong>TOTALES</strong></td>
                            <td className="number-cell"><strong>{totales.cotizaciones}</strong></td>
                            <td className="number-cell success"><strong>{totales.aprobadas}</strong></td>
                            <td className="number-cell danger"><strong>{totales.rechazadas}</strong></td>
                            <td className="percentage-cell">
                                <strong>{totales.cotizaciones > 0 ? `${((totales.aprobadas / totales.cotizaciones) * 100).toFixed(1)}%` : '0%'}</strong>
                            </td>
                            <td className="number-cell"><strong>{totales.clientes}</strong></td>
                            <td className="currency-cell"><strong>${totales.ventasTotal.toLocaleString()}</strong></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Resumen de totales */}
            <div className="table-summary">
                <div className="summary-cards">
                    <div className="summary-card">
                        <h4>Resumen General</h4>
                        <div className="summary-stats">
                            <div className="stat-item">
                                <span>Total Cotizaciones:</span>
                                <strong>{totales.cotizaciones}</strong>
                            </div>
                            <div className="stat-item success">
                                <span>Aprobadas:</span>
                                <strong>{totales.aprobadas} ({totales.cotizaciones > 0 ? ((totales.aprobadas / totales.cotizaciones) * 100).toFixed(1) : 0}%)</strong>
                            </div>
                            <div className="stat-item danger">
                                <span>Rechazadas:</span>
                                <strong>{totales.rechazadas}</strong>
                            </div>
                            <div className="stat-item primary">
                                <span>Total en Ventas:</span>
                                <strong>${totales.ventasTotal.toLocaleString()}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para agregar vendedor */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Agregar Nuevo Vendedor</h3>
                            <button className="modal-close" onClick={cerrarModal}>
                                ✕
                            </button>
                        </div>
                        
                        <form onSubmit={guardarVendedor} className="vendor-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre Completo *</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={newVendedor.nombre}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Juan Pérez"
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="telefono">Teléfono *</label>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        name="telefono"
                                        value={newVendedor.telefono}
                                        onChange={handleInputChange}
                                        placeholder="Ej: 555-0123"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group full-width">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={newVendedor.email}
                                        onChange={handleInputChange}
                                        placeholder="Ej: juan@empresa.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="cotizaciones">Cotizaciones</label>
                                    <input
                                        type="number"
                                        id="cotizaciones"
                                        name="cotizaciones"
                                        value={newVendedor.cotizaciones}
                                        onChange={handleInputChange}
                                        min="0"
                                        placeholder="0"
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="aprobadas">Aprobadas</label>
                                    <input
                                        type="number"
                                        id="aprobadas"
                                        name="aprobadas"
                                        value={newVendedor.aprobadas}
                                        onChange={handleInputChange}
                                        min="0"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="rechazadas">Rechazadas</label>
                                    <input
                                        type="number"
                                        id="rechazadas"
                                        name="rechazadas"
                                        value={newVendedor.rechazadas}
                                        onChange={handleInputChange}
                                        min="0"
                                        placeholder="0"
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="clientes">Clientes</label>
                                    <input
                                        type="number"
                                        id="clientes"
                                        name="clientes"
                                        value={newVendedor.clientes}
                                        onChange={handleInputChange}
                                        min="0"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="ventasTotal">Ventas Total ($)</label>
                                    <input
                                        type="number"
                                        id="ventasTotal"
                                        name="ventasTotal"
                                        value={newVendedor.ventasTotal}
                                        onChange={handleInputChange}
                                        min="0"
                                        placeholder="0"
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="activo"
                                            checked={newVendedor.activo}
                                            onChange={handleInputChange}
                                        />
                                        <span className="checkmark"></span>
                                        Vendedor Activo
                                    </label>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-cancel" onClick={cerrarModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-save">
                                    💾 Guardar Vendedor
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditableTable;
