# Используем официальный базовый образ Golang
FROM golang:1.24.1 as build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app
# Копируем файлы go.mod и go.sum
COPY go.mod go.sum ./

# Загружаем зависимости
RUN go mod download

# Копируем все остальные файлы приложения
COPY . .

# Компилируем приложение
RUN go build -o main .

# Пробрасываем порт, на котором приложение запускается
EXPOSE 8080 

# Команда запуска контейнера
CMD ["./main"]