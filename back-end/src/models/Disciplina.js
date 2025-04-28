const { query } = require("../database");

class Disciplina {
  constructor(disciplinaRow) {
    this.id = disciplinaRow.id;
    this.nome = disciplinaRow.nome;
    this.created_at = disciplinaRow.created_at;
  }

  static async findAll() {
    const result = await query(`SELECT * FROM disciplinas`);
    return result.rows.map((row) => new Disciplina(row));
  }

  static async create({ nome }) {
    const result = await query(
      `INSERT INTO disciplinas (nome) VALUES ($1) RETURNING *`,
      [nome]
    );
    return new Disciplina(result.rows[0]);
  }

  static async findById(id) {
    const result = await query(`SELECT * FROM disciplinas WHERE id = $1`, [id]);
    if (!result.rows[0]) return null;
    return new Disciplina(result.rows[0]);
  }

  static async update(id, attributes) {
    const { rows } = await query(`SELECT * FROM disciplinas WHERE id = $1`, [id]);
    if (!rows[0]) return null;

    const disciplina = new Disciplina(rows[0]);
    Object.assign(disciplina, attributes);

    await query(
      `UPDATE disciplinas SET
        nome = $1,
        created_at = $2
       WHERE id = $3`,
      [disciplina.nome, disciplina.created_at, disciplina.id]
    );

    return disciplina;
  }

  static async delete(id) {
    await query(`DELETE FROM disciplinas WHERE id = $1`, [id]);
    return { message: "Disciplina deletada com sucesso." };
  }
}

module.exports = Disciplina;