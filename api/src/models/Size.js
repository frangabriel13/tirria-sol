const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('size', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });
};