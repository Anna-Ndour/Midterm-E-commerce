const { Sequelize } = require('sequelize');

// Create a connection to the SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // This is where your data will be saved
  logging: false // Set to true if you want to see the SQL queries in the terminal
});

module.exports = sequelize;