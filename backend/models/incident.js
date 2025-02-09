const { DataTypes } = require('sequelize');
const pgClient = require('../database/postgresql');

// Определяем модель Incident
const Incident = pgClient.define('Incident', {
  // Определите столбцы таблицы и их типы данных
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('open', 'closed', 'in-progress'),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  // Опции модели
  tableName: 'incidents',
  timestamps: false, // Если timestamps управляются вручную
});

module.exports = Incident;