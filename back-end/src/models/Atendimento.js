const { query } = require("../database");

class Atendimento {
  constructor(row) {
    this.id = row.id;
    this.id_monitor = row.id_monitor;
    this.date = row.date;
    this.in_time = row.in_time;
    this.out_time = row.out_time;
    this.minutes_worked = row.minutes_worked;
    this.category = row.category;
    this.served = row.served;
  }

  static async create({ id_monitor, date, in_time, out_time, minutes_worked, category, served }) {
    const result = await query(
      `INSERT INTO atendimentos (id_monitor, date, in_time, out_time, minutes_worked, category, served)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [id_monitor, date, in_time, out_time, minutes_worked, category, served]
    );
    return new Atendimento(result.rows[0]);
  }

  static async findAll() {
    const result = await query(`SELECT * FROM atendimentos`);
    return result.rows.map(row => new Atendimento(row));
  }

  static async findByMonitor(id_monitor) {
    const result = await query(`SELECT * FROM atendimentos WHERE id_monitor = $1`, [id_monitor]);
    return result.rows.map(row => new Atendimento(row));
  }
}

module.exports = Atendimento;
