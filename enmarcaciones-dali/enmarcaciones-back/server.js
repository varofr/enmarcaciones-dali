const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',
  database: 'enmarcaciones_dali',
  password: 'rrrd0f2l', 
  port: 5432,
});

// RUTA: Crear cliente
app.post('/clientes', async (req, res) => {
  const { nombre, rut, tipo_cliente, direccion, telefono, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO clientes (nombre, rut, tipo_cliente, direccion, telefono, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, rut, tipo_cliente, direccion, telefono, email]
    );
    res.json({ status: 'ok', data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// RUTA: Obtener todos los clientes
app.get('/clientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// RUTA: Crear pedido
app.post('/pedidos', async (req, res) => {
  const { cliente_id, alto, ancho, tipo_moldura, precio_total } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pedidos (cliente_id, alto, ancho, tipo_moldura, precio_total) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [cliente_id, alto, ancho, tipo_moldura, precio_total]
    );
    res.json({ status: 'ok', data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// RUTA: Obtener todos los pedidos
app.get('/pedidos', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.id, c.nombre AS cliente, p.alto, p.ancho, p.tipo_moldura, p.precio_total, p.fecha, p.estado
      FROM pedidos p
      JOIN clientes c ON p.cliente_id = c.id
      ORDER BY p.id DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
