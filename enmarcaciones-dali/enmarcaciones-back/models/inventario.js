module.exports = (sequelize, DataTypes) => {
  const Inventario = sequelize.define('Inventario', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    tipo: { type: DataTypes.ENUM('moldura', 'marco', 'insumo'), allowNull: false },
    cantidad: { type: DataTypes.INTEGER, defaultValue: 0 },
    unidad: { type: DataTypes.STRING, defaultValue: 'unidad' }, // opcional
    precio_unitario: { type: DataTypes.FLOAT },
    descripcion: { type: DataTypes.TEXT },
  }, { tableName: 'inventario', timestamps: false });

  return Inventario;
};