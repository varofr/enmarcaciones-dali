import React, { useEffect, useState } from 'react';
import '../css/Inventario.css';

function ListaInventario() {
  const [inventario, setInventario] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/inventario')
      .then(res => res.json())
      .then(data => setInventario(data))
      .catch(err => console.error('Error al cargar inventario:', err));
  }, []);

  const handleChange = (e, id, campo) => {
    const nuevoValor = e.target.value;
    const nuevaLista = inventario.map(item =>
      item.id === id ? { ...item, [campo]: nuevoValor } : item
    );
    setInventario(nuevaLista);
  };

  const handleBlur = async (item) => {
    try {
      await fetch(`http://localhost:5000/api/inventario/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      console.log('Cambio guardado');
    } catch (error) {
      console.error('Error al guardar cambio:', error);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Estás seguro que deseas eliminar este ítem?');
    if (!confirmar) return;

    try {
      await fetch(`http://localhost:5000/api/inventario/${id}`, {
        method: 'DELETE'
      });
      setInventario(inventario.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const esStockBajo = (item) => {
    return parseInt(item.stock_actual) < parseInt(item.stock_minimo);
  };

  return (
    <div className="tabla-contenedor">
      <table className="tabla-inventario">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Unidad</th>
            <th>Stock actual</th>
            <th>Stock mínimo</th>
            <th>Precio unitario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventario.map(item => (
            <tr key={item.id} className={esStockBajo(item) ? 'peligro' : ''}>
              <td>{item.nombre}</td>
              <td>{item.descripcion}</td>
              <td>{item.unidad_medida}</td>
              <td>
                <input
                  type="number"
                  value={item.stock_actual}
                  onChange={(e) => handleChange(e, item.id, 'stock_actual')}
                  onBlur={() => handleBlur(item)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.stock_minimo}
                  onChange={(e) => handleChange(e, item.id, 'stock_minimo')}
                  onBlur={() => handleBlur(item)}
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  value={item.precio_unitario}
                  onChange={(e) => handleChange(e, item.id, 'precio_unitario')}
                  onBlur={() => handleBlur(item)}
                />
              </td>
              <td>
                <button className="btn-eliminar" onClick={() => handleEliminar(item.id)}>
                  Eliminar
                </button>
                {esStockBajo(item) && <div className="stock-alerta">⚠ Bajo stock</div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaInventario;
