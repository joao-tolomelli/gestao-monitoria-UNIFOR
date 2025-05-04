const { query } = require("./");

async function syncDatabase() {
  try {
    const checkTable = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'usuarios'
      );
    `);

    const tableExists = checkTable.rows[0].exists;

    if (tableExists) {
      console.log("As tabelas já foram criadas anteriormente.");
      return "As tabelas já foram criadas anteriormente.";
    }

    // Criação das tabelas com a estrutura final já atualizada
    await query(`
      CREATE TABLE usuarios (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        matricula TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        tipo TEXT NOT NULL CHECK (tipo IN ('monitor', 'administrador', 'professor')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        photo TEXT
      );

      CREATE TABLE monitores (
        usuario_id INT PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
        subject VARCHAR(255),
        institucional BOOLEAN DEFAULT FALSE,
        foto TEXT
      );

      CREATE TABLE professores (
        usuario_id INT PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE
      );

      CREATE TABLE administradores (
        usuario_id INT PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE
      );

      CREATE TABLE alunos (
        matricula TEXT PRIMARY KEY,
        nome TEXT NOT NULL
      );

      CREATE TABLE salas (
        id SERIAL PRIMARY KEY,
        numero TEXT,
        localizacao TEXT
      );

      CREATE TABLE disponibilidades (
        id SERIAL PRIMARY KEY,
        monitor_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
        dia_semana TEXT,
        hora_inicio TIME,
        hora_fim TIME,
        sala_id INT REFERENCES salas(id)
      );

      CREATE TABLE atendimentos (
        id SERIAL PRIMARY KEY,
        id_monitor INTEGER REFERENCES monitores(usuario_id),
        date DATE NOT NULL,
        in_time TIME NOT NULL,
        out_time TIME NOT NULL,
        minutes_worked INTEGER NOT NULL,
        category TEXT,
        served TEXT[]
      );


      CREATE TABLE atendimentos_alunos (
        atendimento_id INT REFERENCES atendimentos(id) ON DELETE CASCADE,
        aluno_matricula TEXT REFERENCES alunos(matricula) ON DELETE CASCADE,
        PRIMARY KEY (atendimento_id, aluno_matricula)
      );
    `);

    console.log("Todas as tabelas foram criadas com sucesso.");
    return "Todas as tabelas foram criadas com sucesso.";
  } catch (error) {
    console.error("Erro ao sincronizar o banco de dados:", error);
    throw error;
  }
}

module.exports = { syncDatabase };
