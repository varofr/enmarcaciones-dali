import React, { useState } from 'react';
import '../css/Inventario.css';

function InventarioForm({ onSubmit }) {
  const [item, setItem] = useState({
    nombre: '',
    descripcion: '',
    unidad_medida: '',
    stock_actual: '',
    stock_minimo: '',
    precio_unitario: ''
  });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(item);
    setItem({
      nombre: '',
      descripcion: '',
      unidad_medida: '',
      stock_actual: '',
      stock_minimo: '',
      precio_unitario: ''
    });
  };

  return (
    <form className="inventario-form" onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre del ítem" value={item.nombre} onChange={handleChange} />
      <input name="descripcion" placeholder="Descripción" value={item.descripcion} onChange={handleChange} />
      <input name="unidad_medida" placeholder="Unidad de medida" value={item.unidad_medida} onChange={handleChange} />
      <input name="stock_actual" type="number" placeholder="Stock actual" value={item.stock_actual} onChange={handleChange} />
      <input name="stock_minimo" type="number" placeholder="Stock mínimo" value={item.stock_minimo} onChange={handleChange} />
      <input name="precio_unitario" type="number" placeholder="Precio unitario" value={item.precio_unitario} onChange={handleChange} />
      <button type="submit">Guardar</button>
    </form>
  );
}

export default InventarioForm;
