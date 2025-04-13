package controllers

import (
    "net/http"
    "strconv"
    "gorm.io/gorm"
    "github.com/gin-gonic/gin"
    "backend/database"
    "backend/models"
)

// GetAllChecks возвращает список всех проверок
func GetAllChecks(c *gin.Context) {
    var checks []models.Check

    result := database.DB.Find(&checks)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, checks)
}

// GetCheckByID возвращает данные о конкретной проверке по ID
func GetCheckByID(c *gin.Context) {
    idStr := c.Param("id")
    id, err := strconv.Atoi(idStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid check ID"})
        return
    }

    var check models.Check
    result := database.DB.First(&check, id)
    if result.Error != nil {
        if result.Error == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "Check not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, check)
}

// CreateCheck создает новую проверку
func CreateCheck(c *gin.Context) {
    var input struct {
        Name        string `json:"name" binding:"required"`
        Description string `json:"description"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    check := models.Check{
        Name:        input.Name,
        Description: input.Description,
    }

    result := database.DB.Create(&check)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    c.JSON(http.StatusCreated, check)
}
