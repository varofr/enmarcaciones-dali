'use strict';
module.exports = (sequelize, DataTypes) => {
  const Factura = sequelize.define('Factura', {
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipo_documento: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    metodo_pago: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    fecha_emision: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'facturas',
    timestamps: false
  });

  Factura.associate = (models) => {
    Factura.belongsTo(models.Pedido, {
      foreignKey: 'pedido_id',
      as: 'Pedido'
    });
  };

  return Factura;
};
