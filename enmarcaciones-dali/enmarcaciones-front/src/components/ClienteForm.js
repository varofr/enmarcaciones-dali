import React, { useState } from 'react';
import '../css/Inventario.css';

function ClienteForm({ onSubmit }) {
  const [cliente, setCliente] = useState({
    nombre: '', rut: '', tipo_cliente: 'persona', direccion: '', telefono: '', email: ''
  });

function formatearRUT(rut) {
  rut = rut.replace(/\D/g, '');
  if (rut.length === 0) return '';
  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);
  return cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
}

function formatearTelefono(num) {
  let limpio = num.replace(/\D/g, '');
  if (limpio.length === 0) return '';
  if (!limpio.startsWith('56')) limpio = '56' + limpio;
  return '+' + limpio.slice(0, 2) + ' ' + limpio.slice(2, 3) + ' ' + limpio.slice(3, 7) + ' ' + limpio.slice(7, 11);
}

  const handleChange = (e) => {
  const { name, value } = e.target;
  let nuevoValor = value;

  if (name === 'rut') {
    nuevoValor = formatearRUT(value);
  }

  if (name === 'telefono') {
    nuevoValor = formatearTelefono(value);
  }

  setCliente({ ...cliente, [name]: nuevoValor });
};


  const validarRUT = (rut) => {
    rut = rut.replace(/\./g, '').replace('-', '');
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i)) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const dvEsperado = 11 - (suma % 11);
    const dvFinal = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    return dv === dvFinal;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarRUT(cliente.rut)) return alert('RUT inválido');
    if (!/^[\w.-]+@[a-z\d.-]+\.[a-z]{2,6}$/i.test(cliente.email)) return alert('Correo inválido');
    if (!/^\+?[\d\s-]{9,15}$/.test(cliente.telefono)) return alert('Teléfono inválido');
    onSubmit(cliente);
    setCliente({ nombre: '', rut: '', tipo_cliente: 'persona', direccion: '', telefono: '', email: '' });
  };

  return (
    <form className="inventario-form" onSubmit={handleSubmit}>
      <input name="nombre" value={cliente.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input name="rut" value={cliente.rut} onChange={handleChange} placeholder="RUT" required />
      <select name="tipo_cliente" value={cliente.tipo_cliente} onChange={handleChange}>
        <option value="persona">Persona</option>
        <option value="empresa">Empresa</option>
      </select>
      <input name="direccion" value={cliente.direccion} onChange={handleChange} placeholder="Dirección" />
      <input name="telefono" value={cliente.telefono} onChange={handleChange} placeholder="+56 9 XXXX XXXX" />
      <input name="email" value={cliente.email} onChange={handleChange} placeholder="Correo electrónico" />
      <button type="submit">Registrar Cliente</button>
    </form>
  );
}

export default ClienteForm;