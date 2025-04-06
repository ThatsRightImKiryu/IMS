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
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
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
