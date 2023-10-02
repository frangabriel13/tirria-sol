const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('variation', {
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'
    },
  });
};