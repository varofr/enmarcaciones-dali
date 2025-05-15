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

  // Dar formato al rut automáticamente
  function formatearRut(rut) {
    rut = rut.replace(/\D/g, '');
    if (rut.length === 0) return '';

    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1);
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${cuerpo}-${dv}`;
  }

  // Validar que el RUT tenga dígito verificador correcto
  function validarRut(rut) {
    rut = rut.replace(/\./g, '').replace('-', '');

    if (rut.length < 2) return false;

    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i)) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    let dvCalc = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return dv === dvCalc;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'rut') {
      const rutFormateado = formatearRut(value);
      setFormData(prev => ({
        ...prev,
        [name]: rutFormateado
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarRut(formData.rut)) {
      alert('El RUT ingresado no es válido');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/clientes', {
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
      <input
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <input
        name="rut"
        placeholder="RUT"
        value={formData.rut}
        onChange={handleChange}
        required
      />
      <select
        name="tipo_cliente"
        value={formData.tipo_cliente}
        onChange={handleChange}
      >
        <option value="persona">Persona</option>
        <option value="empresa">Empresa</option>
      </select>
      <input
        name="direccion"
        placeholder="Dirección"
        value={formData.direccion}
        onChange={handleChange}
      />
      <input
        name="telefono"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit">Registrar Cliente</button>
    </form>
  );
}

export default ClienteForm;
