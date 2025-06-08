import React, { useState, useEffect } from 'react';
import '../css/Pedidos.css';

function ListaPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [ordenCampo, setOrdenCampo] = useState('');
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  // 🔄 Cargar pedidos desde el backend
  const cargarPedidos = () => {
    fetch('http://localhost:5000/api/pedidos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPedidos(data);
        else if (Array.isArray(data.data)) setPedidos(data.data);
        else console.error('Formato inesperado:', data);
      })
      .catch(err => console.error('Error al cargar pedidos:', err));
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  // ✅ Formatear el texto del estado (primera letra mayúscula)
  const formatearEstado = (estado) =>
    estado ? estado.charAt(0).toUpperCase() + estado.slice(1) : '';

  // 🎨 Color por tipo de estado
  const colorEstado = (estado) => {
    switch (estado) {
      case 'pendiente':
        return '#b0b0b0';
      case 'producción':
        return '#007bff';
      case 'listo para retiro':
        return '#ff9800';
      case 'entregado':
        return '#4caf50';
      default:
        return '#ccc';
    }
  };

  // 🔁 Ordenamiento por campo
  const ordenarPedidos = (campo) => {
    const esMismoCampo = ordenCampo === campo;
    const nuevaDireccion = esMismoCampo ? !ordenAscendente : true;

    const pedidosOrdenados = [...pedidos].sort((a, b) => {
      const aVal = a[campo]?.toString().toLowerCase();
      const bVal = b[campo]?.toString().toLowerCase();

      if (aVal < bVal) return nuevaDireccion ? -1 : 1;
      if (aVal > bVal) return nuevaDireccion ? 1 : -1;
      return 0;
    });

    setPedidos(pedidosOrdenados);
    setOrdenCampo(campo);
    setOrdenAscendente(nuevaDireccion);
  };

  // 🔄 PUT para actualizar estado del pedido
  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const res = await fetch(`http://localhost:5000/api/pedidos/${id}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      });
      if (res.ok) cargarPedidos();
      else console.error('Error al actualizar estado');
    } catch (err) {
      console.error('Error al hacer PUT:', err);
    }
  };

  return (
    <div className="lista-pedidos-container">
      {pedidos.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        <table className="tabla tabla-pedidos">
          <thead>
            <tr>
              <th onClick={() => ordenarPedidos('cliente')} style={{ cursor: 'pointer' }}>
                Cliente {ordenCampo === 'cliente' ? (ordenAscendente ? '▲' : '▼') : ''}
              </th>
              <th>Medidas</th>
              <th onClick={() => ordenarPedidos('tipo_moldura')} style={{ cursor: 'pointer' }}>
                Moldura {ordenCampo === 'tipo_moldura' ? (ordenAscendente ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => ordenarPedidos('precio_total')} style={{ cursor: 'pointer' }}>
                Precio {ordenCampo === 'precio_total' ? (ordenAscendente ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => ordenarPedidos('fecha')} style={{ cursor: 'pointer' }}>
                Fecha {ordenCampo === 'fecha' ? (ordenAscendente ? '▲' : '▼') : ''}
              </th>
              <th className="estado-columna" onClick={() => ordenarPedidos('estado')} style={{ cursor: 'pointer' }}>
                Estado {ordenCampo === 'estado' ? (ordenAscendente ? '▲' : '▼') : ''}
              </th>
              <th className="acciones-columna">Actualizar Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(pedido => (
              <tr key={pedido.id}>
                <td>{pedido.cliente}</td>
                <td>{pedido.alto} x {pedido.ancho} cm</td>
                <td>{pedido.tipo_moldura}</td>
                <td>${Number(pedido.precio_total).toLocaleString('es-CL', { maximumFractionDigits: 0 })}</td>
                <td>{new Date(pedido.fecha).toLocaleDateString()}</td>
                <td className="estado-columna">
                  <span
                    style={{
                      backgroundColor: colorEstado(pedido.estado),
                      color: '#fff',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}
                  >
                    {formatearEstado(pedido.estado)}
                  </span>
                </td>
                <td className="acciones-columna estado-btns">
                  <button onClick={() => actualizarEstado(pedido.id, 'producción')}>Producción</button>
                  <button onClick={() => actualizarEstado(pedido.id, 'listo para retiro')}>Listo</button>
                  <button onClick={() => actualizarEstado(pedido.id, 'entregado')}>Entregado</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaPedidos;
