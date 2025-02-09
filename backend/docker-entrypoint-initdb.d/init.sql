-- init.sql

-- Создание таблицы для пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Создание таблицы для сервисов
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Создание таблицы для ответственных
CREATE TABLE responsibilities (
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    role VARCHAR(50),
    assigned_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, service_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL CHECK (status IN ('open', 'closed', 'in-progress')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Заполнение таблицы incidents примерами данных.
INSERT INTO incidents (title, description, status, created_at, updated_at)
VALUES
    ('Server Outage', 'The main server is down affecting several services.', 'open', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Network Latency', 'Users are experiencing latency issues across the network.', 'in-progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Database Backup', 'Scheduled database backup was not completed.', 'closed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Security Breach', 'Unauthorized access detected in the security logs.', 'open', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Software Update', 'Planned software update has been deployed.', 'closed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Пример для читабельности: вывод всех добавленных инцидентов
SELECT * FROM incidents;

-- Индексы для повышения производительности поиска
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_services_name ON services(name);
CREATE INDEX idx_responsibilities_role ON responsibilities(role);
