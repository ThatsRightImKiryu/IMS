package database

import (
	"backend/models" // Обновите импорт пакета
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	dsn := "host=postgres user=postgresql password=postgresql dbname=incidents port=5432 sslmode=disable"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Миграция схемы
database.AutoMigrate(&models.Incident{}, &models.User{}, &models.Service{}, &models.IncidentReport{})

	DB = database
}
