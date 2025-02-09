const Incident = require('../models/incident');

// Создание нового инцидента
exports.createIncident = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const incident = await Incident.create({ title, description, status });
    res.status(201).json(incident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение всех инцидентов
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.findAll();
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение инцидента по ID
exports.getIncidentById = async (req, res) => {
  try {
    const { id } = req.params;
    const incident = await Incident.findByPk(id);
    
    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновление инцидента по ID
exports.updateIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const [updated] = await Incident.update({ title, description, status }, {
      where: { id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    const updatedIncident = await Incident.findByPk(id);
    res.status(200).json(updatedIncident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удаление инцидента по ID
exports.deleteIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Incident.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};