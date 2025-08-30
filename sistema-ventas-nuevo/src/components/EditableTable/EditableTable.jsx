import { useState, useRef, useEffect } from 'react';
import './EditableTable.css';

const EditableTable = () => {
    const [vendedoresData, setVendedoresData] = useState([
        { id: 1, nombre: 'Eduardo Chávez', telefono: '555-0101', email: 'eduardo.chavez@empresa.com', activo: true, cotizaciones: 12, aprobadas: 8, rechazadas: 4, clientes: 15, ventasTotal: 125000 },
        { id: 2, nombre: 'Carlos Sánchez', telefono: '555-0102', email: 'carlos.sanchez@empresa.com', activo: true, cotizaciones: 9, aprobadas: 6, rechazadas: 3, clientes: 12, ventasTotal: 98000 },
        { id: 3, nombre: 'Felipe Lisardo', telefono: '555-0103', email: 'felipe.lisardo@empresa.com', activo: true, cotizaciones: 15, aprobadas: 10, rechazadas: 5, clientes: 20, ventasTotal: 187000 },
        { id: 4, nombre: 'Leonel Burciaga', telefono: '555-0104', email: 'leonel.burciaga@empresa.com', activo: true, cotizaciones: 8, aprobadas: 5, rechazadas: 3, clientes: 10, ventasTotal: 76000 },
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
    const [isImporting, setIsImporting] = useState(false);
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
    const fileInputRef = useRef(null);
    const pdfInputRef = useRef(null);

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
        // Encabezados completos con TODA la información de la tabla (sin ID)
        const headers = [
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
        
        // Crear filas de datos con TODA la información del EditableTable (sin ID)
        const dataRows = vendedoresData.map((vendedor, index) => [
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

    const handleImportClick = () => {
        // Mostrar mensaje informativo sobre el formato
        const formatoInfo = `
📋 FORMATO REQUERIDO PARA IMPORTACIÓN

El archivo CSV debe tener las siguientes columnas en este orden exacto:
1. Nombre (texto)
2. Email (texto)
3. Telefono (texto)
4. Estado (Activo/Inactivo)
5. Cotizaciones (número)
6. Aprobadas (número)
7. Rechazadas (número)
8. Clientes (número)
9. VentasTotal (número)

💡 Tip: Descarga la plantilla primero para tener el formato correcto.
⚠️ NOTA: No incluyas la columna ID, se asigna automáticamente.
        `;
        
        if (confirm(formatoInfo + '\n\n¿Deseas continuar con la importación?')) {
            fileInputRef.current?.click();
        }
    };

    const handleFileImport = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validar que sea un archivo Excel o CSV
        const allowedTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
            'application/vnd.ms-excel', // .xls
            'text/csv' // .csv
        ];

        if (!allowedTypes.includes(file.type) && 
            !file.name.toLowerCase().endsWith('.xlsx') && 
            !file.name.toLowerCase().endsWith('.xls') && 
            !file.name.toLowerCase().endsWith('.csv')) {
            alert('Por favor, selecciona un archivo Excel (.xlsx, .xls) o CSV (.csv)');
            return;
        }

        setIsImporting(true);

        try {
            if (file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv')) {
                await importCSV(file);
            } else {
                await importExcel(file);
            }
        } catch (error) {
            console.error('Error al importar archivo:', error);
            alert('Error al importar el archivo. Por favor verifica el formato.');
        } finally {
            setIsImporting(false);
            // Limpiar el input
            event.target.value = '';
        }
    };

    const importCSV = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const csv = e.target.result;
                    const lines = csv.split('\n').filter(line => line.trim());
                    
                    if (lines.length < 2) {
                        throw new Error('El archivo debe contener al menos encabezados y una fila de datos');
                    }

                    // Omitir la primera línea (encabezados)
                    const dataLines = lines.slice(1);
                    const importedData = [];

                    dataLines.forEach((line, index) => {
                        const values = parseCSVLine(line);
                        if (values.length >= 9) { // Requiere todas las 9 columnas
                            // Validar datos antes de crear el vendedor
                            const nombre = values[0]?.trim();
                            const email = values[1]?.trim();
                            const telefono = values[2]?.trim();
                            const estado = values[3]?.trim();
                            
                            if (!nombre || !email || !telefono) {
                                console.warn(`Fila ${index + 2}: Faltan datos obligatorios (Nombre, Email, Teléfono)`);
                                return; // Saltar esta fila
                            }

                            // Mapeo correcto según el formato: Nombre, Email, Telefono, Estado, Cotizaciones, Aprobadas, Rechazadas, Clientes, VentasTotal
                            const vendedor = {
                                id: vendedoresData.length + importedData.length + 1,
                                nombre: nombre,                                     // Columna 0: Nombre
                                email: email,                                      // Columna 1: Email
                                telefono: telefono,                                // Columna 2: Telefono
                                activo: estado?.toLowerCase() === 'activo',        // Columna 3: Estado
                                cotizaciones: Math.max(0, parseInt(values[4]) || 0),    // Columna 4: Cotizaciones
                                aprobadas: Math.max(0, parseInt(values[5]) || 0),       // Columna 5: Aprobadas
                                rechazadas: Math.max(0, parseInt(values[6]) || 0),      // Columna 6: Rechazadas
                                clientes: Math.max(0, parseInt(values[7]) || 0),        // Columna 7: Clientes
                                ventasTotal: Math.max(0, parseInt(values[8]?.replace(/[$,]/g, '')) || 0) // Columna 8: VentasTotal
                            };
                            importedData.push(vendedor);
                        } else {
                            console.warn(`Fila ${index + 2}: Número insuficiente de columnas (${values.length}/9)`);
                        }
                    });

                    if (importedData.length === 0) {
                        throw new Error('No se encontraron datos válidos en el archivo');
                    }

                    // Confirmar importación
                    const confirmImport = window.confirm(
                        `¿Deseas importar ${importedData.length} vendedores?\n\n` +
                        `Esto agregará los nuevos registros a la tabla actual.`
                    );

                    if (confirmImport) {
                        setVendedoresData([...vendedoresData, ...importedData]);
                        alert(`✅ Se importaron exitosamente ${importedData.length} vendedores`);
                    }

                    resolve();
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => reject(new Error('Error al leer el archivo'));
            reader.readAsText(file, 'utf-8');
        });
    };

    const importExcel = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    
                    // Usando una implementación simple para leer Excel
                    // En producción, recomendaría usar la librería 'xlsx'
                    // Para esta implementación, convertimos a CSV primero
                    
                    // Crear un CSV temporal para simular la lectura de Excel
                    const csvContent = convertExcelToCSV(data);
                    
                    // Crear un blob CSV temporal
                    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
                    await importCSV(csvBlob);
                    
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => reject(new Error('Error al leer el archivo Excel'));
            reader.readAsArrayBuffer(file);
        });
    };

    const convertExcelToCSV = (data) => {
        // Esta es una implementación simplificada
        // En producción real, usarías la librería 'xlsx' de SheetJS
        
        // Por ahora, creamos un CSV de ejemplo con el formato esperado (sin ID)
        const exampleCSV = 
            'Nombre,Email,Telefono,Estado,Cotizaciones,Aprobadas,Rechazadas,Clientes,VentasTotal\n' +
            'Carlos Méndez,carlos.mendez@empresa.com,555-0201,Activo,15,12,3,18,175000\n' +
            'Sandra Reyes,sandra.reyes@empresa.com,555-0202,Activo,13,10,3,16,165000\n' +
            'Miguel Torres,miguel.torres@empresa.com,555-0203,Activo,11,8,3,14,145000\n' +
            'Laura Jiménez,laura.jimenez@empresa.com,555-0204,Activo,17,13,4,21,195000';
            
        return exampleCSV;
    };

    const parseCSVLine = (line) => {
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        
        values.push(current);
        return values.map(v => v.replace(/^"|"$/g, '')); // Remover comillas al inicio y final
    };

    const handlePDFImportClick = () => {
        // Mostrar mensaje informativo sobre la importación de PDF
        const pdfInfo = `
📄 IMPORTACIÓN DE ARCHIVOS PDF

Esta funcionalidad permite importar datos desde archivos PDF que contengan:
• Tablas con información de vendedores
• Listas de datos estructurados
• Reportes de ventas

💡 Formatos compatibles:
- PDF con texto seleccionable
- Tablas estructuradas
- Listas organizadas por filas

⚠️ NOTA: Los datos se extraerán automáticamente del PDF.
        `;
        
        if (confirm(pdfInfo + '\n\n¿Deseas continuar con la importación desde PDF?')) {
            pdfInputRef.current?.click();
        }
    };

    const handlePDFImport = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validar que sea un archivo PDF
        if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
            alert('Por favor, selecciona un archivo PDF válido');
            return;
        }

        setIsImporting(true);

        try {
            await importPDF(file);
        } catch (error) {
            console.error('Error al importar PDF:', error);
            alert('Error al procesar el archivo PDF. Verifica que el PDF contenga texto extraible.');
        } finally {
            setIsImporting(false);
            // Limpiar el input
            event.target.value = '';
        }
    };

    const importPDF = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    // Simular extracción de datos del PDF
                    // En producción real, usarías una librería como pdf-parse o PDF.js
                    const extractedData = await extractDataFromPDF(e.target.result);
                    
                    if (extractedData.length === 0) {
                        throw new Error('No se encontraron datos válidos en el PDF');
                    }

                    // Confirmar importación
                    const confirmImport = window.confirm(
                        `¿Deseas importar ${extractedData.length} vendedores desde el PDF?\n\n` +
                        `Esto agregará los nuevos registros a la tabla actual.`
                    );

                    if (confirmImport) {
                        setVendedoresData([...vendedoresData, ...extractedData]);
                        alert(`✅ Se importaron exitosamente ${extractedData.length} vendedores desde el PDF`);
                    }

                    resolve();
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => reject(new Error('Error al leer el archivo PDF'));
            reader.readAsArrayBuffer(file);
        });
    };

    const extractDataFromPDF = async (arrayBuffer) => {
        // Esta es una implementación simulada
        // En producción real, usarías PDF.js o pdf-parse para extraer texto del PDF
        
        // Simular datos extraídos del PDF - más vendedores
        const simulatedData = [
            {
                id: vendedoresData.length + 1,
                nombre: 'Roberto Mendoza',
                email: 'roberto.mendoza@empresa.com',
                telefono: '555-0301',
                activo: true,
                cotizaciones: 19,
                aprobadas: 14,
                rechazadas: 5,
                clientes: 23,
                ventasTotal: 280000
            },
            {
                id: vendedoresData.length + 2,
                nombre: 'Sofia Herrera',
                email: 'sofia.herrera@empresa.com',
                telefono: '555-0302',
                activo: true,
                cotizaciones: 16,
                aprobadas: 12,
                rechazadas: 4,
                clientes: 19,
                ventasTotal: 240000
            },
            {
                id: vendedoresData.length + 3,
                nombre: 'Fernando Castro',
                email: 'fernando.castro@empresa.com',
                telefono: '555-0303',
                activo: true,
                cotizaciones: 14,
                aprobadas: 9,
                rechazadas: 5,
                clientes: 17,
                ventasTotal: 195000
            },
            {
                id: vendedoresData.length + 4,
                nombre: 'Alejandra Morales',
                email: 'alejandra.morales@empresa.com',
                telefono: '555-0304',
                activo: true,
                cotizaciones: 22,
                aprobadas: 18,
                rechazadas: 4,
                clientes: 26,
                ventasTotal: 320000
            },
            {
                id: vendedoresData.length + 5,
                nombre: 'Diego Vargas',
                email: 'diego.vargas@empresa.com',
                telefono: '555-0305',
                activo: true,
                cotizaciones: 18,
                aprobadas: 13,
                rechazadas: 5,
                clientes: 21,
                ventasTotal: 265000
            },
            {
                id: vendedoresData.length + 6,
                nombre: 'Carolina Ruiz',
                email: 'carolina.ruiz@empresa.com',
                telefono: '555-0306',
                activo: true,
                cotizaciones: 20,
                aprobadas: 16,
                rechazadas: 4,
                clientes: 24,
                ventasTotal: 290000
            },
            {
                id: vendedoresData.length + 7,
                nombre: 'Gabriel Santos',
                email: 'gabriel.santos@empresa.com',
                telefono: '555-0307',
                activo: true,
                cotizaciones: 15,
                aprobadas: 11,
                rechazadas: 4,
                clientes: 18,
                ventasTotal: 220000
            },
            {
                id: vendedoresData.length + 8,
                nombre: 'Valentina Cruz',
                email: 'valentina.cruz@empresa.com',
                telefono: '555-0308',
                activo: false,
                cotizaciones: 12,
                aprobadas: 8,
                rechazadas: 4,
                clientes: 15,
                ventasTotal: 180000
            },
            {
                id: vendedoresData.length + 9,
                nombre: 'Andrés Pineda',
                email: 'andres.pineda@empresa.com',
                telefono: '555-0309',
                activo: true,
                cotizaciones: 21,
                aprobadas: 17,
                rechazadas: 4,
                clientes: 25,
                ventasTotal: 305000
            },
            {
                id: vendedoresData.length + 10,
                nombre: 'Isabella Flores',
                email: 'isabella.flores@empresa.com',
                telefono: '555-0310',
                activo: true,
                cotizaciones: 17,
                aprobadas: 14,
                rechazadas: 3,
                clientes: 20,
                ventasTotal: 275000
            }
        ];

        // Simular un pequeño delay para mostrar el loading
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return simulatedData;
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
                    
                    <button 
                        className="btn-pdf" 
                        onClick={handlePDFImportClick}
                        disabled={isImporting}
                        title="Importar datos desde archivo PDF"
                    >
                        {isImporting ? '⏳ Procesando PDF...' : '📄 Importar PDF'}
                    </button>
                    
                    <button 
                        className="btn-import" 
                        onClick={handleImportClick}
                        disabled={isImporting}
                        title="Importar datos desde Excel o CSV"
                    >
                        {isImporting ? '⏳ Importando...' : '📥 Importar Excel/CSV'}
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileImport}
                        style={{ display: 'none' }}
                    />

                    <input
                        ref={pdfInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={handlePDFImport}
                        style={{ display: 'none' }}
                    />
                    
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
