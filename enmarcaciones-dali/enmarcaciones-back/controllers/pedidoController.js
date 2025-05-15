const { Pedido, Cliente } = require('../models');

exports.mostrarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: {
        model: Cliente,
        as: 'Cliente', 
        attributes: ['nombre']
      }
    });

    const pedidosFormateados = pedidos.map(p => ({
      id: p.id,
      alto: p.alto,
      ancho: p.ancho,
      tipo_moldura: p.tipo_moldura,
      precio_total: p.precio_total,
      fecha: p.fecha,
      estado: p.estado,
      cliente: p.Cliente ? p.Cliente.nombre : 'Desconocido'
    }));

    res.json(pedidosFormateados);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
};
