import React, { useEffect, useState } from 'react';
import '../css/FlujoCaja.css';

function FlujoCaja() {
  const [resumen, setResumen] = useState([]);
  const [total, setTotal] = useState(0);
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');

  useEffect(() => {
    const hoy = new Date();
    const haceUnMes = new Date();
    haceUnMes.setDate(hoy.getDate() - 30);

    const formato = (f) => f.toISOString().split('T')[0];
    setInicio(formato(haceUnMes));
    setFin(formato(hoy));

    cargarFlujo(formato(haceUnMes), formato(hoy));
  }, []);

  const cargarFlujo = async (ini, fin) => {
    try {
      const res = await fetch(`http://localhost:5000/api/flujo-caja?inicio=${ini}&fin=${fin}`);
      const data = await res.json();
      setResumen(data.resumen);
      setTotal(data.total);
    } catch (err) {
      console.error('Error al cargar flujo de caja:', err);
    }
  };

  return (
    <div className="flujo-caja-container">
      <div className="rango-fechas">
        <label>Desde: <input type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} /></label>
        <label>Hasta: <input type="date" value={fin} onChange={(e) => setFin(e.target.value)} /></label>
        <button onClick={() => cargarFlujo(inicio, fin)}>Actualizar</button>
      </div>

      <table className="tabla-flujo">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {resumen.length > 0 ? resumen.map((p, i) => (
            <tr key={i}>
              <td>{new Date(p.fecha).toLocaleDateString()}</td>
              <td>{p.cliente}</td>
              <td>${parseFloat(p.precio_total).toFixed(0)}</td>
            </tr>
          )) : (
            <tr><td colSpan="3">No hay datos en este rango</td></tr>
          )}
        </tbody>
      </table>
      <h4>Total Ingresos: ${total.toFixed(0)}</h4>
    </div>
  );
}

export default FlujoCaja;
