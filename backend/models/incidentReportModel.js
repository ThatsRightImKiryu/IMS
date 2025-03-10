// incidentReportModel.js

const { DataTypes } = require('sequelize');
const pgClient = require('../database/postgresql');

const IncidentReport = pgClient.define('IncidentReport', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  reportText: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'report_text',
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isIn: [['draft', 'finalized']],
    },
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
}, {
  tableName: 'incident_reports',
  timestamps: true,
});

// Ассоциация с инцидентом
//  IncidentReport.hasMany(Incident, { foreignKey: 'report_id', as: 'incidents' });


module.exports = IncidentReport;
