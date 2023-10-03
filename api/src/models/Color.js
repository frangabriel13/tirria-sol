const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('color', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });
};