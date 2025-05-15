const { Cliente } = require('../models');

exports.mostrarClientes = async (req, res) => {
  try {
    const lista = await Cliente.findAll();
    console.log('Clientes cargados:', lista); 
    res.json(lista);
  } catch (error) {
    console.error("Error real al obtener clientes:", error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

exports.ingresarCliente = async (req, res) => {
  try {
    const nuevo = await Cliente.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};
