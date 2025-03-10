// incidentRoutes.js

const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController'); // Убедитесь, что путь к контроллеру корректен

// Убедитесь, что все методы контроллера существуют и правильно экспортируются
router.get('/', incidentController.getAllIncidents);
router.post('/', incidentController.createIncident);
router.get('/:incidentId', incidentController.getIncidentById);
router.put('/:incidentId', incidentController.updateIncident);
router.delete('/:incidentId', incidentController.deleteIncident);

module.exports = router;