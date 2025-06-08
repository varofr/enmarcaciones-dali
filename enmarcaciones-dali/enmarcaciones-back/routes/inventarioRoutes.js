const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');

router.get('/', inventarioController.listarInventario);
router.post('/', inventarioController.crearItem);
router.put('/:id', inventarioController.actualizarItem);
router.delete('/:id', inventarioController.eliminarItem);

module.exports = router;