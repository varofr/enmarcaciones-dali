const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Aquí se importa el router
const clienteRoutes = require('./routes/clienteRoutes');
app.use('/api/clientes', clienteRoutes);

const pedidoRoutes = require('./routes/pedidoRoutes');
app.use('/api/pedidos', pedidoRoutes);


// Conexión con Sequelize
const { sequelize } = require('./models');

sequelize.authenticate()
  .then(() => console.log('Base de datos conectada'))
  .catch(err => console.error('Error al conectar BD:', err));

// Servidor escuchando
app.listen(port, () => {
  console.log(`Servidor backend en puerto ${port}`);
});
