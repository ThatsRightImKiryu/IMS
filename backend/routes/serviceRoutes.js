// serviceRoutes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Путь для получения всех сервисов
router.get('/', serviceController.getAllServices);

// Путь для получения сервиса по ID
router.get('/:id', serviceController.getServiceById);
router.post('/', serviceController.createService);
router.get('/:serviceId/team', serviceController.getServiceTeam);

module.exports = router;
