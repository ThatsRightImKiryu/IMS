
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



-- Заполнение данных в таблицу incident_reports
INSERT INTO incident_reports (report_text, status, version, created_at, updated_at) VALUES
('Initial analysis of email downtime issue', 'draft', 1, NOW(), NOW()),
('Follow-up report on payment gateway issue', 'draft', 1, NOW(), NOW()),
('Downing-back report on psb issue', 'draft', 1, NOW(), NOW());


-- Вставка данных в таблицу service_team

INSERT INTO service_team (user_id, service_id, role) VALUES 
(1, 1, 'owner'),
(2, 1, 'team_member'),
(3, 2, 'owner'),
(2, 3, 'team_member');

-- Заполнение связей между инцидентами и сработавшими проверками
INSERT INTO incident_checks (incident_id, check_id) VALUES
(1, 1),
(2, 2),
(3, 3);

-- Связь между отчетами и инцидентами
INSERT INTO report_incidents (report_id, incident_id) VALUES
(1, 1),
(2, 2),
(3, 3);
