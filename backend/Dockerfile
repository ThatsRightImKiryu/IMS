# Используем образ Node.js как основу
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /usr/src/api

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install -g npm@11.1.0

# Копируем исходники
COPY . .

# Указываем команду для запуска приложения
CMD ["node", "app.js"]

# Открываем порт, если это потребуется
EXPOSE 3000