const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Raza', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    height: {
      type: DataTypes.FLOAT(2),
      allowNull: false,
    },
    // min_height: {
    //   type: DataTypes.FLOAT(2),
    //   allowNull: false,
    // },
    weight: {
      type: DataTypes.FLOAT(3),
      allowNull: false,
    },
    // min_weight: {
    //   type: DataTypes.FLOAT(3),
    //   allowNull: false,
    // },
    life_span: {
      type: DataTypes.INTEGER,
    },
    // max_life_span: {
    //   type: DataTypes.INTEGER,
    // }
  });

  sequelize.define('Temperamento', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  });
};
