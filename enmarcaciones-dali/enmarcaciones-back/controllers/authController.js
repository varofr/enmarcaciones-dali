const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const verificarClave = async (req, res) => {
  const { usuarioId, clave } = req.body;

  try {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const claveValida = await bcrypt.compare(clave, usuario.clave_hash);
    if (!claveValida) return res.status(401).json({ mensaje: 'Clave incorrecta' });

    res.json({ autorizado: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = { verificarClave };
