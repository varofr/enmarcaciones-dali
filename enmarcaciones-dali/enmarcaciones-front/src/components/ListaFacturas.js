import React, { useEffect, useState } from 'react';
import '../css/listaFacturas.css';

function ListaFacturas() {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/facturas')
      .then(res => res.json())
      .then(data => setFacturas(data))
      .catch(err => console.error('Error al cargar facturas:', err));
  }, []);

  return (
    <div className="facturas-contenedor">
      <h2>Facturas Emitidas</h2>
      <table className="tabla-facturas">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>RUT</th>
            <th>Tipo de Documento</th>
            <th>Método de Pago</th>
            <th>Monto</th>
            <th>Fecha Emisión</th>
          </tr>
        </thead>
        <tbody>
          {facturas.length === 0 ? (
            <tr>
              <td colSpan="7">No hay facturas registradas.</td>
            </tr>
          ) : (
            facturas.map(factura => (
              <tr key={factura.id}>
                <td>{factura.id}</td>
                <td>{factura.Pedido?.Cliente?.nombre || 'Sin nombre'}</td>
                <td>{factura.Pedido?.Cliente?.rut || '-'}</td>
                <td>{factura.tipo_documento}</td>
                <td>{factura.metodo_pago}</td>
                <td>${parseFloat(factura.monto).toFixed(0)}</td>
                <td>{factura.fecha_emision}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaFacturas;
