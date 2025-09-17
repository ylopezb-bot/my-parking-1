import React, { useState, useEffect } from 'react';
import { Car, Plus, Minus, RotateCcw, Clock, Calendar, History } from 'lucide-react';

const ParkingManagementSystem = () => {
  // Estados para el formulario
  const [formData, setFormData] = useState({
    placa: '',
    tipoVehiculo: 'carro',
    horaIngreso: '',
    valorMatricula: '',
    numeroFactura: ''
  });

  // Estados para la gestión de vehículos
  const [vehiculosActivos, setVehiculosActivos] = useState([]);
  const [historialVehiculos, setHistorialVehiculos] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  // Inicializar hora actual
  useEffect(() => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    setFormData(prev => ({ ...prev, horaIngreso: timeString }));
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Generar ID único
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Ingresar vehículo
  const ingresarVehiculo = () => {
    if (!formData.placa || !formData.horaIngreso || !formData.valorMatricula || !formData.numeroFactura) {
      alert('Por favor, complete todos los campos requeridos');
      return;
    }

    // Verificar si la placa ya está en el parqueadero
    if (vehiculosActivos.some(v => v.placa.toLowerCase() === formData.placa.toLowerCase())) {
      alert('Esta placa ya se encuentra en el parqueadero');
      return;
    }

    const nuevoVehiculo = {
      id: generateId(),
      ...formData,
      fechaIngreso: new Date().toLocaleDateString('es-CO'),
      horaIngresoCompleta: new Date().toLocaleString('es-CO'),
      estado: 'activo'
    };

    setVehiculosActivos(prev => [...prev, nuevoVehiculo]);
    limpiarCasillas();
    alert('Vehículo ingresado exitosamente');
  };

  // Sacar vehículo
  const sacarVehiculo = () => {
    if (!formData.placa) {
      alert('Por favor, ingrese la placa del vehículo a retirar');
      return;
    }

    const vehiculoIndex = vehiculosActivos.findIndex(
      v => v.placa.toLowerCase() === formData.placa.toLowerCase()
    );

    if (vehiculoIndex === -1) {
      alert('No se encontró un vehículo con esta placa en el parqueadero');
      return;
    }

    const vehiculo = vehiculosActivos[vehiculoIndex];
    const vehiculoSalida = {
      ...vehiculo,
      horaSalida: new Date().toLocaleString('es-CO'),
      estado: 'retirado'
    };

    // Mover al historial
    setHistorialVehiculos(prev => [vehiculoSalida, ...prev]);
    
    // Remover de vehículos activos
    setVehiculosActivos(prev => prev.filter((_, index) => index !== vehiculoIndex));
    
    limpiarCasillas();
    alert('Vehículo retirado exitosamente');
  };

  // Limpiar casillas
  const limpiarCasillas = () => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    setFormData({
      placa: '',
      tipoVehiculo: 'carro',
      horaIngreso: timeString,
      valorMatricula: '',
      numeroFactura: ''
    });
  };

  // Filtrar vehículos del día actual
  const vehiculosHoy = vehiculosActivos.filter(
    vehiculo => vehiculo.fechaIngreso === new Date().toLocaleDateString('es-CO')
  );

  // Estilos CSS en JavaScript
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
    },
    maxWidth: {
      maxWidth: '1280px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    title: {
      fontSize: '36px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '16px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: '32px'
    },
    formContainer: {
      position: 'sticky',
      top: '24px',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      padding: '24px',
      height: 'fit-content'
    },
    formTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    formFields: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    formField: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '8px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    inputFocus: {
      boxShadow: '0 0 0 2px #3b82f6',
      borderColor: 'transparent'
    },
    inputWithIcon: {
      position: 'relative'
    },
    inputIcon: {
      position: 'absolute',
      left: '12px',
      top: '8px',
      color: '#6b7280',
      pointerEvents: 'none'
    },
    inputPadded: {
      paddingLeft: '32px'
    },
    radioGroup: {
      display: 'flex',
      gap: '16px'
    },
    radioOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer'
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      paddingTop: '16px'
    },
    button: {
      width: '100%',
      padding: '12px 16px',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '500',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    },
    buttonGreen: {
      backgroundColor: '#059669',
      color: 'white'
    },
    buttonRed: {
      backgroundColor: '#dc2626',
      color: 'white'
    },
    buttonGray: {
      backgroundColor: '#4b5563',
      color: 'white'
    },
    buttonPurple: {
      backgroundColor: '#7c3aed',
      color: 'white'
    },
    mainContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px'
    },
    statCard: {
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '16px',
      borderLeft: '4px solid'
    },
    statCardBlue: {
      borderLeftColor: '#3b82f6'
    },
    statCardGreen: {
      borderLeftColor: '#10b981'
    },
    statCardPurple: {
      borderLeftColor: '#8b5cf6'
    },
    statContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    statIcon: {
      padding: '12px',
      borderRadius: '50%'
    },
    statIconBlue: {
      backgroundColor: '#dbeafe',
      color: '#3b82f6'
    },
    statIconGreen: {
      backgroundColor: '#d1fae5',
      color: '#10b981'
    },
    statIconPurple: {
      backgroundColor: '#ede9fe',
      color: '#8b5cf6'
    },
    statText: {
      display: 'flex',
      flexDirection: 'column'
    },
    statLabel: {
      fontSize: '14px',
      color: '#6b7280'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1f2937'
    },
    tableSection: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      padding: '24px'
    },
    tableHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      flexWrap: 'wrap',
      gap: '16px'
    },
    tableTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    tableContainer: {
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeaderRow: {
      backgroundColor: '#f9fafb'
    },
    th: {
      padding: '12px 16px',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      borderBottom: '1px solid #e5e7eb'
    },
    tr: {
      transition: 'background-color 0.2s ease'
    },
    trHover: {
      backgroundColor: '#f9fafb'
    },
    td: {
      padding: '12px 16px',
      fontSize: '14px',
      color: '#6b7280',
      borderBottom: '1px solid #e5e7eb'
    },
    tdBold: {
      fontWeight: '500',
      color: '#111827'
    },
    vehicleTypeCell: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    statusBadge: {
      display: 'inline-flex',
      padding: '4px 8px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '500',
      border: '1px solid'
    },
    statusActive: {
      backgroundColor: '#dcfce7',
      color: '#166534',
      borderColor: '#bbf7d0'
    },
    statusRetired: {
      backgroundColor: '#f3f4f6',
      color: '#374151',
      borderColor: '#d1d5db'
    },
    emptyState: {
      textAlign: 'center',
      padding: '48px 16px'
    },
    emptyIcon: {
      color: '#9ca3af',
      margin: '0 auto 16px'
    },
    emptyTitle: {
      color: '#6b7280',
      fontSize: '18px',
      marginBottom: '8px'
    },
    emptySubtitle: {
      color: '#9ca3af',
      fontSize: '14px'
    },
    summarySection: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      borderRadius: '12px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      padding: '24px',
      color: 'white'
    },
    summaryTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '8px'
    },
    summaryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px'
    },
    summaryItem: {
      display: 'flex',
      flexDirection: 'column'
    },
    summaryLabel: {
      color: '#bfdbfe',
      fontSize: '14px'
    },
    summaryValue: {
      fontSize: '24px',
      fontWeight: '700'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Sistema de Gestión de Parqueadero</h1>
          <p style={styles.subtitle}>Administra el ingreso y salida de vehículos de manera eficiente</p>
        </div>

        <div style={styles.grid}>
          {/* Formulario Lateral */}
          <div>
            <div style={styles.formContainer}>
              <h2 style={styles.formTitle}>
                <Car style={{color: '#2563eb'}} />
                Registro de Vehículos
              </h2>

              <div style={styles.formFields}>
                {/* Placa */}
                <div style={styles.formField}>
                  <label style={styles.label}>
                    Placa del Vehículo *
                  </label>
                  <input
                    type="text"
                    name="placa"
                    value={formData.placa}
                    onChange={handleInputChange}
                    placeholder="Ej: ABC123"
                    style={{...styles.input, textTransform: 'uppercase'}}
                  />
                </div>

                {/* Tipo de Vehículo */}
                <div style={styles.formField}>
                  <label style={styles.label}>
                    Tipo de Vehículo *
                  </label>
                  <div style={styles.radioGroup}>
                    <label style={styles.radioOption}>
                      <input
                        type="radio"
                        name="tipoVehiculo"
                        value="carro"
                        checked={formData.tipoVehiculo === 'carro'}
                        onChange={handleInputChange}
                      />
                      <Car style={{color: '#2563eb'}} size={20} />
                      <span>Carro</span>
                    </label>
                    <label style={styles.radioOption}>
                      <input
                        type="radio"
                        name="tipoVehiculo"
                        value="moto"
                        checked={formData.tipoVehiculo === 'moto'}
                        onChange={handleInputChange}
                      />
                      <span style={{color: '#16a34a', fontWeight: 'bold', fontSize: '20px'}}>🏍️</span>
                      <span>Moto</span>
                    </label>
                  </div>
                </div>

                {/* Hora de Ingreso */}
                <div style={styles.formField}>
                  <label style={styles.label}>
                    Hora de Ingreso *
                  </label>
                  <input
                    type="time"
                    name="horaIngreso"
                    value={formData.horaIngreso}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </div>

                {/* Valor Matrícula */}
                <div style={styles.formField}>
                  <label style={styles.label}>
                    Valor de la Matrícula *
                  </label>
                  <div style={styles.inputWithIcon}>
                    <span style={styles.inputIcon}>$</span>
                    <input
                      type="number"
                      name="valorMatricula"
                      value={formData.valorMatricula}
                      onChange={handleInputChange}
                      placeholder="5000"
                      min="0"
                      style={{...styles.input, ...styles.inputPadded}}
                    />
                  </div>
                </div>

                {/* Número de Factura */}
                <div style={styles.formField}>
                  <label style={styles.label}>
                    Número de Factura *
                  </label>
                  <input
                    type="text"
                    name="numeroFactura"
                    value={formData.numeroFactura}
                    onChange={handleInputChange}
                    placeholder="Ej: F001-123"
                    style={styles.input}
                  />
                </div>

                {/* Botones */}
                <div style={styles.buttonContainer}>
                  <button
                    onClick={ingresarVehiculo}
                    style={{...styles.button, ...styles.buttonGreen}}
                  >
                    <Plus size={20} />
                    Ingresar Vehículo
                  </button>
                  
                  <button
                    onClick={sacarVehiculo}
                    style={{...styles.button, ...styles.buttonRed}}
                  >
                    <Minus size={20} />
                    Sacar Vehículo
                  </button>
                  
                  <button
                    onClick={limpiarCasillas}
                    style={{...styles.button, ...styles.buttonGray}}
                  >
                    <RotateCcw size={20} />
                    Limpiar Casillas
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido Principal */}
          <div style={styles.mainContent}>
            {/* Estadísticas */}
            <div style={styles.statsGrid}>
              <div style={{...styles.statCard, ...styles.statCardBlue}}>
                <div style={styles.statContent}>
                  <div style={{...styles.statIcon, ...styles.statIconBlue}}>
                    <Car size={24} />
                  </div>
                  <div style={styles.statText}>
                    <p style={styles.statLabel}>Vehículos Activos</p>
                    <p style={styles.statValue}>{vehiculosActivos.length}</p>
                  </div>
                </div>
              </div>
              
              <div style={{...styles.statCard, ...styles.statCardGreen}}>
                <div style={styles.statContent}>
                  <div style={{...styles.statIcon, ...styles.statIconGreen}}>
                    <Calendar size={24} />
                  </div>
                  <div style={styles.statText}>
                    <p style={styles.statLabel}>Ingresos Hoy</p>
                    <p style={styles.statValue}>{vehiculosHoy.length}</p>
                  </div>
                </div>
              </div>
              
              <div style={{...styles.statCard, ...styles.statCardPurple}}>
                <div style={styles.statContent}>
                  <div style={{...styles.statIcon, ...styles.statIconPurple}}>
                    <History size={24} />
                  </div>
                  <div style={styles.statText}>
                    <p style={styles.statLabel}>Historial Total</p>
                    <p style={styles.statValue}>{historialVehiculos.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehículos del Día */}
            <div style={styles.tableSection}>
              <div style={styles.tableHeader}>
                <h3 style={styles.tableTitle}>
                  <Clock style={{color: '#2563eb'}} />
                  {mostrarHistorial ? 'Historial Completo' : `Vehículos del Día (${new Date().toLocaleDateString('es-CO')})`}
                </h3>
                <button
                  onClick={() => setMostrarHistorial(!mostrarHistorial)}
                  style={{...styles.button, ...styles.buttonPurple, width: 'auto'}}
                >
                  <History size={16} />
                  {mostrarHistorial ? 'Ver Activos' : 'Ver Historial'}
                </button>
              </div>

              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead style={styles.tableHeaderRow}>
                    <tr>
                      <th style={styles.th}>Placa</th>
                      <th style={styles.th}>Tipo</th>
                      <th style={styles.th}>Hora Ingreso</th>
                      <th style={styles.th}>Valor</th>
                      <th style={styles.th}>Factura</th>
                      <th style={styles.th}>Estado</th>
                      {mostrarHistorial && <th style={styles.th}>Hora Salida</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {(mostrarHistorial ? historialVehiculos : vehiculosHoy).map((vehiculo) => (
                      <tr key={vehiculo.id} style={styles.tr}>
                        <td style={{...styles.td, ...styles.tdBold}}>
                          {vehiculo.placa}
                        </td>
                        <td style={styles.td}>
                          <div style={styles.vehicleTypeCell}>
                            {vehiculo.tipoVehiculo === 'carro' ? (
                              <Car style={{color: '#2563eb'}} size={16} />
                            ) : (
                              <span style={{color: '#16a34a', fontSize: '18px'}}>🏍️</span>
                            )}
                            <span style={{textTransform: 'capitalize'}}>{vehiculo.tipoVehiculo}</span>
                          </div>
                        </td>
                        <td style={styles.td}>{vehiculo.horaIngreso}</td>
                        <td style={styles.td}>
                          <span style={{fontWeight: '500'}}>${Number(vehiculo.valorMatricula).toLocaleString()}</span>
                        </td>
                        <td style={styles.td}>{vehiculo.numeroFactura}</td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.statusBadge,
                            ...(vehiculo.estado === 'activo' ? styles.statusActive : styles.statusRetired)
                          }}>
                            {vehiculo.estado === 'activo' ? 'En Parqueadero' : 'Retirado'}
                          </span>
                        </td>
                        {mostrarHistorial && (
                          <td style={styles.td}>{vehiculo.horaSalida || 'N/A'}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {(mostrarHistorial ? historialVehiculos : vehiculosHoy).length === 0 && (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>
                      {mostrarHistorial ? (
                        <History size={48} />
                      ) : (
                        <Calendar size={48} />
                      )}
                    </div>
                    <p style={styles.emptyTitle}>
                      {mostrarHistorial 
                        ? 'No hay vehículos en el historial' 
                        : 'No hay vehículos registrados para el día de hoy'
                      }
                    </p>
                    <p style={styles.emptySubtitle}>
                      {!mostrarHistorial && 'Los vehículos aparecerán aquí una vez que los ingreses'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Resumen Final */}
            {vehiculosActivos.length > 0 && (
              <div style={styles.summarySection}>
                <h4 style={styles.summaryTitle}>Resumen del Parqueadero</h4>
                <div style={styles.summaryGrid}>
                  <div style={styles.summaryItem}>
                    <p style={styles.summaryLabel}>Total de vehículos activos:</p>
                    <p style={styles.summaryValue}>{vehiculosActivos.length}</p>
                  </div>
                  <div style={styles.summaryItem}>
                    <p style={styles.summaryLabel}>Ingresos estimados hoy:</p>
                    <p style={styles.summaryValue}>
                      ${vehiculosHoy.reduce((total, vehiculo) => total + Number(vehiculo.valorMatricula), 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingManagementSystem;