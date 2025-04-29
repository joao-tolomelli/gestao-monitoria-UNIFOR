const Atendimento = require("../models/Atendimento");
const moment = require("moment");
const { query } = require("../database");

const atendimentosController = {
  async create(req, res) {
    try {
      const { id_monitor, date, in_time, out_time, category, served } = req.body;

      if (!id_monitor || !date || !in_time || !out_time || !category || served === undefined) {
        return res.status(400).json({ error: "Campos obrigatórios: id_monitor, date, in_time, out_time, category, served" });
      }

      const entrada = moment(`${date} ${in_time}`, "YYYY-MM-DD HH:mm");
      const saida = moment(`${date} ${out_time}`, "YYYY-MM-DD HH:mm");

      const diffMinutes = saida.diff(entrada, 'minutes');
      if (diffMinutes <= 0) {
        return res.status(400).json({ error: "Horário de saída deve ser depois do horário de entrada." });
      }

      const novoAtendimento = await Atendimento.create({
        id_monitor,
        date,
        in_time,
        out_time,
        minutes_worked: diffMinutes,
        category,
        served
      });

      return res.status(201).json(novoAtendimento);
    } catch (error) {
      console.error("Erro ao registrar atendimento:", error);
      return res.status(500).json({ error: "Erro interno ao registrar atendimento." });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { date, in_time, out_time, category, served } = req.body;

      if (!date || !in_time || !out_time || !category || served === undefined) {
        return res.status(400).json({ error: "Campos obrigatórios: date, in_time, out_time, category, served" });
      }

      const entrada = moment(`${date} ${in_time}`, "YYYY-MM-DD HH:mm");
      const saida = moment(`${date} ${out_time}`, "YYYY-MM-DD HH:mm");
      const diffMinutes = saida.diff(entrada, "minutes");

      if (diffMinutes <= 0) {
        return res.status(400).json({ error: "Horário de saída deve ser depois do horário de entrada." });
      }

      const result = await query(
        `UPDATE atendimentos
         SET date = $1, in_time = $2, out_time = $3, minutes_worked = $4, category = $5, served = $6
         WHERE id = $7
         RETURNING *`,
        [date, in_time, out_time, diffMinutes, category, served, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Atendimento não encontrado." });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao atualizar atendimento:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const result = await query(
        `DELETE FROM atendimentos WHERE id = $1 RETURNING *`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Atendimento não encontrado." });
      }

      res.json({ message: "Atendimento deletado com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar atendimento:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },

  async index(req, res) {
    try {
      const atendimentos = await Atendimento.findAll();
      res.json(atendimentos);
    } catch (error) {
      console.error("Erro ao listar atendimentos:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },

  async findByMonitor(req, res) {
    try {
      const { id_monitor } = req.params;
      const atendimentos = await Atendimento.findByMonitor(id_monitor);
      res.json(atendimentos);
    } catch (error) {
      console.error("Erro ao buscar atendimentos por monitor:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  }
};

module.exports = atendimentosController;
