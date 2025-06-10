const { Factura, Pedido, Cliente } = require('../models');

exports.listarFacturas = async (req, res) => {
  try {
    const facturas = await Factura.findAll({
      include: [
        {
          model: Pedido,
          as: 'Pedido',
          include: [
            {
              model: Cliente,
              as: 'Cliente',
              attributes: ['nombre', 'rut']
            }
          ]
        }
      ]
    });
    res.json(facturas);
  } catch (err) {
    console.error('Error al listar facturas:', err);
    res.status(500).json({ error: 'Error al obtener facturas' });
  }
};


exports.crearFactura = async (req, res) => {
  try {
    const { pedido_id, tipo_documento = 'boleta', metodo_pago } = req.body;

    const pedido = await Pedido.findByPk(pedido_id);
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });

    if (pedido.estado === 'facturado') {
      return res.status(400).json({ error: 'Este pedido ya está facturado' });
    }

    const factura = await Factura.create({
      pedido_id,
      tipo_documento,
      metodo_pago,
      monto: pedido.precio_total,
      fecha_emision: new Date()
    });

    await pedido.update({ estado: 'facturado' });

    res.status(201).json(factura);
  } catch (err) {
    console.error('Error al crear factura:', err);
    res.status(500).json({ error: 'Error al generar factura' });
  }
};

exports.eliminarFactura = async (req, res) => {
  try {
    const { id } = req.params;

    const factura = await Factura.findByPk(id);
    if (!factura) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }

    const pedido = await Pedido.findByPk(factura.pedido_id);
    if (pedido) {
      pedido.estado = 'pendiente';
      await pedido.save();
    }

    await factura.destroy();
    res.json({ mensaje: 'Factura anulada correctamente' });
  } catch (err) {
    console.error('Error al anular factura:', err);
    res.status(500).json({ error: 'Error al anular factura' });
  }
};
