const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/', pedidoController.mostrarPedidos);

module.exports = router;
