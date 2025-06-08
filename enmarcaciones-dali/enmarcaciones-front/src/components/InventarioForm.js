import React, { useState } from 'react';
import '../css/Inventario.css';

function InventarioForm({ onSubmit }) {
  const [item, setItem] = useState({
    nombre: '',
    tipo: 'moldura',
    cantidad: 0,
    unidad: 'unidad',
    precio_unitario: 0,
    descripcion: '',
  });

  const handleChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(item);
    setItem({ nombre: '', tipo: 'moldura', cantidad: 0, unidad: 'unidad', precio_unitario: 0, descripcion: '' });
  };

  return (
    <form className="inventario-form" onSubmit={handleSubmit}>
      <input name="nombre" value={item.nombre} onChange={handleChange} placeholder="Nombre del ítem" required />
      <select name="tipo" value={item.tipo} onChange={handleChange}>
        <option value="moldura">Moldura</option>
        <option value="marco">Marco Terminado</option>
        <option value="insumo">Insumo</option>
      </select>
      <input name="cantidad" type="number" value={item.cantidad} onChange={handleChange} placeholder="Cantidad" />
      <input name="unidad" value={item.unidad} onChange={handleChange} placeholder="Unidad (ej: m, unidad)" />
      <input name="precio_unitario" type="number" value={item.precio_unitario} onChange={handleChange} placeholder="Precio unitario" />
      <input name="descripcion" value={item.descripcion} onChange={handleChange} placeholder="Descripción" />
      <button type="submit">Guardar</button>
    </form>
  );
}

export default InventarioForm;
