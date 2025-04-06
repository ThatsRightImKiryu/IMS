# Используем официальный образ Node в качестве базового для сборки
FROM node:20 as build

ARG BACKEND_HOST

ENV REACT_APP_BACKEND_HOST=${BACKEND_HOST}

# Устанавливаем рабочую директорию для сборки
WORKDIR /app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package.json package-lock.json ./

# Устанавливаем все зависимости проекта
RUN npm install
RUN npm install web-vitals

# Копируем все файлы проекта в контейнер
COPY . .

# Сборка приложения
RUN npm run build

# Используем минималистичный образ nginx для сервировки приложения
FROM nginx

# Копируем собранное приложение из предыдущего этапа
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Экспонируем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]