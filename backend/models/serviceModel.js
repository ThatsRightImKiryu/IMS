// serviceModel.js

const { DataTypes } = require('sequelize');
const pgClient = require('../database/postgresql');
const User = require('../models/userModel')

const Service = pgClient.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'services',
  timestamps: false,
});

User.belongsToMany(Service, {
  through: 'service_team',
  foreignKey: 'user_id',
  otherKey: 'service_id',
  as: 'responsibles'
});

Service.belongsToMany(User, {
  through: 'service_team',
  foreignKey: 'service_id',
  otherKey: 'user_id',
  as: 'responsibles'
});

module.exports = Service;