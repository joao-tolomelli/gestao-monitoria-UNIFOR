const Atendimento = require("../models/Atendimento");

const atendimentosController = {
  async create(req, res) {
    try {
      const { monitor_id, data, horas_trabalhadas } = req.body;

      if (!monitor_id || !data || !horas_trabalhadas) {
        return res.status(400).json({ error: "Campos obrigatórios: monitor_id, data, horas_trabalhadas" });
      }

      const novoAtendimento = await Atendimento.create({
        monitor_id,
        data,
        horas_trabalhadas,
      });

      return res.status(201).json(novoAtendimento);
    } catch (error) {
      console.error("Erro ao registrar atendimento:", error);
      return res.status(500).json({ error: "Erro interno ao registrar atendimento." });
    }
  }
};

module.exports = atendimentosController;
