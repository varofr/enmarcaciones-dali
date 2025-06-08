import React, { useState, useEffect } from 'react';
import '../css/PedidoForm.css';

const molduras = [
  { tipo: 'Dorada', precio: 1200, imagen: '/Images/Molduras/dorada.jpg' },
  { tipo: 'Negra', precio: 1400, imagen: '/Images/Molduras/negra.jpg' },
  { tipo: 'Greca', precio: 1500, imagen: '/Images/Molduras/greca.jpg' },
  { tipo: 'Plateada', precio: 1300, imagen: '/Images/Molduras/plateada.jpg' }
];

function PedidoForm({ onPedidoCreado }) {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    cliente_id: '',
    alto: '',
    ancho: '',
    tipo_moldura: '',
    precio_total: 0
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/clientes')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setClientes(data);
        else if (Array.isArray(data.data)) setClientes(data.data);
      })
      .catch(err => console.error('Error al cargar clientes:', err));
  }, []);

  const calcularPrecio = (alto, ancho, tipo_moldura) => {
    const moldura = molduras.find((m) => m.tipo === tipo_moldura);
    if (!moldura) return 0;
    const perimetroCM = 2 * (parseFloat(alto || 0) + parseFloat(ancho || 0));
    const perimetroM = perimetroCM / 100;
    const precioMoldura = perimetroM * moldura.precio;
    const costoFijo = 2000;
    return Math.round(precioMoldura + costoFijo);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };

    if (name === 'alto' || name === 'ancho' || name === 'tipo_moldura') {
      updatedForm.precio_total = calcularPrecio(
        updatedForm.alto,
        updatedForm.ancho,
        updatedForm.tipo_moldura
      );
    }

    setFormData(updatedForm);
  };

  const handleMolduraClick = (tipo) => {
    const updatedForm = { ...formData, tipo_moldura: tipo };
    updatedForm.precio_total = calcularPrecio(
      updatedForm.alto,
      updatedForm.ancho,
      tipo
    );
    setFormData(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (res.ok) {
        alert('Pedido registrado con éxito');
        if (typeof onPedidoCreado === 'function') onPedidoCreado();
        setFormData({
          cliente_id: '',
          alto: '',
          ancho: '',
          tipo_moldura: '',
          precio_total: 0
        });
      } else {
        alert('Error al registrar pedido: ' + result.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error al registrar pedido');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pedido-form">
      <select name="cliente_id" value={formData.cliente_id} onChange={handleChange} required>
        <option value="">Seleccione un cliente</option>
        {clientes.map(cliente => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nombre} ({cliente.rut})
          </option>
        ))}
      </select>

      <input
        name="alto"
        type="number"
        placeholder="Alto (cm)"
        value={formData.alto}
        onChange={handleChange}
        required
      />
      <input
        name="ancho"
        type="number"
        placeholder="Ancho (cm)"
        value={formData.ancho}
        onChange={handleChange}
        required
      />

      <div className="molduras-grid">
        {molduras.map((m) => (
          <div
            key={m.tipo}
            className={`moldura-card ${formData.tipo_moldura === m.tipo ? 'selected' : ''}`}
            onClick={() => handleMolduraClick(m.tipo)}
          >
            <img src={m.imagen} alt={m.tipo} className="moldura-img" />
            <p>{m.tipo}</p>
          </div>
        ))}
      </div>

      <p className="precio-total">Precio estimado: ${formData.precio_total.toLocaleString()}</p>
      <button type="submit">Registrar Pedido</button>
    </form>
  );
}

export default PedidoForm;
