const { Pedido, Cliente } = require('../models');
const { Op } = require('sequelize');

exports.obtenerFlujoCaja = async (req, res) => {
  const { inicio, fin } = req.query;

  if (!inicio || !fin) {
    return res.status(400).json({ error: 'Fechas de inicio y fin requeridas' });
  }

  try {
    const pedidos = await Pedido.findAll({
      where: {
        fecha: {
          [Op.between]: [new Date(inicio), new Date(fin)]
        }
      },
      include: [{ model: Cliente, as: 'Cliente' }]
    });

    const resumen = pedidos.map(p => ({
      fecha: p.fecha,
      cliente: p.Cliente?.nombre || 'Desconocido',
      precio_total: parseFloat(p.precio_total)
    }));

    const total = resumen.reduce((sum, p) => sum + p.precio_total, 0);

    res.json({ resumen, total });
  } catch (error) {
    console.error('Error al obtener flujo de caja:', error);
    res.status(500).json({ error: 'Error al obtener el flujo de caja' });
  }
};
