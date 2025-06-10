import React, { useState } from 'react';
import '../css/PedidoForm.css';

function PedidoForm({ onSubmit, clientes }) {
  const [pedido, setPedido] = useState({
    cliente_id: '',
    alto: '',
    ancho: '',
    tipo_moldura: '',
    precio_total: 0
  });

  const molduras = [
    { tipo: 'dorada', imagen: '/Images/Molduras/dorada.jpg', precio: 95 },
    { tipo: 'negra', imagen: '/Images/Molduras/negra.jpg', precio: 72 },
    { tipo: 'greca', imagen: '/Images/Molduras/greca.jpg', precio: 110 },
    { tipo: 'plateada', imagen: '/Images/Molduras/plateada.jpg', precio: 85 },
    // Puedes agregar más molduras aquí
  ];

  const calcularPrecio = (alto, ancho, tipoMoldura) => {
    const altoCm = parseFloat(alto || 0);
    const anchoCm = parseFloat(ancho || 0);
    const moldura = molduras.find(m => m.tipo === tipoMoldura);
    const precioUnitario = moldura ? moldura.precio : 72;
    return Math.round((altoCm + anchoCm) * precioUnitario);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let alto = pedido.alto;
    let ancho = pedido.ancho;
    let tipo = pedido.tipo_moldura;

    if (name === 'alto') alto = value;
    if (name === 'ancho') ancho = value;

    const nuevoPedido = {
      ...pedido,
      [name]: value,
      precio_total: calcularPrecio(alto, ancho, tipo)
    };

    setPedido(nuevoPedido);
  };

  const handleMolduraClick = (tipo) => {
    const { alto, ancho } = pedido;
    setPedido({
      ...pedido,
      tipo_moldura: tipo,
      precio_total: calcularPrecio(alto, ancho, tipo)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pedido.cliente_id) return alert('Debe seleccionar un cliente.');
    if (!pedido.tipo_moldura) return alert('Debe seleccionar una moldura.');
    if (!pedido.alto || !pedido.ancho || isNaN(pedido.alto) || isNaN(pedido.ancho)) {
      return alert('Debe ingresar alto y ancho válidos.');
    }

    onSubmit(pedido);
    setPedido({
      cliente_id: '',
      alto: '',
      ancho: '',
      tipo_moldura: '',
      precio_total: 0
    });
  };

  return (
    <>
      <form className="inventario-form" onSubmit={handleSubmit}>
        <select name="cliente_id" value={pedido.cliente_id} onChange={handleChange} required>
          <option value="">Seleccione un cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
        <input
          name="alto"
          placeholder="Alto (cm)"
          value={pedido.alto}
          onChange={handleChange}
        />
        <input
          name="ancho"
          placeholder="Ancho (cm)"
          value={pedido.ancho}
          onChange={handleChange}
        />
        <input className="precio-total" disabled value={`$${pedido.precio_total}`} />
        <button type="submit">Registrar Pedido</button>
      </form>

      <div className="molduras-grid">
        {molduras.map((m) => (
          <div
            key={m.tipo}
            className={`moldura-card ${pedido.tipo_moldura === m.tipo ? 'selected' : ''}`}
            onClick={() => handleMolduraClick(m.tipo)}
          >
            <img src={m.imagen} alt={m.tipo} className="moldura-img" />
            <p>{m.tipo}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default PedidoForm;
