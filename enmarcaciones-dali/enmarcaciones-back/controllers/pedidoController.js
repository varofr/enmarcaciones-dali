const { Pedido, Cliente, Factura } = require('../models');

// ✅ GET /api/pedidos - lista todos los pedidos con Cliente y Factura
exports.mostrarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: [
        {
          model: Cliente,
          as: 'Cliente',
          attributes: ['nombre', 'rut']
        },
        {
          model: Factura,
          as: 'Factura'
        }
      ]
    });
    res.json(pedidos);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
};

// ✅ POST /api/pedidos - crea un nuevo pedido
exports.crearPedido = async (req, res) => {
  try {
    const datos = {
      ...req.body,
      fecha: req.body.fecha || new Date(), 
      estado: req.body.estado || 'pendiente' 
    };

    const nuevoPedido = await Pedido.create(datos);
    res.status(201).json(nuevoPedido);
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ error: 'Error al crear pedido' });
  }
};


// ✅ PUT /api/pedidos/:id/estado - actualiza el estado de un pedido
exports.actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    pedido.estado = estado;
    await pedido.save();
    res.json(pedido);
  } catch (error) {
    console.error('Error al actualizar estado del pedido:', error);
    res.status(500).json({ error: 'Error al actualizar estado del pedido' });
  }
};

// ✅ GET /api/pedidos/pendientes - lista solo los pedidos en estado pendiente
exports.listarPendientes = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      where: { estado: 'pendiente' },
      include: {
        model: Cliente,
        as: 'Cliente',
        attributes: ['nombre', 'rut']
      }
    });
    res.json(pedidos);
  } catch (error) {
    console.error('Error al obtener pedidos pendientes:', error);
    res.status(500).json({ error: 'Error al obtener pedidos pendientes' });
  }
};
