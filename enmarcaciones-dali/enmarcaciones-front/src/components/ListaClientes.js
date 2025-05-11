import React, { useEffect, useState } from 'react';

function ListaClientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.error('Error al cargar clientes:', err));
  }, []);

  return (
    <div>
      
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>RUT</th>
            <th>Tipo</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.rut}</td>
              <td>{cliente.tipo_cliente}</td>
              <td>{cliente.direccion}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaClientes;
