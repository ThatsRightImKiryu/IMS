// incidentController.js

const Incident = require('../models/incidentModel');
const Service = require('../models/serviceModel');
const IncidentReport = require('../models/incidentReportModel');
const User = require('../models/userModel');

module.exports = {

  // Получение всех инцидентов с подробностями
  async getAllIncidents(req, res) {
    try {
      const incidents = await Incident.findAll({
        include: [
          {
            model: Service,
            as: 'service',
            include: [
              {
                model: User,
                as: 'responsibles',
                attributes: ['id', 'name'],  // Опционально можно выбрать только необходимые поля
                through: { attributes: [] }, // Убираем атрибуты промежуточной таблицы
              }
            ]
          },
          {
            model: IncidentReport,
            as: 'reports',
          }
        ]
      });
      res.status(200).json(incidents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },



  // Создание нового инцидента
  async createIncident(req, res) {
    const { title, description, serviceId } = req.body; // Предполагается, что мы получаем эти данные из тела запроса
    try {
      const incident = await Incident.create({
        title,
        description,
        service_id: serviceId,
      });
      res.status(201).json(incident);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Обновление существующего инцидента
  async updateIncident(req, res) {
    const { incidentId } = req.params;
    const { title, description, serviceId } = req.body;
    try {
      const incident = await Incident.findByPk(incidentId);
      if (!incident) {
        return res.status(404).json({ error: 'Incident not found' });
      }
      incident.title = title;
      incident.description = description;
      incident.service_id = serviceId;
      await incident.save();
      res.status(200).json(incident);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Получение инцидента по ID
  async getIncidentById(req, res) {
    const { incidentId } = req.params;
    try {
      const incident = await Incident.findByPk(incidentId, {
        include: [
          { model: Service, as: 'service' },
          { 
            model: IncidentReport, 
            include: [ { model: User, as: 'reporter' } ]
          }
        ]
      });
      if (!incident) {
        return res.status(404).json({ error: 'Incident not found' });
      }
      res.status(200).json(incident);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Удаление инцидента
  async deleteIncident(req, res) {
    const { incidentId } = req.params;
    try {
      const result = await Incident.destroy({ where: { id: incidentId } });
      if (result === 0) {
        return res.status(404).json({ error: 'Incident not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};