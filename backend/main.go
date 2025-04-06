package main

import (
	"backend/controllers" // Обновите импорт пакета
	"backend/database"    // Обновите импорт пакета
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Подключение к базе данных
	database.Connect()

	// Инициализация нового роутера Gin
	router := gin.Default()

	config := cors.Config{
		AllowOrigins:     []string{"http://localhost"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}
	router.Use(cors.New(config))
	
	// Определение маршрутов
	router.GET("/api/incidents", controllers.GetAllIncidents)
	router.POST("/api/incidents", controllers.CreateIncident)
	router.GET("/api/incidents/:id", controllers.GetIncidentByID)

	router.GET("/api/services", controllers.GetAllServices)
	// router.POST("/api/services", controllers.CreateIncident)
	router.GET("/api/services/:id", controllers.GetServiceByID)
	
	// Запуск приложения
	router.Run(":8080")
}
