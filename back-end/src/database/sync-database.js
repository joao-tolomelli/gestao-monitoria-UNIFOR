const { query } = require("./");

async function syncDatabase() {
  try {
    // Verifica se a tabela já existe
    const checkTable = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);

    const tableExists = checkTable.rows[0].exists;

    if (tableExists) {
      console.log("A tabela 'Users' já existe.");
      return "A tabela 'Users' já existe.";
    }

    // Cria a tabela, pois ela não existe
    await query(`
      CREATE TABLE Users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        cpf VARCHAR(255),
        email VARCHAR(255),
        status VARCHAR(255) DEFAULT 'pendente',
        guest_group VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("A tabela 'Users' foi criada com sucesso.");
    return "A tabela 'Users' foi criada com sucesso.";
  } catch (error) {
    console.error("Erro ao sincronizar o banco de dados:", error);
    throw error;
  }
}

module.exports = { syncDatabase };
