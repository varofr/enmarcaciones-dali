import React, { useEffect, useState } from 'react';
import '../css/dashboard.css'; // asegúrate de tener las clases ahí

function ListaClientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/clientes')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setClientes(data);
        } else if (Array.isArray(data.data)) {
          setClientes(data.data);
        } else {
          console.error('Formato inesperado:', data);
        }
      })
      .catch(err => console.error('Error al cargar clientes:', err));
  }, []);

  return (
    <div className="lista-clientes-container">
      {clientes.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <table className="tabla tabla-clientes">
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
            {clientes.map((cliente) => (
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
      )}
    </div>
  );
}

export default ListaClientes;
