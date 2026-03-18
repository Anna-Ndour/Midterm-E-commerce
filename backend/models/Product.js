const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  imageUrl: { 
    type: DataTypes.STRING,
    defaultValue: 'https://via.placeholder.com/150' // Une image par défaut si on oublie
  },
  category: {
    type: DataTypes.STRING
  }
});

module.exports = Product;