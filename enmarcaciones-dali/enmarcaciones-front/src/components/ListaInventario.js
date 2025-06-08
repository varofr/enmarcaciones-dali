import React, { useEffect, useState } from 'react';
import '../css/Inventario.css';

function ListaInventario() {
  const [inventario, setInventario] = useState([]);

  const cargarInventario = () => {
    fetch('http://localhost:5000/api/inventario')
      .then(res => res.json())
      .then(data => setInventario(data))
      .catch(err => console.error('Error al cargar inventario:', err));
  };

  useEffect(() => {
    cargarInventario();
  }, []);

  const eliminarItem = (id) => {
    fetch(`http://localhost:5000/api/inventario/${id}`, { method: 'DELETE' })
      .then(() => cargarInventario());
  };

  return (
    <table className="tabla-inventario">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Cantidad</th>
          <th>Unidad</th>
          <th>Precio</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {inventario.map(item => (
          <tr key={item.id}>
            <td>{item.nombre}</td>
            <td>{item.tipo}</td>
            <td>{item.cantidad}</td>
            <td>{item.unidad}</td>
            <td>${item.precio_unitario?.toFixed(0)}</td>
            <td>{item.descripcion}</td>
            <td>
              <button onClick={() => eliminarItem(item.id)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListaInventario;
