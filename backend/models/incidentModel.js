// incidentModel.js

const { DataTypes } = require('sequelize');
const pgClient = require('../database/postgresql');
const IncidentReport = require('./incidentReportModel'); // Импорт модели IncidentReport
const Service = require('./serviceModel');

const Incident = pgClient.define('Incident', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
   field: 'updated_at',
  },
  resolvedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'resolved_at'
  }
}, {
  tableName: 'incidents',
  timestamps: true,
});

// Ассоциация к отчету
Incident.belongsToMany(IncidentReport, { through: 'report_incidents', foreignKey: 'incident_id',
   otherKey: 'report_id', as: 'reports', timestamps: false});
Incident.belongsTo(Service, { foreignKey: 'service_id', as: 'service' });

module.exports = Incident;
