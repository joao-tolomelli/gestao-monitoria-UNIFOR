const { query } = require("../database");

class Atendimento {
  constructor(row) {
    this.id = row.id;
    this.monitor_id = row.monitor_id;
    this.data = row.data;
    this.horas_trabalhadas = row.horas_trabalhadas;
  }

  static async create({ monitor_id, data, horas_trabalhadas }) {
    const result = await query(
      `INSERT INTO atendimentos (monitor_id, data, horas_trabalhadas)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [monitor_id, data, horas_trabalhadas]
    );
    return new Atendimento(result.rows[0]);
  }
}

module.exports = Atendimento;