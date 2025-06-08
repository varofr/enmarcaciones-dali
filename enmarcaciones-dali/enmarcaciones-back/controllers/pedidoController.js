const { Pedido, Cliente } = require('../models');

// Mostrar todos los pedidos
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

// Crear un nuevo pedido
exports.crearPedido = async (req, res) => {
  console.log('📥 Datos recibidos:', req.body);

  try {
    const nuevoPedido = await Pedido.create({
      cliente_id: req.body.cliente_id,
      alto: req.body.alto,
      ancho: req.body.ancho,
      tipo_moldura: req.body.tipo_moldura,
      precio_total: req.body.precio_total,
      fecha: new Date(),
      estado: 'pendiente'
    });

    res.status(201).json(nuevoPedido);
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ error: 'Error al crear pedido' });
  }
};

//ACTUALIZAR PEDIDOS
exports.actualizarEstadoPedido = async (req, res) => {
  const pedidoId = req.params.id;
  const nuevoEstado = req.body.estado;

  try {
    const pedido = await Pedido.findByPk(pedidoId);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    pedido.estado = nuevoEstado;
    await pedido.save();

    res.json({ mensaje: 'Estado actualizado correctamente', pedido });
  } catch (error) {
    console.error('Error al actualizar estado del pedido:', error);
    res.status(500).json({ error: 'Error al actualizar estado del pedido' });
  }
};

exports.actualizarEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    pedido.estado = estado;
    await pedido.save();

    res.json({ mensaje: 'Estado actualizado', pedido });
  } catch (error) {
    console.error('❌ Error al actualizar estado:', error);
    res.status(500).json({ error: 'Error interno al actualizar estado' });
  }
};
