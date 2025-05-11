const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Configurar middleware
app.use(cors());
app.use(express.json());

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'enmarcaciones_dali',
  password: 'rrrd0f2l',
  port: 5432,
});

// Ruta para crear cliente
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

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
