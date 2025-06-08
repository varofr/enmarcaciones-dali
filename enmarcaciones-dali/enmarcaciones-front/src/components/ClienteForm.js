import React, { useState } from 'react';

function ClienteForm({ onClienteCreado }) {
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    tipo_cliente: 'persona',
    direccion: '',
    telefono: '',
    email: ''
  });

  // Formatea el RUT mientras se escribe (agrega puntos y guión)
  const formatearRut = (rut) => {
    rut = rut.replace(/\D/g, '');
    if (rut.length === 0) return '';
    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1);
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${cuerpo}-${dv}`;
  };

  // Validar RUT con dígito verificador 
  const validarRut = (rut) => {
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
  };

  // Formatea el teléfono mientras se escribe
  const formatearTelefono = (telefono) => {
    const limpio = telefono.replace(/\D/g, '');
    if (limpio.startsWith('56') && limpio.length >= 11) {
      return `+${limpio.slice(0, 2)} ${limpio.slice(2, 3)} ${limpio.slice(3, 7)} ${limpio.slice(7, 11)}`;
    }
    if (limpio.startsWith('9') && limpio.length >= 8) {
      return `+56 9 ${limpio.slice(1, 5)} ${limpio.slice(5, 9)}`;
    }
    return telefono;
  };

  // Valida estructura de correo
  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Valida que tenga formato chileno esperado
  const validarTelefono = (telefono) => /^\+56 9 \d{4} \d{4}$/.test(telefono);

  // Actualiza campos y formatea RUT/teléfono en tiempo real
  const handleChange = (e) => {
    const { name, value } = e.target;
    let nuevoValor = value;

    if (name === 'rut') {
      nuevoValor = formatearRut(value);
    }

    if (name === 'telefono') {
      nuevoValor = formatearTelefono(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: nuevoValor
    }));
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarRut(formData.rut)) {
      alert('El RUT ingresado no es válido');
      return;
    }

    if (!validarTelefono(formData.telefono)) {
      alert('Teléfono inválido. Usa formato: +56 9 XXXX XXXX');
      return;
    }

    if (!validarEmail(formData.email)) {
      alert('Correo electrónico inválido');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        alert('Cliente registrado con éxito');
        if (typeof onClienteCreado === 'function') {
          onClienteCreado();
        }
        // Limpiar formulario
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
    <form onSubmit={handleSubmit} className="formulario">
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
        placeholder="+56 9 XXXX XXXX"
        value={formData.telefono}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <button type="submit">Registrar Cliente</button>
    </form>
  );
}

export default ClienteForm;
