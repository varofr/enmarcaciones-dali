import React, { useState } from 'react';

function ClienteForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    tipo_cliente: 'persona',
    direccion: '',
    telefono: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Cliente registrado con éxito');
        setFormData({
          nombre: '',
          rut: '',
          tipo_cliente: 'persona',
          direccion: '',
          telefono: '',
          email: ''
        });
      } else {
        alert('Error al registrar cliente: ' + result.error);
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
      alert('No se pudo conectar al servidor');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <input name="rut" placeholder="RUT" onChange={handleChange} required />
      <select name="tipo_cliente" onChange={handleChange}>
        <option value="persona">Persona</option>
        <option value="empresa">Empresa</option>
      </select>
      <input name="direccion" placeholder="Dirección" onChange={handleChange} />
      <input name="telefono" placeholder="Teléfono" onChange={handleChange} />
      <input name="email" placeholder="Correo electrónico" onChange={handleChange} />
      <button type="submit">Registrar Cliente</button>
    </form>
  );
}

export default ClienteForm;
