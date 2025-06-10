'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      Pedido.belongsTo(models.Cliente, {
        foreignKey: 'cliente_id',
        as: 'Cliente'
      });

      Pedido.hasOne(models.Factura, {
        foreignKey: 'pedido_id',
        as: 'Factura'
      });
    }
  }

  Pedido.init({
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    alto: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    ancho: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    tipo_moldura: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pendiente'
    }
  }, {
    sequelize,
    modelName: 'Pedido',
    tableName: 'pedidos',
    timestamps: false
  });

  return Pedido;
};
