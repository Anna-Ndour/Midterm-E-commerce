const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CartItem = sequelize.define('CartItem', {
  productId: { // On garde l'ID original du produit
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
  }
});



module.exports = CartItem;