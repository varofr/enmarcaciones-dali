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

exports.estadisticas = async (req, res) => {
  try {
    const items = await Inventario.findAll();

    const totalItems = items.length;
    const totalStock = items.reduce((acc, item) => acc + item.stock_actual, 0);

    const bajoStock = items.filter(item => item.stock_actual < item.stock_minimo);

    const topAbundantes = [...items]
      .sort((a, b) => b.stock_actual - a.stock_actual)
      .slice(0, 5)
      .map(item => ({
        nombre: item.nombre,
        stock: item.stock_actual
      }));

    res.json({
      totalItems,
      totalStock,
      bajoStock,
      topAbundantes
    });
  } catch (err) {
    console.error('Error al generar estadísticas de inventario:', err);
    res.status(500).json({ error: 'Error al generar estadísticas' });
  }
};
