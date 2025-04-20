package controllers

import (
    "net/http"
    "strconv"
    "gorm.io/gorm"
    "github.com/gin-gonic/gin"
    "backend/database"
    "backend/models"
    "time"
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

// // CreateCheck создает новую проверку
// func CreateCheck(c *gin.Context) {
//     var input struct {
//         Name        string `json:"name" binding:"required"`
//         Description string `json:"description"`
//     }

//     if err := c.ShouldBindJSON(&input); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     check := models.Check{
//         Name:        input.Name,
//         Description: input.Description,
//     }

//     result := database.DB.Create(&check)
//     if result.Error != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
//         return
//     }

//     c.JSON(http.StatusCreated, check)
// }

func HandleGrafanaWebhook(c *gin.Context) {
	var payload struct {
		Status string `json:"status"`
		Alerts []struct {
			Labels      map[string]string `json:"labels"`
			Annotations map[string]string `json:"annotations"`
			StartsAt    time.Time         `json:"startsAt"`
		} `json:"alerts"`
		Title   string `json:"title"`
		Message string `json:"message"`
	}

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Обрабатываем только firing алерты
	if payload.Status != "firing" {
		c.JSON(http.StatusOK, gin.H{"message": "Alert status is not firing, skipping"})
		return
	}

	var createdChecks []models.Check
	var errors []string

	for _, alert := range payload.Alerts {
		// Формируем имя и описание из данных алерта
		name := alert.Labels["alertname"]
		if name == "" {
			name = "Unnamed alert"
		}

		description := alert.Annotations["description"]
		if description == "" {
			description = alert.Annotations["summary"]
		}

		check := models.Check{
			Name:        name,
			Description: description,
		}

		result := database.DB.Create(&check)
		if result.Error != nil {
			errors = append(errors, result.Error.Error())
			continue
		}

		createdChecks = append(createdChecks, check)
	}

	if len(errors) > 0 {
		c.JSON(http.StatusMultiStatus, gin.H{
			"created_checks": createdChecks,
			"errors":        errors,
		})
		return
	}

	c.JSON(http.StatusCreated, createdChecks)
}