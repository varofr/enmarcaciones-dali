const express = require('express');
const router = express.Router();
const { verificarClave } = require('../controllers/authController');

router.post('/verificar-clave', verificarClave);

module.exports = router;
