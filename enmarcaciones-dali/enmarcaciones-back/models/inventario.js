module.exports = (sequelize, DataTypes) => {
  const Inventario = sequelize.define('Inventario', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
    unidad_medida: { type: DataTypes.STRING },
    stock_actual: { type: DataTypes.INTEGER },
    stock_minimo: { type: DataTypes.INTEGER },
    precio_unitario: { type: DataTypes.FLOAT }
  }, {
    tableName: 'inventario',
    timestamps: false
  });

  return Inventario;
};
