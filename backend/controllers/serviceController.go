package controllers

import (
 "net/http"
 "strconv"
 "gorm.io/gorm"

 "github.com/gin-gonic/gin"
 "backend/database"
 "backend/models"
)

// GetAllServices возвращает список всех сервисов
func GetAllServices(c *gin.Context) {
 var services []models.Service

 // Извлечение всех сервисов из базы данных с предварительной загрузкой членов команды
 result := database.DB.Preload("Team").Find(&services)
 if result.Error != nil {
  c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
  return
 }

 // Передача списка сервисов в JSON формате
 c.JSON(http.StatusOK, services)
}

// GetServiceByID возвращает данные о конкретном сервисе по ID
func GetServiceByID(c *gin.Context) {
 // Извлекаем ID сервиса из параметров маршрута и конвертируем в int
 idStr := c.Param("id")
 id, err := strconv.Atoi(idStr)
 if err != nil {
  c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid service ID"})
  return
 }

 // Поиск сервиса в базе данных по ID с предварительной загрузкой членов команды
 var service models.Service
 result := database.DB.Preload("Team").First(&service, id)
 if result.Error != nil {
  if result.Error == gorm.ErrRecordNotFound {
   c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
   return
  }
  c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
  return
 }

 // Передача данных сервиса в JSON формате
 c.JSON(http.StatusOK, service)
}