const { query } = require("./");

async function syncDatabase() {
  await query(`
        CREATE TABLE IF NOT EXISTS Users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            cpf VARCHAR(255),
            email VARCHAR(255),
            status VARCHAR(255) DEFAULT 'pendente',
            guest_group VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);
  console.log("Created Users table.");
  process.exit(1);
}

syncDatabase();
