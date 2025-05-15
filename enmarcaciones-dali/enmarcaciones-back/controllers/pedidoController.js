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
