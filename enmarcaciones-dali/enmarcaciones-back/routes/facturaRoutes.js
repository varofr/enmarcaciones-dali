const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

router.get('/', facturaController.listarFacturas);
router.post('/', facturaController.crearFactura);
router.delete('/:id', facturaController.eliminarFactura);


module.exports = router;
