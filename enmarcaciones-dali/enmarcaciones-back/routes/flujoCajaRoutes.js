const express = require('express');
const router = express.Router();
const flujoCajaController = require('../controllers/flujoCajaController');

// Ruta: /api/flujo-caja?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
router.get('/', flujoCajaController.obtenerFlujoCaja);

module.exports = router;
