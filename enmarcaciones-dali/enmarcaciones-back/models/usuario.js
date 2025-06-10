'use strict';

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clave_hash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'usuarios',
    timestamps: false
  });

  return Usuario;
};
