const { query } = require("../database");

class Monitor {
  constructor(row) {
    this.usuario_id = row.usuario_id;
    this.tipo_monitoria = row.tipo_monitoria;
    this.carga_horaria_exigida = row.carga_horaria_exigida;
    this.nome = row.nome;
    this.matricula = row.matricula;
    this.tipo_usuario = row.tipo_usuario;
    this.foto_url = row.foto_url;
  }

  // Puxar todos os monitores + dados do usuário
  static async findAll() {
    const result = await query(`
      SELECT 
        m.usuario_id,
        m.tipo_monitoria,
        m.carga_horaria_exigida,
        u.nome,
        u.matricula,
        u.tipo AS tipo_usuario,
        u.foto_url
      FROM monitores m
      INNER JOIN usuarios u ON m.usuario_id = u.id
    `);

    return result.rows.map(row => new Monitor(row));
  }

  // Puxar monitor específico + dados do usuário
  static async findById(usuario_id) {
    const result = await query(`
      SELECT 
        m.usuario_id,
        m.tipo_monitoria,
        m.carga_horaria_exigida,
        u.nome,
        u.matricula,
        u.tipo AS tipo_usuario,
        u.foto_url
      FROM monitores m
      INNER JOIN usuarios u ON m.usuario_id = u.id
      WHERE m.usuario_id = $1
    `, [usuario_id]);

    if (!result.rows[0]) return null;
    return new Monitor(result.rows[0]);
  }

  // Criar monitor
  static async create({ usuario_id, tipo_monitoria, carga_horaria_exigida }) {
    const result = await query(
      `INSERT INTO monitores (usuario_id, tipo_monitoria, carga_horaria_exigida)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [usuario_id, tipo_monitoria, carga_horaria_exigida]
    );
    return new Monitor(result.rows[0]);
  }

  // Atualizar monitor
  static async update(usuario_id, attributes) {
    const monitor = await Monitor.findById(usuario_id);
    if (!monitor) return null;

    Object.assign(monitor, attributes);

    await query(
      `UPDATE monitores SET tipo_monitoria=$1, carga_horaria_exigida=$2 WHERE usuario_id=$3`,
      [monitor.tipo_monitoria, monitor.carga_horaria_exigida, monitor.usuario_id]
    );

    return monitor;
  }

  // Deletar monitor
  static async delete(usuario_id) {
    await query("DELETE FROM monitores WHERE usuario_id = $1", [usuario_id]);
    return { message: "Monitor deletado com sucesso." };
  }
}

module.exports = Monitor;
