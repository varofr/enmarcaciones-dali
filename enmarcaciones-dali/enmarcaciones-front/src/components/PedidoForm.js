import React, { useState, useEffect } from 'react';

const molduras = [
  { tipo: 'Roble', precio: 1200 },
  { tipo: 'Nogal', precio: 1400 },
  { tipo: 'Negra Lacada', precio: 1500 },
  { tipo: 'Blanca Lisa', precio: 1300 }
];

function PedidoForm() {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    cliente_id: '',
    alto: '',
    ancho: '',
    tipo_moldura: '',
    precio_total: 0
  });

  useEffect(() => {
    fetch('http://localhost:5000/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.error('Error al cargar clientes:', err));
  }, []);

  const calcularPrecio = (alto, ancho, tipo_moldura) => {
    const moldura = molduras.find((m) => m.tipo === tipo_moldura);
    if (!moldura) return 0;
    const perimetro = 2 * (parseFloat(alto || 0) + parseFloat(ancho || 0));
    return perimetro * moldura.precio;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    if (name === 'alto' || name === 'ancho' || name === 'tipo_moldura') {
      updatedForm.precio_total = calcularPrecio(updatedForm.alto, updatedForm.ancho, updatedForm.tipo_moldura);
    }
    setFormData(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      alert('Pedido registrado con éxito');
    } catch (err) {
      console.error(err);
      alert('Error al registrar pedido');
    }
  };

  // 👇 Este return DEBE estar dentro de la función PedidoForm
  return (
    <form onSubmit={handleSubmit}>
      <select name="cliente_id" onChange={handleChange} required>
        <option value="">Seleccione un cliente</option>
        {clientes.map(cliente => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nombre} ({cliente.rut})
          </option>
        ))}
      </select>

      <input name="alto" type="number" placeholder="Alto (cm)" onChange={handleChange} required />
      <input name="ancho" type="number" placeholder="Ancho (cm)" onChange={handleChange} required />

      <select name="tipo_moldura" onChange={handleChange} required>
        <option value="">Seleccione una moldura</option>
        {molduras.map((m) => (
          <option key={m.tipo} value={m.tipo}>{m.tipo}</option>
        ))}
      </select>

      <p>Precio estimado: ${formData.precio_total.toFixed(0)}</p>
      <button type="submit">Registrar Pedido</button>
    </form>
  );
}

export default PedidoForm;
