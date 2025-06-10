const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/', pedidoController.mostrarPedidos);
router.post('/', pedidoController.crearPedido);
router.put('/:id/estado', pedidoController.actualizarEstado);
router.get('/pendientes', pedidoController.listarPendientes);

module.exports = router;
