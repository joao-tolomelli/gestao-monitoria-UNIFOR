const { query } = require("../database");

class Monitor {
  constructor(row) {
    this.usuario_id = row.usuario_id;
    this.subject = row.subject;
    this.institucional = row.institucional;
    this.name = row.name;
    this.matricula = row.matricula;
    this.tipo_usuario = row.tipo_usuario;
    this.photo = row.photo;
  }

  static async findAll() {
    const result = await query(`
      SELECT 
        m.usuario_id,
        m.subject,
        m.institucional,
        u.name,
        u.matricula,
        u.tipo AS tipo_usuario,
        u.photo
      FROM monitores m
      INNER JOIN usuarios u ON m.usuario_id = u.id
    `);

    return result.rows.map(row => new Monitor(row));
  }

  static async findById(usuario_id) {
    const result = await query(`
      SELECT 
        m.usuario_id,
        m.subject,
        m.institucional,
        u.name,
        u.matricula,
        u.tipo AS tipo_usuario,
        u.photo
      FROM monitores m
      INNER JOIN usuarios u ON m.usuario_id = u.id
      WHERE m.usuario_id = $1
    `, [usuario_id]);

    if (!result.rows[0]) return null;
    return new Monitor(result.rows[0]);
  }

  static async create({ usuario_id, subject, institucional }) {
    const result = await query(
      `INSERT INTO monitores (usuario_id, subject, institucional)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [usuario_id, subject, institucional]
    );
    return new Monitor(result.rows[0]);
  }

  static async update(usuario_id, attributes) {
    const monitor = await Monitor.findById(usuario_id);
    if (!monitor) return null;

    Object.assign(monitor, attributes);

    await query(
      `UPDATE monitores SET subject=$1, institucional=$2 WHERE usuario_id=$3`,
      [monitor.subject, monitor.institucional, monitor.usuario_id]
    );

    return monitor;
  }

  static async delete(usuario_id) {
    await query("DELETE FROM monitores WHERE usuario_id = $1", [usuario_id]);
    return { message: "Monitor deletado com sucesso." };
  }
}

module.exports = Monitor;
