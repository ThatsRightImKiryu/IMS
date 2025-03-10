// serviceController.js
const Service = require('../models/serviceModel'); // Импорт модели Service
const User = require('../models/userModel')
   // serviceController.js

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();  // Используйте встроенный метод Sequelize
    res.json(services);
  } catch (error) {
    console.error('Error retrieving services:', error);
    res.status(500).send('Error retrieving services');
  }
};
   

exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params; // Извлечение ID из параметров запроса
    const service = await Service.findByPk(id); // Используем метод findByPk
    if (!service) {
      return res.status(404).send('Service not found');
    }
    res.json(service);
  } catch (error) {
    console.error('Error retrieving service:', error);
    res.status(500).send('Error retrieving service');
  }
};

// Новый метод для добавления сервиса
exports.createService = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newService = await Service.create({ name, description });
    res.status(201).json(newService); // Возвращаем статус 201 (Created) и данные нового сервиса
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).send('Error creating service');
  }
};
exports.getServiceTeam = async (req, res) => {
  try {
    const { serviceId } = req.params;
    console.log(`Fetching team for service ID: ${serviceId}`); // Добавьте логирование
    
    const service = await Service.findByPk(serviceId, {
      include: [{
        model: User,
        through: {
          attributes: ['role'],
        },
        attributes: ['id', 'name', 'email', 'role'], // Извлечение необходимых полей
      }],
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service.User); // Изменил на service.Users
  } catch (error) {
    console.error('Error fetching service team:', error);
    res.status(500).send('Error fetching service team');
  }
};
