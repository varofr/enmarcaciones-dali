import React, { useEffect, useState } from 'react';
import '../css/facturacion.css';

function Facturacion() {
  const [pedidos, setPedidos] = useState([]);
  const [metodoPago, setMetodoPago] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/pedidos')
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(err => console.error('Error al cargar pedidos:', err));
  }, []);

  const handleMetodoPagoChange = (pedidoId, value) => {
    setMetodoPago(prev => ({ ...prev, [pedidoId]: value }));
  };

  const generarFactura = async (pedido) => {
    const metodo = metodoPago[pedido.id];
    if (!metodo) return alert('Selecciona un método de pago');

    const response = await fetch('http://localhost:5000/api/facturas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pedido_id: pedido.id,
        metodo_pago: metodo
      })
    });

    if (response.ok) {
      alert('Factura generada');
      const updated = await fetch('http://localhost:5000/api/pedidos').then(r => r.json());
      setPedidos(updated);
    } else {
      alert('Error al generar factura');
    }
  };

  const anularFactura = async (facturaId) => {
    const confirmar = window.confirm('¿Estás seguro de anular esta factura?');
    if (!confirmar) return;

    const response = await fetch(`http://localhost:5000/api/facturas/${facturaId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Factura anulada correctamente');
      const updated = await fetch('http://localhost:5000/api/pedidos').then(r => r.json());
      setPedidos(updated);
    } else {
      alert('Error al anular factura');
    }
  };

  const pedidosPendientes = pedidos.filter(p => !p.Factura);
  const pedidosFacturados = pedidos.filter(p => p.Factura);

  return (
    <div className="factura-contenedor">
      <h2>Facturar Pedidos</h2>

      <table className="tabla-factura">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Tipo de Moldura</th>
            <th>Medidas</th>
            <th>Precio Total</th>
            <th>Método de Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidosPendientes.length === 0 ? (
            <tr><td colSpan="6">Todos los pedidos están facturados.</td></tr>
          ) : (
            pedidosPendientes.map(pedido => (
              <tr key={pedido.id} className="factura-pendiente">
                <td>{pedido.Cliente?.nombre || 'Sin nombre'}</td>
                <td>{pedido.tipo_moldura}</td>
                <td>{pedido.ancho} x {pedido.alto}</td>
                <td>${parseFloat(pedido.precio_total).toFixed(0)}</td>
                <td>
                  <select
                    value={metodoPago[pedido.id] || ''}
                    onChange={e => handleMetodoPagoChange(pedido.id, e.target.value)}
                  >
                    <option value="">Seleccione</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="débito">Débito</option>
                    <option value="crédito">Crédito</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="cheque">Cheque</option>
                    <option value="otro">Otro</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => generarFactura(pedido)}>Confirmar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h2 style={{ marginTop: '40px' }}>Facturas Emitidas</h2>

      <table className="tabla-factura">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Tipo de Moldura</th>
            <th>Medidas</th>
            <th>Precio Total</th>
            <th>Método de Pago</th>
            <th>Fecha Emisión</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {pedidosFacturados.length === 0 ? (
            <tr><td colSpan="7">Aún no hay facturas emitidas.</td></tr>
          ) : (
            pedidosFacturados.map(pedido => (
              <tr key={pedido.id}>
                <td>{pedido.Cliente?.nombre || 'Sin nombre'}</td>
                <td>{pedido.tipo_moldura}</td>
                <td>{pedido.ancho} x {pedido.alto}</td>
                <td>${parseFloat(pedido.precio_total).toFixed(0)}</td>
                <td>{pedido.Factura?.metodo_pago}</td>
                <td>{pedido.Factura?.fecha_emision?.split('T')[0]}</td>
                <td>
                  <button
                    style={{ backgroundColor: '#ff5c5c', color: '#fff', borderRadius: '6px', padding: '6px 10px' }}
                    onClick={() => anularFactura(pedido.Factura.id)}
                  >
                    Anular
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Facturacion;
