import React, { useEffect, useState } from 'react';
import '../css/Inventario.css';

function EstadisticaInventario() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/inventario/estadisticas')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Error al cargar estadísticas:', err));
  }, []);

  if (!stats) return <p>Cargando estadísticas...</p>;

  return (
    <div>
      <h2>Estadísticas de Inventario</h2>

      <div className="inventario-form">
        <div style={{ color: 'white' }}>Total de Ítems: {stats.totalItems}</div>
        <div style={{ color: 'white' }}>Total de Unidades en Stock: {stats.totalStock}</div>
        <div style={{ color: 'white' }}>Ítems con Stock Bajo: {stats.bajoStock.length}</div>
      </div>

      <h3>Top Materiales con Mayor Stock</h3>
      <table className="tabla-inventario">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Stock Actual</th>
          </tr>
        </thead>
        <tbody>
          {stats.topAbundantes.map((item, i) => (
            <tr key={i}>
              <td>{item.nombre}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {stats.bajoStock.length > 0 && (
        <>
          <h3>Ítems con Stock Bajo</h3>
          <table className="tabla-inventario">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Stock Actual</th>
                <th>Stock Mínimo</th>
              </tr>
            </thead>
            <tbody>
              {stats.bajoStock.map((item, i) => (
                <tr key={i} className="stock-bajo">
                  <td>{item.nombre}</td>
                  <td>{item.stock_actual}</td>
                  <td>{item.stock_minimo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default EstadisticaInventario;
