const { createClient } = require('@clickhouse/client');

// Создайте клиент ClickHouse
const chClient = createClient({
  host: 'http://clickhouse:8123',
  username: 'clickhouse',
  password: 'clickhouse',
  database: 'incidents',
});

module.exports = chClient;