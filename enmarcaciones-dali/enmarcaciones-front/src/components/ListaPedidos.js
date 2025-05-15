import React, { useEffect, useState } from 'react';

function ListaPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/pedidos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPedidos(data);
        } else {
          console.error('Formato inesperado en /api/pedidos:', data);
        }
      })
      .catch(err => console.error('Error al cargar pedidos:', err));
  }, []);

  return (
    <div>
      <h2>Pedidos Registrados</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Alto</th>
            <th>Ancho</th>
            <th>Tipo Moldura</th>
            <th>Precio Total</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(pedido => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.cliente}</td> 
              <td>{pedido.alto}</td>
              <td>{pedido.ancho}</td>
              <td>{pedido.tipo_moldura}</td>
              <td>${pedido.precio_total?.toLocaleString()}</td>
              <td>{new Date(pedido.fecha).toLocaleDateString()}</td>
              <td>{pedido.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaPedidos;
