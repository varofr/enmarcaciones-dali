import React, { useState, useEffect } from 'react';

function PedidoForm() {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    cliente_id: '',
    alto: '',
    ancho: '',
    tipo_moldura: '',
    precio_total: 0
  });

  // Cargar lista de clientes desde el backend
  useEffect(() => {
    fetch('http://localhost:5000/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.error('Error al cargar clientes:', err));
  }, []);

  const calcularPrecio = (alto, ancho) => {
    const perimetro = 2 * (parseFloat(alto) + parseFloat(ancho));
    const precioMoldura = 1200; // valor referencial por metro
    return perimetro * precioMoldura;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    if (name === 'alto' || name === 'ancho') {
      updatedForm.precio_total = calcularPrecio(updatedForm.alto, updatedForm.ancho);
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
      <input name="tipo_moldura" placeholder="Tipo de moldura" onChange={handleChange} required />
      <p>Precio estimado: ${formData.precio_total.toFixed(0)}</p>
      <button type="submit">Registrar Pedido</button>
    </form>
  );
}

export default PedidoForm;
