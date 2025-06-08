const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/', pedidoController.mostrarPedidos);

router.post('/', pedidoController.crearPedido);

router.put('/:id/estado', pedidoController.actualizarEstadoPedido);


module.exports = router;
