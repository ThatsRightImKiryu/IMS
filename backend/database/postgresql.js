
const { Sequelize } = require('sequelize');

// Настройте параметры подключения согласно вашей конфигурации PostgreSQL
const pgClient = new Sequelize('incidents', 'postgresql', 'postgresql', {
  host: 'postgres', // или имя сервиса из docker-compose
  dialect: 'postgres', // Диалект базы данных
});

module.exports = pgClient;
