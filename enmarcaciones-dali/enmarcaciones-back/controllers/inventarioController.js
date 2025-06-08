const { Inventario } = require('../models');

exports.listarInventario = async (req, res) => {
  const items = await Inventario.findAll();
  res.json(items);
};

exports.crearItem = async (req, res) => {
  const nuevo = await Inventario.create(req.body);
  res.json(nuevo);
};

exports.actualizarItem = async (req, res) => {
  await Inventario.update(req.body, { where: { id: req.params.id } });
  res.json({ mensaje: 'Actualizado correctamente' });
};

exports.eliminarItem = async (req, res) => {
  await Inventario.destroy({ where: { id: req.params.id } });
  res.json({ mensaje: 'Eliminado correctamente' });
};
