const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

// Ruta GET: obtener todos los clientes
router.get('/', clienteController.mostrarClientes);

// Ruta POST: registrar un nuevo cliente
router.post('/', clienteController.ingresarCliente);

module.exports = router;
