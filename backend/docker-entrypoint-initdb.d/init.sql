-- Создание таблицы для пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    role VARCHAR(50) CHECK (role IN ('owner', 'team_member')) NOT NULL, -- Добавление колонки роли
    created_at TIMESTAMP DEFAULT NOW()
);

-- Создание таблицы для сервисов
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Создание таблицы для инцидентов
CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL CHECK (status IN ('open', 'closed', 'in-progress', 'resolved')),
    priority VARCHAR(20) CHECK (priority IN ('low', 'medium', 'high')),
    service_id INT NOT NULL,  -- Инцидент связан с одним сервисом
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMPTZ,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE  -- Прямая связь с сервисом
);

-- Создание таблицы для сработавших проверок
CREATE TABLE checks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Создание таблицы для связей между инцидентами и сработавшими проверками
CREATE TABLE incident_checks (
    incident_id INT NOT NULL,
    check_id INT NOT NULL,
    PRIMARY KEY (incident_id, check_id),
    FOREIGN KEY (incident_id) REFERENCES incidents(id) ON DELETE CASCADE,
    FOREIGN KEY (check_id) REFERENCES checks(id) ON DELETE CASCADE
);

-- Создание таблицы для отчетов
CREATE TABLE incident_reports (
    id SERIAL PRIMARY KEY,
    report_text TEXT NOT NULL,
    status VARCHAR(50) CHECK (status IN ('draft', 'finalized')),
    version INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
);

-- Создание таблицы для связи отчетов и инцидентов (связь "многие ко многим")
CREATE TABLE report_incidents (
    report_id INT NOT NULL,
    incident_id INT NOT NULL,
    PRIMARY KEY (report_id, incident_id),
    FOREIGN KEY (report_id) REFERENCES incident_reports(id) ON DELETE CASCADE,
    FOREIGN KEY (incident_id) REFERENCES incidents(id) ON DELETE CASCADE
);

CREATE TABLE service_team (
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    role VARCHAR(50) CHECK (role IN ('owner', 'team_member')) NOT NULL,
    PRIMARY KEY (user_id, service_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Заполнение данных в таблицу users
INSERT INTO users (name, email, phone, role) VALUES
('Alice Smith', 'alice@example.com', '555-1234', 'owner'),
('Bob Johnson', 'bob@example.com', '555-2345', 'team_member'),
('Charlie Brown', 'charlie@example.com', '555-3456', 'team_member');

-- Заполнение данных в таблицу services
INSERT INTO services (name, description) VALUES
('Email Service', 'Handles email sending and receiving'),
('Payment Gateway', 'Processes payments and transactions'),
('User Management', 'Deals with user accounts and permissions');

-- Заполнение данных в таблицу incidents
INSERT INTO incidents (title, description, status, priority, service_id, created_at, updated_at) VALUES
('Email Downtime', 'Email service is unreachable', 'open', 'high', 1, NOW(), NOW()),
('Payment Issue', 'Payments fail intermittently', 'in-progress', 'medium', 2, NOW(), NOW()),
('User Login Problem', 'Users facing issues during login', 'resolved', 'low', 3, NOW(), NOW());

-- Заполнение данных в таблицу checks
INSERT INTO checks (name, description) VALUES
('Server Health Check', 'Monitors server performance metrics'),
('Payment Gateway Health', 'Checks the status of the payment gateway'),
('Authentication System Status', 'Monitors the user authentication system');

-- Заполнение связей между инцидентами и сработавшими проверками
INSERT INTO incident_checks (incident_id, check_id) VALUES
(1, 1),
(2, 2),
(3, 3);

-- Заполнение данных в таблицу incident_reports
INSERT INTO incident_reports (reporter_id, report_text, status, version, created_at, updated_at) VALUES
(1, 'Initial analysis of email downtime issue', 'draft', 1, NOW(), NOW()),
(2, 'Follow-up report on payment gateway issue', 'draft', 1, NOW(), NOW());

-- Связь между отчетами и инцидентами
INSERT INTO report_incidents (report_id, incident_id) VALUES
(1, 1),
(2, 2),
(2, 3);

-- Вставка данных в таблицу service_team

INSERT INTO service_team (user_id, service_id, role) VALUES 
(1, 1, 'owner'),
(2, 1, 'team_member'),
(3, 2, 'owner'),
(2, 3, 'team_member');

