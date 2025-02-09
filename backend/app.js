const express = require('express');
const routes = require('./routes/incidentRoutes');

const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json()); // для поддержки JSON-формата в теле запроса

// Используем маршруты
app.use('/api', routes);



// Определяем простой маршрут
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Настраиваем сервер на прослушивание на порту 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
