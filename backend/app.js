const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const incidentRoutes = require('./routes/incidentRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Подключение конкретных маршрутов
app.use('/api/incidents', incidentRoutes);
app.use('/api/services', serviceRoutes);

// Определяем простой маршрут
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Настраиваем сервер на прослушивание на порту 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});