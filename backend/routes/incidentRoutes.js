const express = require('express');
const incidentController = require('../controllers/incidentController');

const router = express.Router();

// CRUD маршруты для инцидентов
router.post('/incidents', incidentController.createIncident);
router.get('/incidents', incidentController.getAllIncidents);
router.get('/incidents/:id', incidentController.getIncidentById);
router.put('/incidents/:id', incidentController.updateIncident);
router.delete('/incidents/:id', incidentController.deleteIncident);

module.exports = router;