'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      // Asociación con Pedido
      Cliente.hasMany(models.Pedido, {
        foreignKey: 'cliente_id',
        as: 'pedidos',
        onDelete: 'CASCADE' //PARA ELIMINAR CLIENTE Y SUS PEDIDOS
      });
    }
  }

  Cliente.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    tipo_cliente: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'clientes',
    timestamps: false
  });

  return Cliente;
};
