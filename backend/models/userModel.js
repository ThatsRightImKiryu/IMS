const { DataTypes } = require('sequelize');
const pgClient = require('../database/postgresql');

const User = pgClient.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: DataTypes.STRING,
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tableName: 'users',
});

module.exports = User;
