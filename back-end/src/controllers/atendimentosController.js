const Atendimento = require("../models/Atendimento");
const moment = require("moment");

const atendimentosController = {
  async create(req, res) {
    try {
      const { id_monitor, date, inTime, outTime, category, served } = req.body;

      if (!id_monitor || !date || !inTime || !outTime || !category || !served) {
        return res.status(400).json({ error: "Campos obrigatórios: id_monitor, date, inTime, outTime, category, served" });
      }

      const entrada = moment(`${date} ${inTime}`, "YYYY-MM-DD HH:mm");
      const saida = moment(`${date} ${outTime}`, "YYYY-MM-DD HH:mm");

      const diffMinutes = saida.diff(entrada, 'minutes');
      if (diffMinutes <= 0) {
        return res.status(400).json({ error: "Horário de saída deve ser depois do horário de entrada." });
      }

      const novoAtendimento = await Atendimento.create({
        id_monitor,
        date,
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
      const { date, inTime, outTime, category, served } = req.body;
  
      if (!date || !inTime || !outTime || !category || !served) {
        return res.status(400).json({ error: "Campos obrigatórios: date, inTime, outTime, category, served" });
      }
  
      const entrada = require("moment")(`${date} ${inTime}`, "YYYY-MM-DD HH:mm");
      const saida = require("moment")(`${date} ${outTime}`, "YYYY-MM-DD HH:mm");
      const diffMinutes = saida.diff(entrada, "minutes");
  
      if (diffMinutes <= 0) {
        return res.status(400).json({ error: "Horário de saída deve ser depois do horário de entrada." });
      }
  
      const result = await require("../database").query(
        `UPDATE atendimentos
         SET date = $1, minutes_worked = $2, category = $3, served = $4
         WHERE id = $5
         RETURNING *`,
        [date, diffMinutes, category, served, id]
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
  
      const result = await require("../database").query(
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
