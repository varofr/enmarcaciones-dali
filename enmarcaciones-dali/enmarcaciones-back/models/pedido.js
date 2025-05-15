'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      Pedido.belongsTo(models.Cliente, {
        foreignKey: 'cliente_id',
        as: 'Cliente'
      });
    }
  }

  Pedido.init({
    cliente_id: DataTypes.INTEGER,
    alto: DataTypes.DECIMAL(5, 2),
    ancho: DataTypes.DECIMAL(5, 2),
    tipo_moldura: DataTypes.STRING,
    precio_total: DataTypes.DECIMAL(10, 2),
    fecha: DataTypes.DATE,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pedido',
    tableName: 'pedidos',
    timestamps: false
  });

  return Pedido;
};
