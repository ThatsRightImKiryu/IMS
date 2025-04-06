package controllers

import (
	"backend/database"
	"backend/models"
	"log"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllIncidents(c *gin.Context) {
	var incidents []models.Incident
	result := database.DB.Preload("Service").Preload("Service.Team").Preload("Reports").Find(&incidents)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, incidents)
}

func CreateIncident(c *gin.Context) {
	var input models.Incident
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&input)
	c.JSON(http.StatusCreated, input)
}

func GetIncidentByID(c *gin.Context) {
	// Извлекаем ID инцидента из параметров маршрута и конвертируем в int
	idStr := c.Param("id")
	log.Println("ID Incident", idStr)
	id, err := strconv.Atoi(idStr)
	if err != nil {
	 c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid incident ID"})
	 return
	}
 
	// Поиск инцидента в базе данных по ID с предварительной загрузкой связанных данных
	var incident models.Incident
	result := database.DB.Preload("Service").Preload("Service.Team").Preload("Checks").Preload("Reports").First(&incident, id)
	if result.Error != nil {
	 if result.Error == gorm.ErrRecordNotFound {
		c.JSON(http.StatusNotFound, gin.H{"error": "Incident not found"})
		return
	 }
	 c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
	 return
	}
 
	c.JSON(http.StatusOK, incident)
}
