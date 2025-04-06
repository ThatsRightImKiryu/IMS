package models

import (
    "time"
)

// User model that represents the users table
type User struct {
    ID        uint   `gorm:"primaryKey" json:"id"`
    Name      string `gorm:"size:100;not null" json:"name"`
    Email     string `gorm:"size:100;unique;not null" json:"email"`
    Phone     string `gorm:"size:15" json:"phone"`
    Role      string `gorm:"size:50;not null;check:role in ('owner', 'team_member')" json:"role"`
    CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
}

// Service model that represents the services table
type Service struct {
    ID          uint   `gorm:"primaryKey" json:"id"`
    Name        string `gorm:"size:100;not null" json:"name"`
    Description string `json:"description"`
    Team        []User `gorm:"many2many:service_team;" json:"team"`
}

// Incident model that represents the incidents table
type Incident struct {
    ID          uint             `gorm:"primaryKey" json:"id"`
    Title       string           `gorm:"size:255;not null" json:"title"`
    Description string           `json:"description"`
    Status      string           `gorm:"size:50;not null;check:status in ('open', 'closed', 'in-progress', 'resolved')" json:"status"`
    Priority    string           `gorm:"size:20;check:priority in ('low', 'medium', 'high')" json:"priority"`
    ServiceID   uint             `json:"service_id"`
    Service     Service          `gorm:"foreignKey:ServiceID" json:"service"`
    CreatedAt   time.Time        `gorm:"autoCreateTime" json:"created_at"`
    UpdatedAt   time.Time        `gorm:"autoUpdateTime" json:"updated_at"`
    ResolvedAt  *time.Time       `json:"resolved_at,omitempty"`
    Checks      []Check          `gorm:"many2many:incident_checks;" json:"checks,omitempty"`
    Reports     []IncidentReport `gorm:"many2many:report_incidents;joinForeignKey:ID;joinReferences:ReportID" json:"reports"`
}

// Check model that represents the checks table
type Check struct {
    ID          uint      `gorm:"primaryKey" json:"id"`
    Name        string    `gorm:"size:255;not null" json:"name"`
    Description string    `json:"description"`
    Incidents   []Incident `gorm:"many2many:incident_checks;" json:"incidents,omitempty"`
}

// IncidentReport model that represents the incident_reports table
type IncidentReport struct {
    ID         uint       `gorm:"primaryKey" json:"id"`
    ReportText string     `gorm:"not null" json:"report_text"`
    Status     string     `gorm:"size:50;check:status in ('draft', 'finalized')" json:"status"`
    Version    int        `gorm:"default:1" json:"version"`
    CreatedAt  time.Time  `gorm:"autoCreateTime" json:"created_at"`
    UpdatedAt  time.Time  `gorm:"autoUpdateTime" json:"updated_at"`
    Incidents  []Incident `gorm:"many2many:report_incidents;joinForeignKey:ReportID;joinReferences:ID;" json:"incidents"`
}
