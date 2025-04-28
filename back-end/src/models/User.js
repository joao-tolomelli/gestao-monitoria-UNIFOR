const { query } = require("../database");

class User {
  constructor(userRow) {
    this.id = userRow.id;
    this.nome = userRow.nome;
    this.matricula = userRow.matricula;
    this.senha = userRow.senha;
    this.tipo = userRow.tipo;
    this.foto_url = userRow.foto_url; // ✅ adicionamos o campo
    this.created_at = userRow.created_at;
  }

  static async findAll() {
    const result = await query(`SELECT * FROM usuarios`);
    return result.rows.map((row) => new User(row));
  }

  static async create({ nome, matricula, senha, tipo, foto_url }) {
    const result = await query(
      `INSERT INTO usuarios (nome, matricula, senha, tipo, foto_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nome, matricula, senha, tipo, foto_url]
    );
    return new User(result.rows[0]);
  }

  static async findById(id) {
    const result = await query(`SELECT * FROM usuarios WHERE id = $1`, [id]);
    if (!result.rows[0]) return null;
    return new User(result.rows[0]);
  }

  static async findByMatricula(matricula) {
    const result = await query(`SELECT * FROM usuarios WHERE matricula = $1`, [matricula]);
    if (!result.rows[0]) return null;
    return new User(result.rows[0]);
  }

  static async update(id, attributes) {
    const { rows } = await query(`SELECT * FROM usuarios WHERE id = $1`, [id]);
    if (!rows[0]) return null;

    const user = new User(rows[0]);
    Object.assign(user, attributes);

    await query(
      `UPDATE usuarios SET
        nome = $1,
        matricula = $2,
        senha = $3,
        tipo = $4,
        foto_url = $5,
        created_at = $6
       WHERE id = $7`,
      [user.nome, user.matricula, user.senha, user.tipo, user.foto_url, user.created_at, user.id]
    );

    return user;
  }

  static async delete(id) {
    await query(`DELETE FROM usuarios WHERE id = $1`, [id]);
    return { message: "Usuário deletado com sucesso." };
  }
}

module.exports = User;
