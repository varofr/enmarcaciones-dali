import React, { useState, useEffect } from 'react';
import '../css/dashboard.css';

function DashboardLayout() {
  const [activeView, setActiveView] = useState('pedidos');
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/pedidos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPedidos(data);
        } else if (Array.isArray(data.data)) {
          setPedidos(data.data);
        } else {
          console.error('Formato inesperado en /pedidos:', data);
        }
      })
      .catch(err => console.error('Error al cargar pedidos:', err));
  }, []);

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const res = await fetch(`http://localhost:5000/api/pedidos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      });
      if (res.ok) {
        const pedidosActualizados = pedidos.map(p =>
          p.id === id ? { ...p, estado: nuevoEstado } : p
        );
        setPedidos(pedidosActualizados);
      } else {
        console.error('Error al actualizar estado');
      }
    } catch (err) {
      console.error('Error al hacer PUT:', err);
    }
  };

  const renderPedidos = () => (
    <>
      <h2>Pedidos Registrados</h2>
      <table className="tabla">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Medidas</th>
            <th>Moldura</th>
            <th>Precio</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Actualizar Estado</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(p => (
            <tr key={p.id}>
              <td>{p.cliente}</td>
              <td>{p.alto} x {p.ancho} cm</td>
              <td>{p.tipo_moldura}</td>
              <td>${Number(p.precio_total).toLocaleString('es-CL', { maximumFractionDigits: 0 })}</td>
              <td>{new Date(p.fecha).toLocaleDateString()}</td>
              <td>{p.estado}</td>
              <td>
                <button onClick={() => actualizarEstado(p.id, 'producción')}>Producción</button>
                <button onClick={() => actualizarEstado(p.id, 'listo para retiro')}>Listo</button>
                <button onClick={() => actualizarEstado(p.id, 'entregado')}>Entregado</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <div className="dashboard">
      <nav className="navbar">
        <button onClick={() => setActiveView('pedidos')}>Pedidos</button>
      </nav>
      <main>
        {activeView === 'pedidos' && renderPedidos()}
      </main>
    </div>
  );
}

export default DashboardLayout;
